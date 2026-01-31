'use client';

import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';

// 리팩토링된 통합 컴포넌트 임포트
import AttendanceHeader from './AttendanceHeader';
import AttendanceStats from './AttendanceStats';
import AttendanceTabs from './AttendanceTabs';
import AttendanceFilter from './AttendanceFilter';
import DailyAttendanceTable from './DailyAttendanceTable';
import MonthlyAttendanceTable from './MonthlyAttendanceTable';

export default function AttendanceManagementPage() {
  // 1. 관제 상태 관리: 탭, 날짜, 검색 필터
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    department: '전체 부서',
    query: '',
  });

  // 2. 마스터 데이터 (Mock)
  const attendanceRecords = [
    {
      id: 1,
      name: '김간호사',
      department: '간호팀',
      position: '간호사',
      date: '2026-01-30',
      checkIn: '08:00',
      checkOut: '17:00',
      workHours: 9,
      overtime: 0,
      status: '정상출근',
    },
    {
      id: 2,
      name: '이요양사',
      department: '요양팀',
      position: '요양보호사',
      date: '2026-01-30',
      checkIn: '09:00',
      checkOut: '18:00',
      workHours: 9,
      overtime: 0,
      status: '정상출근',
    },
    {
      id: 3,
      name: '박사무원',
      department: '사무팀',
      position: '사무원',
      date: '2026-01-30',
      checkIn: '08:30',
      checkOut: '--:--',
      workHours: 0,
      overtime: 0,
      status: '진행중',
    },
    {
      id: 4,
      name: '최영양사',
      department: '급식팀',
      position: '영양사',
      date: '2026-01-30',
      checkIn: '07:00',
      checkOut: '16:00',
      workHours: 9,
      overtime: 1,
      status: '정상출근',
    },
  ];

  const monthlySummary = [
    {
      name: '김간호사',
      department: '간호팀',
      totalDays: 22,
      presentDays: 20,
      absentDays: 1,
      lateDays: 1,
      overtimeHours: 10,
    },
    {
      name: '이요양사',
      department: '요양팀',
      totalDays: 22,
      presentDays: 22,
      absentDays: 0,
      lateDays: 0,
      overtimeHours: 5,
    },
    {
      name: '박사무원',
      department: '사무팀',
      totalDays: 22,
      presentDays: 21,
      absentDays: 0,
      lateDays: 1,
      overtimeHours: 8,
    },
    {
      name: '최영양사',
      department: '급식팀',
      totalDays: 22,
      presentDays: 22,
      absentDays: 0,
      lateDays: 0,
      overtimeHours: 15,
    },
  ];

  // 3. 엑셀 익스포트 엔진 (Agape-Standard)
  const handleExport = () => {
    const data = activeTab === 'daily' ? attendanceRecords : monthlySummary;
    const filename = `Agape_Attendance_${activeTab === 'daily' ? filters.date : filters.date.slice(0, 7)}`;

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AttendanceData');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* A. 통합 액션 헤더 */}
      <AttendanceHeader onExport={handleExport} onManualEntry={() => alert('출퇴근 수동 등록 모달을 활성화합니다.')} />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* B. 실시간 근태 대시보드 */}
          <AttendanceStats />

          {/* C. 관제 워크스페이스 컨테이너 */}
          <div className="border border-gray-300 bg-white shadow-xl">
            {/* D. 직각형 모드 전환 탭 */}
            <AttendanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* E. 정밀 검색 필터 영역 */}
            <div className="border-b border-gray-100 bg-[#f8fafc] p-6">
              <AttendanceFilter activeTab={activeTab} filters={filters} setFilters={setFilters} />
            </div>

            {/* F. 데이터 그리드 뷰 */}
            <div className="p-0">
              {activeTab === 'daily' ? (
                <DailyAttendanceTable records={attendanceRecords} />
              ) : (
                <MonthlyAttendanceTable summaryData={monthlySummary} />
              )}
            </div>

            {/* G. 시스템 하단 상태바 (Agape-Detail) */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
                <span className="flex items-center gap-1.5 text-[#5C8D5A]">
                  <span className="h-1 w-1 animate-pulse bg-[#5C8D5A]"></span>HR Data Sync Active
                </span>
                <span className="h-2.5 w-[1px] bg-gray-200"></span>
                <span>Audit Log: Ready</span>
              </div>
              <p className="text-[10px] font-bold uppercase italic text-gray-300">
                Last Updated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
