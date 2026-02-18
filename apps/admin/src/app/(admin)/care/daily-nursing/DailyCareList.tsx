/**
 * Description : DailyCareList.tsx - ?? DailyCareList UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

interface Resident {
  id: string;
  name: string;
  room: string;
  status: string;
  hasLog: boolean; // 간호일지 작성 여부
  hasMedication: boolean; // 투약 기록 여부
  hasWound: boolean; // 욕창 관리 여부
  hasTube: boolean; // 비위관 관리 여부
  hasExcretion: boolean; // 배설 기록 여부
}

interface Props {
  readonly residents: Resident[];
  readonly selectedResidentId: string;
  readonly onResidentSelect: (id: string) => void;
  readonly selectedDate: string;
  readonly onDateChange: (date: string) => void;
}

/** 작성 여부 인디케이터 */
const StatusMark = ({ checked }: { checked: boolean }) => (
  <div className="flex items-center justify-center">
    {checked ? (
      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#5C8D5A] text-[9px] text-white shadow-sm">
        <i className="ri-check-line font-bold"></i>
      </span>
    ) : (
      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
    )}
  </div>
);

/**
 * [Sidebar Panel] 건강관리 대상자 상태 관제 패널
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 체크리스트 그리드 적용
 */
export default function DailyCareResidentPanel({
  residents,
  selectedResidentId,
  onResidentSelect,
  selectedDate,
  onDateChange,
}: Props) {
  // Styles from ResidentList.tsx
  const containerClass = 'flex h-full flex-col border-r border-[#B8D1E0] bg-white p-2 font-sans';
  const buttonClass =
    'border border-[#7A8B9A] bg-[#8FA1B0] px-2 py-1 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#7A8B9A] rounded-sm';
  const tableBorderColor = 'border-[#B8D1E0]';
  const headerBg = 'bg-[#E8F1F8]';

  return (
    <div className={containerClass}>
      {/* Date Navigator (Maintained from DailyCare) */}
      <div className="mb-2 flex items-center justify-between rounded-sm border border-[#B8D1E0] bg-[#E8F1F8] p-1.5">
        <button
          className="flex h-6 w-6 items-center justify-center rounded bg-[#8FA1B0] text-white hover:bg-[#7A8B9A]"
          onClick={() => {}} // Add logic if needed
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <div className="flex items-center gap-1.5 text-[#2E6A9E]">
          <span className="text-[13px] font-bold">{selectedDate}</span>
          <i className="ri-calendar-line text-[14px]"></i>
        </div>
        <button
          className="flex h-6 w-6 items-center justify-center rounded bg-[#8FA1B0] text-white hover:bg-[#7A8B9A]"
          onClick={() => {}} // Add logic if needed
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>

      {/* Filters (Styled like ResidentList buttons) */}
      <div className="mb-2 grid grid-cols-4 gap-1">
        {['현황선택', '생활실선택', '이름', '주요질환'].map(label => (
          <button key={label} className={buttonClass}>
            {label}
          </button>
        ))}
      </div>

      {/* Resident Table (Styled like ResidentList) */}
      <div className={`flex-1 overflow-y-auto border ${tableBorderColor}`}>
        <table className="w-full border-collapse text-[12px]">
          <thead className="sticky top-0 z-10">
            <tr className={`${headerBg} text-gray-700`}>
              <th className={`border-b border-r ${tableBorderColor} w-[40px] py-2 text-center font-medium`}>연번</th>
              <th className={`border-b border-r ${tableBorderColor} w-[50px] py-2 text-center font-medium`}>현황</th>
              <th className={`border-b border-r ${tableBorderColor} w-[60px] py-2 text-center font-medium`}>
                수급자명
              </th>
              <th className={`border-b border-r ${tableBorderColor} w-[60px] py-2 text-center font-medium`}>생활실</th>
              <th className={`border-b border-r ${tableBorderColor} w-[30px] py-2 text-center font-medium`}>일지</th>
              <th className={`border-b border-r ${tableBorderColor} w-[30px] py-2 text-center font-medium`}>투약</th>
              <th className={`border-b border-r ${tableBorderColor} w-[30px] py-2 text-center font-medium`}>욕창</th>
              <th className={`border-b border-r ${tableBorderColor} w-[30px] py-2 text-center font-medium`}>비위</th>
              <th className={`border-b border-r ${tableBorderColor} w-[30px] py-2 text-center font-medium`}>배설</th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-[${tableBorderColor}] bg-white`}>
            {residents.map((r, i) => (
              <tr
                key={r.id}
                onClick={() => onResidentSelect(r.id)}
                className={clsx(
                  'cursor-pointer transition-colors',
                  selectedResidentId === r.id ? 'bg-[#FFF9C4]' : 'hover:bg-blue-50/50',
                )}
              >
                <td className={`border-r ${tableBorderColor} py-1.5 text-center text-gray-500`}>{i + 1}</td>
                <td className={`border-r ${tableBorderColor} py-1.5 text-center text-gray-800`}>{r.status}</td>
                <td
                  className={`border-r ${tableBorderColor} py-1.5 text-center font-bold ${
                    selectedResidentId === r.id ? 'text-[#5C8D5A]' : 'text-[#333]'
                  }`}
                >
                  {r.name}
                </td>
                <td className={`border-r ${tableBorderColor} py-1.5 text-center text-gray-600`}>{r.room}</td>
                <td className={`border-r ${tableBorderColor} py-1.5`}>
                  <StatusMark checked={r.hasLog} />
                </td>
                <td className={`border-r ${tableBorderColor} py-1.5`}>
                  <StatusMark checked={r.hasMedication} />
                </td>
                <td className={`border-r ${tableBorderColor} py-1.5`}>
                  <StatusMark checked={r.hasWound} />
                </td>
                <td className={`border-r ${tableBorderColor} py-1.5`}>
                  <StatusMark checked={r.hasTube} />
                </td>
                <td className={`py-1.5`}>
                  <StatusMark checked={r.hasExcretion} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Summary (Styled like ResidentList) */}
      <div className={`mt-2 flex items-center justify-between border ${tableBorderColor} ${headerBg} px-2 py-1.5`}>
        <div className="flex gap-2 text-[11px] font-medium text-[#2E6A9E]">
          <span className="flex items-center">▶전체:{residents.length}</span>
          <span className="flex items-center">▶남:0</span>
          <span className="flex items-center">▶여:0</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[10px] text-gray-600">
            <span className="h-2 w-2 rounded-sm bg-[#5C8D5A]"></span>완료
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-600">
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>대상
          </div>
        </div>
      </div>
    </div>
  );
}
