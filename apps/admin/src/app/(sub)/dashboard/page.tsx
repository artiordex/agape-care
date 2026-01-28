'use client';

import { useRouter } from 'next/navigation';
import dashboardData from '@/data/dashboard.json';

import StatsSection from './StatsSection';
import ActivitySection from './ActivitySection';
import ScheduleSection from './ScheduleSection';
import QuickActionSection from './QuickActionSection';

export default function DashboardPage() {
  const router = useRouter();

  const handleQuickAction = (action: any) => {
    if (action.path) router.push(action.path);
    if (action.action === 'addSchedule') {
      // 모달 오픈
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <header>
        <h2 className="text-2xl font-bold">대시보드</h2>
        <p className="text-gray-600">요양원 운영 현황 요약</p>
      </header>

      <StatsSection stats={dashboardData.stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ActivitySection
          activities={[]} // API 연결 예정
          onViewAll={() => router.push('/admin/content/notice')}
        />
        <ScheduleSection
          schedules={[]} // API 연결 예정
          onAdd={() => {}}
        />
      </div>

      <QuickActionSection actions={dashboardData.quickActions} onAction={handleQuickAction} />
    </div>
  );
}
