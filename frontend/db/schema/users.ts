<<<<<<< HEAD
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
=======
import { pgTable, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "..";
>>>>>>> e4e06f3327e0c48f40677c8df79a5e4ab2725f8d

export const users = pgTable("users", {
  id: varchar({ length: 63 }).primaryKey(),
  walletAddress: varchar("wallet_address", { length: 63 }).notNull(),
  name: varchar({ length: 255 }).notNull().unique(),
  playerName: varchar({ length: 255 }).notNull().unique(),
  imageId: varchar({ length: 63 }),
<<<<<<< HEAD
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
=======
  ...timestamps,
>>>>>>> e4e06f3327e0c48f40677c8df79a5e4ab2725f8d
});
