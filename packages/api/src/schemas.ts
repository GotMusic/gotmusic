import { z } from "zod";

// Asset schema matching DB schema
export const AssetSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  bpm: z.number().nullable(),
  keySig: z.string().nullable(),
  priceAmount: z.number(),
  priceCurrency: z.string(),
  status: z.enum(["processing", "ready", "error"]),
  updatedAt: z.number(),
  createdAt: z.number(),
});

// Assets response schema
export const AssetsResponseSchema = z.object({
  items: z.array(AssetSchema),
  nextCursor: z.string().nullable(),
});

// Infer types from schemas (ensuring they match our existing types)
export type Asset = z.infer<typeof AssetSchema>;
export type AssetsResponse = z.infer<typeof AssetsResponseSchema>;
