'use client';

interface CapacityInfo {
  total: number;
  shortStay: number;
  dayCare: number;
}

interface Props {
  readonly value: CapacityInfo;
  readonly onChange: (next: CapacityInfo) => void;
}

/**
 * [Section] 정원 및 수용 능력 설정
 * 수치 정렬이 강조된 고밀도 격자 UI
 */
export default function CapacitySection({ value, onChange }: Props) {
  const set = (field: keyof CapacityInfo, v: number) => onChange({ ...value, [field]: v });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[12px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#5C8D5A]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">시설 정원 통계</h3>
      </div>

      <div className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <InputRow label="입소 정원" required>
            <div className="flex w-full items-center justify-end gap-2 text-[12px]">
              <input
                type="number"
                value={value.total}
                onChange={e => set('total', Number(e.target.value))}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-right text-[12px] font-black text-[#5C8D5A] outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
              <span className="shrink-0 font-bold text-gray-400">명</span>
            </div>
          </InputRow>
          <InputRow label="단기보호 정원">
            <div className="flex w-full items-center justify-end gap-2 text-[12px]">
              <input
                type="number"
                value={value.shortStay}
                onChange={e => set('shortStay', Number(e.target.value))}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-right text-[12px] font-bold outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
              <span className="shrink-0 font-bold text-gray-400">명</span>
            </div>
          </InputRow>
          <InputRow label="주야간보호 정원">
            <div className="flex w-full items-center justify-end gap-2 text-[12px]">
              <input
                type="number"
                value={value.dayCare}
                onChange={e => set('dayCare', Number(e.target.value))}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-right text-[12px] font-bold outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
              <span className="shrink-0 font-bold text-gray-400">명</span>
            </div>
          </InputRow>
        </div>
      </div>
    </div>
  );
}

/** 내부 컴포넌트: 격자형 입력 행 */
function InputRow({ label, children, required }: any) {
  return (
    <div className="group flex border-r border-gray-200 last:border-r-0">
      <div className="flex w-24 shrink-0 items-center border-r border-gray-100 bg-[#f8fafc] px-3 py-2.5 text-[12px] font-black text-gray-500 transition-colors group-hover:bg-emerald-50/50">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-center bg-white p-2 transition-colors group-hover:bg-emerald-50/10">
        {children}
      </div>
    </div>
  );
}
