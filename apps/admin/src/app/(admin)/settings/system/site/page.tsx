'use client';

import { useState } from 'react';
import FooterSection from './FooterSection';
import PreviewSection from './PreviewSection';
import SeoSection from './SeoSection';
import ServiceSection from './ServiceSection';

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState({
    serviceName: '행복요양원',
    serviceDesc: '어르신을 위한 전문 요양 서비스',
    contactPhone: '02-1234-5678',
    contactEmail: 'help@care.com',
    customerHours: '평일 09:00 ~ 18:00',
    metaTitle: '행복요양원',
    metaDescription: '신뢰할 수 있는 요양 서비스',
    metaKeywords: '요양원, 노인복지',
    footerText: '© 2026 행복요양원',
    legalNotice: '본 사이트의 모든 정보는 보호됩니다.',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: API 저장
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('site_settings', JSON.stringify(settings));
      alert('✅ 사이트 설정이 저장되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('❌ 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('설정을 초기화하시겠습니까?')) {
      setSettings({
        serviceName: '행복요양원',
        serviceDesc: '어르신을 위한 전문 요양 서비스',
        contactPhone: '02-1234-5678',
        contactEmail: 'help@care.com',
        customerHours: '평일 09:00 ~ 18:00',
        metaTitle: '행복요양원',
        metaDescription: '신뢰할 수 있는 요양 서비스',
        metaKeywords: '요양원, 노인복지',
        footerText: '© 2026 행복요양원',
        legalNotice: '본 사이트의 모든 정보는 보호됩니다.',
      });
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-gray-900">사이트 설정</h1>
          <p className="mt-1 text-sm text-gray-600">홈페이지 및 시스템 공통 노출 정보를 관리합니다.</p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* 좌측 설정 영역 */}
          <div className="space-y-4 lg:col-span-2">
            <ServiceSection value={settings} onChange={setSettings} />
            <SeoSection value={settings} onChange={setSettings} />
            <FooterSection value={settings} onChange={setSettings} />
          </div>

          {/* 우측 미리보기 영역 */}
          <PreviewSection settings={settings} />
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
