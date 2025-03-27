import { IconFeather } from "@tabler/icons-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-transparent">
      <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <IconFeather className="size-7 text-primary" />
          <h1 className="text-base font-bold md:text-2xl">TimeBird</h1>
        </div>
        <div className="space-x-4">
          <Link
            href="/login"
            className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
