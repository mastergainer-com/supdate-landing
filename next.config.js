/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://app.sup.date/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
