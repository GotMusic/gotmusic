export type FallbackAsset = {
  id: string;
  title: string;
  artist: string;
  bpm: number | null;
  keySig: string | null;
  priceAmount: number;
  priceCurrency: string;
  status: "draft" | "published" | "archived" | "processing" | "ready" | "error";
  updatedAt: number;
  createdAt: number;
};

const BASE_TIME = Date.UTC(2024, 0, 1, 12, 0, 0);

export const fallbackAssets: FallbackAsset[] = [
  {
    id: "asset-e2e-fixed-001",
    title: "Night Drive 88",
    artist: "KiloWav",
    bpm: 88,
    keySig: "Am",
    priceAmount: 12,
    priceCurrency: "PYUSD",
    status: "published",
    createdAt: BASE_TIME,
    updatedAt: BASE_TIME + 5 * 60 * 1000,
  },
  {
    id: "asset-e2e-fixed-002",
    title: "Wild Sun",
    artist: "Nova Hale",
    bpm: 124,
    keySig: "A minor",
    priceAmount: 24,
    priceCurrency: "USD",
    status: "published",
    createdAt: BASE_TIME - 60 * 60 * 1000,
    updatedAt: BASE_TIME - 30 * 60 * 1000,
  },
  {
    id: "asset-e2e-fixed-003",
    title: "Lost Signal",
    artist: "Vera Flux",
    bpm: 110,
    keySig: "E minor",
    priceAmount: 19,
    priceCurrency: "USD",
    status: "published",
    createdAt: BASE_TIME - 2 * 60 * 60 * 1000,
    updatedAt: BASE_TIME - 90 * 60 * 1000,
  },
  {
    id: "asset-e2e-fixed-004",
    title: "Glass Pad",
    artist: "Luma",
    bpm: 100,
    keySig: "C major",
    priceAmount: 9,
    priceCurrency: "USD",
    status: "published",
    createdAt: BASE_TIME - 3 * 60 * 60 * 1000,
    updatedAt: BASE_TIME - 150 * 60 * 1000,
  },
  {
    id: "asset-e2e-fixed-005",
    title: "Neon Skyline",
    artist: "Citylight",
    bpm: 118,
    keySig: "D minor",
    priceAmount: 15,
    priceCurrency: "USD",
    status: "published",
    createdAt: BASE_TIME - 4 * 60 * 60 * 1000,
    updatedAt: BASE_TIME - 210 * 60 * 1000,
  },
  {
    id: "asset-e2e-fixed-006",
    title: "Digital Dreams",
    artist: "Synthwave",
    bpm: 95,
    keySig: "G major",
    priceAmount: 18,
    priceCurrency: "USD",
    status: "published",
    createdAt: BASE_TIME - 5 * 60 * 60 * 1000,
    updatedAt: BASE_TIME - 270 * 60 * 1000,
  },
  {
    id: "asset-e2e-fixed-007",
    title: "Electric Pulse",
    artist: "Voltage",
    bpm: 135,
    keySig: "E minor",
    priceAmount: 22,
    priceCurrency: "USD",
    status: "published",
    createdAt: BASE_TIME - 6 * 60 * 60 * 1000,
    updatedAt: BASE_TIME - 330 * 60 * 1000,
  },
  {
    id: "asset-e2e-fixed-008",
    title: "Crystal Waves",
    artist: "Aqua",
    bpm: 105,
    keySig: "F major",
    priceAmount: 16,
    priceCurrency: "USD",
    status: "published",
    createdAt: BASE_TIME - 7 * 60 * 60 * 1000,
    updatedAt: BASE_TIME - 390 * 60 * 1000,
  },
];

export function getFallbackAssetById(id: string) {
  return fallbackAssets.find((asset) => asset.id === id) ?? null;
}

type Query = {
  limit: number;
  cursor?: string;
  status?: string;
  q?: string;
};

export function queryFallbackAssets({ limit, cursor, status, q }: Query) {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 20;
  const cursorNumber = cursor ? Number.parseInt(cursor, 10) : undefined;
  const query = q?.toLowerCase();

  let filtered = [...fallbackAssets].sort((a, b) => b.updatedAt - a.updatedAt);

  if (status) {
    filtered = filtered.filter((asset) => asset.status === status);
  }

  if (query) {
    filtered = filtered.filter(
      (asset) =>
        asset.title.toLowerCase().includes(query) || asset.artist.toLowerCase().includes(query),
    );
  }

  if (cursorNumber && Number.isFinite(cursorNumber)) {
    filtered = filtered.filter((asset) => asset.updatedAt < cursorNumber);
  }

  const totalCount = filtered.length;
  const items = filtered.slice(0, normalizedLimit);
  const nextCursor =
    totalCount > normalizedLimit && filtered[normalizedLimit]
      ? filtered[normalizedLimit].updatedAt.toString()
      : null;

  return { items, totalCount, nextCursor };
}
