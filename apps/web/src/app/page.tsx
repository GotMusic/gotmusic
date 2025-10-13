import { db, schema } from "@/server/db";
import { desc } from "drizzle-orm";
import React from "react";

export const dynamic = "force-dynamic"; // Skip static generation

export default async function Home() {
  // Fetch assets directly from DB on server
  const assets = db
    .select()
    .from(schema.assets)
    .orderBy(desc(schema.assets.updatedAt))
    .limit(20)
    .all();

  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold">GotMusic</h1>
      <p className="mt-1 text-fg/70">Real-time catalog from API</p>

      {assets.length === 0 ? (
        <p className="mt-6 text-fg/70">No assets available yet.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((a) => (
            <li
              key={a.id}
              className="rounded-md border border-white/10 bg-bg-elevated p-4"
              data-testid="catalog-item"
            >
              <div className="mb-1 text-lg font-medium text-fg">{a.title}</div>
              <div className="text-sm text-fg/70">
                {a.artist} · {a.bpm ?? "—"} BPM · {a.keySig ?? "—"}
              </div>
              <div className="mt-2 text-sm">
                ${a.priceAmount} {a.priceCurrency}
              </div>
              <div className="mt-1 text-xs text-fg/50">Status: {a.status}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
