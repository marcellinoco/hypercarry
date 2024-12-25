import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar({ length: 63 }).primaryKey(),
  walletAddress: varchar("wallet_address", { length: 63 }).notNull(),
  name: varchar({ length: 255 }).notNull().unique(),
<<<<<<< HEAD
  playerName: varchar("player_name", { length: 255 }).notNull().unique(),
  imageId: varchar("image_id", { length: 63 }),
=======
  playerName: varchar({ length: 255 }).notNull().unique(),
  imageId: varchar({ length: 63 }),
>>>>>>> db7fcf63b32f4af3991c22f5033d9b60e8709d57
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
