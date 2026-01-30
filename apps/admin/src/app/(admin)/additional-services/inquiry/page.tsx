'use client';

import { api } from '@/lib/api';
import { WebInquiry } from '@agape-care/api-contract';
import { useState } from 'react';
import InquiryDetailModal from './InquiryDetailModal';
import InquiryTable from './InquiryTable';

export default function InquiryPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'PENDING' | 'IN_PROGRESS' | 'DONE' | undefined>(undefined);
  const [selectedInquiry, setSelectedInquiry] = useState<WebInquiry | null>(null);

  const { data, isLoading, refetch } = api.webInquiry.getWebInquiries.useQuery({
    query: {
      page,
      limit: 10,
      status: statusFilter,
    },
  });

  const { mutate: updateStatus } = api.webInquiry.updateWebInquiryStatus.useMutation({
    onSuccess: () => {
      refetch();
      if (selectedInquiry) {
        setSelectedInquiry(prev => (prev ? { ...prev, status: arguments[0] as any } : null)); // Optimistic update simulation or refetch
        // Actually refetch details or update local state
        refetch();
        setSelectedInquiry(null); // Close modal or refresh it? Let's close it for now or keep it open if needed.
        // Better: just refetch list. If detail is open, we need to update it too.
      }
    },
  });

  const handleUpdateStatus = (id: string, status: 'PENDING' | 'IN_PROGRESS' | 'DONE') => {
    updateStatus({
      params: { id },
      body: { status },
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담 문의 관리</h1>
          <p className="mt-1 text-sm text-gray-500">웹사이트에서 접수된 상담 문의를 관리합니다.</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setStatusFilter(undefined)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            statusFilter === undefined
              ? 'bg-gray-900 text-white'
              : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setStatusFilter('PENDING')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            statusFilter === 'PENDING'
              ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
              : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          대기중
        </button>
        <button
          onClick={() => setStatusFilter('IN_PROGRESS')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            statusFilter === 'IN_PROGRESS'
              ? 'border-blue-200 bg-blue-100 text-blue-800'
              : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          처리중
        </button>
        <button
          onClick={() => setStatusFilter('DONE')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            statusFilter === 'DONE'
              ? 'border-green-200 bg-green-100 text-green-800'
              : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          완료
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-500">로딩중...</div>
      ) : (
        <>
          <InquiryTable
            data={data?.body.success ? data.body.data : []}
            onView={setSelectedInquiry}
            onUpdateStatus={handleUpdateStatus}
          />

          {/* Pagination could be added here */}
        </>
      )}

      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdateStatus={(id, status) => {
            handleUpdateStatus(id, status);
            // Manually update selected inquiry status to reflect change immediately in UI if needed,
            // though refetch is triggered.
            setSelectedInquiry({ ...selectedInquiry, status });
          }}
        />
      )}
    </div>
  );
}
