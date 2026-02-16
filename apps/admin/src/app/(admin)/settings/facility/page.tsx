'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import FacilityHeader from './FacilityHeader';
import FacilityPreview from './FacilityPreview';
import FacilitySettingsSection, { FacilitySettingsData } from './FacilitySettingsSection';

const STORAGE_KEY = 'agape_facility_info';

const DEFAULT_DATA: FacilitySettingsData = {
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
};

export default function FacilityManagementPage() {
  const [facilityData, setFacilityData] = useState<FacilitySettingsData>(DEFAULT_DATA);
  const [isSaving, setIsSaving] = useState(false);

  // 로컬 스토리지 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setFacilityData(JSON.parse(savedData));
      } catch (e) {
        console.error('데이터 파싱 오류:', e);
        toast.error('저장된 데이터를 불러오는 데 실패했습니다.');
      }
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 실제 API 연동 시 fetch/axios 호출 영역
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(facilityData));
      toast.success('시설 정보가 성공적으로 저장되었습니다.');
    } catch (e) {
      toast.error('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    toast.warning('저장된 마지막 정보로 되돌리시겠습니까?', {
      action: {
        label: '되돌리기',
        onClick: () => {
          const savedData = localStorage.getItem(STORAGE_KEY);
          if (savedData) {
            setFacilityData(JSON.parse(savedData));
            toast.success('마지막 저장 상태로 복원되었습니다.');
          } else {
            toast.error('저장된 데이터가 없습니다.');
          }
        },
      },
      cancel: {
        label: '취소',
        onClick: () => {},
      },
    });
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 컨트롤 헤더 */}
      <FacilityHeader
        facilityName={facilityData.basic.facilityName}
        isSaving={isSaving}
        onSave={handleSave}
        onReset={handleReset}
      />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 좌측: 입력 폼 (2/3) */}
            <div className="lg:col-span-2">
              <FacilitySettingsSection value={facilityData} onChange={setFacilityData} />
            </div>

            {/* 우측: 실시간 프리뷰 (1/3) */}
            <div className="hidden lg:block">
              <FacilityPreview data={facilityData} />
            </div>
          </div>

          {/* 하단 보조 정보 */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pb-8 pt-4 text-[12px] font-bold uppercase tracking-widest text-gray-400">
            <span>아가페케어 시설 관리 모듈</span>
            <span>보안 등급: 레벨 2 관리자 권한</span>
          </div>
        </div>
      </div>
    </main>
  );
}
