"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";
import { Rows } from "lucide-react";
import Image from "next/image";

import { TournamentWithOwner } from "@/db/types";
import { tournamentBucketName } from "@/libs/constant";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { getFile } from "../actions/file";

export const columns: ColumnDef<TournamentWithOwner>[] = [
  {
    accessorKey: "gameImage",
    header: "Name",
    cell: ({ row }) => {
      const { data } = useQuery({
        queryKey: ["tournament-image"],
        queryFn: async () =>
          await getFile(
            tournamentBucketName,
            row.original.tournament.tournamentImageId ?? "",
          ),
      });
      return (
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg">
            {data && (
              <Image
                src={data}
                alt={row.original.tournament.game ?? ""}
                className="object-cover"
                fill
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{row.original.tournament.title}</p>
            <p className="text-sm text-slate-500">
              {row.original.tournament.game} - {row.original.owner.name}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "prizePool",
    header: "Prize Pool",
    cell: ({ row }) => {
      const [shouldAnimate, setShouldAnimate] = useState(false);
      const amount = Number(row.original.tournament.prizePool);

      useEffect(() => {
        // Small delay before starting animation
        const timer = setTimeout(() => {
          setShouldAnimate(true);
        }, 100);
        return () => clearTimeout(timer);
      }, []);

      return (
        <div className="font-medium">
          <NumberFlow
            value={shouldAnimate ? amount : 0}
            format={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
              notation: "compact",
            }}
            continuous
          />
        </div>
      );
    },
  },
  {
    accessorKey: "registeredTeams",
    header: "Participants",
    cell: ({ row }) => {
      const [shouldAnimate, setShouldAnimate] = useState(false);

      useEffect(() => {
        // Stagger the animation slightly after prize pool
        const timer = setTimeout(() => {
          setShouldAnimate(true);
        }, 200);
        return () => clearTimeout(timer);
      }, []);

      const currentParticipants = row.original.tournament
        .registeredPlayers as string[];

      return (
        <div className="font-medium">
          <NumberFlowGroup>
            <NumberFlow
              value={shouldAnimate ? currentParticipants.length : 0}
              continuous
            />
            <span className="mx-1">/</span>
            <NumberFlow
              value={
                shouldAnimate ? row.original.tournament.maxParticipants : 0
              }
              continuous
            />
          </NumberFlowGroup>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Event Date",
    cell: ({ row }) => {
      const startDate = new Date(row.original.tournament.startTimeUnix * 1000);
      const endDate = new Date(row.original.tournament.endTimeUnix * 1000);
      const currentDate = new Date();

      const formattedStart = format(startDate, "MMM d");
      const formattedEnd = format(endDate, "MMM d");

      const isOngoing = currentDate >= startDate && currentDate <= endDate;

      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">
            {isOngoing ? "Ongoing" : formattedStart} - {formattedEnd}
          </div>
          {isOngoing && (
            <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Live
            </div>
          )}
        </div>
      );
    },
  },
];
