// import type { NextConfig } from "next"; // CommonJS module, so use require for NextConfig if needed or just define directly

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    // unoptimized: true // Set to false or remove to enable optimization
  },
  // experimental: {
  //   turbo: {
  //     rules: {
  //       // Option 1: Keep existing loaders and resolve React issues.
  //       "*.md": ["raw-loader"],
  //       // Option 2: Ignore files causing conflicts.
  //       "*.mdx": {
  //         loaders: ["@mdx-js/loader"],
  //         as: "*.js",
  //       },
  //     },
  //   },
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
