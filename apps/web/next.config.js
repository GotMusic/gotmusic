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
  output: "standalone", // ensures .next/standalone exists
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Legacy superadmin routes → Console
      {
        source: "/superadmin/:path*",
        destination: "/console/:path*",
        permanent: true, // 308 redirect
      },
    ];
  },
};

export default nextConfig;
