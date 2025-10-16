import { generateIdAtTime } from "@/lib/ulid";
import { db, schema } from "./index";

// Fixed timestamps for deterministic seeding (CI/E2E stability)
const BASE_TIMESTAMP = new Date("2025-01-01T00:00:00Z");
const HOUR_MS = 60 * 60 * 1000;

// Deterministic seed data with ULID IDs (time-based for determinism)
const ASSETS = [
  {
    id: generateIdAtTime(BASE_TIMESTAMP.getTime()), // ULID based on timestamp
    title: "Night Drive 88",
    artist: "KiloWav",
    bpm: 88,
    key: "Am",
    previewUrl: "https://cdn.example.com/previews/beat_001.mp3",
    coverUrl: "https://cdn.example.com/covers/beat_001.jpg",
    price: { currency: "PYUSD", amount: 12 },
    createdAt: new Date(BASE_TIMESTAMP.getTime()),
    updatedAt: new Date(BASE_TIMESTAMP.getTime()),
  },
  {
    id: generateIdAtTime(BASE_TIMESTAMP.getTime() + HOUR_MS),
    title: "Glass Pad",
    artist: "Nova",
    bpm: 120,
    key: "Cmaj",
    previewUrl: "https://cdn.example.com/previews/loop_009.mp3",
    coverUrl: "https://cdn.example.com/covers/loop_009.jpg",
    price: { currency: "PYUSD", amount: 4 },
    createdAt: new Date(BASE_TIMESTAMP.getTime() + HOUR_MS),
    updatedAt: new Date(BASE_TIMESTAMP.getTime() + HOUR_MS),
  },
  {
    id: generateIdAtTime(BASE_TIMESTAMP.getTime() + 2 * HOUR_MS),
    title: "Ethereal Vox",
    artist: "Luna",
    bpm: 95,
    key: "Dm",
    previewUrl: "https://cdn.example.com/previews/vocal_042.mp3",
    coverUrl: "https://cdn.example.com/covers/vocal_042.jpg",
    price: { currency: "PYUSD", amount: 8 },
    createdAt: new Date(BASE_TIMESTAMP.getTime() + 2 * HOUR_MS),
    updatedAt: new Date(BASE_TIMESTAMP.getTime() + 2 * HOUR_MS),
  },
] as const;

async function seed() {
  console.log("🌱 Seeding database...");

  // Check if already seeded
  const query = db.select().from(schema.assets).limit(1);
  const existing = await query;

  if (existing.length > 0) {
    console.log("✅ Database already seeded. Skipping.");
    return;
  }

  // Insert assets with fixed timestamps
  for (const asset of ASSETS) {
    await db.insert(schema.assets).values({
      id: asset.id,
      title: asset.title,
      artist: asset.artist,
      bpm: asset.bpm ?? null,
      keySig: asset.key ?? null,
      priceAmount: asset.price.amount.toString(),
      priceCurrency: asset.price.currency,
      status: "published",
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt,
    });

    // Insert asset files (preview)
    if (asset.previewUrl) {
      await db.insert(schema.assetFiles).values({
        id: generateIdAtTime(asset.createdAt.getTime() + 1000), // +1s offset for uniqueness
        assetId: asset.id,
        kind: "preview",
        storageKey: asset.previewUrl, // For now, storing URL as key
        mime: "audio/mpeg",
      });
    }

    // Insert asset files (cover)
    if (asset.coverUrl) {
      await db.insert(schema.assetFiles).values({
        id: generateIdAtTime(asset.createdAt.getTime() + 2000), // +2s offset for uniqueness
        assetId: asset.id,
        kind: "artwork",
        storageKey: asset.coverUrl,
        mime: "image/jpeg",
      });
    }
  }

  console.log(`✅ Seeded ${ASSETS.length} assets.`);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
