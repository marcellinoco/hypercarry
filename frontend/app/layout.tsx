import "./globals.css";

import type { Metadata } from "next";
import { headers } from "next/headers";

import Provider from "./provider";
import { Navbar } from "./components/core/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await headers()).get("cookie");
  return (
    <html lang="en">
      <body>
        <Provider cookies={cookie}>
          <div className="flex min-h-screen min-w-full flex-col">
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
