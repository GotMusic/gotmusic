/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gotmusic/fixtures", "@gotmusic/tokens", "@gotmusic/ui"],
  experimental: {
    externalDir: true,
  },
  compiler: {
    // Remove console.log from production builds (keep warn/error)
    removeConsole: { exclude: ["error", "warn"] },
  },
  outputFileTracingRoot: process.cwd(),
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      // Route-group safety rewrites: NEVER ship long-term, but unblocks CI.
      { source: "/(shop)", destination: "/shop" },
      { source: "/(shop)/(.*)", destination: "/shop/$1" },
      { source: "/(studio)", destination: "/studio" },
      { source: "/(studio)/(.*)", destination: "/studio/$1" },
      { source: "/(admin)", destination: "/admin" },
      { source: "/(admin)/(.*)", destination: "/admin/$1" },
    ];
  },
};

export default nextConfig;
