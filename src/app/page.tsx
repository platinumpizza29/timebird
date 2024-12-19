import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavbarComp from "~/components/navbarComp";

export default async function App() {
  const { userId } = await auth();
  if (userId) {
    redirect("/home");
  }
  return (
    <main className="">
      <NavbarComp />
      <h1>Hello World</h1>
    </main>
  );
}
