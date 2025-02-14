/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional: ensures strict mode for React
    images: {
      remotePatterns: [
        {
          protocol: "https", // Allows only secure URLs
          hostname: "**", // Allows images from any domain
        },],
      domains: ['gizmodo.com',"img.clerk.com",],  // Add any domains that you want to allow images from
    },
  };
  
  export default nextConfig;
  