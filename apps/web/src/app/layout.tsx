import { SkipLink } from "@/components/SkipLink";
import { QueryProvider } from "@/providers/QueryProvider";
import { UIProviders } from "@/providers/UIProviders";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "GotMusic - Music NFT Marketplace",
  description:
    "Discover, buy, and sell music assets as NFTs on Ethereum. Powered by decentralized storage and attestations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SkipLink />
        <QueryProvider>
          <UIProviders>
            {children}
          </UIProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
