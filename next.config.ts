import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    AUTH_USERNAME: process.env.AUTH_USERNAME,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD,
    ADMIN_ACCESS_KEY_ID: process.env.ADMIN_ACCESS_KEY_ID,
    ADMIN_SECRET_ACCESS_KEY: process.env.ADMIN_SECRET_ACCESS_KEY,
    BLOG_REGION: process.env.BLOG_REGION,
    BLOG_POST_TABLE: process.env.BLOG_POST_TABLE,
    BLOG_TAG_TABLE: process.env.BLOG_TAG_TABLE,
    BLOG_POST_TAG_TABLE: process.env.BLOG_POST_TAG_TABLE,
  },
};

export default nextConfig;
