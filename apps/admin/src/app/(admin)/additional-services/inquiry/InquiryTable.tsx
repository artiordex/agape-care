'use client';

import { WebInquiry } from '@agape-care/api-contract';

interface Props {
  data: WebInquiry[];
  onView: (inquiry: WebInquiry) => void;
  onUpdateStatus: (id: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE') => void;
}

export default function InquiryTable({ data, onView, onUpdateStatus }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">대기중</span>;
      case 'IN_PROGRESS':
        return <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">처리중</span>;
      case 'DONE':
        return <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">완료</span>;
      default:
        return <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">신청일시</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">상담유형</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">이름</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">연락처</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">상태</th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                등록된 상담 문의가 없습니다.
              </td>
            </tr>
          ) : (
            data.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{item.type}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.phone}</td>
                <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(item.status)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button onClick={() => onView(item)} className="text-blue-600 hover:text-blue-900">
                    상세보기
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
