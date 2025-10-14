import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema-sqlite.ts",
  out: "./drizzle/pg",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://localhost:5432/gotmusic",
  },
});
