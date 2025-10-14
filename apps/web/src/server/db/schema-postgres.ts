import { relations } from "drizzle-orm";
import {
  integer as pgInteger,
  numeric as pgNumeric,
  pgTable,
  text as pgText,
  timestamp as pgTimestamp,
} from "drizzle-orm/pg-core";

// Postgres tables
export const assetsPg = pgTable("assets", {
  id: pgText("id").primaryKey(),
  title: pgText("title").notNull(),
  artist: pgText("artist").notNull(),
  bpm: pgInteger("bpm"),
  keySig: pgText("key_sig"),
  priceAmount: pgNumeric("price_amount", { precision: 10, scale: 2 }).notNull(),
  priceCurrency: pgText("price_currency").notNull(),
  status: pgText("status").notNull().default("ready"), // "processing" | "ready" | "error"
  updatedAt: pgTimestamp("updated_at").notNull().defaultNow(),
  createdAt: pgTimestamp("created_at").notNull().defaultNow(),
});

export const assetFilesPg = pgTable("asset_files", {
  id: pgText("id").primaryKey(),
  assetId: pgText("asset_id").notNull(),
  kind: pgText("kind").notNull(), // "original" | "preview" | "artwork" | "waveform"
  storageKey: pgText("storage_key").notNull(),
  bytes: pgInteger("bytes"),
  mime: pgText("mime"),
  checksum: pgText("checksum"),
  createdAt: pgTimestamp("created_at").notNull().defaultNow(),
});

export const assetAuditPg = pgTable("asset_audit", {
  id: pgText("id").primaryKey(),
  assetId: pgText("asset_id").notNull(),
  operation: pgText("operation").notNull(), // "create" | "update" | "delete" | "status_change"
  userId: pgText("user_id"), // Optional user ID for future auth
  before: pgText("before"), // JSON string of previous state
  after: pgText("after"), // JSON string of new state
  changedFields: pgText("changed_fields"), // JSON array of field names that changed
  createdAt: pgTimestamp("created_at").notNull().defaultNow(),
});

// Relations for Postgres
export const assetRelationsPg = relations(assetsPg, ({ many }) => ({
  files: many(assetFilesPg),
  auditLogs: many(assetAuditPg),
}));

export const assetFileRelationsPg = relations(assetFilesPg, ({ one }) => ({
  asset: one(assetsPg, {
    fields: [assetFilesPg.assetId],
    references: [assetsPg.id],
  }),
}));

export const assetAuditRelationsPg = relations(assetAuditPg, ({ one }) => ({
  asset: one(assetsPg, {
    fields: [assetAuditPg.assetId],
    references: [assetsPg.id],
  }),
}));

// Export unified schema object with consistent table names
export const assets = assetsPg;
export const assetFiles = assetFilesPg;
export const assetAudit = assetAuditPg;
export const assetRelations = assetRelationsPg;
export const assetFileRelations = assetFileRelationsPg;
export const assetAuditRelations = assetAuditRelationsPg;
