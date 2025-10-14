import { db, isSQLite, isPostgres } from "./config";
export { db, isSQLite, isPostgres };

// For now, use SQLite schema to avoid type issues
// TODO: Implement proper dual-driver support
import * as sqliteSchema from "./schema-sqlite";
export const schema = sqliteSchema;
