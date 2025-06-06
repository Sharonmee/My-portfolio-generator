/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    },
    output: 'standalone',
    trailingSlash: true,
    async rewrites() {
        return [
            {
                source: '/myportfolio',
                destination: '/myportfolio/',
            },
            {
                source: '/myportfolio/:username',
                destination: '/myportfolio/:username/',
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/index.html',
                permanent: true,
            },
            {
                source: '/myportfolio',
                destination: '/myportfolio/',
                permanent: true,
            },
            {
                source: '/myportfolio/:username',
                destination: '/myportfolio/:username/',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
