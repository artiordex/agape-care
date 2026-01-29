export default function FooterSection({ value, onChange }: any) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h2 className="text-sm font-bold text-gray-900">푸터 / 법적 고지</h2>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          <Textarea
            label="푸터 문구"
            value={value.footerText}
            onChange={(v: string) => onChange({ ...value, footerText: v })}
          />

          <Textarea
            label="법적 고지 문구"
            value={value.legalNotice}
            onChange={(v: string) => onChange({ ...value, legalNotice: v })}
          />
        </div>
      </div>
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
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
