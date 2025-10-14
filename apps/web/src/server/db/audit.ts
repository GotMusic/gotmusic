import { db, schema } from "./index";

export interface AuditEntry {
  assetId: string;
  operation: "create" | "update" | "delete" | "status_change";
  userId?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  changedFields?: string[];
}

/**
 * Write an audit entry to the asset_audit table
 * This is append-only - entries cannot be modified or deleted
 */
export function writeAuditEntry(entry: AuditEntry): void {
  const auditId = `audit-${entry.assetId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  db.insert(schema.assetAudit)
    .values({
      id: auditId,
      assetId: entry.assetId,
      operation: entry.operation,
      userId: entry.userId ?? null,
      before: entry.before ? JSON.stringify(entry.before) : null,
      after: entry.after ? JSON.stringify(entry.after) : null,
      changedFields: entry.changedFields ? JSON.stringify(entry.changedFields) : null,
    })
    .run();

  console.log(`[AUDIT] ${entry.operation} on asset ${entry.assetId}`, {
    changedFields: entry.changedFields,
    userId: entry.userId,
  });
}

/**
 * Helper to create audit entry for asset updates
 */
export function auditAssetUpdate(
  assetId: string,
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  userId?: string,
): void {
  // Find which fields actually changed
  const changedFields: string[] = [];
  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const key of allKeys) {
    if (before[key] !== after[key]) {
      changedFields.push(key);
    }
  }

  // Determine operation type
  const operation = changedFields.includes("status") ? "status_change" : "update";

  writeAuditEntry({
    assetId,
    operation,
    userId,
    before,
    after,
    changedFields,
  });
}
