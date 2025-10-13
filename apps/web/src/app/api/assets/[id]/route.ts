import { db, schema } from "@/server/db";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const asset = db.select().from(schema.assets).where(eq(schema.assets.id, id)).get();

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json(asset);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch asset";
    console.error("[GET /api/assets/:id] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
