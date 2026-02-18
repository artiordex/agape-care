/**
 * Description : DashboardHeader.tsx - ?? DashboardHeader UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * [Header] 실시간 통합 관제 대시보드 헤더
 * 시스템 상태 인디케이터 및 실시간 타임스탬프 포함
 */
interface Props {
  readonly onRefresh?: () => void;
}

export default function DashboardHeader({ onRefresh }: Props) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 실시간 시계 업데이트 (ERP의 정밀성 강조)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 새로고침 핸들러 (로딩 애니메이션 포함)
  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 900);
  };

  // 보고서 출력 핸들러
  const handlePrintReport = () => {
    window.print();
  };

  // 날짜 포맷팅 함수 (YYYY-MM-DD)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* 왼쪽: 시스템 타이틀 및 라이브 인디케이터 */}
      <div className="flex items-center gap-3">
        <div className="relative rounded-lg bg-[#5C8D5A] p-2.5 text-white shadow-md shadow-emerald-100">
          <i className="ri-dashboard-3-line text-xl"></i>
          {/* 실시간 라이브 램프 */}
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black leading-tight tracking-tighter text-gray-900">대시보드</h1>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-[12px] font-bold uppercase tracking-tighter text-[#5C8D5A]">
              각종 운영 정보 모니터링
            </p>
          </div>
        </div>
      </div>

      {/* 오른쪽: 데이터 기준 시점 및 액션 */}
      <div className="flex items-center gap-4">
        {/* 실시간 타임스탬프 (font-mono 적용) */}
        <div className="hidden flex-col items-end border-r border-gray-200 pr-4 lg:flex">
          <p className="mb-0.5 text-[12px] font-black uppercase tracking-widest text-gray-500">현재(KST)</p>
          <div className="flex items-center gap-2">
            {/* 고정된 날짜 대신 formatDate 함수를 통해 현재 날짜 출력 */}
            <span className="font-mono text-[12px] font-black text-gray-700">{formatDate(currentTime)}</span>
            <span className="font-mono text-[12px] font-black leading-none text-[#5C8D5A]">
              {currentTime.toLocaleTimeString('ko-KR', { hour12: false })}
            </span>
          </div>
        </div>

        {/* 유틸리티 액션 버튼 */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 border border-gray-300 bg-white px-3 py-2 text-[12px] font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-60"
          >
            <i className={`ri-refresh-line ${isRefreshing ? 'animate-spin' : ''}`}></i>
            {isRefreshing ? '새로고침 중...' : '데이터 새로고침'}
          </button>
          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 bg-[#5C8D5A] px-4 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4a7248] active:scale-95"
          >
            <i className="ri-file-chart-line"></i>운영 일일 보고서 출력
          </button>
        </div>
      </div>
    </div>
  );
}
