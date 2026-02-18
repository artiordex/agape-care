/**
 * Description : page.tsx - ?? operations/periodic-inspection ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

// ================= Mock Data =================
// 1. Monthly Tasks
const MONTHLY_TASKS = [
  {
    id: 1,
    category: '소방시설 점검 (월 1회)',
    records: new Array(12).fill(null).map((_, i) => {
      if (i < 4) return { status: '작성', inspector: '최인경', date: `2026.0${i + 1}.14` }; // Jan-Apr
      return { status: '-' };
    }),
    completion: '완료',
    bgColor: 'bg-[#E8F1F8]', // Fire Safety Blue? Actually screenshot shows light green for completed rows maybe?
    // Let's stick to the screenshot: header is light blue, content is light green if active
    active: true,
  },
  {
    id: 2,
    category: '전기안전관리점검표 (월 1회)',
    records: new Array(12).fill(null).map((_, i) => {
      if (i === 0) return { status: '작성', inspector: '최인경', date: '2026.01.28' };
      return { status: '-' };
    }),
    completion: '완료',
    active: true,
  },
  {
    id: 3,
    category: '가스안전관리점검표 (월 1회)',
    records: new Array(12).fill(null).map((_, i) => {
      if (i === 0) return { status: '작성', inspector: '최인경', date: '2026.01.28' };
      return { status: '-' };
    }),
    completion: '미완료',
    active: true,
  },
];

// 2. Quarterly Tasks
const QUARTERLY_TASKS = [
  {
    id: 1,
    category: '약품 점검 (분기 1회)',
    quarters: [
      { status: '작성', inspector: '최인경', date: '2026.02.13' }, // Q1
      { status: '작성', inspector: '최인경', date: '2026.04.01' }, // Q2 mock
      { status: '작성', inspector: '최인경', date: '2026.07.01' }, // Q3 mock
      { status: '작성', inspector: '최인경', date: '2026.10.01' }, // Q4 mock
    ],
  },
  {
    id: 2,
    category: '정기소독 (분기 1회)',
    quarters: [
      { status: '작성', inspector: '최인경', date: '2026.01.28' }, // Q1
      { status: '-', inspector: '', date: '' },
      { status: '-', inspector: '', date: '' },
      { status: '-', inspector: '', date: '' },
    ],
  },
];

// 3. Emergency Equipment
const EMERGENCY_TASKS = [
  { id: 1, inspector: '최인경', date: '2026.02.11' },
  { id: 2, inspector: '최인경', date: '2026.01.28' },
];

// ================= Main Page =================
export default function PeriodicInspectionPage() {
  return (
    <div className="flex h-[calc(100vh-60px)] flex-col gap-2 bg-[#f0f2f5] p-2 font-sans text-xs text-[#333] antialiased">
      {/* Year Navigation */}
      <div className="flex items-center justify-center gap-2 rounded border border-[#B8D1E0] bg-[#E8F1F8] py-2 shadow-sm">
        <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <span className="text-[16px] font-bold text-[#204987]">2026년</span>
        <button className="flex h-6 w-6 items-center justify-center rounded bg-[#788fa0] text-white hover:bg-[#637d91]">
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>

      {/* Top Section: Monthly Inspections */}
      <div className="flex table-fixed flex-col overflow-hidden rounded border border-[#B8D1E0] bg-white shadow-sm">
        {/* Monthly Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-center">
            <thead className="bg-[#E8F1F8] font-bold text-[#333]">
              <tr>
                <th className="w-[60px] border-b border-r border-[#B8D1E0] bg-[#E8F1F8] py-2">회차</th>
                {MONTHLY_TASKS.map(task => (
                  <th key={task.id} className="border-b border-r border-[#B8D1E0] py-2 last:border-r-0">
                    {task.category}
                  </th>
                ))}
              </tr>
              <tr className="bg-[#f0f4f8] text-[10px]">
                <th className="border-b border-r border-[#B8D1E0] py-1">작성현황</th>
                {MONTHLY_TASKS.map((task, taskIdx) => (
                  <th key={taskIdx} className="border-b border-r border-[#B8D1E0] p-0 last:border-r-0">
                    <div className="flex w-full">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex flex-1 flex-col items-center justify-center border-r border-gray-200 py-1 last:border-r-0"
                        >
                          <span className="mb-0.5">{i + 1}월</span>
                          <span
                            className={clsx(
                              'text-[9px]',
                              task.records[i].status === '작성' ? 'font-bold text-green-600' : 'text-gray-400',
                            )}
                          >
                            {task.records[i].status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[11px] text-[#333]">
              {/* Row 1: Completion Status */}
              <tr className="bg-[#fcfdfd]">
                <td className="w-[100px] break-keep border-b border-r border-[#B8D1E0] py-2 text-[10px] font-bold">
                  점검표/검사필증(연1회)
                </td>
                {MONTHLY_TASKS.map((task, idx) => (
                  <td
                    key={idx}
                    className="border-b border-r border-[#B8D1E0] bg-[#dff0d8] py-2 font-bold last:border-r-0"
                  >
                    {task.completion}
                  </td>
                ))}
              </tr>
              {/* Records Rows (5 down to 1) */}
              {[5, 4, 3, 2, 1].map(rowNum => (
                <tr key={rowNum} className={clsx('hover:bg-blue-50/20', rowNum <= 4 && 'bg-[#dff0d8]/30')}>
                  <td className="border-b border-r border-[#B8D1E0] py-3">{rowNum}</td>
                  {MONTHLY_TASKS.map((task, idx) => {
                    // Mock Logic for display
                    // Show data only for specific rows to match screenshot
                    const record = task.records.find((_, i) => i === rowNum - 1); // Simple mapping for demo
                    // But screenshot shows "Row 5" has Apr data, "Row 1" has Jan data.
                    // Let's use the rowNum to index into records roughly.
                    // Actually, let's just render what's in the records array reversed or specific indices.
                    // The screenshot shows specific entries. Let's try to map the `records` array index to the row number logically?
                    // Row 5 corresponds to most recent? Screenshot: Row 5 has (2026.04.01), Row 1 has (2026.01.14).
                    // So Row 1 = Jan, Row 2 = Feb, Row 3 = Mar, Row 4 = Apr, Row 5 = May?

                    // Let's grab the record at index (rowNum - 1)
                    const item = task.records[rowNum - 1];

                    return (
                      <td
                        key={idx}
                        className={clsx(
                          'border-b border-r border-[#B8D1E0] py-2 last:border-r-0',
                          rowNum <= 5 ? 'bg-[#dff0d8]' : '',
                        )}
                      >
                        {item && item.status === '작성' ? (
                          <div className="flex items-center justify-center gap-1">
                            <span>
                              {item.inspector} ({item.date})
                            </span>
                            {/* Badges for Row 5 */}
                            {rowNum === 5 && idx === 0 && (
                              <Badge label="작동기능점검표" color="bg-pink-100 text-pink-600 border-pink-200" />
                            )}
                            {rowNum === 5 && idx === 1 && (
                              <Badge label="검사필증" color="bg-gray-100 text-gray-600 border-gray-200" />
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Actions Footer */}
        <div className="flex items-center justify-between border-t border-[#B8D1E0] bg-[#f8fafc] p-2">
          <div className="font-bold text-[#333]">신규작성 / 출력</div>
          <div className="flex w-full gap-8 px-4">
            <div className="flex flex-1 justify-center gap-1">
              <ActionButton label="소방시설 점검 신규작성" color="bg-[#5bc0de]" />
              <ActionButton label="소방시설 점검 출력" color="bg-[#78909c]" />
            </div>
            <div className="flex flex-1 justify-center gap-1">
              <ActionButton label="전기안전관리점검표 신규작성" color="bg-[#5bc0de]" />
              <ActionButton label="전기안전관리점검표 출력" color="bg-[#78909c]" />
            </div>
            <div className="flex flex-1 justify-center gap-1">
              <ActionButton label="가스안전관리점검표 신규작성" color="bg-[#5bc0de]" />
              <ActionButton label="가스안전관리점검표 출력" color="bg-[#78909c]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Quarterly & Emergency */}
      <div className="flex flex-1 flex-col overflow-hidden rounded border border-[#B8D1E0] bg-white shadow-sm">
        <div className="flex-1 overflow-auto">
          <table className="h-full w-full border-collapse text-center">
            <thead className="bg-[#E8F1F8] font-bold text-[#333]">
              <tr>
                <th className="w-[60px] border-b border-r border-[#B8D1E0] py-2">회차</th>
                <th className="w-[35%] border-b border-r border-[#B8D1E0] py-2">약품 점검 (분기 1회)</th>
                <th className="w-[35%] border-b border-r border-[#B8D1E0] py-2">정기소독 (분기 1회)</th>
                <th className="border-b border-[#B8D1E0] py-2">
                  응급 의료기기 점검 (필요시) - <span className="text-[10px] font-normal">※ 공단평가는 현장확인</span>
                </th>
              </tr>
              <tr className="bg-[#f0f4f8] text-[10px]">
                <th className="border-b border-r border-[#B8D1E0] py-1">작성현황</th>
                <th className="border-b border-r border-[#B8D1E0] p-0">
                  <div className="flex w-full">
                    {['1분기', '2분기', '3분기', '4분기'].map((q, i) => (
                      <div
                        key={i}
                        className="flex flex-1 flex-col items-center justify-center border-r border-gray-200 py-1 last:border-r-0"
                      >
                        <span className="mb-0.5">{q}</span>
                        <span className={clsx('text-[9px]', i < 4 ? 'font-bold text-green-600' : 'text-gray-400')}>
                          {i === 0 || i === 1 || i === 2 ? '작성' : i === 3 && '작성'}
                        </span>
                      </div>
                    ))}
                  </div>
                </th>
                <th className="border-b border-r border-[#B8D1E0] p-0">
                  <div className="flex w-full">
                    {['1분기', '2분기', '3분기', '4분기'].map((q, i) => (
                      <div
                        key={i}
                        className="flex flex-1 flex-col items-center justify-center border-r border-gray-200 py-1 last:border-r-0"
                      >
                        <span className="mb-0.5">{q}</span>
                        <span className={clsx('text-[9px]', i === 0 ? 'font-bold text-green-600' : 'text-gray-400')}>
                          {i === 0 ? '작성' : '-'}
                        </span>
                      </div>
                    ))}
                  </div>
                </th>
                <th className="border-b border-[#B8D1E0] bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="text-[11px] text-[#333]">
              {[4, 3, 2, 1].map(rowNum => {
                const qIndex = rowNum - 1;
                return (
                  <tr key={rowNum} className="bg-[#dff0d8] hover:bg-blue-50/20">
                    <td className="border-b border-r border-[#B8D1E0] bg-white py-3">{rowNum}</td>

                    {/* Drug Inspection */}
                    <td className="border-b border-r border-[#B8D1E0] py-2">
                      {QUARTERLY_TASKS[0].quarters[qIndex] ? (
                        <span>
                          {QUARTERLY_TASKS[0].quarters[qIndex].inspector} ({QUARTERLY_TASKS[0].quarters[qIndex].date})
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>

                    {/* Disinfection */}
                    <td className="border-b border-r border-[#B8D1E0] bg-white py-2">
                      {/* Mock Logic: Show only for row 1 */}
                      {rowNum === 1 ? (
                        <div className="flex flex-col">
                          <span>11 (2026.02.13)</span>
                          <span>ㅓㅓ (2026.01.28)</span>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>

                    {/* Emergency - Just a list, spanning rows essentially, but let's put it in the cells */}
                    <td className="border-b border-[#B8D1E0] py-2">
                      {/* Mock: Row 4 and 3 have data */}
                      {rowNum === 4 && '최인경 (2026.02.11)'}
                      {rowNum === 3 && '최인경 (2026.01.28)'}
                      {rowNum < 3 && '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Actions Footer */}
        <div className="flex items-center justify-between border-t border-[#B8D1E0] bg-[#f8fafc] p-2">
          <div className="font-bold text-[#333]">신규작성 / 출력</div>
          <div className="flex w-full gap-8 px-4">
            <div className="flex w-[35%] items-center justify-center gap-1">
              <ActionButton label="약품 점검 신규작성" color="bg-[#5bc0de]" />
              <ActionButton label="약품 점검 출력" color="bg-[#78909c]" />
            </div>
            <div className="flex w-[35%] items-center justify-center gap-1">
              <ActionButton label="정기소독 신규작성" color="bg-[#5bc0de]" />
              <ActionButton label="정기소독 출력" color="bg-[#78909c]" />
            </div>
            <div className="flex flex-1 justify-center gap-1">
              <ActionButton label="응급 의료기기 점검 신규작성" color="bg-[#5bc0de]" />
              <ActionButton label="응급 의료기기 점검 출력" color="bg-[#78909c]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers
function Badge({ label, color }: { readonly label: string; readonly color: string }) {
  return <span className={clsx('ml-1 rounded border px-1 text-[9px]', color)}>{label}</span>;
}

function ActionButton({ label, color }: { readonly label: string; readonly color: string }) {
  return (
    <button className={clsx('rounded px-3 py-1.5 text-[11px] font-bold text-white shadow hover:opacity-90', color)}>
      {label}
    </button>
  );
}
