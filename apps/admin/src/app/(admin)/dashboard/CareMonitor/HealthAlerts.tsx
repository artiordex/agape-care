'use client';

import React from 'react';

interface HealthAlert {
  id: number;
  icon: string;
  name: string;
  issue: string;
  value: string;
  time: string;
}

interface Props {
  readonly healthAlerts: HealthAlert[];
}

/**
 * [Section] 건강 이상 실시간 모니터링
 * 긴급 대응을 위한 고밀도 알림 리스트 UI
 */
export default function HealthAlerts({ healthAlerts }: Props) {
  return (
    <section className="overflow-hidden rounded-lg border border-red-300 bg-white text-[11px] shadow-sm">
      {/* 섹션 헤더: 긴급 관제 스타일 */}
      <header className="flex items-center justify-between border-b border-red-200 bg-[#fef2f2] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1 bg-red-600"></div>
          <h3 className="font-black uppercase tracking-tighter text-red-900">Health & Emergency Monitor</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
          <span className="font-mono font-black text-red-600">
            {healthAlerts.length.toString().padStart(2, '0')} Critical Issues
          </span>
        </div>
      </header>

      {/* 알림 리스트 영역 */}
      <div className="p-0">
        <ul className="divide-y divide-gray-100">
          {healthAlerts.length === 0 ? (
            <li className="py-12 text-center">
              <i className="ri-checkbox-circle-line mb-2 block text-3xl text-emerald-200"></i>
              <p className="font-bold uppercase tracking-widest text-gray-400">All Vitals are Normal</p>
            </li>
          ) : (
            healthAlerts.map(alert => (
              <li
                key={alert.id}
                className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-red-50/30"
              >
                {/* 상태 아이콘 박스 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 shadow-sm transition-all group-hover:bg-red-600 group-hover:text-white">
                  <i className={`${alert.icon} text-xl`} />
                </div>

                {/* 환자 및 증상 정보 */}
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="text-[12px] font-black text-gray-900">{alert.name}</span>
                    <span className="rounded-sm bg-red-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-tighter text-red-700">
                      {alert.issue}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri- pulse-line text-[10px] text-red-400"></i>
                    <p className="font-mono font-bold leading-none tracking-tight text-red-600">{alert.value}</p>
                  </div>
                </div>

                {/* 발생 시각 및 액션 */}
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase italic tracking-tighter text-gray-400">
                    {alert.time}
                  </span>
                  <button className="rounded-sm border border-red-200 bg-white px-2 py-0.5 text-[9px] font-black uppercase text-red-600 transition-colors hover:bg-red-600 hover:text-white">
                    Check Vitals
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* 하단 푸터 가이드 */}
      {healthAlerts.length > 0 && (
        <div className="border-t border-red-100 bg-red-50/50 px-4 py-1.5">
          <p className="flex items-center gap-1 text-[9px] font-bold uppercase text-red-400">
            <i className="ri-error-warning-fill"></i>Immediate Response Required for Highlighted Vitals
          </p>
        </div>
      )}
    </section>
  );
}
