"use client";

import type { BrandItem } from "@/data/brands";
import { useEffect, useRef, useState } from "react";

interface BrandPopoverProps {
  brand: BrandItem;
  children: React.ReactNode;
}

export default function BrandPopover({ brand, children }: BrandPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(brand.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className="fixed z-50 w-80 p-4 rounded-xl border border-[var(--border-soft)] bg-[var(--color-bg-elevated)] shadow-ambient2"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-muted)] flex items-center justify-center">
              <span className="text-lg font-bold text-[var(--color-brand-primary)]">
                {brand.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-fg)]">{brand.name}</h3>
              <p className="text-sm text-[var(--color-fg-muted)]">Technology Partner</p>
            </div>
          </div>

          <p className="text-sm text-[var(--color-fg-muted)] mb-4">
            {getBrandDescription(brand.name)}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleExternalClick}
              className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--color-brand-primary)] text-[var(--color-fg-inverse)] hover:bg-[var(--color-brand-primary)]/90 transition-colors"
            >
              Visit {brand.name}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg border border-[var(--border-soft)] text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-muted)] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
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
