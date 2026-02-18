/**
 * Description : next.config.mjs - ?? ???? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-01-27
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // NX monorepo 구조에서 빌드 출력 경로 명시
  distDir: '../../dist/apps/admin/.next',

  transpilePackages: ['@agape-care/ui'],

  // 메모리 최적화 (추가)
  experimental: {
  workerThreads: false,
  cpus: 1,
  },

  webpack: config => {
    const packagesBase = path.resolve(__dirname, '../../packages');
    const resolvePackageAlias = packageName => {
      const distPath = path.join(packagesBase, packageName, 'dist');
      const srcPath = path.join(packagesBase, packageName, 'src');
      return fs.existsSync(distPath) ? distPath : srcPath;
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@agape-care/ui': resolvePackageAlias('ui'),
      '@agape-care/logger': resolvePackageAlias('logger'),
      '@agape-care/api-contract': resolvePackageAlias('api-contract'),
    };

    // ESM 스타일의 .js 확장을 .ts/.tsx로 해석하도록 설정
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
    };

    return config;
  },

  reactStrictMode: false,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  async rewrites() {
    const rules = [];
    if (process.env.NODE_ENV === 'development') {
      rules.push({
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:8000'}/api/:path*`,
      });
    }
    return rules;
  },

  outputFileTracingRoot: path.resolve(__dirname, '../../'),

  compress: true,
  poweredByHeader: false,

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
