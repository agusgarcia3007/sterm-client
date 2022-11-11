/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
};

module.exports = nextConfig;
