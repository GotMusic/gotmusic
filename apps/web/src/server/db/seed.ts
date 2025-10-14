import { db, schema, isSQLite, isPostgres } from "./index";

// Import fixture data directly - avoid package.json export issues
const ASSETS = [
  {
    id: "beat_001",
    title: "Night Drive 88",
    artist: "KiloWav",
    bpm: 88,
    key: "Am",
    previewUrl: "https://cdn.example.com/previews/beat_001.mp3",
    coverUrl: "https://cdn.example.com/covers/beat_001.jpg",
    price: { currency: "PYUSD", amount: 12 },
  },
  {
    id: "loop_009",
    title: "Glass Pad",
    artist: "Nova",
    bpm: 120,
    key: "Cmaj",
    previewUrl: "https://cdn.example.com/previews/loop_009.mp3",
    coverUrl: "https://cdn.example.com/covers/loop_009.jpg",
    price: { currency: "PYUSD", amount: 4 },
  },
] as const;

async function seed() {
  console.log("🌱 Seeding database...");

  // Check if already seeded
  let existing;
  if (isSQLite) {
    existing = db.select().from(schema.assets).limit(1).all();
  } else {
    existing = await db.select().from(schema.assets).limit(1);
  }
  
  if (existing.length > 0) {
    console.log("✅ Database already seeded. Skipping.");
    return;
  }

  // Insert assets
  for (const asset of ASSETS) {
    if (isSQLite) {
      db.insert(schema.assets)
        .values({
          id: asset.id,
          title: asset.title,
          artist: asset.artist,
          bpm: asset.bpm ?? null,
          keySig: asset.key ?? null,
          priceAmount: asset.price.amount,
          priceCurrency: asset.price.currency,
          status: "ready",
        })
        .run();
    } else {
      await db.insert(schema.assets)
        .values({
          id: asset.id,
          title: asset.title,
          artist: asset.artist,
          bpm: asset.bpm ?? null,
          keySig: asset.key ?? null,
          priceAmount: asset.price.amount,
          priceCurrency: asset.price.currency,
          status: "ready",
        });
    }

    // Insert asset files (preview)
    if (asset.previewUrl) {
      if (isSQLite) {
        db.insert(schema.assetFiles)
          .values({
            id: `${asset.id}-preview`,
            assetId: asset.id,
            kind: "preview",
            storageKey: asset.previewUrl, // For now, storing URL as key
            mime: "audio/mpeg",
          })
          .run();
      } else {
        await db.insert(schema.assetFiles)
          .values({
            id: `${asset.id}-preview`,
            assetId: asset.id,
            kind: "preview",
            storageKey: asset.previewUrl, // For now, storing URL as key
            mime: "audio/mpeg",
          });
      }
    }

    // Insert asset files (cover)
    if (asset.coverUrl) {
      if (isSQLite) {
        db.insert(schema.assetFiles)
          .values({
            id: `${asset.id}-cover`,
            assetId: asset.id,
            kind: "artwork",
            storageKey: asset.coverUrl,
            mime: "image/jpeg",
          })
          .run();
      } else {
        await db.insert(schema.assetFiles)
          .values({
            id: `${asset.id}-cover`,
            assetId: asset.id,
            kind: "artwork",
            storageKey: asset.coverUrl,
            mime: "image/jpeg",
          });
      }
    }
  }

  console.log(`✅ Seeded ${ASSETS.length} assets.`);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
