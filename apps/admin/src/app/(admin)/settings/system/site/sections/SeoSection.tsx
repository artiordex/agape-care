'use client';

import React from 'react';

interface SeoData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

interface Props {
  readonly value: SeoData;
  readonly onChange: (next: SeoData) => void;
}

/**
 * [Section] 검색 엔진 최적화 (SEO) 설정
 * 검색 로봇이 수집할 메타 태그 정보를 관리하는 고밀도 서식
 */
export default function SeoSection({ value, onChange }: Props) {
  const set = (field: keyof SeoData, v: string) => onChange({ ...value, [field]: v });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#1a5a96]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">Search Engine Optimization (SEO)</h3>
      </div>

      {/* 격자형 입력 폼 */}
      <div className="p-0">
        {/* 메타 제목 */}
        <div className="border-b border-gray-200">
          <InputRow label="메타 제목 (Title)" required full>
            <div className="flex w-full flex-col gap-1">
              <input
                value={value.metaTitle}
                onChange={e => set('metaTitle', e.target.value)}
                placeholder="검색 결과 상단에 노출될 제목을 입력하세요 (권장 15~30자)"
                className="w-full bg-transparent font-black text-[#1a5a96] outline-none placeholder:text-gray-300"
              />
              <p className="text-[9px] font-medium text-gray-400">
                브라우저 탭 및 검색 결과의 메인 제목으로 사용됩니다.
              </p>
            </div>
          </InputRow>
        </div>

        {/* 메타 설명 */}
        <div className="border-b border-gray-200">
          <InputRow label="메타 설명 (Description)" full>
            <div className="flex w-full flex-col gap-1 py-1">
              <textarea
                rows={3}
                value={value.metaDescription}
                onChange={e => set('metaDescription', e.target.value)}
                placeholder="검색 결과 제목 하단에 노출될 요약 문구를 입력하세요 (권장 70~150자)"
                className="w-full resize-none bg-transparent leading-relaxed text-gray-700 outline-none placeholder:text-gray-300"
              />
              <div className="flex justify-between border-t border-gray-50 pt-1 text-[9px] font-bold text-gray-400">
                <span>현재 글자 수: {value.metaDescription.length}자</span>
                <span>가장 중요한 키워드를 앞쪽에 배치하세요.</span>
              </div>
            </div>
          </InputRow>
        </div>

        {/* 메타 키워드 */}
        <InputRow label="메타 키워드 (Keywords)" full>
          <div className="flex w-full flex-col gap-1">
            <input
              value={value.metaKeywords}
              onChange={e => set('metaKeywords', e.target.value)}
              placeholder="쉼표(,)로 구분하여 핵심 단어를 입력하세요. (예: 요양원, 노인복지, 프리미엄케어)"
              className="w-full bg-transparent font-medium text-gray-800 outline-none placeholder:text-gray-300"
            />
            <p className="text-[9px] font-medium italic text-gray-400">
              내부 검색 및 검색 로봇의 수집 보조 자료로 활용됩니다.
            </p>
          </div>
        </InputRow>
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
      <div className="flex flex-1 items-start bg-white p-2 transition-colors group-hover:bg-blue-50/10">{children}</div>
    </div>
  );
}
