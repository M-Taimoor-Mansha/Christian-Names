import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/boys-names",
        destination: "/christian-boy-names",
        permanent: true,
      },
      {
        source: "/girls-names",
        destination: "/christian-girl-names",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
