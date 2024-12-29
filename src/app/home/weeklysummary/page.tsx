import NavbarComp from "~/components/navbarComp";
import { getTotalHours } from "~/server/timeEntry";
import User from "~/server/user";

export default async function WeeklySummary() {
  const user = await User();
  const weeklyHours = await getTotalHours(user.id);
  return (
    <div className="min-h-[100dvh]">
      <NavbarComp />
      <div className="mx-4 min-h-[100dvh] space-y-6 md:mx-12 lg:mx-24 xl:mx-48">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Hours</h2>
              <p className={"stat-value text-primary"}>
                {weeklyHours.totalWeeklyHours}
              </p>
            </div>
          </div>
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Expected pay</h2>
              <p className={"stat-value text-primary"}>
                {weeklyHours.totalWeeklyHours * 13.36}
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-3xl">Weekly Hour Logs</h1>
        <section>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
