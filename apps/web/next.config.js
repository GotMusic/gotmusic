/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gotmusic/fixtures", "@gotmusic/tokens", "@gotmusic/ui"],
  compiler: {
    // Remove console.log from production builds (keep warn/error)
    removeConsole: { exclude: ["error", "warn"] },
  },
  images: {
    unoptimized: true,
  },
  // Fix workspace detection for middleware
  outputFileTracingRoot: new URL("../../", import.meta.url).pathname,
  // No redirects() block — legacy routes are gone
};

export default nextConfig;
