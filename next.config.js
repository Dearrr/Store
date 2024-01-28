/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  /* output: "export", */
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      layers: true,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
