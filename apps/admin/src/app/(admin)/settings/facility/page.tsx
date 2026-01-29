'use client';

import { useEffect, useRef, useState } from 'react';

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

interface CapacityInfo {
  total: number;
  shortStay: number;
  dayCare: number;
}

interface AddressInfo {
  zip: string;
  addr1: string;
  addr2: string;
}

interface FacilityData {
  basic: FacilityBasicInfo;
  contact: ContactInfo;
  capacity: CapacityInfo;
  address: AddressInfo;
  stampImage: string;
}

export default function FacilityInfoPage() {
  const [facilityData, setFacilityData] = useState<FacilityData>({
    basic: {
      orgCode: 'F001',
      facilityName: '행복요양원',
      facilityDesc: '어르신들의 행복한 노후를 책임집니다',
      facilityType: '노인요양시설',
      designatedDate: '2020-01-15',
      director: '김원장',
      directorPhone: '010-1234-5678',
      ceoName: '김대표',
      businessNo: '123-45-67890',
      bizType: '노인요양시설 운영',
      staffCount: 25,
    },
    contact: {
      phone: '02-1234-5678',
      fax: '02-1234-5679',
      email: 'info@happycare.com',
      homepage: 'https://happycare.com',
    },
    capacity: {
      total: 50,
      shortStay: 5,
      dayCare: 10,
    },
    address: {
      zip: '06234',
      addr1: '서울특별시 강남구 테헤란로 123',
      addr2: '행복빌딩 3층',
    },
    stampImage: '',
  });

  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedData = localStorage.getItem('facility_info');
    if (savedData) {
      try {
        setFacilityData(JSON.parse(savedData));
      } catch { /* empty */ }
    }
  }, []);

  const handleBasicChange = (field: keyof FacilityBasicInfo, value: any) => {
    setFacilityData(prev => ({
      ...prev,
      basic: { ...prev.basic, [field]: value },
    }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setFacilityData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleCapacityChange = (field: keyof CapacityInfo, value: number) => {
    setFacilityData(prev => ({
      ...prev,
      capacity: { ...prev.capacity, [field]: value },
    }));
  };

  const handleAddressChange = (field: keyof AddressInfo, value: string) => {
    setFacilityData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const formatPhone = (v: string) => {
    const n = v.replace(/\D/g, '');
    if (n.length <= 2) return n;
    if (n.length <= 6) return `${n.slice(0, 2)}-${n.slice(2)}`;
    if (n.length <= 10) return `${n.slice(0, 2)}-${n.slice(2, 6)}-${n.slice(6)}`;
    return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7, 11)}`;
  };

  const formatBiz = (v: string) => {
    const n = v.replace(/\D/g, '');
    if (n.length <= 3) return n;
    if (n.length <= 5) return `${n.slice(0, 3)}-${n.slice(3)}`;
    return `${n.slice(0, 3)}-${n.slice(3, 5)}-${n.slice(5, 10)}`;
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!facilityData.basic.orgCode) e.orgCode = '기관기호는 필수입니다.';
    if (!facilityData.basic.facilityName) e.facilityName = '시설명은 필수입니다.';
    if (!facilityData.basic.director) e.director = '시설장명은 필수입니다.';
    if (!facilityData.basic.ceoName) e.ceoName = '대표자명은 필수입니다.';
    if (!facilityData.basic.businessNo) e.businessNo = '사업자번호는 필수입니다.';
    if (!facilityData.contact.phone) e.phone = '전화번호는 필수입니다.';
    if (facilityData.contact.email && !validateEmail(facilityData.contact.email))
      e.email = '올바른 이메일 형식이 아닙니다.';
    if (!facilityData.address.addr1) e.addr1 = '기본주소는 필수입니다.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return alert('필수 항목을 모두 입력해주세요.');
    localStorage.setItem('facility_info', JSON.stringify(facilityData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    const saved = localStorage.getItem('facility_info');
    if (saved) setFacilityData(JSON.parse(saved));
    setErrors({});
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png)/)) return alert('JPG, PNG만 업로드 가능');
    if (file.size > 5 * 1024 * 1024) return alert('5MB 이하만 가능');

    const reader = new FileReader();
    reader.onload = ev => {
      setFacilityData(prev => ({ ...prev, stampImage: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setFacilityData(prev => ({ ...prev, stampImage: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">시설 기본 정보</h2>
          <p className="text-gray-600">요양원 운영에 필요한 모든 정보를 관리하세요.</p>
        </div>

        <div className="flex gap-2">
          <button onClick={handleCancel} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700">
            초기화
          </button>

          <button onClick={handleSave} className="rounded-lg bg-gray-800 px-6 py-3 font-semibold text-white">
            저장
          </button>
        </div>
      </div>

      {saved && (
        <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-800">
          시설 정보가 저장되었습니다.
        </div>
      )}

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* 기본 정보 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-800">기관 기본 정보</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* 기관기호 */}
              <Field
                label="기관기호"
                required
                value={facilityData.basic.orgCode}
                onChange={v => handleBasicChange('orgCode', v)}
                error={errors.orgCode}
              />

              {/* 시설명 */}
              <Field
                label="시설명"
                required
                value={facilityData.basic.facilityName}
                onChange={v => handleBasicChange('facilityName', v)}
                error={errors.facilityName}
              />

              {/* 시설설명 */}
              <Field
                label="시설 설명"
                value={facilityData.basic.facilityDesc}
                onChange={v => handleBasicChange('facilityDesc', v)}
                full
              />

              {/* 시설구분 */}
              <SelectField
                label="시설구분"
                value={facilityData.basic.facilityType}
                onChange={v => handleBasicChange('facilityType', v)}
                options={['노인요양시설', '주야간보호시설', '단기보호시설', '노인요양공동생활가정', '복합시설']}
              />

              {/* 지정일자 */}
              <Field
                label="지정일자"
                type="date"
                value={facilityData.basic.designatedDate}
                onChange={v => handleBasicChange('designatedDate', v)}
              />

              {/* 시설장 */}
              <Field
                label="시설장명"
                required
                value={facilityData.basic.director}
                onChange={v => handleBasicChange('director', v)}
                error={errors.director}
              />

              {/* 시설장 전화 */}
              <Field
                label="시설장 휴대폰번호"
                value={facilityData.basic.directorPhone}
                onChange={v => handleBasicChange('directorPhone', formatPhone(v))}
              />

              {/* 대표자 */}
              <Field
                label="대표자명"
                required
                value={facilityData.basic.ceoName}
                onChange={v => handleBasicChange('ceoName', v)}
                error={errors.ceoName}
              />

              {/* 업태 */}
              <Field label="업태" value={facilityData.basic.bizType} onChange={v => handleBasicChange('bizType', v)} />

              {/* 사업자번호 */}
              <Field
                label="사업자번호"
                required
                value={facilityData.basic.businessNo}
                onChange={v => handleBasicChange('businessNo', formatBiz(v))}
                error={errors.businessNo}
                maxLength={12}
              />

              {/* 직원수 */}
              <Field
                label="직원수"
                type="number"
                value={facilityData.basic.staffCount}
                onChange={v => handleBasicChange('staffCount', parseInt(v) || 0)}
              />
            </div>
          </div>

          {/* 연락처 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-800">연락처 정보</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label="대표 전화번호"
                required
                value={facilityData.contact.phone}
                onChange={v => handleContactChange('phone', formatPhone(v))}
                error={errors.phone}
              />
              <Field
                label="팩스번호"
                value={facilityData.contact.fax}
                onChange={v => handleContactChange('fax', formatPhone(v))}
              />
              <Field
                label="이메일주소"
                value={facilityData.contact.email}
                onChange={v => handleContactChange('email', v)}
                error={errors.email}
              />
              <Field
                label="홈페이지 주소"
                value={facilityData.contact.homepage}
                onChange={v => handleContactChange('homepage', v)}
              />
            </div>
          </div>

          {/* 정원 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-800">정원 정보</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field
                label="입소정원"
                required
                type="number"
                value={facilityData.capacity.total}
                onChange={v => handleCapacityChange('total', parseInt(v) || 0)}
              />
              <Field
                label="단기보호 정원"
                type="number"
                value={facilityData.capacity.shortStay}
                onChange={v => handleCapacityChange('shortStay', parseInt(v) || 0)}
              />
              <Field
                label="주야간보호 정원"
                type="number"
                value={facilityData.capacity.dayCare}
                onChange={v => handleCapacityChange('dayCare', parseInt(v) || 0)}
              />
            </div>
          </div>

          {/* 주소 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-800">주소 정보</h3>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={facilityData.address.zip}
                  onChange={e => handleAddressChange('zip', e.target.value)}
                  className="w-32 rounded-lg border border-gray-300 px-4 py-2.5"
                  placeholder="우편번호"
                />

                <button className="rounded-lg bg-gray-800 px-4 py-2.5 text-white">주소 검색</button>
              </div>

              <div>
                <Field
                  label="기본주소"
                  required
                  value={facilityData.address.addr1}
                  onChange={v => handleAddressChange('addr1', v)}
                  error={errors.addr1}
                  full
                />
              </div>

              <div>
                <Field
                  label="상세주소"
                  value={facilityData.address.addr2}
                  onChange={v => handleAddressChange('addr2', v)}
                  full
                />
              </div>
            </div>
          </div>

          {/* 도장 이미지 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-800">시설 도장 이미지</h3>

            {!facilityData.stampImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-lg border border-dashed border-gray-300 p-8 text-center"
              >
                <div className="mb-3 text-4xl text-gray-400">＋</div>
                <p className="text-sm text-gray-600">클릭하여 이미지 업로드</p>
                <p className="text-xs text-gray-500">JPG, PNG (5MB 이하)</p>
              </div>
            ) : (
              <div className="relative inline-block">
                <img
                  src={facilityData.stampImage}
                  className="h-40 w-40 rounded-lg border border-gray-300 object-contain"
                />
                <button
                  onClick={handleImageDelete}
                  className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-gray-800 text-sm text-white"
                >
                  ✕
                </button>
              </div>
            )}

            <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageUpload} />
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">미리보기</h3>

            <div className="space-y-4 text-sm text-gray-800">
              {/* 기본 정보 */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="font-bold">{facilityData.basic.facilityName}</p>
                <p className="text-xs text-gray-500">{facilityData.basic.facilityType}</p>
                <p className="mt-2">{facilityData.basic.facilityDesc}</p>
              </div>

              {/* 연락처 */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p>☎ {facilityData.contact.phone}</p>
                {facilityData.contact.fax && <p>FAX: {facilityData.contact.fax}</p>}
                {facilityData.contact.email && <p>Email: {facilityData.contact.email}</p>}
                {facilityData.contact.homepage && (
                  <p className="break-all text-xs text-blue-600">{facilityData.contact.homepage}</p>
                )}
              </div>

              {/* 주소 */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p>우편번호: {facilityData.address.zip}</p>
                <p>{facilityData.address.addr1}</p>
                <p>{facilityData.address.addr2}</p>
              </div>

              {/* 정원 */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p>입소정원: {facilityData.capacity.total}명</p>
                <p>단기보호: {facilityData.capacity.shortStay}명</p>
                <p>주야간보호: {facilityData.capacity.dayCare}명</p>
                <p>직원수: {facilityData.basic.staffCount}명</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn .3s ease-out; }
      `}</style>
    </div>
  );
}

/* -----------------
   SMALL COMPONENTS
------------------ */

function Field({ label, value, onChange, type = 'text', required, error, full, maxLength }: any) {
  return (
    <div className={`${full ? 'md:col-span-2' : ''}`}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        className={`w-full rounded-lg border px-4 py-2.5 ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:ring-2 focus:ring-gray-400`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>

      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-gray-400"
      >
        {options.map((o: any) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
