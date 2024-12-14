"use client";

import {
  cookieStorage,
  cookieToInitialState,
  createStorage,
  WagmiProvider,
} from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { opBNBTestnet } from "@reown/appkit/networks";

import { createAppKit } from "@reown/appkit/react";

import { siweConfig } from "@/libs/siwe";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const wagmiAdapter = new WagmiAdapter({
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

export default function Provider({
  cookies,
  children,
}: Readonly<{
  cookies: string | null;
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
