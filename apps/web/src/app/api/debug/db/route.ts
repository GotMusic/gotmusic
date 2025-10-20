import { db, schema } from "@/server/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure server runtime

export async function GET() {
  try {
    const rows = await db
      .select({ id: schema.assets.id, title: schema.assets.title, ownerId: schema.assets.ownerId })
      .from(schema.assets)
      .limit(10);
    return NextResponse.json({
      count: rows.length,
      assets: rows,
      databaseUrl: process.env.DATABASE_URL || "not set",
    });
  } catch (e: unknown) {
    return new NextResponse(`DB error: ${e?.message ?? "unknown"}`, { status: 500 });
  }
}
