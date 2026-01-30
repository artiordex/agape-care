'use client';

import type { ScheduledNotification } from './ScheduledNotificationTable';

interface Props {
  notification: ScheduledNotification | null;
  onClose: () => void;
}

export default function ScheduledNotificationDetailModal({ notification, onClose }: Props) {
  if (!notification) return null;

  const getPurposeLabel = (purpose: string) => {
    const labelMap: { [key: string]: string } = {
      notice: '일반 공지',
      urgent: '긴급 알림',
      billing: '청구 안내',
      schedule: '일정 변경',
      health: '건강 정보',
      other: '기타',
    };
    return labelMap[purpose] || purpose;
  };

  const getStatusLabel = (status: string) => {
    const labelMap: { [key: string]: string } = {
      scheduled: '예약됨',
      sending: '발송중',
      completed: '완료',
      failed: '실패',
      cancelled: '취소됨',
    };
    return labelMap[status] || status;
  };

  const getChannelLabel = (channel: string) => {
    const labelMap: { [key: string]: string } = {
      sms: 'SMS/LMS',
      band: 'Band',
      kakao: '카카오톡',
    };
    return labelMap[channel] || channel;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-900">예약 발송 상세</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 내용 */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-4">
            {/* 기본 정보 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">기본 정보</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">캠페인명</span>
                  <span className="font-medium text-gray-900">{notification.campaignName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">발송 목적</span>
                  <span className="font-medium text-gray-900">{getPurposeLabel(notification.purpose)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">채널</span>
                  <span className="font-medium text-gray-900">{getChannelLabel(notification.channel)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">상태</span>
                  <span className="font-medium text-gray-900">{getStatusLabel(notification.status)}</span>
                </div>
              </div>
            </div>

            {/* 수신자 정보 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">수신자 정보</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">예상 수신자</span>
                  <span className="font-medium text-gray-900">{notification.recipientCount}명</span>
                </div>
              </div>
            </div>

            {/* 예약 정보 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">예약 정보</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">예약 일시</span>
                  <span className="font-medium text-gray-900">
                    {notification.scheduledDate} {notification.scheduledTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">작성자</span>
                  <span className="font-medium text-gray-900">{notification.createdBy}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">작성 일시</span>
                  <span className="font-medium text-gray-900">{notification.createdAt}</span>
                </div>
              </div>
            </div>

            {/* 메시지 내용 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">메시지 내용</h3>
              <div className="rounded border border-gray-200 bg-white p-3 text-sm text-gray-700">
                안녕하세요, 케어포나입니다.
                <br />
                <br />
                [예약 메시지 내용이 여기에 표시됩니다]
                <br />
                <br />
                감사합니다.
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
