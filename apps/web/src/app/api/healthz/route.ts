import { NextResponse } from "next/server";

/**
 * Health check endpoint - static 200 OK response
 * Used by load balancers and monitoring systems
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "gotmusic-api",
    },
    { status: 200 },
  );
}
