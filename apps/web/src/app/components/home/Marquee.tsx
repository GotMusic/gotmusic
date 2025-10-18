"use client";

import { useEffect, useRef } from "react";

type MarqueeProps = {
  items: string[];
  speed?: number; // seconds for one full cycle
};

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Disable animation for reduced motion preference
      el.style.animation = "none";
    }
  }, []);

  return (
    <div className="relative my-6 overflow-hidden rounded-[var(--radius-md,12px)] border border-[var(--border-soft)]">
      <div
        ref={ref}
        className="flex gap-6 whitespace-nowrap px-4 py-3"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Duplicate items for seamless loop */}
        {items.concat(items).map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-[var(--color-bg,#0B0D12)] px-3 py-1 text-sm text-[var(--color-fg-muted,#A9B1C1)] transition-colors hover:border-[var(--color-brand-accent,#5BD0FF)] hover:text-[var(--color-brand-accent,#5BD0FF)]"
          >
            {item}
          </span>
        ))}
      </div>

      {/* CSS keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

