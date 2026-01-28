'use client';

import { useEffect, useState } from 'react';

interface Settings {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  footerText: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: '행복요양원',
    metaTitle: '행복요양원 - 어르신을 위한 최상의 케어',
    metaDescription: '전문 의료진과 함께하는 신뢰할 수 있는 요양 서비스',
    metaKeywords: '요양원, 요양 서비스, 노인 복지, 간병, 건강 관리',
    footerText: '© 2024 행복요양원. All rights reserved.',
    contactPhone: '02-1234-5678',
    contactEmail: 'contact@nursingcare.com',
    address: '서울특별시 강남구 테헤란로 123',
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);

  // localStorage 로드
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedSettings = localStorage.getItem('site_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch {
        /* empty */
      }
    }
  }, []);

  const handleChange = (field: keyof Settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">사이트 설정</h2>
        <p className="text-gray-600">웹사이트에 표시되는 기본 정보와 SEO 설정을 관리합니다.</p>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setPreviewMode(v => !v)}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          <i className="ri-eye-line mr-2"></i>
          {previewMode ? '편집 모드' : '미리보기'}
        </button>

        <button
          onClick={handleSave}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 px-6 py-3 font-bold text-white hover:shadow-xl"
        >
          <i className="ri-save-line text-xl"></i>
          설정 저장
        </button>
      </div>

      {/* 저장 알림 */}
      {saved && (
        <div className="animate-fadeIn flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <i className="ri-checkbox-circle-fill text-2xl text-green-600"></i>
          <div>
            <p className="text-sm font-semibold text-green-800">설정이 저장되었습니다!</p>
            <p className="text-xs text-green-700">변경사항이 적용되었습니다.</p>
          </div>
        </div>
      )}

      {/* 메인 그리드 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 입력 폼 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 기본 정보 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <i className="ri-information-line text-teal-600"></i>
              기본 정보
            </h3>

            <div className="space-y-4">
              {/* 각 입력 필드 */}
              <InputField
                label="사이트명"
                value={settings.siteName}
                disabled={previewMode}
                onChange={v => handleChange('siteName', v)}
              />

              <InputField
                label="전화번호"
                value={settings.contactPhone}
                disabled={previewMode}
                onChange={v => handleChange('contactPhone', v)}
              />

              <InputField
                label="이메일"
                value={settings.contactEmail}
                disabled={previewMode}
                onChange={v => handleChange('contactEmail', v)}
              />

              <InputField
                label="주소"
                value={settings.address}
                disabled={previewMode}
                onChange={v => handleChange('address', v)}
              />
            </div>
          </div>

          {/* SEO 설정 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <i className="ri-search-line text-teal-600"></i>
              SEO 설정
            </h3>

            <div className="space-y-4">
              <InputField
                label="메타 제목"
                value={settings.metaTitle}
                max={60}
                disabled={previewMode}
                onChange={v => handleChange('metaTitle', v)}
              />

              <TextAreaField
                label="메타 설명"
                value={settings.metaDescription}
                max={160}
                disabled={previewMode}
                onChange={v => handleChange('metaDescription', v)}
              />

              <InputField
                label="메타 키워드"
                value={settings.metaKeywords}
                disabled={previewMode}
                onChange={v => handleChange('metaKeywords', v)}
              />
              <p className="text-xs text-gray-500">쉼표(,)로 구분하여 입력하세요.</p>
            </div>
          </div>

          {/* 푸터 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <i className="ri-layout-bottom-line text-teal-600"></i>
              푸터 설정
            </h3>

            <TextAreaField
              value={settings.footerText}
              disabled={previewMode}
              onChange={v => handleChange('footerText', v)}
            />
          </div>
        </div>

        {/* 오른쪽 미리보기 */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <i className="ri-eye-line text-teal-600"></i>
              실시간 미리보기
            </h3>

            <PreviewBox settings={settings} />
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

/* -------------------- */
/*     아래 UI 컴포넌트  */
/* -------------------- */

function InputField({
  label,
  value,
  onChange,
  disabled,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  max?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        maxLength={max}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-teal-500"
      />
      {max && (
        <p className="mt-1 text-xs text-gray-500">
          {value.length} / {max}자
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  disabled,
  max,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  max?: number;
}) {
  return (
    <div>
      {label && <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>}
      <textarea
        rows={3}
        value={value}
        maxLength={max}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-teal-500"
      />
      {max && (
        <p className="mt-1 text-xs text-gray-500">
          {value.length} / {max}자
        </p>
      )}
    </div>
  );
}

function PreviewBox({ settings }: { settings: Settings }) {
  return (
    <div className="space-y-4 text-sm">
      {/* 사이트명 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="mb-1 text-xs text-gray-500">사이트명</p>
        <p className="font-bold text-gray-900">{settings.siteName}</p>
      </div>

      {/* 연락처 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="mb-1 text-xs text-gray-500">연락처</p>
        <p className="mb-1 text-gray-900">
          <i className="ri-phone-line mr-1"></i>
          {settings.contactPhone}
        </p>
        <p className="text-gray-900">
          <i className="ri-mail-line mr-1"></i>
          {settings.contactEmail}
        </p>
      </div>

      {/* 주소 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="mb-1 text-xs text-gray-500">주소</p>
        <p className="text-gray-900">
          <i className="ri-map-pin-line mr-1"></i>
          {settings.address}
        </p>
      </div>

      {/* SEO */}
      <div className="rounded-lg border-l-4 border-teal-500 bg-gray-50 p-4">
        <p className="mb-1 text-xs text-gray-500">검색 결과 미리보기</p>
        <p className="mb-1 font-bold text-blue-600">{settings.metaTitle}</p>
        <p className="mb-1 text-xs text-gray-600">{settings.address}</p>
        <p className="text-xs text-gray-700">{settings.metaDescription}</p>
      </div>

      {/* 푸터 */}
      <div className="rounded-lg bg-gray-900 p-4 text-xs text-gray-300">{settings.footerText}</div>
    </div>
  );
}
