import { db, isSQLite, isPostgres } from "./config";
export { db, isSQLite, isPostgres };

// Export the correct schema based on the driver
import * as sqliteSchema from "./schema-sqlite";
import * as postgresSchema from "./schema-postgres";

export const schema = isPostgres ? postgresSchema : sqliteSchema;
