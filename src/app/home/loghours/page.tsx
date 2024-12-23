import { logHours } from "~/server/timeEntry";
import { redirect } from "next/navigation";
import User from "~/server/user";

export default async function LogHoursPage() {
  const user = await User();
  const userId = user.id;
  const handleFormSubmit = async (formdata: FormData) => {
    "use server";
    const hourlyRate = parseFloat(formdata.get("hourlyRate") as string);
    const hours = parseFloat(formdata.get("hours") as string);

    if (isNaN(hourlyRate) || isNaN(hours)) {
      throw new Error("Invalid input: hourly rate and hours must be numbers.");
    }
    const data = await logHours(userId, hourlyRate, hours);
    if (data === null) {
      console.log("error not logged entry")
    }
    redirect("/home")
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Log Hours
          </h1>
          <form
            action={handleFormSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Log Hours Worked Today
            </p>

            <div>
              <label htmlFor="hourlyRate" className="sr-only">
                Hourly Rate
              </label>

              <div className="relative">
                <input
                  step={"0.01"}
                  type="number"
                  name="hourlyRate"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter hourly rate"
                />
              </div>
            </div>

            <div>
              <label htmlFor="hours" className="sr-only">
                Hours
              </label>

              <div className="relative">
                <input
                  step={"0.01"}
                  type="number"
                  name="hours"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter hours worked"
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Log Hours
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
