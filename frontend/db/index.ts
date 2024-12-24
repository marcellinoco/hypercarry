import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { timestamp } from "drizzle-orm/pg-core";
import { seed } from "drizzle-seed";
import { Pool } from "pg";

import { schema } from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, { schema: schema, casing: "snake_case" });

const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

export { db, timestamps };
