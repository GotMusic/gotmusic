"use client";

import { forwardRef } from "react";
import { Pause, Play, Volume2, VolumeX } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface AssetPreviewProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof assetPreviewVariants> {
  asset: {
    id: string;
    title: string;
    artist: string;
    coverUrl?: string;
    duration?: number;
    waveform?: number[];
    isPlaying?: boolean;
    currentTime?: number;
    volume?: number;
    isMuted?: boolean;
  };
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onMute?: () => void;
  onUnmute?: () => void;
}

const assetPreviewVariants = cva(
  "relative flex flex-col rounded-lg border bg-bg-elevated border-border-subtle overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        compact: "p-3",
        detailed: "p-4",
      },
      size: {
        sm: "w-64 h-48",
        md: "w-80 h-60",
        lg: "w-96 h-72",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const AssetPreview = forwardRef<HTMLDivElement, AssetPreviewProps>(
  (
    {
      className,
      asset,
      onPlay,
      onPause,
      onSeek,
      onVolumeChange,
      onMute,
      onUnmute,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const progress =
      asset.duration && asset.currentTime ? (asset.currentTime / asset.duration) * 100 : 0;

    const handlePlayPause = () => {
      if (asset.isPlaying) {
        onPause?.();
      } else {
        onPlay?.();
      }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!asset.duration || !onSeek) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * asset.duration;

      onSeek(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const volume = Number.parseFloat(e.target.value);
      onVolumeChange?.(volume);
    };

    const handleMuteToggle = () => {
      if (asset.isMuted) {
        onUnmute?.();
      } else {
        onMute?.();
      }
    };

    return (
      <div ref={ref} className={cn(assetPreviewVariants({ variant, size }), className)} {...props}>
        {/* Cover/Thumbnail */}
        <div className="relative w-full h-32 overflow-hidden">
          {asset.coverUrl ? (
            <img
              src={asset.coverUrl}
              alt={`${asset.title} cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-bg-muted flex items-center justify-center">
              <div className="text-fg-muted text-4xl">🎵</div>
            </div>
          )}

          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handlePlayPause}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 hover:bg-white transition-colors"
              aria-label={asset.isPlaying ? "Pause" : "Play"}
            >
              {asset.isPlaying ? (
                <Pause className="w-6 h-6 text-fg" />
              ) : (
                <Play className="w-6 h-6 text-fg ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-3">
          {/* Title and Artist */}
          <div className="space-y-1">
            <h3 className="font-medium text-fg truncate" title={asset.title}>
              {asset.title}
            </h3>
            <p className="text-sm text-fg-muted truncate" title={asset.artist}>
              {asset.artist}
            </p>
          </div>

          {/* Waveform */}
          {asset.waveform && asset.waveform.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-fg-muted">
                <span>{asset.currentTime ? formatTime(asset.currentTime) : "0:00"}</span>
                <span>{asset.duration ? formatDuration(asset.duration) : "0:00"}</span>
              </div>

              <div
                className="relative h-8 bg-bg-muted rounded cursor-pointer"
                onClick={handleSeek}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = x / rect.width;
                    const newTime = percentage * (asset.duration || 0);
                    onSeek?.(newTime);
                  }
                }}
                role="progressbar"
                tabIndex={0}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Seek bar"
              >
                {/* Waveform */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-0.5 h-4">
                    {asset.waveform.slice(0, 50).map((value, index) => (
                      <div
                        key={`wave-${value}-${index}-${Date.now()}`}
                        className="bg-fg-muted rounded-sm transition-all duration-200"
                        style={{
                          width: "2px",
                          height: `${Math.max(2, value * 16)}px`,
                          opacity: index / 50 < progress / 100 ? 1 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div
                  className="absolute top-0 left-0 h-full bg-brand-primary transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={handlePlayPause}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-fg-inverse transition-colors"
              aria-label={asset.isPlaying ? "Pause" : "Play"}
            >
              {asset.isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMuteToggle}
                className="p-1 rounded hover:bg-bg-hover transition-colors"
                aria-label={asset.isMuted ? "Unmute" : "Mute"}
              >
                {asset.isMuted ? (
                  <VolumeX className="w-4 h-4 text-fg-muted" />
                ) : (
                  <Volume2 className="w-4 h-4 text-fg-muted" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={asset.isMuted ? 0 : (asset.volume ?? 1)}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-bg-muted rounded-lg appearance-none cursor-pointer slider"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

AssetPreview.displayName = "AssetPreview";

export { AssetPreview };
