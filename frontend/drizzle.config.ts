import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schema",
  dialect: "postgresql",
  migrations: {
    prefix: "timestamp",
    table: "migrations_version",
    schema: "public",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
});
