import { Suspense } from "react";
import { AdminAssetsTable } from "@/app/studio/AdminAssetsTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminAssetsPage() {
  return (
    <Suspense fallback={
      <main id="main-content" className="min-h-dvh p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Assets</h1>
            <p className="mt-1 text-fg/70">Admin asset management</p>
          </div>
        </div>
        <div className="mt-6 h-64 glass-neumorphic rounded-lg animate-pulse">
          <div className="p-4 space-y-3">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-3 bg-white/15 rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/20 rounded-full w-16"></div>
              <div className="h-6 bg-white/20 rounded-full w-12"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <AdminAssetsTable />
    </Suspense>
  );
}
