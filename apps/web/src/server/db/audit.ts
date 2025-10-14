import { createLogger } from "@/lib/logger";
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
export async function writeAuditEntry(entry: AuditEntry): Promise<void> {
  const logger = createLogger();
  const auditId = `audit-${entry.assetId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  try {
    await db.insert(schema.assetAudit).values({
      id: auditId,
      assetId: entry.assetId,
      operation: entry.operation,
      userId: entry.userId ?? null,
      before: entry.before ? JSON.stringify(entry.before) : null,
      after: entry.after ? JSON.stringify(entry.after) : null,
      changedFields: entry.changedFields ? JSON.stringify(entry.changedFields) : null,
    });

    logger.info("Audit entry written", {
      auditId,
      assetId: entry.assetId,
      operation: entry.operation,
      changedFields: entry.changedFields,
      userId: entry.userId,
    });
  } catch (error) {
    logger.error(
      "Failed to write audit entry",
      error instanceof Error ? error : new Error(String(error)),
      {
        auditId,
        assetId: entry.assetId,
        operation: entry.operation,
      },
    );
    throw error;
  }
}

/**
 * Helper to create audit entry for asset updates
 */
export async function auditAssetUpdate(
  assetId: string,
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  userId?: string,
): Promise<void> {
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

  await writeAuditEntry({
    assetId,
    operation,
    userId,
    before,
    after,
    changedFields,
  });
}
