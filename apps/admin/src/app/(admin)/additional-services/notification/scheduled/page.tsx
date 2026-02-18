/**
 * Description : page.tsx - ?? additional-services/notification/scheduled ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';
import Header from './Header';

// 가상 데이터 인터페이스
interface ScheduledNotification {
  id: number;
  campaignName: string;
  purpose: string;
  channel: string;
  recipientCount: number;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'sending' | 'completed' | 'cancelled' | 'failed';
  createdBy: string;
  createdAt: string;
}

export default function ScheduledNotificationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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
      scheduledDate: '2026-02-20',
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
      status: 'completed',
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
    {
      id: 6,
      campaignName: '정기 소독 안내',
      purpose: 'notice',
      channel: 'talk',
      recipientCount: 120,
      scheduledDate: '2026-03-05',
      scheduledTime: '11:00',
      status: 'scheduled',
      createdBy: '홍매니저',
      createdAt: '2026-02-10 10:00',
    },
  ]);

  const stats = useMemo(() => {
    return {
      total: notifications.length,
      scheduled: notifications.filter(n => n.status === 'scheduled').length,
      completed: notifications.filter(n => n.status === 'completed').length,
      cancelled: notifications.filter(n => n.status === 'cancelled').length,
    };
  }, [notifications]);

  const filteredData = notifications.filter(n => {
    const matchesSearch = n.campaignName.includes(searchTerm) || n.createdBy.includes(searchTerm);
    const matchesChannel = filterChannel === 'all' || n.channel === filterChannel;
    const matchesStatus = filterStatus === 'all' || n.status === filterStatus;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'sending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'cancelled':
        return 'bg-gray-50 text-gray-400 border-gray-200';
      case 'failed':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const getChannelBadge = (channel: string) => {
    switch (channel) {
      case 'sms':
        return (
          <span className="flex items-center gap-1 text-gray-600">
            <i className="ri-message-2-line text-blue-500"></i> SMS
          </span>
        );
      case 'talk':
      case 'kakao':
        return (
          <span className="flex items-center gap-1 text-gray-600">
            <i className="ri-chat-3-line text-yellow-500"></i> 알림톡
          </span>
        );
      case 'band':
        return (
          <span className="flex items-center gap-1 text-gray-600">
            <i className="ri-group-line text-green-500"></i> 밴드
          </span>
        );
      default:
        return channel;
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans text-gray-800 antialiased">
      <Header onRefresh={() => alert('새로고침되었습니다.')} />

      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 pt-1">
        {/* 통계 요약 (기본 헤더 아래에 배치) */}
        <div className="mt-3 flex justify-end rounded-sm border border-gray-200 bg-white p-3 shadow-sm md:items-center">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center border-r border-gray-100 px-4">
              <span className="text-[10px] font-bold uppercase text-gray-400">전체</span>
              <span className="text-lg font-black">{stats.total}</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-100 px-4">
              <span className="text-[10px] font-bold uppercase text-blue-400">예약</span>
              <span className="text-lg font-black text-blue-600">{stats.scheduled}</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-100 px-4">
              <span className="text-[10px] font-bold uppercase text-emerald-400">완료</span>
              <span className="text-lg font-black text-emerald-600">{stats.completed}</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <span className="text-[10px] font-bold uppercase text-gray-300">취소</span>
              <span className="text-lg font-black text-gray-400">{stats.cancelled}</span>
            </div>
          </div>
        </div>

        {/* 2. 필터 섹션 */}
        <div className="flex flex-wrap items-center gap-3 rounded-sm border border-gray-200 bg-white p-3 shadow-sm">
          <div className="flex min-w-[300px] flex-1 items-center gap-2 rounded-sm border border-gray-300 bg-gray-50 px-3 py-1.5">
            <i className="ri-search-line text-gray-400"></i>
            <input
              type="text"
              placeholder="캠페인 이름 또는 작성자 검색..."
              className="flex-1 bg-transparent text-[12px] font-medium outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="min-w-[120px] border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-bold outline-none"
              value={filterChannel}
              onChange={e => setFilterChannel(e.target.value)}
            >
              <option value="all">모든 채널</option>
              <option value="sms">문자(SMS)</option>
              <option value="kakao">알림톡</option>
              <option value="band">네이버 밴드</option>
            </select>

            <select
              className="min-w-[120px] border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-bold outline-none"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="scheduled">예약됨</option>
              <option value="completed">발송완료</option>
              <option value="cancelled">취소됨</option>
            </select>
          </div>

          <button className="ml-auto flex items-center gap-1.5 rounded-sm bg-[#5C8D5A] px-5 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548]">
            <i className="ri-add-line"></i> 새 예약 작성
          </button>
        </div>

        {/* 3. 테이블 섹션 */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-sm border border-gray-300 bg-white shadow-inner">
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-left text-[12px]">
              <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-100 font-black text-gray-600">
                <tr>
                  <th className="w-12 px-4 py-3 text-center">No.</th>
                  <th className="px-4 py-3">채널</th>
                  <th className="px-4 py-3">캠페인 이름</th>
                  <th className="px-4 py-3">수신 인원</th>
                  <th className="px-4 py-3">예정 일시</th>
                  <th className="px-4 py-3 text-center">상태</th>
                  <th className="px-4 py-3">작성자</th>
                  <th className="px-4 py-3 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center text-gray-400">
                      <i className="ri-inbox-line mb-2 block text-4xl opacity-20"></i>
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((n, idx) => (
                    <tr key={n.id} className="transition-colors hover:bg-blue-50/30">
                      <td className="px-4 py-3.5 text-center font-mono text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-3.5 font-bold">{getChannelBadge(n.channel)}</td>
                      <td className="px-4 py-3.5">
                        <div className="text-[13px] font-black text-gray-900">{n.campaignName}</div>
                        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                          {n.purpose} notification
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-600">
                          {n.recipientCount}명
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-700">{n.scheduledDate}</span>
                          <span className="text-[10px] font-black uppercase text-blue-500">{n.scheduledTime} KST</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={clsx(
                            'rounded-full border px-3 py-1 text-[10px] font-black',
                            getStatusStyle(n.status),
                          )}
                        >
                          {n.status === 'scheduled'
                            ? '예약완료'
                            : n.status === 'completed'
                              ? '발급완료'
                              : n.status === 'cancelled'
                                ? '발송취소'
                                : n.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-medium text-gray-500">
                        {n.createdBy}
                        <div className="text-[9px] text-gray-300">{n.createdAt.split(' ')[0]}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex justify-center gap-1">
                          <button
                            className="rounded p-1.5 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                            title="상세보기"
                          >
                            <i className="ri-search-line"></i>
                          </button>
                          {n.status === 'scheduled' && (
                            <button
                              className="rounded p-1.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
                              title="예약취소"
                            >
                              <i className="ri-close-circle-line"></i>
                            </button>
                          )}
                          <button
                            className="rounded p-1.5 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900"
                            title="삭제"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 푸터 */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-[10px] font-bold text-gray-400">
            <div>SYSTEM: ONLINE | DB_STATUS: SYNCED</div>
            <div className="flex gap-4">
              <span>PAGE 1 OF 1</span>
              <span>TOTAL {filteredData.length} RECORDS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
