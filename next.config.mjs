/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Babel
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
