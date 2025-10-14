import { createLogger } from "@/lib/logger";
import { generateOpenAPISpec } from "@/lib/openapi";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Runtime OpenAPI specification endpoint
 * Generates the OpenAPI spec in memory without reading from disk
 */
export async function GET(request: Request) {
  const logger = createLogger();

  logger.info("OpenAPI spec requested");

  try {
    const spec = generateOpenAPISpec();

    logger.info("OpenAPI spec generated successfully", {
      endpointCount: Object.keys(spec.paths).length,
      schemaCount: Object.keys(spec.components?.schemas || {}).length,
    });

    return NextResponse.json(spec, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
    });
  } catch (error) {
    logger.error(
      "Failed to generate OpenAPI spec",
      error instanceof Error ? error : new Error(String(error)),
    );

    return NextResponse.json(
      {
        error: "Failed to generate OpenAPI specification",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
