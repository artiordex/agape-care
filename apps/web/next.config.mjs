/**
 * Description : next.config.mjs - 📌 Web 앱 Next.js 설정
 * Author : Shiwoo Min
 * Date : 2026-01-27
 */

import { withNx } from '@nx/next';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 배포 환경 감지
const IS_FIREBASE = process.env.FIREBASE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  output: IS_FIREBASE ? 'export' : 'standalone',

  images: {
    unoptimized: IS_FIREBASE,
    domains: ['localhost', 'your-domain.com', 'api.dicebear.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [{ source: '/ui/:path*', destination: '/_next/static/ui/:path*' }];
  },

  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

// 핵심: Nx 래퍼 적용
export default withNx(nextConfig);
