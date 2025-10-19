"use client";

import { BRANDS, type BrandItem } from "@/data/brands";
import Image from "next/image";
import { useMemo, useState } from "react";

type CatKey = "all" | "onchain" | "storage" | "wallets" | "infra";

const CATS: { key: CatKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "onchain", label: "On-chain" },
  { key: "storage", label: "Storage & Delivery" },
  { key: "wallets", label: "Wallets & Payments" },
  { key: "infra", label: "Infra & Dev" },
];

// Category-specific border colors
const CAT_BORDER: Record<Exclude<CatKey, "all">, string> = {
  onchain: "border-[#8B5CF6]", // purple
  storage: "border-[#22D3EE]", // cyan
  wallets: "border-[#6AE6A6]", // mint
  infra: "border-[#F59E0B]", // amber
};

export default function BrandsAndApis() {
  const [active, setActive] = useState<CatKey>("all");
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);

  const filtered = useMemo(() => {
    if (active === "all") return BRANDS;
    return BRANDS.filter((b) => b.cat === active);
  }, [active]);

  return (
    <section
      className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 rounded-[var(--radius-lg,16px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)] relative"
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

      {/* Tabs */}
      <div className="mb-4">
        <div role="tablist" aria-label="Brand categories" className="flex flex-wrap gap-1">
          {CATS.map((c) => {
            const isActive = active === c.key;
            return (
              <button
                type="button"
                key={c.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`brands-grid-${c.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(c.key)}
                className={[
                  "rounded-full px-3 py-1 text-sm sm:text-base transition-all duration-200 border",
                  isActive
                    ? "border-[var(--color-border-emphasis,rgba(255,255,255,0.16))] bg-[var(--color-bg-elevated)] text-[var(--color-fg)] shadow-tab-active"
                    : "border-[var(--color-border-subtle,rgba(255,255,255,0.10))] text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-fg)] shadow-tab-subtle hover:shadow-tab-hover",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <ul
        id={`brands-grid-${active}`}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3"
        aria-label={`Integrated brands and APIs: ${CATS.find((c) => c.key === active)?.label}`}
      >
        {filtered.map((b) => {
          const borderClass =
            (CAT_BORDER as Record<string, string>)[b.cat] ?? "border-[rgba(255,255,255,0.10)]";
          return (
            <li
              key={`${active}-${b.name}`}
              aria-label={b.ariaLabel ?? b.name}
              onClick={() => setSelectedBrand(selectedBrand?.name === b.name ? null : b)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedBrand(selectedBrand?.name === b.name ? null : b);
                }
              }}
              className={[
                "group rounded-xl cursor-pointer border px-3 py-0.5 flex items-center justify-center",
                "bg-[#101623] hover:bg-[#101623]/85",
                "shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.20)]",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-accent,#5BD0FF)]",
                borderClass,
              ].join(" ")}
            >
              <div className="bg-[#101623] rounded-lg px-2 py-0 flex items-center justify-center h-16">
                <div className="text-white text-xs font-bold text-center leading-tight">
                  {b.name}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Drawer */}
      {selectedBrand && (
        <div className="absolute top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out">
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--border-soft)] rounded-t-[var(--radius-lg,16px)] rounded-b-xl shadow-[0_10px_32px_rgba(0,0,0,0.45)] p-4 min-h-[150px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-muted)] flex items-center justify-center">
                <span className="text-xl font-bold text-[var(--color-brand-primary)]">
                  {selectedBrand.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-fg)] text-lg">
                  {selectedBrand.name}
                </h3>
                <p className="text-sm text-[var(--color-fg-muted)]">Technology Partner</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={selectedBrand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-brand-primary)] text-[var(--color-fg-inverse)] hover:opacity-90 transition-opacity text-center"
                >
                  Visit
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedBrand(null)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border-soft)] text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-muted)] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <p className="text-sm text-[var(--color-fg-muted)]">
              {getBrandDescription(selectedBrand.name)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function getBrandDescription(brandName: string): string {
  const descriptions: Record<string, string> = {
    Ethereum:
      "The world's leading smart contract platform powering decentralized applications and digital assets.",
    Base: "Coinbase's Layer 2 blockchain built for the next billion users in crypto.",
    "Avail Nexus":
      "A modular blockchain solution providing data availability and consensus for scalable applications.",
    EAS: "Ethereum Attestation Service enables on-chain attestations for verifiable credentials and proofs.",
    Blockscout:
      "Open-source blockchain explorer providing transparency and verification for on-chain transactions.",
    Lighthouse:
      "Decentralized storage network offering secure, censorship-resistant data storage solutions.",
    "Lit Protocol": "Decentralized key management and encryption services for Web3 applications.",
    IPFS: "InterPlanetary File System - a distributed protocol for storing and accessing files in a peer-to-peer network.",
    "Cloudflare R2":
      "Cloudflare's object storage service with zero egress fees for global content delivery.",
    "AWS S3": "Amazon's scalable object storage service for data backup, archival, and analytics.",
    PYUSD: "PayPal's USD-pegged stablecoin for fast, low-cost digital payments.",
    MetaMask: "The world's most popular self-custody crypto wallet and Web3 gateway.",
    WalletConnect:
      "Open protocol connecting wallets to decentralized applications across all devices.",
    "Coinbase Wallet": "Self-custody wallet with easy access to DeFi, NFTs, and Web3 applications.",
    Vercel: "Frontend cloud platform for building and deploying modern web applications.",
    "GitHub Actions":
      "Automated CI/CD platform for software development workflows and deployments.",
    PostgreSQL: "Advanced open-source relational database with extensibility and SQL compliance.",
    Railway: "Modern cloud platform for deploying applications with zero-config infrastructure.",
    Docker:
      "Containerization platform for building, shipping, and running distributed applications.",
    Turborepo: "High-performance build system for JavaScript and TypeScript codebases.",
    "Tailwind CSS": "Utility-first CSS framework for rapidly building custom user interfaces.",
    NativeWind: "Universal utility-first styling for React Native applications.",
    Storybook:
      "Tool for building UI components and pages in isolation with interactive documentation.",
    Playwright: "End-to-end testing framework for reliable web application testing.",
    Jest: "Delightful JavaScript testing framework with a focus on simplicity.",
    Biome: "Fast formatter and linter for JavaScript, TypeScript, and other web technologies.",
    TypeScript:
      "Strongly typed programming language that builds on JavaScript for better tooling and reliability.",
  };

  return (
    descriptions[brandName] ||
    "A trusted technology partner powering GotMusic's infrastructure and services."
  );
}
