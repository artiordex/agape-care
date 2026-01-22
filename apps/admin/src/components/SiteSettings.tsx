import { useState, useEffect } from 'react';
import FacilityInfo from './FacilityInfo';

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

export default function SiteSettings() {
  const [activeTab, setActiveTab] = useState<'site' | 'facility'>('site');
  const [settings, setSettings] = useState<Settings>({
    siteName: '행복요양원',
    metaTitle: '행복요양원 - 어르신을 위한 최상의 케어',
    metaDescription: '전문 의료진과 함께하는 신뢰할 수 있는 요양 서비스',
    metaKeywords: '요양원, 요양 서비스, 노인 복지, 간병, 건강 관리',
    footerText: '© 2024 행복요양원. All rights reserved.',
    contactPhone: '02-1234-5678',
    contactEmail: 'contact@nursingcare.com',
    address: '서울특별시 강남구 테헤란로 123'
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // localStorage에서 설정 불러오기
    const savedSettings = localStorage.getItem('site_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (field: keyof Settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">사이트 관리</h2>
          <p className="text-gray-600">웹사이트 및 시설의 기본 정보를 관리하세요</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('site')}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'site'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <i className="ri-settings-3-line mr-2"></i>
          사이트 설정
        </button>
        <button
          onClick={() => setActiveTab('facility')}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'facility'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <i className="ri-building-4-line mr-2"></i>
          시설 기본정보
        </button>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === 'facility' ? (
        <FacilityInfo />
      ) : (
        <>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-eye-line mr-2"></i>
              {previewMode ? '편집 모드' : '미리보기'}
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-save-line text-xl"></i>
              설정 저장
            </button>
          </div>

          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fadeIn">
              <i className="ri-checkbox-circle-fill text-2xl text-green-600"></i>
              <div>
                <p className="text-sm font-semibold text-green-800">설정이 저장되었습니다!</p>
                <p className="text-xs text-green-700">변경사항이 적용되었습니다.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 설정 폼 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 기본 정보 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-information-line text-teal-600"></i>
                  기본 정보
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">사이트명</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleChange('siteName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="사이트명 입력"
                      disabled={previewMode}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">연락처 전화번호</label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => handleChange('contactPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="02-1234-5678"
                      disabled={previewMode}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">연락처 이메일</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleChange('contactEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="contact@example.com"
                      disabled={previewMode}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">주소</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="주소 입력"
                      disabled={previewMode}
                    />
                  </div>
                </div>
              </div>

              {/* SEO 설정 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-search-line text-teal-600"></i>
                  SEO 설정
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">메타 제목</label>
                    <input
                      type="text"
                      value={settings.metaTitle}
                      onChange={(e) => handleChange('metaTitle', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="메타 제목 (60자 이내)"
                      maxLength={60}
                      disabled={previewMode}
                    />
                    <p className="text-xs text-gray-500 mt-1">{settings.metaTitle.length} / 60자</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">메타 설명</label>
                    <textarea
                      value={settings.metaDescription}
                      onChange={(e) => handleChange('metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="메타 설명 (160자 이내)"
                      maxLength={160}
                      disabled={previewMode}
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{settings.metaDescription.length} / 160자</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">메타 키워드</label>
                    <input
                      type="text"
                      value={settings.metaKeywords}
                      onChange={(e) => handleChange('metaKeywords', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="키워드1, 키워드2, 키워드3"
                      disabled={previewMode}
                    />
                    <p className="text-xs text-gray-500 mt-1">쉼표(,)로 구분하여 입력하세요</p>
                  </div>
                </div>
              </div>

              {/* 푸터 설정 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-layout-bottom-line text-teal-600"></i>
                  푸터 설정
                </h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">푸터 텍스트</label>
                  <textarea
                    value={settings.footerText}
                    onChange={(e) => handleChange('footerText', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="푸터에 표시될 텍스트"
                    disabled={previewMode}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 미리보기 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-eye-line text-teal-600"></i>
                  실시간 미리보기
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">사이트명</p>
                    <p className="font-bold text-gray-900">{settings.siteName}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">연락처</p>
                    <p className="text-gray-900 mb-1">
                      <i className="ri-phone-line mr-1"></i>
                      {settings.contactPhone}
                    </p>
                    <p className="text-gray-900">
                      <i className="ri-mail-line mr-1"></i>
                      {settings.contactEmail}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">주소</p>
                    <p className="text-gray-900">
                      <i className="ri-map-pin-line mr-1"></i>
                      {settings.address}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-teal-500">
                    <p className="text-xs text-gray-500 mb-1">검색 결과 미리보기</p>
                    <p className="font-bold text-blue-600 mb-1">{settings.metaTitle}</p>
                    <p className="text-xs text-gray-600 mb-1">{settings.address}</p>
                    <p className="text-xs text-gray-700">{settings.metaDescription}</p>
                  </div>

                  <div className="p-4 bg-gray-900 text-gray-300 rounded-lg text-xs">
                    <p>{settings.footerText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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