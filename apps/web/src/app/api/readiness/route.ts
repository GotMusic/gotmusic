import { createLogger } from "@/lib/logger";
import { db, schema } from "@/server/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Readiness check endpoint - validates DB connectivity, migrations, and seed data
 * Used by CI/E2E tests and deployment health checks
 *
 * Returns 200 if ready, 503 if not ready
 */
export async function GET(request: Request) {
  const logger = createLogger();
  const checks: Record<string, boolean> = {};
  const errors: string[] = [];

  try {
    // 1. Check database connectivity
    try {
      await db.execute(sql`SELECT 1`);
      checks.db_connected = true;
    } catch (e) {
      checks.db_connected = false;
      errors.push(`DB connection failed: ${e instanceof Error ? e.message : "unknown"}`);
    }

    // 2. Check if assets table exists (migrations applied)
    try {
      // Use information_schema to check table existence without querying the table
      const result = await db.execute(sql`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'assets'
        ) AS table_exists
      `);
      const tableExists = result.rows[0]?.table_exists;
      checks.migrations_applied = Boolean(tableExists);
      if (!tableExists) {
        errors.push("Assets table does not exist - migrations not applied");
      }
    } catch (e) {
      checks.migrations_applied = false;
      errors.push(`Migrations check failed: ${e instanceof Error ? e.message : "unknown"}`);
    }

    // 3. Check if seed data exists (at least 1 asset) - only if table exists
    try {
      if (checks.migrations_applied) {
        const count = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.assets)
          .then((rows) => rows[0]?.count ?? 0);

        checks.seed_data = count > 0;

        if (count === 0) {
          errors.push("No seed data found (expected at least 1 asset)");
        }
      } else {
        checks.seed_data = false;
        errors.push("Cannot check seed data - migrations not applied");
      }
    } catch (e) {
      checks.seed_data = false;
      errors.push(`Seed check failed: ${e instanceof Error ? e.message : "unknown"}`);
    }

    // Determine overall readiness
    const ready = Object.values(checks).every((check) => check === true);

    if (ready) {
      logger.info("Readiness check passed", { checks });
      return NextResponse.json(
        {
          status: "ready",
          timestamp: new Date().toISOString(),
          service: "gotmusic-api",
          checks,
        },
        { status: 200 },
      );
    }

    // Not ready - return 503
    logger.warn("Readiness check failed", { checks, errors });
    return NextResponse.json(
      {
        status: "not_ready",
        timestamp: new Date().toISOString(),
        service: "gotmusic-api",
        checks,
        errors,
      },
      { status: 503 },
    );
  } catch (e: unknown) {
    const errorObj = e instanceof Error ? e : new Error("Readiness check failed");
    const message = errorObj.message;
    logger.error("Readiness check error", errorObj);

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        service: "gotmusic-api",
        checks,
        errors: [...errors, message],
      },
      { status: 503 },
    );
  }
}
