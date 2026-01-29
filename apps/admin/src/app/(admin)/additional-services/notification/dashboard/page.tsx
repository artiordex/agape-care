'use client';

import { useState } from 'react';

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

const NotificationDashboard: React.FC = () => {
  // 통계 데이터 (실제로는 API에서 가져옴)
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

  // 최근 캠페인 (실제로는 API에서 가져옴)
  const [recentCampaigns] = useState([
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

  // 채널별 성공률
  const getChannelSuccessRate = (channel: keyof typeof stats.channels) => {
    const total = stats.channels[channel];
    const successRate = ((total / stats.month.total) * 100).toFixed(1);
    return successRate;
  };

  // 전체 성공률
  const overallSuccessRate = ((stats.month.success / stats.month.total) * 100).toFixed(1);

  // 목적별 라벨
  const getPurposeLabel = (purpose: string) => {
    const labels: { [key: string]: string } = {
      notice: '공지',
      urgent: '긴급',
      billing: '청구',
      payroll: '급여',
      schedule: '일정',
      other: '기타',
    };
    return labels[purpose] || purpose;
  };

  // 목적별 색상
  const getPurposeColor = (purpose: string) => {
    const colors: { [key: string]: string } = {
      notice: 'bg-blue-100 text-blue-700',
      urgent: 'bg-red-100 text-red-700',
      billing: 'bg-purple-100 text-purple-700',
      payroll: 'bg-green-100 text-green-700',
      schedule: 'bg-orange-100 text-orange-700',
      other: 'bg-gray-100 text-gray-700',
    };
    return colors[purpose] || colors.other;
  };

  // 상태별 라벨
  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      draft: '작성중',
      scheduled: '예약됨',
      sending: '발송중',
      done: '완료',
      failed: '실패',
      canceled: '취소됨',
    };
    return labels[status] || status;
  };

  // 상태별 색상
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-gray-100 text-gray-700',
      scheduled: 'bg-blue-100 text-blue-700',
      sending: 'bg-yellow-100 text-yellow-700',
      done: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
      canceled: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || colors.draft;
  };

  // 채널 아이콘
  const getChannelIcon = (channel: string) => {
    const icons: { [key: string]: string } = {
      sms: 'ri-message-2-line',
      band: 'ri-group-line',
      kakao: 'ri-kakao-talk-line',
    };
    return icons[channel] || 'ri-notification-line';
  };

  return (
    <div className="space-y-6 p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">알림 대시보드</h1>
          <p className="mt-1 text-sm text-gray-500">SMS, Band, 카카오톡 발송 현황을 한눈에 확인하세요</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
        >
          <i className="ri-send-plane-line"></i>
          <span>새 알림 발송</span>
        </button>
      </div>

      {/* 오늘 통계 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">오늘 발송</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <i className="ri-send-plane-line text-xl text-blue-600"></i>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.today.total}</div>
          <div className="mt-1 text-xs text-gray-500">전체 발송 건수</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">성공</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <i className="ri-checkbox-circle-line text-xl text-green-600"></i>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600">{stats.today.success}</div>
          <div className="mt-1 text-xs text-gray-500">
            성공률 {((stats.today.success / stats.today.total) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">실패</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <i className="ri-close-circle-line text-xl text-red-600"></i>
            </div>
          </div>
          <div className="text-3xl font-bold text-red-600">{stats.today.failed}</div>
          <div className="mt-1 text-xs text-gray-500">
            실패율 {((stats.today.failed / stats.today.total) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">예약</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <i className="ri-calendar-schedule-line text-xl text-orange-600"></i>
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-600">{stats.scheduled}</div>
          <div className="mt-1 text-xs text-gray-500">예약 대기중</div>
        </div>
      </div>

      {/* 이번 달 통계 & 채널별 현황 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 이번 달 통계 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">이번 달 발송 현황</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">전체 발송</span>
              <span className="text-lg font-bold text-gray-900">{stats.month.total.toLocaleString()}건</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">성공</span>
              <span className="text-lg font-bold text-green-600">{stats.month.success.toLocaleString()}건</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">실패</span>
              <span className="text-lg font-bold text-red-600">{stats.month.failed.toLocaleString()}건</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">대기중</span>
              <span className="text-lg font-bold text-orange-600">{stats.month.pending.toLocaleString()}건</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">전체 성공률</span>
                <span className="text-2xl font-bold text-emerald-600">{overallSuccessRate}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${overallSuccessRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 채널별 현황 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">채널별 발송 현황</h2>
          <div className="space-y-4">
            {/* SMS */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <i className="ri-message-2-line text-blue-600"></i>
                  </div>
                  <span className="font-medium text-gray-900">SMS/LMS/MMS</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{stats.channels.sms.toLocaleString()}건</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${getChannelSuccessRate('sms')}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">전체의 {getChannelSuccessRate('sms')}%</div>
            </div>

            {/* Band */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                    <i className="ri-group-line text-purple-600"></i>
                  </div>
                  <span className="font-medium text-gray-900">Band</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{stats.channels.band.toLocaleString()}건</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-500"
                  style={{ width: `${getChannelSuccessRate('band')}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">전체의 {getChannelSuccessRate('band')}%</div>
            </div>

            {/* 카카오톡 */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                    <i className="ri-kakao-talk-line text-yellow-600"></i>
                  </div>
                  <span className="font-medium text-gray-900">카카오톡</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{stats.channels.kakao.toLocaleString()}건</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-yellow-600 transition-all duration-500"
                  style={{ width: `${getChannelSuccessRate('kakao')}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">전체의 {getChannelSuccessRate('kakao')}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 캠페인 */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">최근 캠페인</h2>
            <button type="button" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              전체 보기 →
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  캠페인명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">목적</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">채널</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  수신자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  성공/실패
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  발송일시
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentCampaigns.map(campaign => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPurposeColor(campaign.purpose)}`}>
                      {getPurposeLabel(campaign.purpose)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-1">
                      {campaign.channels.map(channel => (
                        <div
                          key={channel}
                          className="flex h-6 w-6 items-center justify-center rounded bg-gray-100"
                          title={channel}
                        >
                          <i className={`${getChannelIcon(channel)} text-sm text-gray-600`}></i>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{campaign.recipients}명</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm">
                      <span className="font-medium text-green-600">{campaign.success}</span>
                      <span className="mx-1 text-gray-400">/</span>
                      <span className="font-medium text-red-600">{campaign.failed}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusLabel(campaign.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{campaign.sentAt}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button type="button" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationDashboard;
