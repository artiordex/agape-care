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
      // TypeScript 규칙 - 느슨하게
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',

      // Import 정렬 - 경고로만
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',

      'import/first': 'off',
      'import/newline-after-import': 'off',
      'import/no-duplicates': 'warn',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-extraneous-dependencies': 'off',

      // Unused imports - 경고로만
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',

      // 코드 스타일 - 모두 끄기
      semi: 'off',
      quotes: 'off',
      '@typescript-eslint/quotes': 'off',
      indent: 'off',
      '@typescript-eslint/indent': 'off',
      'linebreak-style': 'off',
      'no-trailing-spaces': 'off',
      'comma-dangle': 'off',
      'max-len': 'off',

      // 콘솔 및 디버깅
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // 코드 품질 - 경고로만
      'prefer-const': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'off',
      'prefer-template': 'off',
      'prefer-arrow-callback': 'off',
      'arrow-body-style': 'off',

      // React 규칙 - 느슨하게
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': 'off',
      'react/function-component-definition': 'off',
      'react/self-closing-comp': 'off',
      'react/jsx-boolean-value': 'off',
      'react/jsx-curly-brace-presence': 'off',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',

      // React Hooks - 경고로만
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'off',

      // Next.js 규칙 - 경고로만
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-sync-scripts': 'off',

      // Import 제한 - 끄기
      'no-restricted-imports': 'off',
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
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
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
      'playwright/no-focused-test': 'off',
      'playwright/no-skipped-test': 'off',
      'playwright/no-conditional-in-test': 'off',
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
      '@typescript-eslint/no-explicit-any': 'off',
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
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
