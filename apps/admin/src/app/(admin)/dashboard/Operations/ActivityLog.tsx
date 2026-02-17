/**
 * Description : ActivityLog.tsx - 📌 대시보드 최근 운영 활동 로그 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

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
    <section className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[12px] shadow-sm lg:col-span-2">
      {/* 섹션 헤더: Agape-Care 표준 서식 */}
      <header className="flex items-center justify-between border-b border-gray-300 bg-[#f8fafc] px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1 bg-[#5C8D5A]"></div>
          <h3 className="font-black uppercase tracking-tighter text-gray-800">최근 운영 활동 로그</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-[12px] font-black uppercase tracking-widest text-[#5C8D5A] transition-colors hover:text-[#4a7248]"
        >
          전체 감사 로그 보기 →
        </button>
      </header>

      <div className="p-0">
        <ul className="divide-y divide-gray-100">
          {activities.length === 0 ? (
            <li className="flex flex-col items-center py-12 text-gray-300">
              <i className="ri-timer-line mb-2 text-3xl opacity-20"></i>
              <p className="font-bold uppercase tracking-widest">최근 로그가 없습니다</p>
            </li>
          ) : (
            activities.map(activity => (
              <li
                key={activity.id}
                className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50/50"
              >
                {/* 로그 유형 아이콘 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-500 shadow-sm transition-all group-hover:border-[#5C8D5A] group-hover:bg-emerald-50 group-hover:text-[#5C8D5A]">
                  <i className={`${activity.icon} text-lg`} />
                </div>

                {/* 로그 내용 */}
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="rounded-[2px] bg-gray-100 px-1.5 py-0.5 text-[12px] font-black uppercase tracking-tighter text-gray-500 group-hover:bg-emerald-100 group-hover:text-[#5C8D5A]">
                      {activity.type}
                    </span>
                    <p className="line-clamp-1 text-[14px] font-bold text-gray-900">{activity.name}</p>
                  </div>
                  <p className="text-[12px] font-medium uppercase italic tracking-tighter text-gray-400">
                    기록된 이벤트 ID: #{activity.id.toString().padStart(6, '0')}
                  </p>
                </div>

                {/* 발생 시각 (font-mono 적용) */}
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[12px] font-black text-gray-400 group-hover:text-[#5C8D5A]">
                    {activity.time}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500">확인됨</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* 하단 시스템 요약 정보 */}
      <div className="border-t border-gray-100 bg-[#f8fafc] px-6 py-2">
        <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-tighter text-gray-400">
          <i className="ri-lock-2-line text-[#5C8D5A]"></i>감사 로그는 보안 규정에 따라 암호화되어 5년 동안 보관됩니다.
        </p>
      </div>
    </section>
  );
}
