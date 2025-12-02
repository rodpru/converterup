import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  poweredByHeader: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    // Turbopack ainda é experimental para produção
    // Descomente a linha abaixo para usar Turbopack em dev: `next dev --turbo`
    // turbo: {},
  },

  // Transpila a biblioteca @nutrient-sdk/viewer (funciona com Webpack E Turbopack)
  transpilePackages: ["@nutrient-sdk/viewer"],

  compiler: {
    removeConsole: false,
  },

  // Webpack config (usado em produção na Vercel)
  webpack: (config, { isServer }) => {
    // Não processa @nutrient-sdk/viewer no servidor (é client-only)
    if (isServer) {
      config.externals = [...(config.externals || []), "@nutrient-sdk/viewer"];
    }

    // Resolve fallbacks para módulos Node.js não disponíveis no browser
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        path: false,
      },
    };

    return config;
  },
};

export default nextConfig;
