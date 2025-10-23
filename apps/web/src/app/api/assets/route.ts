import { createLogger } from "@/lib/logger";
import { db, schema } from "@/server/db";
import { and, asc, desc, lt, sql } from "drizzle-orm";
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
  const logger = createLogger();

  // Only log in tests so prod stays quiet and CI is happy
  if (process.env.NODE_ENV === "test") {
    logger.info("E2E assets GET", {
      e2eBypass: process.env.E2E_AUTH_BYPASS,
      path: req.nextUrl.pathname,
    });
  }

  // Mock data for development when database is not available
  const mockAssets = [
    {
      id: "asset-001",
      title: "Midnight Glass",
      artist: "Luna Echo",
      bpm: 128,
      keySig: "C minor",
      priceAmount: 0.05,
      priceCurrency: "ETH",
      status: "published",
      updatedAt: Date.now(),
      createdAt: Date.now() - 86400000,
    },
    {
      id: "asset-002",
      title: "Neon Dreams",
      artist: "Cyber Pulse",
      bpm: 140,
      keySig: "A major",
      priceAmount: 0.08,
      priceCurrency: "ETH",
      status: "published",
      updatedAt: Date.now() - 3600000,
      createdAt: Date.now() - 172800000,
    },
    {
      id: "asset-003",
      title: "Digital Sunset",
      artist: "Synth Wave",
      bpm: 120,
      keySig: "F# minor",
      priceAmount: 0.06,
      priceCurrency: "ETH",
      status: "published",
      updatedAt: Date.now() - 7200000,
      createdAt: Date.now() - 259200000,
    },
  ];

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
      bpm: number;
      keySig: string;
      priceAmount: number;
      priceCurrency: string;
      status: string;
      updatedAt: number;
      createdAt: number;
    }>;
    let totalCount: number | null;

    try {
      // Build and execute query
      const rawItems = await db
        .select()
        .from(schema.assets)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(
          // When searching, order by title for deterministic results
          q ? asc(schema.assets.title) : desc(schema.assets.updatedAt),
        )
        .limit(limit + 1); // Fetch one extra to determine if there's a next page

      // Get total count (only if no filters, for efficiency)
      totalCount =
        !cursor && !status && !q
          ? await db
              .select({ count: sql<number>`count(*)` })
              .from(schema.assets)
              .then((rows) => rows[0]?.count ?? 0)
          : null;

      // Normalize DB types to API wire format (Postgres returns Date objects, DECIMAL as strings)
      items = rawItems.map((item) => ({
        id: item.id,
        title: item.title,
        artist: item.artist,
        bpm: item.bpm ?? 0,
        keySig: item.keySig ?? "",
        priceAmount: toNumber(item.priceAmount),
        priceCurrency: item.priceCurrency,
        status: item.status,
        updatedAt: toMillis(item.updatedAt),
        createdAt: toMillis(item.createdAt),
      }));
    } catch (dbError) {
      // Database not available, use mock data
      items = mockAssets;
      totalCount = mockAssets.length;
    }

    // Determine if there are more results
    const hasMore = items.length > limit;
    const results = hasMore ? items.slice(0, limit) : items;

    // Generate next cursor
    const nextCursor =
      hasMore && results.length > 0 ? results[results.length - 1]?.updatedAt.toString() : null;

    // Set headers
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (totalCount !== null) {
      headers.set("X-Total-Count", totalCount.toString());
    }

    return new Response(
      JSON.stringify({
        items: results,
        nextCursor,
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
