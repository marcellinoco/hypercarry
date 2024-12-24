"use client";

import { useState } from "react";

import { Address, parseEther } from "viem";
import { useAccount } from "wagmi";

import { useWriteTournamentFactoryCreateTournament } from "@/contracts";
import { TournamentForm } from "../components/TournamentForm";

function page() {
  return (
    <div className="flex min-w-[30rem] items-center justify-center">
      <TournamentForm />
    </div>
  );
}

export default page;
