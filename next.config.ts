import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    AUTH_USERNAME: process.env.AUTH_USERNAME,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  },
};

export default nextConfig;
