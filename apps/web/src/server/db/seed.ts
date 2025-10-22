import { generateIdAtTime } from "@/lib/ulid";
import { db, schema } from "./index";
import { sql, eq } from "drizzle-orm";

// Fixed timestamps for deterministic seeding (CI/E2E stability)
const BASE_TIMESTAMP = new Date("2025-01-01T00:00:00Z");
const HOUR_MS = 60 * 60 * 1000;

// Parameterize owner ID for E2E tests
const OWNER_ID = process.env.E2E_OWNER_ID ?? "mock-producer-123";

// Deterministic seed data with production-ready media assets
const ASSETS = [
  {
    id: "asset-e2e-fixed-001", // Fixed ID for E2E tests
    title: "Midnight Glass",
    artist: "Kairo",
    bpm: 122,
    key: "F#m",
    previewUrl: "https://cdn.example.com/previews/midnight-glass.mp3",
    coverUrl: "/media/covers/midnight-glass-3000.jpg",
    heroUrl: "/media/heroes/midnight-glass-1024.jpg",
    thumbUrl: "/media/thumbnails/midnight-glass-512.jpg",
    waveUrl: "/media/waveforms/midnight-glass-wave-1024x256.png",
    price: { currency: "USD", amount: 29.99 },
    priceCredits: 30,
    duration: 198,
    fileSize: 73400320,
    ownerId: OWNER_ID,
    createdAt: new Date(BASE_TIMESTAMP.getTime()),
    updatedAt: new Date(BASE_TIMESTAMP.getTime()),
  },
  {
    id: "asset-e2e-fixed-002", // Second test asset
    title: "Wild Sun",
    artist: "Nova Hale",
    bpm: 128,
    key: "C#m",
    previewUrl: "https://cdn.example.com/previews/wild-sun.mp3",
    coverUrl: "/media/covers/wild-sun-3000.jpg",
    heroUrl: "/media/heroes/wild-sun-1024.jpg",
    thumbUrl: "/media/thumbnails/wild-sun-512.jpg",
    waveUrl: "/media/waveforms/wild-sun-wave-1024x256.png",
    price: { currency: "USD", amount: 19.0 },
    priceCredits: 19,
    duration: 212,
    fileSize: 68157440,
    ownerId: OWNER_ID,
    createdAt: new Date(BASE_TIMESTAMP.getTime() + HOUR_MS),
    updatedAt: new Date(BASE_TIMESTAMP.getTime() + HOUR_MS),
  },
  {
    id: "asset-e2e-fixed-003", // Third test asset
    title: "Lost Signal",
    artist: "Vera Flux",
    bpm: 110,
    key: "Am",
    previewUrl: "https://cdn.example.com/previews/lost-signal.mp3",
    coverUrl: "/media/covers/lost-signal-3000.jpg",
    heroUrl: "/media/heroes/lost-signal-1024.jpg",
    thumbUrl: "/media/thumbnails/lost-signal-512.jpg",
    waveUrl: "/media/waveforms/lost-signal-wave-1024x256.png",
    price: { currency: "USD", amount: 24.0 },
    priceCredits: 24,
    duration: 187,
    fileSize: 62914560,
    ownerId: OWNER_ID,
    createdAt: new Date(BASE_TIMESTAMP.getTime() + 2 * HOUR_MS),
    updatedAt: new Date(BASE_TIMESTAMP.getTime() + 2 * HOUR_MS),
  },
] as const;

// UPSERT helpers for idempotent seeding
async function upsertAsset(tx: any, asset: (typeof ASSETS)[number]) {
  const [row] = await tx
    .insert(schema.assets)
    .values({
      id: asset.id,
      title: asset.title,
      artist: asset.artist,
      bpm: asset.bpm ?? null,
      keySig: asset.key ?? null,
      priceAmount: asset.price.amount.toString(),
      priceCurrency: asset.price.currency,
      priceCredits: asset.priceCredits,
      status: "published",
      ownerId: "mock-producer-123",
      durationSec: asset.duration ?? null,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt,
    })
    .onConflictDoUpdate({
      target: schema.assets.id,
      set: {
        title: asset.title,
        artist: asset.artist,
        status: "published",
        priceAmount: asset.price.amount.toString(),
        priceCurrency: asset.price.currency,
        bpm: asset.bpm ?? null,
        keySig: asset.key ?? null,
        durationSec: asset.duration ?? null,
        updatedAt: sql`now()`,
      },
    })
    .returning();
  return row;
}

async function upsertAssetFile(
  tx: any,
  file: {
    id: string;
    assetId: string;
    kind: "preview" | "artwork" | "waveform";
    storageKey: string;
    mime: string;
  }
) {
  const [row] = await tx
    .insert(schema.assetFiles)
    .values(file)
    .onConflictDoUpdate({
      target: [schema.assetFiles.assetId, schema.assetFiles.kind],
      set: {
        storageKey: file.storageKey,
        mime: file.mime,
      },
    })
    .returning();
  return row;
}

async function seed() {
  console.log("🌱 Seeding database...");

  // Optional: reset for test runs
  if (process.env.SEED_RESET === "1") {
    console.log("🔄 Resetting database for clean seed...");
    await db.execute(
      sql`TRUNCATE TABLE ${schema.assetFiles}, ${schema.assets} RESTART IDENTITY CASCADE`
    );
  }

  await db.transaction(async (tx) => {
    for (const asset of ASSETS) {
      // Upsert the main asset
      await upsertAsset(tx, asset);

      // Upsert asset files with unique kinds per asset
      const files = [
        {
          id: generateIdAtTime(asset.createdAt.getTime() + 1000),
          assetId: asset.id,
          kind: "preview" as const,
          storageKey: asset.previewUrl,
          mime: "audio/mpeg",
        },
        {
          id: generateIdAtTime(asset.createdAt.getTime() + 2000),
          assetId: asset.id,
          kind: "artwork" as const,
          storageKey: asset.coverUrl,
          mime: "image/jpeg",
        },
        {
          id: generateIdAtTime(asset.createdAt.getTime() + 5000),
          assetId: asset.id,
          kind: "waveform" as const,
          storageKey: asset.waveUrl,
          mime: "image/png",
        },
      ];

      for (const file of files) {
        if (file.storageKey) {
          await upsertAssetFile(tx, file);
        }
      }
    }
  });

  console.log(`✅ Seeded ${ASSETS.length} assets.`);
  
  // E2E diagnostic: verify assets were actually inserted
  if (process.env.NODE_ENV === "test") {
    const verifyAssets = await db.select().from(schema.assets).where(eq(schema.assets.ownerId, OWNER_ID));
    console.log(`[E2E] Verification: Found ${verifyAssets.length} assets for ${OWNER_ID}`);
    console.log(`[E2E] Asset IDs:`, verifyAssets.map(a => a.id));
  }
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
