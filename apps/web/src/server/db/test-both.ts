#!/usr/bin/env tsx

/**
 * Test script to verify both SQLite and Postgres work
 * Run with: DB_DRIVER=sqlite tsx src/server/db/test-both.ts
 * Run with: DB_DRIVER=pg tsx src/server/db/test-both.ts
 */

import { db, dbDriver, isPostgres, isSQLite, schema } from "./index";

async function testDatabase() {
  console.log(`🔧 Testing ${dbDriver.toUpperCase()} database...`);
  console.log(`📊 Driver: ${dbDriver}`);
  console.log(`🐘 Postgres: ${isPostgres}`);
  console.log(`🗃️ SQLite: ${isSQLite}`);

  try {
    // Test basic query
    console.log("📋 Testing basic query...");
    let result;
    if (isSQLite) {
      result = db.select().from(schema.assets).limit(1).all();
    } else {
      result = await db.select().from(schema.assets).limit(1);
    }
    console.log(`✅ Query successful, found ${result.length} assets`);

    // Test insert (if no data exists)
    if (result.length === 0) {
      console.log("📝 Testing insert...");
      if (isSQLite) {
        db.insert(schema.assets)
          .values({
            id: "test_001",
            title: "Test Asset",
            artist: "Test Artist",
            priceAmount: 10.0,
            priceCurrency: "PYUSD",
            status: "ready",
          })
          .run();
      } else {
        await db.insert(schema.assets)
          .values({
            id: "test_001",
            title: "Test Asset",
            artist: "Test Artist",
            priceAmount: 10.0,
            priceCurrency: "PYUSD",
            status: "ready",
          });
      }
      console.log("✅ Insert successful");

      // Test select again
      let newResult;
      if (isSQLite) {
        newResult = db.select().from(schema.assets).limit(1).all();
      } else {
        newResult = await db.select().from(schema.assets).limit(1);
      }
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
