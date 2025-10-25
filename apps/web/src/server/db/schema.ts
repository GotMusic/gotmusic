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
  uuid,
  boolean as pgBoolean,
  inet,
} from "drizzle-orm/pg-core";

// Enums
export const assetStatusEnum = pgEnum("asset_status", [
  "draft",
  "published", 
  "archived",
  "processing",
  "ready",
  "error",
]);

// Export TypeScript type for asset status
export type AssetStatus = (typeof assetStatusEnum)['enumValues'][number];
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

export const walletProviderEnum = pgEnum("wallet_provider", [
  "coinbase",
  "walletconnect", 
  "privy",
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
    // UploadThing integration fields
    uploadThingFileId: pgText("uploadthing_file_id"),
    uploadThingUrl: pgText("uploadthing_url"),
    uploadThingKey: pgText("uploadthing_key"),
    ownerId: pgText("owner_id"),
    // CTA system fields
    assetType: pgText("asset_type").default("track"), // "sample" | "track"
    isNew: pgBoolean("is_new").default(false),
    isFeatured: pgBoolean("is_featured").default(false),
    isExclusive: pgBoolean("is_exclusive").default(false),
    genre: pgText("genre"),
    tags: pgText("tags"), // JSON array as string
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

// Authentication tables
export const usersPg = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: pgText("email").notNull().unique(),
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
    updatedAt: pgTimestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  }),
);

export const sessionsPg = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    tokenHash: pgText("token_hash").notNull(),
    ua: pgText("ua"),
    ip: inet("ip"),
    expiresAt: pgTimestamp("expires_at").notNull(),
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("sessions_user_id_idx").on(table.userId),
    tokenHashIdx: index("sessions_token_hash_idx").on(table.tokenHash),
    expiresAtIdx: index("sessions_expires_at_idx").on(table.expiresAt),
  }),
);

export const userWalletsPg = pgTable(
  "user_wallets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    address: pgText("address").notNull(),
    provider: walletProviderEnum("provider").notNull(),
    isPrimary: pgBoolean("is_primary").notNull().default(false),
    verifiedAt: pgTimestamp("verified_at").notNull().defaultNow(),
    lastUsedAt: pgTimestamp("last_used_at").notNull().defaultNow(),
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("user_wallets_user_id_idx").on(table.userId),
    addressIdx: index("user_wallets_address_idx").on(table.address),
    providerIdx: index("user_wallets_provider_idx").on(table.provider),
  }),
);

export const purchasesPg = pgTable(
  "purchases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    assetId: pgText("asset_id").notNull(),
    chainId: pgInteger("chain_id").notNull(),
    priceAmount: pgNumeric("price_amount", { precision: 10, scale: 2 }).notNull(),
    priceCurrency: pgText("price_currency").notNull(),
    txHash: pgText("tx_hash"),
    easUid: pgText("eas_uid"),
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("purchases_user_id_idx").on(table.userId),
    assetIdIdx: index("purchases_asset_id_idx").on(table.assetId),
    txHashIdx: index("purchases_tx_hash_idx").on(table.txHash),
  }),
);

export const auditLogsPg = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id"),
    action: pgText("action").notNull(),
    meta: pgText("meta"), // JSON string
    createdAt: pgTimestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("audit_logs_user_id_idx").on(table.userId),
    actionIdx: index("audit_logs_action_idx").on(table.action),
    createdAtIdx: index("audit_logs_created_at_idx").on(table.createdAt),
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

// Auth relations
export const userRelationsPg = relations(usersPg, ({ many }) => ({
  sessions: many(sessionsPg),
  wallets: many(userWalletsPg),
  purchases: many(purchasesPg),
  auditLogs: many(auditLogsPg),
}));

export const sessionRelationsPg = relations(sessionsPg, ({ one }) => ({
  user: one(usersPg, {
    fields: [sessionsPg.userId],
    references: [usersPg.id],
  }),
}));

export const userWalletRelationsPg = relations(userWalletsPg, ({ one }) => ({
  user: one(usersPg, {
    fields: [userWalletsPg.userId],
    references: [usersPg.id],
  }),
}));

export const purchaseRelationsPg = relations(purchasesPg, ({ one }) => ({
  user: one(usersPg, {
    fields: [purchasesPg.userId],
    references: [usersPg.id],
  }),
}));

export const auditLogRelationsPg = relations(auditLogsPg, ({ one }) => ({
  user: one(usersPg, {
    fields: [auditLogsPg.userId],
    references: [usersPg.id],
  }),
}));

// Export unified schema object with consistent table names
export const assets = assetsPg;
export const assetFiles = assetFilesPg;
export const assetAudit = assetAuditPg;
export const uploadJobs = uploadJobsPg;
export const users = usersPg;
export const sessions = sessionsPg;
export const userWallets = userWalletsPg;
export const purchases = purchasesPg;
export const auditLogs = auditLogsPg;

// Relations
export const assetRelations = assetRelationsPg;
export const assetFileRelations = assetFileRelationsPg;
export const assetAuditRelations = assetAuditRelationsPg;
export const uploadJobRelations = uploadJobRelationsPg;
export const userRelations = userRelationsPg;
export const sessionRelations = sessionRelationsPg;
export const userWalletRelations = userWalletRelationsPg;
export const purchaseRelations = purchaseRelationsPg;
export const auditLogRelations = auditLogRelationsPg;
