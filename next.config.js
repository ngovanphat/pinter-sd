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
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
