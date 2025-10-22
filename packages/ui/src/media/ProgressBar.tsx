"use client";

import { forwardRef, useState } from "react";
import { cn } from "../utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTime?: number;
  duration?: number;
  bufferedTime?: number;
  isLoading?: boolean;
  isBuffering?: boolean;
  hasError?: boolean;
  isInteractive?: boolean;
  showTime?: boolean;
  showBuffered?: boolean;
  onSeek?: (time: number) => void;
  onHover?: (time: number) => void;
  onLeave?: () => void;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      currentTime = 0,
      duration = 0,
      bufferedTime = 0,
      isLoading = false,
      isBuffering = false,
      hasError = false,
      isInteractive = true,
      showTime = true,
      showBuffered = true,
      onSeek,
      onHover,
      onLeave,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverTime, setHoverTime] = useState(0);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const bufferedProgress = duration > 0 ? (bufferedTime / duration) * 100 : 0;

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const time = percentage * duration;
      setHoverTime(time);
      onHover?.(time);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setHoverTime(0);
      onLeave?.();
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive || !onSeek) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const time = percentage * duration;
      onSeek(time);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isInteractive || !onSeek) return;

      const step = duration * 0.05; // 5% step
      let newTime = currentTime;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          newTime = Math.max(0, currentTime - step);
          onSeek(newTime);
          break;
        case "ArrowRight":
          e.preventDefault();
          newTime = Math.min(duration, currentTime + step);
          onSeek(newTime);
          break;
        case "Home":
          e.preventDefault();
          onSeek(0);
          break;
        case "End":
          e.preventDefault();
          onSeek(duration);
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2",
          "w-full",
          className,
        )}
        aria-label="Audio progress"
        {...props}
      >
        {/* Time Display */}
        {showTime && (
          <div className="flex justify-between text-xs text-[var(--color-fg-muted,#A9B1C1)]">
            <span aria-label={`Current time: ${formatTime(currentTime)}`}>
              {formatTime(currentTime)}
            </span>
            <span aria-label={`Duration: ${formatTime(duration)}`}>
              {formatTime(duration)}
            </span>
          </div>
        )}

        {/* Progress Bar Container */}
        <div className="relative">
          {/* Background Track */}
          <div
            className={cn(
              "w-full h-2 rounded-lg overflow-hidden",
              "bg-[var(--color-bg-muted,#0F131B)]",
              "relative",
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={isInteractive ? 0 : -1}
            role={isInteractive ? "slider" : "progressbar"}
            aria-valuenow={currentTime}
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-label="Audio progress"
            aria-disabled={!isInteractive}
          >
            {/* Buffered Progress */}
            {showBuffered && bufferedProgress > 0 && (
              <div
                className="absolute top-0 left-0 h-full bg-[var(--color-bg-hover,#1A1F2E)] transition-all duration-150"
                style={{ width: `${bufferedProgress}%` }}
                aria-hidden="true"
              />
            )}

            {/* Current Progress */}
            <div
              className={cn(
                "absolute top-0 left-0 h-full transition-all duration-150",
                "bg-[var(--color-brand-primary,#6AE6A6)]",
                hasError && "bg-[var(--color-destructive,#FF6B6B)]",
                isBuffering && "animate-pulse",
              )}
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />

            {/* Hover Indicator */}
            {isHovered && isInteractive && (
              <div
                className="absolute top-0 h-full w-0.5 bg-[var(--color-brand-accent,#5BD0FF)] transition-all duration-150"
                style={{ left: `${(hoverTime / duration) * 100}%` }}
                aria-hidden="true"
              />
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-[var(--color-brand-primary,#6AE6A6)] border-t-transparent" />
              </div>
            )}

            {/* Buffering Indicator */}
            {isBuffering && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[var(--color-brand-primary,#6AE6A6)] rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-[var(--color-brand-primary,#6AE6A6)] rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-1 h-1 bg-[var(--color-brand-primary,#6AE6A6)] rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            )}
          </div>

          {/* Hover Time Tooltip */}
          {isHovered && isInteractive && (
            <div
              className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-[var(--color-bg-elevated,#121520)] text-[var(--color-fg,#E6EAF2)] rounded border border-[var(--border-subtle,rgba(255,255,255,0.10))] shadow-lg pointer-events-none z-10"
              style={{ left: `${(hoverTime / duration) * 100}%`, transform: "translateX(-50%)" }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {isLoading && (
              <span className="text-[var(--color-brand-primary,#6AE6A6)]">
                Loading...
              </span>
            )}
            {isBuffering && !isLoading && (
              <span className="text-[var(--color-brand-primary,#6AE6A6)]">
                Buffering...
              </span>
            )}
            {hasError && (
              <span className="text-[var(--color-destructive,#FF6B6B)]">
                Error loading audio
              </span>
            )}
          </div>

          {showBuffered && bufferedTime > 0 && (
            <span className="text-[var(--color-fg-muted,#A9B1C1)]">
              Buffered: {formatTime(bufferedTime)}
            </span>
          )}
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
