'use client';

import React, { useState, useEffect } from 'react';
import StaffSelectionList from './StaffSelectionList';
import IndividualCalendar from './IndividualCalendar';

// 샘플 데이터 임포트
const SAMPLE_STAFF = [
  {
    id: 'ST001',
    name: '김철수',
    position: '선임요양보호사',
    type: '요양보호사',
    hireDate: '2023-01-15',
    annualLeave: 15,
    usedLeave: 3,
    status: '재직',
  },
  {
    id: 'ST002',
    name: '이영희',
    position: '요양보호사',
    type: '요양보호사',
    hireDate: '2023-03-10',
    annualLeave: 15,
    usedLeave: 5,
    status: '재직',
  },
  {
    id: 'ST003',
    name: '박민수',
    position: '사회복지사',
    type: '사회복지사',
    hireDate: '2023-06-20',
    annualLeave: 12,
    usedLeave: 2,
    status: '재직',
  },
  {
    id: 'ST004',
    name: '최지은',
    position: '간호조무사',
    type: '간호조무사',
    hireDate: '2024-01-05',
    annualLeave: 11,
    usedLeave: 0,
    status: '재직',
  },
  {
    id: 'ST005',
    name: '정다혜',
    position: '요양보호사',
    type: '요양보호사',
    hireDate: '2023-11-12',
    annualLeave: 12,
    usedLeave: 4,
    status: '재직',
  },
];

/**
 * [Component] 개인별 상세 달력 통합 탭
 * 좌측 인력 리스트와 우측 상세 달력의 상호작용을 제어합니다.
 */
export default function IndividualTab() {
  const [selectedStaffId, setSelectedStaffId] = useState<string>(SAMPLE_STAFF[0].id);
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const selectedStaff = SAMPLE_STAFF.find(s => s.id === selectedStaffId) || SAMPLE_STAFF[0];

  return (
    <div className="animate-in fade-in grid grid-cols-1 gap-8 font-sans text-gray-900 antialiased duration-300 lg:grid-cols-4">
      {/* 1. 좌측 인력 선별 리스트 노드 */}
      <div className="lg:col-span-1">
        <StaffSelectionList staffList={SAMPLE_STAFF} selectedId={selectedStaffId} onSelect={setSelectedStaffId} />
      </div>

      {/* 2. 우측 상세 근무 달력 및 통계 노드 */}
      <div className="space-y-6 lg:col-span-3">
        <IndividualCalendar staff={selectedStaff} month={selectedMonth} onMonthChange={setSelectedMonth} />
      </div>
    </div>
  );
}
