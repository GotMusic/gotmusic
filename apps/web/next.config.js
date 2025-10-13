/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gotmusic/api", "@gotmusic/fixtures", "@gotmusic/tokens", "@gotmusic/ui"],
};

export default nextConfig;
