'use client';

import React from 'react';
import clsx from 'clsx';

// 기존 탭 임포트
import BasicInfoTab from './tabs/BasicInfoTab';
import WorkScheduleTab from './tabs/WorkScheduleTab';
import AttendanceTab from './tabs/AttendanceTab';
import SalaryTab from './tabs/SalaryTab';
import CertificateTab from './tabs/CertificateTab';
import ManagementTab from './tabs/ManagementTab';

interface Props {
  readonly activeTab: string;
  readonly onTabChange: (tab: string) => void;
  readonly staff: any;
}

export default function StaffTabs({ activeTab, onTabChange, staff }: Props) {
  const tabs = [
    { id: 'basic', label: '기초정보', icon: 'ri-information-line' },
    { id: 'schedule', label: '근무현황', icon: 'ri-calendar-line' },
    { id: 'attendance', label: '출퇴근신고', icon: 'ri-time-line' },
    { id: 'salary', label: '급여대장', icon: 'ri-money-dollar-circle-line' },
    { id: 'certificate', label: '자격/면허', icon: 'ri-award-line' },
    { id: 'management', label: '인사서류', icon: 'ri-file-text-line' },
  ];

  return (
    <div className="flex h-full flex-col font-sans antialiased">
      {/* 1. 상단 탭: 컴팩트한 크기 + 둥근 사각형(rounded-t-xl) */}
      <div className="flex items-end gap-1.5 border-b-2 border-[#5C8D5A] bg-[#f1f5f9] px-4 pt-3">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                // 상단은 확실히 둥글게, 크기는 작게
                'relative flex items-center justify-center gap-1 rounded-t-md px-4 py-2 text-[11px] font-bold transition-all',
                isActive
                  ? 'z-10 -mb-[2px] border-x-2 border-t-2 border-[#5C8D5A] bg-white text-[#5C8D5A]'
                  : 'bg-[#5C8D5A] text-white hover:bg-[#4A7548]',
              )}
            >
              <i className={clsx(tab.icon, 'text-sm')}></i>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. 컨텐츠 영역 */}
      <div className="flex-1 overflow-y-auto bg-white p-5 shadow-inner">
        <div className="mx-auto max-w-full">
          {activeTab === 'basic' && <BasicInfoTab staff={staff} />}
          {activeTab === 'schedule' && <WorkScheduleTab staff={staff} />}
          {activeTab === 'attendance' && <AttendanceTab staff={staff} />}
          {activeTab === 'salary' && <SalaryTab staff={staff} />}
          {activeTab === 'certificate' && <CertificateTab staff={staff} />}
          {activeTab === 'management' && <ManagementTab staff={staff} />}
        </div>
      </div>

      {/* 3. 하단 시스템 액션 바: 슬림 + 완전 직각(rounded-none) */}
      <div className="flex items-center gap-0 border-t border-gray-200 bg-gray-50 p-0">
        <div className="flex h-9 items-center bg-gray-700 px-3 text-[9px] font-black uppercase tracking-tighter text-gray-300">
          Admin
        </div>

        <div className="flex flex-1 items-center">
          <ActionButton label="직원 복사" icon="ri-file-copy-2-line" />
          <ActionButton label="정보동의서" icon="ri-shield-check-line" />
          <ActionButton label="근로계약서" icon="ri-quill-pen-line" />
          <ActionButton label="정보 대장" icon="ri-printer-line" />
          <ActionButton label="경력증명서" icon="ri-award-fill" isPrimary />
        </div>
      </div>
    </div>
  );
}

/** [Sub] 하단 전용 슬림 직각형 액션 버튼 */
function ActionButton({ label, icon, isPrimary }: { label: string; icon: string; isPrimary?: boolean }) {
  return (
    <button
      className={clsx(
        // 완전 직각(rounded-none), 경계선 포함
        'flex h-9 flex-1 items-center justify-center gap-1.5 rounded-none border-r border-gray-200 px-3 text-[10px] font-bold transition-all',
        isPrimary ? 'bg-[#5C8D5A] text-white hover:bg-[#4A7548]' : 'bg-white text-gray-600 hover:bg-gray-100',
      )}
    >
      <i className={clsx(icon, 'text-xs')}></i>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
