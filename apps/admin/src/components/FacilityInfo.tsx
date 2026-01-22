import { useState, useEffect, useRef } from 'react';

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

export default function FacilityInfo() {
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
      staffCount: 25
    },
    contact: {
      phone: '02-1234-5678',
      fax: '02-1234-5679',
      email: 'info@happycare.com',
      homepage: 'https://happycare.com'
    },
    capacity: {
      total: 50,
      shortStay: 5,
      dayCare: 10
    },
    address: {
      zip: '06234',
      addr1: '서울특별시 강남구 테헤란로 123',
      addr2: '행복빌딩 3층'
    },
    stampImage: ''
  });

  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('facility_info');
    if (savedData) {
      setFacilityData(JSON.parse(savedData));
    }
  }, []);

  const handleBasicChange = (field: keyof FacilityBasicInfo, value: string | number) => {
    setFacilityData(prev => ({
      ...prev,
      basic: {
        ...prev.basic,
        [field]: value
      }
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setFacilityData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleCapacityChange = (field: keyof CapacityInfo, value: number) => {
    setFacilityData(prev => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        [field]: value
      }
    }));
  };

  const handleAddressChange = (field: keyof AddressInfo, value: string) => {
    setFacilityData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    if (numbers.length <= 10) return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatBusinessNo = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!facilityData.basic.orgCode) newErrors.orgCode = '기관기호는 필수입니다';
    if (!facilityData.basic.facilityName) newErrors.facilityName = '시설명은 필수입니다';
    if (!facilityData.basic.director) newErrors.director = '시설장명은 필수입니다';
    if (!facilityData.basic.ceoName) newErrors.ceoName = '대표자명은 필수입니다';
    if (!facilityData.basic.businessNo) newErrors.businessNo = '사업자번호는 필수입니다';
    if (!facilityData.contact.phone) newErrors.phone = '전화번호는 필수입니다';
    if (facilityData.contact.email && !validateEmail(facilityData.contact.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    if (!facilityData.address.addr1) newErrors.addr1 = '주소는 필수입니다';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    localStorage.setItem('facility_info', JSON.stringify(facilityData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    const savedData = localStorage.getItem('facility_info');
    if (savedData) {
      setFacilityData(JSON.parse(savedData));
    }
    setErrors({});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        alert('JPG 또는 PNG 파일만 업로드 가능합니다.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFacilityData(prev => ({
          ...prev,
          stampImage: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setFacilityData(prev => ({
      ...prev,
      stampImage: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">시설 기본 정보</h2>
          <p className="text-gray-600">요양원 운영에 필요한 모든 공식 정보를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-refresh-line mr-2"></i>
            초기화
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-save-line text-xl"></i>
            전체 저장
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fadeIn">
          <i className="ri-checkbox-circle-fill text-2xl text-green-600"></i>
          <div>
            <p className="text-sm font-semibold text-green-800">저장되었습니다!</p>
            <p className="text-xs text-green-700">시설 정보가 성공적으로 저장되었습니다.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 좌측: 입력 폼 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. 기관 기본 정보 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="ri-building-4-line text-xl"></i>
                기관 기본 정보
              </h3>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  기관기호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={facilityData.basic.orgCode}
                  onChange={(e) => handleBasicChange('orgCode', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.orgCode ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="F001"
                />
                {errors.orgCode && <p className="text-xs text-red-500 mt-1">{errors.orgCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  요양시설명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={facilityData.basic.facilityName}
                  onChange={(e) => handleBasicChange('facilityName', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.facilityName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="행복요양원"
                />
                {errors.facilityName && <p className="text-xs text-red-500 mt-1">{errors.facilityName}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  시설 설명
                </label>
                <input
                  type="text"
                  value={facilityData.basic.facilityDesc}
                  onChange={(e) => handleBasicChange('facilityDesc', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="어르신들의 행복한 노후를 책임집니다"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  시설구분 <span className="text-red-500">*</span>
                </label>
                <select
                  value={facilityData.basic.facilityType}
                  onChange={(e) => handleBasicChange('facilityType', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="노인요양시설">노인요양시설</option>
                  <option value="주야간보호시설">주야간보호시설</option>
                  <option value="단기보호시설">단기보호시설</option>
                  <option value="노인요양공동생활가정">노인요양공동생활가정</option>
                  <option value="복합시설">복합시설</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  기준 지정일자 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={facilityData.basic.designatedDate}
                  onChange={(e) => handleBasicChange('designatedDate', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  시설장명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={facilityData.basic.director}
                  onChange={(e) => handleBasicChange('director', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.director ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="김원장"
                />
                {errors.director && <p className="text-xs text-red-500 mt-1">{errors.director}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  시설장 휴대폰번호
                </label>
                <input
                  type="text"
                  value={facilityData.basic.directorPhone}
                  onChange={(e) => handleBasicChange('directorPhone', formatPhoneNumber(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="010-0000-0000"
                  maxLength={13}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  대표자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={facilityData.basic.ceoName}
                  onChange={(e) => handleBasicChange('ceoName', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.ceoName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="김대표"
                />
                {errors.ceoName && <p className="text-xs text-red-500 mt-1">{errors.ceoName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  업태
                </label>
                <input
                  type="text"
                  value={facilityData.basic.bizType}
                  onChange={(e) => handleBasicChange('bizType', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="노인요양시설 운영"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  사업자번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={facilityData.basic.businessNo}
                  onChange={(e) => handleBasicChange('businessNo', formatBusinessNo(e.target.value))}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.businessNo ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="000-00-00000"
                  maxLength={12}
                />
                {errors.businessNo && <p className="text-xs text-red-500 mt-1">{errors.businessNo}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  직원수
                </label>
                <input
                  type="number"
                  value={facilityData.basic.staffCount}
                  onChange={(e) => handleBasicChange('staffCount', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="25"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* 2. 연락처 정보 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="ri-phone-line text-xl"></i>
                연락처 정보
              </h3>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  대표 전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={facilityData.contact.phone}
                  onChange={(e) => handleContactChange('phone', formatPhoneNumber(e.target.value))}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="02-0000-0000"
                  maxLength={13}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  팩스번호
                </label>
                <input
                  type="text"
                  value={facilityData.contact.fax}
                  onChange={(e) => handleContactChange('fax', formatPhoneNumber(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="02-0000-0000"
                  maxLength={13}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  이메일주소
                </label>
                <input
                  type="email"
                  value={facilityData.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="info@example.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  홈페이지 주소
                </label>
                <input
                  type="text"
                  value={facilityData.contact.homepage}
                  onChange={(e) => handleContactChange('homepage', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* 3. 시설 정원 정보 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="ri-team-line text-xl"></i>
                시설 정원 정보
              </h3>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  입소정원 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={facilityData.capacity.total}
                  onChange={(e) => handleCapacityChange('total', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="50"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  단기보호 정원
                </label>
                <input
                  type="number"
                  value={facilityData.capacity.shortStay}
                  onChange={(e) => handleCapacityChange('shortStay', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="5"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  주야간보호 정원
                </label>
                <input
                  type="number"
                  value={facilityData.capacity.dayCare}
                  onChange={(e) => handleCapacityChange('dayCare', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="10"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* 4. 주소 정보 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="ri-map-pin-line text-xl"></i>
                주소 정보
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={facilityData.address.zip}
                  onChange={(e) => handleAddressChange('zip', e.target.value)}
                  className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="우편번호"
                  maxLength={5}
                />
                <button
                  type="button"
                  className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-search-line mr-1"></i>
                  주소 검색
                </button>
              </div>

              <div>
                <input
                  type="text"
                  value={facilityData.address.addr1}
                  onChange={(e) => handleAddressChange('addr1', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.addr1 ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="기본주소"
                />
                {errors.addr1 && <p className="text-xs text-red-500 mt-1">{errors.addr1}</p>}
              </div>

              <div>
                <input
                  type="text"
                  value={facilityData.address.addr2}
                  onChange={(e) => handleAddressChange('addr2', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="상세주소"
                />
              </div>
            </div>
          </div>

          {/* 5. 시설 도장 이미지 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="ri-image-line text-xl"></i>
                시설 도장 이미지
              </h3>
            </div>
            
            <div className="p-6">
              {!facilityData.stampImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer"
                >
                  <i className="ri-image-add-line text-5xl text-gray-400 mb-3"></i>
                  <p className="text-sm text-gray-600 mb-1">클릭하여 파일 선택 또는 드래그 앤 드롭</p>
                  <p className="text-xs text-gray-500">JPG, PNG 파일 (최대 5MB)</p>
                  <p className="text-xs text-gray-500 mt-2">정사각형 비율 권장</p>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={facilityData.stampImage}
                    alt="시설 도장"
                    className="w-48 h-48 object-contain border-2 border-gray-200 rounded-lg"
                  />
                  <button
                    onClick={handleImageDelete}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-close-line text-lg"></i>
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* 우측: 실시간 미리보기 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-eye-line text-teal-600 text-xl"></i>
              실시간 미리보기
            </h3>
            
            <div className="space-y-4">
              {/* 시설 정보 카드 */}
              <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                <div className="flex items-start gap-3 mb-3">
                  {facilityData.stampImage && (
                    <img
                      src={facilityData.stampImage}
                      alt="도장"
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {facilityData.basic.facilityName || '시설명'}
                    </h4>
                    <span className="inline-block px-2 py-1 bg-teal-500 text-white text-xs rounded-full">
                      {facilityData.basic.facilityType}
                    </span>
                  </div>
                </div>
                
                {facilityData.basic.facilityDesc && (
                  <p className="text-sm text-gray-600 mb-3 italic">
                    {facilityData.basic.facilityDesc}
                  </p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="ri-building-line text-gray-500"></i>
                    <span className="text-gray-700">기관기호: {facilityData.basic.orgCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-user-line text-gray-500"></i>
                    <span className="text-gray-700">시설장: {facilityData.basic.director}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-user-star-line text-gray-500"></i>
                    <span className="text-gray-700">대표자: {facilityData.basic.ceoName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-file-text-line text-gray-500"></i>
                    <span className="text-gray-700">사업자: {facilityData.basic.businessNo}</span>
                  </div>
                </div>
              </div>

              {/* 연락처 */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-phone-line text-blue-600"></i>
                  연락처
                </h5>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-fill text-gray-500"></i>
                    <span className="text-gray-700">{facilityData.contact.phone}</span>
                  </div>
                  {facilityData.contact.fax && (
                    <div className="flex items-center gap-2">
                      <i className="ri-printer-line text-gray-500"></i>
                      <span className="text-gray-700">{facilityData.contact.fax}</span>
                    </div>
                  )}
                  {facilityData.contact.email && (
                    <div className="flex items-center gap-2">
                      <i className="ri-mail-line text-gray-500"></i>
                      <span className="text-gray-700 break-all">{facilityData.contact.email}</span>
                    </div>
                  )}
                  {facilityData.contact.homepage && (
                    <div className="flex items-center gap-2">
                      <i className="ri-global-line text-gray-500"></i>
                      <span className="text-blue-600 break-all text-xs">{facilityData.contact.homepage}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 주소 */}
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-map-pin-line text-purple-600"></i>
                  주소
                </h5>
                <div className="text-sm text-gray-700">
                  {facilityData.address.zip && (
                    <div className="mb-1">
                      <span className="text-xs text-gray-500">우편번호: </span>
                      {facilityData.address.zip}
                    </div>
                  )}
                  <div>{facilityData.address.addr1}</div>
                  {facilityData.address.addr2 && <div>{facilityData.address.addr2}</div>}
                </div>
              </div>

              {/* 정원 정보 */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-team-line text-green-600"></i>
                  정원 정보
                </h5>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>입소정원:</span>
                    <span className="font-semibold">{facilityData.capacity.total}명</span>
                  </div>
                  {facilityData.capacity.shortStay > 0 && (
                    <div className="flex justify-between">
                      <span>단기보호:</span>
                      <span className="font-semibold">{facilityData.capacity.shortStay}명</span>
                    </div>
                  )}
                  {facilityData.capacity.dayCare > 0 && (
                    <div className="flex justify-between">
                      <span>주야간보호:</span>
                      <span className="font-semibold">{facilityData.capacity.dayCare}명</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-green-200">
                    <span>직원수:</span>
                    <span className="font-semibold">{facilityData.basic.staffCount}명</span>
                  </div>
                </div>
              </div>

              {/* 기타 정보 */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-information-line text-amber-600"></i>
                  기타 정보
                </h5>
                <div className="space-y-1 text-sm text-gray-700">
                  {facilityData.basic.bizType && (
                    <div>
                      <span className="text-xs text-gray-500">업태: </span>
                      {facilityData.basic.bizType}
                    </div>
                  )}
                  {facilityData.basic.designatedDate && (
                    <div>
                      <span className="text-xs text-gray-500">지정일: </span>
                      {facilityData.basic.designatedDate}
                    </div>
                  )}
                  {facilityData.basic.directorPhone && (
                    <div>
                      <span className="text-xs text-gray-500">시설장 연락처: </span>
                      {facilityData.basic.directorPhone}
                    </div>
                  )}
                </div>
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
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}