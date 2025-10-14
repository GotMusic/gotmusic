import { createLogger } from "@/lib/logger";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Health check endpoint - static 200 OK response
 * Used by load balancers and monitoring systems
 */
export async function GET(request: Request) {
  const logger = createLogger();

  logger.info("Health check requested");

  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "gotmusic-api",
    },
    { status: 200 },
  );
}
