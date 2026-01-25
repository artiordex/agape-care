/**
 * Description : next.config.mjs - 📌 Web 앱 Next.js 설정
 * Author : Shiwoo Min
 * Date : 2026-01-25
 */

import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 배포 환경 감지
const IS_FIREBASE = process.env.FIREBASE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router 활성화
  experimental: {
    appDir: true,
  },

  // 빌드 모드
  // Firebase → export
  // Docker / 로컬 / Cloud → standalone
  output: IS_FIREBASE ? 'export' : 'standalone',

  // 이미지 설정
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

  // ui 정적 자산 경로 매핑
  async rewrites() {
    return [{ source: '/ui/:path*', destination: '/_next/static/ui/:path*' }];
  },

  // 퍼포먼스 / 안전성
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,

  // 타입스크립트 / ESLint 빌드 무시 (CI/CD 용)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
