'use client';

import React from 'react';

interface Props {
  settings: {
    serviceName: string;
    serviceDesc: string;
    contactPhone: string;
    contactEmail: string;
    customerHours: string;
    metaTitle: string;
    metaDescription: string;
    footerText: string;
  };
}

/**
 * [Sidebar] 사이트 설정 실시간 프리뷰
 * 검색 엔진 노출 시뮬레이터 및 서비스 프로필 요약
 */
export default function SettingsPreview({ settings }: Props) {
  return (
    <aside className="animate-in fade-in slide-in-from-right-4 sticky top-6 space-y-3 text-[11px] duration-500">
      {/* 1. 검색 엔진 노출 프리뷰 (SEO Simulator) */}
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <p className="border-l-3 mb-3 border-[#1a5a96] pl-2 text-[10px] font-black uppercase tracking-tighter text-gray-400">
          Search Engine Preview
        </p>
        <div className="space-y-1 rounded border border-gray-100 bg-gray-50/50 p-3">
          <p className="text-[10px] font-medium text-gray-500">https://agape-care.com/...</p>
          <h3 className="line-clamp-1 cursor-pointer text-[14px] font-bold text-[#1a0dab] hover:underline">
            {settings.metaTitle || '설정된 제목이 없습니다.'}
          </h3>
          <p className="line-clamp-2 text-[11px] leading-relaxed text-[#4d5156]">
            {settings.metaDescription || '검색 결과에 노출될 설명을 입력해 주세요.'}
          </p>
        </div>
        <p className="mt-2 text-[9px] font-medium italic text-gray-400">
          * 실제 검색 엔진의 노출 방식과는 차이가 있을 수 있습니다.
        </p>
      </div>

      {/* 2. 서비스 프로필 요약 */}
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <p className="border-l-3 mb-3 border-[#1a5a96] pl-2 text-[10px] font-black uppercase tracking-tighter text-gray-400">
          Service Identity
        </p>
        <div className="space-y-3">
          <div>
            <p className="mb-0.5 text-[9px] font-bold text-gray-400">서비스 명칭</p>
            <p className="text-[13px] font-black tracking-tight text-gray-800">{settings.serviceName}</p>
          </div>
          <div>
            <p className="mb-0.5 text-[9px] font-bold text-gray-400">한 줄 설명</p>
            <p className="font-medium leading-relaxed text-gray-600">{settings.serviceDesc}</p>
          </div>
        </div>
      </div>

      {/* 3. 고객 소통 정보 */}
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <p className="border-l-3 mb-3 border-[#1a5a96] pl-2 text-[10px] font-black uppercase tracking-tighter text-gray-400">
          Customer Support
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-400">대표번호</span>
            <span className="font-mono font-black text-gray-800">{settings.contactPhone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-400">이메일</span>
            <span className="font-medium text-blue-600 underline">{settings.contactEmail}</span>
          </div>
          <div className="mt-2 border-t border-gray-50 pt-2">
            <p className="mb-1 text-[9px] font-bold text-gray-400">운영시간 가이드</p>
            <p className="font-bold text-gray-600">{settings.customerHours}</p>
          </div>
        </div>
      </div>

      {/* 4. 하단 카피라이트 미리보기 */}
      <div className="rounded-lg border border-[#1a5a96] bg-[#1a5a96] p-4 text-white shadow-md">
        <p className="mb-2 border-l-2 border-white/50 pl-2 text-[10px] font-black uppercase tracking-tighter opacity-80">
          Footer Copyright
        </p>
        <p className="font-mono text-[10px] leading-relaxed opacity-90">
          {settings.footerText || '© 2026 Agape-Care. All rights reserved.'}
        </p>
      </div>
    </aside>
  );
}
