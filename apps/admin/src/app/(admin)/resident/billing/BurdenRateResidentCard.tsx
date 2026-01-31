'use client';

import React from 'react';
import clsx from 'clsx';

interface Resident {
  id: string;
  name: string;
  birth: string;
  age: number;
  admissionDate: string;
}

interface CurrentRate {
  rateName: string;
  rate: number;
}

interface Props {
  readonly resident: Resident;
  readonly currentRate: CurrentRate | null;
}

/**
 * [Component] 입소자 본인부담 자격 정보 카드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세서 스타일
 */
export default function BurdenRateResidentCard({ resident, currentRate }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white font-sans antialiased shadow-sm transition-all hover:shadow-md">
      {/* 카드 상단 헤더: 섹션 타이틀 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 rounded-full bg-[#5C8D5A]"></div>
          <h3 className="text-[12px] font-black uppercase tracking-tight text-gray-800">수급자 자격 정보 요약</h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Resident Status Board</span>
      </div>

      {/* 카드 본문: 4분할 격자 정보창 */}
      <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-4 md:divide-x md:divide-y-0">
        {/* 1. 수급자 성함 */}
        <div className="flex flex-col justify-center p-5">
          <label className="mb-1 text-[10px] font-black uppercase italic tracking-tighter text-gray-400">
            Beneficiary Name
          </label>
          <div className="flex items-baseline gap-1.5">
            <p className="text-lg font-black leading-none text-gray-900">{resident.name}</p>
            <span className="text-[11px] font-bold text-gray-400">어르신</span>
          </div>
        </div>

        {/* 2. 생년월일 및 연령 */}
        <div className="flex flex-col justify-center p-5">
          <label className="mb-1 text-[10px] font-black uppercase tracking-tighter text-gray-400">Birth / Age</label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] font-bold text-gray-700">{resident.birth}</span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-500">
              만 {resident.age}세
            </span>
          </div>
        </div>

        {/* 3. 입소 일자 */}
        <div className="flex flex-col justify-center p-5">
          <label className="mb-1 text-[10px] font-black uppercase tracking-tighter text-gray-400">Admission Date</label>
          <div className="flex items-center gap-2 text-[#5C8D5A]">
            <i className="ri-calendar-check-line text-lg"></i>
            <p className="font-mono text-[13px] font-black">{resident.admissionDate}</p>
          </div>
        </div>

        {/* 4. 현재 적용 부담률 (강조 영역) */}
        <div className="flex flex-col justify-center border-l border-[#5C8D5A]/10 bg-emerald-50/30 p-5">
          <label className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#5C8D5A]">
            Active Co-payment Rate
          </label>
          <div className="flex items-center justify-between">
            <span
              className={clsx(
                'rounded-sm border px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter shadow-sm',
                currentRate ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white' : 'border-gray-200 bg-gray-100 text-gray-400',
              )}
            >
              {currentRate?.rateName ?? '미등록 상태'}
            </span>
            {currentRate && (
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black leading-none text-[#5C8D5A]">{currentRate.rate}</span>
                <span className="text-[12px] font-black text-[#5C8D5A]">%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
