import { getTotalHours } from "~/server/timeEntry";
import User from "~/server/user";

export default async function CardsComp() {
  const currentUser = await User();
  console.log(currentUser);
  const totalHours = getTotalHours(currentUser.id);
  return (
    <div className="stats stats-vertical w-full shadow lg:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Welcome</div>
        <div className="stat-value text-primary">
          {currentUser.firstName + currentUser.lastName!}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Weekly Hours</div>
        <div className="stat-value text-primary">
          {(await totalHours).totalWeeklyHours}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Montly Hours</div>
        <div className="stat-value text-primary">
          {(await totalHours).totalMonthlyHours}
        </div>
      </div>
      <div className="stat">
        <div className="stat-title">Log Hours</div>
        <div className="stat-value">
          <button className="btn btn-outline btn-primary w-full">
            Log Hours
          </button>
        </div>
      </div>
    </div>
  );
}
