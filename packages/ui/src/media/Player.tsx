"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Download, Pause, Play, Spinner, Volume } from "../icons";
import { cn } from "../utils";

export interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  title: string;
  clamp?: number; // 30 for preview, undefined for full
  onEnd?: () => void;
  showDownload?: boolean;
}

const Player = forwardRef<HTMLDivElement, PlayerProps>(
  ({ className, src, title, clamp, onEnd, showDownload = false, ...props }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Handle time updates
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleTimeUpdate = () => {
        const time = audio.currentTime;
        setCurrentTime(time);

        // Check clamp limit
        if (clamp && time >= clamp) {
          audio.pause();
          setIsPlaying(false);
          onEnd?.();
        }
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setIsLoading(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        onEnd?.();
      };

      const handleLoadStart = () => {
        setIsLoading(true);
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("loadstart", handleLoadStart);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("loadstart", handleLoadStart);
      };
    }, [clamp, onEnd]);

    // Handle play/pause
    const togglePlay = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Playback failed:", error);
        }
      }
    };

    // Handle seek (only in full mode)
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;
      if (!audio || clamp) return; // No seeking in preview mode

      const newTime = Number.parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };

    // Handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;
      if (!audio) return;

      const newVolume = Number.parseFloat(e.target.value);
      audio.volume = newVolume;
      setVolume(newVolume);
    };

    // Handle keyboard
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <section
        ref={ref}
        className={cn(
          "flex flex-col gap-3 p-4",
          "bg-[var(--color-bg-elevated,#121520)]",
          "border border-[var(--border-subtle,rgba(255,255,255,0.10))]",
          "rounded-[var(--radius-lg,16px)]",
          "shadow-[var(--shadow-2,0_8px_32px_0_rgba(0,0,0,0.35))]",
          className,
        )}
        aria-label={`Audio player for ${title}`}
        {...props}
      >
        {/* Hidden audio element */}
        <audio ref={audioRef} src={src} preload="metadata">
          <track kind="captions" src="" label="No captions available" />
        </audio>

        {/* Play/Pause Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            disabled={isLoading}
            className={cn(
              "flex items-center justify-center w-10 h-10",
              "rounded-full bg-[var(--color-brand-primary,#6AE6A6)]",
              "text-[var(--color-fg-inverse,#0B0D12)]",
              "hover:bg-[var(--color-brand-primary-hover,#5ADFA0)]",
              "active:scale-95",
              "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
              "transition-all duration-150",
            )}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            aria-pressed={isPlaying}
          >
            {isLoading ? (
              <Spinner className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Play className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          {/* Time Display */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-fg-muted,#A9B1C1)]">
            <span aria-label={`Current time: ${formatTime(currentTime)}`}>
              {formatTime(currentTime)}
            </span>
            <span aria-hidden="true">/</span>
            <span
              aria-label={`Duration: ${formatTime(clamp ? Math.min(clamp, duration) : duration)}`}
            >
              {formatTime(clamp ? Math.min(clamp, duration) : duration)}
            </span>
          </div>

          {/* Download Button (optional) */}
          {showDownload && !clamp && (
            <a
              href={src}
              download={title}
              className={cn(
                "ml-auto p-2",
                "text-[var(--color-fg-muted,#A9B1C1)]",
                "hover:text-[var(--color-fg,#E6EAF2)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                "rounded-[var(--radius-sm,8px)]",
                "transition-colors duration-150",
              )}
              aria-label={`Download ${title}`}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max={clamp ? clamp : duration}
            value={currentTime}
            onChange={handleSeek}
            disabled={!!clamp} // No seeking in preview mode
            className={cn(
              "flex-1 h-2 rounded-lg appearance-none cursor-pointer",
              "bg-[var(--color-bg-muted,#0F131B)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
            )}
            role="progressbar"
            aria-valuenow={currentTime}
            aria-valuemin={0}
            aria-valuemax={clamp ? clamp : duration}
            aria-label="Audio progress"
          />
        </div>

        {/* Volume Control (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-2">
          <Volume className="w-4 h-4 text-[var(--color-fg-muted,#A9B1C1)]" aria-hidden="true" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className={cn(
              "w-20 h-2 rounded-lg appearance-none cursor-pointer",
              "bg-[var(--color-bg-muted,#0F131B)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
            )}
            aria-label="Volume"
            aria-valuenow={Math.round(volume * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </section>
    );
  },
);

Player.displayName = "Player";

export { Player };
