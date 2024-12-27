"use server";

import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

import { db } from "@/db";
import { matches } from "@/db/schema/matches";
import { oppCode } from "@/libs/constant";
import { getTournamentById } from "./tournament";

export async function createMatches(tournamentId: string) {
  // creating 5 random match inside the start and end time
  // current space between match is 1 hour
  const tournament = await getTournamentById(tournamentId);

  if (tournament.code === oppCode.SUCCESS && tournament.tournament) {
    const numberOfMatches = 5;
    const minSpacingHour = 1;

    const schedule = generateMatchSchedule(
      tournament.tournament.startTimeUnix!,
      tournament.tournament.endTimeUnix!,
      numberOfMatches,
      minSpacingHour,
    );

    try {
      schedule.map(async (time) => {
        await db.insert(matches).values({
          id: uuid(),
          startTimeUnix: time,
          tournamentId: tournamentId,
        });
      });
      return {
        code: oppCode.SUCCESS,
        message: "Matched has successfully created",
      };
    } catch {
      return {
        code: oppCode.UNKNOWN,
        message: "Internal Server Error",
      };
    }
  }

  return tournament;
}

function generateMatchSchedule(
  startTimeUnix: number,
  endTimeUnix: number,
  numberOfMatches: number,
  minSpacingHours: number,
) {
  const startTime = new Date(startTimeUnix * 1000).getTime();
  const endTime = new Date(endTimeUnix * 1000).getTime();
  const spacingMillis = minSpacingHours * 60 * 60 * 1000;

  const totalSlots = Math.floor((endTime - startTime) / spacingMillis);

  if (numberOfMatches > totalSlots) {
    throw new Error(
      "Not enough time to schedule matches with the given spacing.",
    );
  }

  const scheduledSlots = new Set<number>();
  while (scheduledSlots.size < numberOfMatches) {
    const randomSlot = Math.floor(Math.random() * totalSlots);
    scheduledSlots.add(randomSlot);
  }

  const schedule = [...scheduledSlots]
    .sort((a, b) => a - b)
    .map((slot) => {
      return new Date(startTime + slot * spacingMillis).getTime() / 1000;
    });

  return schedule;
}

export async function getTournamentMatches(tournamentId: string) {
  try {
    const response = await db
      .select()
      .from(matches)
      .where(eq(matches.tournamentId, tournamentId));
    return {
      code: oppCode.SUCCESS,
      message: "Matches successfully retrieved",
      matches: response,
    };
  } catch {
    return {
      code: oppCode.NOT_FOUND,
      message: "Matches not found",
    };
  }
}
