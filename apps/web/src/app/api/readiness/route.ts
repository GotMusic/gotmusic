import { createLogger } from "@/lib/logger";
import { db, isPostgres, isSQLite, schema } from "@/server/db";
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
    const result = db.select().from(schema.assets).limit(1).all();

    logger.info("Database connectivity test successful", {
      driver: isPostgres ? "postgres" : "sqlite",
      resultCount: result.length,
    });

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
    logger.error(
      "Readiness check failed",
      error instanceof Error ? error : new Error(String(error)),
      {
        driver: isPostgres ? "postgres" : "sqlite",
      },
    );

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
