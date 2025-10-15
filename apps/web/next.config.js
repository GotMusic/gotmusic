/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gotmusic/api", "@gotmusic/fixtures", "@gotmusic/tokens", "@gotmusic/ui"],
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    // Ensure workspace packages are resolved correctly
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
