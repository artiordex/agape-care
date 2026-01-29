'use client';

interface Props {
  data: {
    basic: {
      facilityName: string;
      facilityType: string;
      facilityDesc: string;
      staffCount: number;
    };
    contact: {
      phone: string;
      fax: string;
      email: string;
      homepage: string;
    };
    address: {
      zip: string;
      addr1: string;
      addr2: string;
    };
    capacity: {
      total: number;
      shortStay: number;
      dayCare: number;
    };
  };
}

export default function PreviewSection({ data }: Props) {
  const { basic, contact, address, capacity } = data;

  return (
    <aside className="sticky top-6 space-y-3">
      {/* 기본 정보 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-1 text-xs font-medium text-gray-500">시설 정보</p>
        <p className="text-sm font-bold text-gray-900">{basic.facilityName}</p>
        <p className="text-xs text-gray-500">{basic.facilityType}</p>
        <p className="mt-2 text-sm text-gray-700">{basic.facilityDesc}</p>
      </div>

      {/* 연락처 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-2 text-xs font-medium text-gray-500">연락처</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <i className="ri-phone-line text-gray-400"></i>
            <span>{contact.phone}</span>
          </div>
          {contact.fax && (
            <div className="flex items-center gap-2 text-gray-700">
              <i className="ri-printer-line text-gray-400"></i>
              <span>{contact.fax}</span>
            </div>
          )}
          {contact.email && (
            <div className="flex items-center gap-2 text-gray-700">
              <i className="ri-mail-line text-gray-400"></i>
              <span>{contact.email}</span>
            </div>
          )}
          {contact.homepage && (
            <div className="flex items-center gap-2 text-blue-600">
              <i className="ri-global-line text-gray-400"></i>
              <span className="truncate">{contact.homepage}</span>
            </div>
          )}
        </div>
      </div>

      {/* 주소 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-2 text-xs font-medium text-gray-500">주소</p>
        <div className="space-y-0.5 text-sm text-gray-700">
          <p>({address.zip})</p>
          <p>{address.addr1}</p>
          {address.addr2 && <p>{address.addr2}</p>}
        </div>
      </div>

      {/* 정원 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-2 text-xs font-medium text-gray-500">정원 정보</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">입소정원</span>
            <span className="font-semibold text-gray-900">{capacity.total}명</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">단기보호</span>
            <span className="font-semibold text-gray-900">{capacity.shortStay}명</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">주야간보호</span>
            <span className="font-semibold text-gray-900">{capacity.dayCare}명</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-1.5">
            <span className="text-gray-600">직원수</span>
            <span className="font-semibold text-gray-900">{basic.staffCount}명</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
