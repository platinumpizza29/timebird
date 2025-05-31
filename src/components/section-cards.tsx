import { headers } from "next/headers";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subWeeks,
} from "date-fns";
import { RevenueCard } from "~/components/revenue-card";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { HoursCard } from "./hours-card";

export async function SectionCards() {
  const userData = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = userData?.session.userId;

  // Get the current date
  const now = new Date();

  // Calculate date ranges for different periods
  const weeklyStart = startOfWeek(now);
  const weeklyEnd = endOfWeek(now);

  const biWeeklyStart = subWeeks(startOfWeek(now), 1);
  const biWeeklyEnd = endOfWeek(now);

  const monthlyStart = startOfMonth(now);
  const monthlyEnd = endOfMonth(now);

  const fourWeeklyStart = subWeeks(startOfWeek(now), 3);
  const fourWeeklyEnd = endOfWeek(now);

  // Fetch hours for all periods
  const hours = await db.hours.findMany({
    where: {
      userId: userId,
      date: {
        gte: fourWeeklyStart,
        lte: fourWeeklyEnd,
      },
    },
    include: {
      user: {
        include: {
          PayRate: true,
        },
      },
    },
  });

  // Calculate revenue for different periods
  const calculateRevenue = (startDate: Date, endDate: Date) => {
    const periodHours = hours.filter(
      (hour) => hour.date >= startDate && hour.date <= endDate
    );

    const regularHours = periodHours.reduce((acc, hour) => {
      return acc + parseFloat(hour.hours.toString());
    }, 0);

    const overtimeHours = periodHours.reduce((acc, hour) => {
      return acc + parseFloat(hour.overtime.toString());
    }, 0);

    const baseRate = parseFloat(
      periodHours[0]?.user.PayRate.find(
        (rate) => rate.type === "BASE"
      )?.rate.toString() ?? "0"
    );
    const overtimeRate = parseFloat(
      periodHours[0]?.user.PayRate.find(
        (rate) => rate.type === "WEEKDAY_OVERTIME"
      )?.rate.toString() ?? "0"
    );

    const regularPay = regularHours * baseRate;
    const overtimePay = overtimeHours * overtimeRate;

    return {
      totalRevenue: (regularPay + overtimePay).toFixed(2),
      regularHours,
      overtimeHours,
    };
  };

  const weeklyRevenue = calculateRevenue(weeklyStart, weeklyEnd);
  const biWeeklyRevenue = calculateRevenue(biWeeklyStart, biWeeklyEnd);
  const monthlyRevenue = calculateRevenue(monthlyStart, monthlyEnd);
  const fourWeeklyRevenue = calculateRevenue(fourWeeklyStart, fourWeeklyEnd);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3">
      <RevenueCard
        weeklyRevenue={weeklyRevenue}
        biWeeklyRevenue={biWeeklyRevenue}
        monthlyRevenue={monthlyRevenue}
        fourWeeklyRevenue={fourWeeklyRevenue}
      />
      <HoursCard
        title="Base Hours"
        weeklyHours={weeklyRevenue.regularHours}
        biWeeklyHours={biWeeklyRevenue.regularHours}
        monthlyHours={monthlyRevenue.regularHours}
        fourWeeklyHours={fourWeeklyRevenue.regularHours}
        description="Regular working hours"
      />
      <HoursCard
        title="Overtime Hours"
        weeklyHours={weeklyRevenue.overtimeHours}
        biWeeklyHours={biWeeklyRevenue.overtimeHours}
        monthlyHours={monthlyRevenue.overtimeHours}
        fourWeeklyHours={fourWeeklyRevenue.overtimeHours}
        description="Additional overtime hours"
      />
    </div>
  );
}
