/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "localhost:3000",
      "sd.nqrt.ai",
      "dev.nqrt.ai",
      "nqrt.ai",
      "s.gravatar.com",
      "lh3.googleusercontent.com",
      "image1.cdn.seaart.ai",
      "image5.cdn.seaart.ai",
      "image6.cdn.seaart.ai",
      "image8.cdn.seaart.ai",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${
          process.env.IMAGE_BASE_URL || "https://dev.nqrt.ai"
        }/media/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
