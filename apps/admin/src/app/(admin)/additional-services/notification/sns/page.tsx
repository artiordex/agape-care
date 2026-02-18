/**
 * Description : page.tsx - ?? additional-services/notification/sns ??? UI ????
 */

'use client';

import type { NotificationConfig, RecipientGroup, RecipientGroupType } from '@agape-care/api-contract';
import { api } from '@/lib/api';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import SNSHeader from './SNSHeader';

type TabType = 'ALL' | RecipientGroupType;

const TAB_LABELS: { key: TabType; label: string }[] = [
  { key: 'ALL', label: '전체' },
  { key: 'GUARDIAN', label: '보호자' },
  { key: 'RESIDENT', label: '어르신' },
  { key: 'STAFF', label: '직원' },
  { key: 'MIXED', label: '기타' },
];

const TYPE_LABEL: Record<RecipientGroupType, string> = {
  GUARDIAN: '보호자',
  RESIDENT: '어르신',
  STAFF: '직원',
  MIXED: '혼합',
};

function formatDate(value?: string | null): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('ko-KR');
}

export default function SnsManagementPage() {
  const [selectedList, setSelectedList] = useState<RecipientGroup[]>([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('ALL');
  const [search, setSearch] = useState('');

  const {
    data: recipientGroupsData,
    isLoading: isRecipientLoading,
    refetch: refetchRecipientGroups,
  } = api.notification.getRecipientGroups.useQuery(['notificationRecipientGroups', activeTab, search], {
    query: {
      page: 1,
      limit: 100,
      type: activeTab === 'ALL' ? undefined : activeTab,
      status: 'ACTIVE',
      search: search || undefined,
    },
  });

  const { data: settingsData } = api.notification.getNotificationSettings.useQuery(['notificationSettings']);

  const updateSettings = api.notification.updateNotificationSettings.useMutation({
    onSuccess: () => {
      alert('SNS 알림 설정이 저장되었습니다.');
    },
    onError: () => {
      alert('SNS 알림 설정 저장에 실패했습니다.');
    },
  });

  const recipients = useMemo(() => {
    if (recipientGroupsData?.status !== 200) return [];
    return recipientGroupsData.body.data;
  }, [recipientGroupsData]);

  const notificationSettings = useMemo<NotificationConfig>(() => {
    if (settingsData?.status === 200) {
      return {
        sms: {
          enabled: settingsData.body.sms.enabled,
          senderPhone: settingsData.body.sms.senderPhone ?? '',
          apiKey: settingsData.body.sms.apiKey ?? '',
        },
        email: {
          enabled: settingsData.body.email.enabled,
          senderName: settingsData.body.email.senderName ?? '',
          senderEmail: settingsData.body.email.senderEmail ?? '',
        },
        push: {
          enabled: settingsData.body.push.enabled,
        },
        kakao: {
          enabled: settingsData.body.kakao?.enabled ?? false,
          senderKey: settingsData.body.kakao?.senderKey ?? '',
        },
        dailyLimit: settingsData.body.dailyLimit ?? 0,
      };
    }

    return {
      sms: { enabled: false, senderPhone: '', apiKey: '' },
      email: { enabled: false, senderName: '', senderEmail: '' },
      push: { enabled: false },
      kakao: { enabled: false, senderKey: '' },
      dailyLimit: 0,
    };
  }, [settingsData]);

  const handleSave = () => {
    updateSettings.mutate({
      body: notificationSettings,
    });
  };

  const handleSelect = (item: RecipientGroup) => {
    if (selectedList.some(i => i.id === item.id)) return;
    setSelectedList(prev => [...prev, item]);
  };

  const handleRemove = (id: number) => {
    setSelectedList(prev => prev.filter(i => i.id !== id));
  };

  const sectionHeaderClass =
    'bg-[#E3F2FD] border border-[#B8D1E0] px-2 py-1.5 text-[13px] font-bold text-[#2E6A9E] flex items-center gap-1.5';
  const grayBtnClass =
    'bg-[#8FA1B0] hover:bg-[#7D8E9D] text-white px-2 py-1 text-[11px] rounded-[2px] transition-colors';
  const whiteBtnClass =
    'bg-white border border-[#B8D1E0] hover:bg-gray-50 text-gray-700 px-2 py-1 text-[11px] rounded-[2px] transition-colors';

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans text-gray-800 antialiased">
      <SNSHeader isSaving={updateSettings.isPending} onSave={handleSave} />

      <div className="flex flex-1 gap-3 overflow-hidden p-3 lg:flex-row">
        <div className="flex flex-[4.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
          <div className={sectionHeaderClass}>
            <i className="ri-checkbox-multiple-line"></i>
            <span>발송 대상자 선택</span>
          </div>

          <div className="flex border-b border-[#B8D1E0] bg-[#E3F2FD]/50">
            {TAB_LABELS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  'border-r border-[#B8D1E0] px-6 py-2 text-[12px] font-bold',
                  activeTab === tab.key
                    ? 'mt-[-1px] border-t-2 border-t-[#2E6A9E] bg-white text-[#2E6A9E]'
                    : 'text-gray-500',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1 border-b border-[#B8D1E0] bg-gray-50 p-2">
            <button className={grayBtnClass} onClick={() => refetchRecipientGroups()}>
              새로고침
            </button>
            <div className="ml-1 flex items-center gap-1 border border-[#B8D1E0] bg-white px-2 py-0.5">
              <span className="text-[11px] text-gray-400">그룹명 검색</span>
              <input
                type="text"
                className="w-32 text-[11px] outline-none"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className={whiteBtnClass} onClick={() => setSearch('')}>
              초기화
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead className="sticky top-0 z-10 bg-[#E8F1F8] font-bold text-gray-600 shadow-sm">
                <tr>
                  <th className="w-8 border-b border-[#B8D1E0] p-1">
                    <input type="checkbox" disabled />
                  </th>
                  <th className="w-10 border-b border-[#B8D1E0] p-1">No</th>
                  <th className="border-b border-[#B8D1E0] p-1">그룹명</th>
                  <th className="border-b border-[#B8D1E0] p-1">유형</th>
                  <th className="border-b border-[#B8D1E0] p-1">구성원 수</th>
                  <th className="border-b border-[#B8D1E0] p-1">상태</th>
                  <th className="border-b border-[#B8D1E0] p-1">사용 횟수</th>
                  <th className="border-b border-[#B8D1E0] p-1">최근 사용일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isRecipientLoading ? (
                  <tr>
                    <td className="p-4 text-center text-gray-400" colSpan={8}>
                      데이터를 불러오는 중입니다.
                    </td>
                  </tr>
                ) : recipients.length === 0 ? (
                  <tr>
                    <td className="p-4 text-center text-gray-400" colSpan={8}>
                      표시할 수신자 그룹이 없습니다.
                    </td>
                  </tr>
                ) : (
                  recipients.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer transition-colors hover:bg-blue-50"
                      onClick={() => handleSelect(item)}
                    >
                      <td className="border-r border-gray-100 p-1 text-center">
                        <input type="checkbox" readOnly checked={selectedList.some(i => i.id === item.id)} />
                      </td>
                      <td className="border-r border-gray-100 p-2 text-center font-bold text-green-700">{idx + 1}</td>
                      <td className="border-r border-gray-100 p-2 font-bold">{item.name}</td>
                      <td className="border-r border-gray-100 p-2 text-center">{TYPE_LABEL[item.type]}</td>
                      <td className="border-r border-gray-100 p-2 text-center">{item.memberCount}</td>
                      <td className="border-r border-gray-100 p-2 text-center">{item.status}</td>
                      <td className="border-r border-gray-100 p-2 text-center">{item.usageCount}</td>
                      <td className="p-2 text-center">{formatDate(item.lastUsedAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#B8D1E0] bg-gray-50 p-2 text-[11px] font-bold">
            <div>전체: {recipientGroupsData?.status === 200 ? recipientGroupsData.body.pagination.total : 0}건</div>
            <div className="text-gray-500">API: /api/notifications/recipients</div>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <i className="ri-arrow-right-double-line text-2xl text-[#2E6A9E]"></i>
        </div>

        <div className="flex flex-[2.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
          <div className={sectionHeaderClass}>
            <i className="ri-checkbox-line"></i>
            <span>발송 대상자 확인</span>
          </div>

          <div className="flex flex-col gap-1 border-b border-[#B8D1E0] bg-gray-50 p-2">
            <div className="text-[11px] font-bold">수신 그룹 (총 {selectedList.length}개)</div>
          </div>

          <div className="flex-1 overflow-auto bg-white p-2">
            <div className="flex flex-col gap-1">
              {selectedList.length === 0 ? (
                <div className="flex h-40 items-center justify-center text-[11px] text-gray-300">
                  발송 대상을 선택해 주세요.
                </div>
              ) : (
                selectedList.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-sm border border-blue-100 bg-blue-50/50 p-1.5"
                  >
                    <span className="text-[11px] font-bold">
                      {item.name} ({item.memberCount}명)
                    </span>
                    <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500">
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="border-t border-[#B8D1E0] bg-gray-50 p-2">
            <button onClick={() => setSelectedList([])} className={whiteBtnClass}>
              전체 해제
            </button>
          </div>
        </div>

        <div className="flex flex-[3] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
          <div className="flex bg-[#8FA1B0] text-[12px] font-bold text-white">
            <button className="border-b border-white bg-white px-4 py-2 text-[#2E6A9E]">문자 발송 내용</button>
            <button className="px-4 py-2 opacity-80">문자 발송 이력</button>
            <button className="px-4 py-2 opacity-80">예약 발송 대기 이력</button>
          </div>

          <div className="flex flex-col gap-2 bg-white p-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              <span className="text-gray-500">문자 발신번호</span>
              <span className="font-bold">{notificationSettings.sms.senderPhone || '-'}</span>
              <span className="text-gray-500">문자 유형</span>
              <span className="font-bold">SMS</span>
              <span className="text-gray-500">차감 예상</span>
              <span className="font-bold">문자(1건) x {selectedList.length}개 그룹</span>
            </div>

            <div className="relative rounded-sm border border-[#B8D1E0] bg-[#F8FAFC]">
              <textarea
                className="h-80 w-full resize-none bg-transparent p-3 text-[13px] leading-normal outline-none placeholder:text-gray-300"
                placeholder="발송할 문자 내용을 입력해 주세요."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <div className="absolute bottom-2 right-3 text-[11px] font-bold text-gray-400">
                {new Blob([message]).size} Byte
              </div>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => setMessage('')}
                className="rounded-sm bg-[#E57373] px-4 py-1.5 text-[11px] font-bold text-white hover:bg-[#EF5350]"
              >
                지우기
              </button>
            </div>
          </div>

          <div className="mt-auto border-t border-[#B8D1E0] bg-gray-50 p-3">
            <button className="w-full rounded bg-[#1e88e5] py-2.5 font-black text-white shadow-md transition-all hover:bg-[#1976d2] active:scale-[0.98]">
              문자 발송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

