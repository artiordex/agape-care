/**
 * Description : DashboardPage.tsx - 📌 대시보드 메인 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 리팩토링된 전문 ERP 컴포넌트 Import
import FullMenuModal from '@/components/FullMenuModal';
import HealthAlerts from './CareMonitor/HealthAlerts';
import MedicationStatus from './CareMonitor/MedicationStatus';
import DashboardHeader from './DashboardHeader';
import ActivityLog from './Operations/ActivityLog';
import TodaySchedule from './Operations/TodaySchedule';
import QuickLinkGrid from './QuickLinkGrid';
import StatsCards from './StatsCards';

// 데이터 소스
import dashboardData from '@/data/dashboard.json';
import menuData from '@/data/menu.json';

// 실시간 케어 샘플 데이터
const SAMPLE_MEDICATIONS = {
  completed: 25,
  scheduled: 12,
  missed: 0,
  upcoming: [
    { id: 1, name: '김영희', medication: '혈압약', time: '14:00' },
    { id: 2, name: '이철수', medication: '당뇨약', time: '14:00' },
    { id: 3, name: '박순자', medication: '치매약', time: '18:00' },
  ],
};

const SAMPLE_HEALTH_ALERTS = [
  { id: 1, icon: 'ri-heart-pulse-line', name: '김영희', issue: '혈압 상승', value: '150/95 mmHg', time: '09:00' },
  { id: 2, icon: 'ri-temp-hot-line', name: '최민수', issue: '체온 상승', value: '37.8°C', time: '10:30' },
  { id: 3, icon: 'ri-droplet-line', name: '이철수', issue: '혈당 상승', value: '180 mg/dL', time: '11:00' },
];

/**
 * [Main] Agape-Care 통합 운영 대시보드
 * 실시간 모니터링 및 행정 퀵 액션 통합
 */
export default function DashboardPage() {
  const router = useRouter();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  // 빠른 작업 핸들러
  const handleQuickAction = (action: any) => {
    if (action.path) router.push(action.path);
    if (action.action === 'addSchedule') {
      console.log('일정 추가 모달 활성화');
    }
    if (action.action === 'showFullMenu') {
      setIsFullMenuOpen(true);
    }
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 1. 최상단 실시간 헤더 */}
      <DashboardHeader />

      {/* 2. 메인 관제 영역 (스크롤 가능) */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4 lg:p-6">
        {/* [A] 핵심 운영 지표 섹션 */}
        <StatsCards stats={dashboardData.stats} />

        {/* [B] 실시간 케어 모니터링 섹션 (2열 그리드) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <HealthAlerts healthAlerts={SAMPLE_HEALTH_ALERTS} />
          <MedicationStatus medications={SAMPLE_MEDICATIONS} />
        </div>

        {/* [C] 운영 활동 및 스케줄 섹션 (3열 그리드) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 최근 활동 로그 (2/3 영역 차지) */}
          <ActivityLog
            activities={[]} // 실시간 로그 데이터 연동 가능
            onViewAll={() => router.push('/admin/content/notice')}
          />
          {/* 오늘의 일정 (1/3 영역 차지) */}
          <TodaySchedule
            schedules={[]} // 오늘 일정 데이터 연동 가능
            onAdd={() => console.log('Show Schedule Modal')}
          />
        </div>

        {/* [D] 시스템 퀵 링크 섹션 */}
        <QuickLinkGrid actions={dashboardData.quickActions} onAction={handleQuickAction} />
      </div>

      {/* 전체 메뉴 모달 */}
      <FullMenuModal
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        menus={menuData.menus}
        onMenuClick={path => router.push(path)}
      />
    </main>
  );
}
