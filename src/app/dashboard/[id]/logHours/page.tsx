import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { db } from "~/server/db";
import { Checkbox } from "~/components/ui/checkbox";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function LogHours() {
  const isOvertime = true;
  async function logHours(formData: FormData) {
    "use server";
    const department = formData.get("department") as string;
    const dateStr = formData.get("date") as string;
    const hours = parseFloat(formData.get("hours") as string);
    const overtime = parseFloat(formData.get("overtime") as string);

    // Convert the date string to ISO format
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    const userData = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = await userData?.session.userId;

    if (!userId) {
      throw new Error("User ID is undefined. Unable to log hours.");
    }

    try {
      const response = await db.hours.create({
        data: {
          userId: userId,
          department: department,
          hours: hours,
          date: date,
          isOvertime: isOvertime,
          overtime: overtime,
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

          <div className="flex items-center space-x-2">
            <Checkbox id="isOvertime" name="isOvertime" />
            <Label
              htmlFor="isOvertime"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Overtime
            </Label>
          </div>

          {isOvertime && (
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
          )}

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
