import { createLogger } from "@/lib/logger";
import { db, schema } from "@/server/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Helper to handle different Drizzle driver return shapes
 * (e.g. postgres-js returns { rows: T[] }, others may return T[])
 */
function firstRow<T = unknown>(res: unknown): T | undefined {
  if (!res) return undefined;

  // Result is an array
  if (Array.isArray(res)) {
    return (res[0] as T) ?? undefined;
  }

  // Result is an object with a `rows` array
  if (typeof res === "object" && res !== null && "rows" in res) {
    const maybeRows = (res as { rows?: unknown }).rows;
    if (Array.isArray(maybeRows)) {
      return (maybeRows[0] as T) ?? undefined;
    }
  }

  return undefined;
}

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

  // Allow disabling seed requirement for faster CI boot
  const requireSeed = process.env.READINESS_REQUIRE_SEED !== "false";

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
      const existsRow = firstRow<{ table_exists: boolean }>(result);
      const tableExists = Boolean(existsRow?.table_exists);
      checks.migrations_applied = tableExists;
      if (!tableExists) {
        errors.push("Assets table does not exist - migrations not applied");
      }
    } catch (e) {
      checks.migrations_applied = false;
      errors.push(`Migrations check failed: ${e instanceof Error ? e.message : "unknown"}`);
    }

    // 3. Check if seed data exists (at least 1 asset) - only if table exists and required
    try {
      if (checks.migrations_applied && requireSeed) {
        const rows = await db.select({ count: sql<number>`count(*)` }).from(schema.assets);

        // Handle both string and number returns from PostgreSQL
        const raw = rows[0]?.count ?? (0 as unknown as number | string);
        const count = typeof raw === "string" ? Number(raw) : raw;
        checks.seed_data = (count ?? 0) > 0;

        if (count === 0) {
          errors.push("No seed data found (expected at least 1 asset)");
        }
      } else if (!checks.migrations_applied) {
        checks.seed_data = false;
        errors.push("Cannot check seed data - migrations not applied");
      } else {
        // Seed not required, skip check
        checks.seed_data = true;
      }
    } catch (e) {
      checks.seed_data = false;
      errors.push(`Seed check failed: ${e instanceof Error ? e.message : "unknown"}`);
    }

    // Determine overall readiness based on requirements
    const ready = requireSeed
      ? checks.db_connected && checks.migrations_applied && checks.seed_data
      : checks.db_connected && checks.migrations_applied;

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
