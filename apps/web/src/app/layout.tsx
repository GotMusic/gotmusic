import { SkipLink } from "@/components/SkipLink";
import { QueryProvider } from "@/providers/QueryProvider";
import { UIProviders } from "@/providers/UIProviders";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "GotMusic - Music NFT Marketplace",
  description:
    "Discover, buy, and sell music assets as NFTs on Ethereum. Powered by decentralized storage and attestations.",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SkipLink />
        <QueryProvider>
          <UIProviders>{children}</UIProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
