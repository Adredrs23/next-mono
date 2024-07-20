/** @type {import('next').NextConfig} */
const nextConfig = {
	// images: {
	// 	domains: ['https://picsum.photos'],
	// 	remotePatterns: [
	// 		{
	// 			protocol: 'https',
	// 			hostname: 'picsum.photos',
	// 			port: '',
	// 			pathname: '/**',
	// 		},
	// 	],
	// 	formats: ['image/avif', 'image/webp'],
	// }, 
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
