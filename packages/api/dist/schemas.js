import { z } from "zod";
// Asset schema matching API wire format
// Note: API normalizes DB types (Date → number, DECIMAL string → number)
export const AssetSchema = z.object({
    id: z.string(),
    title: z.string(),
    artist: z.string(),
    bpm: z.number().nullable(),
    keySig: z.string().nullable(),
    // API returns numbers (normalized from PG DECIMAL strings)
    priceAmount: z.number(),
    priceCurrency: z.string(),
    // Status enum (expanded to include all DB + API states)
    status: z.enum(["draft", "published", "archived", "processing", "ready", "error"]),
    // Timestamps as epoch milliseconds (normalized from PG Date objects)
    updatedAt: z.number(),
    createdAt: z.number(),
});
// Assets response schema
export const AssetsResponseSchema = z.object({
    items: z.array(AssetSchema),
    nextCursor: z.string().nullable(),
});
