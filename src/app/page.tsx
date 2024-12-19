import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeroSectionComp from "~/components/landing/herosection";
import NavbarComp from "~/components/navbarComp";

export default async function App() {
  const { userId } = await auth();
  if (userId) {
    redirect("/home");
  }
  return (
    <main className="">
      <NavbarComp />
      <HeroSectionComp />
    </main>
  );
}
