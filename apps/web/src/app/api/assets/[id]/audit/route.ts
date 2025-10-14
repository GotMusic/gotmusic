import { db, schema } from "@/server/db";
import { desc, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/assets/:id/audit
 * Returns audit log for an asset (append-only)
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Verify asset exists
    const asset = await db
      .select()
      .from(schema.assets)
      .where(eq(schema.assets.id, id))
      .then((rows) => rows[0]);
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Get audit logs for this asset, ordered by creation time (newest first)
    const auditLogs = await db
      .select()
      .from(schema.assetAudit)
      .where(eq(schema.assetAudit.assetId, id))
      .orderBy(desc(schema.assetAudit.createdAt));

    // Parse JSON fields for response
    const formattedLogs = auditLogs.map((log) => ({
      id: log.id,
      assetId: log.assetId,
      operation: log.operation,
      userId: log.userId,
      before: log.before ? JSON.parse(log.before) : null,
      after: log.after ? JSON.parse(log.after) : null,
      changedFields: log.changedFields ? JSON.parse(log.changedFields) : [],
      createdAt: log.createdAt,
    }));

    return NextResponse.json({
      assetId: id,
      auditLogs: formattedLogs,
      total: formattedLogs.length,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch audit log";
    console.error("[GET /api/assets/:id/audit] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
