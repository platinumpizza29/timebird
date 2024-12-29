import { startOfWeek, startOfMonth, endOfWeek, endOfMonth } from "date-fns";
import { db } from "./db";

interface TotalHours {
  totalWeeklyHours: number;
  totalMonthlyHours: number;
}

export async function getTotalHours(userId: string): Promise<TotalHours> {
  if (!userId) {
    throw new Error("User ID is required");
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
        userId,
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      include: {
        User: true
      }
    });

    // Sum weekly hours
    const totalWeeklyHours = weeklyEntries.reduce(
      (total, entry) => total + ((entry.contractedHours + entry.overtimeHours) - entry.brakeHours || 0),
      0,
    );

    // Fetch monthly time entries
    const monthlyEntries = await db.timeEntry.findMany({
      where: {
        userId,
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    // Sum monthly hours
    const totalMonthlyHours = monthlyEntries.reduce(
      (total, entry) => total + ((entry.contractedHours + entry.overtimeHours) - entry.brakeHours || 0),
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

export async function logHours(
  userId: string,
  contractedHours: number,
  overtimeHours: number,
  brakeHours: number
) {
  try {
    const entry = await db.timeEntry.create({
      data: {
        userId,
        contractedHours,
        overtimeHours,
        brakeHours,
        createdAt: new Date(),
      },
    });
    return entry;
  } catch (error) {
    console.log(error)
    return null
  }
}

export default async function getWeeklyEntries(userId: string) {
  try {
    const data = await db.timeEntry.findMany({
      where: {
        userId: userId
      }
    })
    return data
  } catch (error) {
    console.log(error)
    return "Error while Fetching entries"

  }
}
