export type BrandItem = {
  name: string;
  href: string;
  logo: string;      // public path, e.g. /brands/lit.svg
  cat: "onchain" | "storage" | "wallets" | "infra";
  ariaLabel?: string;
};

export const BRANDS: BrandItem[] = [
  // On-chain
  { name: "Ethereum", href: "https://ethereum.org", logo: "/brands/ethereum.svg", cat: "onchain" },
  { name: "Base", href: "https://base.org", logo: "/brands/base.svg", cat: "onchain" },
  { name: "Avail Nexus", href: "https://www.availproject.org", logo: "/brands/avail.svg", cat: "onchain" },
  { name: "EAS", href: "https://attest.sh", logo: "/brands/eas.svg", cat: "onchain", ariaLabel: "Ethereum Attestation Service" },
  { name: "Blockscout", href: "https://blockscout.com", logo: "/brands/blockscout.svg", cat: "onchain" },

  // Storage & delivery
  { name: "Lighthouse", href: "https://lighthouse.storage", logo: "/brands/lighthouse.svg", cat: "storage" },
  { name: "Lit Protocol", href: "https://litprotocol.com", logo: "/brands/lit.svg", cat: "storage", ariaLabel: "Lit Protocol" },
  { name: "IPFS", href: "https://ipfs.tech", logo: "/brands/ipfs.svg", cat: "storage" },
  { name: "Cloudflare R2", href: "https://www.cloudflare.com/products/r2/", logo: "/brands/r2.svg", cat: "storage" },
  { name: "AWS S3", href: "https://aws.amazon.com/s3/", logo: "/brands/s3.svg", cat: "storage" },

  // Wallets & payments
  { name: "PYUSD", href: "https://www.paypal.com/pyusd", logo: "/brands/pyusd.svg", cat: "wallets" },
  { name: "MetaMask", href: "https://metamask.io", logo: "/brands/metamask.svg", cat: "wallets" },
  { name: "WalletConnect", href: "https://walletconnect.com", logo: "/brands/walletconnect.svg", cat: "wallets" },
  { name: "Coinbase Wallet", href: "https://www.coinbase.com/wallet", logo: "/brands/coinbase-wallet.svg", cat: "wallets" },

  // Infra & Dev
  { name: "Vercel", href: "https://vercel.com", logo: "/brands/vercel.svg", cat: "infra" },
  { name: "GitHub Actions", href: "https://github.com/features/actions", logo: "/brands/github-actions.svg", cat: "infra" },
  { name: "PostgreSQL", href: "https://www.postgresql.org", logo: "/brands/postgres.svg", cat: "infra" },
  { name: "Railway", href: "https://railway.app", logo: "/brands/railway.svg", cat: "infra" },
  { name: "Docker", href: "https://www.docker.com", logo: "/brands/docker.svg", cat: "infra" },
  { name: "Turborepo", href: "https://turbo.build/repo", logo: "/brands/turborepo.svg", cat: "infra" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com", logo: "/brands/tailwind.svg", cat: "infra" },
  { name: "NativeWind", href: "https://www.nativewind.dev", logo: "/brands/nativewind.svg", cat: "infra" },
  { name: "Storybook", href: "https://storybook.js.org", logo: "/brands/storybook.svg", cat: "infra" },
  { name: "Playwright", href: "https://playwright.dev", logo: "/brands/playwright.svg", cat: "infra" },
  { name: "Jest", href: "https://jestjs.io", logo: "/brands/jest.svg", cat: "infra" },
  { name: "Biome", href: "https://biomejs.dev", logo: "/brands/biome.svg", cat: "infra" },
  { name: "TypeScript", href: "https://www.typescriptlang.org", logo: "/brands/typescript.svg", cat: "infra" },
];
