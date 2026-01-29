'use client';
import { useState } from 'react';

// 4개 기능 컴포넌트
import RepeatWorkTemplate from './RepeatWorkTemplate';
import WeeklyWorkTemplate from './WeeklyWorkTemplate';
import WorkScheduleCalendar from './WorkScheduleCalendar';
import WorkScheduleManagement from './WorkScheduleManagement';

export default function Page() {
  const [tab, setTab] = useState('repeat'); // repeat, weekly, calendar, manage

  return (
    <div className="p-6">
      {/* 탭 버튼 */}
      <div className="mb-6 flex gap-3 border-b pb-3">
        {[
          { id: 'repeat', label: '반복근무 등록' },
          { id: 'weekly', label: '주별근무 등록' },
          { id: 'calendar', label: '근무일정 입력(월간)' },
          { id: 'manage', label: '근무표 관리' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
              tab === t.id ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 탭 렌더링 */}
      {tab === 'repeat' && <RepeatWorkTemplate />}
      {tab === 'weekly' && <WeeklyWorkTemplate />}
      {tab === 'calendar' && <WorkScheduleCalendar />}
      {tab === 'manage' && <WorkScheduleManagement />}
    </div>
  );
}
