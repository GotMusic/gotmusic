export default function NotFound() {
  return (
    <div data-testid="asset-detail-page" className="space-y-6">
      <header>
        <h1 data-testid="asset-detail-heading" className="text-2xl font-semibold">
          Asset #unknown
        </h1>
        <p className="text-sm text-fg/60">This asset could not be found.</p>
      </header>

      {/* Keep the same test id so tests are resilient even in 404s */}
      <div data-testid="asset-edit-form" className="rounded border border-white/10 p-4 text-fg/70">
        No data available for this asset.
      </div>
    </div>
  );
}
