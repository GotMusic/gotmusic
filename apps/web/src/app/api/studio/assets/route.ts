import { createLogger } from "@/lib/logger";
import { db } from "@/server/db";
import { assetsPg } from "@/server/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Query parameters schema
const StudioAssetsQuerySchema = z.object({
  producerId: z.string().min(1, "Producer ID is required"),
  status: z.enum(["draft", "published", "archived"]).optional(),
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export async function GET(req: NextRequest) {
  const logger = createLogger();

  try {
    const { searchParams } = new URL(req.url);
    const query = {
      producerId: searchParams.get("producerId"),
      status: searchParams.get("status") || undefined,
      limit: searchParams.get("limit"),
      offset: searchParams.get("offset"),
    };

    // Validate query parameters
    const parseResult = StudioAssetsQuerySchema.safeParse(query);
    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    const { producerId, status, limit, offset } = parseResult.data;

    // Build query conditions
    const conditions = [eq(assetsPg.ownerId, producerId)];

    if (status) {
      conditions.push(eq(assetsPg.status, status));
    }

    // Fetch assets
    const assets = await db
      .select({
        id: assetsPg.id,
        title: assetsPg.title,
        artist: assetsPg.artist,
        bpm: assetsPg.bpm,
        keySig: assetsPg.keySig,
        status: assetsPg.status,
        priceAmount: assetsPg.priceAmount,
        priceCurrency: assetsPg.priceCurrency,
        createdAt: assetsPg.createdAt,
        updatedAt: assetsPg.updatedAt,
      })
      .from(assetsPg)
      .where(and(...conditions))
      .orderBy(desc(assetsPg.updatedAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(assetsPg)
      .where(and(...conditions))
      .then((rows) => rows[0]?.count ?? 0);

    // Normalize timestamps
    const normalizedAssets = assets.map((asset) => ({
      ...asset,
      createdAt: asset.createdAt.getTime(),
      updatedAt: asset.updatedAt.getTime(),
    }));

    logger.info("Studio assets fetched", {
      producerId,
      count: assets.length,
      totalCount,
      filters: { status },
    });

    // E2E diagnostic logging
    if (process.env.NODE_ENV === "test") {
      console.log(`[E2E] Studio assets API: producerId=${producerId}, count=${assets.length}, totalCount=${totalCount}`);
    }

    return NextResponse.json({
      assets: normalizedAssets,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch studio assets";
    logger.error("[studio/assets] Error:", e instanceof Error ? e : new Error(message));
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
