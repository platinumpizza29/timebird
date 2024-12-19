import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function NavbarComp() {
  const { userId } = await auth();

  return (
    <div className="navbar bg-base-100 flex flex-row items-center justify-between p-4">
      <a className="btn btn-ghost text-xl">TimeBird</a>
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
