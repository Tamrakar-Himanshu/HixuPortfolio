import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Performance improvement in dev
  transpilePackages: ["three"],

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@headlessui/react",
      "framer-motion",
      "lodash",
      "three",
      "@react-three/drei",
      "@react-three/fiber",
    ],
  },

  output: "standalone",
};


export default nextConfig;
