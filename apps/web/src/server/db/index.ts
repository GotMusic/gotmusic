import { db, isPostgres, isSQLite } from "./config";
export { db, isSQLite, isPostgres };

import * as postgresSchema from "./schema-postgres";
// Export the correct schema based on the driver
import * as sqliteSchema from "./schema-sqlite";

// Function to get the correct schema based on driver
export function getSchema() {
  return isPostgres ? postgresSchema : sqliteSchema;
}

// Export the schema object
export const schema = getSchema();

/** Cross-driver query helpers */
export const q = {
  /** Return all rows (SQLite: .all(); PG: await Promise) */
  all<T>(query: { all?: () => T[] } | Promise<T[]>): Promise<T[]> {
    if (typeof query?.all === "function") {
      // SQLite / better-sqlite3 path (sync)
      return Promise.resolve(query.all() as T[]);
    }
    // PG path (async)
    return query as Promise<T[]>;
  },

  /** Return a single row (SQLite: .get(); PG: await then pick [0]) */
  async one<T>(query: { get?: () => T | undefined } | Promise<T[]>): Promise<T | undefined> {
    if (typeof query?.get === "function") {
      return query.get() as T | undefined; // SQLite
    }
    const rows = (await query) as T[]; // PG
    return rows[0];
  },
};
