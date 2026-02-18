/**
 * Description : api.ts - ?? api ?? ?? ??
 * Author : Shiwoo Min
 * Date : 2026-02-10
 */

import { contract } from '@agape-care/api-contract';
import { initQueryClient } from '@ts-rest/react-query';

/**
 * 환경 변수 설정
 * 클라이언트 사이드와 서버 사이드 모두 대응할 수 있도록 처리합니다.
 */
const baseUrl =
  globalThis.window === undefined
    ? process.env.INTERNAL_API_URL || 'http://localhost:8000/api' // 서버 내부 호출용
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'; // 브라우저 호출용

export const api = initQueryClient(contract, {
  baseUrl,
  baseHeaders: {
    'Content-Type': 'application/json',
    'x-agape-client': 'web', // 클라이언트 식별용 헤더 (필요시)
  },
  /**
   * API 응답이 Contract에 정의된 Zod 스키마와 일치하는지 검증합니다.
   * 개발 단계에서 데이터 불일치 문제를 빠르게 파악하기 위해 true 설정을 권장합니다.
   */
  validateResponse: process.env.NODE_ENV === 'development',
});

/**
 * [Tip] 향후 인증이 필요한 경우, baseHeaders를 함수로 변경하여
 * 쿠키나 로컬 스토리지의 토큰을 동적으로 주입할 수 있습니다.
 * * baseHeaders: async () => ({
 * Authorization: `Bearer ${getCookie('accessToken')}`,
 * }),
 */
