import { relations } from "drizzle-orm";
import {
  integer as sqliteInteger,
  real as sqliteReal,
  sqliteTable as sqliteTableFn,
  text as sqliteText,
} from "drizzle-orm/sqlite-core";

// SQLite tables
export const assets = sqliteTableFn("assets", {
  id: sqliteText("id").primaryKey(),
  title: sqliteText("title").notNull(),
  artist: sqliteText("artist").notNull(),
  bpm: sqliteInteger("bpm"),
  keySig: sqliteText("key_sig"),
  priceAmount: sqliteReal("price_amount").notNull(),
  priceCurrency: sqliteText("price_currency").notNull(),
  status: sqliteText("status").notNull().default("ready"), // "processing" | "ready" | "error"
  updatedAt: sqliteInteger("updated_at")
    .notNull()
    .$defaultFn(() => Date.now()),
  createdAt: sqliteInteger("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const assetFiles = sqliteTableFn("asset_files", {
  id: sqliteText("id").primaryKey(),
  assetId: sqliteText("asset_id").notNull(),
  kind: sqliteText("kind").notNull(), // "original" | "preview" | "artwork" | "waveform"
  storageKey: sqliteText("storage_key").notNull(),
  bytes: sqliteInteger("bytes"),
  mime: sqliteText("mime"),
  checksum: sqliteText("checksum"),
  createdAt: sqliteInteger("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const assetAudit = sqliteTableFn("asset_audit", {
  id: sqliteText("id").primaryKey(),
  assetId: sqliteText("asset_id").notNull(),
  operation: sqliteText("operation").notNull(), // "create" | "update" | "delete" | "status_change"
  userId: sqliteText("user_id"), // Optional user ID for future auth
  before: sqliteText("before"), // JSON string of previous state
  after: sqliteText("after"), // JSON string of new state
  changedFields: sqliteText("changed_fields"), // JSON array of field names that changed
  createdAt: sqliteInteger("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});

// Relations
export const assetRelations = relations(assets, ({ many }) => ({
  files: many(assetFiles),
  auditLogs: many(assetAudit),
}));

export const assetFileRelations = relations(assetFiles, ({ one }) => ({
  asset: one(assets, {
    fields: [assetFiles.assetId],
    references: [assets.id],
  }),
}));

export const assetAuditRelations = relations(assetAudit, ({ one }) => ({
  asset: one(assets, {
    fields: [assetAudit.assetId],
    references: [assets.id],
  }),
}));
