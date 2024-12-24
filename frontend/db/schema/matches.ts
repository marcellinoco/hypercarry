import {
  date,
  index,
  integer,
  json,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

import { Tournaments } from "./tournaments";

export const Matches = pgTable("matches", {
  id: varchar({ length: 63 }).primaryKey(),
  tournamentId: varchar("tournament_id", { length: 63 }).references(
    () => Tournaments.id,
  ),
  players: json().default([]),
  startTimeUnix: integer("start_time_unix"),
});
