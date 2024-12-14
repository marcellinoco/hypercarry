"use client";

import { cookieToInitialState, WagmiProvider } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter } from "@/libs/appkit";

const queryClient = new QueryClient();

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
