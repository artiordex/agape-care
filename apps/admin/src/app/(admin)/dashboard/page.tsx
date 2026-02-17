/**
 * Description : DashboardPage.tsx - 📌 대시보드 메인 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 리팩토링된 전문 ERP 컴포넌트 Import
import FullMenuModal from '@/components/FullMenuModal';
import HealthAlerts from './CareMonitor/HealthAlerts';
import MedicationStatus from './CareMonitor/MedicationStatus';
import DashboardHeader from './DashboardHeader';
import { useDashboardData } from './hooks/useDashboardData';
import ActivityLog from './Operations/ActivityLog';
import TodaySchedule from './Operations/TodaySchedule';
import QuickLinkGrid from './QuickLinkGrid';
import StatsCards from './StatsCards';

// 데이터 소스
import dashboardData from '@/data/dashboard.json';
import menuData from '@/data/menu.json';

/**
 * [Main] Agape-Care 통합 운영 대시보드
 * 실시간 모니터링 및 행정 퀵 액션 통합
 */
export default function DashboardPage() {
  const router = useRouter();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  // 대시보드 데이터 훅 (Mock → 추후 API 교체 가능)
  const { data, isLoading, refresh } = useDashboardData();

  // 빠른 작업 핸들러
  const handleQuickAction = (action: any) => {
    if (action.path) router.push(action.path);
    if (action.action === 'addSchedule') {
      console.log('일정 추가 모달 활성화');
    }
    if (action.action === 'showFullMenu') {
      setIsFullMenuOpen(true);
    }
    if (action.action === 'generateReport') {
      window.print();
    }
  };

  // 섹션 스켈레톤 로더 (새로고침 시 표시)
  const SkeletonRow = () => (
    <div className="animate-pulse space-y-3 p-4">
      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
      <div className="h-4 w-2/3 rounded bg-gray-200"></div>
    </div>
  );

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 1. 최상단 실시간 헤더 */}
      <DashboardHeader onRefresh={refresh} />

      {/* 2. 메인 관제 영역 (스크롤 가능) */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4 lg:p-6">
        {/* [A] 핵심 운영 지표 섹션 */}
        <StatsCards stats={dashboardData.stats} />

        {/* [B] 실시간 케어 모니터링 섹션 (2열 그리드) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {isLoading ? (
            <>
              <div className="overflow-hidden rounded-lg border border-red-200 bg-white shadow-sm"><SkeletonRow /></div>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"><SkeletonRow /></div>
            </>
          ) : (
            <>
              <HealthAlerts healthAlerts={data.healthAlerts} />
              <MedicationStatus medications={data.medications} />
            </>
          )}
        </div>

        {/* [C] 운영 활동 및 스케줄 섹션 (3열 그리드) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {isLoading ? (
            <>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-2"><SkeletonRow /></div>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"><SkeletonRow /></div>
            </>
          ) : (
            <>
              {/* 최근 활동 로그 (2/3 영역 차지) */}
              <ActivityLog
                activities={data.activities}
                onViewAll={() => router.push('/admin/content/notice')}
              />
              {/* 오늘의 일정 (1/3 영역 차지) */}
              <TodaySchedule
                schedules={data.schedules}
                onAdd={() => console.log('Show Schedule Modal')}
              />
            </>
          )}
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
