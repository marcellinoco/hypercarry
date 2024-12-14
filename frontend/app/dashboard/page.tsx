"use client";

import { useAppKitAccount } from "@reown/appkit/react";

export default function Home() {
  const { address } = useAppKitAccount();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50">
      {address}
    </div>
  );
}
