'use client';

import React from 'react';

interface AddressInfo {
  zip: string;
  addr1: string;
  addr2: string;
}

interface Props {
  value: AddressInfo;
  onChange: (next: AddressInfo) => void;
}

/**
 * [Section] 주소 정보 설정
 * 우편번호 검색 및 격자형 주소 입력 UI
 */
export default function AddressSection({ value, onChange }: Props) {
  const update = (updates: Partial<AddressInfo>) => onChange({ ...value, ...updates });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#1a5a96]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">Location & Address</h3>
      </div>

      <div className="p-0">
        {/* 우편번호 행 */}
        <div className="border-b border-gray-200">
          <InputRow label="우편번호">
            <div className="flex items-center gap-2">
              <input
                value={value.zip}
                onChange={e => update({ zip: e.target.value })}
                placeholder="00000"
                className="w-20 bg-transparent font-mono font-bold text-blue-600 outline-none"
              />
              <button
                type="button"
                className="rounded-sm border border-gray-300 bg-white px-3 py-1 text-[10px] font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
              >
                주소 검색
              </button>
            </div>
          </InputRow>
        </div>

        {/* 기본 주소 행 */}
        <div className="border-b border-gray-200">
          <InputRow label="기본주소" required full>
            <input
              value={value.addr1}
              onChange={e => update({ addr1: e.target.value })}
              placeholder="도로명 주소 또는 지번 주소를 입력하세요."
              className="w-full bg-transparent font-bold text-gray-800 outline-none"
            />
          </InputRow>
        </div>

        {/* 상세 주소 행 */}
        <InputRow label="상세주소" full>
          <input
            value={value.addr2}
            onChange={e => update({ addr2: e.target.value })}
            placeholder="동, 호수, 층 등 나머지 상세 주소를 입력하세요."
            className="w-full bg-transparent font-medium text-gray-600 outline-none"
          />
        </InputRow>
      </div>
    </div>
  );
}

/** 내부 컴포넌트: 격자형 입력 행 (기존 BasicInfoSection과 동일) */
function InputRow({ label, children, required, full }: any) {
  return (
    <div className={`flex border-r border-gray-200 last:border-r-0 ${full ? 'md:col-span-2' : ''} group`}>
      <div className="flex w-28 shrink-0 items-center border-r border-gray-100 bg-[#f8fafc] px-3 py-2.5 text-[10px] font-black text-gray-500 transition-colors group-hover:bg-blue-50/50">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-center bg-white p-2 transition-colors group-hover:bg-blue-50/10">
        {children}
      </div>
    </div>
  );
}
