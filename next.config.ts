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

  async headers() {
    // Only apply COEP/COOP in production — dev turbopack is incompatible
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        source: "/dashboard",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
