export type { Asset, AssetsResponse } from "./schemas";
export type AssetStatus = "draft" | "published" | "archived" | "processing" | "ready" | "error";
export interface AssetsQuery {
    limit?: number;
    cursor?: string;
    page?: number;
    status?: AssetStatus;
    q?: string;
}
export interface UpdateAssetInput {
    title?: string;
    artist?: string;
    bpm?: number;
    keySig?: string;
    priceAmount?: number;
    priceCurrency?: string;
    status?: AssetStatus;
}
