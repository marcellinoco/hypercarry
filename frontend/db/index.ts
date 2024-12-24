import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { Pool } from "pg";

import { Matches } from "./schema/matches";
import { Tournaments } from "./schema/tournaments";
import { Users } from "./schema/users";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const db = drizzle({ client: pool });

export { db };
