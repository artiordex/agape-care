/**
 * Description : next.config.mjs - 📌 Admin 앱 Next.js 설정 (Docker / Cloud Run 배포용)
 * Author : Shiwoo Min
 * Date : 2026-01-22
 */
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  transpilePackages: [
    '@agape-care/ui',
    '@agape-care/client'
  ],

  webpack: (config) => {
    const distBase = path.resolve(__dirname, '../../dist/packages');

    config.resolve.alias = {
      ...config.resolve.alias,
      '@agape-care/ui': path.join(distBase, 'ui'),
      '@agape-care/client': path.join(distBase, 'client'),
      '@agape-care/core': path.join(distBase, 'core'),
      '@agape-care/configs': path.join(distBase, 'configs'),
      '@agape-care/logger': path.join(distBase, 'logger'),
      '@agape-care/api-contract': path.join(distBase, 'api-contract')
    };

    return config;
  },

  reactStrictMode: false,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ]
  },

  async rewrites() {
    const rules = [];

    if (process.env.NODE_ENV === 'development') {
      rules.push({
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:8000'}/api/:path*`
      });
    }

    return rules;
  },

  outputFileTracingRoot: path.resolve(__dirname, '../../'),

  compress: true,
  poweredByHeader: false,

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true }
};

export default nextConfig;
