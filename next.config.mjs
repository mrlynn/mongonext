/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  // Disable Babel
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
