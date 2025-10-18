"use client";

import Image from "next/image";
import Link from "next/link";
import { BRANDS } from "@/data/brands";
import { useMemo, useState } from "react";

type CatKey = "all" | "onchain" | "storage" | "wallets" | "infra";

const CATS: { key: CatKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "onchain", label: "On-chain" },
  { key: "storage", label: "Storage & Delivery" },
  { key: "wallets", label: "Wallets & Payments" },
  { key: "infra", label: "Infra & Dev" },
];

export default function BrandsAndApis() {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<CatKey>("all");

  const filtered = useMemo(() => {
    if (active === "all") return BRANDS;
    return BRANDS.filter((b) => b.cat === active);
  }, [active]);

  // 16 visible by default when on "All"; otherwise show full filtered set
  const visible = useMemo(() => {
    if (active !== "all") return filtered;
    return showAll ? filtered : filtered.slice(0, 16);
  }, [filtered, showAll, active]);

  return (
    <section
      className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16"
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
      <div
        id={`brands-grid-${active}`}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        role="list"
        aria-label={`Integrated brands and APIs: ${CATS.find((c) => c.key === active)?.label}`}
      >
        {visible.map((b) => (
          <Link
            key={`${active}-${b.name}`}
            href={b.href}
            target="_blank"
            rel="noreferrer"
            role="listitem"
            aria-label={b.ariaLabel ?? b.name}
            className="group rounded-xl border border-white/10 bg-elevated/50 hover:bg-elevated/70
                       transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30
                       p-3 sm:p-4 flex items-center justify-center"
          >
            <Image
              src={b.logo}
              alt={b.name}
              width={120}
              height={40}
              className="opacity-80 group-hover:opacity-100 max-h-8 sm:max-h-10 w-auto"
              priority={false}
            />
          </Link>
        ))}
      </div>

      {/* Toggle only appears on "All" */}
      {active === "all" && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-sm sm:text-base underline underline-offset-4 hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30 rounded-md px-3 py-2"
            aria-expanded={showAll}
          >
            {showAll ? "Show less" : "Show all"}
          </button>
        </div>
      )}
    </section>
  );
}
