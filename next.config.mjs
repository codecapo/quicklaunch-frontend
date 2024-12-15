/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dd.dexscreener.com'], // Add dexscreener domain
    },
    transpilePackages: [
        '@solana/wallet-adapter-base',
        '@solana/wallet-adapter-react',
        '@solana/wallet-adapter-react-ui',
        '@solana/wallet-adapter-wallets',
    ],
};

export default nextConfig;
