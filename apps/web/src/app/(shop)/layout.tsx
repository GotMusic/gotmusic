import Link from "next/link";
import WalletButton from "@/components/WalletButton";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
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
            <WalletButton />
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4">{children}</main>
      <footer className="mx-auto max-w-6xl p-4 text-sm text-fg/60 border-t border-fg/10">
        <p>© 2025 GotMusic • ETHOnline 2025</p>
      </footer>
    </div>
  );
}
