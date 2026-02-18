/**
 * Description : page.tsx - ?? operations/cctv ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useState } from 'react';
import CCTVDeviceManagement from './CCTVDeviceManagement';
import CCTVRoomConsent from './CCTVRoomConsent';
import CCTVViewLog from './CCTVViewLog';
import CCTVWeeklyCheck from './CCTVWeeklyCheck';

const CCTVManagement = () => {
  const [activeTab, setActiveTab] = useState<'device' | 'consent' | 'transport' | 'viewLog' | 'weeklyCheck'>('device');

  const tabs = [
    { id: 'device', label: '장치 관리', icon: 'ri-camera-line', description: 'CCTV 설치 및 운영 현황' },
    { id: 'consent', label: '침실 촬영 동의', icon: 'ri-file-shield-line', description: '수급자 침실 촬영 동의서' },
    { id: 'viewLog', label: '영상 열람대장', icon: 'ri-eye-line', description: '영상정보 열람 및 제공 기록' },
    { id: 'weeklyCheck', label: '주간 점검대장', icon: 'ri-calendar-check-line', description: 'CCTV 설비 정기 점검' },
    { id: 'transport', label: '차량 CCTV', icon: 'ri-bus-wifi-line', description: '운송 차량 내 영상 관리' },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      {/* 1. 상단 타이틀 & 탭 내비게이션 */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="px-8 pb-4 pt-8">
          <h1 className="flex items-center gap-3 text-2xl font-black text-gray-900">
            <span className="rounded-xl bg-emerald-600 p-2">
              <i className="ri-video-chat-line text-white"></i>
            </span>
            CCTV 통합 관리 시스템
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-500">시설 내 모든 CCTV 관련 업무를 통합하여 관리합니다.</p>
        </div>

        <div className="no-scrollbar flex gap-1 overflow-x-auto px-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'group relative flex min-w-[180px] flex-col items-start px-6 py-4 transition-all',
                activeTab === tab.id ? 'bg-white' : 'hover:bg-gray-50',
              )}
            >
              <div className="mb-1 flex items-center gap-2">
                <i
                  className={clsx(
                    tab.icon,
                    'text-lg transition-colors',
                    activeTab === tab.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600',
                  )}
                ></i>
                <span
                  className={clsx(
                    'text-sm font-black transition-colors',
                    activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600',
                  )}
                >
                  {tab.label}
                </span>
              </div>
              <p
                className={clsx(
                  'text-[10px] font-bold opacity-60 transition-colors',
                  activeTab === tab.id ? 'text-emerald-500' : 'text-gray-300 group-hover:text-gray-400',
                )}
              >
                {tab.description}
              </p>

              {activeTab === tab.id && (
                <div className="animate-slideInLeft absolute bottom-0 left-0 right-0 h-1 bg-emerald-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 콘텐츠 영역 */}
      <div className="mx-auto w-full max-w-[1600px] p-8">
        {activeTab === 'device' && <CCTVDeviceManagement />}
        {activeTab === 'consent' && <CCTVRoomConsent />}
        {activeTab === 'viewLog' && <CCTVViewLog />}
        {activeTab === 'weeklyCheck' && <CCTVWeeklyCheck />}
      </div>
    </div>
  );
};

export default CCTVManagement;
