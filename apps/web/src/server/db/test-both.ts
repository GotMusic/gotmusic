#!/usr/bin/env tsx

/**
 * Test script to verify both SQLite and Postgres work
 * Run with: DB_DRIVER=sqlite tsx src/server/db/test-both.ts
 * Run with: DB_DRIVER=pg tsx src/server/db/test-both.ts
 */

import { db, dbDriver, isPostgres, isSQLite, schema, q } from "./index";

async function testDatabase() {
  console.log(`🔧 Testing ${dbDriver.toUpperCase()} database...`);
  console.log(`📊 Driver: ${dbDriver}`);
  console.log(`🐘 Postgres: ${isPostgres}`);
  console.log(`🗃️ SQLite: ${isSQLite}`);

  try {
    // Test basic query
    console.log("📋 Testing basic query...");
    const query = db.select().from(schema.assets).limit(1);
    const result = await q.all(query);
    console.log(`✅ Query successful, found ${result.length} assets`);

    // Test insert (if no data exists)
    if (result.length === 0) {
      console.log("📝 Testing insert...");
      await db.insert(schema.assets)
        .values({
          id: "test_001",
          title: "Test Asset",
          artist: "Test Artist",
          priceAmount: 10.0,
          priceCurrency: "PYUSD",
          status: "ready",
        });
      console.log("✅ Insert successful");

      // Test select again
      const newQuery = db.select().from(schema.assets).limit(1);
      const newResult = await q.all(newQuery);
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
