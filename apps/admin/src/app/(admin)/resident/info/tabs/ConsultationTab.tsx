/**
 * Description : ConsultationTab.tsx - 📊 케어포 스타일 상담일지 목록 및 작성 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import ConsultationModal from './modals/ConsultationModal';

export default function ConsultationTab() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const years = ['2026', '2025', '2024', '2023', '2022', '2021'];

  // 테이블 헤더 스타일
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900 text-center bg-white';

  return (
    <div className="flex flex-col gap-3 bg-white p-4 font-sans antialiased">
      {/* 1. 상단 연도 선택 바 */}
      <div className="mb-1 flex gap-1">
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={clsx(
              'rounded border px-4 py-1 text-[12px] font-bold shadow-sm transition-all',
              selectedYear === year
                ? 'border-[#468db3] bg-[#57A5CE] text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50',
            )}
          >
            {year}년
          </button>
        ))}
      </div>

      {/* 2. 상담일지 목록 테이블 (image_74f04d.png 재현) */}
      <div className="overflow-x-auto border-t-2 border-[#57A5CE]">
        <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
          <thead>
            <tr className="bg-[#E8F1F8]">
              <th className={clsx(thClass, 'w-10')}>
                <input type="checkbox" />
              </th>
              <th className={clsx(thClass, 'w-12')}>연번</th>
              <th className={thClass}>상담일</th>
              <th className={thClass}>상담시간</th>
              <th className={thClass}>상담대상</th>
              <th className={thClass}>관계</th>
              <th className={thClass}>상담방법</th>
              <th className={thClass}>상담자</th>
              <th className={clsx(thClass, 'w-16')}>조회</th>
            </tr>
          </thead>
          <tbody>
            <tr className="transition-colors hover:bg-blue-50">
              <td className={tdClass}>
                <input type="checkbox" />
              </td>
              <td className={tdClass}>1</td>
              <td className={tdClass}>2026.01.26</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>123</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>최인경</td>
              <td className={tdClass}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded bg-[#57A5CE] px-2 py-0.5 text-[11px] text-white shadow-inner hover:bg-[#468db3]"
                >
                  조회
                </button>
              </td>
            </tr>
            {/* 데이터가 없을 경우를 위한 빈 행들 */}
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="h-9">
                {Array.from({ length: 9 }).map((_, j) => (
                  <td key={j} className="border border-[#B8D1E0] bg-white"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. 하단 액션 버튼 바 */}
      <div className="mt-4 flex justify-center gap-1.5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-sm bg-[#57A5CE] px-5 py-2 text-[13px] font-black text-white shadow-md hover:bg-[#468db3] active:scale-95"
        >
          상담일지 신규작성
        </button>
        <button className="rounded-sm bg-[#7A8B9A] px-5 py-2 text-[13px] font-black text-white shadow-md hover:bg-[#647481]">
          상담일지 출력
        </button>
      </div>

      {/* 상담 작성 모달 */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
