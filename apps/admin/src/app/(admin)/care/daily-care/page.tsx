/**
 * Description : page.tsx - ?? care/daily-care ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';

/**
 * [Page] 수급자 요양 기록 (DailyCareRecord)
 * 세수, 탈의, 식사 보조, 구강 관리 등 일일 생활 케어 내역 기록
 */
export default function DailyCareRecordPage() {
  const [selectedResidentId, setSelectedResidentId] = useState<number>(8);

  // Mock Data: Resident List
  const residents = [
    { id: 8, status: '입소중', name: '가나당', room: '다용실2', grade: '3등급', count: 0 },
    { id: 9, status: '입소중', name: '강계희', room: '소망', grade: '3등급', count: 0 },
    { id: 10, status: '입소중', name: '강으뜸', room: '특실', grade: '3등급', count: 0 },
    { id: 11, status: '입소중', name: '강춘애', room: '계양새...', grade: '3등급', count: 0 },
    { id: 12, status: '입소중', name: '고길동', room: '초록', grade: '3등급', count: 0 },
    { id: 13, status: '입소중', name: '고수레', room: '무지개', grade: '4등급', count: 0 },
    { id: 14, status: '입소중', name: '구시민', room: '노랑나...', grade: '2등급', count: 0 },
    { id: 15, status: '입소중', name: '김급', room: '맹꽁이...', grade: '등급외', count: 0 },
    { id: 16, status: '입소중', name: '김길동', room: '예쁜이방', grade: '', count: 0 },
    { id: 17, status: '입소중', name: '김꽃님', room: '장미 1호', grade: '3등급', count: 0 },
    { id: 18, status: '입소중', name: '김나나', room: '2호실', grade: '4등급', count: 0 },
    { id: 19, status: '입소중', name: '김나영', room: '101-1', grade: '5등급', count: 0 },
    { id: 20, status: '입소중', name: '김다라', room: '샤랄라', grade: '3등급', count: 0 },
    { id: 21, status: '입소중', name: '김로이', room: '신규신규', grade: '2등급', count: 0 },
    { id: 22, status: '입소중', name: '김말복', room: '하하호호', grade: '3등급', count: 0 },
    { id: 23, status: '입소중', name: '김명자', room: '행복', grade: '3등급', count: 0 },
    { id: 24, status: '입소중', name: '김사랑', room: '홍길동...', grade: '3등급', count: 0 },
    { id: 25, status: '입소중', name: '김성찬', room: '룰라라', grade: '4등급', count: 0 },
    { id: 26, status: '입소중', name: '김수급', room: '개나리', grade: '1등급', count: 0 },
  ];

  // Week Days Mock
  const weekDays = [
    { date: '2026.02.16', day: '월', isToday: false, isSat: false, isSun: false },
    { date: '2026.02.17', day: '화', isToday: false, isSat: false, isSun: false },
    { date: '2026.02.18', day: '수', isToday: true, isSat: false, isSun: false },
    { date: '2026.02.19', day: '목', isToday: false, isSat: false, isSun: false },
    { date: '2026.02.20', day: '금', isToday: false, isSat: false, isSun: false },
    { date: '2026.02.21', day: '토', isToday: false, isSat: true, isSun: false },
    { date: '2026.02.22', day: '일', isToday: false, isSat: false, isSun: true },
  ];

  // Styles
  const sideThClass = 'bg-[#E0ECF7] text-[11px] font-bold text-[#333] border border-[#B0C4DE] py-1 text-center';
  const sideTdClass =
    'bg-white text-[11px] text-[#333] border border-[#B0C4DE] py-1 text-center cursor-pointer hover:bg-blue-50';
  const gridThClass = 'bg-[#EBF5FF] text-[11px] font-bold text-[#333] border border-[#B0C4DE] text-center p-1';
  const gridTdClass = 'bg-white text-[11px] text-[#333] border border-[#B0C4DE] p-1 text-center align-middle';

  // Helper to render check cell
  const renderCheckCell = (isToday: boolean) => (
    <div className={clsx('flex items-center justify-center gap-1', isToday && '-m-1 h-full bg-[#E0F7FA] p-1')}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        defaultChecked={isToday}
      />
      <span className="text-[10px]">회</span>
    </div>
  );

  // Helper to render times cell
  const renderTimesCell = (isToday: boolean) => (
    <div className={clsx('flex items-center justify-center gap-1', isToday && '-m-1 h-full bg-[#E0F7FA] p-1')}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        defaultChecked={isToday}
      />
      <input type="number" className="w-8 border border-gray-300 text-center text-[10px]" />
      <span className="text-[10px]">회</span>
    </div>
  );

  return (
    <div className="flex h-screen bg-white font-sans text-[#333]">
      {/* 1. Left Sidebar: Resident List */}
      <aside className="flex w-[320px] flex-col border-r border-[#B0C4DE] bg-[#F8FAFC]">
        {/* Date Navigator */}
        <div className="flex items-center justify-between border-b border-[#B0C4DE] bg-[#91B5D0] p-2 text-white">
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#7A9CB5] hover:bg-[#6A8CA5]">
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold">2026.02.16~2026.02.22</span>
            <i className="ri-calendar-line"></i>
          </div>
          <button className="flex h-6 w-6 items-center justify-center rounded bg-[#7A9CB5] hover:bg-[#6A8CA5]">
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-1 border-b border-[#B0C4DE] bg-[#E0ECF7] p-1">
          {['현황선택', '생활실선택', '분류선택', '이름조회'].map(label => (
            <button
              key={label}
              className={clsx(
                'rounded border border-[#A0B4CE] bg-white py-1 text-[11px] font-bold text-[#555] shadow-sm',
                label === '이름조회' && 'text-gray-400',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Resident Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className={clsx(sideThClass, 'w-[30px]')}>연번</th>
                <th className={clsx(sideThClass, 'w-[40px]')}>현황</th>
                <th className={clsx(sideThClass, 'w-[60px]')}>수급자명</th>
                <th className={clsx(sideThClass, 'w-[60px]')}>생활실</th>
                <th className={clsx(sideThClass, 'w-[40px]')}>등급</th>
                <th className={clsx(sideThClass, 'w-[30px]')}>기록</th>
              </tr>
            </thead>
            <tbody>
              {residents.map(res => (
                <tr
                  key={res.id}
                  onClick={() => setSelectedResidentId(res.id)}
                  className={clsx(selectedResidentId === res.id ? 'bg-[#FFF9C4]' : 'hover:bg-blue-50')}
                >
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.id}</td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.status}</td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4] font-bold')}>
                    {res.name}
                  </td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.room}</td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.grade}</td>
                  <td className={clsx(sideTdClass, selectedResidentId === res.id && 'bg-[#FFF9C4]')}>{res.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between border-t border-[#B0C4DE] bg-[#F1F5F9] px-2 py-1.5 text-[11px] font-bold text-[#333]">
          <div className="flex gap-2">
            <span className="text-blue-600">▶ 전체:140명</span>
            <span className="text-gray-600">▶ 남자:59명</span>
            <span className="text-gray-600">▶ 여자:81명</span>
          </div>
        </div>
      </aside>

      {/* 2. Right Content */}
      <main className="flex flex-1 flex-col overflow-hidden bg-white p-2">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between border-b-2 border-[#5B9BD5] pb-1">
          <div className="flex items-center gap-2">
            <i className="ri-checkbox-line text-[#2E6A9E]"></i>
            <h2 className="text-[16px] font-black text-[#2E6A9E]">요양급여 제공기록</h2>
            <i className="ri-settings-3-fill cursor-pointer text-gray-400"></i>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-[#FFD700] bg-[#FFF9C4] px-3 py-0.5 text-[13px] font-bold">가나당</div>
            <div className="border border-[#FFB74D] bg-[#FFF3E0] px-3 py-0.5 text-[12px] text-[#F57C00]">
              09분 40초 후 새로고침
            </div>
          </div>
        </div>

        {/* Grid Container */}
        <div className="flex-1 overflow-auto border border-[#B0C4DE]">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead className="sticky top-0 z-20">
              {/* Row 1: Dates */}
              <tr>
                <th className={gridThClass} rowSpan={2} style={{ width: '60px' }}>
                  급여서비스
                </th>
                {weekDays.map((day, idx) => (
                  <th key={idx} className={clsx(gridThClass, day.isToday && 'bg-[#FFE0B2]')} style={{ width: '12%' }}>
                    <div
                      className={clsx(
                        'text-[13px] font-bold',
                        day.isSat
                          ? 'text-blue-600'
                          : day.isSun
                            ? 'text-red-500'
                            : day.isToday
                              ? 'text-red-600'
                              : 'text-[#333]',
                      )}
                    >
                      {day.date} ({day.day})
                    </div>
                  </th>
                ))}
              </tr>
              {/* Row 2: Action Buttons */}
              <tr>
                {weekDays.map((day, idx) => (
                  <th
                    key={idx}
                    className={clsx('border border-[#B0C4DE] p-1', day.isToday ? 'bg-[#FFE0B2]' : 'bg-white')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <button className="rounded bg-[#7F9EB5] px-2 py-0.5 text-[10px] text-white hover:bg-[#608298]">
                        전일자료조회
                      </button>
                      <button className="rounded bg-[#9E9E9E] px-2 py-0.5 text-[10px] text-white hover:bg-[#757575]">
                        지움
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Section: Physical Activity - Writer */}
              <tr>
                <td className="border border-[#B0C4DE] bg-[#EBF5FF] text-center text-[12px] font-bold" rowSpan={14}>
                  신체
                  <br />
                  활동
                  <br />
                  지원
                </td>
                <td className={clsx(gridTdClass, 'bg-[#E0F2F1]')}>
                  신체활동 작성자 <span className="text-red-500">?</span>
                </td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    <div className="flex items-center gap-1 px-1">
                      <input type="text" className="h-6 w-full rounded border border-gray-300 px-1 text-[11px]" />
                      <button className="rounded bg-[#B0BEC5] px-1 text-[10px] text-white">X</button>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Items: Washing Face to Dressing */}
              {['세면도움', '구강관리', '머리감기기', '몸단장', '옷 갈아입히기'].map(item => (
                <tr key={item}>
                  <td className={gridTdClass}>{item}</td>
                  {weekDays.map((day, idx) => (
                    <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                      {renderCheckCell(day.isToday)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Item: Bathing (Special Mock) */}
              <tr>
                <td className={gridTdClass}>목욕도움 (1회/5회)</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    {idx === 4 ? ( // Friday
                      <div className="rounded border border-[#8BC34A] bg-[#DCEDC8] p-1 text-[11px] font-bold text-[#33691E]">
                        일정 (11:00)
                      </div>
                    ) : (
                      <i className="ri-hotel-bed-line text-lg text-gray-300"></i>
                    )}
                  </td>
                ))}
              </tr>

              {/* Item: Meal Assistance (Complex Checkboxes) */}
              <tr>
                <td className={gridTdClass}>식사도움</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    <div className="grid grid-cols-3 gap-0.5 text-[9px]">
                      <label className="flex cursor-pointer items-center justify-center rounded border border-gray-300 px-0.5 hover:bg-gray-50">
                        <input type="checkbox" className="hidden" />
                        아침
                      </label>
                      <label className="flex cursor-pointer items-center justify-center rounded border border-gray-300 px-0.5 hover:bg-gray-50">
                        <input type="checkbox" className="hidden" />
                        점심
                      </label>
                      <label className="flex cursor-pointer items-center justify-center rounded border border-gray-300 px-0.5 hover:bg-gray-50">
                        <input type="checkbox" className="hidden" />
                        저녁
                      </label>
                      <label className="col-span-1.5 flex cursor-pointer items-center justify-center rounded border border-gray-300 px-0.5 hover:bg-gray-50">
                        <input type="checkbox" className="hidden" />
                        오전간식
                      </label>
                      <label className="col-span-1.5 flex cursor-pointer items-center justify-center rounded border border-gray-300 px-0.5 hover:bg-gray-50">
                        <input type="checkbox" className="hidden" />
                        오후간식
                      </label>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Item: Toileting */}
              <tr>
                <td className={gridTdClass}>
                  화장실 이용하기
                  <br />
                  <span className="text-[9px] text-gray-500">(대변/소변/설사/기저귀)</span>
                </td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    <i className="ri-pencil-line cursor-pointer text-lg text-gray-300 hover:text-blue-500"></i>
                  </td>
                ))}
              </tr>

              {/* Item: Position Change */}
              <tr>
                <td className={gridTdClass}>체위변경</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    <input type="checkbox" className="h-4 w-4" />
                  </td>
                ))}
              </tr>

              {/* Item: Mobility Aid */}
              <tr>
                <td className={gridTdClass}>이동도움</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    {renderTimesCell(day.isToday)}
                  </td>
                ))}
              </tr>

              {/* Item: Body Function */}
              <tr>
                <td className={gridTdClass}>신체기능 유지·증진</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    {renderTimesCell(day.isToday)}
                  </td>
                ))}
              </tr>

              {/* Item: Walking */}
              <tr>
                <td className={gridTdClass}>산책(외출) 동행</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    <div className="flex justify-center gap-1">
                      <button className="rounded bg-[#9E9E9E] px-1 py-0.5 text-[9px] text-white">산책</button>
                      <button className="rounded bg-[#9E9E9E] px-1 py-0.5 text-[9px] text-white">외출</button>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Item: Special Notes (Textarea) */}
              <tr>
                <td className={gridTdClass}>
                  특이사항
                  <br />
                  <span className="text-[9px] text-gray-500">(50자 초과시 별지첨부)</span>
                </td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'relative h-[60px] bg-[#E0F7FA] p-0')}>
                    <textarea className="h-full w-full resize-none border-none bg-transparent p-1 text-[11px] focus:ring-0" />
                    <button className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded bg-[#2196F3] text-white shadow">
                      <i className="ri-save-line text-[12px]"></i>
                    </button>
                  </td>
                ))}
              </tr>

              {/* Section: Cognitive & Communication */}
              <tr>
                <td className="border border-[#B0C4DE] bg-[#EBF5FF] text-center text-[12px] font-bold" rowSpan={4}>
                  인지
                  <br />
                  관리
                  <br />및<br />
                  의사
                  <br />
                  소통
                </td>
                <td className={clsx(gridTdClass, 'bg-[#E0F2F1]')}>
                  인지관리 작성자 <span className="text-red-500">?</span>
                </td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    <div className="flex items-center gap-1 px-1">
                      <input type="text" className="h-6 w-full rounded border border-gray-300 px-1 text-[11px]" />
                      <button className="rounded bg-[#B0BEC5] px-1 text-[10px] text-white">X</button>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className={gridTdClass}>인지관리 지원</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    {renderTimesCell(day.isToday)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={gridTdClass}>의사소통 도움</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    {renderTimesCell(day.isToday)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className={gridTdClass}>
                  특이사항
                  <br />
                  <span className="text-[9px] text-gray-500">(50자 초과시 별지첨부)</span>
                </td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'relative h-[60px] bg-[#E0F7FA] p-0')}>
                    <textarea className="h-full w-full resize-none border-none bg-transparent p-1 text-[11px] focus:ring-0" />
                    <button className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded bg-[#2196F3] text-white shadow">
                      <i className="ri-save-line text-[12px]"></i>
                    </button>
                  </td>
                ))}
              </tr>

              {/* Section: Functional Recovery */}
              <tr>
                <td className="border border-[#B0C4DE] bg-[#EBF5FF] text-center text-[12px] font-bold">기능회복훈련</td>
                <td className={gridTdClass}>기능회복훈련</td>
                {weekDays.map((day, idx) => (
                  <td key={idx} className={clsx(gridTdClass, day.isToday && 'bg-[#E0F7FA]')}>
                    <div className="flex justify-center gap-0.5">
                      <button className="rounded bg-[#9E9E9E] px-1 py-0.5 text-[9px] text-white">신체</button>
                      <button className="rounded bg-[#9E9E9E] px-1 py-0.5 text-[9px] text-white">기본</button>
                      <button className="rounded bg-[#9E9E9E] px-1 py-0.5 text-[9px] text-white">일상</button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <button className="rounded bg-[#2E6A9E] px-6 py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#23527c]">
            급여기록 저장
          </button>
          <button className="flex flex-col items-center rounded bg-[#9E9E9E] px-4 py-1.5 text-[12px] font-bold text-white shadow-md hover:bg-[#757575]">
            <span>주간 기록지 출력</span>
            <span className="text-[10px] font-normal">2026.02.16~2026.02.22</span>
          </button>
          <button className="flex flex-col items-center rounded bg-[#9E9E9E] px-4 py-1.5 text-[12px] font-bold text-white shadow-md hover:bg-[#757575]">
            <span>월간 기록지 출력</span>
            <span className="text-[10px] font-normal">2026.02.01~2026.02.28</span>
          </button>
          <button className="rounded bg-[#00BCD4] px-6 py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#00ACC1]">
            목욕도움 기록 일괄처리
          </button>
        </div>
      </main>
    </div>
  );
}
