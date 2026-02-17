'use client';

import React from 'react';

interface MonthlyAttendanceSummary {
  name: string;
  department: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  overtimeHours: number;
}

interface Props {
  readonly summaryData: MonthlyAttendanceSummary[];
}

/**
 * [Component] 월간 누적 근태 현황 및 출근율 분석 테이블
 * 직각형 UI 및 고밀도 통계 레이아웃 적용
 */
export default function MonthlyAttendanceTable({ summaryData }: Props) {
  return (
    <div className="border border-gray-300 bg-white font-sans antialiased shadow-sm">
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b border-gray-200 bg-[#f8fafc] text-[10px] font-black uppercase tracking-tighter text-gray-400">
            <tr>
              <th className="px-6 py-4">직원 명세</th>
              <th className="px-6 py-4 text-center">총 근무일</th>
              <th className="px-6 py-4 text-center">실제 출근</th>
              <th className="px-6 py-4 text-center">결근/지각</th>
              <th className="px-6 py-4 text-center">월 누적 연장</th>
              <th className="px-6 py-4">월간 출근율 (Rate)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px]">
            {summaryData.map((summary, index) => {
              const attendanceRate = Math.round((summary.presentDays / summary.totalDays) * 100);

              return (
                <tr key={index} className="group transition-colors hover:bg-emerald-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 bg-gray-100 font-black text-gray-400">
                        {summary.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900">{summary.name}</p>
                        <p className="text-[10px] font-bold uppercase italic text-[#5C8D5A]">{summary.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-gray-500">{summary.totalDays}일</td>
                  <td className="px-6 py-4 text-center font-mono font-black text-gray-800">{summary.presentDays}일</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 font-mono">
                      <span className="font-black text-red-500">{summary.absentDays}</span>
                      <span className="text-gray-200">/</span>
                      <span className="font-black text-orange-500">{summary.lateDays}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="border border-emerald-100 bg-emerald-50 px-2 py-1 font-mono font-black text-[#5C8D5A]">
                      {summary.overtimeHours}h
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span className="w-10 text-right font-mono font-black text-gray-700">{attendanceRate}%</span>
                      {/* 직각형 프로그래스 바 */}
                      <div className="h-4 flex-1 border border-gray-200 bg-gray-100">
                        <div
                          className="h-full bg-[#5C8D5A] transition-all"
                          style={{ width: `${attendanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
