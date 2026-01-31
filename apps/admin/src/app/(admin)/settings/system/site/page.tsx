'use client';

import React, { useState, useEffect } from 'react';

// 컴포넌트 Import
import SettingsHeader from './SettingsHeader';
import SettingsPreview from './SettingsPreview';
import ServiceSection from './sections/ServiceSection';
import SeoSection from './sections/SeoSection';
import FooterSection from './sections/FooterSection';

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

/**
 * [Main Page] 사이트 및 시스템 설정 관리
 * 실시간 프리뷰와 격자형 서식이 통합된 ERP 환경
 */
export default function SiteSettingsPage() {
  // --- [1] 초기 기본 데이터 설정 ---
  const [settings, setSettings] = useState<SiteSettingsData>({
    serviceName: '아가페케어 요양센터',
    serviceDesc: '어르신들의 존엄한 노후를 위한 프리미엄 케어 서비스',
    contactPhone: '02-1234-5678',
    contactEmail: 'help@agape-care.com',
    customerHours: '평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)',
    metaTitle: '아가페케어 요양센터 | 프리미엄 시니어 케어',
    metaDescription: '2026년 최신 설비와 전문 인력을 갖춘 아가페케어에서 어르신들의 행복한 일상을 함께합니다.',
    metaKeywords: '요양원, 노인복지, 주야간보호, 아가페케어',
    footerText: '© 2026 Agape-Care. All rights reserved.',
    legalNotice: '본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.',
  });

  const [isSaving, setIsSaving] = useState(false);

  // --- [2] 로컬 스토리지 데이터 로드 ---
  useEffect(() => {
    const saved = localStorage.getItem('agape_site_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('설정 로드 실패:', e);
      }
    }
  }, []);

  // --- [3] 전역 액션 핸들러 ---
  const handleSave = async () => {
    setIsSaving(true);
    // 실제 운영 환경에서는 API를 통해 DB에 저장됩니다.
    await new Promise(resolve => setTimeout(resolve, 800));
    localStorage.setItem('agape_site_settings', JSON.stringify(settings));
    setIsSaving(false);
    alert('✅ 시스템 설정이 성공적으로 반영되었습니다.');
  };

  const handleReset = () => {
    if (confirm('모든 입력 값을 마지막 저장 상태로 되돌리시겠습니까?')) {
      const saved = localStorage.getItem('agape_site_settings');
      if (saved) setSettings(JSON.parse(saved));
    }
  };

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

          {/* 시스템 푸터 정보 */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pb-8 pt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <div className="flex gap-4">
              <span>● Status: Operational</span>
              <span>● Last Build: 2026.01.30</span>
            </div>
            <div className="text-[#1a5a96]">Agape-Care Admin System v2.1.0</div>
          </div>
        </div>
      </div>
    </main>
  );
}
