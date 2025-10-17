import Link from "next/link";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-bg text-fg">
      {/* Sidebar */}
      <aside className="w-64 border-r border-fg/10 bg-bg p-4">
        <div className="mb-6">
          <Link href="/catalog" className="text-xl font-semibold">
            GotMusic
          </Link>
          <p className="text-xs text-fg/60">Studio</p>
        </div>

        <nav className="space-y-1">
          <Link
            href="/studio/assets"
            className="block rounded-md px-3 py-2 text-fg/90 hover:bg-fg/5"
          >
            📦 Assets
          </Link>
          <Link
            href="/studio/uploads"
            className="block rounded-md px-3 py-2 text-fg/90 hover:bg-fg/5"
          >
            ⬆️ Uploads
          </Link>
          <Link
            href="/studio/sales"
            className="block rounded-md px-3 py-2 text-fg/90 hover:bg-fg/5"
          >
            💰 Sales
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
