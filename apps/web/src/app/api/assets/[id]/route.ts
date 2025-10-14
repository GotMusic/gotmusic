import { db, schema } from "@/server/db";
import { AssetSchema } from "@gotmusic/api";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for PATCH updates (partial)
const UpdateAssetSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  artist: z.string().min(1).max(200).optional(),
  bpm: z.number().int().positive().optional(),
  keySig: z.string().max(10).optional(),
  priceAmount: z.number().positive().optional(),
  priceCurrency: z.string().length(3).optional(), // e.g., "USD", "PYUSD"
  status: z.enum(["processing", "ready", "error"]).optional(),
});

// In-memory idempotency key store (production: use Redis/DB)
const idempotencyStore = new Map<string, { response: unknown; timestamp: number }>();
const IDEMPOTENCY_TTL = 24 * 60 * 60 * 1000; // 24 hours

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
      return NextResponse.json({ error: "Invalid asset data format" }, { status: 500 });
    }

    const message = e instanceof Error ? e.message : "Failed to fetch asset";
    console.error("[GET /api/assets/:id] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Require Idempotency-Key header
    const idempotencyKey = req.headers.get("idempotency-key");
    if (!idempotencyKey) {
      return NextResponse.json({ error: "Idempotency-Key header is required" }, { status: 400 });
    }

    // Check idempotency store
    const cached = idempotencyStore.get(idempotencyKey);
    if (cached) {
      // Return cached response if still valid
      if (Date.now() - cached.timestamp < IDEMPOTENCY_TTL) {
        console.log("[PATCH /api/assets/:id] Idempotent request, returning cached response");
        return NextResponse.json(cached.response);
      }
      // Expired, remove from store
      idempotencyStore.delete(idempotencyKey);
    }

    // Verify asset exists
    const existingAsset = db.select().from(schema.assets).where(eq(schema.assets.id, id)).get();

    if (!existingAsset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Parse and validate request body
    const body = await req.json().catch(() => ({}));
    const validation = UpdateAssetSchema.safeParse(body);

    if (!validation.success) {
      // Return 422 for validation errors (per acceptance criteria)
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.format(),
        },
        { status: 422 },
      );
    }

    const updates = validation.data;

    // Ensure at least one field is being updated
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Update asset with timestamp
    db.update(schema.assets)
      .set({
        ...updates,
        updatedAt: Date.now(),
      })
      .where(eq(schema.assets.id, id))
      .run();

    // Fetch updated asset
    const updatedAsset = db.select().from(schema.assets).where(eq(schema.assets.id, id)).get();

    if (!updatedAsset) {
      return NextResponse.json({ error: "Failed to retrieve updated asset" }, { status: 500 });
    }

    // Validate response
    const validated = AssetSchema.parse(updatedAsset);

    // Store in idempotency cache
    idempotencyStore.set(idempotencyKey, {
      response: validated,
      timestamp: Date.now(),
    });

    // Clean up expired entries (simple cleanup)
    for (const [key, value] of idempotencyStore.entries()) {
      if (Date.now() - value.timestamp > IDEMPOTENCY_TTL) {
        idempotencyStore.delete(key);
      }
    }

    return NextResponse.json(validated);
  } catch (e: unknown) {
    // Handle Zod validation errors
    if (e && typeof e === "object" && "name" in e && e.name === "ZodError") {
      console.error("[PATCH /api/assets/:id] Validation error:", e);
      return NextResponse.json({ error: "Invalid asset data format" }, { status: 422 });
    }

    const message = e instanceof Error ? e.message : "Failed to update asset";
    console.error("[PATCH /api/assets/:id] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
