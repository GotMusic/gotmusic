import { db, schema } from "@/server/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure server runtime

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  // if someone threw a string/object, serialize safely
  try {
    return typeof e === "string" ? e : JSON.stringify(e);
  } catch {
    return String(e);
  }
}

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
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}
