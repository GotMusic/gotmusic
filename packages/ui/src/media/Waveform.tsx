import { forwardRef } from "react";
import { cn } from "../utils";

export interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: number[];
  color?: string;
  hoverColor?: string;
  bins?: number;
}

const Waveform = forwardRef<HTMLDivElement, WaveformProps>(
  (
    {
      className,
      data = [],
      color = "bg-fg/40",
      hoverColor = "bg-brand-primary/60",
      bins = 64,
      ...props
    },
    ref,
  ) => {
    // Generate fallback data if empty
    const waveformData = data.length > 0 ? data : Array.from({ length: bins }, () => Math.random());

    return (
      <div
        ref={ref}
        className={cn("flex items-end gap-0.5 h-full", className)}
        role="img"
        aria-label="Audio waveform"
        {...props}
      >
        {waveformData.map((value, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 min-h-[15%] transition-colors duration-150",
              color,
              `hover:${hoverColor}`,
            )}
            style={{
              height: `${Math.max(15, value * 100)}%`,
            }}
          />
        ))}
      </div>
    );
  },
);

Waveform.displayName = "Waveform";

export { Waveform };
