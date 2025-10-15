import { z } from "zod";

// Asset schema matching DB schema
// Note: Postgres returns numeric as string, timestamps as Date objects
export const AssetSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  bpm: z.number().nullable(),
  keySig: z.string().nullable(),
  // PG numeric returns string, coerce to number for API consumers
  priceAmount: z.coerce.number(),
  priceCurrency: z.string(),
  // DB uses draft/published/archived, map for backward compat
  status: z.enum(["draft", "published", "archived", "processing", "ready", "error"]),
  // Timestamps can be Date objects or epoch numbers, coerce to number
  updatedAt: z.coerce.number(),
  createdAt: z.coerce.number(),
});

// Assets response schema
export const AssetsResponseSchema = z.object({
  items: z.array(AssetSchema),
  nextCursor: z.string().nullable(),
});

// Infer types from schemas (ensuring they match our existing types)
export type Asset = z.infer<typeof AssetSchema>;
export type AssetsResponse = z.infer<typeof AssetsResponseSchema>;
