'use client';

import React, { useState, useEffect } from 'react';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMonthlyStats from './ScheduleMonthlyStats';
import WorkScheduleManagement from './WorkScheduleManagement';

// 테스트용 샘플 데이터
const SAMPLE_STAFF = [
  {
    id: 'ST001',
    name: '김철수',
    position: '선임요양보호사',
    type: '요양보호사',
    status: '재직',
    hireDate: '2023-01-15',
    annualLeave: 15,
    usedLeave: 3,
  },
  {
    id: 'ST002',
    name: '이영희',
    position: '요양보호사',
    type: '요양보호사',
    status: '재직',
    hireDate: '2023-03-10',
    annualLeave: 15,
    usedLeave: 5,
  },
  {
    id: 'ST003',
    name: '박민수',
    position: '사회복지사',
    type: '사회복지사',
    status: '재직',
    hireDate: '2023-06-20',
    annualLeave: 12,
    usedLeave: 2,
  },
  {
    id: 'ST004',
    name: '최지은',
    position: '간호조무사',
    type: '간호조무사',
    status: '재직',
    hireDate: '2024-01-05',
    annualLeave: 11,
    usedLeave: 0,
  },
  {
    id: 'ST005',
    name: '정다혜',
    position: '요양보호사',
    type: '요양보호사',
    status: '재직',
    hireDate: '2023-11-12',
    annualLeave: 12,
    usedLeave: 4,
  },
];

/**
 * [Component] 전체 근무표 관제 통합 탭
 * 전사적 통계 및 그리드 관제 화면을 구성합니다.
 */
export default function ControlTab() {
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const [globalStats, setGlobalStats] = useState({
    workDays: 0,
    totalHours: 0,
    nightCount: 0,
    vacation: 0,
    overtime: 0,
  });

  // 월별 전사 통계 산출 로직 (추후 WorkScheduleManagement와 데이터 동기화)
  useEffect(() => {
    const savedSchedules = localStorage.getItem(`work_schedule_detail_${selectedMonth}`);
    if (savedSchedules) {
      const data = JSON.parse(savedSchedules);
      const WORK_CODE_MAP: any = { S: 12, A: 9, D: 9, E: 9, N: 12, 연: 8, 공: 8, O: 4 };

      const summary = data.reduce(
        (acc: any, curr: any) => {
          const hours = WORK_CODE_MAP[curr.workType] || 0;
          return {
            workDays: acc.workDays + (hours > 0 ? 1 : 0),
            totalHours: acc.totalHours + hours,
            nightCount: acc.nightCount + (curr.workType === 'N' ? 1 : 0),
            vacation: acc.vacation + (['연', 'O'].includes(curr.workType) ? 1 : 0),
            overtime: acc.overtime + (curr.overtime || 0),
          };
        },
        { workDays: 0, totalHours: 0, nightCount: 0, vacation: 0, overtime: 0 },
      );

      setGlobalStats(summary);
    }
  }, [selectedMonth]);

  return (
    <div className="animate-in fade-in space-y-8 font-sans text-gray-900 antialiased duration-300">
      {/* 1. 섹션 헤더 (월 선택 및 제목) */}
      <ScheduleHeader selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

      {/* 2. 전사 월간 누적 통계 대시보드 */}
      <ScheduleMonthlyStats stats={globalStats} />

      {/* 3. 메인 전사 근무표 그리드 시스템 */}
      <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-[14px] font-black uppercase italic tracking-tighter text-gray-800">
            전사 근무 배치 그리드 (Agape Grid Protocol)
          </h2>
        </div>
        <div className="p-6">
          <WorkScheduleManagement staffList={SAMPLE_STAFF} selectedMonth={selectedMonth} />
        </div>
      </div>
    </div>
  );
}
