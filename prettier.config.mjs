/**
 * Description : prettier.config.mjs - 📌 Prettier 설정
 * Author : Shiwoo Min
 * Date : 2026-01-22
 * Note :
 *  - Monorepo 기반 (Nx + pnpm) 환경 최적화
 *  - Import 순서 및 Tailwind 플러그인 정렬 충돌 방지
 *  - VSCode / WebStorm 호환성 강화
 */

export default {
  arrowParens: 'avoid',
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  printWidth: 150,
  bracketSpacing: true,
  semi: true,

  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  pluginSearchDirs: false,

  importOrder: [
    '^node:',
    '^react',
    '^next',
    '^@nestjs',
    '^@radix-ui/',
    '^@tanstack/',
    '^@supabase/',
    '^@auth/',
    '^@prisma/',
    '^prisma',
    '^firebase',
    '^framer-motion',
    '^lucide-react',
    '^recharts',
    '^chart\\.js',
    '^react-chartjs-2',
    '^react-big-calendar',
    '^@fullcalendar/',
    '^fullcalendar',
    '^react-signature-canvas',
    '^react-webcam',
    '^react-pdf',
    '^jspdf',
    '^html2canvas',
    '^socket\\.io',
    '^nodemailer',
    '^twilio',
    '^bcryptjs',
    '^jsonwebtoken',
    '^crypto-js',
    '^multer',
    '^node-cron',
    '^date-fns',
    '^dayjs',
    '^lodash',
    '^uuid',
    '^zod',
    '^zustand',
    '^react-hook-form',
    '^@hookform/',
    '^@',
    '^[a-z]',
    '',
    '^apps/admin',
    '^apps/web',
    '^apps/api',
    '^apps/worker',
    '^apps/',
    '',
    '^infra/',
    '^docs/',
    '',
    '^@/pages/admin/components/',
    '^@/pages/admin',
    '^@/pages/',
    '^@/components/admin',
    '^@/components/feature',
    '^@/components/',
    '^@/mocks/',
    '^@/i18n/',
    '^@/lib/',
    '^@/utils/',
    '^@/',
    '',
    '^[./]',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'decorators-legacy',
    'classProperties'
  ],

  overrides: [
    {
      files: [
        'src/pages/admin/components/**/*.tsx',
        'apps/admin/src/**/*.tsx',
        '**/ResidentManagement.tsx',
        '**/MedicationManagement.tsx',
        '**/StaffManagement.tsx',
        '**/AccountingManagement.tsx'
      ],
      options: {
        printWidth: 160,
        tabWidth: 2,
      },
    },
    {
      files: [
        'src/mocks/*.ts',
        'src/mocks/*.json',
        '**/residents*.ts',
        '**/payroll*.ts',
        '**/accounting*.ts',
        '**/mealPlan*.ts'
      ],
      options: {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
      },
    },
    {
      files: [
        'apps/api/src/**/*.ts',
        'apps/worker/src/**/*.ts',
        '**/*.controller.ts',
        '**/*.service.ts',
        '**/*.module.ts'
      ],
      options: {
        printWidth: 140,
        tabWidth: 2,
      },
    },
  ],
};
