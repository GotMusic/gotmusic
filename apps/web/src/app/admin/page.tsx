import { Suspense } from "react";
import { AdminAssetsTable } from "./AdminAssetsTable";

export default function AdminAssetsIndex() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AdminAssetsTable />
    </Suspense>
  );
}

function LoadingSkeleton() {
  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold">Assets</h1>
      <p className="mt-1 text-fg/70">Admin asset management</p>

      {/* Loading skeleton */}
      <div className="mt-6 space-y-3">
        <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
        <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
        <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
        <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
        <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
      </div>
    </main>
  );
}
