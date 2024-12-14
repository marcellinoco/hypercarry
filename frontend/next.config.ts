import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
};

export default nextConfig;
