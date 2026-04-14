/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/register',
        destination: 'https://app.sup.date/register',
        permanent: true,
      },
      {
        source: '/login',
        destination: 'https://app.sup.date/login',
        permanent: true,
      },
      {
        source: '/',
        destination: 'https://app.sup.date',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
