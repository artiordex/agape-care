'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface Notification {
  id: string;
  type: 'notice' | 'system' | 'urgent' | 'info';
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

/**
 * [Component] 개인 및 시스템 통합 알림 관제 탭
 * 아가페 그린(#5C8D5A) 테마 및 직각형 고밀도 피드 적용
 */
export default function NotificationsTab() {
  // 1. 상태 관리 및 샘플 데이터
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      title: '긴급 공지: 시스템 보안 점검 안내',
      content: '2026년 2월 01일 01:00~03:00 서버 최적화 및 보안 패치가 예정되어 있습니다.',
      timestamp: '2026-01-30T14:00:00Z',
      isRead: false,
    },
    {
      id: '2',
      type: 'notice',
      title: '2월분 급여 명세서 업데이트 완료',
      content: '개인별 급여 탭에서 상세 내역을 확인하고 서명해 주시기 바랍니다.',
      timestamp: '2026-01-29T10:30:00Z',
      isRead: false,
    },
    {
      id: '3',
      type: 'system',
      title: '비밀번호 변경 주기 알림',
      content: '보안 정책에 따라 비밀번호 변경 후 90일이 경과했습니다.',
      timestamp: '2026-01-25T09:00:00Z',
      isRead: true,
    },
  ]);

  // 2. 유형별 스타일 프로토콜
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return {
          icon: 'ri-alarm-warning-line',
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-100',
          label: '긴급',
        };
      case 'notice':
        return {
          icon: 'ri-notification-3-line',
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-100',
          label: '공지',
        };
      case 'system':
        return {
          icon: 'ri-settings-3-line',
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          border: 'border-orange-100',
          label: '시스템',
        };
      default:
        return {
          icon: 'ri-information-line',
          color: 'text-[#5C8D5A]',
          bg: 'bg-emerald-50',
          border: 'border-emerald-100',
          label: '안내',
        };
    }
  };

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'important') return n.type === 'urgent' || n.type === 'notice';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6 font-sans antialiased">
      {/* A. 알림 현황 요약 통계 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Total Feed" value={notifications.length} unit="개" icon="ri-mail-line" color="text-gray-700" />
        <StatCard label="Unread Inbox" value={unreadCount} unit="개" icon="ri-mail-unread-line" color="text-red-600" />
        <StatCard
          label="Critical News"
          value={notifications.filter(n => n.type === 'urgent').length}
          unit="건"
          icon="ri-error-warning-line"
          color="text-[#5C8D5A]"
        />
      </div>

      {/* B. 관제 필터 및 전역 액션 바 */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-none border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
        <div className="flex w-full gap-1 sm:w-auto">
          <FilterBtn label="전체 내역" active={filter === 'all'} onClick={() => setFilter('all')} />
          <FilterBtn
            label="미확인"
            active={filter === 'unread'}
            onClick={() => setFilter('unread')}
            count={unreadCount}
          />
          <FilterBtn label="중요 공지" active={filter === 'important'} onClick={() => setFilter('important')} />
        </div>

        {unreadCount > 0 && (
          <button
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
            className="flex items-center gap-2 rounded-none border border-[#5C8D5A] bg-white px-4 py-2 text-[11px] font-black uppercase text-[#5C8D5A] shadow-sm transition-all hover:bg-emerald-50"
          >
            <i className="ri-check-double-line"></i> Mark All as Read
          </button>
        )}
      </div>

      {/* C. 고밀도 알림 피드 */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-none border border-dashed border-gray-300 bg-white p-16 text-center">
            <i className="ri-notification-off-line mb-3 block text-5xl text-gray-200"></i>
            <p className="text-[12px] font-black uppercase tracking-widest text-gray-400">
              No matching notifications in node
            </p>
          </div>
        ) : (
          filtered.map(item => {
            const style = getTypeStyle(item.type);
            return (
              <div
                key={item.id}
                className={clsx(
                  'group relative flex flex-col gap-5 rounded-none border bg-white p-5 transition-all hover:shadow-md lg:flex-row lg:items-center',
                  item.isRead ? 'border-gray-100 opacity-80' : 'border-[#5C8D5A] shadow-sm shadow-emerald-50',
                )}
              >
                {/* 유형 아이콘 영역 */}
                <div
                  className={clsx(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-none border shadow-inner',
                    style.bg,
                    style.border,
                  )}
                >
                  <i className={clsx(style.icon, 'text-2xl', style.color)}></i>
                </div>

                {/* 본문 명세 영역 */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={clsx(
                        'rounded-none border px-2 py-0.5 text-[9px] font-black uppercase',
                        style.bg,
                        style.color,
                        style.border,
                      )}
                    >
                      {style.label}
                    </span>
                    {!item.isRead && <span className="h-1.5 w-1.5 animate-pulse rounded-none bg-red-600"></span>}
                    <span className="font-mono text-[11px] font-bold italic text-gray-300">
                      {new Date(item.timestamp).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <h4
                    className={clsx(
                      'text-[14px] font-black tracking-tight transition-colors',
                      item.isRead ? 'text-gray-500' : 'text-gray-900 group-hover:text-[#5C8D5A]',
                    )}
                  >
                    {item.title}
                  </h4>
                  <p className="max-w-4xl text-[12px] font-medium leading-relaxed text-gray-500">{item.content}</p>
                </div>

                {/* 개별 액션 버튼 */}
                <div className="flex items-center gap-2 lg:border-l lg:border-gray-100 lg:pl-5">
                  {!item.isRead && (
                    <button
                      onClick={() =>
                        setNotifications(prev => prev.map(n => (n.id === item.id ? { ...n, isRead: true } : n)))
                      }
                      className="rounded-none p-2 text-gray-400 transition-all hover:bg-emerald-50 hover:text-[#5C8D5A]"
                    >
                      <i className="ri-check-line text-xl"></i>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm('삭제하시겠습니까?')) setNotifications(prev => prev.filter(n => n.id !== item.id));
                    }}
                    className="rounded-none p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                  >
                    <i className="ri-delete-bin-7-line text-xl"></i>
                  </button>
                </div>

                {/* 하단 관제 바 */}
                {!item.isRead && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#5C8D5A]"></div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/** [Sub] 통계 카드 */
function StatCard({ label, value, unit, icon, color }: any) {
  return (
    <div className="group rounded-none border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#5C8D5A]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className={clsx('font-mono text-2xl font-black tracking-tighter', color)}>{value}</span>
            <span className="text-[11px] font-bold uppercase text-gray-300">{unit}</span>
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-none border border-gray-100 bg-gray-50 transition-all group-hover:bg-[#5C8D5A] group-hover:text-white">
          <i className={clsx(icon, 'text-2xl group-hover:text-white', color)}></i>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 필터 버튼 */
function FilterBtn({ label, active, onClick, count }: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-none border-t-2 px-5 py-2 text-[11px] font-black uppercase tracking-tighter transition-all',
        active
          ? 'border-[#5C8D5A] bg-white text-[#5C8D5A] shadow-sm'
          : 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100',
      )}
    >
      {label} {count !== undefined && <span className="ml-1 font-mono text-[9px]">({count})</span>}
    </button>
  );
}
