'use client';

import React from 'react';

interface ServiceData {
  serviceName: string;
  customerHours: string;
  contactPhone: string;
  contactEmail: string;
  serviceDesc: string;
}

interface Props {
  readonly value: ServiceData;
  readonly onChange: (next: ServiceData) => void;
}

/**
 * [Section] 서비스 기본 정보 설정
 * Agape-Care ERP 표준 격자 레이아웃 적용
 */
export default function ServiceSection({ value, onChange }: Props) {
  const set = (field: keyof ServiceData, v: string) => onChange({ ...value, [field]: v });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#1a5a96]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">Service Core Information</h3>
      </div>

      {/* 격자형 입력 폼 */}
      <div className="p-0">
        <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
          <InputRow label="서비스 노출명" required>
            <input
              value={value.serviceName}
              onChange={e => set('serviceName', e.target.value)}
              placeholder="예: 아가페케어 요양센터"
              className="w-full bg-transparent font-black text-gray-900 outline-none placeholder:text-gray-300"
            />
          </InputRow>
          <InputRow label="운영시간 가이드">
            <input
              value={value.customerHours}
              onChange={e => set('customerHours', e.target.value)}
              placeholder="예: 평일 09:00 ~ 18:00 (주말 휴무)"
              className="w-full bg-transparent font-bold text-[#1a5a96] outline-none"
            />
          </InputRow>
        </div>

        <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
          <InputRow label="대표 전화번호" required>
            <div className="flex w-full items-center gap-2">
              <i className="ri-customer-service-2-line text-gray-400"></i>
              <input
                value={value.contactPhone}
                onChange={e => set('contactPhone', e.target.value)}
                placeholder="02-1234-5678"
                className="w-full bg-transparent font-mono font-bold outline-none"
              />
            </div>
          </InputRow>
          <InputRow label="대표 이메일">
            <div className="flex w-full items-center gap-2">
              <i className="ri-mail-send-line text-gray-400"></i>
              <input
                type="email"
                value={value.contactEmail}
                onChange={e => set('contactEmail', e.target.value)}
                placeholder="help@agape-care.com"
                className="w-full bg-transparent font-medium outline-none"
              />
            </div>
          </InputRow>
        </div>

        <div className="border-b border-gray-200">
          <InputRow label="서비스 한 줄 설명" full>
            <input
              value={value.serviceDesc}
              onChange={e => set('serviceDesc', e.target.value)}
              placeholder="홈페이지 메인 및 메타 태그에 활용될 서비스 설명을 입력하세요."
              className="w-full bg-transparent text-gray-600 outline-none"
            />
          </InputRow>
        </div>
      </div>
    </div>
  );
}

/** 내부 컴포넌트: 격자형 입력 행 */
function InputRow({ label, children, required, full }: any) {
  return (
    <div className={`flex border-r border-gray-200 last:border-r-0 ${full ? 'md:col-span-2' : ''} group`}>
      <div className="flex w-28 shrink-0 items-center border-r border-gray-100 bg-[#f8fafc] px-3 py-2.5 text-[10px] font-black uppercase tracking-tighter text-gray-500 transition-colors group-hover:bg-blue-50/50">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-center bg-white p-2 transition-colors group-hover:bg-blue-50/10">
        {children}
      </div>
    </div>
  );
}
