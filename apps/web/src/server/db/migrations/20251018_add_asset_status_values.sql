-- Add new enum values if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'asset_status' AND e.enumlabel = 'processing') THEN
    ALTER TYPE asset_status ADD VALUE 'processing';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'asset_status' AND e.enumlabel = 'ready') THEN
    ALTER TYPE asset_status ADD VALUE 'ready';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'asset_status' AND e.enumlabel = 'error') THEN
    ALTER TYPE asset_status ADD VALUE 'error';
  END IF;
END $$;
