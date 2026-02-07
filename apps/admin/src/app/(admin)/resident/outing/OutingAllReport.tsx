/**
 * Description : OutingMonthlyReport.tsx - 📊 이미지(image_8205c3.png) 기반 수급자 외출·외박 목록
 */

'use client';

import React from 'react';
import clsx from 'clsx';

export default function OutingMonthlyReport() {
  // 📌 하드코딩된 데이터 한 줄 (이미지 첫 번째 데이터 기준)
  const reportData = [
    {
      no: 1,
      outingDate: '2026.01.05',
      outingTime: '09:00',
      returnDate: '2026.01.08',
      returnTime: '18:00',
      stayDays: '3일',
      type: '외박',
      resident: '박민숙',
      gender: '여',
      birth: '1937.09.10',
      purpose: 'ㄴㄴㄴ',
      destination: 'ㅁㅁ',
      guardian: '이간호(직원동행)',
      writer: '최인경',
    },
  ];

  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-1 py-2 text-center text-[11px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-1 py-1.5 text-[11px] text-gray-900 bg-white text-center h-[35px]';

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden bg-white p-4">
      <div className="flex items-center gap-1 text-[14px] font-black text-[#2E6A9E]">
        <i className="ri-play-fill"></i> 수급자 외출·외박 목록
      </div>

      {/* 상단 필터 바 (이미지 8205c3.png 상단부 재현) */}
      <div className="flex items-center justify-center gap-4 rounded-sm border border-[#B8D1E0] bg-[#E8F1F8] p-2">
        <div className="flex items-center gap-1 text-[12px] font-bold">
          외출·외박일 : <input type="date" defaultValue="2026-01-06" className="border px-1" /> ~{' '}
          <input type="date" defaultValue="2026-02-06" className="border px-1" />
        </div>
        <div className="text-[12px] font-bold">
          수급자 : <input type="text" value="모든 수급자" className="w-32 border px-2" readOnly />
        </div>
        <div className="text-[12px] font-bold">
          구분 :{' '}
          <select className="border px-1">
            <option>전체</option>
          </select>
        </div>
        <button className="rounded bg-[#7A8B9A] px-4 py-0.5 text-[12px] font-black text-white shadow-sm">조회</button>
      </div>

      {/* 리포트 테이블 */}
      <div className="flex-1 overflow-auto border-t-2 border-[#57A5CE]">
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr>
              <th className={clsx(thClass, 'w-10')}>연번</th>
              <th className={thClass}>외출·외박일</th>
              <th className={thClass}>시간</th>
              <th className={thClass}>복귀일</th>
              <th className={thClass}>시간</th>
              <th className={thClass}>외박일수</th>
              <th className={thClass}>구분</th>
              <th className={thClass}>수급자명</th>
              <th className={thClass}>성별</th>
              <th className={thClass}>생년월일</th>
              <th className={thClass}>목적</th>
              <th className={thClass}>행선지</th>
              <th className={thClass}>보호자(관계, 연락처)</th>
              <th className={thClass}>작성자</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map(row => (
              <tr key={row.no} className="hover:bg-blue-50/50">
                <td className={tdClass}>{row.no}</td>
                <td className={clsx(tdClass, 'bg-[#DCF2D8] font-bold')}>{row.outingDate}</td>
                <td className={clsx(tdClass, 'bg-[#DCF2D8] font-bold text-emerald-700')}>{row.outingTime}</td>
                <td className={clsx(tdClass, 'bg-[#DCF2D8] font-bold')}>{row.returnDate}</td>
                <td className={clsx(tdClass, 'bg-[#DCF2D8] font-bold text-emerald-700')}>{row.returnTime}</td>
                <td className={clsx(tdClass, 'bg-[#DCF2D8] font-bold text-emerald-700')}>{row.stayDays}</td>
                <td className={tdClass}>{row.type}</td>
                <td className={tdClass}>{row.resident}</td>
                <td className={tdClass}>{row.gender}</td>
                <td className={tdClass}>{row.birth}</td>
                <td className={tdClass}>{row.purpose}</td>
                <td className={tdClass}>{row.destination}</td>
                <td className={tdClass}>{row.guardian}</td>
                <td className={tdClass}>{row.writer}</td>
              </tr>
            ))}
            {/* 고정 여백 유지를 위한 빈 행 */}
            {Array.from({ length: 14 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={14} className="h-[35px] border border-[#B8D1E0] bg-white"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 하단 통계 및 버튼 (이미지 하단부 재현) */}
      <div className="flex items-center justify-between border border-[#B8D1E0] bg-[#F8FAFC] p-2">
        <div className="text-[13px] font-black text-gray-700">
          전체 : 1건{' '}
          <span className="ml-2 text-[11px] font-normal text-gray-400">
            ▸ 외출 : 0건 ▸ 외박 : 1건 ▸ 외박중취소 : 0건
          </span>
        </div>
        <div className="flex gap-1.5">
          <button className="rounded bg-[#7A8B9A] px-6 py-1.5 text-[12px] font-black text-white shadow-sm">출력</button>
          <button className="rounded bg-[#7A8B9A] px-6 py-1.5 text-[12px] font-black text-white shadow-sm">
            외출·외박 현황 출력
          </button>
        </div>
      </div>
    </div>
  );
}
