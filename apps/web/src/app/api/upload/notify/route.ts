import { generateId } from "@/lib/ulid";
import { db, schema } from "@/server/db";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const NotifySchema = z.object({
  assetId: z.string().min(1),
  key: z.string().min(1),
  contentType: z.string().optional(),
  bytes: z.number().int().positive().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Validate request body
    const validated = NotifySchema.parse(body);
    const { assetId, key, contentType, bytes } = validated;

    // Verify asset exists
    const asset = await db
      .select()
      .from(schema.assets)
      .where(eq(schema.assets.id, assetId))
      .then((rows) => rows[0]);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Insert asset_files row
    const fileId = generateId();
    db.insert(schema.assetFiles).values({
      id: fileId,
      assetId,
      kind: "original",
      storageKey: key,
      bytes: bytes ?? null,
      mime: contentType ?? null,
      checksum: null,
    });

    // Update asset status to processing
    await db
      .update(schema.assets)
      .set({
        status: "processing",
        updatedAt: new Date(),
      })
      .where(eq(schema.assets.id, assetId));

    // TODO: Trigger worker processing
    // In production, this would queue the job
    // For now, we'll process inline in development
    if (process.env.NODE_ENV === "development") {
      try {
        // Import and call worker (inline processing for dev)
        const { processUpload } = await import("@gotmusic/worker/src/processUpload");
        const result = await processUpload({
          key,
          contentType: contentType ?? "audio/mpeg",
          size: bytes ?? 0,
          producerId: asset.producerId,
        });

        if (result.success) {
          // Update asset with processing results
          await db
            .update(schema.assets)
            .set({
              status: "ready",
              updatedAt: new Date(),
            })
            .where(eq(schema.assets.id, assetId));
        } else {
          // Update asset with error status
          await db
            .update(schema.assets)
            .set({
              status: "error",
              updatedAt: new Date(),
            })
            .where(eq(schema.assets.id, assetId));
        }
      } catch (workerError) {
        console.error("Worker processing failed:", workerError);
        // Keep status as processing - will be retried
      }
    }

    return NextResponse.json({
      ok: true,
      fileId,
      assetId,
      status: "processing",
    });
  } catch (e: unknown) {
    // Handle Zod validation errors
    if (e && typeof e === "object" && "name" in e && e.name === "ZodError") {
      console.error("[upload/notify] Validation error:", e);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const message = e instanceof Error ? e.message : "notify error";
    console.error("[upload/notify] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
