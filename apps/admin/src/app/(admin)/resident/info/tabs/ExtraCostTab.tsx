/**
 * Description : ExtraCostTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import ExtraCostModal from './modals/ExtraCostModal';

export default function ExtraCostTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState<'individual' | 'batch'>('individual');

  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-2 text-center text-[12px] font-bold text-gray-700';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900 text-center bg-white';

  return (
    <div className="flex flex-col gap-3 bg-white p-4 font-sans">
      {/* 상단 컨트롤 바 */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => setViewType('individual')}
            className={clsx(
              'rounded-t-md border px-4 py-1.5 text-[12px] font-bold transition-all',
              viewType === 'individual'
                ? 'border-[#468db3] bg-[#57A5CE] text-white'
                : 'border-gray-300 bg-gray-100 text-gray-600',
            )}
          >
            수급자별 내역
          </button>
          <button
            onClick={() => setViewType('batch')}
            className={clsx(
              'rounded-t-md border px-4 py-1.5 text-[12px] font-bold transition-all',
              viewType === 'batch'
                ? 'border-[#468db3] bg-[#57A5CE] text-white'
                : 'border-gray-300 bg-gray-100 text-gray-600',
            )}
          >
            항목별 일괄등록
          </button>
        </div>
        <div className="flex gap-2">
          <select className="rounded border border-gray-300 px-2 py-1 text-[12px]">
            <option>2026년 02월</option>
          </select>
          <button className="rounded bg-[#7A8B9A] px-3 py-1 text-[11px] font-bold text-white">엑셀 다운로드</button>
        </div>
      </div>

      {/* 비용 목록 테이블 */}
      <div className="overflow-x-auto border-t-2 border-[#57A5CE]">
        <table className="w-full border-collapse border border-[#B8D1E0]">
          <thead>
            <tr className="bg-[#E8F1F8]">
              <th className={clsx(thClass, 'w-10')}>
                <input type="checkbox" />
              </th>
              <th className={thClass}>성명</th>
              <th className={thClass}>생활실</th>
              <th className={thClass}>비급여 항목</th>
              <th className={thClass}>단가</th>
              <th className={thClass}>횟수/수량</th>
              <th className={thClass}>총 금액</th>
              <th className={thClass}>발생일자</th>
              <th className={thClass}>비고</th>
              <th className={clsx(thClass, 'w-16')}>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-50">
              <td className={tdClass}>
                <input type="checkbox" />
              </td>
              <td className={tdClass}>가나다</td>
              <td className={tdClass}>너와나</td>
              <td className={tdClass}>식재료비(석식)</td>
              <td className={tdClass}>3,500</td>
              <td className={tdClass}>25</td>
              <td className={tdClass}>87,500</td>
              <td className={tdClass}>2026-02-06</td>
              <td className={tdClass}>-</td>
              <td className={tdClass}>
                <button onClick={() => setIsModalOpen(true)} className="font-bold text-[#2E6A9E] hover:underline">
                  수정
                </button>
              </td>
            </tr>
            {/* 데이터 반복 생성 */}
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="h-10">
                {Array.from({ length: 10 }).map((_, j) => (
                  <td key={j} className="border border-[#B8D1E0] bg-white"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 하단 버튼 바 */}
      <div className="mt-2 flex justify-end gap-1.5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-[#57A5CE] px-6 py-2 text-[13px] font-black text-white shadow-md hover:bg-[#468db3]"
        >
          비급여 항목 등록
        </button>
        <button className="rounded bg-red-500 px-6 py-2 text-[13px] font-black text-white shadow-md hover:bg-red-600">
          선택 삭제
        </button>
      </div>

      <ExtraCostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
    
  );
}
