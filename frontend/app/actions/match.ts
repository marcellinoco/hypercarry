"use server";

import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

import { db } from "@/db";
import { matches } from "@/db/schema/matches";
import { tournaments } from "@/db/schema/tournaments";
import { Match } from "@/db/types";
import { getRandomHour } from "@/libs";
import { oppCode } from "@/libs/constant";
import { getTournamentById } from "./tournament";

export async function createMatches(tournamentId: string) {
  // I need to create a random schedule which are ranged inclusive to starttime and endtime
  // I want to create 5 schedule for every game

  const tournament = await getTournamentById(tournamentId);

  if (tournament.code === oppCode.SUCCESS && tournament.tournament) {
    const numberOfMatches = 5;
    const minSpacingHour = 12;

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
  startTimeUnix: number, // Start time in Unix timestamp
  endTimeUnix: number, // End time in Unix timestamp
  numberOfMatches: number, // Total matches to schedule
  minSpacingHours: number, // Minimum spacing between matches
) {
  const startTime = new Date(startTimeUnix * 1000).getTime();
  const endTime = new Date(endTimeUnix * 1000).getTime();
  const spacingMillis = minSpacingHours * 60 * 60 * 1000;

  // Calculate available slots
  const totalSlots = Math.floor((endTime - startTime) / spacingMillis);

  if (numberOfMatches > totalSlots) {
    throw new Error(
      "Not enough time to schedule matches with the given spacing.",
    );
  }

  // Generate random slots for matches
  const scheduledSlots = new Set<number>(); // Use a set to avoid duplicates
  while (scheduledSlots.size < numberOfMatches) {
    const randomSlot = Math.floor(Math.random() * totalSlots);
    scheduledSlots.add(randomSlot);
  }

  // Convert slots back to actual times
  const schedule = [...scheduledSlots]
    .sort((a, b) => a - b)
    .map((slot) => {
      return new Date(startTime + slot * spacingMillis).getTime() / 1000;
    });

  return schedule;
}
