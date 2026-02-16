'use client';

import React, { useRef } from 'react';

// ============================================
// 타입 정의
// ============================================

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

interface ContactInfo {
  phone: string;
  fax: string;
  email: string;
  homepage: string;
}

interface AddressInfo {
  zip: string;
  addr1: string;
  addr2: string;
}

interface CapacityInfo {
  total: number;
  shortStay: number;
  dayCare: number;
}

export interface FacilitySettingsData {
  basic: FacilityBasicInfo;
  contact: ContactInfo;
  address: AddressInfo;
  capacity: CapacityInfo;
  stampImage: string;
}

interface Props {
  readonly value: FacilitySettingsData;
  readonly onChange: (next: FacilitySettingsData) => void;
}

// ============================================
// 공통 InputRow 컴포넌트
// ============================================

function InputRow({
  label,
  children,
  required,
  full,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div className={`flex border-r border-gray-200 last:border-r-0 ${full ? 'md:col-span-2' : ''} group`}>
      <div className="flex w-28 shrink-0 items-center border-r border-gray-100 bg-[#f8fafc] px-3 py-2.5 text-[12px] font-black text-gray-500 transition-colors group-hover:bg-emerald-50/50">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>
      <div className="flex flex-1 items-center bg-white p-2 transition-colors group-hover:bg-emerald-50/10">
        {children}
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-300 bg-[#f8fafc] px-4 py-2">
      <div className="h-3 w-1 bg-[#5C8D5A]"></div>
      <h3 className="font-black uppercase tracking-tighter text-gray-800">{title}</h3>
    </div>
  );
}

// ============================================
// 메인 컴포넌트
// ============================================

/**
 * [Section] 시설 전체 설정
 * BasicInfo + Contact + Address + Capacity + Stamp 통합
 */
export default function FacilitySettingsSection({ value, onChange }: Props) {
  const stampFileRef = useRef<HTMLInputElement>(null);

  const setBasic = (field: keyof FacilityBasicInfo, v: any) =>
    onChange({ ...value, basic: { ...value.basic, [field]: v } });

  const setContact = (field: keyof ContactInfo, v: string) =>
    onChange({ ...value, contact: { ...value.contact, [field]: v } });

  const setAddress = (updates: Partial<AddressInfo>) =>
    onChange({ ...value, address: { ...value.address, ...updates } });

  const setCapacity = (field: keyof CapacityInfo, v: number) =>
    onChange({ ...value, capacity: { ...value.capacity, [field]: v } });

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
      alert('PNG, JPG 파일만 업로드 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => onChange({ ...value, stampImage: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 text-[12px]">
      {/* ─────────────────────────────────────
          1. 시설 기본 정보
      ───────────────────────────────────── */}
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <SectionHeader title="시설 기본 정보" />
        <div className="p-0">
          <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
            <InputRow label="기관기호" required>
              <input
                value={value.basic.orgCode}
                onChange={e => setBasic('orgCode', e.target.value)}
                placeholder="기관 고유 기호 입력"
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black text-[#5C8D5A] outline-none placeholder:text-gray-300 focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
            <InputRow label="시설명" required>
              <input
                value={value.basic.facilityName}
                onChange={e => setBasic('facilityName', e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black text-gray-900 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
          </div>

          <div className="border-b border-gray-200">
            <InputRow label="시설 설명" full>
              <input
                value={value.basic.facilityDesc}
                onChange={e => setBasic('facilityDesc', e.target.value)}
                placeholder="시설에 대한 간단한 홍보 문구를 입력하세요."
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium text-gray-500 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
          </div>

          <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
            <InputRow label="시설구분">
              <select
                value={value.basic.facilityType}
                onChange={e => setBasic('facilityType', e.target.value)}
                className="w-full cursor-pointer rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              >
                <option value="노인요양시설">노인요양시설</option>
                <option value="주야간보호시설">주야간보호시설</option>
                <option value="단기보호시설">단기보호시설</option>
                <option value="노인요양공동생활가정">노인요양공동생활가정</option>
                <option value="복합시설">복합시설</option>
              </select>
            </InputRow>
            <InputRow label="지정일자">
              <input
                type="date"
                value={value.basic.designatedDate}
                onChange={e => setBasic('designatedDate', e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
          </div>

          <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
            <InputRow label="시설장명" required>
              <input
                value={value.basic.director}
                onChange={e => setBasic('director', e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
            <InputRow label="시설장 연락처">
              <input
                value={value.basic.directorPhone}
                onChange={e => setBasic('directorPhone', e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
          </div>

          <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
            <InputRow label="대표자명" required>
              <input
                value={value.basic.ceoName}
                onChange={e => setBasic('ceoName', e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
            <InputRow label="사업자번호" required>
              <input
                value={value.basic.businessNo}
                onChange={e => setBasic('businessNo', e.target.value)}
                maxLength={12}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <InputRow label="업태/종목">
              <input
                value={value.basic.bizType}
                onChange={e => setBasic('bizType', e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
            <InputRow label="총 직원수">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={value.basic.staffCount}
                  onChange={e => setBasic('staffCount', Number(e.target.value))}
                  className="w-24 rounded border border-gray-300 px-4 py-1.5 text-right text-[12px] font-black outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                />
                <span className="text-[12px] font-bold text-gray-400">명</span>
              </div>
            </InputRow>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────
          2. 연락처 채널
      ───────────────────────────────────── */}
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <SectionHeader title="연락처 채널" />
        <div className="p-0">
          <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-2">
            <InputRow label="대표 전화번호" required>
              <div className="flex w-full items-center gap-2">
                <i className="ri-phone-line text-gray-400"></i>
                <input
                  value={value.contact.phone}
                  onChange={e => setContact('phone', e.target.value)}
                  placeholder="02-1234-5678"
                  className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black text-[#5C8D5A] outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                />
              </div>
            </InputRow>
            <InputRow label="팩스번호">
              <div className="flex w-full items-center gap-2">
                <i className="ri-printer-line text-gray-400"></i>
                <input
                  value={value.contact.fax}
                  onChange={e => setContact('fax', e.target.value)}
                  placeholder="02-1234-5679"
                  className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                />
              </div>
            </InputRow>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <InputRow label="이메일 주소">
              <div className="flex w-full items-center gap-2">
                <i className="ri-mail-line text-gray-400"></i>
                <input
                  type="email"
                  value={value.contact.email}
                  onChange={e => setContact('email', e.target.value)}
                  placeholder="info@facility.com"
                  className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium text-gray-700 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                />
              </div>
            </InputRow>
            <InputRow label="홈페이지">
              <div className="flex w-full items-center gap-2">
                <i className="ri-global-line text-gray-400"></i>
                <input
                  value={value.contact.homepage}
                  onChange={e => setContact('homepage', e.target.value)}
                  placeholder="https://"
                  className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium text-[#5C8D5A] outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                />
              </div>
            </InputRow>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────
          3. 위치 및 주소
      ───────────────────────────────────── */}
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <SectionHeader title="위치 및 주소" />
        <div className="p-0">
          <div className="border-b border-gray-200">
            <InputRow label="우편번호">
              <div className="flex items-center gap-2">
                <input
                  value={value.address.zip}
                  onChange={e => setAddress({ zip: e.target.value })}
                  placeholder="00000"
                  className="w-24 rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black text-[#5C8D5A] outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                />
                <button
                  type="button"
                  className="rounded-sm border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 active:scale-95"
                >
                  주소 검색
                </button>
              </div>
            </InputRow>
          </div>

          <div className="border-b border-gray-200">
            <InputRow label="기본주소" required full>
              <input
                value={value.address.addr1}
                onChange={e => setAddress({ addr1: e.target.value })}
                placeholder="도로명 주소 또는 지번 주소를 입력하세요."
                className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-black text-gray-800 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              />
            </InputRow>
          </div>

          <InputRow label="상세주소" full>
            <input
              value={value.address.addr2}
              onChange={e => setAddress({ addr2: e.target.value })}
              placeholder="동, 호수, 층 등 나머지 상세 주소를 입력하세요."
              className="w-full rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium text-gray-600 outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
            />
          </InputRow>
        </div>
      </div>

      {/* ─────────────────────────────────────
          4. 시설 정원 통계
      ───────────────────────────────────── */}
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <SectionHeader title="시설 정원 통계" />
        <div className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { label: '입소 정원', field: 'total' as const, required: true },
              { label: '단기보호 정원', field: 'shortStay' as const },
              { label: '주야간보호 정원', field: 'dayCare' as const },
            ].map(({ label, field, required }) => (
              <div key={field} className="group flex border-r border-gray-200 last:border-r-0">
                <div className="flex w-24 shrink-0 items-center border-r border-gray-100 bg-[#f8fafc] px-3 py-2.5 text-[12px] font-black text-gray-500 transition-colors group-hover:bg-emerald-50/50">
                  {label}
                  {required && <span className="ml-1 text-red-500">*</span>}
                </div>
                <div className="flex flex-1 items-center bg-white p-2 transition-colors group-hover:bg-emerald-50/10">
                  <div className="flex w-full items-center justify-end gap-2">
                    <input
                      type="number"
                      value={value.capacity[field]}
                      onChange={e => setCapacity(field, Number(e.target.value))}
                      className={`w-full rounded border border-gray-300 px-4 py-1.5 text-right text-[12px] outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A] ${field === 'total' ? 'font-black text-[#5C8D5A]' : 'font-bold'}`}
                    />
                    <span className="shrink-0 font-bold text-gray-400">명</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────
          5. 시설 공식 직인
      ───────────────────────────────────── */}
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
        <SectionHeader title="시설 공식 직인" />
        <div className="flex flex-col items-center gap-8 p-6 md:flex-row">
          {/* 미리보기 */}
          <div className="group relative">
            <div
              className={`flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed transition-all ${
                value.stampImage
                  ? 'border-emerald-200 bg-white shadow-inner'
                  : 'border-gray-300 bg-gray-50 hover:border-[#5C8D5A] hover:bg-emerald-50'
              }`}
            >
              {value.stampImage ? (
                <img
                  src={value.stampImage}
                  alt="직인 미리보기"
                  className="max-h-[80%] max-w-[80%] object-contain mix-blend-multiply"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <i className="ri-image-add-line text-3xl"></i>
                  <p className="mt-1 text-[9px] font-bold">이미지 없음</p>
                </div>
              )}
            </div>
            {value.stampImage && (
              <button
                onClick={() => onChange({ ...value, stampImage: '' })}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-colors hover:bg-red-600"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            )}
          </div>

          {/* 안내 */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 text-[12px] font-black text-gray-800">
                <i className="ri-information-fill text-[#5C8D5A]"></i>
                공식 직인 등록 가이드
              </p>
              <ul className="list-inside list-disc space-y-1 font-medium leading-relaxed text-gray-500">
                <li>
                  흰색 배경이 제거된 <span className="font-bold text-[#5C8D5A]">투명 배경 PNG</span> 파일을 권장합니다.
                </li>
                <li>
                  파일 크기는 <span className="font-bold">5MB 이하</span>의 고해상도 이미지를 사용하세요.
                </li>
                <li>등록된 도장은 급여명세서 및 공식 문서 하단에 자동 날인됩니다.</li>
              </ul>
            </div>
            <button
              onClick={() => stampFileRef.current?.click()}
              className="flex items-center gap-2 rounded-sm bg-[#5C8D5A] px-4 py-2 font-black text-white shadow-sm transition-all hover:bg-[#4A7348] active:scale-95"
            >
              <i className="ri-upload-cloud-2-line text-sm"></i>
              직인 이미지 파일 선택
            </button>
            <input
              ref={stampFileRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handleStampUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
