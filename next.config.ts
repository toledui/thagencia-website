import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.thagencia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/blog/:slug*",
        destination: "/:slug*",
        permanent: true, // 301 redirect para SEO
      },
    ];
  },
};

export default nextConfig;
