'use client';

import React from 'react';
import clsx from 'clsx';

interface CatheterManagement {
  hasCatheter: boolean;
  catheterType: string;
  insertionDate: string;
  changeDate: string;
  urineAmount: string;
  urineColor: string;
  catheterStatus: string[];
  note: string;
}

interface Props {
  readonly management: CatheterManagement;
  readonly onChange: (management: CatheterManagement) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 5. 도뇨관(소변줄) 관리 및 관찰 기록 서식
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 데이터 그리드 적용
 */
export default function CatheterManagementTab({ management, onChange, onSave }: Props) {
  const catheterStatuses = ['정상 배액', '혼탁', '혈뇨', '침전물', '악취', '배액 불량', '통증'];

  const toggleStatus = (status: string) => {
    const newStatuses = management.catheterStatus.includes(status)
      ? management.catheterStatus.filter(s => s !== status)
      : [...management.catheterStatus, status];
    onChange({ ...management, catheterStatus: newStatuses });
  };

  const updateField = (field: keyof CatheterManagement, value: any) => {
    onChange({ ...management, [field]: value });
  };

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* 1. 도뇨관 상태 마스터 설정 섹션 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 bg-[#5C8D5A]"></div>
            <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">
              도뇨관(Catheter) 관리 관제
            </h4>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-[10px] font-black uppercase italic text-gray-400">도뇨관 사용 유무</label>
            <div className="flex rounded-lg bg-gray-100 p-1">
              {[
                { value: true, label: '사용(Active)' },
                { value: false, label: '미사용(None)' },
              ].map(opt => (
                <button
                  key={String(opt.value)}
                  onClick={() => updateField('hasCatheter', opt.value)}
                  className={clsx(
                    'rounded-md px-4 py-1 text-[11px] font-black transition-all',
                    management.hasCatheter === opt.value
                      ? 'bg-[#5C8D5A] text-white shadow-md'
                      : 'text-gray-400 hover:text-gray-600',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {management.hasCatheter ? (
            <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              {/* 왼쪽: 기본 사양 및 일자 관리 */}
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <GridInput
                    label="도뇨관 종류"
                    isSelect
                    value={management.catheterType}
                    onChange={(v: string) => updateField('catheterType', v)}
                  >
                    <option value="">선택하세요</option>
                    <option value="유치도뇨관">유치도뇨관 (Foley)</option>
                    <option value="간헐적도뇨">간헐적 도뇨 (Nelaton)</option>
                    <option value="치골상부도뇨관">치골상부 도뇨관</option>
                  </GridInput>
                  <GridInput
                    label="배액량 (ml)"
                    placeholder="예: 1200"
                    value={management.urineAmount}
                    onChange={(v: string) => updateField('urineAmount', v)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <GridInput
                    label="최근 삽입일"
                    type="date"
                    value={management.insertionDate}
                    onChange={(v: string) => updateField('insertionDate', v)}
                  />
                  <GridInput
                    label="교체 예정일"
                    type="date"
                    value={management.changeDate}
                    onChange={(v: string) => updateField('changeDate', v)}
                  />
                </div>

                <GridInput
                  label="소변 색상 및 특징"
                  placeholder="예: 맑은 황색, 침전물 없음"
                  value={management.urineColor}
                  onChange={(v: string) => updateField('urineColor', v)}
                />
              </div>

              {/* 오른쪽: 상태 체크리스트 및 특이사항 */}
              <div className="space-y-5">
                <div>
                  <label className="mb-3 block text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                    도뇨관 및 배액 상태 체크
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {catheterStatuses.map(status => (
                      <label
                        key={status}
                        className={clsx(
                          'flex cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 transition-all',
                          management.catheterStatus.includes(status)
                            ? 'border-[#5C8D5A] bg-emerald-50 font-black text-[#5C8D5A]'
                            : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300',
                        )}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={management.catheterStatus.includes(status)}
                          onChange={() => toggleStatus(status)}
                        />
                        <span className="text-[11px]">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                    도뇨 관리 특이사항
                  </label>
                  <textarea
                    value={management.note}
                    onChange={e => updateField('note', e.target.value)}
                    rows={4}
                    placeholder="도뇨관 개방성 유지 상태, 역류 방지 교육, 합병증 징후 등을 기록하세요."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium shadow-inner outline-none focus:border-[#5C8D5A]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 py-20">
              <i className="ri-shield-user-line mb-4 text-5xl text-gray-200"></i>
              <p className="text-[13px] font-black uppercase tracking-widest text-gray-400">도뇨관 미사용 상태입니다</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. 하단 액션 버튼 그룹 */}
      <div className="flex justify-center gap-2">
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-16 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-save-3-line text-lg"></i> 저장 및 확정
        </button>
        <button className="flex flex-col items-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-[13px] font-black leading-none text-gray-600 transition-all hover:bg-gray-50">
          도뇨관리 기록지 출력
          <span className="mt-1 font-sans text-[9px] font-bold uppercase italic tracking-tighter text-gray-400">
            AgapeCare Medical Report
          </span>
        </button>
      </div>

      {/* 3. 누적 도뇨관리 내역 테이블 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="h-4 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[13px] font-black uppercase text-gray-800">도뇨 및 소변 관리 누적 이력</h3>
        </div>
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center">No.</th>
                <th className="px-4 py-3">기록 일자</th>
                <th className="px-4 py-3">도뇨관 종류</th>
                <th className="px-4 py-3 text-center">배액량</th>
                <th className="px-4 py-3 text-center">색상/특징</th>
                <th className="px-4 py-3">관리 상태</th>
                <th className="px-4 py-3">특이사항</th>
                <th className="px-4 py-3 text-center">담당자</th>
                <th className="px-4 py-3 text-right">제어</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center opacity-30">
                    <i className="ri-flask-line mb-2 text-4xl text-gray-300"></i>
                    <p className="font-black uppercase tracking-widest text-gray-400">
                      등록된 도뇨 관리 기록이 없습니다
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= 내부 서브 컴포넌트 ================= */

/** 그리드 입력 항목 (Select/Input 공용) */
function GridInput({ label, type = 'text', placeholder, value, onChange, isSelect, children }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase italic tracking-tighter text-gray-400">{label}</label>
      {isSelect ? (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-700 outline-none transition-all focus:border-[#5C8D5A]"
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A]"
        />
      )}
    </div>
  );
}
