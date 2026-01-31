'use client';

import React from 'react';
import clsx from 'clsx';

interface VitalRecord {
  time: string;
  bloodPressure: { systolic: string; diastolic: string };
  pulse: string;
  temperature: string;
  respiration: string;
  weight: string;
  memo: {
    breakfast: 'yes' | 'no' | '';
    lunch: 'yes' | 'no' | '';
    dinner: 'yes' | 'no' | '';
    snack: string;
  };
  excretion: {
    urine: 'yes' | 'no';
    stool: 'yes' | 'no' | 'normal' | 'abnormal' | '';
  };
}

interface Props {
  readonly record: VitalRecord;
  readonly onChange: (record: VitalRecord) => void;
}

/**
 * [Tab Content] 1. 간호일지 및 활력징후 기록 서식
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 데이터 그리드 적용
 */
export default function VitalSignsTab({ record, onChange }: Props) {
  const updateField = (field: string, value: any) => onChange({ ...record, [field]: value });

  const updateBloodPressure = (type: 'systolic' | 'diastolic', value: string) => {
    onChange({ ...record, bloodPressure: { ...record.bloodPressure, [type]: value } });
  };

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* A. 활력 징후 정밀 측정 영역 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-1 rounded-full bg-[#5C8D5A]"></div>
            <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">
              실시간 활력 징후 (Vital Signs)
            </h4>
          </div>
          <div className="flex gap-1.5">
            <button className="rounded border border-gray-300 bg-white px-2.5 py-1 text-[9px] font-black text-gray-500 transition-all hover:bg-emerald-50 hover:text-[#5C8D5A]">
              전일 자료 조회
            </button>
            <button className="rounded border border-gray-300 bg-white px-2.5 py-1 text-[9px] font-black text-gray-500 transition-all hover:bg-emerald-50 hover:text-[#5C8D5A]">
              최근 현황 조회
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 md:grid-cols-4 md:divide-y-0 lg:grid-cols-7">
          <GridInput label="측정 시각" type="time" value={record.time} onChange={v => updateField('time', v)} />
          <div className="flex flex-col bg-emerald-50/20 p-4">
            <label className="mb-2 text-[10px] font-black uppercase italic tracking-tighter text-[#5C8D5A]">
              혈압 (BP)
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                placeholder="Sys"
                value={record.bloodPressure.systolic}
                onChange={e => updateBloodPressure('systolic', e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent py-1 text-center font-mono text-[14px] font-black outline-none focus:border-[#5C8D5A]"
              />
              <span className="text-gray-300">/</span>
              <input
                type="number"
                placeholder="Dia"
                value={record.bloodPressure.diastolic}
                onChange={e => updateBloodPressure('diastolic', e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent py-1 text-center font-mono text-[14px] font-black outline-none focus:border-[#5C8D5A]"
              />
            </div>
          </div>
          <GridInput
            label="맥박 (PR)"
            unit="회"
            color="text-[#5C8D5A]"
            value={record.pulse}
            onChange={v => updateField('pulse', v)}
          />
          <GridInput
            label="체온 (BT)"
            unit="℃"
            color="text-orange-600"
            value={record.temperature}
            onChange={v => updateField('temperature', v)}
          />
          <GridInput
            label="호흡 (RR)"
            unit="회"
            color="text-blue-600"
            value={record.respiration}
            onChange={v => updateField('respiration', v)}
          />
          <GridInput label="혈당 (BST)" unit="mg" value="" onChange={() => {}} />
          <GridInput label="체중 (BW)" unit="kg" value={record.weight} onChange={v => updateField('weight', v)} />
        </div>
      </div>

      {/* B. 간호 및 처치 기록 영역 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 건강관리 (특이사항) */}
        <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <i className="ri-heart-pulse-line text-[#5C8D5A]"></i>
            <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-700">건강관리 특이사항</h5>
          </div>
          <textarea
            rows={5}
            placeholder="수급자의 건강 상태 변화 및 특이사항을 기록하세요."
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium leading-relaxed shadow-inner outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
          <p className="mt-2 text-[9px] font-bold uppercase italic text-gray-300">Nursing Observation Logic Enabled</p>
        </div>

        {/* 간호관리 (처치내역) */}
        <div className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="ri-first-aid-kit-line text-[#5C8D5A]"></i>
              <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-700">간호 처치 및 상세 내역</h5>
            </div>
            <span className="rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-[#5C8D5A]">
              처치 필수
            </span>
          </div>
          <div className="space-y-4">
            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[12px] font-bold text-gray-700 outline-none focus:border-[#5C8D5A]">
              <option>호흡기간호 (가습기 사용 및 관찰)</option>
              <option>피부간호 (욕창 예방 및 소독)</option>
            </select>
            <textarea
              rows={3}
              placeholder="상세 처치 내역을 입력하세요."
              className="w-full resize-none rounded-lg border border-gray-300 p-4 text-[12px] font-medium shadow-sm outline-none focus:border-[#5C8D5A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** 내부 컴포넌트: 그리드 입력 항목 */
function GridInput({ label, type = 'number', unit, color = 'text-gray-900', value, onChange }: any) {
  return (
    <div className="flex flex-col p-4 transition-colors hover:bg-gray-50">
      <label className="mb-2 text-[10px] font-black uppercase italic tracking-tighter text-gray-400">{label}</label>
      <div className="flex items-end gap-1">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={clsx(
            'w-full border-b border-gray-200 bg-transparent py-1 text-center font-mono text-[15px] font-black outline-none focus:border-[#5C8D5A]',
            color,
          )}
        />
        {unit && <span className="mb-1.5 text-[10px] font-bold text-gray-300">{unit}</span>}
      </div>
    </div>
  );
}
