'use client';

export interface ContactInfo {
  phone: string;
  fax: string;
  email: string;
  homepage: string;
}

interface Props {
  value: ContactInfo;
  onChange: (next: ContactInfo) => void;
}

export default function ContactSection({ value, onChange }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">연락처 정보</h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              대표 전화번호 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={value.phone}
              onChange={e => onChange({ ...value, phone: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="02-0000-0000"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">팩스번호</label>
            <input
              type="text"
              value={value.fax}
              onChange={e => onChange({ ...value, fax: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="02-0000-0000"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">이메일 주소</label>
            <input
              type="email"
              value={value.email}
              onChange={e => onChange({ ...value, email: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="info@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">홈페이지</label>
            <input
              type="text"
              value={value.homepage}
              onChange={e => onChange({ ...value, homepage: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="https://"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
