"use client";

import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { opBNBTestnet } from "@reown/appkit/networks";

import { createAppKit } from "@reown/appkit/react";

import { siweConfig } from "@/libs/siwe";

export const wagmiAdapter = new WagmiAdapter({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  storage: createStorage({ storage: cookieStorage }),
  networks: [opBNBTestnet],
  ssr: true,
});

createAppKit({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  adapters: [wagmiAdapter],
  networks: [opBNBTestnet],
  defaultNetwork: opBNBTestnet,
  siweConfig: siweConfig,
  themeMode: "light",
  features: {
    analytics: true,
    onramp: false,
    swaps: false,
  },
});
