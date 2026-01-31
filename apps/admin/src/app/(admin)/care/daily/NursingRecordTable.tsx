'use client';

import React from 'react';
import clsx from 'clsx';

interface NursingRecord {
  date: string;
  time: string;
  bloodPressure: string;
  pulse: string;
  temperature: string;
  respiration: string;
  weight: string;
  memo: string;
  staff: string;
  editTime: string;
}

interface Props {
  readonly records: NursingRecord[];
}

/**
 * [Component] 간호 및 건강관리 누적 기록 그리드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세서 스타일 적용
 */
export default function NursingRecordTable({ records }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 테이블 섹션 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[13px] font-black uppercase tracking-tight text-gray-800">누적 간호 및 건강관리 기록</h3>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <span>Total Records: {records.length}</span>
          <span className="h-3 w-[1px] bg-gray-200"></span>
          <span>Sort: Latest First</span>
        </div>
      </div>

      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {/* 고밀도 테이블 헤더 */}
          <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
            <tr>
              <th className="px-4 py-3 text-center">No.</th>
              <th className="px-4 py-3">작성 일시</th>
              <th className="px-4 py-3 text-center">혈압 (BP)</th>
              <th className="px-4 py-3 text-center">맥박 (PR)</th>
              <th className="px-4 py-3 text-center">체온 (BT)</th>
              <th className="px-4 py-3 text-center">호흡 (RR)</th>
              <th className="px-4 py-3 text-center">체중 (BW)</th>
              <th className="px-4 py-3 text-center">간호(분)</th>
              <th className="px-4 py-3">특이사항 (Nursing Note)</th>
              <th className="px-4 py-3 text-center">담당자</th>
              <th className="px-4 py-3 text-right">제어</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-[12px]">
            {records.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <i className="ri-database-2-line mb-2 text-4xl text-gray-200"></i>
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                      해당 기간 내 누적된 간호 기록이 없습니다
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr key={index} className="group transition-colors hover:bg-emerald-50/30">
                  {/* 1. 연번 */}
                  <td className="px-4 py-4 text-center">
                    <span className="font-mono text-[10px] font-bold text-gray-300">
                      {String(index + 1).padStart(3, '0')}
                    </span>
                  </td>

                  {/* 2. 작성일 */}
                  <td className="px-4 py-4">
                    <span className="font-mono text-[11px] font-black leading-none text-gray-700">{record.date}</span>
                  </td>

                  {/* 3~7. 바이탈 수치 (Agape-Standard 컬러 적용) */}
                  <td className="px-4 py-4 text-center font-mono text-[12px] font-black text-gray-800">
                    {record.bloodPressure || '-'}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-[12px] font-black text-[#5C8D5A]">
                    {record.pulse || '-'}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-[12px] font-black text-orange-600">
                    {record.temperature ? `${record.temperature}℃` : '-'}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-[12px] font-black text-blue-600">
                    {record.respiration || '-'}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-[11px] font-bold text-gray-400">
                    {record.weight ? `${record.weight}kg` : '-'}
                  </td>

                  {/* 8. 간호 시간 */}
                  <td className="px-4 py-4 text-center">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-600">
                      {record.time}분
                    </span>
                  </td>

                  {/* 9. 특이사항 */}
                  <td className="px-4 py-4">
                    <p className="max-w-[200px] truncate text-[11px] font-medium text-gray-600" title={record.memo}>
                      {record.memo || '-'}
                    </p>
                  </td>

                  {/* 10. 담당자 */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-black leading-none text-gray-800">{record.staff}</span>
                      <span className="mt-1 text-[9px] font-bold uppercase tracking-tighter text-gray-300">Nurse</span>
                    </div>
                  </td>

                  {/* 11. 제어 액션 */}
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-400 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A]">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-400 transition-all hover:border-red-200 hover:text-red-500">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
