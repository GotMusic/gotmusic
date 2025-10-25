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
  outputFileTracingRoot: "/Users/grantedwards/Desktop/GotMusic",
  // No redirects() block — legacy routes are gone
};

export default nextConfig;
