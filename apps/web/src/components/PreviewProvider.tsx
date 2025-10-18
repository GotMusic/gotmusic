"use client";

import React from "react";

type PreviewContext = {
  currentId: string | null;
  isPlaying: boolean;
  toggle: (id: string, url: string) => void;
};

const PreviewCtx = React.createContext<PreviewContext | null>(null);

export function usePreview() {
  const ctx = React.useContext(PreviewCtx);
  if (!ctx) {
    throw new Error("usePreview must be used within <PreviewProvider>");
  }
  return ctx;
}

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [currentId, setCurrentId] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    const el = new Audio();
    el.preload = "none";
    el.addEventListener("ended", () => setIsPlaying(false));
    audioRef.current = el;
    return () => {
      el.pause();
      el.src = "";
    };
  }, []);

  const toggle = React.useCallback(
    (id: string, url: string) => {
      const el = audioRef.current;
      if (!el) return;

      // If same track and playing, pause it
      if (currentId === id && !el.paused) {
        el.pause();
        setIsPlaying(false);
        return;
      }

      // Otherwise, stop current and play new
      el.pause();
      el.src = url;
      void el
        .play()
        .then(() => {
          setCurrentId(id);
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    },
    [currentId],
  );

  const value = React.useMemo(
    () => ({ currentId, isPlaying, toggle }),
    [currentId, isPlaying, toggle],
  );

  return <PreviewCtx.Provider value={value}>{children}</PreviewCtx.Provider>;
}
