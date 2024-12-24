"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";
import Image from "next/image";

import { Tournament } from "@/data/landing";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tournament>[] = [
  {
    accessorKey: "gameImage",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg">
            <Image
              src={row.getValue("gameImage")}
              alt={row.original.game}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{row.original.title}</p>
            <p className="text-sm text-slate-500">
              {row.original.game} - {row.original.organizer.name}
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
      const amount = parseFloat(row.getValue("prizePool"));

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

      return (
        <div className="font-medium">
          <NumberFlowGroup>
            <NumberFlow
              value={shouldAnimate ? row.original.registeredTeams : 0}
              continuous
            />
            <span className="mx-1">/</span>
            <NumberFlow
              value={shouldAnimate ? row.original.maxTeams : 0}
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
      const startDate = new Date(row.original.startDate);
      const endDate = new Date(row.original.endDate);
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
