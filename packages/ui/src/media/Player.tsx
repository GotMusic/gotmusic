import { forwardRef, useEffect, useRef, useState } from "react";
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
        className={cn("flex flex-col gap-2 p-3 bg-card border rounded-lg", className)}
        aria-label={`Audio player for ${title}`}
        onKeyDown={handleKeyDown}
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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            aria-pressed={isPlaying}
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" aria-hidden="true">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Time Display */}
          <div className="flex items-center gap-2 text-sm text-fg/70">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(clamp ? Math.min(clamp, duration) : duration)}</span>
          </div>

          {/* Download Button (optional) */}
          {showDownload && !clamp && (
            <a
              href={src}
              download={title}
              className="ml-auto p-2 text-fg/70 hover:text-fg"
              aria-label={`Download ${title}`}
            >
              <span className="sr-only">Download {title}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
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
            className="flex-1 h-2 bg-fg/20 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            role="progressbar"
            aria-valuenow={currentTime}
            aria-valuemin={0}
            aria-valuemax={clamp ? clamp : duration}
            aria-label="Audio progress"
          />
        </div>

        {/* Volume Control (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-2">
          <svg
            className="w-4 h-4 text-fg/70"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-fg/20 rounded-lg appearance-none cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </section>
    );
  },
);

Player.displayName = "Player";

export { Player };
