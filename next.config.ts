import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les anciennes pages d'expertise sont devenues des sections de l'accueil.
  async redirects() {
    return [
      { source: '/expertise/strategie', destination: '/#parcours', permanent: true },
      { source: '/expertise/production', destination: '/#first-team', permanent: true },
      { source: '/expertise/content', destination: '/#antenne', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
