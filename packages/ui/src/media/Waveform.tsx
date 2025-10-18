"use client";

import { forwardRef } from "react";
import { cn } from "../utils";

export interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: number[];
  bins?: number;
}

// Generate realistic mock waveform data (64 bins)
const MOCK_BINS = Array.from({ length: 64 }, (_, i) => {
  // Create a natural-looking waveform with peaks and valleys
  const phase = (i / 64) * Math.PI * 2;
  const base = Math.sin(phase) * 0.3 + 0.5;
  const noise = Math.random() * 0.2;
  return Math.min(1, Math.max(0.15, base + noise));
});

const Waveform = forwardRef<HTMLDivElement, WaveformProps>(
  ({ className, data, bins = 64, ...props }, ref) => {
    // Use provided data or fall back to mock
    const waveformData = data && data.length > 0 ? data : MOCK_BINS;

    return (
      <div
        ref={ref}
        className={cn("flex items-end gap-0.5 h-16 w-full", className)}
        role="img"
        aria-label="Audio waveform visualization"
        {...props}
      >
        {waveformData.slice(0, bins).map((value, index) => (
          <div
            key={`waveform-${
              // biome-ignore lint/suspicious/noArrayIndexKey: static waveform data
              index
            }`}
            className={cn(
              "flex-1 min-h-[15%] rounded-sm transition-all duration-150",
              "bg-[var(--audio-waveform-fill,rgba(230,234,242,0.9))]",
              "hover:bg-[var(--color-brand-accent,#5BD0FF)]",
            )}
            style={{
              height: `${Math.max(15, value * 100)}%`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  },
);

Waveform.displayName = "Waveform";

export { Waveform };
