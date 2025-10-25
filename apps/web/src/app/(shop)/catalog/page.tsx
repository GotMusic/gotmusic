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
        <h1 className="text-3xl font-bold text-fg-default">Explore</h1>
        <p className="text-fg-muted">
          Producer-grade audio with on-chain license receipts
        </p>
      </header>

      {/* TODO: Filters component */}
      <div className="mb-6 glass-neumorphic-card">
        <p className="text-sm text-fg-muted">
          Filters (type, genre, BPM, key, price) - Coming soon
        </p>
      </div>

      <CatalogGrid />
    </div>
  );
}
