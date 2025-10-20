import { db, schema } from "@/server/db";
import { and, desc, lt, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Query parameter validation schema
const AssetsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
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
  // Debug logging for E2E
  console.log('E2E_AUTH_BYPASS', process.env.E2E_AUTH_BYPASS, 'path', req.nextUrl.pathname);
  
  try {
    const { searchParams } = req.url ? new URL(req.url) : { searchParams: new URLSearchParams() };

    // Validate and parse query parameters (convert null to undefined for Zod defaults)
    const queryValidation = AssetsQuerySchema.safeParse({
      limit: searchParams.get("limit") ?? undefined,
      cursor: searchParams.get("cursor") ?? undefined,
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

    const { limit, cursor, status, q } = queryValidation.data;

    // Build WHERE conditions
    const conditions = [];

    if (cursor) {
      conditions.push(lt(schema.assets.updatedAt, new Date(Number.parseInt(cursor, 10))));
    }

    if (status) {
      conditions.push(sql`${schema.assets.status} = ${status}`);
    }

    if (q) {
      // Search in title and artist
      conditions.push(
        sql`${schema.assets.title} LIKE ${`%${q}%`} OR ${schema.assets.artist} LIKE ${`%${q}%`}`,
      );
    }

    // Build and execute query
    const items = await db
      .select()
      .from(schema.assets)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(schema.assets.updatedAt))
      .limit(limit + 1); // Fetch one extra to determine if there's a next page

    // Determine if there are more results
    const hasMore = items.length > limit;
    const results = hasMore ? items.slice(0, limit) : items;

    // Generate next cursor
    const nextCursor =
      hasMore && results.length > 0 ? results[results.length - 1]?.updatedAt.toString() : null;

    // Get total count (only if no filters, for efficiency)
    const totalCount =
      !cursor && !status && !q
        ? await db
            .select({ count: sql<number>`count(*)` })
            .from(schema.assets)
            .then((rows) => rows[0]?.count ?? 0)
        : null;

    // Normalize DB types to API wire format (Postgres returns Date objects, DECIMAL as strings)
    const normalizedItems = results.map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.artist,
      bpm: item.bpm,
      keySig: item.keySig,
      priceAmount: toNumber(item.priceAmount),
      priceCurrency: item.priceCurrency,
      status: item.status,
      updatedAt: toMillis(item.updatedAt),
      createdAt: toMillis(item.createdAt),
    }));

    // Set headers
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (totalCount !== null) {
      headers.set("X-Total-Count", totalCount.toString());
    }

    return new Response(
      JSON.stringify({
        items: normalizedItems,
        nextCursor,
      }),
      {
        status: 200,
        headers,
      },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch assets";
    console.error("[GET /api/assets] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
