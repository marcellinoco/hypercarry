"use client";

import { WagmiProvider } from "wagmi";
import { opBNBTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();
const wagmiConfig = getDefaultConfig({
  appName: "frontend",
  projectId: "YOUR_PROJECT_ID",
  chains: [opBNBTestnet],
  ssr: true,
});

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
