import getWeeklyEntries from "~/server/timeEntry";
import User from "~/server/user";
import { type timeEntrySchema } from "~/types/weeklyEntryTypes";

export default async function TableComp() {
  const user = await User();
  const userId = user.id
  const data = await getWeeklyEntries(userId) as timeEntrySchema[];
  return (
    <div className="overflow-auto">
      <h1 className="text-4xl">My Hours</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Hourly Rate</th>
            <th>Hours Worked</th>
            <th>Date</th>
            {/*<th>Department</th>*/}
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((item, index) => (
            <tr key={index}>
              <th>{index}</th>
              <td>{item.hourlyRate}</td>
              <td>{item.hoursWorked}</td>
              <td>{item.createdAt.toISOString()}</td>
            </tr>
          ))}

          {/* row 2 */}
        </tbody>
      </table>
    </div>
  );
}
