/**
 * Description : eslint.config.mjs - 📌 Agape-Care 모노레포 ESLint Flat Config 설정
 * Author : Shiwoo Min
 * Date : 2026-01-22
 */

import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  eslint.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json', './apps/*/tsconfig.json'],
        ecmaFeatures: { jsx: true },
      },

      globals: {
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        globalThis: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
      },
    },

    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      playwright,
      'react-hooks': reactHooks,
      react,
      '@next/next': nextPlugin,
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './apps/*/tsconfig.json'],
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.mjs', '.js', '.ts', '.tsx', '.jsx', '.cjs'],
        },
      },
      react: { version: 'detect' },
      next: { rootDir: ['apps/admin', 'apps/web'] },
    },

    rules: {
      ...typescript.configs.recommended.rules,

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
        },
      ],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^node:'],
            ['^react', '^next'],
            ['^@nestjs/'],
            ['^@radix-ui/', '^@tanstack/', '^framer-motion', '^lucide-react'],
            ['^@prisma/', '^prisma', '^firebase', '^@supabase/', '^@auth/', '^next-auth'],
            [
              '^recharts',
              '^chart\\.js',
              '^react-chartjs-2',
              '^react-hook-form',
              '^@hookform/',
              '^zod',
            ],
            ['^zustand', '^@tanstack/react-query'],
            ['^date-fns', '^dayjs', '^lodash', '^clsx', '^uuid'],
            ['^@?\\w'],
            ['^@agape-care/'],
            ['^@/'],
            ['^\\.\\.'],
            ['^\\.'],
            ['^.+\\.css$', '^.+\\.scss$'],
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
            '**/*.stories.{ts,tsx}',
            '**/vitest.config.ts',
            '**/vite.config.ts',
            '**/playwright.config.ts',
            '**/*.config.{js,ts,mjs}',
          ],
          peerDependencies: true,
          optionalDependencies: true,
        },
      ],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      semi: ['error', 'always'],
      quotes: 'off',
      '@typescript-eslint/quotes': 'off',
      indent: 'off',
      '@typescript-eslint/indent': 'off',
      'linebreak-style': 'off',
      'no-trailing-spaces': 'off',
      'comma-dangle': 'off',
      'max-len': 'off',

      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'warn',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],

      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
      'react/function-component-definition': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**/components/*'],
              message: '컴포넌트는 절대 경로(@/)로 import 해주세요.',
            },
          ],
        },
      ],
    },
  },

  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/.next/**',
      '**/coverage/**',
      '**/test-results/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      '*.config.cjs',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '*.snap',
      '**/*.min.js',
      'public/**',
      '.husky/**',
      '.changeset/**',
      'docs/assets/**',
      'infra/**/*.ts',
      'infra/**/*.tsx',
    ],
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
    },
  },

  {
    files: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      '**/*.stories.*',
      '**/tests/**',
      '**/test/**',
      '**/__tests__/**',
      '**/playwright.config.*',
      '**/vitest.config.*',
    ],
    rules: {
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/expect-expect': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      parser: null,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/no-commonjs': 'off',
    },
  },

  {
    files: [
      'apps/*/src/app/**/page.tsx',
      'apps/*/src/app/**/layout.tsx',
      'apps/*/src/app/**/loading.tsx',
      'apps/*/src/app/**/error.tsx',
      'apps/*/src/app/**/not-found.tsx',
      'apps/*/src/app/**/template.tsx',
      'apps/*/src/app/**/default.tsx',
      'apps/*/src/middleware.ts',
      'apps/*/next.config.mjs',
      '**/*.stories.tsx',
    ],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'off',
    },
  },

  {
    files: ['apps/api/src/**/*.ts', '**/*.controller.ts', '**/*.service.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/prop-types': 'off',
    },
  },

  {
    files: ['src/mocks/**/*.ts', 'apps/*/src/data/**/*.ts', '**/*.mock.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': 'off',
    },
  },
];
