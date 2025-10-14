import { db, schema } from "@/server/db";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CompleteSchema = z.object({
  assetId: z.string().min(1),
  status: z.enum(["ready", "error"]).default("ready"),
  errorMessage: z.string().optional(),
});

/**
 * POST /api/upload/complete
 * Marks an asset as ready or error after processing
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Validate request body
    const validated = CompleteSchema.parse(body);
    const { assetId, status, errorMessage } = validated;

    // Verify asset exists
    const asset = db.select().from(schema.assets).where(eq(schema.assets.id, assetId)).get();

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Update asset status
    db.update(schema.assets)
      .set({
        status,
        updatedAt: Date.now(),
      })
      .where(eq(schema.assets.id, assetId))
      .run();

    console.log(`[upload/complete] Asset ${assetId} marked as ${status}`);

    return NextResponse.json({
      ok: true,
      assetId,
      status,
      message:
        status === "ready" ? "Asset processing complete" : (errorMessage ?? "Processing failed"),
    });
  } catch (e: unknown) {
    // Handle Zod validation errors
    if (e && typeof e === "object" && "name" in e && e.name === "ZodError") {
      console.error("[upload/complete] Validation error:", e);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const message = e instanceof Error ? e.message : "complete error";
    console.error("[upload/complete] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
