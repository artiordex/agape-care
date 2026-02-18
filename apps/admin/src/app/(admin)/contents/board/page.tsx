/**
 * Description : page.tsx - ?? contents/board ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import FreeBoardAdmin from './BoardAdmin';

/**
 * [Page] 자유게시판 운영 관리 시스템 진입점
 * 외부 래퍼의 여백(p-8)과 너비 제한(max-w-7xl)을 제거하여
 * 내부 고정 레이아웃(Fixed Layout)이 브라우저 전체를 점유하도록 합니다.
 */
export default function FreeBoardPage() {
  /** * [Layout Implementation]
   * 웹 상담 문의 관리(InquiryPage)와 동일하게 Admin 컨테이너를 직접 렌더링합니다.
   */
  return <FreeBoardAdmin />;
}
