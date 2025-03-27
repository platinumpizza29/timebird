import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export async function GET() {
  try {
    const userData = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = userData?.session.userId;

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const hours = await db.hours.findMany({
      where: {
        userId: userId,
      },
    });

    return new Response(JSON.stringify(hours), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching hours:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch hours" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await db.$disconnect();
  }
}
