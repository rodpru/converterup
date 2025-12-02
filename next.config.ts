import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  transpilePackages: ['@nutrient-sdk/viewer'],
  compiler: {
    removeConsole: false,
  },
  turbopack: {},
};

export default nextConfig;
