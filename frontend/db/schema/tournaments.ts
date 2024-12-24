import { date, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

import { Users } from "./users";

export const Tournaments = pgTable("tournaments", {
  id: varchar({ length: 63 }).primaryKey(),
  authorId: varchar({ length: 63 }).references(() => Users.id),
  registeredPlayers: json("registered_players").default([]),
  startTimeUnix: integer("start_time_unix"),
  endTimeUnix: integer("end_time_unix"),
});
