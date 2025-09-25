import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ELEVENLABS_AGENT_ID: process.env.ELEVENLABS_AI_MENTOR_API_KEY,
  },
};

export default nextConfig;
