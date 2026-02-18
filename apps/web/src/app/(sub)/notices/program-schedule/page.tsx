/**
 * Description : page.tsx - ?? notices/program-schedule ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { api } from '@/lib/api';
import ProgramScheduleSection from './ProgramScheduleSection';

export default function ProgramSchedulePage() {
  // API 데이터 로드 (페이지네이션은 기본값 사용)
  const { data: schedulesData, isLoading } = api.webpage.getProgramSchedules.useQuery(['program-schedules'], {
    query: { page: 1, limit: 100 },
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <ProgramScheduleSection
        schedules={schedulesData?.status === 200 ? schedulesData.body.data : []}
        isLoading={isLoading}
      />
    </main>
  );
}
