import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        PASSWORD: process.env.PASSWORD,
    },
};

export default nextConfig;
