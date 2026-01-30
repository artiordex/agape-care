'use client';

import { useState } from 'react';
import NotificationCampaignTable from './NotificationCampaignTable';
import NotificationMonthlyStats from './NotificationMonthlyStats';
import NotificationStatsCards from './NotificationStatsCards';

interface NotificationStats {
  today: {
    total: number;
    success: number;
    failed: number;
    pending: number;
  };
  month: {
    total: number;
    success: number;
    failed: number;
    pending: number;
  };
  channels: {
    sms: number;
    band: number;
    kakao: number;
  };
  scheduled: number;
}

interface Campaign {
  id: string;
  title: string;
  purpose: string;
  channels: string[];
  recipients: number;
  success: number;
  failed: number;
  status: string;
  sentAt: string;
}

export default function NotificationDashboardPage() {
  const [stats] = useState<NotificationStats>({
    today: {
      total: 156,
      success: 142,
      failed: 8,
      pending: 6,
    },
    month: {
      total: 3842,
      success: 3654,
      failed: 124,
      pending: 64,
    },
    channels: {
      sms: 2145,
      band: 892,
      kakao: 805,
    },
    scheduled: 12,
  });

  const [recentCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: '2024년 1월 청구 안내',
      purpose: 'billing',
      channels: ['sms', 'kakao'],
      recipients: 45,
      success: 43,
      failed: 2,
      status: 'done',
      sentAt: '2024-01-15 09:30',
    },
    {
      id: '2',
      title: '설 연휴 운영 안내',
      purpose: 'notice',
      channels: ['sms', 'band'],
      recipients: 120,
      success: 118,
      failed: 2,
      status: 'done',
      sentAt: '2024-01-14 14:20',
    },
    {
      id: '3',
      title: '프로그램 일정 변경 안내',
      purpose: 'schedule',
      channels: ['kakao'],
      recipients: 35,
      success: 0,
      failed: 0,
      status: 'scheduled',
      sentAt: '2024-01-20 10:00',
    },
    {
      id: '4',
      title: '긴급: 김○○ 어르신 상태 알림',
      purpose: 'urgent',
      channels: ['sms'],
      recipients: 2,
      success: 2,
      failed: 0,
      status: 'done',
      sentAt: '2024-01-15 16:45',
    },
  ]);

  const handleNewNotification = () => {
    alert('새 알림 발송 기능 (개발 예정)');
  };

  const handleViewAll = () => {
    alert('전체 캠페인 보기 (개발 예정)');
  };

  const handleViewDetail = (id: string) => {
    alert(`캠페인 상세보기 - ID: ${id}`);
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">알림 대시보드</h1>
            <p className="mt-1 text-sm text-gray-600">SMS, Band, 카카오톡 발송 현황을 한눈에 확인하세요</p>
          </div>
          <button
            onClick={handleNewNotification}
            className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <i className="ri-send-plane-line"></i>
            <span>새 알림 발송</span>
          </button>
        </div>

        {/* 오늘 통계 */}
        <NotificationStatsCards stats={stats.today} scheduled={stats.scheduled} />

        {/* 이번 달 통계 & 채널별 현황 */}
        <NotificationMonthlyStats monthStats={stats.month} channelStats={stats.channels} />

        {/* 최근 캠페인 */}
        <NotificationCampaignTable
          campaigns={recentCampaigns}
          onViewAll={handleViewAll}
          onViewDetail={handleViewDetail}
        />
      </div>
    </div>
  );
}
