"use client";

import { forwardRef, useState } from "react";
import { Pause, Play, Volume, VolumeX } from "../icons";
import { cn } from "../utils";

export interface MiniPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onVolumeChange"> {
  src: string;
  title: string;
  artist?: string;
  coverUrl?: string;
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  isMuted?: boolean;
  isExpanded?: boolean;
  isDocked?: boolean;
  onPlayPause?: () => void;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onToggleMute?: () => void;
  onToggleExpand?: () => void;
  onClose?: () => void;
}

const MiniPlayer = forwardRef<HTMLDivElement, MiniPlayerProps>(
  (
    {
      className,
      src,
      title,
      artist,
      coverUrl,
      isPlaying = false,
      currentTime = 0,
      duration = 0,
      volume = 0.8,
      isMuted = false,
      isExpanded = false,
      isDocked = false,
      onPlayPause,
      onSeek,
      onVolumeChange,
      onToggleMute,
      onToggleExpand,
      onClose,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-3",
          "bg-[var(--color-bg-elevated,#121520)]",
          "border border-[var(--border-subtle,rgba(255,255,255,0.10))]",
          "rounded-[var(--radius-lg,16px)]",
          "shadow-[var(--shadow-2,0_8px_32px_0_rgba(0,0,0,0.35))]",
          "transition-all duration-300",
          isDocked && "fixed bottom-4 left-4 right-4 z-50",
          isExpanded && "w-full",
          !isExpanded && "w-80",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Mini player for ${title}`}
        {...props}
      >
        {/* Cover Art */}
        {coverUrl && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
            <img src={coverUrl} alt={`${title} cover`} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-[var(--color-fg,#E6EAF2)] truncate">{title}</h4>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 p-1 text-[var(--color-fg-muted,#A9B1C1)] hover:text-[var(--color-fg,#E6EAF2)]"
                aria-label="Close mini player"
              >
                ×
              </button>
            )}
          </div>
          {artist && (
            <p className="text-xs text-[var(--color-fg-muted,#A9B1C1)] truncate">{artist}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={onPlayPause}
            className={cn(
              "flex items-center justify-center w-8 h-8",
              "rounded-full bg-[var(--color-brand-primary,#6AE6A6)]",
              "text-[var(--color-fg-inverse,#0B0D12)]",
              "hover:bg-[var(--color-brand-primary-hover,#5ADFA0)]",
              "active:scale-95",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
              "transition-all duration-150",
            )}
            aria-label={isPlaying ? "Pause" : "Play"}
            aria-pressed={isPlaying}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {/* Volume Control (expanded only) */}
          {isExpanded && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onToggleMute}
                className="p-1 text-[var(--color-fg-muted,#A9B1C1)] hover:text-[var(--color-fg,#E6EAF2)]"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Volume className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange?.(Number.parseFloat(e.target.value))}
                className={cn(
                  "w-16 h-1 rounded-lg appearance-none cursor-pointer",
                  "bg-[var(--color-bg-muted,#0F131B)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                )}
                aria-label="Volume"
              />
            </div>
          )}

          {/* Expand/Collapse Button */}
          {onToggleExpand && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="p-1 text-[var(--color-fg-muted,#A9B1C1)] hover:text-[var(--color-fg,#E6EAF2)]"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              <div
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isExpanded ? "rotate-180" : "rotate-0",
                )}
                aria-hidden="true"
              >
                ▲
              </div>
            </button>
          )}
        </div>

        {/* Progress Bar (expanded only) */}
        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 p-3 pt-0">
            <div className="flex items-center gap-2 text-xs text-[var(--color-fg-muted,#A9B1C1)]">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 h-1 bg-[var(--color-bg-muted,#0F131B)] rounded-lg overflow-hidden">
                <div
                  className="h-full bg-[var(--color-brand-primary,#6AE6A6)] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* Seek Bar (expanded only) */}
        {isExpanded && onSeek && (
          <div className="absolute bottom-0 left-0 right-0 p-3 pt-0">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => onSeek(Number.parseFloat(e.target.value))}
              className={cn(
                "w-full h-1 rounded-lg appearance-none cursor-pointer",
                "bg-[var(--color-bg-muted,#0F131B)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
              )}
              aria-label="Seek"
            />
          </div>
        )}
      </div>
    );
  },
);

MiniPlayer.displayName = "MiniPlayer";

export { MiniPlayer };
