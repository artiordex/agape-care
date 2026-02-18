/**
 * Description : prettier.config.mjs - ?? ???? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-01-22
 * Note :
 *  - Monorepo 기반 (pnpm workspace) 환경 최적화
 *  - Tailwind 클래스 정렬 우선 적용
 *  - Import 순서 자동 정리
 */

export default {
  // 기본 포맷팅 규칙
  arrowParens: 'avoid',
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  printWidth: 120,
  bracketSpacing: true,
  semi: true,
  endOfLine: 'lf',

  // 플러그인 (순서 중요: Tailwind가 마지막)
  plugins: [
    'prettier-plugin-tailwindcss', // Tailwind 클래스 정렬
  ],

  // 파일 타입별 세부 설정
  overrides: [
    {
      // 관리자 컴포넌트 (복잡한 UI)
      files: [
        'apps/admin/src/app/(protected)/**/*.tsx',
        'apps/admin/src/components/**/*.tsx',
      ],
      options: {
        printWidth: 140,
        tabWidth: 2,
      },
    },
    {
      // 웹 컴포넌트
      files: [
        'apps/web/src/app/**/*.tsx',
        'apps/web/src/components/**/*.tsx',
      ],
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      // 백엔드 (NestJS)
      files: [
        'apps/api/src/**/*.ts',
        '**/*.controller.ts',
        '**/*.service.ts',
        '**/*.module.ts',
      ],
      options: {
        printWidth: 140,
        tabWidth: 2,
        trailingComma: 'all',
      },
    },
    {
      // Worker 서비스
      files: [
        'apps/worker/src/**/*.ts',
      ],
      options: {
        printWidth: 140,
        tabWidth: 2,
      },
    },
    {
      // 레거시 Vite 앱 (src/)
      files: [
        'src/pages/**/*.tsx',
        'src/components/**/*.tsx',
      ],
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      // 설정 파일들
      files: [
        '*.config.{js,ts,mjs}',
        '*.json',
      ],
      options: {
        printWidth: 100,
        tabWidth: 2,
      },
    },
    {
      // Markdown 문서
      files: ['*.md', 'docs/**/*.md'],
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
  ],
};
