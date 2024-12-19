import { startOfWeek, startOfMonth, endOfWeek, endOfMonth } from "date-fns";
import { db } from "./db";

interface TotalHours {
  totalWeeklyHours: number;
  totalMonthlyHours: number;
}

export async function getTotalHours(clerkId: string): Promise<TotalHours> {
  if (!clerkId) {
    throw new Error("Clerk ID is required");
  }

  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start of week (Monday)
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }); // End of week (Sunday)
  const monthStart = startOfMonth(currentDate); // Start of current month
  const monthEnd = endOfMonth(currentDate); // End of current month

  try {
    // Fetch weekly time entries
    const weeklyEntries = await db.timeEntry.findMany({
      where: {
        clerkId,
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    // Sum weekly hours
    const totalWeeklyHours = weeklyEntries.reduce(
      (total, entry) => total + (entry.hoursWorked || 0),
      0,
    );

    // Fetch monthly time entries
    const monthlyEntries = await db.timeEntry.findMany({
      where: {
        clerkId,
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    // Sum monthly hours
    const totalMonthlyHours = monthlyEntries.reduce(
      (total, entry) => total + (entry.hoursWorked || 0),
      0,
    );

    return {
      totalWeeklyHours,
      totalMonthlyHours,
    };
  } catch (error) {
    console.error("Error fetching total hours:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to calculate total hours: ${error.message}`);
    } else {
      throw new Error(
        "Failed to calculate total hours due to an unknown error",
      );
    }
  }
}
