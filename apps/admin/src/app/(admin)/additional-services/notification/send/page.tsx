/**
 * Description : page.tsx - ?? additional-services/notification/send ??? UI ????
 */

'use client';

import type { RecipientGroup, RecipientGroupType } from '@agape-care/api-contract';
import { api } from '@/lib/api';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import Header from './Header';

type RecipientTab = 'all' | RecipientGroupType;

const tabs: { id: RecipientTab; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'GUARDIAN', label: '보호자' },
  { id: 'RESIDENT', label: '어르신' },
  { id: 'STAFF', label: '직원' },
  { id: 'MIXED', label: '혼합' },
];

const channels = [
  { value: 'sms', label: 'SMS/LMS', icon: 'ri-message-2-line' },
  { value: 'band', label: 'Band', icon: 'ri-group-line' },
  { value: 'kakao', label: '카카오 알림톡', icon: 'ri-kakao-talk-line' },
];

const purposes = [
  { value: 'notice', label: '일반 공지', icon: 'ri-notification-line' },
  { value: 'urgent', label: '긴급 알림', icon: 'ri-alarm-warning-line' },
  { value: 'billing', label: '청구 안내', icon: 'ri-file-list-line' },
  { value: 'schedule', label: '일정 변경', icon: 'ri-calendar-line' },
  { value: 'health', label: '건강 정보', icon: 'ri-heart-pulse-line' },
  { value: 'other', label: '기타', icon: 'ri-more-line' },
];

const typeLabel: Record<RecipientGroupType, string> = {
  GUARDIAN: '보호자',
  RESIDENT: '어르신',
  STAFF: '직원',
  MIXED: '혼합',
};

export default function NotificationSendPage() {
  const [purpose, setPurpose] = useState('notice');
  const [recipientType, setRecipientType] = useState<RecipientTab>('GUARDIAN');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedList, setSelectedList] = useState<RecipientGroup[]>([]);

  const [selectedChannels, setSelectedChannels] = useState<string[]>(['sms']);
  const [activeChannel, setActiveChannel] = useState('sms');

  const [smsMessage, setSmsMessage] = useState('');
  const [bandTitle, setBandTitle] = useState('');
  const [bandMessage, setBandMessage] = useState('');
  const [kakaoTemplate, setKakaoTemplate] = useState('');
  const [kakaoMessage, setKakaoMessage] = useState('');

  const [sendType, setSendType] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const { data, isLoading, refetch } = api.notification.getRecipientGroups.useQuery(
    ['notificationSendRecipientGroups', recipientType, searchKeyword],
    {
      query: {
        page: 1,
        limit: 100,
        type: recipientType === 'all' ? undefined : recipientType,
        status: 'ACTIVE',
        search: searchKeyword || undefined,
      },
    },
  );

  const recipients = useMemo(() => {
    if (data?.status !== 200) return [];
    return data.body.data;
  }, [data]);

  const toggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      if (selectedChannels.length > 1) {
        const next = selectedChannels.filter(c => c !== channelId);
        setSelectedChannels(next);
        if (activeChannel === channelId) setActiveChannel(next[0]!);
      }
      return;
    }
    setSelectedChannels(prev => [...prev, channelId]);
    setActiveChannel(channelId);
  };

  const handleSelect = (item: RecipientGroup) => {
    if (selectedList.some(i => i.id === item.id)) return;
    setSelectedList(prev => [...prev, item]);
  };

  const handleRemove = (id: number) => {
    setSelectedList(prev => prev.filter(i => i.id !== id));
  };

  const handleSend = () => {
    if (selectedList.length === 0) {
      alert('수신자 그룹을 선택해 주세요.');
      return;
    }
    if (selectedChannels.length === 0) {
      alert('발송 채널을 선택해 주세요.');
      return;
    }

    alert(`[${purposes.find(p => p.value === purpose)?.label}] 알림을 ${selectedList.length}개 그룹에 발송 처리했습니다.`);
  };

  const sectionHeaderClass =
    'bg-[#E3F2FD] border border-[#B8D1E0] px-3 py-2 text-[13px] font-bold text-[#2E6A9E] flex items-center justify-between';
  const labelClass = 'mb-1 block text-[11px] font-bold text-gray-500';

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans text-gray-800 antialiased">
      <Header onSend={handleSend} />

      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3 pt-4">
        <div className="flex items-center gap-3 overflow-x-auto rounded-sm border border-[#B8D1E0] bg-white p-2 shadow-sm">
          <span className="whitespace-nowrap px-2 text-[12px] font-black text-[#5C8D5A]">발송 목적:</span>
          {purposes.map(p => (
            <button
              key={p.value}
              onClick={() => setPurpose(p.value)}
              className={clsx(
                'flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all',
                purpose === p.value
                  ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white'
                  : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300',
              )}
            >
              <i className={p.icon}></i> {p.label}
            </button>
          ))}
        </div>

        <div className="flex flex-1 gap-3 overflow-hidden lg:flex-row">
          <div className="flex flex-[4] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
            <div className={sectionHeaderClass}>
              <div className="flex items-center gap-1.5">
                <i className="ri-user-search-line"></i>
                <span>수신 대상 조회</span>
              </div>
              <button onClick={() => refetch()} className="text-[11px] text-[#2E6A9E] hover:underline">
                새로고침
              </button>
            </div>

            <div className="flex border-b border-[#B8D1E0] bg-[#E3F2FD]/50">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setRecipientType(tab.id)}
                  className={clsx(
                    'flex-1 border-r border-[#B8D1E0] py-2 text-[12px] font-bold',
                    recipientType === tab.id
                      ? 'border-t-2 border-t-[#2E6A9E] bg-white text-[#2E6A9E]'
                      : 'text-gray-400 hover:bg-gray-50',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 border-b border-[#B8D1E0] bg-gray-50 p-2">
              <input
                type="text"
                placeholder="그룹명 검색"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                className="flex-1 border border-[#B8D1E0] px-2 py-1 text-[11px] outline-none"
              />
              <button onClick={() => refetch()} className="rounded-sm bg-[#8FA1B0] px-3 py-1 text-[11px] font-bold text-white">
                조회
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse text-[11px]">
                <thead className="sticky top-0 z-10 bg-[#E8F1F8] text-left font-bold text-gray-600 shadow-sm">
                  <tr>
                    <th className="w-8 border-b border-[#B8D1E0] p-2">
                      <input type="checkbox" disabled />
                    </th>
                    <th className="border-b border-[#B8D1E0] p-2">유형</th>
                    <th className="border-b border-[#B8D1E0] p-2">그룹명</th>
                    <th className="border-b border-[#B8D1E0] p-2">인원</th>
                    <th className="border-b border-[#B8D1E0] p-2">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-400">
                        데이터를 불러오는 중입니다.
                      </td>
                    </tr>
                  ) : recipients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-400">
                        조회된 수신자 그룹이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    recipients.map(item => (
                      <tr key={item.id} className="cursor-pointer hover:bg-blue-50" onClick={() => handleSelect(item)}>
                        <td className="border-r border-gray-50 p-2 text-center">
                          <input type="checkbox" readOnly checked={selectedList.some(i => i.id === item.id)} />
                        </td>
                        <td className="border-r border-gray-50 p-2 text-gray-500">{typeLabel[item.type]}</td>
                        <td className="border-r border-gray-50 p-2 font-bold">{item.name}</td>
                        <td className="border-r border-gray-50 p-2">{item.memberCount}명</td>
                        <td className="p-2 text-gray-400">{item.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-[2.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
            <div className={sectionHeaderClass}>
              <div className="flex items-center gap-1.5">
                <i className="ri-list-check"></i>
                <span>수신 목록 ({selectedList.length})</span>
              </div>
              <button onClick={() => setSelectedList([])} className="text-[10px] text-red-500 hover:underline">
                비우기
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-gray-50/30 p-2">
              <div className="flex flex-col gap-1">
                {selectedList.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center gap-2 text-gray-300">
                    <i className="ri-user-add-line text-3xl"></i>
                    <span className="text-[11px]">대상을 추가해 주세요.</span>
                  </div>
                ) : (
                  selectedList.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-sm border border-[#B8D1E0] bg-white p-1.5"
                    >
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold">{item.name}</span>
                        <span className="text-[10px] text-gray-400">
                          {typeLabel[item.type]} · {item.memberCount}명
                        </span>
                      </div>
                      <button onClick={() => handleRemove(item.id)} className="text-gray-300 hover:text-red-500">
                        <i className="ri-close-circle-fill text-lg"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-[3.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
            <div className="flex bg-[#8FA1B0] text-[12px] font-bold text-white">
              {channels.map(c => (
                <div
                  key={c.value}
                  className={clsx(
                    'flex flex-1 cursor-pointer items-center transition-all',
                    activeChannel === c.value ? 'bg-white text-[#2E6A9E]' : 'hover:bg-white/10',
                  )}
                  onClick={() => setActiveChannel(c.value)}
                >
                  <label className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5"
                      checked={selectedChannels.includes(c.value)}
                      onChange={() => toggleChannel(c.value)}
                      onClick={e => e.stopPropagation()}
                    />
                    <span className="truncate">{c.label}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {activeChannel === 'sms' && (
                <div className="flex h-full flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className={labelClass}>문자 메시지 내용</span>
                    <span className="text-[10px] font-bold text-gray-400">{smsMessage.length} / 2000 Byte</span>
                  </div>
                  <textarea
                    className="min-h-[250px] w-full flex-1 resize-none border border-[#B8D1E0] p-3 text-[13px] shadow-inner outline-none"
                    placeholder="발송할 문자 메시지를 입력해 주세요."
                    value={smsMessage}
                    onChange={e => setSmsMessage(e.target.value)}
                  />
                </div>
              )}

              {activeChannel === 'band' && (
                <div className="flex h-full flex-col gap-3">
                  <div>
                    <span className={labelClass}>Band 제목</span>
                    <input
                      type="text"
                      className="w-full border border-[#B8D1E0] px-3 py-2 text-[12px] outline-none"
                      placeholder="제목"
                      value={bandTitle}
                      onChange={e => setBandTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>내용</span>
                    <textarea
                      className="min-h-[200px] w-full flex-1 resize-none border border-[#B8D1E0] p-3 text-[13px] shadow-inner outline-none"
                      placeholder="내용"
                      value={bandMessage}
                      onChange={e => setBandMessage(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {activeChannel === 'kakao' && (
                <div className="flex h-full flex-col gap-3">
                  <div>
                    <span className={labelClass}>알림톡 템플릿</span>
                    <select
                      className="w-full border border-[#B8D1E0] bg-white px-3 py-2 text-[12px] outline-none"
                      value={kakaoTemplate}
                      onChange={e => setKakaoTemplate(e.target.value)}
                    >
                      <option value="">템플릿 선택</option>
                      <option value="billing">시설 비용 청구 안내</option>
                      <option value="notice">시설 공지 안내</option>
                      <option value="emergency">긴급 알림</option>
                    </select>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <span className={labelClass}>메시지</span>
                    <textarea
                      className="min-h-[180px] w-full flex-1 resize-none border border-[#B8D1E0] p-3 text-[13px] shadow-inner outline-none"
                      placeholder="메시지"
                      value={kakaoMessage}
                      onChange={e => setKakaoMessage(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <hr className="border-gray-100" />

              <div className="space-y-3 p-1">
                <span className={labelClass}>발송 시점</span>
                <div className="flex gap-4">
                  <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-bold">
                    <input
                      type="radio"
                      checked={sendType === 'immediate'}
                      onChange={() => setSendType('immediate')}
                      className="h-3.5 w-3.5"
                    />
                    즉시 발송
                  </label>
                  <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-bold">
                    <input
                      type="radio"
                      checked={sendType === 'scheduled'}
                      onChange={() => setSendType('scheduled')}
                      className="h-3.5 w-3.5"
                    />
                    예약 발송
                  </label>
                </div>

                {sendType === 'scheduled' && (
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="flex-1 border border-[#B8D1E0] px-2 py-1.5 text-[11px] outline-none"
                      value={scheduledDate}
                      onChange={e => setScheduledDate(e.target.value)}
                    />
                    <input
                      type="time"
                      className="flex-1 border border-[#B8D1E0] px-2 py-1.5 text-[11px] outline-none"
                      value={scheduledTime}
                      onChange={e => setScheduledTime(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto border-t border-[#B8D1E0] bg-gray-50 p-4">
              <button
                onClick={handleSend}
                className="flex w-full items-center justify-center gap-2 rounded bg-[#1e88e5] py-3 font-black text-white shadow-md transition-all hover:bg-[#1976d2] active:scale-[0.98]"
              >
                <i className="ri-send-plane-fill"></i>
                알림 발송하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

