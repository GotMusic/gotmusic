export default function Loading() {
  // fixed, stable keys (order never changes)
  const SKELETON_KEYS = ["s1", "s2", "s3"] as const;

  return (
    <div data-testid="studio-assets-page" className="space-y-4">
      <h1 className="text-2xl font-semibold">My Assets</h1>
      <div className="grid gap-4">
        {SKELETON_KEYS.map((k) => (
          <div key={k} className="h-24 rounded-md animate-pulse bg-fg/5" />
        ))}
      </div>
    </div>
  );
}
