import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Standalone static HTML projects served from /public under a clean URL.
    return [{ source: "/piyan", destination: "/piyan.html" }];
  },
};

export default nextConfig;
