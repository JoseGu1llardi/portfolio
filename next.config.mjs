/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.56.1", "10.102.57.182", "172.29.208.1", "172.17.224.1"],
}

export default nextConfig
