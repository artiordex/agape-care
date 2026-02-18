/**
 * Description : AttendanceCalendar.tsx - ?? AttendanceCalendar UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

/**
 * [Component] 출퇴근 근무표 탭 (달력형 UI)
 * 왼쪽 직원 목록 + 오른쪽 월간 달력 레이아웃
 */
export default function AttendanceCalendar() {
  // 직원 Mock 데이터
  const employees = [
    {
      id: 1,
      name: 'DPDLS',
      role: '사회복지사',
      gongdan: 152,
      schedule: { work: 96, break: 12, total: 108 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 2,
      name: 'ㄹㅇㄴㅁ',
      role: '시설장',
      gongdan: 36,
      schedule: { work: 36, break: 0, total: 36 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 3,
      name: 'ㅅㄷㄴㅅ',
      role: '물리치료사',
      gongdan: 65,
      schedule: { work: 0, break: 0, total: 0 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 4,
      name: 'ㅇㅇㅇ',
      role: '사회복지사',
      gongdan: 0,
      schedule: { work: 0, break: 0, total: 0 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 5,
      name: 'ㅛ쇼ㅛ',
      role: '요양보호사',
      gongdan: 136,
      schedule: { work: 80, break: 10, total: 90 },
      actual: { work: -1, break: 10, total: 9 },
    },
    {
      id: 6,
      name: '가나다',
      role: '요양보호사',
      gongdan: 196,
      schedule: { work: 118, break: 44, total: 162 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 7,
      name: '개드립',
      role: '간호사',
      gongdan: 0,
      schedule: { work: 0, break: 0, total: 0 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 8,
      name: '고순근',
      role: '사회복지사',
      gongdan: 8,
      schedule: { work: 0, break: 0, total: 0 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 9,
      name: '권순자',
      role: '요양보호사',
      gongdan: 0,
      schedule: { work: 0, break: 0, total: 0 },
      actual: { work: 0, break: 0, total: 0 },
    },
    {
      id: 10,
      name: '김갑돌',
      role: '간호조무사',
      gongdan: 54,
      schedule: { work: 54, break: 0, total: 54 },
      actual: { work: 0, break: 0, total: 0 },
    },
  ];

  const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  return (
    <div className="flex h-[750px] flex-col bg-white">
      <div className="flex flex-1 overflow-hidden border-b border-gray-200">
        {/* 왼쪽: 직원 목록 */}
        <div className="flex w-[480px] flex-col border-r border-gray-300">
          <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] p-3">
            <button className="rounded border border-gray-400 bg-white px-3 py-1 text-[11px] font-bold shadow-sm hover:bg-gray-50">
              담당직종선택
            </button>
            <button className="rounded border border-gray-400 bg-white px-3 py-1 text-[11px] font-bold text-gray-400 shadow-sm">
              이름조회
            </button>
            <span className="ml-auto text-[10px] font-bold text-gray-500">※ 2026.02.17 까지의 합계</span>
          </div>

          <div className="custom-scrollbar flex-1 overflow-auto">
            <table className="w-full border-collapse text-center text-[10px]">
              <thead className="sticky top-0 z-10 bg-[#e9f0f8] font-bold text-gray-700 shadow-sm">
                <tr>
                  <th rowSpan={2} className="border border-gray-300 px-1 py-1">
                    연번
                  </th>
                  <th rowSpan={2} className="border border-gray-300 px-1 py-1">
                    직원명
                  </th>
                  <th rowSpan={2} className="min-w-[70px] border border-gray-300 px-1 py-1">
                    담당직종
                  </th>
                  <th className="border border-gray-300 px-1 py-0.5">공단근무</th>
                  <th colSpan={3} className="whitespace-nowrap border border-gray-300 px-1 py-0.5">
                    근무일정시간 <i className="ri-question-line"></i>
                  </th>
                  <th colSpan={3} className="border border-gray-300 px-1 py-0.5">
                    출퇴근시간
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-1 py-0.5 text-[9px] font-normal">
                    인정시간 <i className="ri-question-line"></i>
                  </th>
                  <th className="border border-gray-300 px-1 py-0.5 text-[9px] font-normal">근무</th>
                  <th className="border border-gray-300 px-1 py-0.5 text-[9px] font-normal">휴게</th>
                  <th className="border border-gray-300 px-1 py-0.5 text-[9px] font-normal">합계</th>
                  <th className="border border-gray-300 px-1 py-0.5 text-[9px] font-normal">근무</th>
                  <th className="border border-gray-300 px-1 py-0.5 text-[9px] font-normal">휴게</th>
                  <th className="border border-gray-300 px-1 py-0.5 text-[9px] font-normal">합계</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => {
                  const rowBg = idx % 2 === 1 ? 'bg-white' : 'bg-gray-50';
                  return (
                    <tr key={emp.id} className={clsx('transition-colors hover:bg-blue-50', rowBg)}>
                      <td className="border border-gray-300 py-1.5">{emp.id}</td>
                      <td className="border border-gray-300 font-medium">{emp.name}</td>
                      <td className="border border-gray-300">{emp.role}</td>
                      <td className="border border-gray-300 font-bold text-blue-600">{emp.gongdan || ''}</td>
                      <td className="border border-gray-300 text-green-600">{emp.schedule.work || ''}</td>
                      <td className="border border-gray-300 text-green-600">{emp.schedule.break || ''}</td>
                      <td className="border border-gray-300 font-bold text-green-600">{emp.schedule.total || ''}</td>
                      <td className="border border-gray-300 text-red-600">{emp.actual.work || ''}</td>
                      <td className="border border-gray-300 text-red-600">{emp.actual.break || ''}</td>
                      <td className="border border-gray-300 font-bold text-red-600">{emp.actual.total || ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between border-t border-blue-100 bg-[#e9f5ff] p-2 px-4 text-[11px] font-bold text-blue-800">
            <span>▶ 전체: 95명</span>
            <span>▶ 남자: 16명</span>
            <span>▶ 여자: 79명</span>
          </div>
        </div>

        {/* 오른쪽: 달력 영역 */}
        <div className="flex flex-1 flex-col bg-white">
          <div className="flex items-center justify-center gap-6 border-b border-gray-200 py-3">
            <button className="text-gray-400 hover:text-gray-600">
              <i className="ri-arrow-left-s-line text-2xl"></i>
            </button>
            <h3 className="flex items-center gap-2 text-xl font-black tracking-widest text-[#2c3e50]">
              2026년 02월 <i className="ri-calendar-event-fill text-blue-400"></i>
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <i className="ri-arrow-right-s-line text-2xl"></i>
            </button>
          </div>

          <div className="custom-scrollbar flex-1 overflow-auto">
            <div className="grid h-full min-h-[600px] border-collapse grid-cols-7">
              {weekDays.map((day, idx) => {
                let textColor = 'text-gray-600';
                if (idx === 0) textColor = 'text-red-500';
                if (idx === 6) textColor = 'text-blue-500';

                return (
                  <div
                    key={`weekday-${day}`}
                    className={clsx(
                      'border-b border-r border-gray-200 bg-gray-50 py-1.5 text-center text-[11px] font-bold',
                      textColor,
                    )}
                  >
                    {day}
                  </div>
                );
              })}
              {/* Mock Calendar Grid */}
              {Array.from({ length: 35 }).map((_, i) => {
                const cellId = `cell-${i}`;
                const dayValue = i + 1 - 0; // Feb 2026 starts on Sunday (day 1 = index 0)
                const isCurrentMonth = dayValue > 0 && dayValue <= 28;

                let dayTextColor = 'text-gray-700';
                if (i % 7 === 0) dayTextColor = 'text-red-500';
                if (i % 7 === 6) dayTextColor = 'text-blue-500';

                return (
                  <div
                    key={cellId}
                    className={clsx(
                      'flex min-h-[120px] flex-col gap-1.5 border-b border-r border-gray-200 p-2',
                      isCurrentMonth ? 'cursor-pointer bg-white hover:bg-blue-50/30' : 'bg-gray-50',
                    )}
                  >
                    {isCurrentMonth && (
                      <>
                        <div className="flex items-start justify-between">
                          <span className={clsx('text-[13px] font-bold', dayTextColor)}>{dayValue}</span>
                          <span className="rounded border border-gray-300 bg-[#fdfdfd] px-1.5 py-0.5 text-[10px] font-bold text-gray-500">
                            근무일지
                          </span>
                        </div>
                        {dayValue % 2 === 0 && (
                          <div className="mt-1 flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 rounded border border-[#b2ebf2] bg-[#e0f7fa] p-1.5 text-[10px] font-bold text-[#006064] shadow-sm">
                              <i className="ri-time-line text-[#00bcd4]"></i> 09:00~18:00
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-[#f8fafc] p-3">
        <div className="flex gap-2">
          <button className="rounded bg-[#51b0c7] px-4 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#45a0b7]">
            일일 근무현황
          </button>
          <button className="rounded bg-[#607d8b] px-4 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#546e7a]">
            출퇴근 근무표(전체) 출력
          </button>
        </div>
        <div className="flex gap-2">
          <button className="rounded bg-[#78909c] px-4 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#667d8a]">
            근무일지 일괄출력
          </button>
          <button className="rounded bg-[#5c8d5a] px-4 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#4d754b]">
            출퇴근 근무표 출력 <span className="block text-[10px] opacity-80">2026년 02월</span>
          </button>
          <button className="rounded bg-[#78909c] px-4 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#667d8a]">
            연간 근무현황 출력 <span className="block text-[10px] opacity-80">2026년</span>
          </button>
        </div>
      </div>

      <div className="border-t border-yellow-200 bg-[#fff9c4] p-2 text-center text-[10px] text-gray-600">
        ※ 총퇴근 근무시간이 일정의 근무시간보다 미달일 경우 붉은색 테두리로 표시됩니다. (권한이 있을 경우 일정을
        클릭하여 출퇴근 시간을 수정할 수 있습니다)
      </div>
    </div>
  );
}
