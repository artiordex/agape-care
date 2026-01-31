'use client';

import React, { useState, useEffect } from 'react';

// 섹션 컴포넌트 Import
import FacilityHeader from './FacilityHeader';
import FacilityPreview from './FacilityPreview';
import BasicInfoSection from './sections/BasicInfoSection';
import ContactSection from './sections/ContactSection';
import AddressSection from './sections/AddressSection';
import CapacitySection from './sections/CapacitySection';
import StampSection from './sections/StampSection';

// 데이터 인터페이스 정의
export interface FacilityData {
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

export default function FacilityManagementPage() {
  // --- [1] 초기 기본 데이터 설정 ---
  const [facilityData, setFacilityData] = useState<FacilityData>({
    basic: {
      orgCode: 'F-2026-001',
      facilityName: '아가페케어 요양센터',
      facilityDesc: '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스를 제공합니다.',
      facilityType: '노인요양시설',
      designatedDate: '2026-01-01',
      director: '홍길동',
      directorPhone: '010-1234-5678',
      ceoName: '이아무개',
      businessNo: '123-45-67890',
      bizType: '사회복지서비스업',
      staffCount: 35,
    },
    contact: {
      phone: '02-1234-5678',
      fax: '02-1234-5679',
      email: 'admin@agape-care.com',
      homepage: 'https://agape-care.com',
    },
    capacity: { total: 49, shortStay: 5, dayCare: 10 },
    address: {
      zip: '06234',
      addr1: '서울특별시 강남구 테헤란로 123',
      addr2: '아카이브 빌딩 7층',
    },
    stampImage: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  // --- [2] 로컬 스토리지 데이터 로드 ---
  useEffect(() => {
    const savedData = localStorage.getItem('agape_facility_info');
    if (savedData) {
      try {
        setFacilityData(JSON.parse(savedData));
      } catch (e) {
        console.error('데이터 파싱 오류:', e);
      }
    }
  }, []);

  // --- [3] 전역 액션 핸들러 ---
  const handleSave = async () => {
    setIsSaving(true);
    // 실제 API 연동 시 fetch/axios 호출 영역
    await new Promise(resolve => setTimeout(resolve, 800));
    localStorage.setItem('agape_facility_info', JSON.stringify(facilityData));
    setIsSaving(false);
    alert('✅ 시설 정보가 성공적으로 저장되었습니다.');
  };

  const handleReset = () => {
    if (confirm('저장된 마지막 정보로 되돌리시겠습니까? 현재 입력 중인 내용은 사라집니다.')) {
      const savedData = localStorage.getItem('agape_facility_info');
      if (savedData) setFacilityData(JSON.parse(savedData));
    }
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 1. 컨트롤 헤더 */}
      <FacilityHeader
        facilityName={facilityData.basic.facilityName}
        isSaving={isSaving}
        onSave={handleSave}
        onReset={handleReset}
      />

      {/* 2. 메인 컨텐츠 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 좌측: 입력 폼 섹션 그룹 (2/3 영역) */}
            <div className="space-y-6 lg:col-span-2">
              <BasicInfoSection
                value={facilityData.basic}
                onChange={basic => setFacilityData(prev => ({ ...prev, basic }))}
              />

              <ContactSection
                value={facilityData.contact}
                onChange={contact => setFacilityData(prev => ({ ...prev, contact }))}
              />

              <AddressSection
                value={facilityData.address}
                onChange={address => setFacilityData(prev => ({ ...prev, address }))}
              />

              <CapacitySection
                value={facilityData.capacity}
                onChange={capacity => setFacilityData(prev => ({ ...prev, capacity }))}
              />

              <StampSection
                value={facilityData.stampImage}
                onChange={stampImage => setFacilityData(prev => ({ ...prev, stampImage }))}
              />
            </div>

            {/* 우측: 실시간 프리뷰 사이드바 (1/3 영역) */}
            <div className="hidden lg:block">
              <FacilityPreview data={facilityData} />
            </div>
          </div>

          {/* 하단 보조 정보 */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pb-8 pt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>Agape-Care Facility Management Module</span>
            <span>Security Level: Level 2 Admin Access</span>
          </div>
        </div>
      </div>
    </main>
  );
}
