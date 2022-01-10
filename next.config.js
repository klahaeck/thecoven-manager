module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://community.thecoven.com/feed',
        permanent: false,
      },
    ]
  },
}
