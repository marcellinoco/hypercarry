"use client";

import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-amber-50">
      {address}
    </main>
  );
}
