import type { NextConfig } from "next";

const isVercelBuild = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  // Next 16.3 does not emit the trace file Vercel expects when standalone
  // output is enabled. Docker still needs the standalone bundle, while Vercel
  // uses its own output adapter, so only enable it outside Vercel builds.
  ...(isVercelBuild ? {} : { output: "standalone" }),
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
