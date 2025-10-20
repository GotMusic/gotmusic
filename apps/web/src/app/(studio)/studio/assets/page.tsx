
import { Button } from "@gotmusic/ui";
import { Suspense } from "react";
import Link from "next/link";
import { AssetsPanel } from "./AssetsPanel";

export default function Page() {
  return (
    <div data-testid="studio-assets-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Assets</h1>
        <Button asChild>
          <Link href="/studio/uploads">Upload Track</Link>
        </Button>
      </div>

      <Suspense fallback={<AssetsSkeleton />}>
        <AssetsPanel />
      </Suspense>
    </div>
  );
}

function AssetsSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-24 rounded-md animate-pulse bg-fg/5" />
      ))}
    </div>
  );
}
