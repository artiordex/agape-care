'use client';

import dashboardData from '@/data/dashboard.json';
import { useRouter } from 'next/navigation';

import ActivitySection from './ActivitySection';
import HealthAlertSection from './HealthAlertSection';
import MedicationSection from './MedicationSection';
import QuickActionSection from './QuickActionSection';
import ScheduleSection from './ScheduleSection';
import StatsSection from './StatsSection';

// 샘플 데이터
const SAMPLE_MEDICATIONS = {
  completed: 25,
  scheduled: 12,
  missed: 0,
  upcoming: [
    {
      id: 1,
      name: '김영희',
      medication: '혈압약',
      time: '14:00',
    },
    {
      id: 2,
      name: '이철수',
      medication: '당뇨약',
      time: '14:00',
    },
    {
      id: 3,
      name: '박순자',
      medication: '치매약',
      time: '18:00',
    },
  ],
};

const SAMPLE_HEALTH_ALERTS = [
  {
    id: 1,
    icon: 'ri-heart-pulse-line',
    name: '김영희',
    issue: '혈압 상승',
    value: '150/95 mmHg (정상: 120/80)',
    time: '오늘 09:00',
  },
  {
    id: 2,
    icon: 'ri-temp-hot-line',
    name: '최민수',
    issue: '체온 상승',
    value: '37.8°C (정상: 36.5)',
    time: '오늘 10:30',
  },
  {
    id: 3,
    icon: 'ri-droplet-line',
    name: '이철수',
    issue: '혈당 상승',
    value: '180 mg/dL (정상: 100)',
    time: '오늘 11:00',
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleQuickAction = (action: any) => {
    if (action.path) router.push(action.path);
    if (action.action === 'addSchedule') {
      // 모달 오픈
    }
  };

  return (
    <main className="h-full space-y-4 p-4 lg:px-6">
      {/* 통계 카드 */}
      <StatsSection stats={dashboardData.stats} />

      {/* 건강 이상 & 투약 현황 (2열) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <HealthAlertSection healthAlerts={SAMPLE_HEALTH_ALERTS} />
        <MedicationSection medications={SAMPLE_MEDICATIONS} />
      </div>

      {/* 최근 활동 & 오늘의 일정 (3열) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ActivitySection activities={[]} onViewAll={() => router.push('/admin/content/notice')} />
        <ScheduleSection schedules={[]} onAdd={() => {}} />
      </div>

      {/* 빠른 작업 */}
      <QuickActionSection actions={dashboardData.quickActions} onAction={handleQuickAction} />
    </main>
  );
}
