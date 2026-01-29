'use client';

import { useEffect, useState } from 'react';

import AddressSection from './FacilityAddressSection';
import BasicInfoSection from './FacilityBasicInfoSection';
import CapacitySection from './FacilityCapacitySection';
import ContactSection, { ContactInfo } from './FacilityContactSection';
import PreviewSection from './FacilityPreviewSection';
import StampSection from './FacilityStampSection';

interface FacilityData {
  basic: {
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
  };
  contact: {
    phone: string;
    fax: string;
    email: string;
    homepage: string;
  };
  capacity: {
    total: number;
    shortStay: number;
    dayCare: number;
  };
  address: {
    zip: string;
    addr1: string;
    addr2: string;
  };
  stampImage: string;
}

export default function FacilityPage() {
  const [facilityData, setFacilityData] = useState<FacilityData>({
    basic: {
      orgCode: 'F001',
      facilityName: '행복요양원',
      facilityDesc: '어르신들의 행복한 노후를 책임집니다.',
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

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('facility_info');
    if (saved) {
      try {
        setFacilityData(JSON.parse(saved));
      } catch {
        /* noop */
      }
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('facility_info', JSON.stringify(facilityData));
      setSaved(true);
      alert('✅ 시설 정보가 저장되었습니다.');
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('저장 실패:', error);
      alert('❌ 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const saved = localStorage.getItem('facility_info');
    if (saved && confirm('저장된 값으로 초기화하시겠습니까?')) {
      try {
        setFacilityData(JSON.parse(saved));
        alert('✅ 초기화되었습니다.');
      } catch {
        alert('❌ 초기화에 실패했습니다.');
      }
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-gray-900">시설 기본 정보</h1>
          <p className="mt-1 text-sm text-gray-600">요양원 운영에 필요한 기본 정보를 관리합니다.</p>
        </div>

        {/* 저장 완료 알림 */}
        {saved && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <i className="ri-checkbox-circle-line mr-2"></i>시설 정보가 저장되었습니다.
          </div>
        )}

        {/* 메인 그리드 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* 좌측 폼 영역 */}
          <div className="space-y-4 lg:col-span-2">
            <BasicInfoSection
              value={facilityData.basic}
              onChange={(basic: FacilityData['basic']) => setFacilityData(prev => ({ ...prev, basic }))}
            />

            <ContactSection
              value={facilityData.contact}
              onChange={(contact: ContactInfo) => setFacilityData(prev => ({ ...prev, contact }))}
            />

            <CapacitySection
              value={facilityData.capacity}
              onChange={(capacity: FacilityData['capacity']) => setFacilityData(prev => ({ ...prev, capacity }))}
            />

            <AddressSection
              value={facilityData.address}
              onChange={(address: FacilityData['address']) => setFacilityData(prev => ({ ...prev, address }))}
            />

            <StampSection
              value={facilityData.stampImage}
              onChange={(stampImage: string) => setFacilityData(prev => ({ ...prev, stampImage }))}
            />
          </div>

          {/* 우측 미리보기 영역 */}
          <PreviewSection data={facilityData} />
        </div>

        {/* 하단 액션 버튼 */}
        <div className="mt-6 flex justify-end gap-2 rounded-lg border-t border-gray-200 bg-white px-6 py-4">
          <button
            onClick={handleReset}
            disabled={isSaving}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            초기화
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>저장 중...
              </>
            ) : (
              <>
                <i className="ri-save-line"></i>저장
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
