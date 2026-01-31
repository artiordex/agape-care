'use client';

import React from 'react';
import clsx from 'clsx';

/**
 * [Component] 근무 코드별 고유 컬러 및 운영 시간 범례 가이드
 * 아가페 그린(#5C8D5A) 테마 및 직각형 배지 UI 적용
 */
export default function ScheduleLegend() {
  // 1. 시스템 표준 근무 코드 및 운영 시간 정의
  const WORK_CODES = {
    S: { name: '주간근무', time: '07:00~19:00', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    A: { name: '단축주간', time: '09:00~18:00', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    D: { name: '오전근무', time: '07:00~16:00', color: 'bg-emerald-50 text-[#5C8D5A] border-emerald-200' },
    E: { name: '오후근무', time: '11:00~20:00', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    N: { name: '야간근무', time: '20:00~08:00', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    연: { name: '연차휴가', time: '-', color: 'bg-pink-50 text-pink-700 border-pink-200' },
    휴: { name: '휴무/비번', time: '-', color: 'bg-gray-50 text-gray-500 border-gray-200' },
    공: { name: '공휴일', time: '-', color: 'bg-red-50 text-red-600 border-red-200' },
  };

  return (
    <div className="rounded-none border border-gray-300 bg-white p-5 font-sans text-gray-900 antialiased shadow-sm">
      {/* A. 범례 섹션 헤더 */}
      <div className="mb-4 flex items-center gap-2 border-b border-gray-50 pb-3">
        <div className="h-3 w-3 rounded-none bg-[#5C8D5A]"></div>
        <h4 className="text-[11px] font-black uppercase italic tracking-widest text-gray-700">
          Shift Code Operational Legend
        </h4>
      </div>

      {/* B. 근무 코드 그리드 리스트 */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
        {Object.entries(WORK_CODES).map(([code, info]) => (
          <div
            key={code}
            className="group flex flex-col gap-1.5 border border-transparent p-2 transition-all hover:border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  'flex h-6 w-8 items-center justify-center rounded-none border text-[11px] font-black shadow-sm',
                  info.color,
                )}
              >
                {code}
              </span>
              <span className="text-[11px] font-black text-gray-800">{info.name}</span>
            </div>
            <p className="font-mono text-[9px] font-bold italic text-gray-400 group-hover:text-gray-600">{info.time}</p>
          </div>
        ))}
      </div>

      {/* C. 하단 행정 가이드 */}
      <div className="mt-4 flex items-center gap-2 rounded-none border-t border-gray-100 bg-gray-50 px-3 py-1.5">
        <i className="ri-error-warning-line text-[12px] text-[#5C8D5A]"></i>
        <p className="text-[9px] font-bold uppercase italic tracking-tighter text-gray-400">
          * 위 운영 시간은 시설 근로 규칙에 의거하며, 상세 배정 시간은 일자별 모달에서 확인 가능합니다.
        </p>
      </div>
    </div>
  );
}
