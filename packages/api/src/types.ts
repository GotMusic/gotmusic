// Asset and AssetsResponse types are now exported from schemas.ts (Zod-validated)
export type { Asset, AssetsResponse } from "./schemas";

// List assets query parameters
export interface AssetsQuery {
  limit?: number;
  cursor?: string;
  status?: "processing" | "ready" | "error";
  q?: string; // search query
}

// Update asset input (partial fields)
export interface UpdateAssetInput {
  title?: string;
  artist?: string;
  bpm?: number;
  keySig?: string;
  priceAmount?: number;
  priceCurrency?: string;
  status?: "processing" | "ready" | "error";
}
