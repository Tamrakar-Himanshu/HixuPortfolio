import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  compiler: {
    // Remove console logs only in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@headlessui/react",
      "framer-motion",
      "lodash",
    ],
  },

  output: "standalone",
};

export default nextConfig;
