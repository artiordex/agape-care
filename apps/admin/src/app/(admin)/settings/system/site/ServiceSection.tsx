interface ServiceData {
  serviceName: string;
  customerHours: string;
  contactPhone: string;
  contactEmail: string;
  serviceDesc: string;
}

interface ServiceSectionProps<T extends ServiceData> {
  readonly value: T;
  readonly onChange: (value: T) => void;
}

export default function ServiceSection<T extends ServiceData>({ value, onChange }: ServiceSectionProps<T>) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h2 className="text-sm font-bold text-gray-900">서비스 기본 정보</h2>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="서비스 노출명"
            value={value.serviceName}
            onChange={(v: string) => onChange({ ...value, serviceName: v })}
          />

          <Field
            label="고객센터 운영시간"
            value={value.customerHours}
            onChange={(v: string) => onChange({ ...value, customerHours: v })}
          />

          <Field
            label="대표 전화번호"
            value={value.contactPhone}
            onChange={(v: string) => onChange({ ...value, contactPhone: v })}
          />

          <Field
            label="대표 이메일"
            value={value.contactEmail}
            onChange={(v: string) => onChange({ ...value, contactEmail: v })}
          />

          <Field
            label="서비스 설명"
            value={value.serviceDesc}
            onChange={(v: string) => onChange({ ...value, serviceDesc: v })}
            full
          />
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly full?: boolean;
}

function Field({ label, value, onChange, full }: FieldProps) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
