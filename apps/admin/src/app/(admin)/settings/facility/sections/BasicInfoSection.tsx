'use client';

interface FacilityBasicInfo {
  orgCode: string;
  facilityName: string;
  facilityDesc: string;
  facilityType: string;
  designatedDate: string;
  director: string;
  directorPhone: string;
  ceoName: string;
  businessNo: string;
  bizType: string;
  staffCount: number;
}

interface Props {
  readonly value: FacilityBasicInfo;
  readonly onChange: (next: FacilityBasicInfo) => void;
}

/**
 * [Section] 기관 기본 정보 설정
 * 고밀도 격자 문서 서식 스타일 적용
 */
export default function BasicInfoSection({ value, onChange }: Props) {
  const set = (field: keyof FacilityBasicInfo, v: any) => onChange({ ...value, [field]: v });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white text-[12px] shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
        <div className="h-3 w-1 bg-[#5C8D5A]"></div>
        <h3 className="font-black uppercase tracking-tighter text-gray-800">시설 기본 정보</h3>
      </div>

      {/* 격자형 입력 폼 */}
      <div className="p-0">
        <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
          <InputRow label="기관기호" required>
            <input
              value={value.orgCode}
              onChange={e => set('orgCode', e.target.value)}
              placeholder="기관 고유 기호 입력"
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black text-[#5C8D5A] outline-none placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
          <InputRow label="시설명" required>
            <input
              value={value.facilityName}
              onChange={e => set('facilityName', e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black text-gray-900 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
        </div>

        <div className="border-b border-gray-200">
          <InputRow label="시설 설명" full>
            <input
              value={value.facilityDesc}
              onChange={e => set('facilityDesc', e.target.value)}
              placeholder="시설에 대한 간단한 홍보 문구를 입력하세요."
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium text-gray-500 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
        </div>

        <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
          <InputRow label="시설구분">
            <select
              value={value.facilityType}
              onChange={e => set('facilityType', e.target.value)}
              className="w-full cursor-pointer rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            >
              <option value="노인요양시설">노인요양시설</option>
              <option value="주야간보호시설">주야간보호시설</option>
              <option value="단기보호시설">단기보호시설</option>
              <option value="노인요양공동생활가정">노인요양공동생활가정</option>
              <option value="복합시설">복합시설</option>
            </select>
          </InputRow>
          <InputRow label="지정일자">
            <input
              type="date"
              value={value.designatedDate}
              onChange={e => set('designatedDate', e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
        </div>

        <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
          <InputRow label="시설장명" required>
            <input
              value={value.director}
              onChange={e => set('director', e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
          <InputRow label="시설장 연락처">
            <input
              value={value.directorPhone}
              onChange={e => set('directorPhone', e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
        </div>

        <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
          <InputRow label="대표자명" required>
            <input
              value={value.ceoName}
              onChange={e => set('ceoName', e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
          <InputRow label="사업자번호" required>
            <input
              value={value.businessNo}
              onChange={e => set('businessNo', e.target.value)}
              maxLength={12}
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <InputRow label="업태/종목">
            <input
              value={value.bizType}
              onChange={e => set('bizType', e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
          <InputRow label="총 직원수">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={value.staffCount}
                onChange={e => set('staffCount', Number(e.target.value))}
                className="w-24 rounded border border-gray-300 px-4 py-1.5 text-right text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
              <span className="text-[12px] font-bold text-gray-400">명</span>
            </div>
          </InputRow>
        </div>
      </div>
    </div>
  );
}

/** 내부 컴포넌트: 격자형 입력 행 */
function InputRow({ label, children, required, full }: any) {
  return (
    <div className={`flex border-r border-gray-200 last:border-r-0 ${full ? 'md:col-span-2' : ''} group`}>
      <div className="flex w-28 shrink-0 items-center border-r border-gray-100 bg-[#f8fafc] px-3 py-2.5 text-[12px] font-black text-gray-500 transition-colors group-hover:bg-emerald-50/50">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-center bg-white p-2 transition-colors group-hover:bg-emerald-50/10">
        {children}
      </div>
    </div>
  );
}
