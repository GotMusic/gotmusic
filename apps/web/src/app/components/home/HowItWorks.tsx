"use client";

import { useEffect, useState } from "react";

type Step = {
  k: string;
  title: string;
  body: string;
  icon: React.ReactElement;
};

const steps: Step[] = [
  {
    k: "browse",
    title: "Browse & Preview",
    body: "Explore producer-grade samples with encrypted 30-second previews. Save favorites, compare BPM & key fast.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    k: "pay",
    title: "Purchase with PYUSD",
    body: "Checkout in seconds. Payment executes via Nexus and mints a verifiable on-chain receipt.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    k: "verify",
    title: "Download & Verify",
    body: "Authorized? Decrypt via Lit and download privately. Your EAS receipt proves ownership forever.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M8 11l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="4" y="17" width="16" height="4" rx="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  // Respect reduced motion for the progress rail
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      data-testid="how-it-works"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 rounded-[var(--radius-lg,16px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)]"
    >
      <header className="mb-8 sm:mb-10">
        <h2 id="how-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          How it works
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[var(--color-fg-muted,#A9B1C1)]">
          Blockchain-powered music that's fast, private, and verifiable end-to-end.
        </p>
      </header>

      {/* Progress rail (animated gradient line that links the cards) */}
      <div className="relative mb-8 sm:mb-10">
        {/* Background rail */}
        <div
          aria-hidden="true"
          className="h-[3px] w-full rounded-full bg-[linear-gradient(90deg,rgba(106,230,166,0.3),rgba(91,208,255,0.3))]"
        />
        {/* Animated progress bar */}
        {!reduced && (
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 h-[3px] w-full rounded-full bg-[linear-gradient(90deg,rgba(106,230,166,0.8),rgba(91,208,255,0.8))]"
            style={{
              animation: "rail-progress 8s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Steps grid */}
      <ol
        className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3"
        aria-label="Three step purchase and delivery flow"
      >
        {steps.map((s, i) => (
          <li key={s.k} className="group relative">
            {/* Card */}
            <div
              className="h-full rounded-2xl bg-[var(--color-bg,#0B0D12)] p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-[2px] focus-within:-translate-y-[2px] !shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:!shadow-[0_8px_24px_rgba(0,0,0,0.28)] outline-none"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                ...(!reduced
                  ? {
                      animation: `card-raise-${i} 8s ease-in-out infinite`,
                    }
                  : {}),
              }}
            >
              {/* Icon bubble with number badge */}
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="inline-flex items-center justify-center rounded-xl w-10 h-10 text-[var(--color-fg-inverse,#0B0D12)] bg-[var(--color-brand-primary,#6AE6A6)] !shadow-[0_4px_12px_rgba(106,230,166,0.35)]"
                  aria-hidden="true"
                >
                  {s.icon}
                </div>
                {/* Number badge next to icon */}
                <div
                  className="rounded-full px-3 py-1 text-xs font-semibold text-[var(--color-fg-inverse,#0B0D12)] bg-[var(--color-brand-accent,#5BD0FF)]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>

              {/* Body */}
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted,#A9B1C1)]">
                {s.body}
              </p>

              {/* Micro-proof row (subtle, optional) */}
              {i === 1 && (
                <div className="mt-3 rounded-md border border-[var(--color-border-hairline,rgba(255,255,255,0.06))] p-2">
                  <p className="text-xs text-[var(--color-fg-muted,#A9B1C1)]">
                    Example receipt: <span className="font-mono opacity-80">0x72…e4a9</span> •{" "}
                    <span className="opacity-80">EAS</span>
                  </p>
                </div>
              )}

              {/* Focus ring for keyboard users */}
              <button
                type="button"
                className="sr-only focus:not-sr-only mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-brand-accent,#5BD0FF)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)] focus-visible:ring-offset-2 rounded-md px-2 py-1"
                onClick={(e) => e.currentTarget.blur()}
              >
                Learn more
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                  <path
                    d="M8 5l8 7-8 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ol>

      {/* CTA */}
      <div className="mt-8 sm:mt-10 rounded-[var(--radius-lg,16px)] border border-[var(--border-soft)] bg-[var(--color-bg,#0B0D12)] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 !shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:!shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-shadow duration-300">
        <div className="flex-1">
          <p className="text-base sm:text-lg font-semibold">Ready to discover your next sound?</p>
          <p className="text-sm text-[var(--color-fg-muted,#A9B1C1)]">
            Browse encrypted previews. Buy with PYUSD. Keep receipts on-chain.
          </p>
        </div>
        <a
          href="/catalog"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-fg-inverse,#0B0D12)] bg-[var(--color-brand-primary,#6AE6A6)] hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)] focus-visible:ring-offset-2 !shadow-[0_4px_12px_rgba(106,230,166,0.30)]"
        >
          Browse Catalog
        </a>
      </div>

      {/* keyframes (scoped) */}
      <style jsx>{`
        @keyframes rail-progress {
          0% { 
            transform: scaleX(0);
            transform-origin: left;
          }
          50% { 
            transform: scaleX(1);
            transform-origin: left;
          }
          100% { 
            transform: scaleX(0);
            transform-origin: right;
          }
        }
        @keyframes card-raise-0 {
          0%, 15% { 
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            border-color: rgba(255,255,255,0.2);
            background: var(--color-bg,#0B0D12);
          }
          20%, 30% { 
            transform: translateY(-8px);
            box-shadow: 0 8px 32px rgba(106,230,166,0.4), 0 0 20px rgba(106,230,166,0.3);
            border-color: rgba(106,230,166,0.6);
            background: rgba(106,230,166,0.05);
          }
          35%, 100% { 
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            border-color: rgba(255,255,255,0.2);
            background: var(--color-bg,#0B0D12);
          }
        }
        @keyframes card-raise-1 {
          0%, 40% { 
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            border-color: rgba(255,255,255,0.2);
            background: var(--color-bg,#0B0D12);
          }
          45%, 55% { 
            transform: translateY(-8px);
            box-shadow: 0 8px 32px rgba(91,208,255,0.4), 0 0 20px rgba(91,208,255,0.3);
            border-color: rgba(91,208,255,0.6);
            background: rgba(91,208,255,0.05);
          }
          60%, 100% { 
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            border-color: rgba(255,255,255,0.2);
            background: var(--color-bg,#0B0D12);
          }
        }
        @keyframes card-raise-2 {
          0%, 65% { 
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            border-color: rgba(255,255,255,0.2);
            background: var(--color-bg,#0B0D12);
          }
          70%, 80% { 
            transform: translateY(-8px);
            box-shadow: 0 8px 32px rgba(106,230,166,0.4), 0 0 20px rgba(106,230,166,0.3);
            border-color: rgba(106,230,166,0.6);
            background: rgba(106,230,166,0.05);
          }
          85%, 100% { 
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
            border-color: rgba(255,255,255,0.2);
            background: var(--color-bg,#0B0D12);
          }
        }
      `}</style>
    </section>
  );
}
