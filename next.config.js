/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')
const nextConfig = {
    async headers() {
        return [
          {
            // matching all API routes
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ];
      },
      reactStrictMode: true, 
      swcMinify: true,
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
            port: '',
            pathname: '/uQZ29Pu.png',
          },
          {
            protocol: 'https',
            hostname: 'd2aaddunp29031.cloudfront.net',
            port: '',
            pathname: '/feature_metrics-0.png',
          },
          {
            protocol: 'https',
            hostname: 'd2aaddunp29031.cloudfront.net',
            port: '',
            pathname: '/feature_monitoring-0.png',
          },
          {
            protocol: 'https',
            hostname: 'd2aaddunp29031.cloudfront.net',
            port: '',
            pathname: '/feature_analysis-0.png',
          },
          {
            protocol: 'https',
            hostname: 'd2aaddunp29031.cloudfront.net',
            port: '',
            pathname: '/og.jpg',
          }
        ],
      },
}

module.exports = withContentlayer(nextConfig)


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "self-employee-f2c9f9702",
    project: "llm-feedback-monitor",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
