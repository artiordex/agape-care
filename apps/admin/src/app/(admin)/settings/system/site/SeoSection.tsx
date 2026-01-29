interface SeoValue {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

interface SeoSectionProps<T extends SeoValue> {
  readonly value: T;
  readonly onChange: (value: T) => void;
}

export default function SeoSection<T extends SeoValue>({ value, onChange }: SeoSectionProps<T>) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h2 className="text-sm font-bold text-gray-900">검색 노출 설정 (SEO)</h2>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          <Field label="메타 제목" value={value.metaTitle} onChange={v => onChange({ ...value, metaTitle: v })} />

          <Textarea
            label="메타 설명"
            value={value.metaDescription}
            onChange={v => onChange({ ...value, metaDescription: v })}
          />

          <Field
            label="메타 키워드"
            value={value.metaKeywords}
            onChange={v => onChange({ ...value, metaKeywords: v })}
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
}

function Field({ label, value, onChange }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

interface TextareaProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

function Textarea({ label, value, onChange }: TextareaProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
