// Asset type matching DB schema
export interface Asset {
  id: string;
  title: string;
  artist: string;
  bpm: number | null;
  keySig: string | null;
  priceAmount: number;
  priceCurrency: string;
  status: "processing" | "ready" | "error";
  updatedAt: number;
  createdAt: number;
}

// List assets response
export interface AssetsResponse {
  items: Asset[];
  nextCursor: string | null;
}

// List assets query parameters
export interface AssetsQuery {
  limit?: number;
  cursor?: string;
  status?: "processing" | "ready" | "error";
  q?: string; // search query
}
