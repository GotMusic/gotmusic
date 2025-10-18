import Link from "next/link";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      {/* Main site header */}
      <header className="sticky top-0 z-10 border-b border-fg/10 bg-bg/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-3">
          <Link href="/" className="text-xl font-semibold">
            GotMusic
          </Link>
          <div className="flex items-center gap-4">
            <Link className="hover:underline" href="/catalog">
              Catalog
            </Link>
            <Link className="hover:underline" href="/studio">
              Studio
            </Link>
            <button
              type="button"
              className="rounded-md bg-brand-primary px-4 py-2 text-bg text-sm font-medium hover:bg-brand-primary/90"
            >
              Connect Wallet
            </button>
          </div>
        </nav>
      </header>

      {/* Studio layout with sidebar */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Studio Sidebar */}
        <aside className="w-64 border-r border-fg/10 bg-bg p-4">
          <div className="mb-6">
            <Link href="/studio" className="text-lg font-semibold">
              Studio
            </Link>
            <p className="text-xs text-fg/60">Producer Dashboard</p>
          </div>

          <nav className="space-y-1">
            <Link href="/studio/assets" className="block rounded-md px-3 py-2 text-fg/90 hover:bg-fg/5">
              📦 Assets
            </Link>
            <Link href="/studio/uploads" className="block rounded-md px-3 py-2 text-fg/90 hover:bg-fg/5">
              ⬆️ Uploads
            </Link>
            <Link href="/studio/sales" className="block rounded-md px-3 py-2 text-fg/90 hover:bg-fg/5">
              💰 Sales
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl p-4 text-sm text-fg/60 border-t border-fg/10">
        <p>© 2025 GotMusic • ETHOnline 2025</p>
      </footer>
    </div>
  );
}
