'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import WeeklyWorkTemplate from './WeeklyWorkTemplate';
import RepeatWorkTemplate from './RepeatWorkTemplate';

/**
 * [Component] 근무 패턴 템플릿 통합 관리 허브
 * 주별/순환 반복 템플릿 모드 전환 및 직각형 카드 UI 적용
 */
export default function TemplateTab() {
  const [viewMode, setViewMode] = useState<'selection' | 'weekly' | 'repeat'>('selection');

  // 템플릿 선택 카드 데이터
  const templateTypes = [
    {
      id: 'weekly' as const,
      title: '주별 반복 템플릿',
      icon: 'ri-calendar-event-line',
      desc: '7일(월~일) 기준으로 고정 순환하는 주간 근무 패턴을 정의합니다.',
      color: 'border-indigo-500',
    },
    {
      id: 'repeat' as const,
      title: '순환 반복 템플릿',
      icon: 'ri-loop-right-line',
      desc: '주기와 관계없이 N일 단위로 무한 반복되는 근무 모델을 구축합니다.',
      color: 'border-purple-500',
    },
  ];

  return (
    <div className="font-sans text-gray-900 antialiased">
      {/* A. 템플릿 관리 헤더 */}
      <div className="mb-8 flex items-center justify-between border-b-2 border-gray-100 pb-4">
        <div>
          <h2 className="text-[18px] font-black uppercase tracking-tight">근무 패턴 프로토콜 라이브러리</h2>
          <p className="mt-1 text-[12px] font-bold italic text-gray-400">
            시설 운영에 최적화된 표준 근무 패턴을 사전에 정의하고 관리하십시오.
          </p>
        </div>
        {viewMode !== 'selection' && (
          <button
            onClick={() => setViewMode('selection')}
            className="flex items-center gap-2 rounded-none border border-gray-300 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-widest text-gray-400 transition-all hover:bg-gray-50 hover:text-[#5C8D5A]"
          >
            <i className="ri-arrow-left-line"></i>
            목록으로 돌아가기
          </button>
        )}
      </div>

      {/* B. 메인 컨텐츠 렌더링 영역 */}
      {viewMode === 'selection' ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {templateTypes.map(type => (
            <div
              key={type.id}
              onClick={() => setViewMode(type.id)}
              className={clsx(
                'group flex h-[300px] cursor-pointer flex-col justify-between rounded-none border-2 border-gray-100 bg-white p-8 transition-all hover:border-[#5C8D5A] hover:shadow-xl',
                `hover:${type.color.replace('border-', 'bg-').replace('-500', '-50/10')}`,
              )}
            >
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center bg-gray-50 text-3xl text-gray-400 transition-all group-hover:bg-emerald-50 group-hover:text-[#5C8D5A]">
                  <i className={type.icon}></i>
                </div>
                <h3 className="text-xl font-black tracking-tight">{type.title}</h3>
                <p className="mt-2 text-sm font-bold italic leading-relaxed text-gray-400">{type.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#5C8D5A]">
                <span>모듈 가동하기</span>
                <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'weekly' ? (
        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
          <WeeklyWorkTemplate />
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
          <RepeatWorkTemplate />
        </div>
      )}
    </div>
  );
}
