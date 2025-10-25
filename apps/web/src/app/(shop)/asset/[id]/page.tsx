import AssetReceipt from "@/app/studio/assets/[id]/AssetReceipt";
import { db, schema } from "@/server/db";
import { Player, Tag } from "@gotmusic/ui";
import { PLACEHOLDER_CONTENT, PURCHASE_BUTTON_TEXT } from "@/lib/constants";
import { HeroImage } from "@gotmusic/ui";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const asset = await db
    .select()
    .from(schema.assets)
    .where(eq(schema.assets.id, id))
    .then((rows) => rows[0]);

  if (!asset) {
    return {
      title: "Asset Not Found | GotMusic",
    };
  }

  return {
    title: `${asset.title} by ${asset.artist || "Unknown"} | GotMusic`,
    description: `Listen to ${asset.title}. Available for purchase on GotMusic.`,
  };
}

export default async function AssetDetailPage({ params }: Props) {
  const { id } = await params;
  const asset = await db
    .select()
    .from(schema.assets)
    .where(eq(schema.assets.id, id))
    .then((rows) => rows[0]);

  if (!asset) {
    return notFound();
  }

  // Check if asset is published
  const isPublished = asset.status === "published";

  return (
    <div className="mx-auto max-w-4xl">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-green-500/5 backdrop-blur-sm" />
      {/* Always-present top headings so E2E tests can assert reliably */}
      <h1 className="sr-only">Asset #{asset.id}</h1>
      <h2 data-testid="asset-title" className="sr-only">
        {asset.title}
      </h2>

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[var(--color-fg-muted,#A9B1C1)]">
        <Link href="/catalog" className="hover:text-[var(--color-fg,#E6EAF2)]">
          Catalog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-fg,#E6EAF2)]">{asset.title}</span>
      </nav>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Artwork & Player */}
        <div className="lg:col-span-2 space-y-4">
          {/* Artwork */}
          <div
            className="aspect-square w-full overflow-hidden rounded-xl bg-card backdrop-blur-sm border border-cta-brand shadow-elevation-cta-brand"
            data-testid="asset-artwork"
          >
            <HeroImage
              assetId={asset.id}
              alt={`${asset.title} artwork`}
              className="w-full h-full"
              priority
            />
          </div>

          {/* Player */}
          {isPublished && (
            <div className="rounded-xl bg-card backdrop-blur-sm border border-cta-brand p-6 shadow-elevation-cta-brand">
              <div className="text-center">
                <div className="text-4xl mb-4">{PLACEHOLDER_CONTENT.artwork.emoji}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{PLACEHOLDER_CONTENT.preview.title}</h3>
                <p className="text-sm text-gray-300">
                  {PLACEHOLDER_CONTENT.preview.description}
                </p>
              </div>
            </div>
          )}

          {!isPublished && (
            <output className="block rounded-[var(--radius-lg,16px)] border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg-elevated,#121520)] p-6 text-center">
              <p className="text-[var(--color-fg-muted,#A9B1C1)]">
                {PLACEHOLDER_CONTENT.unavailable.message}
              </p>
            </output>
          )}
        </div>

        {/* Right Column - Details & Purchase */}
        <div className="space-y-4">
          {/* Title & Artist */}
          <div>
            <h1
              className="text-3xl font-bold text-[var(--color-fg,#E6EAF2)]"
              data-testid="asset-detail-heading"
            >
              {asset.title}
            </h1>
            <p
              className="mt-2 text-lg text-[var(--color-fg-muted,#A9B1C1)]"
              data-testid="asset-artist"
            >
              {asset.artist || "Unknown Artist"}
            </p>
          </div>

          {/* Metadata Tags */}
          <div className="flex flex-wrap gap-2">
            {asset.bpm && (
              <Tag className="text-sm px-2 py-1 bg-[var(--color-bg-muted,#0F131B)] text-[var(--color-fg-muted,#A9B1C1)]">
                {asset.bpm} BPM
              </Tag>
            )}
            {asset.keySig && (
              <Tag className="text-sm px-2 py-1 bg-[var(--color-bg-muted,#0F131B)] text-[var(--color-fg-muted,#A9B1C1)]">
                {asset.keySig}
              </Tag>
            )}
            <Tag
              className={`text-sm px-2 py-1 ${
                isPublished
                  ? "bg-[var(--color-brand-primary,#6AE6A6)]/20 text-[var(--color-brand-primary,#6AE6A6)]"
                  : "bg-[var(--color-bg-muted,#0F131B)] text-[var(--color-fg-muted,#A9B1C1)]"
              }`}
            >
              {asset.status}
            </Tag>
          </div>

          {/* Price & Purchase */}
          <div
            className="rounded-xl bg-card backdrop-blur-sm border border-cta-brand p-6 shadow-elevation-cta-brand"
            data-testid="purchase-card"
          >
            <div className="mb-4">
              <p className="text-sm text-[var(--color-fg-muted,#A9B1C1)]">Price</p>
              <p
                className="text-3xl font-bold text-[var(--color-fg,#E6EAF2)]"
                data-testid="asset-price"
              >
                ${(Number(asset.priceAmount) / 100).toFixed(2)}
              </p>
              <p className="text-xs text-[var(--color-fg-muted,#A9B1C1)]">{asset.priceCurrency}</p>
            </div>

            {isPublished ? (
              <button
                type="button"
                className="w-full rounded-lg bg-gradient-to-r from-brand-primary to-brand-accent px-6 py-4 text-white font-bold text-lg shadow-elevation-cta-brand hover:shadow-elevation-cta-premium hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-ring"
                data-testid="purchase-button"
              >
                {PURCHASE_BUTTON_TEXT}
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="w-full rounded-[var(--radius-md,12px)] bg-[var(--color-state-disabled-bg,rgba(255,255,255,0.06))] px-4 py-3 text-[var(--color-state-disabled-fg,rgba(230,234,242,0.35))] font-semibold cursor-not-allowed"
                data-testid="disabled-purchase-button"
              >
                Not Available
              </button>
            )}

            <p className="mt-3 text-xs text-center text-[var(--color-fg-muted,#A9B1C1)]">
              Includes verifiable on-chain license receipt
            </p>
          </div>

          {/* License Info */}
          <div className="rounded-[var(--radius-md,12px)] border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg-muted,#0F131B)] p-4">
            <h2 className="mb-2 text-sm font-semibold text-[var(--color-fg,#E6EAF2)]">
              What You Get
            </h2>
            <ul className="space-y-1 text-sm text-[var(--color-fg-muted,#A9B1C1)]">
              <li>✓ Full audio file download</li>
              <li>✓ On-chain license receipt (EAS)</li>
              <li>✓ Commercial use rights</li>
              <li>✓ Verifiable provenance</li>
            </ul>
          </div>

          {/* Asset Receipt - for E2E tests */}
          <AssetReceipt assetId={asset.id} />
        </div>
      </div>
    </div>
  );
}
