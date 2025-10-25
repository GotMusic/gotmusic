/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gotmusic/fixtures", "@gotmusic/tokens", "@gotmusic/ui"],
  compiler: {
    // Remove console.log from production builds (keep warn/error)
    removeConsole: { exclude: ["error", "warn"] },
  },
  // Turbopack configuration for Next.js 16
  turbopack: {},
  images: {
    // Enable image optimization with remotePatterns (Next.js 16)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Temporarily disable custom loader for testing
    // loader: 'custom',
    // loaderFile: './src/lib/image-loader.js',
  },
  // Fix workspace detection for middleware
  // outputFileTracingRoot: "/Users/grantedwards/Desktop/GotMusic",
  // No redirects() block — legacy routes are gone
};

export default nextConfig;
