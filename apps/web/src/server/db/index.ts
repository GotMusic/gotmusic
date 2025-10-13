import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const dbPath = process.env.DB_PATH ?? ".data/dev.db";

// Ensure .data directory exists (better-sqlite3 will create the file)
// In production, this would be handled by deployment setup
const sqlite = new Database(dbPath);

// Enable WAL mode for better concurrent access
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
export { schema };
