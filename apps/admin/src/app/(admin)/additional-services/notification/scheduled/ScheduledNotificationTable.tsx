'use client';

interface ScheduledNotification {
  id: number;
  campaignName: string;
  purpose: string;
  channel: string;
  recipientCount: number;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  createdBy: string;
  createdAt: string;
}

interface Props {
  notifications: ScheduledNotification[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ScheduledNotificationTable({ notifications, onView, onEdit, onCancel, onDelete }: Props) {
  const getPurposeBadge = (purpose: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      notice: { label: '일반 공지', className: 'bg-blue-50 text-blue-700' },
      urgent: { label: '긴급 알림', className: 'bg-red-50 text-red-700' },
      billing: { label: '청구 안내', className: 'bg-purple-50 text-purple-700' },
      schedule: { label: '일정 변경', className: 'bg-orange-50 text-orange-700' },
      health: { label: '건강 정보', className: 'bg-green-50 text-green-700' },
      other: { label: '기타', className: 'bg-gray-50 text-gray-700' },
    };
    return badgeMap[purpose] || { label: purpose, className: 'bg-gray-50 text-gray-700' };
  };

  const getStatusBadge = (status: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      scheduled: { label: '예약됨', className: 'bg-blue-50 text-blue-700' },
      sending: { label: '발송중', className: 'bg-yellow-50 text-yellow-700' },
      completed: { label: '완료', className: 'bg-green-50 text-green-700' },
      failed: { label: '실패', className: 'bg-red-50 text-red-700' },
      cancelled: { label: '취소됨', className: 'bg-gray-50 text-gray-700' },
    };
    return badgeMap[status] || { label: status, className: 'bg-gray-50 text-gray-700' };
  };

  const getChannelIcon = (channel: string) => {
    const iconMap: { [key: string]: string } = {
      sms: 'ri-message-2-line',
      band: 'ri-group-line',
      kakao: 'ri-kakao-talk-line',
    };
    return iconMap[channel] || 'ri-notification-line';
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">번호</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">캠페인명</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">목적</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">채널</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">수신자</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">예약 일시</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">작성자</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-12 text-center">
                <i className="ri-calendar-schedule-line mb-2 block text-4xl text-gray-300"></i>
                <p className="text-sm text-gray-500">예약된 발송이 없습니다</p>
              </td>
            </tr>
          ) : (
            notifications.map((notification, index) => {
              const purposeBadge = getPurposeBadge(notification.purpose);
              const statusBadge = getStatusBadge(notification.status);

              return (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{notification.campaignName}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${purposeBadge.className}`}>
                      {purposeBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <i className={`${getChannelIcon(notification.channel)} text-base text-gray-600`}></i>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{notification.recipientCount}명</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {notification.scheduledDate} {notification.scheduledTime}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusBadge.className}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{notification.createdBy}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onView(notification.id)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        상세
                      </button>
                      {notification.status === 'scheduled' && (
                        <>
                          <button
                            onClick={() => onEdit(notification.id)}
                            className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => onCancel(notification.id)}
                            className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                          >
                            취소
                          </button>
                        </>
                      )}
                      {notification.status === 'cancelled' && (
                        <button
                          onClick={() => onDelete(notification.id)}
                          className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export type { ScheduledNotification };
