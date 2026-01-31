'use client';

import React from 'react';
import clsx from 'clsx';

export interface TechnicalManagement {
  services: {
    suction: boolean;
    oxygenTherapy: boolean;
    nebulizer: boolean;
    physicalTherapy: boolean;
    rehabilitationExercise: boolean;
    positionChange: boolean;
    massage: boolean;
    other: boolean;
  };
  otherDetail: string;
  note: string;
}

interface Props {
  readonly management: TechnicalManagement;
  readonly onChange: (management: TechnicalManagement) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 9. 기술류 관리 및 전문 간호 처치 기록 서식
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 행정 레이아웃 적용
 */
export default function TechnicalNursingTab({ management, onChange, onSave }: Props) {
  if (!management || !management.services) {
    return (
      <div className="p-10 text-center text-[11px] font-black uppercase tracking-widest text-gray-400">
        Initializing Technical Data...
      </div>
    );
  }

  const toggleService = (key: keyof TechnicalManagement['services']) => {
    onChange({
      ...management,
      services: { ...management.services, [key]: !management.services[key] },
    });
  };

  const updateNote = (value: string) => onChange({ ...management, note: value });

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* 1. 전문 간호 기술류 처치 마스터 섹션 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* [A] 전문 간호 서비스 체크리스트 (8/12 섹션) */}
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm lg:col-span-8">
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 bg-[#5C8D5A]"></div>
              <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">
                전문 간호 기술류 처치 현황
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter text-[#5C8D5A]">
                Medical Protocol Active
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* 고밀도 서비스 그리드 */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <ServiceToggle
                label="흡인 (Suction)"
                checked={management.services.suction}
                onChange={() => toggleService('suction')}
              />
              <ServiceToggle
                label="산소요법"
                checked={management.services.oxygenTherapy}
                onChange={() => toggleService('oxygenTherapy')}
              />
              <ServiceToggle
                label="네뷸라이저"
                checked={management.services.nebulizer}
                onChange={() => toggleService('nebulizer')}
              />
              <ServiceToggle
                label="물리치료"
                checked={management.services.physicalTherapy}
                onChange={() => toggleService('physicalTherapy')}
              />
              <ServiceToggle
                label="재활운동"
                checked={management.services.rehabilitationExercise}
                onChange={() => toggleService('rehabilitationExercise')}
              />
              <ServiceToggle
                label="체위변경"
                checked={management.services.positionChange}
                onChange={() => toggleService('positionChange')}
              />
              <ServiceToggle
                label="마사지"
                checked={management.services.massage}
                onChange={() => toggleService('massage')}
              />
              <ServiceToggle
                label="기타 전문간호"
                checked={management.services.other}
                onChange={() => toggleService('other')}
              />
            </div>
          </div>
        </div>

        {/* [B] 간호 기술류 요약 정보 (4/12 섹션) */}
        <div className="rounded-xl border border-gray-300 bg-emerald-50/20 p-5 shadow-inner lg:col-span-4">
          <h5 className="mb-4 text-[11px] font-black uppercase tracking-widest text-gray-700">기술류 관리 가이드</h5>
          <ul className="space-y-3">
            <li className="flex gap-2 text-[11px] font-bold leading-snug text-gray-500">
              <i className="ri-information-line mt-0.5 text-[#5C8D5A]"></i>
              <span>전문 간호사가 시행한 의료적 처치 항목을 정확히 체크하십시오.</span>
            </li>
            <li className="flex gap-2 text-[11px] font-bold leading-snug text-gray-500">
              <i className="ri-alert-line mt-0.5 text-orange-500"></i>
              <span>처치 후 대상자의 반응 및 활력 징후 변화를 하단 특이사항에 반드시 기록하십시오.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. 전문 간호 특이사항 기록 */}
      <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <i className="ri-folder-shield-2-line text-[#5C8D5A]"></i>
          <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-700">
            전문 간호 처치 상세 및 특이사항
          </h5>
        </div>
        <textarea
          value={management.note}
          onChange={e => updateNote(e.target.value)}
          rows={5}
          placeholder="간호 기술류 처치 내용, 시행 전후 상태, 합병증 유무 등을 구체적으로 서술하십시오."
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium leading-relaxed shadow-inner outline-none placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
        />
        <div className="mt-2 flex justify-end">
          <span className="text-[9px] font-black uppercase italic text-gray-300">
            Agape Medical Audit Logic Enabled
          </span>
        </div>
      </div>

      {/* 3. 하단 통합 액션 그룹 */}
      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={onSave}
          className="flex items-center gap-3 rounded-lg bg-[#5C8D5A] px-20 py-3.5 text-[14px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-save-3-line text-lg"></i> 전문 간호 기록 저장
        </button>
      </div>

      {/* 4. 누적 기술류 관리 내역 테이블 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="h-4 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[13px] font-black uppercase text-gray-800">최근 전문 간호 기술류 관리 누적 이력</h3>
        </div>
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center">No.</th>
                <th className="px-4 py-3">기록 일시</th>
                <th className="px-4 py-3">처치 서비스 항목</th>
                <th className="px-4 py-3">상세 특이사항</th>
                <th className="px-4 py-3 text-center">작성자</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center opacity-30">
                    <i className="ri-shield-user-line mb-2 text-4xl text-gray-300"></i>
                    <p className="font-black uppercase tracking-widest text-gray-400">
                      등록된 전문 간호 누적 기록이 없습니다
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

/** 기술류 전용 서비스 토글 버튼 */
function ServiceToggle({ label, checked, onChange }: any) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow-sm transition-all active:scale-95',
        checked
          ? 'border-[#5C8D5A] bg-emerald-50 text-[#5C8D5A] ring-1 ring-[#5C8D5A]/20'
          : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200',
      )}
    >
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <div
        className={clsx(
          'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all',
          checked ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white' : 'border-gray-200 bg-gray-50 text-transparent',
        )}
      >
        <i className="ri-check-line text-sm font-black"></i>
      </div>
      <span
        className={clsx('text-center text-[11px] font-black tracking-tight', checked ? 'opacity-100' : 'opacity-60')}
      >
        {label}
      </span>
    </label>
  );
}
