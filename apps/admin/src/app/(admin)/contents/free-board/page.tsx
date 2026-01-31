'use client';

import React from 'react';
import FreeBoardAdmin from './FreeBoardAdmin';
import { FreeBoardPost } from './free-board.type';

/**
 * [Page] 자유게시판 운영 관리 시스템 진입점
 * 외부 래퍼의 여백(p-8)과 너비 제한(max-w-7xl)을 제거하여
 * 내부 고정 레이아웃(Fixed Layout)이 브라우저 전체를 점유하도록 합니다.
 */
export default function FreeBoardPage() {
  /**
   * [MOCK DATA] 운영 테스트용 시스템 가상 데이터
   * 실제 환경에서는 서버 사이드에서 데이터를 페칭하여 주입합니다.
   */
  const MOCK_POSTS: FreeBoardPost[] = [
    {
      id: '1',
      category: '정보',
      title: '아가페 케어 서비스 이용 가이드입니다.',
      content: '안녕하세요. 아가페 케어 이용 방법 안내드립니다. 본 게시판은 운영진과 사용자의 소통을 위한 공간입니다.',
      authorName: '관리자',
      authorId: 'admin_01',
      viewCount: 1250,
      commentCount: 5,
      status: '게시',
      isNotice: true,
      createdAt: '2026-01-20T10:00:00Z',
      updatedAt: '2026-01-20T10:00:00Z',
    },
    {
      id: '2',
      category: '질문',
      title: '로그인이 안 되는데 어떻게 하나요?',
      content: '아이디를 잊어버렸습니다. 찾기 기능이 어디 있나요? 비밀번호 재설정 방법도 궁금합니다.',
      authorName: '민시우',
      authorId: 'user_99',
      viewCount: 45,
      commentCount: 2,
      status: '게시',
      isNotice: false,
      createdAt: '2026-01-30T14:20:00Z',
      updatedAt: '2026-01-30T14:20:00Z',
    },
    {
      id: '3',
      category: '잡담',
      title: '오늘 날씨가 참 좋네요. 산책하기 딱 좋은 날씨입니다.',
      content: '시설 주변 공원 산책로가 아주 예쁘게 정돈되었네요.',
      authorName: '강명석',
      authorId: 'user_42',
      viewCount: 12,
      commentCount: 0,
      status: '숨김',
      isNotice: false,
      createdAt: '2026-01-31T09:15:00Z',
      updatedAt: '2026-01-31T09:15:00Z',
    },
  ];

  /** * [Layout Implementation]
   * 웹 상담 문의 관리(InquiryPage)와 동일하게 Admin 컨테이너를 직접 렌더링합니다.
   */
  return <FreeBoardAdmin initialData={MOCK_POSTS} />;
}
