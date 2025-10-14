import { db, isPostgres } from "./config";
export { db };
export * from "./schema";

// Export schema object for compatibility
import { 
  assetsSqlite, assetFilesSqlite, assetAuditSqlite,
  assetsPg, assetFilesPg, assetAuditPg
} from "./schema";

export const schema = isPostgres 
  ? { assets: assetsPg, assetFiles: assetFilesPg, assetAudit: assetAuditPg }
  : { assets: assetsSqlite, assetFiles: assetFilesSqlite, assetAudit: assetAuditSqlite };
