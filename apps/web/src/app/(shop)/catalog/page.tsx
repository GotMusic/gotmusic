import type { Metadata } from "next";
import { Suspense } from "react";
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

      <Suspense fallback={
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`skeleton-${i}`}
              className="h-48 glass-neumorphic rounded-xl animate-pulse"
            >
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                <div className="h-3 bg-white/15 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-white/20 rounded-full w-16"></div>
                  <div className="h-6 bg-white/20 rounded-full w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      }>
        <CatalogGrid />
      </Suspense>
    </div>
  );
}
