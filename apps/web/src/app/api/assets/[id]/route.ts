import { db, schema } from "@/server/db";
import { AssetSchema } from "@gotmusic/api";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const asset = db.select().from(schema.assets).where(eq(schema.assets.id, id)).get();

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Validate response with Zod
    const validated = AssetSchema.parse(asset);

    return NextResponse.json(validated);
  } catch (e: unknown) {
    // Handle Zod validation errors
    if (e && typeof e === "object" && "name" in e && e.name === "ZodError") {
      console.error("[GET /api/assets/:id] Validation error:", e);
      return NextResponse.json(
        { error: "Invalid asset data format" },
        { status: 500 },
      );
    }

    const message = e instanceof Error ? e.message : "Failed to fetch asset";
    console.error("[GET /api/assets/:id] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
