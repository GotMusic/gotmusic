import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminAssetsTable } from "./AdminAssetsTable";

export const metadata: Metadata = {
  title: "Asset Management - GotMusic Admin",
  description: "Manage music assets, view catalog, and track sales in the GotMusic admin panel.",
};

export default function AdminPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AdminAssetsTable />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <main id="main-content" className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold">Assets</h1>
      <p className="mt-1 text-fg/70">Admin asset management</p>

      <div className="mt-6 space-y-3" aria-busy="true" aria-live="polite">
        <div
          className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5"
          aria-hidden="true"
        />
        <div
          className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5"
          aria-hidden="true"
        />
        <div
          className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5"
          aria-hidden="true"
        />
        <span className="sr-only">Loading assets...</span>
      </div>
    </main>
  );
}
