"use client";

import {
  cookieStorage,
  cookieToInitialState,
  createStorage,
  WagmiProvider,
} from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { opBNBTestnet } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";

const queryClient = new QueryClient();
const wagmiAdapter = new WagmiAdapter({
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  storage: createStorage({ storage: cookieStorage }),
  networks: [opBNBTestnet],
  ssr: true,
});

createAppKit({
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  adapters: [wagmiAdapter],
  networks: [opBNBTestnet],
  defaultNetwork: opBNBTestnet,
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