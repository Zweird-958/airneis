/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["umzug"],
  },
}

module.exports = nextConfig
