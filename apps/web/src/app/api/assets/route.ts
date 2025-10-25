import { queryFallbackAssets } from "@/lib/fallbackAssets";
import { createLogger } from "@/lib/logger";
import { db, schema } from "@/server/db";
import { and, asc, desc, lt, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Query parameter validation schema
const AssetsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(24), // 4 columns × 6 rows = 24
  cursor: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1), // Page-based pagination
  status: z.enum(["draft", "published", "archived", "processing", "ready", "error"]).optional(),
  q: z.string().min(1).max(200).optional(),
});

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

export async function GET(req: NextRequest) {
  const logger = createLogger();

  // Only log in tests so prod stays quiet and CI is happy
  if (process.env.NODE_ENV === "test") {
    logger.info("E2E assets GET", {
      e2eBypass: process.env.E2E_AUTH_BYPASS,
      path: req.nextUrl.pathname,
    });
  }

  try {
    const { searchParams } = req.url ? new URL(req.url) : { searchParams: new URLSearchParams() };

    // Validate and parse query parameters (convert null to undefined for Zod defaults)
    const queryValidation = AssetsQuerySchema.safeParse({
      limit: searchParams.get("limit") ?? undefined,
      cursor: searchParams.get("cursor") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      q: searchParams.get("q") ?? undefined,
    });

    if (!queryValidation.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: queryValidation.error.format(),
        },
        { status: 400 },
      );
    }

    const { limit, cursor, page, status, q } = queryValidation.data;

    // Build WHERE conditions
    const conditions = [];

    if (cursor) {
      conditions.push(lt(schema.assets.updatedAt, new Date(Number.parseInt(cursor, 10))));
    }

    if (status) {
      conditions.push(sql`${schema.assets.status} = ${status}`);
    }

    if (q) {
      // Case-insensitive search in title and artist
      conditions.push(
        sql`LOWER(${schema.assets.title}) LIKE LOWER(${`%${q}%`}) OR LOWER(${schema.assets.artist}) LIKE LOWER(${`%${q}%`})`,
      );
    }

    // Try database query, fallback to mock data
    let items: Array<{
      id: string;
      title: string;
      artist: string;
      bpm: number | null;
      keySig: string | null;
      priceAmount: number;
      priceCurrency: string;
      status: string;
      updatedAt: number;
      createdAt: number;
    }>;
    let totalCount: number | null;

    let fallbackResult: ReturnType<typeof queryFallbackAssets> | null = null;

    try {
      // Calculate offset for page-based pagination
      const offset = (page - 1) * limit;
      
      // Build and execute query
      const rawItems = await db
        .select()
        .from(schema.assets)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(
          // When searching, order by title for deterministic results
          q ? asc(schema.assets.title) : desc(schema.assets.updatedAt),
        )
        .limit(limit + 1) // Fetch one extra to determine if there's a next page
        .offset(offset);

      // Get total count (only if no filters, for efficiency)
      totalCount =
        !cursor && !status && !q
          ? await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.assets)
              .then((rows) => Number(rows[0]?.count ?? 0))
          : null;

      // Normalize DB types to API wire format (Postgres returns Date objects, DECIMAL as strings)
      items = rawItems.map((item) => ({
        id: item.id,
        title: item.title,
        artist: item.artist,
        bpm: item.bpm ?? null,
        keySig: item.keySig ?? null,
        priceAmount: toNumber(item.priceAmount),
        priceCurrency: item.priceCurrency,
        status: item.status,
        updatedAt: toMillis(item.updatedAt),
        createdAt: toMillis(item.createdAt),
      }));

      if (items.length < 8 && process.env.NODE_ENV !== "production") {
        throw new Error("Insufficient assets in database, falling back to static seed");
      }
    } catch (dbError) {
      // Database not available, use fallback test data
      fallbackResult = queryFallbackAssets({ limit, cursor, page, status, q });
      items = fallbackResult.items;
      totalCount = fallbackResult.totalCount;
      if (process.env.NODE_ENV === "test") {
        logger.info("Using fallback assets for API response", {
          reason: dbError instanceof Error ? dbError.message : "unknown",
        });
      }
    }

    // Determine if there are more results
    const hasMore = items.length > limit;
    const results = hasMore ? items.slice(0, limit) : items;

    // Generate next cursor
    const nextCursor =
      hasMore && results.length > 0
        ? results[results.length - 1]?.updatedAt.toString()
        : (fallbackResult?.nextCursor ?? null);

    // Set headers
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (totalCount !== null) {
      headers.set("X-Total-Count", totalCount.toString());
    } else if (fallbackResult) {
      headers.set("X-Total-Count", fallbackResult.totalCount.toString());
    }

    // Calculate pagination metadata
    const finalTotalCount = totalCount ?? fallbackResult?.totalCount ?? 0;
    const totalPages = finalTotalCount ? Math.ceil(finalTotalCount / limit) : null;
    const hasNextPage = hasMore || (totalPages ? page < totalPages : false);
    const hasPrevPage = page > 1;

    return new Response(
      JSON.stringify({
        items: results,
        nextCursor,
        pagination: {
          page,
          limit,
          totalCount: Number(finalTotalCount),
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
      }),
      {
        status: 200,
        headers,
      },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch assets";
    logger.error("Failed to fetch assets", { error: e });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
