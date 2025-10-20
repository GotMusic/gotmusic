export default function Loading() {
  return (
    <div data-testid="studio-assets-page" className="space-y-4">
      <h1 className="text-2xl font-semibold">My Assets</h1>
      <div className="grid gap-4">
        {Array.from({ length: 3 }, () => (
          <div key={crypto.randomUUID()} className="h-24 rounded-md animate-pulse bg-fg/5" />
        ))}
      </div>
    </div>
  );
}
