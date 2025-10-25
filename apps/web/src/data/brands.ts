export type BrandItem = {
  name: string;
  href: string;
  logo: string; // public path, e.g. /brands/lit.svg
  cat: "onchain" | "storage" | "wallets" | "infra" | "performance";
  ariaLabel?: string;
};

export const BRANDS: BrandItem[] = [
  // On-chain
  { name: "Ethereum", href: "https://ethereum.org", logo: "/brands/ethereum.svg", cat: "onchain" },
  { name: "Base", href: "https://base.org", logo: "/brands/base.svg", cat: "onchain" },
  {
    name: "Avail Nexus",
    href: "https://www.availproject.org",
    logo: "/brands/avail.svg",
    cat: "onchain",
  },
  {
    name: "EAS",
    href: "https://attest.sh",
    logo: "/brands/eas.svg",
    cat: "onchain",
    ariaLabel: "Ethereum Attestation Service",
  },
  {
    name: "Blockscout",
    href: "https://blockscout.com",
    logo: "/brands/blockscout.svg",
    cat: "onchain",
  },

  // Storage & delivery
  {
    name: "Lighthouse",
    href: "https://lighthouse.storage",
    logo: "/brands/lighthouse.svg",
    cat: "storage",
  },
  {
    name: "Lit Protocol",
    href: "https://litprotocol.com",
    logo: "/brands/lit.svg",
    cat: "storage",
    ariaLabel: "Lit Protocol",
  },
  { name: "IPFS", href: "https://ipfs.tech", logo: "/brands/ipfs.svg", cat: "storage" },
  {
    name: "UploadThing",
    href: "https://uploadthing.com",
    logo: "/brands/uploadthing.svg",
    cat: "storage",
    ariaLabel: "UploadThing File Upload Service",
  },

  // Wallets & payments
  {
    name: "PYUSD",
    href: "https://www.paypal.com/pyusd",
    logo: "/brands/pyusd.svg",
    cat: "wallets",
  },
  { name: "MetaMask", href: "https://metamask.io", logo: "/brands/metamask.svg", cat: "wallets" },
  {
    name: "WalletConnect",
    href: "https://walletconnect.com",
    logo: "/brands/walletconnect.svg",
    cat: "wallets",
  },
  {
    name: "Coinbase Wallet",
    href: "https://www.coinbase.com/wallet",
    logo: "/brands/coinbase-wallet.svg",
    cat: "wallets",
  },
  {
    name: "Privy",
    href: "https://privy.io",
    logo: "/brands/privy.svg",
    cat: "wallets",
    ariaLabel: "Privy Embedded Wallets",
  },

  // Infra & Dev
  { name: "Vercel", href: "https://vercel.com", logo: "/brands/vercel.svg", cat: "infra" },
  {
    name: "GitHub Actions",
    href: "https://github.com/features/actions",
    logo: "/brands/github-actions.svg",
    cat: "infra",
  },
  {
    name: "PostgreSQL",
    href: "https://www.postgresql.org",
    logo: "/brands/postgres.svg",
    cat: "infra",
  },
  { name: "Docker", href: "https://www.docker.com", logo: "/brands/docker.svg", cat: "infra" },
  {
    name: "Next.js",
    href: "https://nextjs.org",
    logo: "/brands/nextjs.svg",
    cat: "infra",
  },
  {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com",
    logo: "/brands/tailwind.svg",
    cat: "infra",
  },
  {
    name: "NativeWind",
    href: "https://www.nativewind.dev",
    logo: "/brands/nativewind.svg",
    cat: "infra",
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org",
    logo: "/brands/typescript.svg",
    cat: "infra",
  },
  {
    name: "e18e",
    href: "https://e18e.dev",
    logo: "/brands/e18e.svg",
    cat: "infra",
    ariaLabel: "Ecosystem Performance Standards",
  },
  {
    name: "Vite",
    href: "https://vitejs.dev",
    logo: "/brands/vite.svg",
    cat: "infra",
  },

  // Performance & Monitoring
  {
    name: "Playwright",
    href: "https://playwright.dev",
    logo: "/brands/playwright.svg",
    cat: "performance",
  },
  {
    name: "Jest",
    href: "https://jestjs.io",
    logo: "/brands/jest.svg",
    cat: "performance",
  },
  {
    name: "Biome",
    href: "https://biomejs.dev",
    logo: "/brands/biome.svg",
    cat: "performance",
  },
];
