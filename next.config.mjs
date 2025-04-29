/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // use true if it's a permanent redirect
      },
    ];
  },
};

export default nextConfig;
