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

export const assetRelations = relations(assets, ({ many }) => ({
  files: many(assetFiles),
}));

export const assetFileRelations = relations(assetFiles, ({ one }) => ({
  asset: one(assets, {
    fields: [assetFiles.assetId],
    references: [assets.id],
  }),
}));
