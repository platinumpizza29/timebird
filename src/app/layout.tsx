import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { unstable_ViewTransition as ViewTransition } from "react";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "TimeBird",
  description: "Timebird",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ViewTransition>{children}</ViewTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
