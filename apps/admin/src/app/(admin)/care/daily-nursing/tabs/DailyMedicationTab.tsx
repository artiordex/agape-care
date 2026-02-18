/**
 * Description : DailyMedicationTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useState } from 'react';

interface Props {
  readonly date: string;
  readonly onManageMedication: () => void;
}

/**
 * [Tab Content] 2. 투약관리 (Daily Medication Log)
 * - Reference: Provides complex grid for medication administration, dosage, and stock tracking.
 * - Theme: Blue-Gray headers (#E8F1F8) and Agape Green/Blue accents.
 */
export default function DailyMedicationTab({ date, onManageMedication }: Props) {
  // Mock Data for Medication Rows
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: '타이레놀',
      method: '경구',
      period: '2026.02.02 ~ 2026.03.08',
      dosage: '1',
      times: {
        morningBefore: false,
        morningAfter: false,
        lunchBefore: false,
        lunchAfter: false,
        dinnerBefore: false,
        dinnerAfter: true, // Checked
        bedtime: false,
        prn: false,
      },
      stock: 1,
    },
    {
      id: 2,
      name: '타이레놀',
      method: '경구',
      period: '2026.02.03 ~ 2026.03.09',
      dosage: '1',
      times: {
        morningBefore: false,
        morningAfter: false,
        lunchBefore: false,
        lunchAfter: false,
        dinnerBefore: false,
        dinnerAfter: true, // Checked
        bedtime: false,
        prn: false,
      },
      stock: 35,
    },
  ]);

  // Styles
  const tableHeaderBase =
    'bg-[#E8F1F8] border border-[#B8D1E0] text-[11px] text-[#333] font-bold text-center align-middle';
  const tableBorder = 'border border-[#B8D1E0]';
  const timeHeaderClass = 'flex flex-col items-center justify-center h-full py-1';
  const timeSubText = 'text-[10px] text-gray-500 font-normal mt-0.5';
  const cellBase = 'bg-white border border-[#B8D1E0] p-1 text-center align-middle';
  const checkboxBase =
    'w-5 h-5 border-gray-300 rounded text-[#E67E22] focus:ring-[#E67E22] checked:bg-[#E67E22] checked:border-[#E67E22] cursor-pointer transition-all';

  return (
    <div className="flex flex-col gap-4 font-sans text-[#333] antialiased">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between border-b-2 border-[#5C8D5A] bg-[#f8fafc] px-3 py-2">
        <div className="flex items-center gap-2">
          <i className="ri-capsule-fill text-[#5C8D5A]"></i>
          <h3 className="text-[13px] font-black text-[#5C8D5A]">투약 일지</h3>
        </div>
        <button
          onClick={onManageMedication}
          className="rounded bg-[#5C7C95] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#4a6b8a]"
        >
          수급자 투약품목 관리
        </button>
      </div>

      {/* 2. Main Medication Table */}
      <div className="custom-scrollbar overflow-x-auto border-t border-[#B8D1E0]">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            {/* Header Row 1: Groupings */}
            <tr className="h-[30px]">
              <th rowSpan={3} className={`${tableHeaderBase} w-[40px]`}>
                연번
              </th>
              <th rowSpan={3} className={`${tableHeaderBase} w-[140px]`}>
                <div>제공자</div>
                <div className="mt-1 flex justify-center gap-1">
                  <button className="rounded border border-gray-400 bg-white px-1.5 py-0.5 text-[9px] text-gray-600">
                    전체선택
                  </button>
                  <button className="rounded border border-[#5C8D5A] bg-[#5C8D5A] px-1.5 py-0.5 text-[9px] text-white">
                    선택
                  </button>
                </div>
              </th>
              <th rowSpan={3} className={`${tableHeaderBase} w-[200px]`}>
                <div>
                  약품명<span className="text-red-500">*</span>
                </div>
                <div className="text-[10px] font-normal text-gray-500">(투약방법)</div>
                <div className="mt-1">
                  <button className="rounded bg-[#6C757D] px-2 py-0.5 text-[10px] text-white">투약방법수정</button>
                </div>
                <div className="mt-1 text-right text-[10px] text-gray-500">투약기간</div>
              </th>
              <th rowSpan={3} className={`${tableHeaderBase} w-[60px]`}>
                투약량<span className="text-red-500">*</span>
                <br />
                (1회)
              </th>
              {/* Time Group Headers */}
              <th colSpan={2} className={tableHeaderBase}>
                -
              </th>
              <th colSpan={2} className={tableHeaderBase}>
                -
              </th>
              <th colSpan={2} className={tableHeaderBase}>
                <span className="text-red-500">외박중</span>
              </th>
              <th className={tableHeaderBase}>-</th>
              <th className={tableHeaderBase}>-</th>
              <th rowSpan={3} className={`${tableHeaderBase} w-[120px]`}>
                잔량
                <div className="mt-1">
                  <button className="rounded bg-[#666] px-2 py-0.5 text-[10px] text-white">전체지움</button>
                </div>
              </th>
            </tr>

            {/* Header Row 2: Provider Inputs per Time */}
            <tr className="h-[30px]">
              {[...Array(8)].map((_, i) => (
                <th key={i} className={`${tableHeaderBase} h-[30px] p-1`} style={{ minWidth: '50px' }}>
                  <input
                    type="text"
                    placeholder="제공자"
                    className="w-full border border-gray-300 text-center text-[10px]"
                  />
                </th>
              ))}
            </tr>

            {/* Header Row 3: Time Labels */}
            <tr className="h-[50px]">
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  아침식전
                  <span className={timeSubText}>07:00</span>
                </div>
              </th>
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  아침식후
                  <span className={timeSubText}>08:00</span>
                </div>
              </th>
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  점심식전
                  <span className={timeSubText}>11:30</span>
                </div>
              </th>
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  점심식후
                  <span className={timeSubText}>12:30</span>
                </div>
              </th>
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  저녁식전
                  <span className={timeSubText}>16:30</span>
                </div>
              </th>
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  저녁식후
                  <span className={timeSubText}>17:30</span>
                </div>
              </th>
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  취침전
                  <span className={timeSubText}>22:00</span>
                </div>
              </th>
              <th className={tableHeaderBase}>
                <div className={timeHeaderClass}>
                  필요시
                  <span className={timeSubText}> </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Existing Medications */}
            {medications.map((med, idx) => (
              <tr key={med.id} className="hover:bg-blue-50/50">
                <td className={`${cellBase} bg-[#f8fafc] text-[11px] font-bold text-gray-500`}>{idx + 1}</td>
                <td className={cellBase}>
                  {/* Provider logic could go here, keeping empty for now as per screenshot usually blank until signed */}
                </td>
                <td className={`${cellBase} px-2 text-left`}>
                  <div className="text-[12px] font-bold text-black">
                    {med.name}
                    <span className="ml-1 text-[11px] font-normal text-gray-600">({med.method})</span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-gray-400">{med.period}</div>
                </td>
                <td className={cellBase}>
                  <input type="text" value={med.dosage} className="w-full border border-gray-300 py-1 text-center" />
                </td>
                {/* Checkboxes */}
                <td className={cellBase}>
                  <input type="checkbox" className={checkboxBase} checked={med.times.morningBefore} />
                </td>
                <td className={cellBase}>
                  <input type="checkbox" className={checkboxBase} checked={med.times.morningAfter} />
                </td>
                <td className={cellBase}>
                  <input type="checkbox" className={checkboxBase} checked={med.times.lunchBefore} />
                </td>
                <td className={cellBase}>
                  <input type="checkbox" className={checkboxBase} checked={med.times.lunchAfter} />
                </td>
                <td className={cellBase}>
                  <input type="checkbox" className={checkboxBase} checked={med.times.dinnerBefore} />
                </td>
                <td className={`${cellBase} bg-[#FDF2E9]`}>
                  <input type="checkbox" className={checkboxBase} checked={med.times.dinnerAfter} />
                </td>
                <td className={cellBase}>
                  <input type="checkbox" className={checkboxBase} checked={med.times.bedtime} />
                </td>
                <td className={cellBase}>
                  <input type="checkbox" className={checkboxBase} />
                </td>

                {/* Stock */}
                <td className={cellBase}>
                  <div className="flex items-center justify-center gap-2">
                    <button className="rounded bg-[#5BC0DE] px-1.5 py-0.5 text-[10px] text-white shadow-sm hover:brightness-95">
                      조정
                    </button>
                    <span className="text-[12px] font-bold">{med.stock}</span>
                  </div>
                </td>
              </tr>
            ))}

            {/* "Prn" (Needed) Input Row */}
            <tr>
              <td className={`${cellBase} bg-[#f8fafc] text-[11px] font-bold text-gray-500`}>3</td>
              <td className={cellBase}></td>
              <td className={`${cellBase} px-2 text-left`}>
                <div className="mb-1 flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="필요시"
                    className="flex-1 border border-gray-300 px-1 py-0.5 text-[11px]"
                  />
                  <button className="rounded bg-[#5C7C95] px-1.5 py-0.5 text-[10px] text-white">조회</button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-[50px] text-[10px] text-gray-400">투약방법</span>
                  <input type="checkbox" className="h-3 w-3" /> <span className="text-[10px]">주사</span>
                  {/* More options could go here */}
                </div>
              </td>
              <td className={cellBase}>
                <input type="text" className="w-full border border-gray-300 py-1 text-center" />
              </td>
              {/* Checkboxes for PRN row */}
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>
              <td className={cellBase}>
                <input type="checkbox" className={checkboxBase} />
              </td>

              <td className={cellBase}>
                <input type="text" className="w-full border border-gray-300 py-1 text-center" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Footer Note Section */}
      <div className="flex items-center border border-[#B8D1E0] bg-[#E8F1F8]">
        <div className="w-[80px] border-r border-[#B8D1E0] py-2 text-center text-[12px] font-bold">비고</div>
        <input type="text" className="flex-1 border-none bg-white px-3 py-2 text-[12px] outline-none" />
      </div>

      {/* 4. Footer Info & Buttons */}
      <div className="mt-2 text-[11px] text-gray-600">
        ※ [9-1.시설정보설정 → 식사제공 설정]에서 설정한 식사시간의 30분 전/후가 기본 투약시간으로 적용됩니다.
      </div>

      <div className="mt-4 flex justify-center gap-2 pb-6">
        <button className="rounded bg-[#5C8D5A] px-12 py-2.5 text-[13px] font-bold text-white shadow hover:bg-[#4a7548]">
          저장
        </button>
        <button className="rounded bg-[#5C8D5A] px-6 py-2.5 text-[13px] font-bold text-white shadow hover:bg-[#4a7548]">
          생활실별 투약기록 일괄처리
        </button>
        <button className="flex flex-col items-center rounded border border-[#5C8D5A] bg-white px-6 py-2.5 text-[13px] font-bold leading-tight text-[#5C8D5A] shadow hover:bg-emerald-50">
          <span>투약 기록지 출력</span>
          <span className="text-[10px] font-normal opacity-80">
            {date.slice(0, 7)}.01 ~ {date.slice(0, 7)}.31
          </span>
        </button>
      </div>
    </div>
  );
}
