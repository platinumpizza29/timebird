import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import PrelineScript from "~/components/PrelineScript";
import { PostHogProvider } from "./providers";

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
        <PostHogProvider>
          <body>{children}</body>
        </PostHogProvider>
      </html>
    </ClerkProvider>
  );
}
