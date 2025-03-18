import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  bundlePagesRouterDependencies: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "assets.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
