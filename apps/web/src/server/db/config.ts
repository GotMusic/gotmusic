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
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  return drizzle(pool, { schema: postgresSchema });
}

// Export the database instance
export const db = createDatabase();
