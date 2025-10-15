import { createLogger } from "@/lib/logger";
import { db, schema } from "@/server/db";
import { auditAssetUpdate } from "@/server/db/audit";
import { AssetSchema } from "@gotmusic/api";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const logger = createLogger();

  try {
    const { id } = await params;
    logger.info("Asset fetch requested", { assetId: id });

    const asset = await db
      .select()
      .from(schema.assets)
      .where(eq(schema.assets.id, id))
      .then((rows) => rows[0]);

    if (!asset) {
      logger.warn("Asset not found", { assetId: id });
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Validate response with Zod
    const validated = AssetSchema.parse(asset);

    logger.info("Asset fetched successfully", { assetId: id });
    return NextResponse.json(validated);
  } catch (e: unknown) {
    // Handle Zod validation errors
    if (e && typeof e === "object" && "name" in e && e.name === "ZodError") {
      logger.error("Asset validation error", e instanceof Error ? e : new Error(String(e)), {
        assetId: (await params).id,
      });
      return NextResponse.json({ error: "Invalid asset data format" }, { status: 500 });
    }

    const message = e instanceof Error ? e.message : "Failed to fetch asset";
    logger.error("Asset fetch failed", e instanceof Error ? e : new Error(String(e)), {
      assetId: (await params).id,
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const logger = createLogger();

  try {
    const { id } = await params;
    logger.info("Asset update requested", { assetId: id });

    // Require Idempotency-Key header
    const idempotencyKey = req.headers.get("idempotency-key");
    if (!idempotencyKey) {
      logger.warn("Missing idempotency key", { assetId: id });
      return NextResponse.json({ error: "Idempotency-Key header is required" }, { status: 400 });
    }

    // Check idempotency store
    const cached = idempotencyStore.get(idempotencyKey);
    if (cached) {
      // Return cached response if still valid
      if (Date.now() - cached.timestamp < IDEMPOTENCY_TTL) {
        logger.info("Idempotent request, returning cached response", {
          assetId: id,
          idempotencyKey,
        });
        return NextResponse.json(cached.response);
      }
      // Expired, remove from store
      idempotencyStore.delete(idempotencyKey);
    }

    // Verify asset exists
    const existingAsset = await db
      .select()
      .from(schema.assets)
      .where(eq(schema.assets.id, id))
      .then((rows) => rows[0]);

    if (!existingAsset) {
      logger.warn("Asset not found for update", { assetId: id });
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Parse and validate request body
    const body = await req.json().catch(() => ({}));
    const validation = UpdateAssetSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Validation failed", {
        assetId: id,
        validationErrors: validation.error.format(),
      });
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
      logger.warn("No valid fields to update", { assetId: id });
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    logger.info("Updating asset", { assetId: id, updates });

    // Update asset with timestamp
    const updateData: Record<string, unknown> = { ...updates };

    // Convert priceAmount to string for PostgreSQL numeric type
    if (updateData.priceAmount !== undefined) {
      updateData.priceAmount = updateData.priceAmount.toString();
    }

    await db
      .update(schema.assets)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(schema.assets.id, id));

    // Fetch updated asset
    const updatedAsset = await db
      .select()
      .from(schema.assets)
      .where(eq(schema.assets.id, id))
      .then((rows) => rows[0]);

    // Write audit entry for the update
    if (updatedAsset) {
      logger.info("Writing audit entry", { assetId: id, changedFields: Object.keys(updates) });
      await auditAssetUpdate(
        id,
        existingAsset,
        updatedAsset,
        undefined, // TODO: Add user ID when auth is implemented
      );
    }

    if (!updatedAsset) {
      logger.error("Failed to retrieve updated asset", new Error("Asset not found after update"), {
        assetId: id,
      });
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

    logger.info("Asset updated successfully", { assetId: id, changedFields: Object.keys(updates) });
    return NextResponse.json(validated);
  } catch (e: unknown) {
    // Handle Zod validation errors
    if (e && typeof e === "object" && "name" in e && e.name === "ZodError") {
      logger.error("Asset validation error", e instanceof Error ? e : new Error(String(e)), {
        assetId: (await params).id,
      });
      return NextResponse.json({ error: "Invalid asset data format" }, { status: 422 });
    }

    const message = e instanceof Error ? e.message : "Failed to update asset";
    logger.error("Asset update failed", e instanceof Error ? e : new Error(String(e)), {
      assetId: (await params).id,
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
