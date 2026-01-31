'use client';

import React from 'react';

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
    stampImage: string;
  };
}

/**
 * [Sidebar] 시설 정보 실시간 프리뷰 카드
 * 인포그래픽 스타일의 데이터 요약 UI
 */
export default function FacilityPreview({ data }: Props) {
  const { basic, contact, address, capacity, stampImage } = data;

  return (
    <aside className="animate-in fade-in slide-in-from-right-4 sticky top-6 space-y-3 text-[11px] duration-500">
      {/* 1. 메인 프로필 카드 (도장 포함) */}
      <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow-sm">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* 시설 도장 표시 영역 */}
          <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-2">
            {stampImage ? (
              <img src={stampImage} alt="시설 직인" className="h-full w-full object-contain mix-blend-multiply" />
            ) : (
              <i className="ri-image-circle-line text-3xl text-gray-300"></i>
            )}
          </div>

          <h2 className="text-[15px] font-black tracking-tighter text-gray-900">
            {basic.facilityName || '기관명 미설정'}
          </h2>
          <span className="mt-1 rounded-sm bg-[#1a5a96] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
            {basic.facilityType || '구분 미지정'}
          </span>
          <p className="mt-3 line-clamp-2 font-medium leading-relaxed text-gray-500">
            {basic.facilityDesc || '시설 설명을 입력해 주세요.'}
          </p>
        </div>
      </div>

      {/* 2. 연락처 및 채널 정보 */}
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <p className="border-l-3 mb-3 border-[#1a5a96] pl-2 text-[10px] font-black uppercase tracking-tighter text-gray-400">
          Contact Channels
        </p>
        <div className="space-y-2.5">
          <ContactItem icon="ri-phone-fill" label="대표번호" value={contact.phone} isBold />
          <ContactItem icon="ri-printer-fill" label="팩스번호" value={contact.fax} />
          <ContactItem icon="ri-mail-open-fill" label="이메일" value={contact.email} isLink />
          <ContactItem icon="ri-global-fill" label="홈페이지" value={contact.homepage} isLink />
        </div>
      </div>

      {/* 3. 주소 정보 */}
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <p className="border-l-3 mb-3 border-[#1a5a96] pl-2 text-[10px] font-black uppercase tracking-tighter text-gray-400">
          Location Info
        </p>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded bg-gray-100 p-1.5 text-gray-500">
            <i className="ri-map-pin-2-fill text-sm"></i>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold text-blue-600">[{address.zip || '00000'}]</p>
            <p className="font-bold leading-snug text-gray-800">{address.addr1 || '주소를 입력해 주세요.'}</p>
            {address.addr2 && <p className="text-gray-500">{address.addr2}</p>}
          </div>
        </div>
      </div>

      {/* 4. 운영 규모 (정원) */}
      <div className="rounded-lg border border-[#1a5a96] bg-[#1a5a96] p-4 text-white shadow-md">
        <p className="mb-3 border-l-2 border-white/50 pl-2 text-[10px] font-black uppercase tracking-tighter opacity-80">
          Capacity Stats
        </p>
        <div className="grid grid-cols-2 gap-4">
          <StatBox label="입소정원" value={capacity.total} />
          <StatBox label="주야간보호" value={capacity.dayCare} />
          <StatBox label="단기보호" value={capacity.shortStay} />
          <StatBox label="총 직원수" value={basic.staffCount} />
        </div>
      </div>
    </aside>
  );
}

/** 내부 컴포넌트: 연락처 아이템 */
function ContactItem({ icon, label, value, isLink, isBold }: any) {
  if (!value) return null;
  return (
    <div className="group flex items-center justify-between">
      <div className="flex items-center gap-2">
        <i className={`${icon} text-gray-400 transition-colors group-hover:text-[#1a5a96]`}></i>
        <span className="font-bold text-gray-400">{label}</span>
      </div>
      <span
        className={`max-w-[120px] truncate ${isLink ? 'text-blue-600 underline' : 'text-gray-700'} ${isBold ? 'font-black' : 'font-medium'}`}
      >
        {value}
      </span>
    </div>
  );
}

/** 내부 컴포넌트: 화이트 텍스트 스탯박스 */
function StatBox({ label, value }: any) {
  return (
    <div className="space-y-0.5">
      <p className="text-[9px] font-bold opacity-60">{label}</p>
      <div className="flex items-baseline gap-0.5">
        <span className="font-mono text-lg font-black tracking-tighter">{value.toLocaleString()}</span>
        <span className="text-[9px] opacity-70">명</span>
      </div>
    </div>
  );
}
