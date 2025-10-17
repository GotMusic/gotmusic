"use client";

import { createContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "high-contrast";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "gotmusic-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const contrastQuery = window.matchMedia("(prefers-contrast: more)");

  if (contrastQuery.matches) return "high-contrast";
  return darkQuery.matches ? "dark" : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light" || stored === "high-contrast") {
      return stored;
    }
  } catch {
    // localStorage access might be blocked
  }

  return null;
}

function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage access might be blocked
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  const [systemTheme, setSystemTheme] = useState<Theme>(() => getSystemTheme());
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme();
    return stored ?? defaultTheme;
  });

  // Listen for system theme changes
  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const contrastQuery = window.matchMedia("(prefers-contrast: more)");

    const handleChange = () => {
      const newSystemTheme = getSystemTheme();
      setSystemTheme(newSystemTheme);
    };

    darkQuery.addEventListener("change", handleChange);
    contrastQuery.addEventListener("change", handleChange);

    return () => {
      darkQuery.removeEventListener("change", handleChange);
      contrastQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("dark", "light", "high-contrast");
    root.classList.add(theme);

    // Set data attribute for CSS
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

// Re-export React for the hook
import * as React from "react";
