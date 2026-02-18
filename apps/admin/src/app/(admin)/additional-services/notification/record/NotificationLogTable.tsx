'use client';

import { NotificationQueue } from '@agape-care/api-contract';

interface Props {
  data: NotificationQueue[];
}

export default function NotificationLogTable({ data }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">대기중</span>;
      case 'SENT':
        return <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">전송됨</span>;
      case 'FAILED':
        return <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">실패</span>;
      case 'CANCELLED':
        return <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">취소됨</span>;
      default:
        return <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">{status}</span>;
    }
  };

  const getChannelBadge = (channel: string) => {
    switch (channel) {
      case 'SMS':
        return <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">SMS</span>;
      case 'EMAIL':
        return <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">이메일</span>;
      case 'PUSH':
        return <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">푸시</span>;
      case 'INAPP':
        return <span className="rounded bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800">인앱</span>;
      default:
        return <span>{channel}</span>;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">일시</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">채널</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">대상</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              제목/내용
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">상태</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">발송일시</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">에러</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">
                발송 이력이 없습니다.
              </td>
            </tr>
          ) : (
            data.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{getChannelBadge(item.channel)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {item.targetType} {item.targetId ? `(${item.targetId})` : ''}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">
                    {item.title ? <span className="mr-2 font-medium text-gray-900">[{item.title}]</span> : null}
                    {item.body}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(item.status)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {item.sentAt ? new Date(item.sentAt).toLocaleString() : '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-red-500">
                  <div className="max-w-xs truncate">{item.errorMessage || '-'}</div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
