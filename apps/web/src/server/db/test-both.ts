#!/usr/bin/env tsx

/**
 * Test script to verify PostgreSQL database connectivity
 * Run with: tsx src/server/db/test-both.ts
 */

import { db, schema } from "./index";

async function testDatabase() {
  console.log("🔧 Testing POSTGRES database...");
  console.log("📊 Driver: pg");

  try {
    // Test basic query
    console.log("📋 Testing basic query...");
    const result = await db.select().from(schema.assets).limit(1);
    console.log(`✅ Query successful, found ${result.length} assets`);

    // Test insert (if no data exists)
    if (result.length === 0) {
      console.log("📝 Testing insert...");
      await db.insert(schema.assets).values({
        id: "test_001",
        title: "Test Asset",
        artist: "Test Artist",
        priceAmount: 10.0,
        priceCurrency: "PYUSD",
        status: "ready",
      });
      console.log("✅ Insert successful");

      // Test select again
      const newResult = await db.select().from(schema.assets).limit(1);
      console.log(`✅ Select after insert: ${newResult.length} assets`);
    }

    console.log("🎉 Database test completed successfully!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
    process.exit(1);
  }
}

testDatabase().catch((error) => {
  console.error("❌ Database test failed:", error);
  process.exit(1);
});
