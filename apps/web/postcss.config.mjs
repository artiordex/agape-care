/**
 * Description : postcss.config.mjs - ?? ???? ?? ??
 * Author : Shiwoo Min
 * Date : 2025-09-25
 *
 * Note :
 *  - Docker / Cloud Run / Firebase / Azure / Local 완전 호환
 *  - Windows 경로를 file:// URL로 변환 (pathToFileURL)
 *  - @connectwon/ui/tailwind-config → 로컬 상대경로 import로 대체
 */

import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// UI 패키지 Tailwind 설정 (Windows 호환)
const uiConfigPath = path.resolve(__dirname, '../../packages/ui/tailwind.config.mjs');
const baseConfig = await import(pathToFileURL(uiConfigPath).href).then(m => m.default || m);

// Web 전용 content 경로 확장
const webConfig = {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Web 앱 소스
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', // UI 패키지
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}', // Shared 패키지
  ],
};

// Export
export default {
  plugins: {
    tailwindcss: { config: webConfig },
    autoprefixer: {},
  },
};
