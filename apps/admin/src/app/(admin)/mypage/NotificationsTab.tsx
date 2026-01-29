import { useState } from 'react';

interface Notification {
  id: string;
  type: 'notice' | 'system' | 'urgent' | 'info';
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export default function NotificationsTab() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      title: '긴급 공지: 시스템 점검 안내',
      content: '2026년 1월 25일 02:00~04:00 시스템 점검이 예정되어 있습니다.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: false
    },
    {
      id: '2',
      type: 'notice',
      title: '월간 회의 일정 안내',
      content: '2026년 1월 30일 14:00 월간 정기 회의가 예정되어 있습니다.',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      isRead: false
    },
    {
      id: '3',
      type: 'system',
      title: '비밀번호 변경 권장',
      content: '마지막 비밀번호 변경 후 90일이 경과했습니다. 보안을 위해 비밀번호를 변경해주세요.',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: '새로운 기능 업데이트',
      content: '운영관리 메뉴에 새로운 기능이 추가되었습니다.',
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      isRead: true
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return 'ri-alarm-warning-line';
      case 'notice': return 'ri-notification-3-line';
      case 'system': return 'ri-settings-3-line';
      case 'info': return 'ri-information-line';
      default: return 'ri-notification-line';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'notice': return 'bg-blue-100 text-blue-700';
      case 'system': return 'bg-yellow-100 text-yellow-700';
      case 'info': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'urgent': return '긴급';
      case 'notice': return '공지';
      case 'system': return '시스템';
      case 'info': return '안내';
      default: return '알림';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'important') return notification.type === 'urgent' || notification.type === 'notice';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    if (confirm('이 알림을 삭제하시겠습니까?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 알림</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{notifications.length}개</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-notification-3-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">읽지 않음</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{unreadCount}개</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-mail-unread-line text-2xl text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">중요 알림</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {notifications.filter(n => n.type === 'urgent' || n.type === 'notice').length}개
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-star-line text-2xl text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 및 액션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'unread'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              미확인
            </button>
            <button
              onClick={() => setFilter('important')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'important'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              중요
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-check-double-line mr-1"></i>
              모두 읽음 처리
            </button>
          )}
        </div>
      </div>

      {/* 알림 목록 */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <i className="ri-notification-off-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">
              {filter === 'unread' ? '읽지 않은 알림이 없습니다.' : 
               filter === 'important' ? '중요 알림이 없습니다.' : 
               '알림이 없습니다.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border transition-all ${
                notification.isRead
                  ? 'border-gray-200'
                  : 'border-emerald-200 shadow-md'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                      <i className={`${getTypeIcon(notification.type)} text-xl`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(notification.type)}`}>
                          {getTypeLabel(notification.type)}
                        </span>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </div>
                      <h4 className={`font-semibold mb-1 ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.timestamp).toLocaleString('ko-KR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="읽음 처리"
                      >
                        <i className="ri-check-line text-gray-600"></i>
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="삭제"
                    >
                      <i className="ri-delete-bin-line text-red-600"></i>
                    </button>
                  </div>
                </div>

                {notification.link && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <a
                      href={notification.link}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
                    >
                      자세히 보기
                      <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
