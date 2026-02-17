/**
 * Description : useDashboardData.ts - 📌 대시보드 데이터 훅 (Mock → API 전환 준비)
 * Author : Shiwoo Min
 * Date : 2026-02-18
 *
 * [전환 방법] 백엔드 API 구현 후 아래 주석 처리된 API 훅으로 교체:
 *   const { data, isLoading } = api.dashboard.getDashboardWidgets.useQuery(...)
 *   return { data: data?.body?.data, isLoading, refresh: refetch }
 */

'use client';

import { useState, useCallback } from 'react';

// ── 타입 정의 (api-contract DashboardWidgetsSchema 구조와 일치) ──────────────

export interface HealthAlertItem {
  id: string;
  icon: string;
  name: string;
  issue: string;
  value: string;
  time: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface MedicationItem {
  id: string;
  name: string;
  medication: string;
  time: string;
  status: 'PENDING' | 'TAKEN' | 'SKIPPED' | 'REFUSED';
}

export interface MedicationData {
  completed: number;
  scheduled: number;
  missed: number;
  upcoming: MedicationItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  name: string;
  time: string;
  icon: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location: string;
}

export interface DashboardData {
  healthAlerts: HealthAlertItem[];
  medications: MedicationData;
  activities: ActivityItem[];
  schedules: ScheduleItem[];
}

// ── Mock 데이터 ───────────────────────────────────────────────────────────────

const MOCK_HEALTH_ALERTS: HealthAlertItem[] = [
  {
    id: '1',
    icon: 'ri-heart-pulse-line',
    name: '김영희',
    issue: '혈압 상승',
    value: '150/95 mmHg',
    time: '09:00',
    severity: 'HIGH',
  },
  {
    id: '2',
    icon: 'ri-temp-hot-line',
    name: '최민수',
    issue: '체온 상승',
    value: '37.8°C',
    time: '10:30',
    severity: 'MEDIUM',
  },
  {
    id: '3',
    icon: 'ri-droplet-line',
    name: '이철수',
    issue: '혈당 상승',
    value: '180 mg/dL',
    time: '11:00',
    severity: 'HIGH',
  },
];

const MOCK_MEDICATIONS: MedicationData = {
  completed: 25,
  scheduled: 12,
  missed: 0,
  upcoming: [
    { id: '1', name: '김영희', medication: '혈압약', time: '14:00', status: 'PENDING' },
    { id: '2', name: '이철수', medication: '당뇨약', time: '14:00', status: 'PENDING' },
    { id: '3', name: '박순자', medication: '치매약', time: '18:00', status: 'PENDING' },
    { id: '4', name: '최민수', medication: '진통제', time: '18:00', status: 'PENDING' },
  ],
};

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: '입소 등록',
    name: '신규 입소자 홍길동 님 등록 완료',
    time: '08:30',
    icon: 'ri-user-add-line',
  },
  {
    id: '2',
    type: '투약 기록',
    name: '오전 투약 완료 — 총 14명 처리',
    time: '09:15',
    icon: 'ri-capsule-line',
  },
  {
    id: '3',
    type: '직원 출근',
    name: '오전 근무조 22명 출근 확인',
    time: '08:55',
    icon: 'ri-team-line',
  },
  {
    id: '4',
    type: '바이탈 측정',
    name: '김영희 혈압 이상 감지 — 즉각 조치 필요',
    time: '09:00',
    icon: 'ri-heart-pulse-line',
  },
  {
    id: '5',
    type: '공지 작성',
    name: '2월 정기 건강검진 일정 공지 등록',
    time: '10:00',
    icon: 'ri-file-edit-line',
  },
];

const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: '1',
    title: '오전 투약 시간',
    time: '09:00',
    location: '1층 간호실',
  },
  {
    id: '2',
    title: '점심 식사 배식',
    time: '12:00',
    location: '1층 식당',
  },
  {
    id: '3',
    title: '오후 물리치료',
    time: '14:00',
    location: '재활치료실',
  },
  {
    id: '4',
    title: '저녁 투약 시간',
    time: '18:00',
    location: '1층 간호실',
  },
];

const MOCK_DATA: DashboardData = {
  healthAlerts: MOCK_HEALTH_ALERTS,
  medications: MOCK_MEDICATIONS,
  activities: MOCK_ACTIVITIES,
  schedules: MOCK_SCHEDULES,
};

// ── 훅 ───────────────────────────────────────────────────────────────────────

/**
 * 대시보드 데이터 훅
 * - 현재: Mock 데이터 반환
 * - 추후: api.dashboard.getDashboardWidgets.useQuery() 로 교체
 */
export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DashboardData>(MOCK_DATA);

  /**
   * 데이터 새로고침 (현재는 Mock 재로딩 시뮬레이션)
   * 추후 API 연결 시: refetch() 호출로 교체
   */
  const refresh = useCallback(() => {
    setIsLoading(true);
    // Mock: 800ms 후 데이터 복원 (실제 API 호출 시뮬레이션)
    setTimeout(() => {
      setData({ ...MOCK_DATA });
      setIsLoading(false);
    }, 800);
  }, []);

  return { data, isLoading, refresh };
}
