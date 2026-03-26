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
    return [
      {
        // SharedArrayBuffer headers required for FFmpeg.wasm (multi-threaded)
        // Applied only to dashboard to avoid breaking auth/analytics
        source: "/dashboard/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
