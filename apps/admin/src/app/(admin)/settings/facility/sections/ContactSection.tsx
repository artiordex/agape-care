'use client';

import React from 'react';

export interface ContactInfo {
  phone: string;
  fax: string;
  email: string;
  homepage: string;
}

interface Props {
  value: ContactInfo;
  onChange: (next: ContactInfo) => void;
}

/**
 * [Section] 연락처 및 채널 정보 설정
 * 아이콘 기반의 고밀도 채널 입력 UI
 */
export default function ContactSection({ value, onChange }: Props) {
  const set = (field: keyof ContactInfo, v: string) => onChange({ ...value, [field]: v });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#1a5a96]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">Contact Channels</h3>
      </div>

      <div className="p-0">
        <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
          <InputRow label="대표 전화번호" required>
            <div className="flex w-full items-center gap-2">
              <i className="ri-phone-line text-gray-400"></i>
              <input
                value={value.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="02-1234-5678"
                className="w-full bg-transparent font-mono font-black text-[#1a5a96] outline-none"
              />
            </div>
          </InputRow>
          <InputRow label="팩스번호">
            <div className="flex w-full items-center gap-2">
              <i className="ri-printer-line text-gray-400"></i>
              <input
                value={value.fax}
                onChange={e => set('fax', e.target.value)}
                placeholder="02-1234-5679"
                className="w-full bg-transparent font-mono outline-none"
              />
            </div>
          </InputRow>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <InputRow label="이메일 주소">
            <div className="flex w-full items-center gap-2">
              <i className="ri-mail-line text-gray-400"></i>
              <input
                type="email"
                value={value.email}
                onChange={e => set('email', e.target.value)}
                placeholder="info@facility.com"
                className="w-full bg-transparent font-medium outline-none"
              />
            </div>
          </InputRow>
          <InputRow label="홈페이지">
            <div className="flex w-full items-center gap-2">
              <i className="ri-global-line text-gray-400"></i>
              <input
                value={value.homepage}
                onChange={e => set('homepage', e.target.value)}
                placeholder="https://"
                className="w-full bg-transparent font-medium text-blue-600 outline-none"
              />
            </div>
          </InputRow>
        </div>
      </div>
    </div>
  );
}

/** * 내부 컴포넌트: 격자형 입력 행
 * (Tip: 여러 파일에서 쓰인다면 components/UI/InputRow.tsx 등으로 분리하는 것이 좋습니다)
 */
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
