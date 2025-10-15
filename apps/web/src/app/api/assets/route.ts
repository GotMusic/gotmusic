import { db, schema } from "@/server/db";
import { and, desc, lt, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.url ? new URL(req.url) : { searchParams: new URLSearchParams() };

    // Parse query parameters
    const limit = Math.min(Number.parseInt(searchParams.get("limit") ?? "20", 10), 100);
    const cursor = searchParams.get("cursor"); // timestamp for cursor-based pagination
    const status = searchParams.get("status"); // "processing" | "ready" | "error"
    const q = searchParams.get("q"); // search query

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

    // Set headers
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
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
    console.error("[GET /api/assets] Error:", message, e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
