CREATE TYPE "public"."asset_file_kind" AS ENUM('original', 'preview', 'artwork', 'waveform');--> statement-breakpoint
CREATE TYPE "public"."asset_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."audit_operation" AS ENUM('create', 'update', 'delete', 'status_change');--> statement-breakpoint
ALTER TABLE "asset_audit" ALTER COLUMN "operation" SET DATA TYPE "public"."audit_operation" USING "operation"::"public"."audit_operation";--> statement-breakpoint
ALTER TABLE "asset_files" ALTER COLUMN "kind" SET DATA TYPE "public"."asset_file_kind" USING "kind"::"public"."asset_file_kind";--> statement-breakpoint
ALTER TABLE "assets" ALTER COLUMN "status" SET DEFAULT 'draft'::"public"."asset_status";--> statement-breakpoint
ALTER TABLE "assets" ALTER COLUMN "status" SET DATA TYPE "public"."asset_status" USING "status"::"public"."asset_status";--> statement-breakpoint
CREATE INDEX "asset_audit_asset_id_idx" ON "asset_audit" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "asset_audit_operation_idx" ON "asset_audit" USING btree ("operation");--> statement-breakpoint
CREATE INDEX "asset_audit_created_at_idx" ON "asset_audit" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "asset_files_asset_id_idx" ON "asset_files" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "asset_files_kind_idx" ON "asset_files" USING btree ("kind");--> statement-breakpoint
CREATE INDEX "assets_status_idx" ON "assets" USING btree ("status");--> statement-breakpoint
CREATE INDEX "assets_updated_at_idx" ON "assets" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "assets_artist_idx" ON "assets" USING btree ("artist");--> statement-breakpoint
ALTER TABLE "asset_files" ADD CONSTRAINT "asset_files_asset_id_kind_unique" UNIQUE("asset_id","kind");--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "price_amount_positive" CHECK ("assets"."price_amount" >= 0);