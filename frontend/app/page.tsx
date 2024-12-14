"use client";

import { useAppKitAccount } from "@reown/appkit/react";

export default function Home() {
  const { address } = useAppKitAccount();
  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-amber-50">
      {address}
    </main>
  );
}
