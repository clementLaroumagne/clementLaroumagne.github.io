import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/clementine',
  assetPrefix: '/clementine/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
