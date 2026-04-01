import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

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
export default withNextIntl(nextConfig);
