'use client';

import React from 'react';
import GalleryAdmin from './GalleryAdmin';
import { GalleryItem } from './gallery.type';

/**
 * [Page] 갤러리 관리 시스템 메인 엔트리
 * 외부 레이아웃 래퍼를 제거하여 GalleryAdmin 내의 고정 헤더 프로토콜이 정상 작동하도록 합니다.
 */
export default function GalleryPage() {
  /**
   * [MOCK DATA] 운영 테스트용 시스템 가상 데이터
   * 실제 운영 환경에서는 서버 사이드에서 데이터를 페칭하여 주입합니다.
   */
  const MOCK_GALLERY_ITEMS: GalleryItem[] = [
    {
      id: '001',
      category: '활동',
      title: '2026년 상반기 어르신 숲속 산책 프로그램',
      description:
        '청계산 인근 산책로에서 진행된 외부 활동 사진입니다. 정서적 안정과 신체 활동을 목적으로 진행되었습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&q=60',
      authorName: '관리자',
      authorId: 'admin_01',
      viewCount: 450,
      status: '게시',
      createdAt: '2026-01-20',
      updatedAt: '2026-01-20',
    },
    {
      id: '002',
      category: '시설',
      title: '아름다운 정원 리뉴얼 공사 완료',
      description: '본관 3층 야외 정원의 조경 및 휴게 시설 확충 공사가 마무리되었습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=200&q=60',
      authorName: '민시우',
      authorId: 'user_99',
      viewCount: 120,
      status: '게시',
      createdAt: '2026-01-28',
      updatedAt: '2026-01-28',
    },
    {
      id: '003',
      category: '행사',
      title: '신년맞이 떡국 나눔 행사 현장',
      description: '입소 어르신 및 보호자분들과 함께한 따뜻한 신년 행사 사진 기록입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=200&q=60',
      authorName: '강명석',
      authorId: 'user_42',
      viewCount: 88,
      status: '숨김',
      createdAt: '2026-01-31',
      updatedAt: '2026-01-31',
    },
  ];

  /** * [Layout Implementation]
   * 웹 상담 문의 관리(InquiryPage)와 동일하게 별도의 외부 div 없이
   * Admin 컨테이너를 직접 렌더링하여 고정 레이아웃을 구현합니다.
   */
  return <GalleryAdmin initialData={MOCK_GALLERY_ITEMS} />;
}
