import { generateOpenAPISpec } from "@/lib/openapi";
import { NextResponse } from "next/server";

/**
 * Runtime OpenAPI specification endpoint
 * Generates the OpenAPI spec in memory without reading from disk
 */
export async function GET() {
  try {
    const spec = generateOpenAPISpec();

    return NextResponse.json(spec, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error("Failed to generate OpenAPI spec:", error);

    return NextResponse.json(
      {
        error: "Failed to generate OpenAPI specification",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
