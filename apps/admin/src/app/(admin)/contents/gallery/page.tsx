/**
 * Description : page.tsx - ?? contents/gallery ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import GalleryAdmin from './GalleryAdmin';

/**
 * [Page] 갤러리 관리 시스템 메인 엔트리
 * 외부 레이아웃 래퍼를 제거하여 GalleryAdmin 내의 고정 헤더 프로토콜이 정상 작동하도록 합니다.
 */
export default function GalleryPage() {
  return <GalleryAdmin />;
}
