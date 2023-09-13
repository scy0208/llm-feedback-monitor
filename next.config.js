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
      async redirects() {
        return [
          {
            source: "/docs",
            destination: "/docs/get-start-with-python-sdk",
            permanent: true,
          },
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
          }
        ],
      },
}

module.exports = withContentlayer(nextConfig)
