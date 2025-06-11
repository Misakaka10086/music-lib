// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    // unoptimized: true, // Keep as false (default) or commented out for optimization
  },
  // Add other Next.js configurations here (e.g., experimental from before if needed)
  // experimental: {
  //   turbo: {
  //     rules: {
  //       "*.md": ["raw-loader"],
  //       "*.mdx": {
  //         loaders: ["@mdx-js/loader"],
  //         as: "*.js",
  //       },
  //     },
  //   },
  // },
};

// Only require and use bundle analyzer if ANALYZE is true
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true, // enabled is true because the outer if already checks ANALYZE
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
