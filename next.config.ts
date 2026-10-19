import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // `next dev` otherwise writes an AGENTS.md into the repo root whenever it detects an AI
  // coding agent (next/dist/server/lib/start-server.js), leaving the working tree dirty.
  // Documented option in next/dist/server/config-shared.d.ts; default true.
  agentRules: false,
};

export default nextConfig;
