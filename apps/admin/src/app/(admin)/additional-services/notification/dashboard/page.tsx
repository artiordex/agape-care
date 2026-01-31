'use client';

import React, { useState } from 'react';
import NotificationHeader from './NotificationHeader';
import StatsBoard from './StatsBoard';
import CampaignGrid from './CampaignGrid';

/**
 * [Main] 알림 시스템 통합 관제 대시보드
 * 아가페 그린(#5C8D5A) 테마 기반의 리팩토링된 통합 버전
 */
export default function NotificationDashboardPage() {
  // 1. 시스템 지표 상태
  const [stats] = useState({
    today: { total: 156, success: 142, failed: 8, pending: 6 },
    scheduled: 12,
  });

  // 2. 캠페인 리스트 데이터
  const [campaigns] = useState([
    {
      id: 'C001',
      title: '2026년 1월 급여 명세서 알림',
      purpose: 'Payroll',
      channels: ['sms', 'kakao'],
      recipients: 45,
      success: 45,
      failed: 0,
      status: 'done',
      sentAt: '2026.01.25',
    },
    {
      id: 'C002',
      title: '설 연휴 시설 면회 수칙 안내',
      purpose: 'Notice',
      channels: ['kakao', 'band'],
      recipients: 120,
      success: 115,
      failed: 5,
      status: 'done',
      sentAt: '2026.01.24',
    },
    {
      id: 'C003',
      title: '주간 프로그램 일정표 자동 발송',
      purpose: 'Schedule',
      channels: ['kakao'],
      recipients: 88,
      success: 0,
      failed: 0,
      status: 'scheduled',
      sentAt: '2026.02.01',
    },
  ]);

  // 3. Header 제어를 위한 UI 상태 추가
  const [selectedCampaignName, setSelectedCampaignName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 신규 발송 액션 핸들러
  const handleNewNotification = () => {
    setIsProcessing(true);
    // 모달 활성화 로직 등을 여기에 구현
    setTimeout(() => {
      alert('신규 알림 발송 구성 모달이 활성화되었습니다.');
      setIsProcessing(false);
    }, 500);
  };

  // 상세 보기 클릭 시 헤더에 캠페인명 동기화
  const handleViewDetail = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      setSelectedCampaignName(campaign.title);
      console.log(`조회 중인 캠페인 ID: ${id}`);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* 1. 리팩토링된 NotificationHeader 적용 */}
      <NotificationHeader
        selectedCampaignName={selectedCampaignName}
        isProcessing={isProcessing}
        onNewNotification={handleNewNotification}
      />

      {/* 2. 메인 관제 영역 (스크롤 가능) */}
      <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* [A] 상단 핵심 지표 보드 */}
          <StatsBoard todayStats={stats.today} scheduled={stats.scheduled} />

          {/* [B] 캠페인 이력 관리 그리드 (handleViewDetail 연결) */}
          <CampaignGrid campaigns={campaigns} onViewDetail={handleViewDetail} />

          {/* 시스템 푸터 정보 */}
          <footer className="mt-8 flex items-center justify-between border-t border-gray-200 pt-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Status: Normal
              </span>
              <span>● Service: SMS / Kakao / Band Sync Active</span>
            </div>
            <div className="text-[#5C8D5A]">Agape-Care Messaging Engine v2.1</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
