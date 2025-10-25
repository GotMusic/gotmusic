import { getFallbackAssetById } from "@/lib/fallbackAssets";
import { createLogger } from "@/lib/logger";
import { db, schema } from "@/server/db";
import { auditAssetUpdate } from "@/server/db/audit";
import { AssetSchema } from "@gotmusic/api";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Helpers to normalize DB types to API wire format
const toMillis = (v: unknown): number => {
  if (v instanceof Date) return v.getTime();
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const parsed = Date.parse(v);
    return Number.isNaN(parsed) ? Date.now() : parsed;
  }
  return Date.now();
};

const toNumber = (v: unknown): number => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const parsed = Number.parseFloat(v);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

// Schema for PATCH updates (partial)
const UpdateAssetSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  artist: z.string().min(1).max(200).optional(),
  bpm: z.number().int().positive().optional(),
  keySig: z.string().max(10).optional(),
  priceAmount: z.number().positive().optional(),
  priceCurrency: z.string().length(3).optional(), // e.g., "USD", "PYUSD"
  status: z.enum(["draft", "published", "archived", "processing", "ready", "error"]).optional(),
});

// In-memory idempotency key store (production: use Redis/DB)
const idempotencyStore = new Map<string, { response: unknown; timestamp: number }>();
const IDEMPOTENCY_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const logger = createLogger();

  try {
    const { id } = await params;
    logger.info("Asset fetch requested", { assetId: id });

    let dbAsset: typeof schema.assets.$inferSelect | undefined;

    try {
      dbAsset = await db
        .select()
        .from(schema.assets)
        .where(eq(schema.assets.id, id))
        .then((rows) => rows[0]);
    } catch (dbError) {
      logger.warn("Database fetch failed, attempting fallback asset", {
        assetId: id,
        error: dbError instanceof Error ? dbError.message : "unknown",
      });
    }

    const normalizedAsset = dbAsset
      ? {
          id: dbAsset.id,
          title: dbAsset.title,
          artist: dbAsset.artist,
          bpm: dbAsset.bpm,
          keySig: dbAsset.keySig,
          priceAmount: toNumber(dbAsset.priceAmount),
          priceCurrency: dbAsset.priceCurrency,
          status: dbAsset.status,
          updatedAt: toMillis(dbAsset.updatedAt),
          createdAt: toMillis(dbAsset.createdAt),
        }
      : getFallbackAssetById(id);

    if (!normalizedAsset) {
      logger.warn("Asset not found", { assetId: id });

      if (process.env.NODE_ENV === "test") {
        logger.info("Asset not found in DB or fallback seed", { assetId: id });
      }

      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const validated = AssetSchema.parse({
      ...normalizedAsset,
      bpm: normalizedAsset.bpm ?? null,
      keySig: normalizedAsset.keySig ?? null,
      updatedAt: toMillis(normalizedAsset.updatedAt),
      createdAt: toMillis(normalizedAsset.createdAt),
      priceAmount: toNumber(normalizedAsset.priceAmount),
    });

    logger.info("Asset fetched successfully", { assetId: id, fallback: !dbAsset });
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
    if (updateData.priceAmount !== undefined && updateData.priceAmount !== null) {
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

    // Normalize DB types before validation
    const normalizedUpdatedAsset = {
      id: updatedAsset.id,
      title: updatedAsset.title,
      artist: updatedAsset.artist,
      bpm: updatedAsset.bpm,
      keySig: updatedAsset.keySig,
      priceAmount: toNumber(updatedAsset.priceAmount),
      priceCurrency: updatedAsset.priceCurrency,
      status: updatedAsset.status,
      updatedAt: toMillis(updatedAsset.updatedAt),
      createdAt: toMillis(updatedAsset.createdAt),
    };

    // Validate response
    const validated = AssetSchema.parse(normalizedUpdatedAsset);

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
