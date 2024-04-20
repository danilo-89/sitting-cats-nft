/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
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
