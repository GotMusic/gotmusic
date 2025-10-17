"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type React from "react";

type Politeness = "polite" | "assertive";

interface Announcement {
  id: string;
  message: string;
  politeness: Politeness;
}

interface AnnouncerContextValue {
  announce: (message: string, politeness?: Politeness) => void;
}

const AnnouncerContext = createContext<AnnouncerContextValue | undefined>(undefined);

interface AnnouncerProviderProps {
  children: React.ReactNode;
}

/**
 * AnnouncerProvider - Manages live region announcements
 *
 * Provides a singleton announcer for programmatic screen reader announcements.
 * Must be placed near the root of your app.
 *
 * @example
 * <AnnouncerProvider>
 *   <App />
 * </AnnouncerProvider>
 */
export function AnnouncerProvider({ children }: AnnouncerProviderProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const announce = useCallback((message: string, politeness: Politeness = "polite") => {
    const id = Math.random().toString(36).slice(2, 11);
    const announcement: Announcement = { id, message, politeness };

    setAnnouncements((prev) => [...prev, announcement]);

    // Clear announcement after it's been read
    // Screen readers typically read within 1-2 seconds
    setTimeout(() => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, 5000);
  }, []);

  return (
    <AnnouncerContext.Provider value={{ announce }}>
      {children}
      <LiveRegion announcements={announcements} />
    </AnnouncerContext.Provider>
  );
}

interface LiveRegionProps {
  announcements: Announcement[];
}

function LiveRegion({ announcements }: LiveRegionProps) {
  // Separate announcements by politeness level
  const politeMessages = announcements.filter((a) => a.politeness === "polite");
  const assertiveMessages = announcements.filter((a) => a.politeness === "assertive");

  return (
    <>
      {/* Polite announcements - don't interrupt */}
      {/* biome-ignore lint/a11y/useSemanticElements: Live regions require div with role for proper screen reader support */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {politeMessages.map((announcement) => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>

      {/* Assertive announcements - interrupt current speech */}
      {/* biome-ignore lint/a11y/useSemanticElements: Live regions require div with role for proper screen reader support */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {assertiveMessages.map((announcement) => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>
    </>
  );
}

/**
 * useAnnouncer - Hook for programmatic announcements
 *
 * @example
 * const { announce } = useAnnouncer();
 *
 * // Polite announcement (doesn't interrupt)
 * announce("Loading complete");
 *
 * // Assertive announcement (interrupts)
 * announce("Error: Invalid input", "assertive");
 */
export function useAnnouncer() {
  const context = useContext(AnnouncerContext);

  if (context === undefined) {
    throw new Error("useAnnouncer must be used within an AnnouncerProvider");
  }

  return context;
}

interface AnnouncerProps {
  /**
   * Message to announce
   */
  message: string;
  /**
   * Politeness level
   * - "polite": Announce when user is idle (default)
   * - "assertive": Interrupt current speech
   */
  politeness?: Politeness;
  /**
   * Clear announcement after this duration (ms)
   * Default: 5000ms
   */
  clearAfter?: number;
}

/**
 * Announcer - Declarative live region announcement
 *
 * @example
 * // Polite announcement
 * <Announcer message="Loading complete" />
 *
 * @example
 * // Assertive announcement
 * <Announcer message="Error occurred!" politeness="assertive" />
 *
 * @example
 * // Custom clear duration
 * <Announcer message="Saved" clearAfter={3000} />
 */
export function Announcer({ message, politeness = "polite", clearAfter = 5000 }: AnnouncerProps) {
  const { announce } = useAnnouncer();

  useEffect(() => {
    if (message) {
      announce(message, politeness);
    }
  }, [message, politeness, announce]);

  return null;
}

export type { Politeness, AnnouncerProps };
