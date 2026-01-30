'use client';

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

interface Props {
  campaigns: Campaign[];
  onViewAll: () => void;
  onViewDetail: (id: string) => void;
}

export default function NotificationCampaignTable({ campaigns, onViewAll, onViewDetail }: Props) {
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

  const getPurposeColor = (purpose: string) => {
    const colors: { [key: string]: string } = {
      notice: 'bg-blue-50 text-blue-700',
      urgent: 'bg-red-50 text-red-700',
      billing: 'bg-purple-50 text-purple-700',
      payroll: 'bg-green-50 text-green-700',
      schedule: 'bg-orange-50 text-orange-700',
      other: 'bg-gray-100 text-gray-700',
    };
    return colors[purpose] || colors.other;
  };

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

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-gray-100 text-gray-700',
      scheduled: 'bg-blue-50 text-blue-700',
      sending: 'bg-yellow-50 text-yellow-700',
      done: 'bg-green-50 text-green-700',
      failed: 'bg-red-50 text-red-700',
      canceled: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || colors.draft;
  };

  const getChannelIcon = (channel: string) => {
    const icons: { [key: string]: string } = {
      sms: 'ri-message-2-line',
      band: 'ri-group-line',
      kakao: 'ri-kakao-talk-line',
    };
    return icons[channel] || 'ri-notification-line';
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">최근 캠페인</h2>
          <button
            onClick={onViewAll}
            className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            전체 보기 →
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">캠페인명</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">목적</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">채널</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">수신자</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">성공/실패</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">발송일시</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <i className="ri-file-list-line mb-2 block text-4xl text-gray-300"></i>
                  <p className="text-sm text-gray-500">캠페인이 없습니다.</p>
                </td>
              </tr>
            ) : (
              campaigns.map(campaign => (
                <tr key={campaign.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${getPurposeColor(campaign.purpose)}`}>
                      {getPurposeLabel(campaign.purpose)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {campaign.channels.map(channel => (
                        <div
                          key={channel}
                          className="flex h-6 w-6 items-center justify-center rounded bg-gray-100"
                          title={channel}
                        >
                          <i className={`${getChannelIcon(channel)} text-xs text-gray-600`}></i>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{campaign.recipients}명</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <span className="font-medium text-green-600">{campaign.success}</span>
                      <span className="mx-1 text-gray-400">/</span>
                      <span className="font-medium text-red-600">{campaign.failed}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusLabel(campaign.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{campaign.sentAt}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onViewDetail(campaign.id)}
                      className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
