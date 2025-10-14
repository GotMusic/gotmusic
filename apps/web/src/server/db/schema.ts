import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const assets = sqliteTable("assets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  bpm: integer("bpm"),
  keySig: text("key_sig"),
  priceAmount: real("price_amount").notNull(),
  priceCurrency: text("price_currency").notNull(),
  status: text("status").notNull().default("ready"), // "processing" | "ready" | "error"
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Date.now()),
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const assetFiles = sqliteTable("asset_files", {
  id: text("id").primaryKey(),
  assetId: text("asset_id").notNull(),
  kind: text("kind").notNull(), // "original" | "preview" | "artwork" | "waveform"
  storageKey: text("storage_key").notNull(),
  bytes: integer("bytes"),
  mime: text("mime"),
  checksum: text("checksum"),
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const assetAudit = sqliteTable("asset_audit", {
  id: text("id").primaryKey(),
  assetId: text("asset_id").notNull(),
  operation: text("operation").notNull(), // "create" | "update" | "delete" | "status_change"
  userId: text("user_id"), // Optional user ID for future auth
  before: text("before"), // JSON string of previous state
  after: text("after"), // JSON string of new state
  changedFields: text("changed_fields"), // JSON array of field names that changed
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});

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
