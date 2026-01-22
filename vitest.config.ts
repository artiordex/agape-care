/**
 * Description : vitest.config.ts - 📌 Agape-Care 테스트 환경 설정
 * Author : Shiwoo Min
 * Date : 2026-01-22
 */

/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',

    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000',
        resources: 'usable',
      },
    },

    // 환경별 테스트 설정
    environmentMatchGlobs: [
      ['apps/api/**/*.{test,spec}.{ts,js}', 'node'],
      ['apps/worker/**/*.{test,spec}.{ts,js}', 'node'],
      ['apps/admin/**/*.{test,spec}.{ts,tsx}', 'jsdom'],
      ['apps/web/**/*.{test,spec}.{ts,tsx}', 'jsdom'],
      ['src/**/*.{test,spec}.{ts,tsx}', 'jsdom'],
    ],

    // 테스트 설정 파일
    setupFiles: ['./src/test/setup.ts'],

    // 포함 범위
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'apps/**/*.{test,spec}.{ts,tsx}'],

    // 제외 범위
    exclude: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/out/**',
      '**/test-results/**',
      'docs/**',
      'infra/**',
    ],

    // 커버리지 설정
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      reportsDirectory: './coverage',

      thresholds: {
        global: {
          branches: 60,
          functions: 60,
          lines: 65,
          statements: 65,
        },

        // 중요 컴포넌트 (실제 경로 기준)
        'apps/admin/src/app/(protected)/dashboard/**/*.tsx': {
          branches: 70,
          functions: 70,
          lines: 75,
          statements: 75,
        },

        // 레거시 관리 컴포넌트
        'src/pages/admin/components/ResidentManagement.tsx': {
          branches: 75,
          functions: 75,
          lines: 80,
          statements: 80,
        },
        'src/pages/admin/components/MedicationManagement.tsx': {
          branches: 75,
          functions: 75,
          lines: 80,
          statements: 80,
        },
        'src/pages/admin/components/AttendanceManagement.tsx': {
          branches: 70,
          functions: 70,
          lines: 75,
          statements: 75,
        },
      },

      exclude: [
        '**/*.d.ts',
        '**/*.config.{ts,js,mjs}',
        '**/*.stories.{ts,tsx}',
        '**/test/**',
        '**/tests/**',
        'src/mocks/**',
        'apps/**/public/**',
        'apps/**/data/**',
        'vite-env.d.ts',
        '*.config.*',
      ],
    },

    // Mock 설정
    restoreMocks: true,
    clearMocks: true,

    // 타임아웃 설정
    testTimeout: 10000,
    hookTimeout: 10000,

    // 병렬 실행
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4,
        minThreads: 1,
      },
    },

    // 리포터
    reporters: ['verbose', 'html', 'json'],
    outputFile: {
      html: './test-results/index.html',
      json: './test-results/results.json',
    },
  },

  // 경로 별칭 (tsconfig와 동일)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/mocks': path.resolve(__dirname, './src/mocks'),
      '@/i18n': path.resolve(__dirname, './src/i18n'),
      '@agape-care/admin': path.resolve(__dirname, './apps/admin/src'),
      '@agape-care/web': path.resolve(__dirname, './apps/web/src'),
      '@agape-care/api': path.resolve(__dirname, './apps/api/src'),
      '@agape-care/worker': path.resolve(__dirname, './apps/worker/src'),
    },
  },
});
