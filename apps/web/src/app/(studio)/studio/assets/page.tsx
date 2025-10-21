import Link from "next/link";
import { Suspense } from "react";
import { AssetsPanel } from "./AssetsPanel";

export default function Page() {
  return (
    <div data-testid="studio-assets-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Assets</h1>
        <Link
          href="/studio/uploads"
          className="inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:opacity-50 disabled:pointer-events-none h-10 px-4 text-base bg-brand-primary text-bg hover:opacity-95"
        >
          Upload Track
        </Link>
      </div>

      <Suspense fallback={<AssetsSkeleton />}>
        <AssetsPanel />
      </Suspense>
    </div>
  );
}

function AssetsSkeleton() {
  const SKELETON_KEYS = ["s1", "s2", "s3"] as const;

  return (
    <div className="grid gap-4">
      {SKELETON_KEYS.map((k) => (
        <div key={k} className="h-24 rounded-md animate-pulse bg-fg/5" />
      ))}
    </div>
  );
}
