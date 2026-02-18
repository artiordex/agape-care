'use client';

import { NotificationChannel, NotificationStatus } from '@agape-care/api-contract';

interface Props {
  channel?: NotificationChannel;
  status?: NotificationStatus;
  onChannelChange: (channel?: NotificationChannel) => void;
  onStatusChange: (status?: NotificationStatus) => void;
}

export default function LogFilter({ channel, status, onChannelChange, onStatusChange }: Props) {
  return (
    <div className="flex gap-4">
      <select
        value={channel || ''}
        onChange={e => onChannelChange(e.target.value ? (e.target.value as NotificationChannel) : undefined)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="">모든 채널</option>
        <option value="SMS">SMS</option>
        <option value="EMAIL">이메일</option>
        <option value="PUSH">푸시</option>
        <option value="INAPP">인앱</option>
      </select>

      <select
        value={status || ''}
        onChange={e => onStatusChange(e.target.value ? (e.target.value as NotificationStatus) : undefined)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      >
        <option value="">모든 상태</option>
        <option value="PENDING">대기중</option>
        <option value="SENT">전송됨</option>
        <option value="FAILED">실패</option>
        <option value="CANCELLED">취소됨</option>
      </select>
    </div>
  );
}
