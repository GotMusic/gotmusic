import Database from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema-sqlite";

/**
 * Database configuration - SQLite only for now
 * TODO: Add Postgres support when needed
 */

export function createDatabase() {
  // SQLite configuration
  const dbPath = process.env.DATABASE_PATH || "./.data/dev.db";
  const sqlite = new Database(dbPath);

  return drizzleSqlite(sqlite, { schema });
}

// Export the database instance
export const db = createDatabase();

// Export driver info for debugging
export const dbDriver = "sqlite" as const;
export const isSQLite = true;
export const isPostgres = false;
