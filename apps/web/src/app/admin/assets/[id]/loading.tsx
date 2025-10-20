export default function Loading() {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold" data-testid="asset-detail-heading">Asset</h1>
        <p className="text-fg/70" data-testid="asset-detail-subtitle">Loading…</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-md border border-fg/10 bg-bg p-6" data-testid="asset-edit-form">
            <div className="h-40 animate-pulse bg-fg/5 rounded" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-md border border-fg/10 bg-bg p-4" data-testid="asset-actions">
            <div className="h-20 animate-pulse bg-fg/5 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
