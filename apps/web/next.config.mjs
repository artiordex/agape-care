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
const IS_DOCKER = process.env.DOCKER === 'true';
const IS_CLOUD_RUN = process.env.CLOUD_RUN === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js App Router 활성화 (app 디렉토리 전용)
  experimental: {
    appDir: true,
  },

  // 배포 환경에 따른 빌드 모드 자동 설정
  output: IS_FIREBASE ? 'export' : 'standalone',

  // 내부 패키지 빌드 대상 (Nx 모노레포 패키지)
  transpilePackages: ['@agape-care/ui', '@agape-care/api-contract'],

  // Webpack alias 설정 (dist/packages 기반)
  webpack: config => {
    const aliasBase = path.resolve(__dirname, '../../dist/packages');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@agape-care/ui': path.join(aliasBase, 'ui'),
      '@agape-care/api-contract': path.join(aliasBase, 'api-contract'),
      '@agape-care/logger': path.join(aliasBase, 'logger'),
    };
    return config;
  },

  // 이미지 설정 (Firebase / Docker 호환)
  images: {
    unoptimized: IS_FIREBASE, // Firebase Hosting에서는 압축 비활성화
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

  /*
   * Firebase Web 환경변수 매핑 (필요 시 주석 해제)
   */
  /*
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_WEB_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_WEB_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_WEB_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_WEB_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_WEB_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_WEB_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_WEB_MEASUREMENT_ID,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    NEXT_PUBLIC_DEPLOY_ENV: IS_FIREBASE
      ? 'firebase'
      : IS_CLOUD_RUN
      ? 'cloud-run'
      : IS_DOCKER
      ? 'docker'
      : 'local'
  },
  */

  // @connectwon/ui 정적 자산 경로 매핑
  async rewrites() {
    return [{ source: '/ui/:path*', destination: '/_next/static/ui/:path*' }];
  },

  // 루트 기준 outputFileTracing (Cloud Run / Docker용)
  outputFileTracingRoot: path.resolve(__dirname, '../../'),

  // 퍼포먼스 및 안정성 설정
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,

  // 타입스크립트 / ESLint 빌드 무시 (CI/CD 호환)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
