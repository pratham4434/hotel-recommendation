/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com','images.pexels.com'], // ✅ Add this line
  },
};

module.exports = nextConfig;
