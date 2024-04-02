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
    ],
  },
}

module.exports = nextConfig
