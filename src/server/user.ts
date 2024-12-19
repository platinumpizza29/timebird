import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function User() {
  const { userId } = await auth();
  const client = await clerkClient();
  // TODO:Fix this later on add null check
  const user = await client.users.getUser(userId!);
  return user;
}
