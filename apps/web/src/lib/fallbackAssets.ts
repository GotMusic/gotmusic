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

const BASE_TIME = Date.UTC(2025, 0, 1, 12, 0, 0);

export const fallbackAssets: FallbackAsset[] = [
  {
    id: "asset-new-001",
    title: "Analog 808 Drum Machine Close Up Glowing Red Pads",
    artist: "Rules",
    bpm: 121,
    keySig: "F minor",
    priceAmount: 3,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME,
    createdAt: BASE_TIME,
  },
  {
    id: "asset-new-002",
    title: "Classical String Section — Cello And Violin Under Soft Light",
    artist: "Rules",
    bpm: 95,
    keySig: "G major",
    priceAmount: 8,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 3600000,
    createdAt: BASE_TIME + 3600000,
  },
  {
    id: "asset-new-003",
    title: "Close Up Vinyl Record Under Warm Light, Dust Visible",
    artist: "Rules",
    bpm: 110,
    keySig: "A minor",
    priceAmount: 13,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 7200000,
    createdAt: BASE_TIME + 7200000,
  },
  {
    id: "asset-new-004",
    title: "Congas, Djembes, And Shakers In Warm Sunset Tones",
    artist: "Rules",
    bpm: 105,
    keySig: "D major",
    priceAmount: 8,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 10800000,
    createdAt: BASE_TIME + 10800000,
  },
  {
    id: "asset-new-005",
    title: "Dream Pop Duo Sitting On Retro Couch With Vintage Lighting",
    artist: "Rules",
    bpm: 85,
    keySig: "E minor",
    priceAmount: 15,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 14400000,
    createdAt: BASE_TIME + 14400000,
  },
  {
    id: "asset-new-006",
    title: "Electric Guitar Neck Under Studio Lights, Reflective Chrome Tones",
    artist: "Rules",
    bpm: 140,
    keySig: "B minor",
    priceAmount: 2,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 18000000,
    createdAt: BASE_TIME + 18000000,
  },
  {
    id: "asset-new-007",
    title: "Lo Fi Electric Piano Keyboard On A Wooden Desk With Vinyl And Lamp",
    artist: "Rules",
    bpm: 75,
    keySig: "C major",
    priceAmount: 3,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 21600000,
    createdAt: BASE_TIME + 21600000,
  },
  {
    id: "asset-new-008",
    title: "Mpc Sampler On Desk With Coffee And Vinyl Crate",
    artist: "Rules",
    bpm: 125,
    keySig: "F# minor",
    priceAmount: 4,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 25200000,
    createdAt: BASE_TIME + 25200000,
  },
  {
    id: "asset-new-009",
    title: "Modular Synth Cables Glowing In Ambient Purple Light",
    artist: "Rules",
    bpm: 130,
    keySig: "G# minor",
    priceAmount: 9,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 28800000,
    createdAt: BASE_TIME + 28800000,
  },
  {
    id: "asset-new-010",
    title: "Studio Microphone Glowing Under Neon Pink And Blue Light",
    artist: "Rules",
    bpm: 95,
    keySig: "A# major",
    priceAmount: 4,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 32400000,
    createdAt: BASE_TIME + 32400000,
  },
  {
    id: "asset-new-011",
    title: "Trumpet And Saxophones Under Stage Lights",
    artist: "Rules",
    bpm: 115,
    keySig: "D major",
    priceAmount: 13,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 36000000,
    createdAt: BASE_TIME + 36000000,
  },
  {
    id: "asset-new-012",
    title: "Vintage Drum Set In Cozy Studio Corner",
    artist: "Rules",
    bpm: 120,
    keySig: "E minor",
    priceAmount: 4,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 39600000,
    createdAt: BASE_TIME + 39600000,
  },
  {
    id: "asset-new-013",
    title: "Neon Night Drive — Retro Synthwave Aesthetic With Glowing City Lights",
    artist: "GotMusic Producer",
    bpm: 129,
    keySig: "C# minor",
    priceAmount: 8,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 43200000,
    createdAt: BASE_TIME + 43200000,
  },
  {
    id: "asset-new-014",
    title: "1970s Funk Revival With Bright Colors, Grainy Texture",
    artist: "GotMusic Producer",
    bpm: 106,
    keySig: "D major",
    priceAmount: 13,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 46800000,
    createdAt: BASE_TIME + 46800000,
  },
  {
    id: "asset-new-015",
    title: "Ambient Soundscape — Foggy Mountains Or Misty Forest Minimalism",
    artist: "Rules",
    bpm: 75,
    keySig: "D# major",
    priceAmount: 12,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 50400000,
    createdAt: BASE_TIME + 50400000,
  },
  {
    id: "asset-new-016",
    title: "Country Singer Leaning On Pickup Truck At Dusk",
    artist: "Rules",
    bpm: 84,
    keySig: "A# minor",
    priceAmount: 9,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 54000000,
    createdAt: BASE_TIME + 54000000,
  },
  {
    id: "asset-new-017",
    title: "Ethereal Forest Singer Portrait With Natural Green Light",
    artist: "GotMusic Producer",
    bpm: 76,
    keySig: "F major",
    priceAmount: 9,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 57600000,
    createdAt: BASE_TIME + 57600000,
  },
  {
    id: "asset-new-018",
    title: "Indie Folk Duo In A Sunset Field With Acoustic Guitar",
    artist: "Rules",
    bpm: 90,
    keySig: "D# minor",
    priceAmount: 3,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 61200000,
    createdAt: BASE_TIME + 61200000,
  },
  {
    id: "asset-new-019",
    title: "Jazz Trio Performing Live On Dim Stage, Soft Spotlight",
    artist: "GotMusic Producer",
    bpm: 113,
    keySig: "A minor",
    priceAmount: 8,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 64800000,
    createdAt: BASE_TIME + 64800000,
  },
  {
    id: "asset-new-020",
    title: "Minimal Techno — Grayscale Texture With Subtle Motion Blur",
    artist: "GotMusic Producer",
    bpm: 125,
    keySig: "D minor",
    priceAmount: 8,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 68400000,
    createdAt: BASE_TIME + 68400000,
  },
  {
    id: "asset-new-021",
    title: "Punk Style Portrait With Ripped Text Look And Grain",
    artist: "GotMusic Producer",
    bpm: 154,
    keySig: "D major",
    priceAmount: 12,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 72000000,
    createdAt: BASE_TIME + 72000000,
  },
  {
    id: "asset-new-022",
    title: "Rapper On City Rooftop At Dusk With Skyline Backdrop",
    artist: "GotMusic Producer",
    bpm: 81,
    keySig: "F# major",
    priceAmount: 15,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 75600000,
    createdAt: BASE_TIME + 75600000,
  },
  {
    id: "asset-new-023",
    title: "Soul Singer Portrait With Warm Golden Backlight",
    artist: "Rules",
    bpm: 104,
    keySig: "E major",
    priceAmount: 12,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 79200000,
    createdAt: BASE_TIME + 79200000,
  },
  {
    id: "asset-new-024",
    title: "Trap Producer In Smoky Studio, Neon Red Lighting",
    artist: "Rules",
    bpm: 84,
    keySig: "E major",
    priceAmount: 15,
    priceCurrency: "USD",
    status: "published",
    updatedAt: BASE_TIME + 82800000,
    createdAt: BASE_TIME + 82800000,
  },
];

export function getFallbackAssetById(id: string) {
  return fallbackAssets.find((asset) => asset.id === id) ?? null;
}

type Query = {
  limit: number;
  cursor?: string;
  page?: number;
  status?: string;
  q?: string;
};

export function queryFallbackAssets({ limit, cursor, page, status, q }: Query) {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 12;
  const cursorNumber = cursor ? Number.parseInt(cursor, 10) : undefined;
  const currentPage = page || 1;
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
  const totalPages = Math.ceil(totalCount / normalizedLimit);
  const offset = (currentPage - 1) * normalizedLimit;
  const items = filtered.slice(offset, offset + normalizedLimit);
  const nextCursor =
    totalCount > offset + normalizedLimit && filtered[offset + normalizedLimit]
      ? filtered[offset + normalizedLimit].updatedAt.toString()
      : null;

  return {
    items,
    totalCount,
    nextCursor,
    pagination: {
      page: currentPage,
      limit: normalizedLimit,
      totalCount,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    }
  };
}