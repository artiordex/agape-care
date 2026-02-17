'use client';

import clsx from 'clsx';

/**
 * [Page] 정기점검 (PeriodicInspection)
 * 소방, 가스, 승강기 등 법정 정기 점검 일정을 관리하는 페이지
 */
export default function PeriodicInspectionPage() {
  const periodicTasks = [
    {
      id: 1,
      name: '소방시설 종합정밀점검',
      cycle: '연 1회',
      nextDate: '2026-05-15',
      manager: '안전관리공사',
      status: 'D-86',
    },
    {
      id: 2,
      name: '승강기 정기 안전검사',
      cycle: '월 1회',
      nextDate: '2026-03-05',
      manager: '엘리베이터협회',
      status: '예정',
    },
    {
      id: 3,
      name: '가스시설 정기점검',
      cycle: '반기 1회',
      nextDate: '2026-06-20',
      manager: '도시가스',
      status: '대기',
    },
    {
      id: 4,
      name: '저수조 청소 및 수질검사',
      cycle: '반기 1회',
      nextDate: '2026-04-10',
      manager: '맑은수질',
      status: '진행중',
    },
    {
      id: 5,
      name: '전기설비 정기검사',
      cycle: '3년 1회',
      nextDate: '2027-11-22',
      manager: '전기안전공사',
      status: '양호',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f3f6] p-6 font-sans antialiased">
      {/* 프리미엄 헤더 섹션 */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-[#2D3436] p-8 shadow-2xl">
        <div className="absolute right-[-50px] top-[-50px] h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
              Agape Facility Archive
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-500"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              Section 04: Periodic Audit
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">정기 점검 마스터 플랜</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
            시설의 법정 안전 의무를 준수하기 위한 연간 정기 점검 일정을 통합 관리합니다. <br />
            미정기 점검 발생 시 즉시 알림이 발송됩니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* 현황 리스트 */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-6">
            <div>
              <h3 className="text-lg font-black text-gray-800">연간 점검 타임라인</h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Timeline & Responsibility Matrix
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded border border-gray-200 bg-white px-4 py-2 text-xs font-black text-gray-600 transition-all hover:border-[#5C8D5A]">
                연간 달력보기
              </button>
              <button className="rounded bg-[#5C8D5A] px-5 py-2 text-xs font-black text-white shadow-lg shadow-emerald-50 transition-all hover:bg-[#4d754b]">
                점검 일정추가
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    분류 / 점검 명칭
                  </th>
                  <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    점검 주기
                  </th>
                  <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    차기 점검일
                  </th>
                  <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    검사 기관 / 담당
                  </th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {periodicTasks.map(task => (
                  <tr key={task.id} className="group transition-all hover:bg-blue-50/20">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded border border-gray-100 bg-[#f8fafc] transition-all group-hover:border-[#5C8D5A]/30 group-hover:bg-white">
                          <i className="ri-folder-shield-2-line text-xl text-gray-400 group-hover:text-[#5C8D5A]"></i>
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-700">{task.name}</p>
                          <p className="mt-0.5 text-[10px] text-gray-400">법정 의무 점검 항목</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
                        {task.cycle}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="font-mono text-xs font-bold text-gray-700">{task.nextDate}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-xs font-bold text-blue-600/80">{task.manager}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span
                        className={clsx(
                          'rounded px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter shadow-sm',
                          task.status.includes('D-')
                            ? 'border border-red-100 bg-red-50 text-red-600'
                            : task.status === '진행중'
                              ? 'border border-blue-100 bg-blue-50 text-blue-600'
                              : 'border border-gray-100 bg-gray-50 text-gray-400',
                        )}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 bg-[#f8fafc] px-8 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span className="text-[10px] font-bold uppercase text-gray-500">Critical Due</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-[10px] font-bold uppercase text-gray-500">In Progress</span>
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase italic text-gray-300">
              Showing all active compliance schedules
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
