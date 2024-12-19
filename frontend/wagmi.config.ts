import { Abi, Address } from "viem";

import Tournament from "@/contracts/abis/Tournament.json";
import TournamentFactory from "@/contracts/abis/TournamentFactory.json";
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "contracts/index.ts",
  contracts: [
    {
      abi: Tournament as Abi,
      name: "Tournament",
    },
    {
      abi: TournamentFactory as Abi,
      name: "TournamentFactory",
      address: process.env.NEXT_PUBLIC_TOURNAMENT_FACTORY_ADDRESS as Address,
    },
  ],
  plugins: [react()],
});
