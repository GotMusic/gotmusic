/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gotmusic/api", "@gotmusic/fixtures", "@gotmusic/tokens", "@gotmusic/ui"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
