import Link from "next/link";
import { StudioAssetsList } from "./StudioAssetsList";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function StudioAssetsPage() {
  return (
    <main
      id="main-content"
      className="mx-auto max-w-5xl px-6 py-10"
      data-testid="studio-assets-page"
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-fg/50">Studio</p>
          <h1 className="mt-2 text-3xl font-semibold text-fg">My Assets</h1>
          <p className="mt-2 max-w-xl text-sm text-fg/70">
            Review the tracks you’ve uploaded, check their status, and jump into detailed editing when you’re
            ready. This view keeps everything in one place for quick management.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Link
            href="/admin"
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-fg hover:bg-white/5"
          >
            Open admin table
          </Link>
          <Link
            href="/studio/uploads"
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-bg shadow-sm hover:opacity-95"
          >
            Upload new asset
          </Link>
        </div>
      </header>

      <StudioAssetsList />
    </main>
  );
}
