import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import PrelineScript from "~/components/PrelineScript";
import { PostHogProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "TimeBird",
  description: "this is made for time tracking",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <PrelineScript />
        <body>
          <PostHogProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
