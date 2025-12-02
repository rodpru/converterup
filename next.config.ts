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
  transpilePackages: ["@nutrient-sdk/viewer"],
  compiler: {
    removeConsole: false,
  },

  // Configure SWC to use modern JS target
  swcMinify: true,

  // Webpack configuration for better transpilation
  webpack: (config, { isServer }) => {
    // Don't transpile @nutrient-sdk/viewer on server since it's client-only
    if (isServer) {
      config.externals = [...(config.externals || []), "@nutrient-sdk/viewer"];
    }

    // Ensure proper module resolution
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
