/**
 * Description : WoundCareTab.tsx - ?? ? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { useState } from 'react';

export interface WoundCare {
  location: string;
  stage: string;
  size: { length: string; width: string; depth: string };
  appearance: string[];
  treatment: string[];
  dressing: string;
  note: string;
  // New/Optional fields for UI
  preventionApps?: string[];
  provider?: string;
}

interface Props {
  readonly care: WoundCare;
  readonly onChange: (care: WoundCare) => void;
  readonly onSave: () => void;
}

/**
 * [Tab Content] 3. 욕창간호 (Wound Care)
 * Layout: Split view (Body Map | Input Form)
 * Theme: Blue-Gray headers (#E8F1F8) and Agape Green/Blue accents.
 */
export default function WoundCareTab({ care, onChange, onSave }: Props) {
  // Local state for UI inputs that might not be in parent state yet
  const [provider, setProvider] = useState(care.provider || '양안순');
  const [preventionApps, setPreventionApps] = useState<string[]>(care.preventionApps || ['쿠션', '욕창예방매트리스']);

  // Body Map Points (Mock Data for Visualization)
  const leftPoints = [
    { id: '1', label: '1.후두부' },
    { id: '15', label: '15.좌귀' },
    { id: '2', label: '2.좌측어깨' },
    { id: '4', label: '4.좌견갑골' },
    { id: '6', label: '6.좌팔뒤꿈치' },
    { id: '8', label: '8.좌허리' },
    { id: '11', label: '11.좌골반' },
    { id: '17', label: '17.좌무릎' },
    { id: '13', label: '13.좌발꿈치' },
  ];

  const rightPoints = [
    { id: '16', label: '16.우귀' },
    { id: '3', label: '3.우측어깨' },
    { id: '5', label: '5.우견갑골' },
    { id: '7', label: '7.우팔뒤꿈치' },
    { id: '9', label: '9.우허리' },
    { id: '12', label: '12.우골반' },
    { id: '10', label: '10.꼬리뼈언저리' },
    { id: '18', label: '18.우무릎' },
    { id: '14', label: '14.우발꿈치' },
  ];

  const togglePrevention = (item: string) => {
    setPreventionApps(prev => (prev.includes(item) ? prev.filter(p => p !== item) : [...prev, item]));
  };

  // Helper styles
  const labelClass =
    'w-[80px] text-center bg-[#E8F1F8] border-r border-[#B8D1E0] text-[12px] font-bold text-[#333] flex items-center justify-center p-2';
  const inputCellClass = 'p-2 bg-white flex-1 flex items-center gap-2';
  const checkboxClass =
    'w-4 h-4 border-gray-300 rounded text-[#E67E22] focus:ring-[#E67E22] checked:bg-[#E67E22] checked:border-[#E67E22] transition-colors cursor-pointer';

  return (
    <div className="flex flex-col gap-4 font-sans text-[#333] antialiased">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-checkbox-indeterminate-line text-[14px] text-blue-600"></i>
          <h3 className="text-[13px] font-bold text-blue-800">욕창간호기록</h3>
        </div>
        <button className="rounded bg-[#5C7C95] px-3 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-[#4a6b8a]">
          체위변경기록 조회
        </button>
      </div>

      {/* 2. Main Content: Split Layout */}
      <div className="flex flex-col gap-4 rounded-md border border-[#B8D1E0] bg-white p-4 shadow-sm lg:flex-row">
        {/* Left: Body Map Visual */}
        <div className="relative flex min-h-[300px] flex-1 justify-between border border-[#B8D1E0] bg-white p-4 lg:max-w-[400px]">
          {/* Left Column Labels */}
          <div className="flex flex-col justify-between gap-1">
            {leftPoints.map(p => (
              <label key={p.id} className="flex cursor-pointer items-center gap-1 rounded p-0.5 hover:bg-gray-50">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#E67E22] focus:ring-[#E67E22]"
                />
                <span className="text-[11px] font-medium text-gray-700">{p.label}</span>
              </label>
            ))}
          </div>

          {/* Center Body Placeholder */}
          <div className="relative mx-4 flex flex-1 items-center justify-center">
            <div className="flex h-[280px] w-[120px] items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-100">
              <span className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Body
                <br />
                Map
              </span>
            </div>
            {/* Decorative Lines could go here, omitting for simplicity */}
          </div>

          {/* Right Column Labels */}
          <div className="flex flex-col items-end justify-between gap-1 text-right">
            {rightPoints.map(p => (
              <label
                key={p.id}
                className="flex cursor-pointer flex-row-reverse items-center gap-1 rounded p-0.5 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#E67E22] focus:ring-[#E67E22]"
                />
                <span className="text-[11px] font-medium text-gray-700">{p.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right: Input Form */}
        <div className="flex flex-1 flex-col border border-[#B8D1E0]">
          {/* Row 1: Location */}
          <div className="flex min-h-[40px] border-b border-[#B8D1E0]">
            <div className={labelClass}>
              욕창부위 <span className="text-red-500">*</span>
            </div>
            <div className={inputCellClass}>
              <input
                type="text"
                value={care.location || '우측 발가락'}
                onChange={e => onChange({ ...care, location: e.target.value })}
                className="w-full border border-[#B8D1E0] bg-[#FFFBE6] px-2 py-1 text-[12px] focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Size */}
          <div className="flex min-h-[40px] border-b border-[#B8D1E0]">
            <div className={labelClass}>
              크기 <span className="text-red-500">*</span>
            </div>
            <div className={inputCellClass}>
              <div className="flex w-[200px] items-center gap-1">
                <input
                  type="text"
                  value={`${care.size?.length || 1}*${care.size?.width || 1.5}*${care.size?.depth || 1}`}
                  readOnly
                  className="flex-1 border border-[#B8D1E0] px-2 py-1 text-center text-[12px]"
                />
              </div>
              <span className="text-[11px] italic text-gray-500">(가로*세로*깊이)</span>
            </div>
          </div>

          {/* Row 3: Prevention Tools */}
          <div className="flex min-h-[40px] border-b border-[#B8D1E0]">
            <div className={labelClass}>
              방지도구 <span className="text-red-500">*</span>
            </div>
            <div className={inputCellClass}>
              {['쿠션', '방석', '욕창예방매트리스', '기타'].map(opt => (
                <label key={opt} className="flex cursor-pointer select-none items-center gap-1">
                  <div className="relative flex h-4 w-4 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={preventionApps.includes(opt)}
                      onChange={() => togglePrevention(opt)}
                      className="peer h-4 w-4 appearance-none rounded border border-gray-300 bg-white checked:border-[#E67E22] checked:bg-[#E67E22]"
                    />
                    <i className="ri-check-line absolute text-[10px] font-bold text-white opacity-0 peer-checked:opacity-100"></i>
                  </div>
                  <span className="text-[12px] text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Row 4: Dressing & Provider */}
          <div className="flex min-h-[40px] border-b border-[#B8D1E0]">
            <div className={labelClass}>Dressing</div>
            <div className="flex w-[180px] items-center border-r border-[#B8D1E0] bg-white p-2">
              <select
                value={care.dressing || '디오덤도포'}
                onChange={e => onChange({ ...care, dressing: e.target.value })}
                className="w-full border border-[#B8D1E0] px-1 py-1 text-[12px] focus:outline-none"
              >
                <option value="디오덤도포">디오덤도포</option>
                <option value="메디폼">메디폼</option>
                <option value="거즈드레싱">거즈드레싱</option>
              </select>
            </div>
            <div className={labelClass}>
              제공자 <span className="text-red-500">*</span>
            </div>
            <div className={`${inputCellClass} p-1.5`}>
              <input
                type="text"
                value={provider}
                readOnly
                className="flex-1 border border-[#B8D1E0] px-2 py-1 text-center text-[12px]"
              />
              <button className="rounded bg-[#5C7C95] px-3 py-1 text-[11px] text-white hover:bg-[#4a6b8a]">선택</button>
            </div>
          </div>

          {/* Row 5: Treatment & Photo */}
          <div className="flex min-h-[120px] flex-1">
            <div className={`${labelClass} flex flex-col justify-center`}>
              조치내용 <span className="text-red-500">*</span>
            </div>
            <div className="flex-1 border-r border-[#B8D1E0] bg-white p-2">
              <textarea
                value={care.note || '생리식염수 소독 후 메타폼 붙여드림'}
                onChange={e => onChange({ ...care, note: e.target.value })}
                className="h-full w-full resize-none border border-[#B8D1E0] bg-[#F9F9F9] p-2 text-[12px] focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex w-[180px] flex-col items-center justify-center gap-2 bg-white p-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-[11px] font-bold text-gray-700">사진첨부</span>
                <button className="rounded bg-[#5C7C95] px-2 py-0.5 text-[10px] text-white">사진선택</button>
              </div>
              <div className="flex w-full flex-1 flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50 text-gray-300">
                <i className="ri-image-add-line text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="relative z-10 my-6 flex justify-center gap-2 pb-4">
        <button
          onClick={onSave}
          className="rounded bg-[#5C8D5A] px-12 py-2 text-[13px] font-bold text-white shadow hover:bg-[#4a7548]"
        >
          저장
        </button>
        <button className="flex flex-col items-center justify-center rounded border border-[#5C8D5A] bg-white px-4 py-2 text-[13px] font-bold leading-none text-[#5C8D5A] shadow hover:bg-emerald-50">
          <span className="mb-0.5 block">체위변경 기록지 출력</span>
          <span className="text-[10px] font-normal opacity-80">2026.02.01 - 2026.02.28</span>
        </button>
        <button className="flex flex-col items-center justify-center rounded border border-[#5C8D5A] bg-white px-4 py-2 text-[13px] font-bold leading-none text-[#5C8D5A] shadow hover:bg-emerald-50">
          <span className="mb-0.5 block">욕창간호 기록지</span>
          <span className="text-[10px] font-normal opacity-80">2026.02.01 - 2026.02.28</span>
        </button>
      </div>

      {/* 4. Wound Care History */}
      <div className="mt-2 rounded-t-lg border border-[#B8D1E0] bg-white">
        <div className="flex items-center justify-between border-b border-[#B8D1E0] bg-[#f8fafc] px-4 py-2">
          <div className="flex items-center gap-2">
            <i className="ri-file-list-line text-blue-600"></i>
            <h4 className="text-[12px] font-bold text-[#2E6A9E]">욕창간호기록 이력</h4>
          </div>
          <span className="text-[10px] text-gray-500">
            ※ 욕창간호 대상 수급자에게 주1회 이상 욕창간호급여를 제공하여야 합니다.
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead className="border-b border-[#B8D1E0] bg-[#E8F1F8]">
              <tr>
                {['연번', '주차', '간호기록일', '욕창부위'].map(h => (
                  <th key={h} className="whitespace-nowrap border-r border-[#B8D1E0] px-3 py-2 text-center text-[#333]">
                    {h}
                  </th>
                ))}
                <th className="w-[40%] border-r border-[#B8D1E0] px-3 py-2 text-center text-[#333]">조치사항</th>
                <th className="whitespace-nowrap border-r border-[#B8D1E0] px-3 py-2 text-center text-[#333]">사진</th>
                <th className="whitespace-nowrap border-r border-[#B8D1E0] px-3 py-2 text-center text-[#333]">
                  제공자
                </th>
                <th className="whitespace-nowrap px-3 py-2 text-center text-[#333]">삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50/50">
                <td className="border-r border-[#B8D1E0] px-3 py-2 text-center">1</td>
                <td className="border-r border-[#B8D1E0] px-3 py-2 text-center">1주</td>
                <td className="border-r border-[#B8D1E0] px-3 py-2 text-center">2026.02.02</td>
                <td className="border-r border-[#B8D1E0] px-3 py-2 text-left">우측 발가락</td>
                <td className="border-r border-[#B8D1E0] px-3 py-2 text-left">생리식염수 소독 후 메타폼 붙여드림</td>
                <td className="border-r border-[#B8D1E0] px-3 py-2 text-center text-gray-400">-</td>
                <td className="border-r border-[#B8D1E0] px-3 py-2 text-center">양안순</td>
                <td className="px-3 py-2 text-center">
                  <button className="rounded bg-[#E74C3C] px-2 py-0.5 text-[10px] text-white shadow-sm">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
