import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "..";

export const users = pgTable("users", {
  id: varchar({ length: 63 }).primaryKey(),
  walletAddress: varchar("wallet_address", { length: 63 }).notNull(),
  name: varchar({ length: 255 }).notNull().unique(),
  playerName: varchar({ length: 255 }).notNull().unique(),
  imageId: varchar({ length: 63 }),
  ...timestamps,
});
