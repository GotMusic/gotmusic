import type { Metadata } from "next";
import { CatalogGrid } from "./CatalogGrid";

export const metadata: Metadata = {
  title: "Catalog | GotMusic",
  description: "Browse producer-grade samples, beats, stems, and presets with verifiable licenses",
};

export default function CatalogPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-fg,#E6EAF2)]">Explore</h1>
        <p className="text-[var(--color-fg-muted,#A9B1C1)]">
          Producer-grade audio with on-chain license receipts
        </p>
      </header>

      {/* TODO: Filters component */}
      <div className="mb-6 rounded-lg border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg-elevated,#121520)] p-4">
        <p className="text-sm text-[var(--color-fg-muted,#A9B1C1)]">
          Filters (type, genre, BPM, key, price) - Coming soon
        </p>
      </div>

      <CatalogGrid />
    </div>
  );
}
