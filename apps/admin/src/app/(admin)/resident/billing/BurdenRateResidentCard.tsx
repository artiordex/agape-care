'use client';

interface Resident {
  id: string;
  name: string;
  birth: string;
  age: number;
  admissionDate: string;
}

interface CurrentRate {
  rateName: string;
  rate: number;
}

interface Props {
  resident: Resident;
  currentRate: CurrentRate | null;
}

export default function BurdenRateResidentCard({ resident, currentRate }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-gray-900">입소자 정보</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">수급자명</label>
          <p className="text-sm font-bold text-gray-900">{resident.name}</p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">생년월일</label>
          <p className="text-sm font-semibold text-gray-700">
            {resident.birth} ({resident.age}세)
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">입소일</label>
          <p className="text-sm font-semibold text-gray-700">{resident.admissionDate}</p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">현재 본인부담률</label>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              {currentRate?.rateName ?? '미등록'}
            </span>
            {currentRate && <span className="text-lg font-bold text-blue-600">{currentRate.rate}%</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
