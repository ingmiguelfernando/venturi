/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "s3.amazonaws.com",
      "www.aviationbusinessnews.com",
      "aviationweek.com",
      "marvel-b1-cdn.bc0a.com",
    ],
  },
};
module.exports = nextConfig;
