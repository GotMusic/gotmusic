"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@gotmusic/ui";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  // measured card center x-positions (in px, relative to stage left)
  const [centers, setCenters] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); // which card we're traveling to
  const [sweepX, setSweepX] = useState(0); // current sweep center (px)
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // measure centers on mount/resize
  useEffect(() => {
    const measure = () => {
      if (!stageRef.current) return;
      const stageLeft = stageRef.current.getBoundingClientRect().left + window.scrollX;
      const arr = cardRefs.current
        .map((el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const center = r.left + window.scrollX + r.width / 2 - stageLeft;
          return center;
        })
        .filter((v): v is number => typeof v === "number");
      setCenters(arr);
      // reset sweep to first center for a clean start
      if (arr.length) setSweepX(arr[0]);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // position-based animation: sweep moves back and forth between centers
  useEffect(() => {
    if (!centers.length || reduced) return;
    let raf = 0;
    let start = 0;
    const from = sweepX;
    const to = centers[activeIndex];

    const DURATION = 1200; // per-hop time (ms) - slightly slower for symmetry
    const EASE = (t: number) => 1 - (1 - t) ** 3; // easeOutCubic

    const loop = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / DURATION);
      const x = from + (to - from) * EASE(t);
      setSweepX(x);
      if (t < 1) {
        raf = requestAnimationFrame(loop);
      } else {
        // small dwell, then move to next center (back and forth)
        setTimeout(() => {
          // Use direction to determine next position
          const nextIndex = activeIndex + direction;

          // Check boundaries and reverse direction
          if (nextIndex >= centers.length) {
            setDirection(-1); // reverse direction
            setActiveIndex(activeIndex - 1);
          } else if (nextIndex < 0) {
            setDirection(1); // reverse direction
            setActiveIndex(activeIndex + 1);
          } else {
            setActiveIndex(nextIndex);
          }
        }, 300); // slightly longer dwell for symmetry
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, centers, reduced, direction, sweepX]); // re-run when target changes or centers remap

  // nearest-card logic: pick the card whose center is closest to the sweep
  const nearestIndex = useMemo(() => {
    if (!centers.length) return 0;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    centers.forEach((c, i) => {
      const d = Math.abs(c - sweepX);
      if (d < bestDist) {
        best = i;
        bestDist = d;
      }
    });
    return best;
  }, [centers, sweepX]);

  // sweep width (in px). We'll keep its visual width consistent.
  const SWEEP_WIDTH = 260;

  // reduced motion detection
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setPref = () => setReduced(!!mq.matches);
    setPref();
    mq.addEventListener?.("change", setPref);
    return () => mq.removeEventListener?.("change", setPref);
  }, []);

  return (
    <Card variant="default" size="lg" className="relative mx-auto max-w-6xl">
      <CardHeader>
        <CardTitle id="how-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          How it works
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Blockchain-powered music that's fast, private, and verifiable end-to-end.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* STAGE: position-synced rail + sweep + cards */}
        <div className="relative overflow-visible mb-8 sm:mb-10" ref={stageRef}>
          {/* Rail with intentional gap below */}
          <div aria-hidden="true" className="relative z-0 mb-6 sm:mb-8">
            <div className="h-[3px] w-full rounded-full bg-[linear-gradient(90deg,rgba(106,230,166,0.35),rgba(91,208,255,0.35))]" />
          </div>

          {/* Full-height sweep overlay (above cards). IMPORTANT: no overflow-hidden on parents */}
          {!reduced && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-8 -bottom-4 z-5"
            >
              <div
                ref={sweepRef}
                className="absolute top-0 bottom-0 will-change-transform"
                style={{
                  transform: `translateX(${sweepX - SWEEP_WIDTH / 2}px)`,
                  width: `${SWEEP_WIDTH}px`,
                }}
              >
                <div
                  className="h-full w-full"
                  style={{
                    filter: "blur(8px)",
                    background:
                      "radial-gradient(70% 60% at 50% 30%, rgba(106,230,166,0.30) 0%, rgba(91,208,255,0.22) 40%, transparent 75%), linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
                    boxShadow:
                      "0 12px 32px rgba(91,208,255,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset",
                  }}
                />
              </div>
            </div>
          )}

          {/* Cards (below sweep) */}
          <ol
            className="relative z-0 grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3"
            aria-label="Three step flow"
          >
            {steps.map((s, i) => {
              const isNear = i === nearestIndex;
              return (
                <li
                  key={s.k}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="group relative"
                >
                  <Card
                    variant={isNear && !reduced ? "music" : "default"}
                    size="lg"
                    className={[
                      "h-full transition-[transform,box-shadow,border-color,background] duration-300 will-change-transform",
                      isNear && !reduced
                        ? "shadow-[0_14px_30px_rgba(0,0,0,0.34)] -translate-y-[6px]"
                        : "shadow-[0_2px_8px_rgba(0,0,0,0.16)] translate-y-0",
                    ].join(" ")}
                  >
                    {/* badge + icon row (synced via isNear) */}
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none transition-colors duration-300",
                          isNear && !reduced
                            ? "bg-[var(--color-brand-accent)] text-[var(--color-bg)]"
                            : "bg-[rgba(255,255,255,0.08)] text-[var(--color-fg)]",
                        ].join(" ")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={[
                          "inline-flex items-center justify-center rounded-xl w-10 h-10 transition-all duration-300",
                          isNear && !reduced
                            ? "text-[var(--color-fg-inverse)] bg-[var(--color-brand-primary)] shadow-[0_8px_18px_rgba(106,230,166,0.38)]"
                            : "text-[var(--color-brand-primary)] bg-[rgba(106,230,166,0.12)] shadow-[0_4px_12px_rgba(0,0,0,0.18)]",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {s.icon}
                      </span>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg font-semibold tracking-tight">
                        {s.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {s.body}
                      </CardDescription>
                    </CardHeader>

                    {/* example sub-block on step 2 */}
                    {i === 1 && (
                      <CardContent>
                        <div
                          className={[
                            "mt-3 rounded-md border p-2 transition-colors duration-300",
                            isNear && !reduced ? "border-brand-accent" : "border-border-hairline",
                          ].join(" ")}
                        >
                          <p className="text-xs text-fg-muted">
                            Example receipt: <span className="font-mono opacity-80">0x72…e4a9</span>{" "}
                            • <span className="opacity-80">EAS</span>
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <Card
          variant="default"
          size="md"
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
        >
          <CardContent className="flex-1">
            <p className="text-base sm:text-lg font-semibold text-fg-default">
              Ready to discover your next sound?
            </p>
            <p className="text-sm text-fg-muted">
              Browse encrypted previews. Buy with PYUSD. Keep receipts on-chain.
            </p>
          </CardContent>
          <CardContent>
            <a
              href="/catalog"
              className="inline-flex items-center justify-center rounded-lg
                         px-4 py-2 text-sm font-medium
                         text-fg-inverse
                         bg-brand-primary
                         hover:opacity-90
                         focus:outline-none focus-visible:ring-2
                         focus-visible:ring-brand-accent
                         focus-visible:ring-offset-2
                         shadow-[0_4px_12px_rgba(106,230,166,0.30)]"
            >
              Browse Catalog
            </a>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
