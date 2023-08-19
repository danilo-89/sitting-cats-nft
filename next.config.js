/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
                port: '',
            },
        ],
    },
}

module.exports = nextConfig
