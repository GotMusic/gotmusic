"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Card, CardContent, Button, Input } from "@gotmusic/ui";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/catalog?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <Card variant="music" size="xl" className="relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,color-mix(in_oklch,var(--color-brand-accent)_20%,transparent),transparent_60%)]"
        aria-hidden="true"
      />

      <CardContent className="relative z-10 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg-default">
          Sounds that ship.
        </h1>
        <p className="mt-3 text-lg text-fg-muted">
          Producer-grade samples, stems, and presets. Private delivery + verifiable licenses.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          aria-label="Search catalog"
        >
          <Input
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by genre, mood, BPM, key…"
            className="flex-1"
            aria-label="Search for music assets by genre, mood, BPM, or key"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            aria-label="Browse catalog"
          >
            Browse
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-fg-muted">
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Encrypted previews
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            EAS receipts
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            PYUSD via Nexus
          </span>
        </div>

        {/* Prefetch catalog route for instant navigation */}
        <Link href="/catalog" prefetch={true} className="hidden" aria-hidden="true" tabIndex={-1}>
          Catalog
        </Link>
      </CardContent>
    </Card>
  );
}
