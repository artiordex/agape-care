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

export default function BasicInfoSection({ value, onChange }: Props) {
  const set = (field: keyof FacilityBasicInfo, v: any) => onChange({ ...value, [field]: v });

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">기관 기본 정보</h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="기관기호" required value={value.orgCode} onChange={(v: string) => set('orgCode', v)} />
          <Field label="시설명" required value={value.facilityName} onChange={(v: string) => set('facilityName', v)} />
          <Field label="시설 설명" value={value.facilityDesc} onChange={(v: string) => set('facilityDesc', v)} full />
          <SelectField
            label="시설구분"
            value={value.facilityType}
            onChange={(v: string) => set('facilityType', v)}
            options={['노인요양시설', '주야간보호시설', '단기보호시설', '노인요양공동생활가정', '복합시설']}
          />
          <Field
            label="지정일자"
            type="date"
            value={value.designatedDate}
            onChange={(v: string) => set('designatedDate', v)}
          />
          <Field label="시설장명" required value={value.director} onChange={(v: string) => set('director', v)} />
          <Field
            label="시설장 휴대폰번호"
            value={value.directorPhone}
            onChange={(v: string) => set('directorPhone', v)}
          />
          <Field label="대표자명" required value={value.ceoName} onChange={(v: string) => set('ceoName', v)} />
          <Field label="업태" value={value.bizType} onChange={(v: string) => set('bizType', v)} />
          <Field
            label="사업자번호"
            required
            value={value.businessNo}
            onChange={(v: string) => set('businessNo', v)}
            maxLength={12}
          />
          <Field
            label="직원수"
            type="number"
            value={value.staffCount}
            onChange={(v: string) => set('staffCount', Number(v) || 0)}
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required, full, maxLength }: any) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
