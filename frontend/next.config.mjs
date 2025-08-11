/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Use BACKEND_URL in prod; fall back to local dev if not set
    const target = process.env.BACKEND_URL || "http://127.0.0.1:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${target}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
