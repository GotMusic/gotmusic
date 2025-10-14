import { createLogger } from "@/lib/logger";
import { db, schema } from "@/server/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Readiness check endpoint - verifies database connectivity
 * Used by Kubernetes and orchestration systems
 */
export async function GET(request: Request) {
  const logger = createLogger();

  logger.info("Readiness check requested");

  try {
    // Test database connectivity with a simple query
    const result = await db.select().from(schema.assets).limit(1);

    logger.info("Database connectivity test successful", {
      driver: "postgres",
      resultCount: result.length,
    });

    return NextResponse.json(
      {
        status: "ready",
        timestamp: new Date().toISOString(),
        service: "gotmusic-api",
        database: {
          driver: "postgres",
          connected: true,
          testQuery: "success",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    logger.error(
      "Readiness check failed",
      error instanceof Error ? error : new Error(String(error)),
      {
        driver: "postgres",
      },
    );

    return NextResponse.json(
      {
        status: "not_ready",
        timestamp: new Date().toISOString(),
        service: "gotmusic-api",
        database: {
          driver: "postgres",
          connected: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 503 },
    );
  }
}
