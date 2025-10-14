import { db, isSQLite, isPostgres } from "./config";
export { db, isSQLite, isPostgres };

// Export the correct schema based on the driver
import * as sqliteSchema from "./schema-sqlite";
import * as postgresSchema from "./schema-postgres";

// Function to get the correct schema based on driver
export function getSchema() {
  return isPostgres ? postgresSchema : sqliteSchema;
}

// Export the schema object
export const schema = getSchema();
