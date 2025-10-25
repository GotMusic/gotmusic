import BrandsAndApis from "../components/home/BrandsAndApis";
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

      {/* Stats badges with Glass-Neumorphic design */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass-neumorphic-card text-center">
          <div className="text-2xl font-bold text-brand-primary">1.2k+</div>
          <div className="mt-1 text-xs text-fg-muted">Samples</div>
        </div>
        <div className="glass-neumorphic-card text-center">
          <div className="text-2xl font-bold text-brand-accent">320+</div>
          <div className="mt-1 text-xs text-fg-muted">Producers</div>
        </div>
        <div className="glass-neumorphic-card text-center">
          <div className="text-2xl font-bold text-semantic-success">100%</div>
          <div className="mt-1 text-xs text-fg-muted">Verified</div>
        </div>
        <div className="glass-neumorphic-card text-center">
          <div className="text-2xl font-bold text-brand-accent">On-chain</div>
          <div className="mt-1 text-xs text-fg-muted">Receipts</div>
        </div>
      </div>

      <HowItWorks />

      {/* NEW: Brands & APIs section (includes Performance category) */}
      <BrandsAndApis />

      {/* CTA section with Glass-Neumorphic design */}
      <div className="glass-neumorphic-brand rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-fg-default">Ready to discover your next sound?</h2>
        <p className="mt-2 text-fg-muted">
          Browse our full catalog of producer-grade audio assets
        </p>
        <a
          href="/catalog"
          className="mt-6 inline-flex items-center gap-2 glass-neumorphic-button rounded-lg px-8 py-3 font-semibold text-fg-default"
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
