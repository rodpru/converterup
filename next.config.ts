import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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
    const baseHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];

    // Cross-origin isolation enables ffmpeg.wasm multi-threading via SharedArrayBuffer.
    // Scoped to tool/dashboard routes only — AdSense and YouTube embeds on landing/blog
    // require cross-origin iframes that COEP would block.
    const isolationHeaders = [
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
    ];

    return [
      { source: "/(.*)", headers: baseHeaders },
      { source: "/:locale/tools/:path*", headers: isolationHeaders },
      { source: "/:locale/dashboard/:path*", headers: isolationHeaders },
    ];
  },
};
export default withNextIntl(nextConfig);
