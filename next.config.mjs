/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverComponents: true, // Habilita Server Components (se estiver usando Next.js 13+)
  },
  api: {
    bodyParser: true, // Garante que o body parser esteja habilitado para suas APIs
  },
};

export default nextConfig;
