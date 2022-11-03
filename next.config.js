/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.ctfassets.net',
    ],
  },
  eslint: {
    dirs: ['pages', 'src/components', 'src/types'],
  },
}

module.exports = nextConfig
