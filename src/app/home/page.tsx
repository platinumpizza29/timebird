import { Calendar1, ChevronRight, PanelLeftOpen, Timer } from "lucide-react";
import Link from "next/link";
import HomePageComp from "~/components/homeComp";
import NavbarComp from "~/components/navbarComp";

export default async function HomePage() {
  return (
    <main className="min-h-[100dvh]">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="flex flex-row items-center justify-between">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <PanelLeftOpen />
            </label>
            <NavbarComp />
          </div>
          {/* Home Page Comp */}
          <div className="">
            <HomePageComp />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            {/* Sidebar content here */}
            <li className="place-self-stretch hover:text-primary">
              <Link href={"/home/weeklysummary"} prefetch={true}>
                <Calendar1 />
                Weekly Summary
                <ChevronRight />
              </Link>
            </li>
            <li className="place-items-stretch hover:text-primary">
              <Link href={"#"}>
                <Calendar1 />
                Monthly Summary
                <ChevronRight />
              </Link>
            </li>
            <li className="place-items-stretch hover:text-primary">
              <Link href={"#"}>
                <Timer />
                My Rotas
                <ChevronRight />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
