import {
  bigint,
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
  authorId: varchar("author_id", { length: 63 }).references(() => users.id),
  title: varchar({ length: 255 }),
  game: varchar({ length: 255 }),
  tournamentImageId: varchar("tournament_image_id", { length: 255 }),
  format: varchar({ length: 255 }),
  region: varchar({ length: 255 }),
  prizePool: bigint("prize_pool", { mode: "bigint" }),
  registeredPlayers: json("registered_players").default([]),
  maxParticipants: integer("max_participants").notNull(),
  registrationFee: doublePrecision("registration_fee").notNull(),
  organizerFee: integer("organizer_fee").notNull(),
  prizePoolPercentages: doublePrecision("prize_pool_percentages").notNull(),
  startTimeUnix: integer("start_time_unix").notNull(),
  endTimeUnix: integer("end_time_unix").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
