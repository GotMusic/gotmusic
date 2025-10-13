import { z } from "zod";

export const assetKind = z.enum(["sample", "loop", "beat", "stem", "preset"]);
export type AssetKind = z.infer<typeof assetKind>;

export const price = z.object({
  currency: z.literal("PYUSD"),
  amount: z.number().nonnegative(),
});

export const asset = z.object({
  id: z.string().min(1),
  kind: assetKind,
  title: z.string().min(1),
  bpm: z.number().int().min(40).max(220).optional(),
  key: z
    .string()
    .regex(/^[A-G][b#]?(m|maj|dim)?$/)
    .optional(),
  tags: z.array(z.string()).default([]),
  artist: z.string(),
  previewUrl: z.string().url(),
  coverUrl: z.string().url(),
  price,
  lighthouseCid: z.string().optional(),
  eip712Hash: z.string().optional(),
});
export type Asset = z.infer<typeof asset>;

export const receipt = z.object({
  id: z.string(),
  assetId: z.string(),
  buyer: z.string(),
  vendor: z.string(),
  chainId: z.number(),
  txHash: z.string(),
  easUid: z.string().optional(),
  createdAt: z.string(),
});
export type Receipt = z.infer<typeof receipt>;
