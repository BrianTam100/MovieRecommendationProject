/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;


module.exports = {
  images: {
    domains: ['image.tmdb.org'], // Add image.tmdb.org to the list of allowed domains
  },
};
