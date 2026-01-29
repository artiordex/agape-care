'use client';

interface AddressInfo {
  zip: string;
  addr1: string;
  addr2: string;
}

interface Props {
  value: AddressInfo;
  onChange: (next: AddressInfo) => void;
}

export default function AddressSection({ value, onChange }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">주소 정보</h3>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {/* 우편번호 */}
          <div className="flex items-end gap-2">
            <div className="w-32">
              <label className="mb-1.5 block text-xs font-medium text-gray-700">우편번호</label>
              <input
                type="text"
                value={value.zip}
                onChange={e => onChange({ ...value, zip: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="우편번호"
              />
            </div>

            <button
              type="button"
              className="h-[38px] rounded border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              주소 검색
            </button>
          </div>

          {/* 기본주소 */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              기본주소 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={value.addr1}
              onChange={e => onChange({ ...value, addr1: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="기본주소"
            />
          </div>

          {/* 상세주소 */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">상세주소</label>
            <input
              type="text"
              value={value.addr2}
              onChange={e => onChange({ ...value, addr2: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="상세주소"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
