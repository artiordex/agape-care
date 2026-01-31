'use client';

import React from 'react';

interface Activity {
  id: number | string;
  type: string;
  name: string;
  time: string;
  icon: string;
}

interface Props {
  readonly activities: Activity[];
  readonly onViewAll: () => void;
}

/**
 * [Section] 최근 시스템 및 운영 활동 로그
 * 타임라인 기반의 고밀도 로그 리스트 UI
 */
export default function ActivityLog({ activities, onViewAll }: Props) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[11px] shadow-sm lg:col-span-2">
      {/* 섹션 헤더: Agape-Care 표준 서식 */}
      <header className="flex items-center justify-between border-b border-gray-300 bg-[#f8fafc] px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1 bg-[#1a5a96]"></div>
          <h3 className="font-black uppercase tracking-tighter text-gray-800">Recent Operational Activity Log</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-[10px] font-black uppercase tracking-widest text-[#1a5a96] transition-colors hover:text-[#144675]"
        >
          View Full Audit Log →
        </button>
      </header>

      <div className="p-0">
        <ul className="divide-y divide-gray-100">
          {activities.length === 0 ? (
            <li className="flex flex-col items-center py-12 text-gray-300">
              <i className="ri- timer-line mb-2 text-3xl opacity-20"></i>
              <p className="font-bold uppercase tracking-widest">No Recent Logs Found</p>
            </li>
          ) : (
            activities.map(activity => (
              <li
                key={activity.id}
                className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50/50"
              >
                {/* 로그 유형 아이콘 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-500 shadow-sm transition-all group-hover:border-[#1a5a96] group-hover:bg-blue-50 group-hover:text-[#1a5a96]">
                  <i className={`${activity.icon} text-lg`} />
                </div>

                {/* 로그 내용 */}
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="rounded-[2px] bg-gray-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-tighter text-gray-500 group-hover:bg-blue-100 group-hover:text-[#1a5a96]">
                      {activity.type}
                    </span>
                    <p className="line-clamp-1 font-bold text-gray-900">{activity.name}</p>
                  </div>
                  <p className="text-[10px] font-medium uppercase italic tracking-tighter text-gray-400">
                    Logged Event ID: #{activity.id.toString().padStart(6, '0')}
                  </p>
                </div>

                {/* 발생 시각 (font-mono 적용) */}
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[11px] font-black text-gray-400 group-hover:text-[#1a5a96]">
                    {activity.time}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500">Verified</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* 하단 시스템 요약 정보 */}
      <div className="border-t border-gray-100 bg-[#f8fafc] px-6 py-2">
        <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-tighter text-gray-400">
          <i className="ri-lock-2-line text-[#1a5a96]"></i>Audit logs are encrypted and stored for 5 years as per compliance standards.
        </p>
      </div>
    </section>
  );
}
