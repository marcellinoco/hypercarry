import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { timestamp } from "drizzle-orm/pg-core";
import { Pool } from "pg";

import { matches } from "./schema/matches";
import { tournaments } from "./schema/tournaments";
import { users } from "./schema/users";

const schema = {
  users,
  tournaments,
  matches,
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, { schema, casing: "snake_case" });

export { db };
