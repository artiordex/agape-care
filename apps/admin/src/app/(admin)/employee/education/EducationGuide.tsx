'use client';

import React from 'react';

/**
 * [Component] 법정 필수 교육 및 훈련 주기 안내 섹션
 * 아가페 그린(#5C8D5A) 테마 및 직각형 카드 그리드 적용
 */
export default function EducationGuide() {
  const educationTypes = [
    { label: '노인인권 및 학대예방', frequency: '연 1회 필수', color: 'border-red-200 bg-red-50 text-red-700' },
    { label: '직원인권 침해대응', frequency: '연 1회 권고', color: 'border-orange-200 bg-orange-50 text-orange-700' },
    {
      label: '재난상황 대응훈련',
      frequency: '반기 1회 필수',
      color: 'border-emerald-200 bg-emerald-50 text-[#5C8D5A]',
    },
    { label: '종사자 역량강화', frequency: '연 1회 이상', color: 'border-blue-200 bg-blue-50 text-blue-700' },
    { label: '장기요양 법정교육', frequency: '연 1회 필수', color: 'border-purple-200 bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="rounded-none border border-gray-300 bg-white p-6 font-sans antialiased shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-information-fill text-lg text-[#5C8D5A]"></i>
          <h3 className="text-[13px] font-black uppercase tracking-tight text-gray-800">
            법정 필수 교육 이수 가이드라인
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
          Compliance Protocol v4.2
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {educationTypes.map((type, index) => (
          <div key={index} className={`rounded-none border p-4 transition-all hover:shadow-md ${type.color}`}>
            <div className="mb-1 text-[10px] font-black uppercase tracking-tighter opacity-70">{type.frequency}</div>
            <div className="text-[12px] font-black leading-tight">{type.label}</div>
            {/* 직각형 장식 요소 */}
            <div className="mt-3 h-0.5 w-4 bg-current opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-gray-400">
        <i className="ri-error-warning-line"></i>
        <span>모든 교육 기록은 장기요양기관 평가 지표에 따라 증빙 자료(사진, 서명부)가 첨부되어야 합니다.</span>
      </div>
    </div>
  );
}
