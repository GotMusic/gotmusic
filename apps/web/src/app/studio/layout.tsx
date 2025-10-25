import Link from "next/link";
import WalletButton from "@/components/WalletButton";
import { StudioSidebar } from "@/components/Studio/StudioSidebar";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      {/* Top header */}
      <header className="sticky top-0 z-20 border-b border-border-subtle bg-bg/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-semibold text-fg">
            GotMusic
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              className="text-fg-muted hover:text-fg transition-colors" 
              href="/catalog"
            >
              Catalog
            </Link>
            <Link 
              className="text-fg-muted hover:text-fg transition-colors" 
              href="/attestations"
            >
              Attestations
            </Link>
            <WalletButton />
          </div>
        </nav>
      </header>

      {/* Main content with sidebar */}
      <div className="flex h-[calc(100vh-73px)]">
        <StudioSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
