/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Sanity's CDN domain
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
