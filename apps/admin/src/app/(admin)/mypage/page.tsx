'use client';

import { useEffect, useState } from 'react';

// 리팩토링된 통합 컴포넌트 임포트
import MyPageHeader from './MyPageHeader';
import MyPageTabs from './MyPageTabs';
import ScheduleTab from './tabs/ScheduleTab';
import MusculoskeletalTab from './tabs/MusculoskeletalTab';
import SettingsTab from './tabs/SettingsTab';
import NotificationsTab from './tabs/NotificationsTab';

type TabId = 'schedule' | 'musculoskeletal' | 'settings' | 'notifications';

/**
 * [Main Page] 마이페이지(내 정보) 통합 관제 시스템
 * 아가페 그린(#5C8D5A) 테마 및 직각형 ERP 레이아웃 통합
 */
export default function MyPage() {
  // 1. 시스템 내비게이션 엔진
  const navigate = typeof window !== 'undefined' ? (window as any).REACT_APP_NAVIGATE || (() => {}) : () => {};

  // 2. 관제 핵심 상태: URL 파라미터 기반 탭 동기화
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (typeof window === 'undefined') return 'schedule';
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as TabId | null;
    const validTabs: TabId[] = ['schedule', 'musculoskeletal', 'settings', 'notifications'];
    return tab && validTabs.includes(tab) ? tab : 'schedule';
  });

  // 3. 사용자 마스터 정보
  const [userInfo] = useState({
    name: '김시설장',
    role: '시설장 (Director)',
    employeeId: 'EMP-2024-001',
    roleLevel: '시스템 관리자 (ADMIN)',
    phone: '010-1234-5678',
    email: 'director@agape-care.com',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20korean%20senior%20care%20facility%20director%20portrait&width=100&height=100&seq=admin-001',
  });

  // 4. URL 상태 동기화 Hook
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') !== activeTab) {
      params.set('tab', activeTab);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5] font-sans antialiased">
      {/* A. 상단: 통합 관제 헤더 */}
      <MyPageHeader
        userInfo={userInfo}
        onBack={() => navigate('/admin/dashboard')}
        onNotificationClick={() => setActiveTab('notifications')}
      />

      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-0 p-6">
          {/* B. 중앙: 아가페 표준 탭 내비게이션 */}
          <MyPageTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* C. 메인: 탭별 통합 워크스페이스 */}
          <div className="min-h-[600px] rounded-none border-x border-b border-gray-300 bg-white p-8 shadow-xl">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {activeTab === 'schedule' && <ScheduleTab />}
              {activeTab === 'musculoskeletal' && <MusculoskeletalTab />}
              {activeTab === 'settings' && <SettingsTab userInfo={userInfo} />}
              {activeTab === 'notifications' && <NotificationsTab />}
            </div>
          </div>

          {/* D. 하단: 시스템 데이터 노드 정보 */}
          <div className="mt-6 flex flex-col items-center justify-center gap-1 opacity-20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              AgapeCare Personnel Management Node
            </p>
            <div className="h-0.5 w-12 bg-[#5C8D5A]"></div>
          </div>
        </div>
      </div>

      {/* 전역 스타일: 스크롤바 최적화 */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5c8d5a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a7548;
        }
      `}</style>
    </div>
  );
}
