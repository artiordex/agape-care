'use client';

import React from 'react';
import clsx from 'clsx';

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

interface Props {
  readonly records: AttendanceRecord[];
}

/**
 * [Component] 일일 직원 출퇴근 상세 기록 테이블
 * 직각형 UI 및 아가페 그린(#5C8D5A) 테마 적용
 */
export default function DailyAttendanceTable({ records }: Props) {
  return (
    <div className="border border-gray-300 bg-white font-sans antialiased shadow-sm">
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b border-gray-200 bg-[#f8fafc] text-[10px] font-black uppercase tracking-tighter text-gray-400">
            <tr>
              <th className="px-6 py-4">직원 명세 (Employee)</th>
              <th className="px-6 py-4">소속/직책</th>
              <th className="px-6 py-4 text-center">출근 시간</th>
              <th className="px-6 py-4 text-center">퇴근 시간</th>
              <th className="px-6 py-4 text-center">실근무</th>
              <th className="px-6 py-4 text-center">연장근무</th>
              <th className="px-6 py-4 text-center">근태상태</th>
              <th className="px-6 py-4 text-right">기록관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px]">
            {records.map(record => (
              <tr key={record.id} className="group transition-colors hover:bg-emerald-50/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* 직각형 아바타 */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-emerald-200 bg-emerald-100 font-black text-[#5C8D5A]">
                      {record.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black tracking-tight text-gray-900">{record.name}</p>
                      <p className="font-mono text-[10px] font-bold text-gray-400">EMP-00{record.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">{record.department}</span>
                    <span className="text-[10px] text-gray-400">{record.position}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-mono font-black text-gray-800">
                  {record.checkIn || '--:--'}
                </td>
                <td className="px-6 py-4 text-center font-mono font-black text-gray-800">
                  {record.checkOut || '--:--'}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-mono font-bold text-gray-600">{record.workHours}h</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={clsx('font-mono font-black', record.overtime > 0 ? 'text-orange-600' : 'text-gray-300')}
                  >
                    +{record.overtime}h
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {/* 직각형 상태 배지 */}
                  <span
                    className={clsx(
                      'inline-block border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest',
                      record.status === '정상출근'
                        ? 'border-emerald-100 bg-emerald-50 text-[#5C8D5A]'
                        : 'border-red-100 bg-red-50 text-red-600',
                    )}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="bg-gray-100 px-3 py-1.5 text-[11px] font-black text-gray-500 transition-all hover:bg-[#5C8D5A] hover:text-white">
                      수정
                    </button>
                    <button className="bg-gray-100 px-3 py-1.5 text-[11px] font-black text-gray-500 transition-all hover:bg-red-600 hover:text-white">
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
