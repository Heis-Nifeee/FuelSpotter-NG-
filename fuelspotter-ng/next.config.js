/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Avoid child_process spawn on Windows environments that block it.
    workerThreads: true,
    // Keep worker count minimal to reduce resource/permission issues.
    cpus: 1,
  },
}

module.exports = nextConfig
