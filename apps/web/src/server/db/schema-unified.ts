import { relations } from "drizzle-orm";
import { integer, real, text, timestamp, pgTable, sqliteTable } from "drizzle-orm/pg-core";
import { integer as sqliteInteger, real as sqliteReal, text as sqliteText, sqliteTable as sqliteTableFn } from "drizzle-orm/sqlite-core";

// SQLite tables
export const assetsSqlite = sqliteTableFn("assets", {
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

export const assetFilesSqlite = sqliteTableFn("asset_files", {
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

export const assetAuditSqlite = sqliteTableFn("asset_audit", {
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

// Postgres tables
export const assetsPg = pgTable("assets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  bpm: integer("bpm"),
  keySig: text("key_sig"),
  priceAmount: real("price_amount").notNull(),
  priceCurrency: text("price_currency").notNull(),
  status: text("status").notNull().default("ready"), // "processing" | "ready" | "error"
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const assetFilesPg = pgTable("asset_files", {
  id: text("id").primaryKey(),
  assetId: text("asset_id").notNull(),
  kind: text("kind").notNull(), // "original" | "preview" | "artwork" | "waveform"
  storageKey: text("storage_key").notNull(),
  bytes: integer("bytes"),
  mime: text("mime"),
  checksum: text("checksum"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const assetAuditPg = pgTable("asset_audit", {
  id: text("id").primaryKey(),
  assetId: text("asset_id").notNull(),
  operation: text("operation").notNull(), // "create" | "update" | "delete" | "status_change"
  userId: text("user_id"), // Optional user ID for future auth
  before: text("before"), // JSON string of previous state
  after: text("after"), // JSON string of new state
  changedFields: text("changed_fields"), // JSON array of field names that changed
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Export the appropriate tables based on driver
import { isPostgres } from "./config";

export const assets = isPostgres ? assetsPg : assetsSqlite;
export const assetFiles = isPostgres ? assetFilesPg : assetFilesSqlite;
export const assetAudit = isPostgres ? assetAuditPg : assetAuditSqlite;

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
