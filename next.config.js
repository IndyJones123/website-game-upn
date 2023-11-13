/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "server.sinarpadu.com"],
        unoptimized: true,
    },
    reactStrictMode: true,
    output: "export",
    trailingSlash: true,
};

module.exports = nextConfig;
