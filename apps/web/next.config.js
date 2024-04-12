/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["umzug"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ikea.com",
        port: "",
      },
      {
        protocol: process.env.S3_PROTOCOL,
        hostname: process.env.S3_HOST,
        port: process.env.S3_PORT,
      },
    ],
  },
}

module.exports = nextConfig
