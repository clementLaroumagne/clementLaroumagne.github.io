import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/clementine', // chemin du sous-dossier
  assetPrefix: '/clementine/', // pour que les assets fonctionnent depuis /clementine
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
