import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure compiler to handle Emotion
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
