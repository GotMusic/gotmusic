#!/usr/bin/env tsx

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateOpenAPISpec } from "../src/lib/openapi";

/**
 * Generate OpenAPI spec file
 * Run with: yarn generate:openapi
 */
async function generateOpenAPI() {
  console.log("🔧 Generating OpenAPI specification...");

  try {
    const spec = generateOpenAPISpec();
    const outputPath = join(process.cwd(), "openapi.json");

    writeFileSync(outputPath, JSON.stringify(spec, null, 2));

    console.log("✅ OpenAPI spec generated successfully!");
    console.log(`📄 Output: ${outputPath}`);
    console.log(`📊 Endpoints: ${Object.keys(spec.paths).length}`);
    console.log(`📋 Schemas: ${Object.keys(spec.components?.schemas || {}).length}`);
  } catch (error) {
    console.error("❌ Failed to generate OpenAPI spec:", error);
    process.exit(1);
  }
}

generateOpenAPI();
