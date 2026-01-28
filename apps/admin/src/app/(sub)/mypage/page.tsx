'use client';

import { useEffect, useState } from 'react';
import MusculoskeletalTab from './MusculoskeletalTab';
import NotificationsTab from './NotificationsTab';
import ScheduleTab from './ScheduleTab';
import SettingsTab from './SettingsTab';

type TabType = 'schedule' | 'musculoskeletal' | 'settings' | 'notifications';

export default function MyPage() {
  // If REACT_APP_NAVIGATE is provided by the host (e.g., a global navigation helper),
  // fall back to a no‑op function to avoid runtime errors.
  const navigate = (window as any).REACT_APP_NAVIGATE || (() => {});

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab') as TabType | null;
      const validTabs: TabType[] = ['schedule', 'musculoskeletal', 'settings', 'notifications'];
      return tab && validTabs.includes(tab) ? tab : 'schedule';
    } catch (e) {
      console.error('Failed to read URL parameters:', e);
      return 'schedule';
    }
  });

  // Update the URL whenever the active tab changes
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', activeTab);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    } catch (e) {
      console.error('Failed to update URL:', e);
    }
  }, [activeTab]);

  // Listen to browser navigation (back/forward) and restore tab state
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab') as TabType | null;
        const validTabs: TabType[] = ['schedule', 'musculoskeletal', 'settings', 'notifications'];
        if (tab && validTabs.includes(tab)) {
          setActiveTab(tab);
        }
      } catch (e) {
        console.error('Failed to handle popstate:', e);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [userInfo] = useState({
    name: '김시설장',
    role: '시설장',
    employeeId: 'EMP-2024-001',
    roleLevel: '관리자 권한',
    phone: '010-1234-5678',
    email: 'director@facility.com',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20korean%20senior%20care%20facility%20director%20portrait%20clean%20white%20background%20confident%20friendly%20healthcare%20administrator&width=80&height=80&seq=admin-prof-001&orientation=squarish',
  });

  const tabs = [
    { id: 'schedule' as TabType, label: '일정', icon: 'ri-calendar-line' },
    { id: 'musculoskeletal' as TabType, label: '근골격계질환', icon: 'ri-heart-pulse-line' },
    { id: 'settings' as TabType, label: '정보설정', icon: 'ri-settings-3-line' },
    { id: 'notifications' as TabType, label: '알림사항', icon: 'ri-notification-3-line' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side: back button and user info */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                aria-label="뒤로가기"
              >
                <i className="ri-arrow-left-line text-2xl"></i>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/20">
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    className="h-full w-full object-cover"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      // Hide broken image and replace with a placeholder icon
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<i class="ri-user-line text-2xl text-white"></i>';
                      }
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold">내 정보 ({userInfo.name})</h1>
                  <p className="text-sm text-white/80">
                    {userInfo.role} • {userInfo.roleLevel}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: notification button */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/10"
              aria-label="알림"
            >
              <i className="ri-notification-3-line text-2xl"></i>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>

        {/* Tab menu */}
        <div className="bg-white/10 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4">
            <div className="scrollbar-hide flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 cursor-pointer whitespace-nowrap px-6 py-3 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'border-b-2 border-white text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  } `}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {activeTab === 'schedule' && <ScheduleTab />}
        {activeTab === 'musculoskeletal' && <MusculoskeletalTab />}
        {activeTab === 'settings' && <SettingsTab userInfo={userInfo} />}
        {activeTab === 'notifications' && <NotificationsTab />}
      </div>

      {/* Hide scrollbars for the tab bar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
