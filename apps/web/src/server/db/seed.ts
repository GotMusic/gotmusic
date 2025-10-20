import { generateIdAtTime } from "@/lib/ulid";
import { db, schema } from "./index";

// Fixed timestamps for deterministic seeding (CI/E2E stability)
const BASE_TIMESTAMP = new Date("2025-01-01T00:00:00Z");
const HOUR_MS = 60 * 60 * 1000;

// Deterministic seed data with ULID IDs (time-based for determinism)
const ASSETS = [
  {
    id: "asset-e2e-fixed-001", // Fixed ID for E2E tests
    title: "Midnight Glass",
    artist: "Kairo",
    bpm: 120,
    key: "C Major",
    previewUrl: "https://cdn.example.com/previews/midnight-glass.mp3",
    coverUrl: "/test-assets/covers/midnight-glass-3000.png",
    price: { currency: "USD", amount: 29.99 },
    priceCredits: 30,
    duration: 198,
    fileSize: 73400320,
    createdAt: new Date(BASE_TIMESTAMP.getTime()),
    updatedAt: new Date(BASE_TIMESTAMP.getTime()),
  },
  {
    id: "asset-e2e-fixed-002", // Second test asset
    title: "Wild Sun",
    artist: "Nova Hale",
    bpm: 124,
    key: "A Minor",
    previewUrl: "https://cdn.example.com/previews/wild-sun.mp3",
    coverUrl: "/test-assets/covers/wild-sun-3000.png",
    price: { currency: "USD", amount: 24.0 },
    priceCredits: 24,
    duration: 212,
    fileSize: 68157440,
    createdAt: new Date(BASE_TIMESTAMP.getTime() + HOUR_MS),
    updatedAt: new Date(BASE_TIMESTAMP.getTime() + HOUR_MS),
  },
  {
    id: "asset-e2e-fixed-003", // Third test asset
    title: "Lost Signal",
    artist: "Vera Flux",
    bpm: 110,
    key: "E Minor",
    previewUrl: "https://cdn.example.com/previews/lost-signal.mp3",
    coverUrl: "/test-assets/covers/lost-signal-3000.png",
    price: { currency: "USD", amount: 19.0 },
    priceCredits: 19,
    duration: 187,
    fileSize: 62914560,
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
      priceCredits: asset.priceCredits,
      status: "published",
      ownerId: "mock-producer-123", // Fixed owner ID for E2E tests
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
