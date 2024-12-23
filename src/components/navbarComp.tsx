import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function NavbarComp() {
  const { userId } = await auth();

  return (
    <div className="navbar flex flex-row items-center justify-between bg-base-100 p-4">
      <Link href={"/home"} prefetch={true} className="btn btn-ghost text-xl">
        TimeBird
      </Link>
      {userId ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <div className="space-x-4">
          <SignInButton />
          <SignUpButton />
        </div>
      )}
    </div>
  );
}
