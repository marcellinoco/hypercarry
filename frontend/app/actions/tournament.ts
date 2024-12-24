"use server";

import { eq } from "drizzle-orm";

import { RegisterPlayerSpec } from "@/contracts/tournament";
import { db } from "@/db";
import { tournaments } from "@/db/schema/tournaments";
import { Tournament } from "@/db/types";
import { oppCode } from "@/libs/constant";

export async function createTournament(tournament: Tournament) {
  try {
    const createdTournament = db
      .insert(tournaments)
      .values({
        id: tournament.id,
        authorId: tournament.authorId,
        startTimeUnix: tournament.startTimeUnix,
        endTimeUnix: tournament.endTimeUnix,
        maxParticipants: tournament.maxParticipants,
        organizerFee: tournament.organizerFee,
        prizePoolPercentages: tournament.prizePoolPercentages,
        registeredPlayers: tournament.registeredPlayers,
        registrationFee: tournament.registrationFee,
      })
      .returning({
        id: tournaments.id,
      });
    return {
      code: oppCode.SUCCESS,
      message: "Tournament successfully created",
      tournament: createdTournament,
    };
  } catch {
    return {
      code: oppCode.UNKNOWN,
      message: "Internal Server Error",
    };
  }
}

export async function registerPlayer(spec: RegisterPlayerSpec) {
  const newUserId = spec.playerId;
  try {
    const oldUser = await db.query.tournaments.findFirst({
      where: eq(tournaments.id, spec.tournamentId),
    });

    if (!oldUser) {
      return {
        code: oppCode.NOT_FOUND,
        messsage: "Tournament not found",
      };
    }

    if (!Array.isArray(oldUser.registeredPlayers)) {
      return {
        code: oppCode.INVALID_DATA,
        message: "Invalid registered player format",
      };
    }

    console.log("test: ", oldUser.registeredPlayers);

    if (oldUser.registeredPlayers.includes(newUserId)) {
      return {
        code: oppCode.ALREADY_REGISTERED,
        message: "Player already registered",
      };
    }

    const json = oldUser.registeredPlayers || [];

    if (Array.isArray(json)) {
      const updated = [...json, newUserId];
      await db
        .update(tournaments)
        .set({ registeredPlayers: updated })
        .where(eq(tournaments.id, spec.tournamentId));
      return {
        code: oppCode.SUCCESS,
        message: "Player successfully registered to selected tournament",
      };
    }
  } catch {
    return {
      code: oppCode.UNKNOWN,
      message: "Internal Server Error",
    };
  }
}

export async function getTournaments() {
  try {
    const response = db.select().from(tournaments).limit(10);

    return {
      code: oppCode.SUCCESS,
      tournaments: response,
      message: "Tournaments successfully retrieved",
    };
  } catch {
    return {
      code: oppCode.UNKNOWN,
      message: "Internal server error",
    };
  }
}

export async function getTournamentById(tournamentId: string) {
  try {
    const response = await db.query.tournaments.findFirst({
      where: eq(tournaments.id, tournamentId),
    });

    if (!response) {
      return {
        code: oppCode.NOT_FOUND,
        message: "Tournament not found",
      };
    }

    return {
      code: oppCode.SUCCESS,
      tournament: response,
      message: "Tournament successfully retrieved",
    };
  } catch {
    return {
      code: oppCode.UNKNOWN,
      message: "Internal server error",
    };
  }
}
