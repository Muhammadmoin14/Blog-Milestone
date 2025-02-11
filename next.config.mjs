/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional: ensures strict mode for React
    images: {
      domains: ['gizmodo.com',"img.clerk.com",],  // Add any domains that you want to allow images from
    },
  };
  
  export default nextConfig;
  