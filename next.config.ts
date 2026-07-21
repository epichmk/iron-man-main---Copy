import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network IP to load Javascript chunks for mobile testing
  allowedDevOrigins: ['192.168.0.2', '192.168.0.169'],
  images: {
    qualities: [75, 90, 95, 100], // Fixes the Next.js unconfigured qualities warnings
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
