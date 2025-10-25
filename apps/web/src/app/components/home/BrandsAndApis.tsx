"use client";

import { BRANDS } from "@/data/brands";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from "@gotmusic/ui";

type CatKey = "all" | "onchain" | "storage" | "wallets" | "infra" | "performance";

const CATS: { key: CatKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "onchain", label: "On-chain" },
  { key: "storage", label: "Storage & Delivery" },
  { key: "wallets", label: "Wallets & Payments" },
  { key: "infra", label: "Infra & Dev" },
  { key: "performance", label: "Performance" },
];

// Category border colors using design tokens
const CATEGORY_BORDERS: Record<CatKey, string> = {
  all: "border-[var(--color-border-soft)]",
  onchain: "border-[var(--color-brand-ice)]",
  storage: "border-[var(--color-brand-mint)]",
  wallets: "border-[var(--color-palette-semantic-success)]",
  infra: "border-[var(--color-palette-semantic-warning)]",
  performance: "border-[var(--color-palette-semantic-danger)]",
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
    <Card variant="default" size="lg" className="mx-auto max-w-6xl" aria-labelledby="brands-apis-heading" data-testid="brands-apis-section">
      <CardHeader>
        <CardTitle id="brands-apis-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          Brands & APIs we run on
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          The rails behind encrypted previews, verifiable receipts, and secure delivery.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Tabs (radio-group semantics for great a11y) */}
        <div role="tablist" aria-label="Brand categories" className="mb-6 flex flex-wrap gap-2">
        {CATS.map((c) => {
          const isActive = active === c.key;
          return (
            <Button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`brands-grid-${c.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(c.key)}
              variant={isActive ? "primary" : "ghost"}
              size="sm"
              className="rounded-full"
            >
              {c.label}
            </Button>
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
              <Card
                variant="default"
                size="sm"
                onClick={() => openDrawer(b)}
                className={[
                  "group flex items-center justify-center cursor-pointer",
                  "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30",
                  "hover:shadow-[0_6px_18px_rgba(0,0,0,0.20)]",
                  CATEGORY_BORDERS[active === "all" ? b.cat : active],
                ].join(" ")}
                aria-label={`Learn more about ${b.ariaLabel ?? b.name}`}
              >
                <CardContent className="p-3 sm:p-4">
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={120}
                    height={40}
                    className="opacity-80 group-hover:opacity-100 max-h-8 sm:max-h-10 w-auto"
                    priority={false}
                  />
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Drawer Overlay */}
      {selectedBrand && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4"
          onClick={closeDrawer}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeDrawer();
            }
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[var(--color-bg-default)]/50 backdrop-blur-sm" />

          {/* Drawer */}
          <Card variant="music" size="lg" className="relative w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.40)]" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border-soft">
              <div className="flex items-center gap-3">
                <Image
                  src={selectedBrand.logo}
                  alt={selectedBrand.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <CardTitle className="text-lg font-semibold">{selectedBrand.name}</CardTitle>
              </div>
              <Button
                type="button"
                onClick={closeDrawer}
                variant="ghost"
                size="icon"
                aria-label="Close drawer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Close</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-6">
              <CardDescription className="text-sm mb-6">
                {selectedBrand.name} is a key partner in our ecosystem, providing essential
                infrastructure for encrypted previews, verifiable receipts, and secure delivery.
              </CardDescription>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href={selectedBrand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-fg-inverse bg-brand-primary hover:bg-brand-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                >
                  Visit {selectedBrand.name}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>External link</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
                <Button
                  type="button"
                  onClick={closeDrawer}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
