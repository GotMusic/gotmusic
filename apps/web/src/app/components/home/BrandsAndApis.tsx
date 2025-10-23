"use client";

import { BRANDS } from "@/data/brands";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CatKey = "all" | "onchain" | "storage" | "wallets" | "infra" | "performance";

const CATS: { key: CatKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "onchain", label: "On-chain" },
  { key: "storage", label: "Storage & Delivery" },
  { key: "wallets", label: "Wallets & Payments" },
  { key: "infra", label: "Infra & Dev" },
  { key: "performance", label: "Performance" },
];

// Category border colors - solid colors only
const CATEGORY_BORDERS: Record<CatKey, string> = {
  all: "border-white",
  onchain: "border-purple-500",
  storage: "border-cyan-500",
  wallets: "border-green-500",
  infra: "border-orange-500",
  performance: "border-pink-500",
};

export default function BrandsAndApis() {
  const [active, setActive] = useState<CatKey>("all");
  const [selectedBrand, setSelectedBrand] = useState<(typeof BRANDS)[0] | null>(null);

  const filtered = useMemo(() => {
    if (active === "all") return BRANDS;
    return BRANDS.filter((b) => b.cat === active);
  }, [active]);

  // Show all brands - no limit
  const visible = useMemo(() => {
    return filtered;
  }, [filtered]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedBrand) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBrand]);

  const openDrawer = (brand: (typeof BRANDS)[0]) => {
    setSelectedBrand(brand);
  };

  const closeDrawer = () => {
    setSelectedBrand(null);
  };

  return (
    <section
      className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 rounded-[var(--radius-lg,16px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)]"
      aria-labelledby="brands-apis-heading"
      data-testid="brands-apis-section"
    >
      <header className="mb-6 sm:mb-8">
        <h2 id="brands-apis-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          Brands & APIs we run on
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          The rails behind encrypted previews, verifiable receipts, and secure delivery.
        </p>
      </header>

      {/* Tabs (radio-group semantics for great a11y) */}
      <div role="tablist" aria-label="Brand categories" className="mb-6 flex flex-wrap gap-2">
        {CATS.map((c) => {
          const isActive = active === c.key;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`brands-grid-${c.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(c.key)}
              className={[
                "rounded-full border px-3 py-1 text-sm sm:text-base transition-colors",
                isActive
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10",
              ].join(" ")}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <ul
        id={`brands-grid-${active}`}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        aria-label={`Integrated brands and APIs: ${CATS.find((c) => c.key === active)?.label}`}
      >
        {visible.map((b) => (
          <li key={`${active}-${b.name}`}>
            <div
              onClick={() => openDrawer(b)}
              className={[
                "group rounded-xl border p-3 sm:p-4 flex items-center justify-center cursor-pointer",
                "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30",
                "bg-[#101623] hover:bg-[#101623]/85",
                "shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.20)]",
                CATEGORY_BORDERS[active === "all" ? b.cat : active],
              ].join(" ")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openDrawer(b);
                }
              }}
              aria-label={`Learn more about ${b.ariaLabel ?? b.name}`}
            >
              <Image
                src={b.logo}
                alt={b.name}
                width={120}
                height={40}
                className="opacity-80 group-hover:opacity-100 max-h-8 sm:max-h-10 w-auto"
                priority={false}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Drawer Overlay */}
      {selectedBrand && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4"
          onClick={closeDrawer}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Drawer */}
          <div
            className="relative w-full max-w-md bg-[var(--color-bg-elevated,#121520)] rounded-2xl border border-[var(--border-soft)] shadow-[0_20px_50px_rgba(0,0,0,0.40)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-soft)]">
              <div className="flex items-center gap-3">
                <Image
                  src={selectedBrand.logo}
                  alt={selectedBrand.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h3 className="text-lg font-semibold">{selectedBrand.name}</h3>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Close drawer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-[var(--color-fg-muted,#A9B1C1)] mb-6">
                {selectedBrand.name} is a key partner in our ecosystem, providing essential
                infrastructure for encrypted previews, verifiable receipts, and secure delivery.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href={selectedBrand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-fg-inverse,#0B0D12)] bg-[var(--color-brand-primary,#6AE6A6)] hover:bg-[var(--color-brand-primary-hover,#5ADFA0)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent,#5BD0FF)] focus:ring-offset-2"
                >
                  Visit {selectedBrand.name}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-fg,#E6EAF2)] border border-[var(--border-soft)] rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
