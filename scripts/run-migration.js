#!/usr/bin/env node

import { readFileSync } from 'fs';
import { Pool } from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' && !process.env.CI && !process.env.E2E_AUTH_BYPASS
      ? { rejectUnauthorized: false }
      : false,
  });

  try {
    console.log('Running migration: Add CTA fields to assets table...');
    
    const migrationSQL = readFileSync(
      join(__dirname, '../apps/web/src/server/db/migrations/20250113_add_cta_fields.sql'),
      'utf8'
    );

    await pool.query(migrationSQL);
    console.log('✅ Migration completed successfully');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();