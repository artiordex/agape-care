'use client';

import { api } from '@/lib/api';
import { FacilitySchema } from '@agape-care/api-contract';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import FacilityHeader from './FacilityHeader';
import FacilityPreview from './FacilityPreview';
import FacilitySettingsSection, { FacilitySettingsData } from './FacilitySettingsSection';

type FacilityAPIModel = z.infer<typeof FacilitySchema>;

const DEFAULT_DATA: FacilitySettingsData = {
  basic: {
    orgCode: '',
    facilityName: '',
    facilityDesc: '',
    facilityType: '노인요양시설',
    designatedDate: '',
    director: '',
    directorPhone: '',
    ceoName: '',
    businessNo: '',
    bizType: '',
    staffCount: 0,
  },
  contact: {
    phone: '',
    fax: '',
    email: '',
    homepage: '',
  },
  capacity: { total: 0, shortStay: 0, dayCare: 0 },
  address: {
    zip: '',
    addr1: '',
    addr2: '',
  },
  stampImage: '',
};

// API 모델 -> UI 모델 변환
const mapAPIToUI = (apiData: FacilityAPIModel): FacilitySettingsData => {
  return {
    basic: {
      orgCode: apiData.orgCode,
      facilityName: apiData.facilityName,
      facilityDesc: apiData.facilityDesc ?? '',
      facilityType: apiData.facilityType ?? '노인요양시설',
      designatedDate: apiData.designatedDate ? new Date(apiData.designatedDate).toISOString().split('T')[0] : '',
      director: apiData.director,
      directorPhone: apiData.directorPhone ?? '',
      ceoName: apiData.ceoName,
      businessNo: apiData.businessNo,
      bizType: apiData.bizType ?? '',
      staffCount: apiData.staffCount ?? 0,
    },
    contact: {
      phone: apiData.phone,
      fax: apiData.fax ?? '',
      email: apiData.email ?? '',
      homepage: apiData.homepage ?? '',
    },
    capacity: {
      total: apiData.totalCapacity,
      shortStay: apiData.shortStayCapacity ?? 0,
      dayCare: apiData.dayCareCapacity ?? 0,
    },
    address: {
      zip: apiData.zip ?? '',
      address1: apiData.address1,
      address2: apiData.address2 ?? '',
    },
    stampImage: apiData.stampImage ?? '',
  };
};

// UI 모델 -> API 모델 변환 (업데이트용)
const mapUIToAPI = (uiData: FacilitySettingsData) => {
  return {
    orgCode: uiData.basic.orgCode,
    facilityName: uiData.basic.facilityName,
    facilityDesc: uiData.basic.facilityDesc,
    facilityType: uiData.basic.facilityType,
    designatedDate: uiData.basic.designatedDate || null,
    director: uiData.basic.director,
    directorPhone: uiData.basic.directorPhone,
    ceoName: uiData.basic.ceoName,
    businessNo: uiData.basic.businessNo,
    bizType: uiData.basic.bizType,
    staffCount: uiData.basic.staffCount,
    phone: uiData.contact.phone,
    fax: uiData.contact.fax,
    email: uiData.contact.email,
    homepage: uiData.contact.homepage,
    zip: uiData.address.zip,
    address1: uiData.address.address1,
    address2: uiData.address.address2,
    totalCapacity: uiData.capacity.total,
    shortStayCapacity: uiData.capacity.shortStay,
    dayCareCapacity: uiData.capacity.dayCare,
    stampImage: uiData.stampImage,
  };
};

export default function FacilityManagementPage() {
  const [facilityData, setFacilityData] = useState<FacilitySettingsData>(DEFAULT_DATA);

  // 1. 데이터 조회 (API)
  const { data: apiResponse, isLoading, refetch } = api.settings.getFacilityInfo.useQuery(['facilityInfo']);

  // 2. 데이터 업데이트 (API)
  const { mutateAsync: updateFacility, isPending: isSaving } = api.settings.updateFacilityInfo.useMutation();

  // API 데이터 로드 시 UI 상태 업데이트
  useEffect(() => {
    if (apiResponse?.status === 200 && apiResponse.body.success) {
      setFacilityData(mapAPIToUI(apiResponse.body.data as any));
    }
  }, [apiResponse]);

  const handleSave = async () => {
    try {
      const response = await updateFacility({
        body: mapUIToAPI(facilityData),
      });

      if (response.status === 200) {
        toast.success('시설 정보가 성공적으로 저장되었습니다.');
        refetch();
      } else {
        toast.error('저장 중 오류가 발생했습니다.');
      }
    } catch (e) {
      console.error('Save error:', e);
      toast.error('저장 중 오류가 발생했습니다.');
    }
  };

  const handleReset = () => {
    toast.warning('마지막 저장된 정보로 되돌리시겠습니까?', {
      action: {
        label: '되돌리기',
        onClick: () => {
          if (apiResponse?.status === 200 && apiResponse.body.success) {
            setFacilityData(mapAPIToUI(apiResponse.body.data as any));
            toast.success('저장 상태로 복원되었습니다.');
          }
        },
      },
      cancel: {
        label: '취소',
        onClick: () => {},
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f0f2f5]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
          <p className="font-black text-gray-500">시설 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 컨트롤 헤더 */}
      <FacilityHeader
        facilityName={facilityData.basic.facilityName || '시설명 로딩 중...'}
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
