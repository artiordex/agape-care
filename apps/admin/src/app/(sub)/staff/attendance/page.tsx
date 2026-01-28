'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

// 타입 정의
interface AttendanceRecord {
  id: number;
  name: string;
  department: string;
  position: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: number;
  overtime: number;
  status: string;
}

interface MonthlyAttendanceSummary {
  name: string;
  department: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  overtimeHours: number;
}

// Mock 데이터
const attendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    name: '김간호사',
    department: '간호팀',
    position: '간호사',
    date: '2024-01-15',
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
    date: '2024-01-15',
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
    date: '2024-01-15',
    checkIn: '08:30',
    checkOut: '17:30',
    workHours: 9,
    overtime: 0,
    status: '정상출근',
  },
  {
    id: 4,
    name: '최영양사',
    department: '급식팀',
    position: '영양사',
    date: '2024-01-15',
    checkIn: '07:00',
    checkOut: '16:00',
    workHours: 9,
    overtime: 0,
    status: '정상출근',
  },
];

const monthlyAttendanceSummary: MonthlyAttendanceSummary[] = [
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

export default function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');

  const exportToExcel = (data: AttendanceRecord[] | MonthlyAttendanceSummary[], filename: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleExport = () => {
    const data = activeTab === 'daily' ? attendanceRecords : monthlyAttendanceSummary;
    const filename = `출퇴근기록_${activeTab === 'daily' ? selectedDate : selectedMonth}`;
    exportToExcel(data, filename);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">출퇴근 기록 관리</h2>
          <p className="mt-1 text-sm text-gray-600">직원 출퇴근 기록을 관리하고 조회합니다</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            <i className="ri-file-excel-line mr-2"></i>
            Excel 다운로드
          </button>
          <button className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700">
            <i className="ri-add-line mr-2"></i>
            수동 등록
          </button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'daily'
                ? 'border-b-2 border-emerald-600 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            일일 출퇴근 기록
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'monthly'
                ? 'border-b-2 border-emerald-600 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            월별 근태 현황
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'daily' ? (
            <div className="space-y-4">
              {/* 날짜 선택 */}
              <div className="flex items-center space-x-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">조회 날짜</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button className="mt-6 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700">
                  조회
                </button>
              </div>

              {/* 일일 출퇴근 기록 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        직원명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        부서
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        직책
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        출근시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        퇴근시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        근무시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        연장근무
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        상태
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {attendanceRecords.map(record => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                              <span className="text-sm font-medium text-emerald-700">{record.name.charAt(0)}</span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{record.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{record.department}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{record.position}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{record.checkIn}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{record.checkOut}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{record.workHours}시간</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{record.overtime}시간</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {record.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-emerald-600 hover:text-emerald-900">수정</button>
                            <button className="text-red-600 hover:text-red-900">삭제</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* 월 선택 */}
              <div className="flex items-center space-x-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">조회 월</label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button className="mt-6 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700">
                  조회
                </button>
              </div>

              {/* 월별 근태 현황 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        직원명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        부서
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        총 근무일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        출근일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        결근일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        지각일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        연장근무시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        출근율
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {monthlyAttendanceSummary.map((summary, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                              <span className="text-sm font-medium text-emerald-700">{summary.name.charAt(0)}</span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{summary.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{summary.department}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{summary.totalDays}일</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{summary.presentDays}일</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{summary.absentDays}일</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{summary.lateDays}일</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          {summary.overtimeHours}시간
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">{Math.round((summary.presentDays / summary.totalDays) * 100)}%</span>
                            <div className="h-2 w-16 rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-emerald-600"
                                style={{
                                  width: `${(summary.presentDays / summary.totalDays) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
