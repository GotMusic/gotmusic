import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as postgresSchema from "./schema-postgres";

/**
 * PostgreSQL-only database configuration
 */

export function createDatabase() {
  // Postgres configuration
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is required for Postgres");
  }

  const pool = new Pool({
    connectionString,
    // Only use SSL in actual production deployment (disable for local, test, CI, E2E)
    ssl:
      process.env.NODE_ENV === "production" && !process.env.CI && !process.env.E2E_AUTH_BYPASS
        ? { rejectUnauthorized: false }
        : false,
  });

  return drizzle(pool, { schema: postgresSchema });
}

// Export the database instance (lazy initialization)
let _db: ReturnType<typeof createDatabase> | null = null;

export function getDatabase() {
  if (!_db) {
    _db = createDatabase();
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof createDatabase>, {
  get(target, prop) {
    return getDatabase()[prop as keyof ReturnType<typeof createDatabase>];
  },
});
