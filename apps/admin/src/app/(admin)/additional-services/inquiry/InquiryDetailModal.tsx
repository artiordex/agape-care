'use client';

import { WebInquiry } from '@agape-care/api-contract';

interface Props {
  inquiry: WebInquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE') => void;
}

export default function InquiryDetailModal({ inquiry, onClose, onUpdateStatus }: Props) {
  if (!inquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">상담 문의 상세</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Close</span>
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">신청일시</label>
              <div className="mt-1 text-sm text-gray-900">{new Date(inquiry.createdAt).toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">이름</label>
                <div className="mt-1 text-sm text-gray-900">{inquiry.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">연락처</label>
                <div className="mt-1 text-sm text-gray-900">{inquiry.phone}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">상담 유형</label>
              <div className="mt-1 text-sm text-gray-900">{inquiry.type}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">문의 내용</label>
              <div className="mt-1 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm text-gray-900">
                {inquiry.message || '내용 없음'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">처리 상태</label>
              <div className="mt-2 flex gap-2">
                {(['PENDING', 'IN_PROGRESS', 'DONE'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => onUpdateStatus(inquiry.id, status)}
                    className={`rounded border px-3 py-1 text-xs font-medium ${
                      inquiry.status === status
                        ? status === 'PENDING'
                          ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                          : status === 'IN_PROGRESS'
                            ? 'border-blue-200 bg-blue-100 text-blue-800'
                            : 'border-green-200 bg-green-100 text-green-800'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {status === 'PENDING' ? '대기중' : status === 'IN_PROGRESS' ? '처리중' : '완료'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end rounded-b-lg border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
