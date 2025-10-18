import { Card } from "@gotmusic/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | GotMusic",
  description: "Browse producer-grade samples, beats, stems, and presets with verifiable licenses",
};

export default function CatalogPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-fg">Explore</h1>
        <p className="text-fg/70">Producer-grade audio with on-chain license receipts</p>
      </header>

      {/* TODO: Filters component */}
      <div className="mb-6 rounded-lg border border-fg/10 bg-fg/5 p-4">
        <p className="text-sm text-fg/60">Filters (type, genre, BPM, key, price) - Coming soon</p>
      </div>

      {/* TODO: CatalogGrid with actual data */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4 h-64 flex items-center justify-center">
            <p className="text-fg/40">Asset Card {i}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
