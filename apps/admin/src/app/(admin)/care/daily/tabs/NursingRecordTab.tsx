'use client';

import React from 'react';
import clsx from 'clsx';

interface NursingNote {
  date: string;
  type: string;
  hospital: string;
  doctorOpinion: string;
  diagnosis: string;
  cost: number;
  costType: string;
  medicine: string;
  medicineTime: string;
  observation: string;
}

interface Props {
  readonly note: NursingNote;
  readonly onChange: (note: NursingNote) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 7. 외래 및 계약의사 진료 기록 서식
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 데이터 그리드 적용
 */
export default function NursingRecordTab({ note, onChange, onSave }: Props) {
  const updateField = (field: keyof NursingNote, value: any) => {
    onChange({ ...note, [field]: value });
  };

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* 1. 진료 정보 입력 마스터 섹션 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 bg-[#5C8D5A]"></div>
            <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-800">진료 및 처방 기록 관제</h4>
          </div>
          <div className="flex gap-1.5">
            <button className="rounded border border-gray-300 bg-white px-2.5 py-1 text-[9px] font-black text-gray-500 transition-all hover:bg-emerald-50 hover:text-[#5C8D5A]">
              병의원 관리
            </button>
            <button className="rounded border border-gray-300 bg-white px-2.5 py-1 text-[9px] font-black text-gray-500 transition-all hover:bg-emerald-50 hover:text-[#5C8D5A]">
              계약의사 관리
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-x divide-gray-100 lg:grid-cols-2">
          {/* [좌측] 진료 사양 및 비용 정보 */}
          <div className="space-y-5 bg-emerald-50/10 p-6">
            <div className="grid grid-cols-2 gap-4">
              <GridInput
                label="진료 일자"
                type="date"
                value={note.date}
                onChange={(v: string) => updateField('date', v)}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase italic text-gray-400">진료 구분</label>
                <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                  {['외래진료', '계약의사진료'].map(t => (
                    <button
                      key={t}
                      onClick={() => updateField('type', t)}
                      className={clsx(
                        'flex-1 rounded-md py-1.5 text-[11px] font-black transition-all',
                        note.type === t ? 'bg-[#5C8D5A] text-white shadow-md' : 'text-gray-400',
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <GridInput
                label="병의원명"
                placeholder="예: 아가페 내과"
                value={note.hospital}
                onChange={(v: string) => updateField('hospital', v)}
                isSearch
              />
              <GridInput label="작성자" value="최인정" onChange={() => {}} isSearch />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase italic text-[#5C8D5A]">진료비 (Medical Cost)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={note.cost}
                    onChange={e => updateField('cost', e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-right font-mono text-[13px] font-black outline-none focus:border-[#5C8D5A]"
                  />
                  <span className="text-[11px] font-bold text-gray-400">원</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase italic text-gray-400">청구 구분</label>
                <div className="flex gap-2">
                  {['청구', '미청구'].map(ct => (
                    <button
                      key={ct}
                      onClick={() => updateField('costType', ct)}
                      className={clsx(
                        'flex-1 rounded-md border py-2 text-[11px] font-black transition-all',
                        note.costType === ct
                          ? 'border-[#5C8D5A] bg-emerald-50 text-[#5C8D5A]'
                          : 'border-gray-200 bg-white text-gray-400',
                      )}
                    >
                      {ct}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* [우측] 진료 내용 및 의사 소견 */}
          <div className="space-y-5 p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                주요 진단 및 의사 소견
              </label>
              <textarea
                value={note.doctorOpinion}
                onChange={e => updateField('doctorOpinion', e.target.value)}
                rows={6}
                placeholder="의사의 진단 결과 및 향후 치료 계획, 약물 처방 내역을 상세히 기록하세요."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-[12px] font-medium leading-relaxed shadow-inner outline-none focus:border-[#5C8D5A]"
              />
            </div>
            <GridInput
              label="처방 약제 (Medication)"
              placeholder="예: 혈압약 30일분, 거담제"
              value={note.medicine}
              onChange={(v: string) => updateField('medicine', v)}
            />
          </div>
        </div>
      </div>

      {/* 2. 하단 액션 버튼 그룹 */}
      <div className="flex justify-center gap-2">
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg bg-[#5C8D5A] px-16 py-3 text-[13px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-save-3-line text-lg"></i> 진료 기록 저장
        </button>
        <button className="flex flex-col items-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-[13px] font-black leading-none text-gray-600 transition-all hover:bg-gray-50">
          진료 기록지(월별) 출력
          <span className="mt-1 font-sans text-[9px] font-bold uppercase italic tracking-tighter text-gray-400">
            Monthly Medical Report
          </span>
        </button>
      </div>

      {/* 3. 누적 진료 내역 테이블 */}
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="h-4 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[13px] font-black uppercase text-gray-800">최근 진료 및 약제 청구 내역</h3>
        </div>
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
              <tr>
                <th className="px-4 py-3 text-center">No.</th>
                <th className="px-4 py-3">진료일</th>
                <th className="px-4 py-3">구분</th>
                <th className="px-4 py-3">병의원명</th>
                <th className="px-4 py-3">진단명/처방</th>
                <th className="px-4 py-3 text-right">진료비</th>
                <th className="px-4 py-3 text-right">약제비</th>
                <th className="px-4 py-3 text-center">작성자</th>
                <th className="px-4 py-3 text-right">제어</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              <tr className="transition-colors hover:bg-emerald-50/30">
                <td className="px-4 py-3 text-center font-mono text-gray-300">001</td>
                <td className="px-4 py-3 font-mono font-black text-gray-700">2026.01.15</td>
                <td className="px-4 py-3">
                  <span className="rounded border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[9px] font-black uppercase text-blue-600">
                    외래진료
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-gray-800">국제성모병원</td>
                <td className="max-w-[150px] truncate px-4 py-3 text-gray-500">정기 검진 및 고혈압 약 처방</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-gray-800">12,500</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-gray-800">8,900</td>
                <td className="px-4 py-3 text-center font-bold text-gray-600">이강호</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-gray-300 hover:text-[#5C8D5A]">
                    <i className="ri-more-2-fill text-lg"></i>
                  </button>
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

/** 그리드 입력 항목 */
function GridInput({ label, type = 'text', placeholder, value, onChange, isSearch }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase italic tracking-tighter text-gray-400">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A]',
            isSearch && 'pr-10',
          )}
        />
        {isSearch && (
          <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-100 p-1 text-gray-400 hover:text-[#5C8D5A]">
            <i className="ri-search-2-line text-xs"></i>
          </button>
        )}
      </div>
    </div>
  );
}
