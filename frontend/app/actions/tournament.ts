"use server";

import { eq } from "drizzle-orm";

import { RegisterPlayerSpec } from "@/contracts/tournament";
import { db } from "@/db";
import { tournaments } from "@/db/schema/tournaments";
import { users } from "@/db/schema/users";
import { Tournament, TournamentWithOwner, User } from "@/db/types";
import { oppCode } from "@/libs/constant";

export async function createTournament(tournament: Tournament) {
  try {
    const createdTournament = await db
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
        format: tournament.format,
        game: tournament.game,
        tournamentImageId: tournament.tournamentImageId,
        prizePool: tournament.prizePool,
        region: tournament.region,
        title: tournament.title,
      })
      .returning({
        id: tournaments.id,
      });

    console.log(createdTournament);
    return {
      code: oppCode.SUCCESS,
      message: "Tournament successfully created",
      tournament: createdTournament,
    };
  } catch (error: any) {
    console.log(error);
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
    const rows = await db
      .select({
        tournament: tournaments,
        user: users,
      })
      .from(tournaments)
      .leftJoin(users, eq(tournaments.authorId, users.id))
      .limit(10);

    const result: TournamentWithOwner[] = rows.map((data) => {
      const response: TournamentWithOwner = {
        tournament: data.tournament,
        owner: data.user!,
      };
      return response;
    });

    return {
      code: oppCode.SUCCESS,
      tournamentsWithOwner: result,
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
