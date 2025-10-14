-- Migration: Add constraints, indexes, and triggers for schema hardening
-- This migration adds:
-- 1. Enums for better type safety
-- 2. Unique constraints on asset_files (asset_id, kind)
-- 3. Check constraints for price_amount >= 0
-- 4. Indexes for performance
-- 5. Trigger to auto-update updated_at

-- Create enums
CREATE TYPE "asset_status" AS ENUM('draft', 'published', 'archived');
CREATE TYPE "asset_file_kind" AS ENUM('original', 'preview', 'artwork', 'waveform');
CREATE TYPE "audit_operation" AS ENUM('create', 'update', 'delete', 'status_change');

-- Add unique constraint to asset_files
ALTER TABLE "asset_files" ADD CONSTRAINT "asset_files_asset_id_kind_unique" UNIQUE ("asset_id", "kind");

-- Add check constraint for price_amount
ALTER TABLE "assets" ADD CONSTRAINT "price_amount_positive" CHECK ("price_amount" >= 0);

-- Add indexes for performance
CREATE INDEX "assets_status_idx" ON "assets" ("status");
CREATE INDEX "assets_updated_at_idx" ON "assets" ("updated_at");
CREATE INDEX "assets_artist_idx" ON "assets" ("artist");
CREATE INDEX "asset_files_asset_id_idx" ON "asset_files" ("asset_id");
CREATE INDEX "asset_files_kind_idx" ON "asset_files" ("kind");
CREATE INDEX "asset_audit_asset_id_idx" ON "asset_audit" ("asset_id");
CREATE INDEX "asset_audit_operation_idx" ON "asset_audit" ("operation");
CREATE INDEX "asset_audit_created_at_idx" ON "asset_audit" ("created_at");

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for assets table
CREATE TRIGGER update_assets_updated_at 
    BEFORE UPDATE ON "assets" 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
