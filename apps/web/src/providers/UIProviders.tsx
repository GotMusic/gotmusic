"use client";

import { ThemeProvider, ToastProvider } from "@gotmusic/ui";

export function UIProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
