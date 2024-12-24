import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: varchar({ length: 63 }).primaryKey(),
  walletAddress: varchar("wallet_address", { length: 63 }),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  imageId: varchar({ length: 63 }),
});
