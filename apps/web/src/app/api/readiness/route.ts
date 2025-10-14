import { db, isPostgres, isSQLite, schema } from "@/server/db";
import { NextResponse } from "next/server";

/**
 * Readiness check endpoint - verifies database connectivity
 * Used by Kubernetes and orchestration systems
 */
export async function GET() {
  try {
    // Test database connectivity with a simple query
    const result = db.select().from(schema.assets).limit(1).all();

    return NextResponse.json(
      {
        status: "ready",
        timestamp: new Date().toISOString(),
        service: "gotmusic-api",
        database: {
          driver: isPostgres ? "postgres" : "sqlite",
          connected: true,
          testQuery: "success",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Readiness check failed:", error);

    return NextResponse.json(
      {
        status: "not_ready",
        timestamp: new Date().toISOString(),
        service: "gotmusic-api",
        database: {
          driver: isPostgres ? "postgres" : "sqlite",
          connected: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 503 },
    );
  }
}
