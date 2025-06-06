/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    },
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/index.html',
            },
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
                source: '/portfolio',
                destination: '/myportfolio',
                permanent: true,
            },
            {
                source: '/portfolio/:username',
                destination: '/myportfolio/:username',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
