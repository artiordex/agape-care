'use client';

import { api } from '@/lib/api';
import { SiteInfoSchema } from '@agape-care/api-contract';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// 컴포넌트 Import
import SettingsHeader from './SettingsHeader';
import SettingsPreview from './SettingsPreview';
import FooterSection from './sections/FooterSection';
import SeoSection from './sections/SeoSection';
import ServiceSection from './sections/ServiceSection';

// 데이터 인터페이스 정의
export interface SiteSettingsData {
  serviceName: string;
  serviceDesc: string;
  contactPhone: string;
  contactEmail: string;
  customerHours: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  footerText: string;
  legalNotice: string;
}

type SiteInfoAPIModel = z.infer<typeof SiteInfoSchema>;

/**
 * [Main Page] 사이트 및 시스템 설정 관리
 * 실시간 프리뷰와 격자형 서식이 통합된 ERP 환경
 */
export default function SiteSettingsPage() {
  // --- [1] 초기 기본 데이터 설정 ---
  const [settings, setSettings] = useState<SiteSettingsData>({
    serviceName: '',
    serviceDesc: '',
    contactPhone: '',
    contactEmail: '',
    customerHours: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    footerText: '',
    legalNotice: '',
  });

  // 1. 데이터 조회 (API)
  const { data: apiResponse, isLoading, refetch } = api.settings.getSiteInfo.useQuery(['siteInfo']);

  // 2. 데이터 업데이트 (API)
  const { mutateAsync: updateSite, isPending: isSaving } = api.settings.updateSiteInfo.useMutation();

  // API 모델 -> UI 모델 변환
  const mapAPIToUI = (apiData: SiteInfoAPIModel): SiteSettingsData => ({
    serviceName: apiData.serviceName,
    serviceDesc: apiData.serviceDesc ?? '',
    contactPhone: apiData.contactPhone ?? '',
    contactEmail: apiData.contactEmail ?? '',
    customerHours: apiData.customerHours ?? '',
    metaTitle: apiData.metaTitle ?? '',
    metaDescription: apiData.metaDescription ?? '',
    metaKeywords: apiData.metaKeywords ?? '',
    footerText: apiData.footerText ?? '',
    legalNotice: apiData.legalNotice ?? '',
  });

  // UI 모델 -> API 모델 변환 (업데이트용)
  const mapUIToAPI = (uiData: SiteSettingsData) => ({
    serviceName: uiData.serviceName,
    serviceDesc: uiData.serviceDesc,
    contactPhone: uiData.contactPhone,
    contactEmail: uiData.contactEmail,
    customerHours: uiData.customerHours,
    metaTitle: uiData.metaTitle,
    metaDescription: uiData.metaDescription,
    metaKeywords: uiData.metaKeywords,
    footerText: uiData.footerText,
    legalNotice: uiData.legalNotice,
  });

  // API 데이터 로드 시 UI 상태 업데이트
  useEffect(() => {
    if (apiResponse?.status === 200 && apiResponse.body.success) {
      setSettings(mapAPIToUI(apiResponse.body.data as any));
    }
  }, [apiResponse]);

  // --- [3] 전역 액션 핸들러 ---
  const handleSave = async () => {
    try {
      const response = await updateSite({
        body: mapUIToAPI(settings),
      });

      if (response.status === 200) {
        toast.success('시스템 설정이 성공적으로 반영되었습니다.');
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
    toast.warning('모든 입력 값을 마지막 저장 상태로 되돌리시겠습니까?', {
      action: {
        label: '되돌리기',
        onClick: () => {
          if (apiResponse?.status === 200 && apiResponse.body.success) {
            setSettings(mapAPIToUI(apiResponse.body.data as any));
            toast.success('저장 상태로 복원되었습니다.');
          }
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f0f2f5]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
          <p className="font-black text-gray-500">사이트 설정을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 1. 통합 컨트롤 헤더 */}
      <SettingsHeader isSaving={isSaving} onSave={handleSave} onReset={handleReset} />

      {/* 2. 메인 설정 영역 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 좌측: 설정 입력 섹션 그룹 (2/3 영역) */}
            <div className="space-y-6 lg:col-span-2">
              <ServiceSection value={settings} onChange={next => setSettings(prev => ({ ...prev, ...next }))} />

              <SeoSection value={settings} onChange={next => setSettings(prev => ({ ...prev, ...next }))} />

              <FooterSection value={settings} onChange={next => setSettings(prev => ({ ...prev, ...next }))} />
            </div>

            {/* 우측: 실시간 노출 프리뷰 (1/3 영역) */}
            <div className="hidden lg:block">
              <SettingsPreview settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
