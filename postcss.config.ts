/**
 * Description : postcss.config.ts - ?? ???? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-01-22
 * Note:
 *  - Tailwind CSS 처리
 *  - autoprefixer로 브라우저 호환성 확보
 *  - 프로덕션에서만 cssnano 최소화 적용
 *  - Tailwind와 충돌 가능한 옵션 제거하여 안정성 강화
 */

import type { Config } from "postcss-load-config";

const config: Config = {
  plugins: {
    // Tailwind CSS 처리
    tailwindcss: {},

    // 벤더 프리픽스 자동 추가 (Flexbox 이슈 대응)
    autoprefixer: {
      flexbox: "no-2009"
    },

    // 프로덕션 빌드일 때만 CSS 최소화 적용
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: [
              "default",
              {
                // 불필요한 주석 제거
                discardComments: { removeAll: true },
                // 중복된 규칙 제거
                discardDuplicates: true,
                // 빈 블록 제거
                discardEmpty: true,
                // 색상 최적화 (예: #ffffff → #fff)
                colormin: true,
                // 폰트 최적화
                minifyFontValues: true,
                // 그라데이션 최적화
                minifyGradients: true,
                // CSS 파라미터 최적화
                minifyParams: true,
                // 셀렉터 최소화 및 정리
                minifySelectors: true
              }
            ]
          }
        }
      : {})
  }
};

export default config;
