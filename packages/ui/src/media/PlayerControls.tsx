"use client";

import { forwardRef, useState } from "react";
import {
  Download,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume,
  VolumeX,
} from "../icons";
import { cn } from "../utils";

export interface PlayerControlsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onVolumeChange'> {
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  playbackRate?: number;
  isMuted?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  showDownload?: boolean;
  showSkip?: boolean;
  showSpeed?: boolean;
  onPlayPause?: () => void;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onToggleMute?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onSpeedChange?: (rate: number) => void;
  onDownload?: () => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const PlayerControls = forwardRef<HTMLDivElement, PlayerControlsProps>(
  (
    {
      className,
      isPlaying = false,
      currentTime = 0,
      duration = 0,
      volume = 0.8,
      playbackRate = 1,
      isMuted = false,
      isLoading = false,
      hasError = false,
      showDownload = false,
      showSkip = false,
      showSpeed = false,
      onPlayPause,
      onSeek,
      onVolumeChange,
      onToggleMute,
      onSkipBack,
      onSkipForward,
      onSpeedChange,
      onDownload,
      ...props
    },
    ref,
  ) => {
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = Number.parseFloat(e.target.value);
      onSeek?.(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number.parseFloat(e.target.value);
      onVolumeChange?.(newVolume);
    };

    const handleSpeedChange = (rate: number) => {
      onSpeedChange?.(rate);
      setShowSpeedMenu(false);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3 p-4",
          "bg-[var(--color-bg-elevated,#121520)]",
          "border border-[var(--border-subtle,rgba(255,255,255,0.10))]",
          "rounded-[var(--radius-lg,16px)]",
          "shadow-[var(--shadow-2,0_8px_32px_0_rgba(0,0,0,0.35))]",
          className,
        )}
        aria-label="Player controls"
        {...props}
      >
        {/* Main Controls Row */}
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {showSkip && (
              <button
                type="button"
                onClick={onSkipBack}
                disabled={isLoading}
                className={cn(
                  "flex items-center justify-center w-8 h-8",
                  "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
                  "text-[var(--color-fg-muted,#A9B1C1)]",
                  "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                  "hover:text-[var(--color-fg,#E6EAF2)]",
                  "active:scale-95",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "transition-all duration-150",
                )}
                aria-label="Skip back 10 seconds"
              >
                <SkipBack className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={onPlayPause}
              disabled={isLoading || hasError}
              className={cn(
                "flex items-center justify-center w-12 h-12",
                "rounded-full bg-[var(--color-brand-primary,#6AE6A6)]",
                "text-[var(--color-fg-inverse,#0B0D12)]",
                "hover:bg-[var(--color-brand-primary-hover,#5ADFA0)]",
                "active:scale-95",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                "transition-all duration-150",
              )}
              aria-label={isPlaying ? "Pause" : "Play"}
              aria-pressed={isPlaying}
            >
              {isLoading ? (
                <div className="w-6 h-6 animate-spin" aria-hidden="true">
                  ⟳
                </div>
              ) : isPlaying ? (
                <Pause className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Play className="w-6 h-6" aria-hidden="true" />
              )}
            </button>

            {showSkip && (
              <button
                type="button"
                onClick={onSkipForward}
                disabled={isLoading}
                className={cn(
                  "flex items-center justify-center w-8 h-8",
                  "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
                  "text-[var(--color-fg-muted,#A9B1C1)]",
                  "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                  "hover:text-[var(--color-fg,#E6EAF2)]",
                  "active:scale-95",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "transition-all duration-150",
                )}
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Center - Time Display */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-fg-muted,#A9B1C1)]">
            <span aria-label={`Current time: ${formatTime(currentTime)}`}>
              {formatTime(currentTime)}
            </span>
            <span aria-hidden="true">/</span>
            <span aria-label={`Duration: ${formatTime(duration)}`}>
              {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Speed Control */}
            {showSpeed && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className={cn(
                    "px-3 py-1 text-sm",
                    "bg-[var(--color-bg-muted,#0F131B)]",
                    "text-[var(--color-fg-muted,#A9B1C1)]",
                    "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                    "hover:text-[var(--color-fg,#E6EAF2)]",
                    "rounded-[var(--radius-sm,8px)]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                    "transition-all duration-150",
                  )}
                  aria-label="Playback speed"
                  aria-expanded={showSpeedMenu}
                >
                  {playbackRate}x
                </button>
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 p-2 bg-[var(--color-bg-elevated,#121520)] border border-[var(--border-subtle,rgba(255,255,255,0.10))] rounded-lg shadow-lg z-10">
                    {SPEED_OPTIONS.map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => handleSpeedChange(rate)}
                        className={cn(
                          "block w-full px-3 py-1 text-sm text-left",
                          "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                          "rounded-[var(--radius-sm,8px)]",
                          "transition-colors duration-150",
                          rate === playbackRate && "bg-[var(--color-brand-primary,#6AE6A6)] text-[var(--color-fg-inverse,#0B0D12)]",
                        )}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Download Button */}
            {showDownload && (
              <button
                type="button"
                onClick={onDownload}
                className={cn(
                  "flex items-center justify-center w-8 h-8",
                  "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
                  "text-[var(--color-fg-muted,#A9B1C1)]",
                  "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                  "hover:text-[var(--color-fg,#E6EAF2)]",
                  "active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "transition-all duration-150",
                )}
                aria-label="Download"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            disabled={isLoading || hasError}
            className={cn(
              "flex-1 h-2 rounded-lg appearance-none cursor-pointer",
              "bg-[var(--color-bg-muted,#0F131B)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
            )}
            role="progressbar"
            aria-valuenow={currentTime}
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-label="Audio progress"
          />
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMute}
            className={cn(
              "flex items-center justify-center w-8 h-8",
              "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
              "text-[var(--color-fg-muted,#A9B1C1)]",
              "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
              "hover:text-[var(--color-fg,#E6EAF2)]",
              "active:scale-95",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
              "transition-all duration-150",
            )}
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
            onChange={handleVolumeChange}
            className={cn(
              "w-24 h-2 rounded-lg appearance-none cursor-pointer",
              "bg-[var(--color-bg-muted,#0F131B)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
            )}
            aria-label="Volume"
            aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <span className="text-xs text-[var(--color-fg-muted,#A9B1C1)] w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Error State */}
        {hasError && (
          <div className="text-sm text-[var(--color-destructive,#FF6B6B)] text-center">
            Failed to load audio. Please try again.
          </div>
        )}
      </div>
    );
  },
);

PlayerControls.displayName = "PlayerControls";

export { PlayerControls };
