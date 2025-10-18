"use client";

import { ThemeProvider } from "@gotmusic/ui";

export function UIProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
