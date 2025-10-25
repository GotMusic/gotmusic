-- Add CTA system fields to assets table
-- These fields support the dynamic CTA system for catalog cards

-- Add asset_type column
ALTER TABLE assets ADD COLUMN IF NOT EXISTS asset_type TEXT DEFAULT 'track';

-- Add is_new column
ALTER TABLE assets ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT false;

-- Add is_featured column
ALTER TABLE assets ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Add is_exclusive column
ALTER TABLE assets ADD COLUMN IF NOT EXISTS is_exclusive BOOLEAN DEFAULT false;

-- Add genre column
ALTER TABLE assets ADD COLUMN IF NOT EXISTS genre TEXT;

-- Add tags column (JSON array as string)
ALTER TABLE assets ADD COLUMN IF NOT EXISTS tags TEXT;

-- Add indexes for performance on the new boolean columns
CREATE INDEX IF NOT EXISTS assets_is_new_idx ON assets(is_new);
CREATE INDEX IF NOT EXISTS assets_is_featured_idx ON assets(is_featured);
CREATE INDEX IF NOT EXISTS assets_is_exclusive_idx ON assets(is_exclusive);
CREATE INDEX IF NOT EXISTS assets_asset_type_idx ON assets(asset_type);
CREATE INDEX IF NOT EXISTS assets_genre_idx ON assets(genre);