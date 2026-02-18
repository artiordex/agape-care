/**
 * Description : CatheterManagementTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useState } from 'react';

export interface CatheterManagement {
  // 조치사항 (Checkboxes)
  actions: {
    catheterReplacement: boolean; // 유치도뇨관교체
    bladderIrrigation: boolean; // 방광세척
    siteDisinfection: boolean; // 유치도뇨관삽입부위소독
    bagPositionCheck: boolean; // 소변주머니위치확인
    bagEmpty: boolean; // 소변주머니비우기
    bagChange: boolean; // 소변주머니교체
  };
  // 관리기록
  note: string;
  manager: string;

  // 우측: 소변량 기록 리스트
  urineRecords: {
    id: string;
    time: string;
    amount: string;
  }[];
}

interface Props {
  readonly management: CatheterManagement;
  readonly onChange: (management: CatheterManagement) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 5. 유치도뇨관 관리기록 - 필요시
 * Legacy UI Style (Blue/Gray Theme)
 */
export default function CatheterManagementTab({ management, onChange, onSave }: Props) {
  // Local state for adding new urine record
  const [newUrine, setNewUrine] = useState({ time: '', amount: '' });

  const toggleAction = (key: keyof CatheterManagement['actions']) => {
    onChange({
      ...management,
      actions: { ...management.actions, [key]: !management.actions[key] },
    });
  };

  const handleAddUrine = () => {
    if (!newUrine.time || !newUrine.amount) return;
    onChange({
      ...management,
      urineRecords: [
        ...management.urineRecords,
        { id: Date.now().toString(), time: newUrine.time, amount: newUrine.amount },
      ],
    });
    setNewUrine({ time: '', amount: '' });
  };

  const handleDeleteUrine = (id: string) => {
    onChange({
      ...management,
      urineRecords: management.urineRecords.filter(r => r.id !== id),
    });
  };

  return (
    <div className="space-y-6 font-sans text-[#333] antialiased">
      {/* 1. 메인 입력 영역: 2단 그리드 시스템 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* [좌측] 유치도뇨관 관리기록 - 필요시 */}
        <div className="flex flex-col border border-[#B8D1E0] bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
            <div className="flex items-center gap-1 text-[13px] font-bold">
              <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
              <span className="text-[#204987]">유치도뇨관 관리기록</span>
              <span className="text-[#e74c3c]">- 필요시</span>
            </div>
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              전일 자료 조회
            </button>
          </div>

          <div className="flex flex-1 flex-col p-0">
            {/* 조치사항 (Checkboxes) */}
            <div className="flex border-b border-[#B8D1E0]">
              <div className="flex w-[100px] shrink-0 items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold leading-tight text-[#333]">조치사항</span>
              </div>
              <div className="flex-1 p-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Checkbox
                    label="유치도뇨관교체"
                    checked={management.actions.catheterReplacement}
                    onChange={() => toggleAction('catheterReplacement')}
                  />
                  <Checkbox
                    label="방광세척"
                    checked={management.actions.bladderIrrigation}
                    onChange={() => toggleAction('bladderIrrigation')}
                  />
                  <Checkbox
                    label="유치도뇨관삽입부위소독"
                    checked={management.actions.siteDisinfection}
                    onChange={() => toggleAction('siteDisinfection')}
                  />
                  <Checkbox
                    label="소변주머니위치확인"
                    checked={management.actions.bagPositionCheck}
                    onChange={() => toggleAction('bagPositionCheck')}
                  />
                  <Checkbox
                    label="소변주머니비우기"
                    checked={management.actions.bagEmpty}
                    onChange={() => toggleAction('bagEmpty')}
                  />
                  <Checkbox
                    label="소변주머니교체"
                    checked={management.actions.bagChange}
                    onChange={() => toggleAction('bagChange')}
                  />
                </div>
              </div>
            </div>

            {/* 관리기록 (Textarea) */}
            <div className="flex flex-1 border-b border-[#B8D1E0]">
              <div className="flex w-[100px] shrink-0 items-center justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] p-2 text-center">
                <span className="text-[12px] font-bold leading-tight text-[#333]">관리기록</span>
              </div>
              <div className="flex-1 p-2">
                <textarea
                  value={management.note}
                  onChange={e => onChange({ ...management, note: e.target.value })}
                  className="h-full min-h-[120px] w-full resize-none border border-gray-300 p-2 text-[12px] placeholder-gray-300 outline-none focus:border-[#204987]"
                />
              </div>
            </div>

            {/* 작성자 */}
            <div className="flex items-center bg-white">
              <div className="flex w-[100px] shrink-0 justify-center border-r border-[#B8D1E0] bg-[#E8F1F8] py-2 text-center">
                <span className="text-[12px] font-bold text-[#333]">
                  작성자<span className="text-red-500">*</span>
                </span>
              </div>
              <div className="flex flex-1 items-center gap-1 border-t border-transparent p-2 pl-3">
                <input
                  type="text"
                  readOnly
                  value="최인정"
                  className="w-32 border border-gray-300 bg-white px-2 py-1 text-center text-[12px] outline-none"
                />
                <button className="rounded-sm bg-[#546E7A] px-4 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-[#455A64]">
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* [우측] 소변량 기록(유치도뇨관) - 필요시 */}
        <div className="flex flex-col border border-[#B8D1E0] bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
            <div className="flex items-center gap-1 text-[13px] font-bold">
              <i className="ri-arrow-down-s-fill text-[10px] text-[#204987]"></i>
              <span className="text-[#204987]">소변량 기록(유치도뇨관)</span>
              <span className="text-[#e74c3c]">- 필요시</span>
            </div>
            <button className="rounded-sm bg-[#788fa0] px-3 py-1 text-[11px] text-white shadow-sm hover:bg-[#637d91]">
              전일자료조회
            </button>
          </div>

          <div className="flex flex-1 flex-col p-0">
            {/* Table Header */}
            <div className="border-b border-[#B8D1E0] bg-[#E8F1F8]">
              <table className="w-full table-fixed border-collapse text-[11px] text-[#333]">
                <thead>
                  <tr>
                    <th className="w-[15%] border-r border-[#B8D1E0] py-2 text-center font-bold">횟수</th>
                    <th className="w-[25%] border-r border-[#B8D1E0] py-2 text-center font-bold">소변시간</th>
                    <th className="w-[40%] border-r border-[#B8D1E0] py-2 text-center font-bold">소변량(총 0 ml)</th>
                    <th className="w-[20%] py-2 text-center font-bold">처리</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body - Scrollable Area */}
            <div className="custom-scrollbar h-[160px] overflow-y-auto">
              <table className="w-full table-fixed border-collapse text-[12px]">
                <tbody className="divide-y divide-gray-100">
                  {management.urineRecords.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-gray-400">
                        등록된 소변량(유치도뇨관) 기록이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    management.urineRecords.map((record, index) => (
                      <tr key={record.id} className="hover:bg-blue-50">
                        <td className="w-[15%] border-r border-[#B8D1E0] py-2 text-center text-gray-700">
                          {index + 1}
                        </td>
                        <td className="w-[25%] border-r border-[#B8D1E0] py-2 text-center text-gray-700">
                          {record.time}
                        </td>
                        <td className="w-[40%] border-r border-[#B8D1E0] py-2 text-center text-gray-700">
                          {record.amount}ml
                        </td>
                        <td className="w-[20%] py-2 text-center">
                          <button
                            onClick={() => handleDeleteUrine(record.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <i className="ri-close-fill text-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Add Form */}
            <div className="border-t border-[#B8D1E0] bg-[#f0f6fa] p-2">
              <div className="flex items-center gap-2">
                <span className="w-[60px] text-center text-[12px] font-bold text-[#204987]">추가</span>
                <input
                  type="time"
                  value={newUrine.time}
                  onChange={e => setNewUrine({ ...newUrine, time: e.target.value })}
                  className="w-[100px] border border-gray-300 px-2 py-1 text-[12px] outline-none focus:border-[#204987]"
                />
                <input
                  type="text"
                  placeholder="용량(ml)"
                  value={newUrine.amount}
                  onChange={e => setNewUrine({ ...newUrine, amount: e.target.value })}
                  className="flex-1 border border-gray-300 px-2 py-1 text-[12px] outline-none focus:border-[#204987]"
                />
                <button
                  onClick={handleAddUrine}
                  className="rounded-sm bg-[#204987] px-3 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-[#163a6f]"
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-center gap-2 py-4">
        <button
          onClick={onSave}
          className="rounded bg-[#2980b9] px-16 py-2 text-[14px] font-bold text-white shadow-md transition-colors hover:bg-[#2066aa]"
        >
          저장
        </button>
        <button className="flex flex-col items-center justify-center rounded bg-[#7f8c8d] px-6 py-1 text-white shadow-md transition-colors hover:bg-[#636e72]">
          <span className="text-[13px] font-bold">도뇨관 기록지 출력</span>
          <span className="text-[10px] opacity-90">2026.02.01 - 2026.02.28</span>
        </button>
      </div>

      {/* 2. 하단 리스트: 유치도뇨관 관리기록 이력 */}
      <div className="overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#B8D1E0] bg-[#f8fafc] px-3 py-2">
          <i className="ri-arrow-right-s-fill text-[10px] text-[#204987]"></i>
          <h3 className="text-[13px] font-bold text-[#204987]">유치도뇨관 관리기록 이력</h3>
        </div>
        <div className="min-h-[150px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-[#B8D1E0] bg-[#E8F1F8] text-center text-[11px] font-bold text-[#333]">
              <tr>
                <th className="w-[60px] border-r border-[#B8D1E0] py-2">연번</th>
                <th className="w-[100px] border-r border-[#B8D1E0] py-2">관리기록일</th>
                <th className="border-r border-[#B8D1E0] py-2">조치사항</th>
                <th className="border-r border-[#B8D1E0] py-2">관리기록</th>
                <th className="w-[80px] border-r border-[#B8D1E0] py-2">작성자</th>
                <th className="w-[60px] py-2">삭제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-center text-[12px]">
              <tr>
                <td colSpan={6} className="py-12 text-gray-500">
                  조회된 도뇨관 관리기록일지 목록이 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 hover:opacity-80">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-[#204987] focus:ring-[#204987]"
      />
      <span className="text-[12px] font-medium text-[#555]">{label}</span>
    </label>
  );
}
