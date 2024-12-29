// app/api/sync-user/route.ts
import { db } from "~/server/db";
import User from "~/server/user";

export async function POST() {
  const user = await User(); // Get current Clerk user
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id: clerkId, emailAddresses, firstName, lastName } = user;

  const email = emailAddresses[0]?.emailAddress ?? "unknown";

  await db.user.upsert({
    where: { clerkId },
    update: {
      email,
      name: `${firstName} ${lastName}`,
    },
    create: {
      clerkId,
      email,
      name: `${firstName} ${lastName}`,
    },
  });

  return new Response("User synced successfully");
}

