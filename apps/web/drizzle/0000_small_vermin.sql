CREATE TABLE `asset_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`operation` text NOT NULL,
	`user_id` text,
	`before` text,
	`after` text,
	`changed_fields` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `asset_files` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`kind` text NOT NULL,
	`storage_key` text NOT NULL,
	`bytes` integer,
	`mime` text,
	`checksum` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`bpm` integer,
	`key_sig` text,
	`price_amount` real NOT NULL,
	`price_currency` text NOT NULL,
	`status` text DEFAULT 'ready' NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
