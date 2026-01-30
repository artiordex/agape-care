'use client';

import { useState } from 'react';
import ScheduledNotificationFilters from './ScheduledNotificationFilters';
import ScheduledNotificationStats from './ScheduledNotificationStats';
import ScheduledNotificationTable, { type ScheduledNotification } from './ScheduledNotificationTable';
import ScheduledNotificationDetailModal from './ScheduledNotificationDetailModal';

export default function ScheduledNotificationPage() {
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState('');
  const [channelFilter, setChannelFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 모달 상태
  const [selectedNotification, setSelectedNotification] = useState<ScheduledNotification | null>(null);

  // 샘플 데이터
  const [notifications] = useState<ScheduledNotification[]>([
    {
      id: 1,
      campaignName: '2월 청구 안내',
      purpose: 'billing',
      channel: 'sms',
      recipientCount: 45,
      scheduledDate: '2026-02-01',
      scheduledTime: '09:00',
      status: 'scheduled',
      createdBy: '김관리',
      createdAt: '2026-01-25 14:30',
    },
    {
      id: 2,
      campaignName: '건강검진 일정 변경 안내',
      purpose: 'schedule',
      channel: 'band',
      recipientCount: 38,
      scheduledDate: '2026-01-31',
      scheduledTime: '10:00',
      status: 'scheduled',
      createdBy: '이간호사',
      createdAt: '2026-01-24 16:20',
    },
    {
      id: 3,
      campaignName: '설날 행사 안내',
      purpose: 'notice',
      channel: 'kakao',
      recipientCount: 52,
      scheduledDate: '2026-01-30',
      scheduledTime: '15:00',
      status: 'sending',
      createdBy: '박직원',
      createdAt: '2026-01-20 11:15',
    },
    {
      id: 4,
      campaignName: '긴급 공지',
      purpose: 'urgent',
      channel: 'sms',
      recipientCount: 60,
      scheduledDate: '2026-01-29',
      scheduledTime: '14:00',
      status: 'completed',
      createdBy: '최관리자',
      createdAt: '2026-01-28 10:00',
    },
    {
      id: 5,
      campaignName: '1월 급여 안내',
      purpose: 'billing',
      channel: 'sms',
      recipientCount: 25,
      scheduledDate: '2026-01-28',
      scheduledTime: '09:30',
      status: 'cancelled',
      createdBy: '김관리',
      createdAt: '2026-01-22 13:45',
    },
  ]);

  // 통계 계산
  const totalScheduled = notifications.filter(n => n.status === 'scheduled').length;
  const todayScheduled = notifications.filter(n => n.status === 'scheduled' && n.scheduledDate === '2026-01-30').length;
  const thisWeekScheduled = notifications.filter(
    n => n.status === 'scheduled' && n.scheduledDate >= '2026-01-27' && n.scheduledDate <= '2026-02-02',
  ).length;
  const cancelledCount = notifications.filter(n => n.status === 'cancelled').length;

  // 핸들러
  const handleView = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      setSelectedNotification(notification);
    }
  };

  const handleEdit = (id: number) => {
    alert(`예약 발송 ${id}번 수정`);
    // TODO: 수정 페이지로 이동 또는 모달 열기
  };

  const handleCancel = (id: number) => {
    if (confirm('예약을 취소하시겠습니까?')) {
      alert(`예약 발송 ${id}번 취소됨`);
      // TODO: API 호출
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('삭제하시겠습니까?')) {
      alert(`예약 발송 ${id}번 삭제됨`);
      // TODO: API 호출
    }
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">예약 발송 관리</h1>
            <p className="mt-1 text-sm text-gray-600">예약된 알림 발송을 관리하세요</p>
          </div>
          <button className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            <i className="ri-add-line"></i>
            <span>새 예약 작성</span>
          </button>
        </div>

        {/* 통계 카드 */}
        <ScheduledNotificationStats
          totalScheduled={totalScheduled}
          todayScheduled={todayScheduled}
          thisWeekScheduled={thisWeekScheduled}
          cancelledCount={cancelledCount}
        />

        {/* 필터 */}
        <ScheduledNotificationFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          channelFilter={channelFilter}
          onChannelChange={setChannelFilter}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          searchKeyword={searchKeyword}
          onSearchChange={setSearchKeyword}
        />

        {/* 테이블 */}
        <ScheduledNotificationTable
          notifications={notifications}
          onView={handleView}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </div>

      {/* 상세보기 모달 */}
      <ScheduledNotificationDetailModal notification={selectedNotification} onClose={handleCloseModal} />
    </div>
  );
}
