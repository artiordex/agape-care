/**
 * Description : page.tsx - 알림 발송 작성 (기존 기능 + SNS UI 리팩토링)
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { channels } from './NotificationMessageStep';
import { purposes } from './NotificationPurposeStep';

// 가상 데이터: 통합 수신자 리스트 (수급자, 보호자, 직원 포함)
const MOCK_RECIPIENTS = [
  {
    id: 1,
    type: 'guardian',
    name: '김철수 보호자',
    phone: '010-1234-1234',
    resident: '김철수',
    relation: '아들',
    status: '입소중',
  },
  {
    id: 2,
    type: 'guardian',
    name: '이영희 보호자',
    phone: '010-5678-1234',
    resident: '이영희',
    relation: '딸',
    status: '입소중',
  },
  {
    id: 3,
    type: 'staff',
    name: '박지민',
    phone: '010-1111-2222',
    resident: '-',
    relation: '사회복지사',
    status: '재직',
  },
  {
    id: 4,
    type: 'staff',
    name: '최현우',
    phone: '010-3333-4444',
    resident: '-',
    relation: '요양보호사',
    status: '재직',
  },
  {
    id: 101,
    type: 'resident',
    name: '김철수',
    phone: '010-1234-1234',
    resident: '김철수',
    relation: '본인',
    status: '입소중',
  },
  {
    id: 102,
    type: 'resident',
    name: '이영희',
    phone: '010-5678-1234',
    resident: '이영희',
    relation: '본인',
    status: '입소중',
  },
];

export default function NotificationSendPage() {
  // --- [1] 기존 상태 복구 ---
  const [purpose, setPurpose] = useState('notice');
  const [recipientType, setRecipientType] = useState('guardian');
  const [selectedList, setSelectedList] = useState<any[]>([]);

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

  // --- [2] 필터링 로직 ---
  const filteredRecipients = useMemo(() => {
    return MOCK_RECIPIENTS.filter(r => r.type === recipientType || recipientType === 'all');
  }, [recipientType]);

  // --- [3] 액션 핸들러 ---
  const toggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      if (selectedChannels.length > 1) {
        const next = selectedChannels.filter(c => c !== channelId);
        setSelectedChannels(next);
        if (activeChannel === channelId) setActiveChannel(next[0]);
      }
    } else {
      setSelectedChannels([...selectedChannels, channelId]);
      setActiveChannel(channelId);
    }
  };

  const handleSelect = (item: any) => {
    if (selectedList.find(i => i.id === item.id)) return;
    setSelectedList([...selectedList, item]);
  };

  const handleRemove = (id: number) => {
    setSelectedList(selectedList.filter(i => i.id !== id));
  };

  const handleSend = () => {
    if (selectedList.length === 0) return alert('수신자를 선택해 주세요.');
    if (selectedChannels.length === 0) return alert('발송 채널을 선택해 주세요.');
    alert(`✅ [${purposes.find(p => p.value === purpose)?.label}] 알림이 ${selectedList.length}명에게 발송되었습니다.`);
  };

  // UI 클래스
  const sectionHeaderClass =
    'bg-[#E3F2FD] border border-[#B8D1E0] px-3 py-2 text-[13px] font-bold text-[#2E6A9E] flex items-center justify-between';
  const labelClass = 'text-[11px] font-bold text-gray-500 mb-1 block';

  return (
    <div className="flex h-screen flex-col gap-3 overflow-hidden bg-[#f0f2f5] p-3 font-sans text-gray-800 antialiased">
      {/* 0. 발송 목적 선택 (상단 가로 바) */}
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
        {/* 1. 발송대상자 선택 (좌측) */}
        <div className="flex flex-[4] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
          <div className={sectionHeaderClass}>
            <div className="flex items-center gap-1.5">
              <i className="ri-user-search-line"></i>
              <span>수신 대상 필터</span>
            </div>
          </div>

          <div className="flex border-b border-[#B8D1E0] bg-[#E3F2FD]/50">
            {[
              { id: 'guardian', label: '보호자' },
              { id: 'resident', label: '수급자' },
              { id: 'staff', label: '직원' },
              { id: 'all', label: '전체' },
            ].map(tab => (
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
              placeholder="성함 검색..."
              className="flex-1 border border-[#B8D1E0] px-2 py-1 text-[11px] outline-none"
            />
            <button className="rounded-sm bg-[#8FA1B0] px-3 py-1 text-[11px] font-bold text-white">조회</button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead className="sticky top-0 z-10 bg-[#E8F1F8] text-left font-bold text-gray-600 shadow-sm">
                <tr>
                  <th className="w-8 border-b border-[#B8D1E0] p-2">
                    <input type="checkbox" disabled />
                  </th>
                  <th className="border-b border-[#B8D1E0] p-2">구분</th>
                  <th className="border-b border-[#B8D1E0] p-2">성명</th>
                  <th className="border-b border-[#B8D1E0] p-2">연락처</th>
                  <th className="border-b border-[#B8D1E0] p-2">기타</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecipients.map(item => (
                  <tr key={item.id} className="cursor-pointer hover:bg-blue-50" onClick={() => handleSelect(item)}>
                    <td className="border-r border-gray-50 p-2 text-center">
                      <input type="checkbox" readOnly checked={!!selectedList.find(i => i.id === item.id)} />
                    </td>
                    <td className="border-r border-gray-50 p-2 text-gray-500">
                      {item.type === 'guardian' ? '보호자' : item.type === 'resident' ? '수급자' : '직원'}
                    </td>
                    <td className="border-r border-gray-50 p-2 font-bold">{item.name}</td>
                    <td className="border-r border-gray-50 p-2 font-medium text-blue-600">{item.phone}</td>
                    <td className="p-2 text-gray-400">{item.relation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. 발송대상자 확인 (중앙) */}
        <div className="flex flex-[2.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
          <div className={sectionHeaderClass}>
            <div className="flex items-center gap-1.5">
              <i className="ri-list-check"></i>
              <span>수신 명단 ({selectedList.length})</span>
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
                  <span className="text-[11px]">대상을 추가하세요</span>
                </div>
              ) : (
                selectedList.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-sm border border-[#B8D1E0] bg-white p-1.5"
                  >
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold">{item.name}</span>
                      <span className="text-[10px] text-gray-400">{item.phone}</span>
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

        {/* 3. 메시지 작성 및 옵션 (우측) */}
        <div className="flex flex-[3.5] flex-col overflow-hidden border border-[#B8D1E0] bg-white shadow-sm">
          {/* 채널 탭 및 활성화 토글 */}
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
            {/* [기능] SMS/LMS 메세지 */}
            {activeChannel === 'sms' && (
              <div className="animate-in fade-in slide-in-from-right-2 flex h-full flex-col gap-2 duration-300">
                <div className="flex items-center justify-between">
                  <span className={labelClass}>문자 메세지 내용</span>
                  <span className="text-[10px] font-bold text-gray-400">{smsMessage.length} / 2000 Byte</span>
                </div>
                <textarea
                  className="min-h-[250px] w-full flex-1 resize-none border border-[#B8D1E0] p-3 text-[13px] shadow-inner outline-none"
                  placeholder="수급자 및 보호자에게 전달할 긴급 문자를 작성하세요."
                  value={smsMessage}
                  onChange={e => setSmsMessage(e.target.value)}
                />
              </div>
            )}

            {/* [기능] 밴드 메세지 (제목 포함) */}
            {activeChannel === 'band' && (
              <div className="animate-in fade-in slide-in-from-right-2 flex h-full flex-col gap-3 duration-300">
                <div>
                  <span className={labelClass}>밴드 게시글 제목</span>
                  <input
                    type="text"
                    className="w-full border border-[#B8D1E0] px-3 py-2 text-[12px] outline-none"
                    placeholder="밴드 공지 제목을 입력하세요."
                    value={bandTitle}
                    onChange={e => setBandTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <span className={labelClass}>본문 내용</span>
                  <textarea
                    className="min-h-[200px] w-full flex-1 resize-none border border-[#B8D1E0] p-3 text-[13px] shadow-inner outline-none"
                    placeholder="가족 밴드에 업로드될 본문 내용을 입력하세요."
                    value={bandMessage}
                    onChange={e => setBandMessage(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* [기능] 카카오 알림톡 (템플릿 포함) */}
            {activeChannel === 'kakao' && (
              <div className="animate-in fade-in slide-in-from-right-2 flex h-full flex-col gap-3 duration-300">
                <div>
                  <span className={labelClass}>알림톡 템플릿 선택</span>
                  <select
                    className="w-full border border-[#B8D1E0] bg-white px-3 py-2 text-[12px] outline-none"
                    value={kakaoTemplate}
                    onChange={e => setKakaoTemplate(e.target.value)}
                  >
                    <option value="">보낼 템플릿을 선택하세요</option>
                    <option value="billing">시설 비용 청구 안내</option>
                    <option value="notice">시설 중요 행사 안내</option>
                    <option value="emergency">비상 연락망 안내</option>
                  </select>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <span className={labelClass}>메세지 내용 (변수 자동 변환)</span>
                  <textarea
                    className="min-h-[180px] w-full flex-1 resize-none border border-[#B8D1E0] p-3 text-[13px] shadow-inner outline-none"
                    placeholder="템플릿에 따라 내용이 자동으로 구성됩니다."
                    value={kakaoMessage}
                    onChange={e => setKakaoMessage(e.target.value)}
                  />
                </div>
              </div>
            )}

            <hr className="border-gray-100" />

            {/* [기능] 발송 옵션 */}
            <div className="space-y-3 p-1">
              <span className={labelClass}>발송 시점 및 옵션</span>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-bold">
                  <input
                    type="radio"
                    checked={sendType === 'immediate'}
                    onChange={() => setSendType('immediate')}
                    className="h-3.5 w-3.5"
                  />{' '}
                  즉시 발송
                </label>
                <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-bold">
                  <input
                    type="radio"
                    checked={sendType === 'scheduled'}
                    onChange={() => setSendType('scheduled')}
                    className="h-3.5 w-3.5"
                  />{' '}
                  예약 발송
                </label>
              </div>

              {sendType === 'scheduled' && (
                <div className="animate-in slide-in-from-top-1 flex gap-2 duration-200">
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
  );
}
