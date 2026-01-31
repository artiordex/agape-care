'use client';

import React from 'react';

interface FooterData {
  footerText: string;
  legalNotice: string;
}

interface Props {
  readonly value: FooterData;
  readonly onChange: (next: FooterData) => void;
}

/**
 * [Section] 푸터 및 법적 고지 설정
 * 하단 고정 정보 및 법적 문구를 관리하는 고밀도 텍스트 영역
 */
export default function FooterSection({ value, onChange }: Props) {
  const set = (field: keyof FooterData, v: string) => onChange({ ...value, [field]: v });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#1a5a96]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">Footer & Legal Disclaimer</h3>
      </div>

      {/* 격자형 입력 폼 */}
      <div className="p-0">
        {/* 하단 카피라이트 */}
        <div className="border-b border-gray-200">
          <InputRow label="하단 카피라이트" full>
            <div className="flex w-full flex-col gap-1 py-1">
              <textarea
                rows={2}
                value={value.footerText}
                onChange={e => set('footerText', e.target.value)}
                placeholder="© 2026 Agape-Care 요양센터. All rights reserved."
                className="w-full resize-none bg-transparent font-mono text-[10px] leading-relaxed text-[#1a5a96] outline-none placeholder:text-gray-300"
              />
              <p className="text-[9px] font-medium italic text-gray-400">
                홈페이지 최하단에 상시 노출되는 저작권 표기 문구입니다.
              </p>
            </div>
          </InputRow>
        </div>

        {/* 법적 고지 및 면책 문구 */}
        <InputRow label="법적 고지 문구" full>
          <div className="flex w-full flex-col gap-1 py-1">
            <textarea
              rows={4}
              value={value.legalNotice}
              onChange={e => set('legalNotice', e.target.value)}
              placeholder="본 홈페이지의 무단 전재 및 재배포를 금지하며, 이메일 주소 무단 수집 거부 등 법적 고지 내용을 입력하세요."
              className="w-full resize-none bg-transparent leading-relaxed text-gray-600 outline-none placeholder:text-gray-300"
            />
            <div className="flex justify-between border-t border-gray-50 pt-1 text-[9px] font-bold text-gray-400">
              <span>개인정보 처리방침과 별도로 노출되는 고지 사항입니다.</span>
            </div>
          </div>
        </InputRow>
      </div>
    </div>
  );
}

/** 내부 컴포넌트: 격자형 입력 행 (Agape-Standard) */
function InputRow({ label, children, required, full }: any) {
  return (
    <div className={`flex border-r border-gray-200 last:border-r-0 ${full ? 'md:col-span-2' : ''} group`}>
      <div className="flex w-28 shrink-0 items-center border-r border-gray-100 bg-[#f8fafc] px-3 py-2.5 text-[10px] font-black uppercase tracking-tighter text-gray-500 transition-colors group-hover:bg-blue-50/50">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-start bg-white p-2 transition-colors group-hover:bg-blue-50/10">{children}</div>
    </div>
  );
}
