import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { tournaments } from "./tournaments";

export const matches = pgTable("matches", {
  id: varchar({ length: 63 }).primaryKey(),
  tournamentId: varchar("tournament_id", { length: 63 }).references(
    () => tournaments.id,
  ),
  startTimeUnix: integer("start_time_unix"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
