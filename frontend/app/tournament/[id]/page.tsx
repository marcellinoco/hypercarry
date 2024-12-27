"use client";

import { useParams } from "next/navigation";

import { createMatches, getTournamentMatches } from "@/app/actions/match";
import { getTournamentById } from "@/app/actions/tournament";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { id } = useParams();
  console.log(id);

  const { data: tournamentData } = useQuery({
    queryKey: ["tournament"],
    queryFn: async () => {
      return await getTournamentById(String(id) ?? "");
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const { data: matchesData } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      return await getTournamentMatches(String(id) ?? "");
    },
    refetchOnWindowFocus: false,
    enabled: !!tournamentData,
  });

  console.log(matchesData);

  const handleCreateMatches = async () => {
    await createMatches(String(id));
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <Button onClick={handleCreateMatches}>
          Stop Registration and Create Matches
        </Button>
      </div>
      <div className="flex w-[40rem] flex-col items-center gap-2">
        <p className="font-cursive text-lg font-500 text-slate-400/70">
          Tournament
        </p>
        <div className="flex flex-col">
          <div className="grid w-full grid-cols-8">
            <h3 className="col-span-3">Tournament Title</h3>
            <h5 className="col-span-1 text-center">:</h5>
            <h5 className="col-span-4">{tournamentData?.tournament?.title}</h5>
          </div>
        </div>
      </div>
      <div className="flex w-[40rem] flex-col items-center gap-2">
        <p className="font-cursive text-lg font-500 text-slate-400/70">
          Matches
        </p>
        {!matchesData && "Registration phase is still ongoing"}
        {matchesData && matchesData.matches && (
          <div className="flex flex-col">
            {matchesData.matches.map((match, index) => (
              <div className="grid w-full grid-cols-8">
                <h3 className="col-span-3">Match {index}</h3>
                <h5 className="col-span-1 text-center">:</h5>
                <h5 className="col-span-4">
                  {new Date(match.startTimeUnix! * 1000).toString()}
                </h5>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
