/**
 * Description : CopaymentTab.tsx - 📌 본인부담금 관리 (데이터 연동 및 입금 처리 모달 연결)
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import DepositProcessingModal from './modals/DepositProcessingModal';

// --- 데이터 인터페이스 ---
interface BillingRecord {
  id: number;
  month: string;
  amount: number;
  paid: number;
  unpaid: number;
}

export default function CopaymentTab() {
  const [selectedYear, setSelectedYear] = useState('2026');

  // 📌 1. 모달 표시 상태 추가 (이 부분이 누락되면 에러가 발생합니다)
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);

  // 📌 2. 이미지 기반 데이터 반영
  const billingData: BillingRecord[] = [{ id: 1, month: '2026년 01월', amount: 191690, paid: 0, unpaid: 191690 }];
  const depositData: any[] = []; // 데이터가 없는 상태

  const FIXED_ROWS = 15; // 이미지의 여백 비율을 유지하기 위한 고정 행 수

  // --- 스타일 클래스 ---
  const thClass = 'bg-[#E8F1F8] border border-[#B8D1E0] px-2 py-1.5 text-center text-[12px] font-bold text-[#2E6A9E]';
  const tdClass = 'border border-[#B8D1E0] px-3 py-2 text-[12px] text-gray-900 bg-white text-center h-[38px]';
  const emptyTdClass = 'border border-[#B8D1E0] bg-white h-[38px]';

  return (
    <div className="flex flex-col gap-3 font-sans antialiased">
      {/* 연도 필터 */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex gap-1">
          {['2026', '2025', '2024'].map(y => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={clsx(
                'rounded border px-4 py-1 text-[12px] font-bold transition-all',
                selectedYear === y
                  ? 'border-[#468db3] bg-[#57A5CE] text-white'
                  : 'border-gray-300 bg-white text-gray-500',
              )}
            >
              {y}년
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 좌측: 부담금 청구이력 섹션 */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-[13px] font-black text-[#2E6A9E]">
            <i className="ri-play-fill"></i> 부담금 청구이력
          </div>
          <table className="w-full table-fixed border-collapse border border-t-2 border-[#B8D1E0] border-t-[#57A5CE]">
            <thead>
              <tr className="bg-[#E8F1F8] font-bold">
                <th className="w-10 border border-[#B8D1E0]">
                  <input type="checkbox" />
                </th>
                <th className="w-12 border border-[#B8D1E0]">연번</th>
                <th className="border border-[#B8D1E0]">급여제공월</th>
                <th className="border border-[#B8D1E0]">청구금액</th>
                <th className="border border-[#B8D1E0]">입금액</th>
                <th className="border border-[#B8D1E0]">미납액</th>
              </tr>
            </thead>
            <tbody>
              {/* 데이터가 있는 행 */}
              {billingData.map((item, idx) => (
                <tr key={item.id} className="bg-[#DCF2D8]">
                  <td className={tdClass}>
                    <input type="checkbox" defaultChecked />
                  </td>
                  <td className={tdClass}>{idx + 1}</td>
                  <td className={tdClass}>{item.month}</td>
                  <td className={tdClass}>{item.amount.toLocaleString()}</td>
                  <td className={tdClass}>{item.paid}</td>
                  <td className={clsx(tdClass, 'font-black text-red-600')}>{item.unpaid.toLocaleString()}</td>
                </tr>
              ))}
              {/* 나머지 빈 행 공간 */}
              {Array.from({ length: Math.max(0, FIXED_ROWS - billingData.length) }).map((_, i) => (
                <tr key={`empty-bill-${i}`}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className={emptyTdClass}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mx-auto mt-2 rounded bg-[#7A8B9A] px-6 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#647481] active:scale-95">
            급여비용 명세서 출력
          </button>
        </section>

        {/* 우측: 부담금 입금내역 섹션 */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-[13px] font-black text-[#2E6A9E]">
            <i className="ri-play-fill"></i> 부담금 입금내역
          </div>
          <div className="relative border-t-2 border-t-[#57A5CE]">
            {/* 데이터가 없을 때 표시되는 여백 안내 문구 */}
            {depositData.length === 0 && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-8 text-[13px] italic text-gray-400">
                조회된 입금내역이 없습니다.
              </div>
            )}
            <table className="w-full table-fixed border-collapse border border-[#B8D1E0]">
              <thead>
                <tr className="bg-[#E8F1F8]">
                  <th className="w-12 border border-[#B8D1E0] py-2 text-[12px] font-bold text-[#2E6A9E]">연번</th>
                  <th className="border border-[#B8D1E0] text-[12px] font-bold text-[#2E6A9E]">입금일</th>
                  <th className="border border-[#B8D1E0] text-[12px] font-bold text-[#2E6A9E]">입금액</th>
                  <th className="border border-[#B8D1E0] text-[12px] font-bold text-[#2E6A9E]">입금자</th>
                  <th className="border border-[#B8D1E0] text-[12px] font-bold text-[#2E6A9E]">영수증</th>
                  <th className="border border-[#B8D1E0] text-[12px] font-bold text-[#2E6A9E]">적용내역</th>
                </tr>
              </thead>
              <tbody>
                {/* 데이터가 없어도 고정된 격자(여백)를 유지 */}
                {Array.from({ length: FIXED_ROWS }).map((_, i) => (
                  <tr key={`empty-dep-${i}`}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className={emptyTdClass}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setDepositModalOpen(true)}
            className="mx-auto mt-2 rounded bg-gradient-to-b from-[#57A5CE] to-[#2E6A9E] px-10 py-2 text-[12px] font-black text-white shadow-md transition-all hover:brightness-105 active:scale-95"
          >
            입금 처리
          </button>
        </section>
      </div>

      {/* 📌 입금 처리 모달 컴포넌트 연결 */}
      <DepositProcessingModal isOpen={isDepositModalOpen} onClose={() => setDepositModalOpen(false)} />
    </div>
  );
}
