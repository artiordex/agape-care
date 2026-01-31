'use client';

import React from 'react';
import clsx from 'clsx';

interface BowelManagement {
  urineType: 'normal' | 'incontinence' | 'catheter' | 'frequent' | '';
  urineAmount: string;
  urineColor: string;
  stoolType: 'normal' | 'diarrhea' | 'constipation' | 'diaper' | '';
  stoolAmount: string;
  stoolColor: string;
  note: string;
}

interface Props {
  readonly management: BowelManagement;
  readonly onChange: (management: BowelManagement) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 6. 배설 관리 (배뇨/배변) 기록 서식
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 행정 레이아웃 적용
 */
export default function BowelManagementTab({ management, onChange, onSave }: Props) {
  const updateField = (field: keyof BowelManagement, value: string) => {
    onChange({ ...management, [field]: value });
  };

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* 1. 배설 기록 마스터 섹션 */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* [A] 배뇨 관리 (Urine Management) */}
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-4 py-2.5">
            <i className="ri-drop-line text-lg text-[#5C8D5A]"></i>
            <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">배뇨 상태 관제</h4>
          </div>
          <div className="space-y-5 p-5">
            <BowelRadioGroup
              label="배뇨 상태 구분"
              name="urineType"
              value={management.urineType}
              options={[
                { value: 'normal', label: '정상' },
                { value: 'incontinence', label: '요실금' },
                { value: 'catheter', label: '도뇨관' },
                { value: 'frequent', label: '빈뇨' },
              ]}
              onChange={v => updateField('urineType', v)}
            />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <GridInput
                label="배뇨 양 (Amount)"
                placeholder="예: 보통, 300ml"
                value={management.urineAmount}
                onChange={v => updateField('urineAmount', v)}
              />
              <GridInput
                label="색상/특징 (Color)"
                placeholder="예: 투명함, 황색"
                value={management.urineColor}
                onChange={v => updateField('urineColor', v)}
              />
            </div>
          </div>
        </div>

        {/* [B] 배변 관리 (Stool Management) */}
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-4 py-2.5">
            <i className="ri-rest-time-line text-lg text-orange-500"></i>
            <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">배변 상태 관제</h4>
          </div>
          <div className="space-y-5 p-5">
            <BowelRadioGroup
              label="배변 상태 구분"
              name="stoolType"
              value={management.stoolType}
              options={[
                { value: 'normal', label: '정상' },
                { value: 'diarrhea', label: '설사' },
                { value: 'constipation', label: '변비' },
                { value: 'diaper', label: '기저귀' },
              ]}
              onChange={v => updateField('stoolType', v)}
            />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <GridInput
                label="배변 양 (Amount)"
                placeholder="예: 소량, 보통"
                value={management.stoolAmount}
                onChange={v => updateField('stoolAmount', v)}
              />
              <GridInput
                label="형태/색상 (Form)"
                placeholder="예: 고형, 갈색"
                value={management.stoolColor}
                onChange={v => updateField('stoolColor', v)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 통합 특이사항 및 관찰 기록 */}
      <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <i className="ri-chat-history-line text-[#5C8D5A]"></i>
          <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-700">
            배설 관련 특이사항 및 처치 기록
          </h5>
        </div>
        <textarea
          value={management.note}
          onChange={e => updateField('note', e.target.value)}
          rows={3}
          placeholder="배설 양상 변화, 복부 팽만감, 하제 투여 여부 등을 구체적으로 기록하세요."
          className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium leading-relaxed shadow-inner outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
        />
      </div>

      {/* 3. 하단 누적 이력 테이블 (Audit Log Style) */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 bg-[#5C8D5A]"></div>
            <h3 className="text-[13px] font-black uppercase text-gray-800">배설 관리 기록 누적 이력</h3>
          </div>
          <button className="rounded-lg border border-[#5C8D5A] bg-emerald-50 px-4 py-1.5 text-[10px] font-black text-[#5C8D5A] shadow-sm transition-all hover:bg-[#5C8D5A] hover:text-white">
            배변관리 기록지 통합 출력
          </button>
        </div>
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center">No.</th>
                <th className="px-4 py-3">기록 일시</th>
                <th className="px-4 py-3">배뇨상태</th>
                <th className="px-4 py-3">배뇨양/색</th>
                <th className="px-4 py-3">배변상태</th>
                <th className="px-4 py-3">배변양/색</th>
                <th className="px-4 py-3">특이사항</th>
                <th className="px-4 py-3 text-center">담당자</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center opacity-40">
                    <i className="ri-rest-time-line mb-2 text-4xl text-gray-300"></i>
                    <p className="font-black uppercase tracking-widest text-gray-400">
                      등록된 배설 관리 기록이 존재하지 않습니다
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

/** 배설 전용 라디오 그룹 */
function BowelRadioGroup({ label, name, value, options, onChange }: any) {
  return (
    <div>
      <label className="mb-2.5 block text-[10px] font-black uppercase italic tracking-widest text-gray-400">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt: any) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              'min-w-[70px] flex-1 rounded-lg border px-3 py-2 text-[12px] font-black shadow-sm transition-all active:scale-95',
              value === opt.value
                ? 'border-[#5C8D5A] bg-emerald-50 text-[#5C8D5A] ring-1 ring-[#5C8D5A]/20'
                : 'border-gray-200 bg-white text-gray-400 hover:border-[#5C8D5A]/30 hover:text-gray-600',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** 그리드 입력 항목 */
function GridInput({ label, placeholder, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
      />
    </div>
  );
}
