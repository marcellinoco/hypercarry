import {
  date,
  index,
  integer,
  json,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

import { timestamps } from "..";
import { tournaments } from "./tournaments";

export const matches = pgTable("matches", {
  id: varchar({ length: 63 }).primaryKey(),
  tournamentId: varchar("tournament_id", { length: 63 }).references(
    () => tournaments.id,
  ),
  players: json().default([]),
  startTimeUnix: integer("start_time_unix"),
  ...timestamps,
});
