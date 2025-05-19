/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // ⛔ 跳过 ESLint 报错，不再阻止构建
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig