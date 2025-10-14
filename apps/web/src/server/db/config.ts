import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { Pool } from "pg";
import { 
  assetsSqlite, assetFilesSqlite, assetAuditSqlite,
  assetsPg, assetFilesPg, assetAuditPg,
  assetRelationsSqlite, assetFileRelationsSqlite, assetAuditRelationsSqlite,
  assetRelationsPg, assetFileRelationsPg, assetAuditRelationsPg
} from "./schema";

/**
 * Database configuration supporting both SQLite and Postgres
 * Controlled by DB_DRIVER environment variable
 */

export type DatabaseDriver = "sqlite" | "pg";

export function getDatabaseDriver(): DatabaseDriver {
  const driver = process.env.DB_DRIVER as DatabaseDriver;
  if (driver === "pg") return "pg";
  return "sqlite"; // Default to SQLite
}

export function createDatabase() {
  const driver = getDatabaseDriver();
  
  if (driver === "pg") {
    // Postgres configuration
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is required for Postgres");
    }
    
    const pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
    
    return drizzle(pool, { 
      schema: { 
        assets: assetsPg, 
        assetFiles: assetFilesPg, 
        assetAudit: assetAuditPg,
        assetRelations: assetRelationsPg,
        assetFileRelations: assetFileRelationsPg,
        assetAuditRelations: assetAuditRelationsPg
      } 
    });
  } else {
    // SQLite configuration (default)
    const dbPath = process.env.DATABASE_PATH || "./sqlite.db";
    const sqlite = new Database(dbPath);
    
    return drizzleSqlite(sqlite, { 
      schema: { 
        assets: assetsSqlite, 
        assetFiles: assetFilesSqlite, 
        assetAudit: assetAuditSqlite,
        assetRelations: assetRelationsSqlite,
        assetFileRelations: assetFileRelationsSqlite,
        assetAuditRelations: assetAuditRelationsSqlite
      } 
    });
  }
}

// Export the database instance
export const db = createDatabase();

// Export driver info for debugging
export const dbDriver = getDatabaseDriver();
export const isPostgres = dbDriver === "pg";
export const isSQLite = dbDriver === "sqlite";
