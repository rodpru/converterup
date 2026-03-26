import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },

  compiler: {
    removeConsole: false,
  },

  turbopack: {},
};

export default nextConfig;
