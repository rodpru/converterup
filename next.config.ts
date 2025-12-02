import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  poweredByHeader: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },

  // Transpila a biblioteca @nutrient-sdk/viewer (funciona com Webpack E Turbopack)
  transpilePackages: ["@nutrient-sdk/viewer"],

  compiler: {
    removeConsole: false,
  },

  // Turbopack config (padrão no Next.js 16)
  // Configuração vazia aceita o uso do Turbopack com as configurações padrão
  turbopack: {},
};

export default nextConfig;
