import type { Tournament } from "@/data/landing";

import { Trophy, UsersRound } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
import { featuredTournaments } from "@/data/landing";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo";
import { columns } from "./components/TournamentColumns";
import { TournamentTable } from "./components/TournamentTable";

async function getData(): Promise<Tournament[]> {
  // Fetch data from your API here.
  return featuredTournaments;
}

export default async function HomePage() {
  const data = await getData();

  return (
    <main className="flex min-h-svh items-stretch bg-slate-950">
      <div className="flex w-[280px] flex-col items-stretch">
        <Link href="/" className="flex h-24 items-center justify-center gap-3">
          <Logo
            size={40}
            primaryShape="fill-indigo-500"
            secondaryShape="fill-indigo-700"
          />
          <p className="font-cursive text-2xl font-500 text-white">
            OpenArena
          </p>
        </Link>
        <div className="flex grow flex-col items-stretch px-4 py-10">
          <div className="flex flex-col items-stretch *:justify-start *:transition-transform">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-slate-300 hover:scale-105 hover:bg-slate-900 hover:text-white",
              )}
            >
              <Trophy size={24} />
              <p className="">Tournaments</p>
            </Link>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-slate-300 hover:scale-105 hover:bg-slate-900 hover:text-white",
              )}
            >
              <UsersRound size={24} />
              <p className="">Players</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex grow flex-col items-stretch p-2 pl-0">
        <div className="h-24"></div>
        <div className="grow overflow-y-scroll rounded-3xl border border-slate-800 bg-slate-900">
          <TournamentTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
