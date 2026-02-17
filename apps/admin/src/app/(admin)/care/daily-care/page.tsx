'use client';

import clsx from 'clsx';

/**
 * [Page] 수급자 요양 기록 (DailyCareRecord)
 * 세수, 탈의, 식사 보조, 구강 관리 등 일일 생활 케어 내역 기록
 */
export default function DailyCareRecordPage() {
  const categories = ['전체', '신체활동', '인지관리', '식사보조', '위생관리'];

  const careRecords = [
    {
      id: 1,
      name: '백청자',
      status: '진행완료',
      activity: '신체활동',
      task: '이동도움 (거동불편)',
      time: '08:00',
      manager: '이요양',
    },
    {
      id: 2,
      name: '황금순',
      status: '진행완료',
      activity: '위생관리',
      task: '세수 및 양치 (전부도움)',
      time: '08:15',
      manager: '박요양',
    },
    {
      id: 3,
      name: '김한수',
      status: '대기',
      activity: '식사보조',
      task: '아침 식사 도움 (일부도움)',
      time: '08:30',
      manager: '이요양',
    },
    {
      id: 4,
      name: '조순자',
      status: '진행중',
      activity: '인지관리',
      task: '말벗 및 정서지원',
      time: '09:00',
      manager: '최요양',
    },
    {
      id: 5,
      name: '정일출',
      status: '진행완료',
      activity: '신체활동',
      task: '탈의 및 환복 (전부도움)',
      time: '07:30',
      manager: '박요양',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb] p-6 font-sans antialiased">
      <div className="mb-8 flex items-center justify-between rounded border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-6 divide-x divide-gray-100">
          <div className="px-6">
            <h1 className="text-xl font-black tracking-tight text-gray-800">수급자 요양 기록</h1>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Care Activity Logs</p>
          </div>
          <div className="flex items-center gap-4 px-8">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase text-gray-400">Today Task</p>
              <p className="text-lg font-black text-gray-800">
                128 / <span className="text-blue-500">240</span>
              </p>
            </div>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[53%] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded bg-[#5C8D5A] px-6 py-2.5 text-xs font-black text-white shadow-lg transition-all hover:shadow-emerald-100">
          <i className="ri-add-line text-lg"></i> 신규 기록 작성
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            className={clsx(
              'rounded-full border px-4 py-1.5 text-[11px] font-black tracking-tighter transition-all',
              cat === '전체'
                ? 'border-gray-800 bg-gray-800 text-white'
                : 'border-gray-200 bg-white text-gray-400 hover:border-[#5C8D5A] hover:text-[#5C8D5A]',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {careRecords.map(record => (
          <div
            key={record.id}
            className="group rounded-xl border border-l-4 border-gray-200 border-l-[#5C8D5A] bg-white p-6 transition-all hover:shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className="mb-2 inline-block rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase text-[#5C8D5A]">
                  {record.activity}
                </span>
                <h3 className="text-lg font-black text-gray-700">{record.name} 어르신</h3>
              </div>
              <span
                className={clsx(
                  'rounded px-2 py-1 text-[10px] font-black uppercase tracking-tighter',
                  record.status === '진행완료'
                    ? 'bg-gray-100 text-gray-400'
                    : record.status === '진행중'
                      ? 'animate-pulse bg-blue-50 text-blue-600'
                      : 'bg-orange-50 text-orange-600',
                )}
              >
                {record.status}
              </span>
            </div>

            <div className="mb-6 space-y-3 border-t border-gray-50 pt-4">
              <div className="flex items-center gap-3 text-xs">
                <i className="ri-task-line text-gray-300"></i>
                <span className="font-bold text-gray-600">{record.task}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <i className="ri-time-line text-gray-300"></i>
                <span className="font-mono italic text-gray-400">{record.time} 예정 / 기록</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <i className="ri-user-smile-line text-gray-300"></i>
                <span className="text-gray-500">
                  담당자: <span className="font-bold text-gray-700">{record.manager}</span>
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 rounded bg-gray-50 py-2 text-[11px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:bg-gray-100">
                수정
              </button>
              <button className="flex-1 rounded border border-[#5C8D5A]/10 bg-[#5C8D5A]/5 py-2 text-[11px] font-black uppercase tracking-widest text-[#5C8D5A] transition-colors hover:bg-[#5C8D5A]/10">
                상세보기
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pb-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300">
          Agape Nursing Information System v2.0
        </p>
      </div>
    </div>
  );
}
