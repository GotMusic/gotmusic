import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Marquee from "../components/home/Marquee";

export const metadata = {
  title: "GotMusic - Producer-Grade Sounds with Verifiable Licenses",
  description:
    "Discover producer-grade samples, stems, and presets. Encrypted previews, on-chain receipts via EAS, and secure delivery through Lit Protocol.",
};

export default async function HomePage() {
  // Trending tags/genres (later: pull from API or fixtures)
  const trendingTags = [
    "Techno",
    "Trap",
    "Afrobeats",
    "House",
    "Drill",
    "Film Score",
    "Lo-Fi",
    "128 BPM",
    "C minor",
    "Am",
    "140 BPM",
    "Melodic",
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <Hero />

      <Marquee items={trendingTags} />

      {/* Stats badges */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-[var(--radius-md,12px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)] p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-brand-primary,#6AE6A6)]">1.2k+</div>
          <div className="mt-1 text-xs text-[var(--color-fg-muted,#A9B1C1)]">Samples</div>
        </div>
        <div className="rounded-[var(--radius-md,12px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)] p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-brand-accent,#5BD0FF)]">320+</div>
          <div className="mt-1 text-xs text-[var(--color-fg-muted,#A9B1C1)]">Producers</div>
        </div>
        <div className="rounded-[var(--radius-md,12px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)] p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-brand-primary,#6AE6A6)]">100%</div>
          <div className="mt-1 text-xs text-[var(--color-fg-muted,#A9B1C1)]">Verified</div>
        </div>
        <div className="rounded-[var(--radius-md,12px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)] p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-brand-accent,#5BD0FF)]">
            On-chain
          </div>
          <div className="mt-1 text-xs text-[var(--color-fg-muted,#A9B1C1)]">Receipts</div>
        </div>
      </div>

      <HowItWorks />

      {/* CTA section */}
      <div className="rounded-[var(--radius-lg,16px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)] p-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-fg,#E6EAF2)]">
          Ready to discover your next sound?
        </h2>
        <p className="mt-2 text-[var(--color-fg-muted,#A9B1C1)]">
          Browse our full catalog of producer-grade audio assets
        </p>
        <a
          href="/catalog"
          className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md,12px)] bg-[var(--color-brand-primary,#6AE6A6)] px-8 py-3 font-semibold text-[var(--color-fg-inverse,#0B0D12)] transition-all duration-150 hover:bg-[var(--color-brand-primary-hover,#5ADFA0)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated,#121520)]"
        >
          <span>Browse Catalog</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </div>
    </main>
  );
}
