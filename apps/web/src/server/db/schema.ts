import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  pgEnum,
  integer as pgInteger,
  numeric as pgNumeric,
  pgTable,
  text as pgText,
  timestamp as pgTimestamp,
  unique,
} from "drizzle-orm/pg-core";

// Enums
export const assetStatusEnum = pgEnum("asset_status", ["draft", "published", "archived"]);
export const assetFileKindEnum = pgEnum("asset_file_kind", [
  "original",
  "preview",
  "artwork",
  "waveform",
]);
export const auditOperationEnum = pgEnum("audit_operation", [
  "create",
  "update",
  "delete",
  "status_change",
]);
export const uploadJobStageEnum = pgEnum("upload_job_stage", [
  "init",
  "uploading",
  "encrypting",
  "done",
  "error",
]);

// Postgres tables
export const assetsPg = pgTable(
  "assets",
  {
    id: pgText("id").primaryKey(),
    title: pgText("title").notNull(),
    artist: pgText("artist").notNull(),
    bpm: pgInteger("bpm"),
    keySig: pgText("key_sig"),
    durationSec: pgInteger("duration_sec"),
    priceAmount: pgNumeric("price_amount", { precision: 10, scale: 2 }).notNull(),
    priceCurrency: pgText("price_currency").notNull(),
    priceCredits: pgInteger("price_credits").default(10),
    status: assetStatusEnum("status").notNull().default("draft"),
    fileCid: pgText("file_cid"),
    storageKey: pgText("storage_key"),
    ownerId: pgText("owner_id"),
    updatedAt: pgTimestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    // Indexes for performance
    statusIdx: index("assets_status_idx").on(table.status),
    updatedAtIdx: index("assets_updated_at_idx").on(table.updatedAt),
    artistIdx: index("assets_artist_idx").on(table.artist),
    // Constraints
    priceAmountCheck: check("price_amount_positive", sql`${table.priceAmount} >= 0`),
  }),
);

export const assetFilesPg = pgTable(
  "asset_files",
  {
    id: pgText("id").primaryKey(),
    assetId: pgText("asset_id").notNull(),
    kind: assetFileKindEnum("kind").notNull(),
    storageKey: pgText("storage_key").notNull(),
    bytes: pgInteger("bytes"),
    mime: pgText("mime"),
    checksum: pgText("checksum"),
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    // Unique constraint: one file per kind per asset
    assetKindUnique: unique("asset_files_asset_id_kind_unique").on(table.assetId, table.kind),
    // Indexes for performance
    assetIdIdx: index("asset_files_asset_id_idx").on(table.assetId),
    kindIdx: index("asset_files_kind_idx").on(table.kind),
  }),
);

export const assetAuditPg = pgTable(
  "asset_audit",
  {
    id: pgText("id").primaryKey(),
    assetId: pgText("asset_id").notNull(),
    operation: auditOperationEnum("operation").notNull(),
    userId: pgText("user_id"), // Optional user ID for future auth
    before: pgText("before"), // JSON string of previous state
    after: pgText("after"), // JSON string of new state
    changedFields: pgText("changed_fields"), // JSON array of field names that changed
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    // Indexes for performance
    assetIdIdx: index("asset_audit_asset_id_idx").on(table.assetId),
    operationIdx: index("asset_audit_operation_idx").on(table.operation),
    createdAtIdx: index("asset_audit_created_at_idx").on(table.createdAt),
  }),
);

export const uploadJobsPg = pgTable(
  "upload_jobs",
  {
    id: pgText("id").primaryKey(),
    userId: pgText("user_id").notNull(),
    assetId: pgText("asset_id").notNull(),
    stage: uploadJobStageEnum("stage").notNull().default("init"),
    message: pgText("message"),
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    // Indexes for performance
    userIdIdx: index("upload_jobs_user_id_idx").on(table.userId),
    assetIdIdx: index("upload_jobs_asset_id_idx").on(table.assetId),
    stageIdx: index("upload_jobs_stage_idx").on(table.stage),
  }),
);

// Relations for Postgres
export const assetRelationsPg = relations(assetsPg, ({ many }) => ({
  files: many(assetFilesPg),
  auditLogs: many(assetAuditPg),
  uploadJobs: many(uploadJobsPg),
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

export const uploadJobRelationsPg = relations(uploadJobsPg, ({ one }) => ({
  asset: one(assetsPg, {
    fields: [uploadJobsPg.assetId],
    references: [assetsPg.id],
  }),
}));

// Export unified schema object with consistent table names
export const assets = assetsPg;
export const assetFiles = assetFilesPg;
export const assetAudit = assetAuditPg;
export const uploadJobs = uploadJobsPg;
export const assetRelations = assetRelationsPg;
export const assetFileRelations = assetFileRelationsPg;
export const assetAuditRelations = assetAuditRelationsPg;
export const uploadJobRelations = uploadJobRelationsPg;
