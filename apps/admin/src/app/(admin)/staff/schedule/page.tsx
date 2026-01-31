'use client';

import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';

// 1. 아가페 표준 관제 모듈 임포트
import ScheduleHeader from './control/ScheduleHeader';
import ControlTab from './control/ControlTab';
import IndividualTab from './individual/IndividualTab';
import AutoSchedulePanel from './auto-schedule/AutoSchedulePanel';
import TemplateTab from './template/TemplateTab';

// 2. 샘플 마스터 데이터 (시스템 초기 가동용)
const SAMPLE_STAFF = [
  {
    id: 'ST001',
    name: '김철수',
    position: '선임요양보호사',
    type: '요양보호사',
    status: '재직',
    hireDate: '2023-01-15',
    annualLeave: 15,
    usedLeave: 3,
  },
  {
    id: 'ST002',
    name: '이영희',
    position: '요양보호사',
    type: '요양보호사',
    status: '재직',
    hireDate: '2023-03-10',
    annualLeave: 15,
    usedLeave: 5,
  },
  {
    id: 'ST003',
    name: '박민수',
    position: '사회복지사',
    type: '사회복지사',
    status: '재직',
    hireDate: '2023-06-20',
    annualLeave: 12,
    usedLeave: 2,
  },
  {
    id: 'ST004',
    name: '최지은',
    position: '간호조무사',
    type: '간호조무사',
    status: '재직',
    hireDate: '2024-01-05',
    annualLeave: 11,
    usedLeave: 0,
  },
  {
    id: 'ST005',
    name: '정다혜',
    position: '요양보호사',
    type: '요양보호사',
    status: '재직',
    hireDate: '2023-11-12',
    annualLeave: 12,
    usedLeave: 4,
  },
];

/**
 * [Page] 아가페-케어 통합 근무 일정 관제 시스템 (Agape-Care Control Page)
 * 전사/개인/자동생성/템플릿의 모든 기능을 통합 제어하는 마스터 페이지입니다.
 */
export default function WorkSchedulePage() {
  // A. 핵심 관제 상태
  const [activeTab, setActiveTab] = useState<'management' | 'individual' | 'auto' | 'template'>('management');
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // B. 시스템 초기 데이터 인젝션
  useEffect(() => {
    // 로컬 스토리지에 직원 마스터 데이터가 없을 경우 샘플 주입
    const savedStaff = localStorage.getItem('admin_staff');
    if (!savedStaff) {
      localStorage.setItem('admin_staff', JSON.stringify(SAMPLE_STAFF));
    }
  }, []);

  // C. 탭 메뉴 구성 프로토콜 (직각형 UI 디자인)
  const navigationTabs = [
    { id: 'management' as const, label: '전사 근무 관제', icon: 'ri-layout-grid-fill', desc: 'TOTAL CONTROL' },
    { id: 'individual' as const, label: '개인별 상세 조회', icon: 'ri-user-search-line', desc: 'PERSONAL ANALYSIS' },
    { id: 'auto' as const, label: '지능형 자동 생성', icon: 'ri-magic-line', desc: 'AI OPTIMIZATION' },
    { id: 'template' as const, label: '근무 패턴 라이브러리', icon: 'ri-book-read-line', desc: 'PATTERN MASTER' },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f8fafc] font-sans text-gray-900 antialiased selection:bg-[#5C8D5A] selection:text-white">
      {/* 1. 글로벌 시스템 헤더 (고정 영역) */}
      <header className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-gray-300 bg-white px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center bg-[#5C8D5A] text-white shadow-md">
            <i className="ri-shield-cross-line text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[18px] font-black uppercase italic leading-none tracking-tighter text-gray-900">
              Agape-Care <span className="text-[#5C8D5A]">Schedule Protocol</span>
            </h1>
            <span className="mt-1 text-[9px] font-black uppercase italic tracking-[0.2em] text-gray-400">
              Administrative Control Node v4.2.0
            </span>
          </div>
        </div>

        {/* 시스템 상태 인디케이터 */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse bg-emerald-500"></div>
            <span className="text-[11px] font-black uppercase italic tracking-widest text-gray-500">
              Master Sync Active
            </span>
          </div>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] font-black uppercase italic leading-none text-gray-800">Admin Node</p>
              <p className="mt-1 text-[10px] font-bold text-[#5C8D5A]">Agape_Shiwoo_Min</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border border-gray-200 bg-gray-100">
              <i className="ri-user-settings-line text-gray-400"></i>
            </div>
          </div>
        </div>
      </header>

      {/* 2. 전사 내비게이션 탭 (직각형 고밀도 레이아웃) */}
      <nav className="z-20 flex shrink-0 border-b border-gray-300 bg-white px-8">
        {navigationTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'group relative flex min-w-[200px] flex-col items-center justify-center border-r border-gray-100 py-4 transition-all last:border-r-0',
              activeTab === tab.id
                ? 'bg-gray-50 text-[#5C8D5A]'
                : 'text-gray-400 hover:bg-gray-50/50 hover:text-gray-600',
            )}
          >
            <div className="flex items-center gap-3">
              <i className={clsx(tab.icon, 'text-xl', activeTab === tab.id ? 'text-[#5C8D5A]' : 'text-gray-300')}></i>
              <div className="text-left">
                <span className="block text-[13px] font-black tracking-tight">{tab.label}</span>
                <span className="block text-[9px] font-black uppercase italic tracking-widest opacity-50 group-hover:opacity-100">
                  {tab.desc}
                </span>
              </div>
            </div>
            {/* 액티브 하단 강조선 (직각형) */}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 h-1 w-full bg-[#5C8D5A]"></div>}
          </button>
        ))}
      </nav>

      {/* 3. 메인 관제 컨텐츠 영역 (스크롤 제어) */}
      <main className="custom-scrollbar flex-1 overflow-y-auto bg-[#f8fafc] p-8">
        <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto max-w-full duration-500">
          {/* 각 탭별 고밀도 모듈 렌더링 */}
          {activeTab === 'management' && (
            <div className="space-y-6">
              <ControlTab />
            </div>
          )}

          {activeTab === 'individual' && (
            <div className="space-y-6">
              <IndividualTab />
            </div>
          )}

          {activeTab === 'auto' && (
            <div className="space-y-6">
              <AutoSchedulePanel />
            </div>
          )}

          {activeTab === 'template' && (
            <div className="space-y-6">
              <TemplateTab />
            </div>
          )}
        </div>
      </main>

      {/* 4. 시스템 푸터 (상태 바) */}
      <footer className="z-30 flex h-10 shrink-0 items-center justify-between border-t border-gray-300 bg-white px-8">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase italic tracking-[0.1em] text-gray-400">
          <span>© 2026 Agape-Care Operational Protocol</span>
          <span className="h-3 w-[1px] bg-gray-200"></span>
          <span className="text-[#5C8D5A]">Secure Data Node: Local_Master_Sync</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase italic tracking-widest text-gray-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            LATENCY: 12ms
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-cpu-line text-[#5C8D5A]"></i>
            PROCESSOR: AGAPE-AI v4
          </div>
        </div>
      </footer>

      {/* 글로벌 스타일 (스크롤바 및 애니메이션) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 0px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5c8d5a;
        }

        /* 한국어 고딕 폰트 강화 */
        body {
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  );
}
