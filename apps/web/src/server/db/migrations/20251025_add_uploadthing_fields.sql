-- Add UploadThing integration fields to assets table
-- Migration: 20251025_add_uploadthing_fields.sql

ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS uploadthing_file_id TEXT,
ADD COLUMN IF NOT EXISTS uploadthing_url TEXT,
ADD COLUMN IF NOT EXISTS uploadthing_key TEXT;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_assets_uploadthing_file_id ON assets(uploadthing_file_id);
CREATE INDEX IF NOT EXISTS idx_assets_uploadthing_url ON assets(uploadthing_url);
