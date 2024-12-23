import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Features from "~/components/landing/features";
import Footer from "~/components/landing/footer";
import HeroSectionComp from "~/components/landing/herosection";
import Timeline from "~/components/landing/timeline";
import NavbarComp from "~/components/navbarComp";

export default async function App() {
  const { userId } = await auth();
  if (userId) {
    redirect("/home");
  }
  return (
    <main className="">
      <NavbarComp />
      <section className="space-y-6">
        <HeroSectionComp />
        <Features />
        <Timeline />
        <Footer />
      </section>
    </main>
  );
}
