import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { db } from "~/server/db";
import { Checkbox } from "~/components/ui/checkbox";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DateField, DateInput } from "~/components/ui/datefield-rac";

export default async function LogHours() {
  async function logHours(formData: FormData) {
    "use server";
    const department = formData.get("department") as string;
    const dateStr = formData.get("date") as string;
    const hours = parseFloat(formData.get("hours") as string);
    const overtime = parseFloat(formData.get("overtime") as string);
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const isOvertime = formData.has("isOvertime")

    // Convert the date string to ISO format
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Convert the date string to ISO format
    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      throw new Error("Invalid date format");
    }

    // Convert the date string to ISO format
    const end = new Date(endTime);
    if (isNaN(end.getTime())) {
      throw new Error("Invalid date format");
    }

    const userData = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = userData?.session.userId;

    if (!userId) {
      throw new Error("User ID is undefined. Unable to log hours.");
    }
    console.log(start.toISOString())

    try {
      const response = await db.hours.create({
        data: {
          userId: userId,
          department: department,
          hours: hours,
          date: date,
          isOvertime: isOvertime,
          overtime: overtime,
          startTime: start.toISOString(),
          endTime: end.toISOString()
        },
      });
      console.log("Hours logged successfully:", response);
    } catch (error) {
      console.error("Failed to log hours:", error);
      throw new Error("Failed to log hours");
    }
    redirect(`/dashboard/${userId}`);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Add Hours</h2>
        <p className="text-muted-foreground">
          Track your time by adding hours worked on projects.
        </p>
      </div>
      <Separator />
      <form action={logHours} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              placeholder="Enter the department"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              name="hours"
              type="number"
              step="0.5"
              placeholder="Enter hours worked"
              required
            />
          </div>

          {/* Start Time*/}
          <DateField className="*:not-first:mt-2" granularity="minute" hourCycle={24} name="startTime">
            <Label className="text-foreground text-sm font-medium">
              Start Time
            </Label>
            <DateInput />
          </DateField>

          {/* End Time*/}
          <DateField className="*:not-first:mt-2" granularity="minute" hourCycle={24} name="endTime">
            <Label className="text-foreground text-sm font-medium">
              End Time
            </Label>
            <DateInput />
          </DateField>

          <div className="flex items-center space-x-2">
            <Checkbox id="isOvertime" name="isOvertime" />
            <Label
              htmlFor="isOvertime"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Overtime
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overtime">Overtime</Label>
            <Input
              id="overtime"
              name="overtime"
              type="number"
              step="0.5"
              placeholder="Enter overtime hours worked"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full md:w-auto">
              Submit Hours
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
