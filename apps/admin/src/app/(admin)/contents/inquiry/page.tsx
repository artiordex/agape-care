'use client';

import { useState, useEffect, useMemo } from 'react';
import InquiryDetailModal from './InquiryDetailModal';
import InquiryTable from './InquiryTable';
import { WebInquiry, InquiryStatus } from './inquiry.type';

/**
 * [Page] 아가페 웹 상담 문의 관리 시스템
 * LocalStorage 기반 데이터 관리
 */
export default function InquiryPage() {
  const [inquiries, setInquiries] = useState<WebInquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'ALL'>('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<WebInquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('agape_inquiries');
    if (saved) {
      setInquiries(JSON.parse(saved));
    } else {
      // 샘플 데이터
      const initial: WebInquiry[] = [
        {
          id: '3',
          type: '입소상담',
          name: '김영희',
          phone: '010-1234-5678',
          email: 'kim@example.com',
          message: '부모님 입소 상담을 받고 싶습니다.\n시설 방문 가능한 날짜를 알려주시면 감사하겠습니다.',
          status: 'PENDING',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          type: '시설문의',
          name: '이철수',
          phone: '010-9876-5432',
          email: 'lee@example.com',
          message: '시설 내 의료 서비스에 대해 자세히 알고 싶습니다.\n간호사가 상주하시나요?',
          status: 'IN_PROGRESS',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '1',
          type: '채용문의',
          name: '박민수',
          phone: '010-5555-6666',
          message: '요양보호사 채용 공고를 보고 연락드립니다.\n면접 일정을 잡고 싶습니다.',
          status: 'DONE',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setInquiries(initial);
      localStorage.setItem('agape_inquiries', JSON.stringify(initial));
    }
    setIsLoading(false);
  }, []);

  // 저장
  const saveToStorage = (data: WebInquiry[]) => {
    localStorage.setItem('agape_inquiries', JSON.stringify(data));
    setInquiries(data);
  };

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    if (statusFilter === 'ALL') return inquiries;
    return inquiries.filter(item => item.status === statusFilter);
  }, [inquiries, statusFilter]);

  // 통계
  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      pending: inquiries.filter(i => i.status === 'PENDING').length,
      inProgress: inquiries.filter(i => i.status === 'IN_PROGRESS').length,
      done: inquiries.filter(i => i.status === 'DONE').length,
    };
  }, [inquiries]);

  // 상태 업데이트
  const handleUpdateStatus = (id: string, status: InquiryStatus) => {
    const updated = inquiries.map(item =>
      item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item,
    );
    saveToStorage(updated);

    // 선택된 항목도 업데이트
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status, updatedAt: new Date().toISOString() });
    }
  };

  // 삭제
  const handleDelete = (id: string) => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) return;

    const updated = inquiries.filter(item => item.id !== id);
    saveToStorage(updated);

    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* 헤더 */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-6 font-sans antialiased shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-none bg-[#5C8D5A] p-3 text-white shadow-md">
            <i className="ri-question-answer-line text-2xl"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
                웹 상담 문의 관리
              </h1>
              <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
                Admin Node
              </span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
              Web Inquiry Management System
              <span className="mx-2 h-2 w-[1px] bg-gray-300"></span>
              <span className="font-mono text-[#5C8D5A]">Total: {stats.total}건</span>
            </p>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-full space-y-8">
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              label="전체 문의"
              value={stats.total}
              icon="ri-mail-line"
              color="text-gray-800"
              active={statusFilter === 'ALL'}
              onClick={() => setStatusFilter('ALL')}
            />
            <StatCard
              label="대기중"
              value={stats.pending}
              icon="ri-time-line"
              color="text-yellow-600"
              active={statusFilter === 'PENDING'}
              onClick={() => setStatusFilter('PENDING')}
            />
            <StatCard
              label="처리중"
              value={stats.inProgress}
              icon="ri-loader-4-line"
              color="text-blue-600"
              active={statusFilter === 'IN_PROGRESS'}
              onClick={() => setStatusFilter('IN_PROGRESS')}
            />
            <StatCard
              label="완료"
              value={stats.done}
              icon="ri-checkbox-circle-line"
              color="text-green-600"
              active={statusFilter === 'DONE'}
              onClick={() => setStatusFilter('DONE')}
            />
          </div>

          {/* 필터 버튼 */}
          <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
            <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">문의 목록</h2>
            <span className="text-[11px] font-bold text-gray-400">(검색결과: {filteredData.length}건)</span>
          </div>

          {/* 테이블 */}
          {isLoading ? (
            <div className="flex h-64 items-center justify-center border border-gray-300 bg-white">
              <div className="text-center">
                <i className="ri-loader-4-line mb-2 animate-spin text-4xl text-gray-300"></i>
                <p className="text-[12px] font-bold text-gray-400">로딩중...</p>
              </div>
            </div>
          ) : (
            <InquiryTable
              data={filteredData}
              onView={setSelectedInquiry}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* 상세보기 모달 */}
      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5c8d5a;
        }
      `}</style>
    </div>
  );
}

// 통계 카드 컴포넌트
function StatCard({ label, value, icon, color, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer border p-4 text-left shadow-sm transition-all ${
        active ? 'border-[#5C8D5A] bg-emerald-50' : 'border-gray-200 bg-white hover:border-[#5C8D5A]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</span>
        <i className={`${icon} text-[14px] ${color}`}></i>
      </div>
      <div className="mt-2 font-mono text-2xl font-black tracking-tighter text-gray-800">{value}</div>
    </button>
  );
}
