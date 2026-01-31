'use client';

import React from 'react';
import clsx from 'clsx';

export interface NursingCareNote {
  staff: string;
  observations: {
    homeServices: boolean;
    homeNursing: boolean;
    endOfMeal: boolean;
    visitBathingService: boolean;
    skinAbnormality: boolean;
    fallAndInjury: boolean;
    others: boolean;
  };
  piercings: {
    oralIntake: boolean;
    feeding: boolean;
    meatGrinding: boolean;
    dietRestriction: boolean;
    lowNatriumDiet: boolean;
    foodService: boolean;
    bathing: boolean;
    nightShift: boolean;
    dayActivity: boolean;
    rehabilitation: boolean;
    nursing: boolean;
    others: boolean;
  };
  observationNotes: string;
}

interface Props {
  readonly note: NursingCareNote;
  readonly onChange: (note: NursingCareNote) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 8. 간호 처치 및 상태 관찰 기록 서식
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 체크리스트 그리드 적용
 */
export default function NursingCareTab({ note, onChange, onSave }: Props) {
  if (!note)
    return (
      <div className="p-10 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">
        Loading Data...
      </div>
    );

  const toggleObservation = (key: keyof NursingCareNote['observations']) => {
    onChange({
      ...note,
      observations: { ...note.observations, [key]: !note.observations[key] },
    });
  };

  const togglePiercing = (key: keyof NursingCareNote['piercings']) => {
    onChange({
      ...note,
      piercings: { ...note.piercings, [key]: !note.piercings[key] },
    });
  };

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* 1. 간호 처치 및 관찰 마스터 섹션 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* [A] 처치 및 상태 체크리스트 (7/12 섹션) */}
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm lg:col-span-7">
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 bg-[#5C8D5A]"></div>
              <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">처치 및 상태 체크리스트</h4>
            </div>
            <span className="text-[9px] font-bold uppercase italic tracking-tighter text-[#5C8D5A]">
              Nursing Checklist
            </span>
          </div>

          <div className="space-y-6 p-5">
            {/* 세부 항목 그리드 */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <CheckItem
                label="경구섭취"
                checked={note.piercings.oralIntake}
                onChange={() => togglePiercing('oralIntake')}
              />
              <CheckItem
                label="비위관 영양"
                checked={note.piercings.feeding}
                onChange={() => togglePiercing('feeding')}
                isHighlight
              />
              <CheckItem
                label="다진찬/죽식"
                checked={note.piercings.meatGrinding}
                onChange={() => togglePiercing('meatGrinding')}
              />
              <CheckItem
                label="식사 제한"
                checked={note.piercings.dietRestriction}
                onChange={() => togglePiercing('dietRestriction')}
              />
              <CheckItem
                label="저염식"
                checked={note.piercings.lowNatriumDiet}
                onChange={() => togglePiercing('lowNatriumDiet')}
              />
              <CheckItem
                label="식사 보조"
                checked={note.piercings.foodService}
                onChange={() => togglePiercing('foodService')}
              />
              <CheckItem
                label="목욕 간호"
                checked={note.piercings.bathing}
                onChange={() => togglePiercing('bathing')}
              />
              <CheckItem
                label="야간 순회"
                checked={note.piercings.nightShift}
                onChange={() => togglePiercing('nightShift')}
              />
              <CheckItem
                label="주간 활동"
                checked={note.piercings.dayActivity}
                onChange={() => togglePiercing('dayActivity')}
              />
              <CheckItem
                label="재활 훈련"
                checked={note.piercings.rehabilitation}
                onChange={() => togglePiercing('rehabilitation')}
              />
              <CheckItem
                label="전문 간호"
                checked={note.piercings.nursing}
                onChange={() => togglePiercing('nursing')}
                isHighlight
              />
              <CheckItem label="기타 처치" checked={note.piercings.others} onChange={() => togglePiercing('others')} />
            </div>
          </div>
        </div>

        {/* [B] 관찰 종합 소견 (5/12 섹션) */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm lg:col-span-5">
          <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
            <i className="ri-chat-history-line text-[#5C8D5A]"></i>
            <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">간호 관찰 종합 소견</h4>
          </div>
          <div className="flex-1 p-5">
            <textarea
              value={note.observationNotes}
              onChange={e => onChange({ ...note, observationNotes: e.target.value })}
              className="h-full min-h-[180px] w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium leading-relaxed shadow-inner outline-none placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              placeholder="수급자의 전반적인 컨디션, 심리 상태, 이상 증후 관찰 내용을 기록하세요."
            />
          </div>
        </div>
      </div>

      {/* 2. 하단 저장 및 출력 액션 */}
      <div className="flex justify-center gap-3">
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-16 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-checkbox-circle-line text-lg"></i> 처치 기록 저장
        </button>
        <button className="flex flex-col items-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-[13px] font-black leading-none text-gray-600 transition-all hover:bg-gray-50">
          간호 처치 기록지 출력
          <span className="mt-1 font-sans text-[9px] font-bold uppercase italic tracking-tighter text-gray-400">
            Daily Observation Report
          </span>
        </button>
      </div>

      {/* 3. 누적 간호 처치 내역 테이블 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="h-4 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[13px] font-black uppercase text-gray-800">최근 간호 처치 및 상태 관찰 누적 이력</h3>
        </div>
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center">No.</th>
                <th className="px-4 py-3">기록 일자</th>
                <th className="px-4 py-3">처치 내역 요약</th>
                <th className="px-4 py-3">관찰 소견</th>
                <th className="px-4 py-3 text-center">담당자</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center opacity-30">
                    <i className="ri-folder-history-line mb-2 text-4xl text-gray-300"></i>
                    <p className="font-black uppercase tracking-widest text-gray-400">
                      등록된 누적 처치 기록이 없습니다
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

/** 체크리스트 개별 항목 */
function CheckItem({ label, checked, onChange, isHighlight }: any) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 shadow-sm transition-all active:scale-95',
        checked
          ? 'border-[#5C8D5A] bg-emerald-50 text-[#5C8D5A] ring-1 ring-[#5C8D5A]/20'
          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300',
        isHighlight && !checked && 'border-emerald-100 bg-emerald-50/30',
      )}
    >
      <span className={clsx('text-[11px] font-black tracking-tight', checked ? 'opacity-100' : 'opacity-70')}>
        {label}
      </span>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <div
        className={clsx(
          'flex h-4 w-4 items-center justify-center rounded-md border transition-all',
          checked ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white' : 'border-gray-200 bg-gray-50 text-transparent',
        )}
      >
        <i className="ri-check-line text-[10px] font-black"></i>
      </div>
    </label>
  );
}
