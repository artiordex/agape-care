'use client';

import React, { useState, useEffect } from 'react';

/**
 * [Header] 실시간 통합 관제 대시보드 헤더
 * 시스템 상태 인디케이터 및 실시간 타임스탬프 포함
 */
export default function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 실시간 시계 업데이트 (ERP의 정밀성 강조)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 시스템 타이틀 및 라이브 인디케이터 */}
      <div className="flex items-center gap-3">
        <div className="relative rounded-lg bg-[#1a5a96] p-2.5 text-white shadow-md shadow-blue-100">
          <i className="ri-dashboard-3-line text-xl"></i>
          {/* 실시간 라이브 램프 */}
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black leading-tight tracking-tighter text-gray-900">통합 시설 운영 대시보드</h1>
            <span className="rounded border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#1a5a96]">
              Live Monitor
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-tighter text-[#1a5a96]">
              Agape-Care Operational Intelligence
            </p>
            <span className="h-2 w-[1px] bg-gray-300"></span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              실시간 기관 현황 및 건강 지표 관제
            </p>
          </div>
        </div>
      </div>

      {/* 2. 오른쪽: 데이터 기준 시점 및 액션 */}
      <div className="flex items-center gap-4">
        {/* 실시간 타임스탬프 (font-mono 적용) */}
        <div className="hidden flex-col items-end border-r border-gray-200 pr-4 lg:flex">
          <p className="mb-0.5 text-[9px] font-black uppercase tracking-widest text-gray-400">System Time (KST)</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black italic text-gray-700">2026-01-30</span>
            <span className="font-mono text-sm font-black leading-none text-[#1a5a96]">
              {currentTime.toLocaleTimeString('ko-KR', { hour12: false })}
            </span>
          </div>
        </div>

        {/* 유틸리티 액션 버튼 */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-gray-300 bg-white px-3 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50">
            <i className="ri-refresh-line"></i>데이터 새로고침
          </button>
          <button className="flex items-center gap-1.5 bg-[#1a5a96] px-4 py-2 text-[11px] font-black text-white shadow-md transition-all hover:bg-[#144675] active:scale-95">
            <i className="ri-file-chart-line"></i>운영 일일 보고서 출력
          </button>
        </div>
      </div>
    </div>
  );
}
