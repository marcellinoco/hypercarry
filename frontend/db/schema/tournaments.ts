import {
  date,
  doublePrecision,
  integer,
  json,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const tournaments = pgTable("tournaments", {
  id: varchar({ length: 63 }).primaryKey(),
  authorId: varchar({ length: 63 }).references(() => users.id),
  registeredPlayers: json("registered_players").default([]),
  maxParticipants: integer("max_participants"),
  registrationFee: integer("registration_fee"),
  organizerFee: integer("organizer_fee"),
  prizePoolPercentages: doublePrecision("prize_pool_percentages"),
  startTimeUnix: integer("start_time_unix"),
  endTimeUnix: integer("end_time_unix"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
