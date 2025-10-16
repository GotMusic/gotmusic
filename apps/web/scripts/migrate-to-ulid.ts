#!/usr/bin/env tsx
/**
 * Migration script: Convert existing IDs to ULIDs
 *
 * ⚠️ WARNING: This script will modify all IDs in the database.
 * This is a BREAKING CHANGE for any stored references (bookmarks, external links, etc.)
 *
 * Before running:
 * 1. Backup your database
 * 2. Ensure no active users/requests
 * 3. Consider if you truly need to migrate existing IDs (new records will use ULIDs)
 *
 * Usage:
 *   DATABASE_URL=postgresql://... tsx apps/web/scripts/migrate-to-ulid.ts
 *
 * Options:
 *   --dry-run     Show what would be changed without making changes
 *   --force       Actually run the migration (required)
 */

import { generateIdAtTime } from "@/lib/ulid";
import { db, schema } from "@/server/db";
import { eq } from "drizzle-orm";

interface MigrationStats {
  assets: number;
  assetFiles: number;
  assetAudit: number;
}

async function migrate(dryRun = true): Promise<MigrationStats> {
  const stats: MigrationStats = {
    assets: 0,
    assetFiles: 0,
    assetAudit: 0,
  };

  console.log(dryRun ? "🔍 DRY RUN MODE" : "⚠️  LIVE MIGRATION");
  console.log("========================================\n");

  // Step 1: Migrate assets (parent table)
  console.log("📦 Fetching assets...");
  const assets = await db.select().from(schema.assets);
  console.log(`Found ${assets.length} assets\n`);

  const assetIdMap = new Map<string, string>();

  for (const asset of assets) {
    // Generate ULID based on createdAt for determinism and sortability
    const newId = generateIdAtTime(asset.createdAt.getTime());
    assetIdMap.set(asset.id, newId);

    console.log(`Asset: ${asset.id} → ${newId}`);
    console.log(`  Title: ${asset.title}`);
    console.log(`  Created: ${asset.createdAt.toISOString()}\n`);

    if (!dryRun) {
      // Update asset_files first (foreign key constraint)
      await db
        .update(schema.assetFiles)
        .set({ assetId: newId })
        .where(eq(schema.assetFiles.assetId, asset.id));

      // Update asset_audit (foreign key constraint)
      await db
        .update(schema.assetAudit)
        .set({ assetId: newId })
        .where(eq(schema.assetAudit.assetId, asset.id));

      // Now update the asset itself
      await db.update(schema.assets).set({ id: newId }).where(eq(schema.assets.id, asset.id));

      stats.assets++;
    }
  }

  // Step 2: Migrate asset_files
  console.log("\n📁 Fetching asset files...");
  const assetFiles = await db.select().from(schema.assetFiles);
  console.log(`Found ${assetFiles.length} asset files\n`);

  for (const file of assetFiles) {
    const newId = generateIdAtTime(file.createdAt.getTime() + 1000); // +1s offset

    console.log(`File: ${file.id} → ${newId}`);
    console.log(`  Asset: ${file.assetId} (now ${assetIdMap.get(file.assetId) || "unchanged"})`);
    console.log(`  Kind: ${file.kind}\n`);

    if (!dryRun) {
      await db
        .update(schema.assetFiles)
        .set({ id: newId })
        .where(eq(schema.assetFiles.id, file.id));

      stats.assetFiles++;
    }
  }

  // Step 3: Migrate asset_audit
  console.log("\n📋 Fetching audit logs...");
  const auditLogs = await db.select().from(schema.assetAudit);
  console.log(`Found ${auditLogs.length} audit logs\n`);

  for (const log of auditLogs) {
    const newId = generateIdAtTime(log.createdAt.getTime() + 2000); // +2s offset

    console.log(`Audit: ${log.id} → ${newId}`);
    console.log(`  Asset: ${log.assetId} (now ${assetIdMap.get(log.assetId) || "unchanged"})`);
    console.log(`  Operation: ${log.operation}\n`);

    if (!dryRun) {
      await db.update(schema.assetAudit).set({ id: newId }).where(eq(schema.assetAudit.id, log.id));

      stats.assetAudit++;
    }
  }

  return stats;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes("--force");
  const isDryRunFlag = args.includes("--dry-run");

  if (isDryRunFlag || dryRun) {
    console.log("\n⚠️  Running in DRY RUN mode. No changes will be made.");
    console.log("To actually migrate, run with --force flag.\n");
  }

  try {
    const stats = await migrate(dryRun);

    console.log("\n========================================");
    console.log("📊 Migration Summary");
    console.log("========================================");
    console.log(`Assets migrated:      ${stats.assets}`);
    console.log(`Asset files migrated: ${stats.assetFiles}`);
    console.log(`Audit logs migrated:  ${stats.assetAudit}`);
    console.log("========================================\n");

    if (dryRun) {
      console.log("✅ Dry run complete. No changes were made.");
      console.log("Run with --force to apply these changes.\n");
    } else {
      console.log("✅ Migration complete!\n");
    }

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:");
    console.error(error);
    process.exit(1);
  }
}

main();
