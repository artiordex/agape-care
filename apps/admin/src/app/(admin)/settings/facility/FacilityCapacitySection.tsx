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

export default function CapacitySection({ value, onChange }: Props) {
  const set = (field: keyof CapacityInfo, v: number) => onChange({ ...value, [field]: v });

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">정원 정보</h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NumberField label="입소 정원" required value={value.total} onChange={v => set('total', v)} />
          <NumberField label="단기보호 정원" value={value.shortStay} onChange={v => set('shortStay', v)} />
          <NumberField label="주야간보호 정원" value={value.dayCare} onChange={v => set('dayCare', v)} />
        </div>
      </div>
    </div>
  );
}

interface NumberFieldProps {
  readonly label: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly required?: boolean;
}

function NumberField({ label, value, onChange, required }: NumberFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value) || 0)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
