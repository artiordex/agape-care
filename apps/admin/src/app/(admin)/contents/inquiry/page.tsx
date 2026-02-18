/**
 * Description : page.tsx - ?? contents/inquiry ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { api } from '@/lib/api';
import { useMemo, useState } from 'react';
import InquiryDetailModal from './InquiryDetailModal';
import InquiryTable from './InquiryTable';
import VisitReservationDetailModal from './VisitReservationDetailModal';
import VisitReservationTable from './VisitReservationTable';
import { InquiryStatus, VisitReservation, VisitStatus, WebInquiry } from './inquiry.type';

type TabType = 'inquiry' | 'visit';

/**
 * [Page] 아가페 웹 상담/방문 문의 관리 시스템
 * API 기반 데이터 관리
 */
export default function InquiryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('inquiry');

  // 상담 문의 상태
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<InquiryStatus | 'ALL'>('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<WebInquiry | null>(null);

  // 방문 예약 상태
  const [visitStatusFilter, setVisitStatusFilter] = useState<VisitStatus | 'ALL'>('ALL');
  const [selectedVisit, setSelectedVisit] = useState<VisitReservation | null>(null);

  // API: 상담 문의 목록 조회
  const { data: inquiriesData, refetch: refetchInquiries } = api.webInquiry.getWebInquiries.useQuery(
    ['webInquiries', inquiryStatusFilter],
    {
      query: {
        page: 1,
        limit: 100,
        status: inquiryStatusFilter !== 'ALL' ? inquiryStatusFilter : undefined,
      },
    },
  );

  // API: 방문 예약 목록 조회
  const { data: visitReservationsData, refetch: refetchVisits } = api.visitReservation.getVisitReservations.useQuery(
    ['visitReservations', visitStatusFilter],
    {
      query: {
        page: 1,
        limit: 100,
        status: visitStatusFilter !== 'ALL' ? visitStatusFilter : undefined,
      },
    },
  );

  // API: 상담 문의 상태 업데이트
  const updateInquiryStatus = api.webInquiry.updateWebInquiryStatus.useMutation({
    onSuccess: () => {
      refetchInquiries();
    },
  });

  // API: 방문 예약 상태 업데이트
  const updateVisitStatus = api.visitReservation.updateVisitReservationStatus.useMutation({
    onSuccess: () => {
      refetchVisits();
    },
  });

  // API: 상담 문의 삭제
  const deleteInquiry = api.webInquiry.deleteWebInquiry.useMutation({
    onSuccess: () => {
      refetchInquiries();
    },
  });

  // API: 방문 예약 삭제
  const deleteVisit = api.visitReservation.deleteVisitReservation.useMutation({
    onSuccess: () => {
      refetchVisits();
    },
  });

  const inquiries = inquiriesData?.body?.data || [];
  const visitReservations = visitReservationsData?.body?.data || [];

  // 상담 문의 통계
  const inquiryStats = useMemo(() => {
    return {
      total: inquiries.length,
      pending: inquiries.filter(i => i.status === 'PENDING').length,
      inProgress: inquiries.filter(i => i.status === 'IN_PROGRESS').length,
      done: inquiries.filter(i => i.status === 'DONE').length,
    };
  }, [inquiries]);

  // 방문 예약 통계
  const visitStats = useMemo(() => {
    return {
      total: visitReservations.length,
      pending: visitReservations.filter(v => v.status === 'PENDING').length,
      approved: visitReservations.filter(v => v.status === 'APPROVED').length,
      rejected: visitReservations.filter(v => v.status === 'REJECTED').length,
    };
  }, [visitReservations]);

  // 상담 문의 상태 업데이트
  const handleUpdateInquiryStatus = (id: string, status: InquiryStatus) => {
    updateInquiryStatus.mutate({
      params: { id },
      body: { status },
    });

    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status, updatedAt: new Date().toISOString() });
    }
  };

  // 방문 예약 상태 업데이트
  const handleUpdateVisitStatus = (id: string, status: VisitStatus) => {
    updateVisitStatus.mutate({
      params: { id },
      body: { status },
    });

    if (selectedVisit?.id === id) {
      setSelectedVisit({ ...selectedVisit, status, updatedAt: new Date().toISOString() });
    }
  };

  // 상담 문의 삭제
  const handleDeleteInquiry = (id: string) => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) return;

    deleteInquiry.mutate({
      params: { id },
    });

    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  // 방문 예약 삭제
  const handleDeleteVisit = (id: string) => {
    if (!confirm('정말로 이 예약을 삭제하시겠습니까?')) return;

    deleteVisit.mutate({
      params: { id },
    });

    if (selectedVisit?.id === id) {
      setSelectedVisit(null);
    }
  };

  const isLoading = (activeTab === 'inquiry' && !inquiriesData) || (activeTab === 'visit' && !visitReservationsData);

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
              <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">웹 문의 관리</h1>
              <span className="border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
                Admin Node
              </span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
              Web Inquiry Management System
              <span className="mx-2 h-2 w-[1px] bg-gray-300"></span>
              <span className="font-mono text-[#5C8D5A]">
                Total: {activeTab === 'inquiry' ? inquiryStats.total : visitStats.total}건
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-gray-200 bg-white px-8">
        <button
          onClick={() => setActiveTab('inquiry')}
          className={`relative px-6 py-4 text-[13px] font-black uppercase tracking-wide transition-all ${
            activeTab === 'inquiry' ? 'text-[#5C8D5A]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <i className="ri-chat-4-line mr-2"></i>
          상담 문의
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-600">
            {inquiryStats.total}
          </span>
          {activeTab === 'inquiry' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5C8D5A]"></div>}
        </button>
        <button
          onClick={() => setActiveTab('visit')}
          className={`relative px-6 py-4 text-[13px] font-black uppercase tracking-wide transition-all ${
            activeTab === 'visit' ? 'text-[#5C8D5A]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <i className="ri-calendar-check-line mr-2"></i>
          방문 예약
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-600">
            {visitStats.total}
          </span>
          {activeTab === 'visit' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5C8D5A]"></div>}
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-full space-y-8">
          {/* 상담 문의 탭 */}
          {activeTab === 'inquiry' && (
            <>
              {/* 통계 카드 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <StatCard
                  label="전체 문의"
                  value={inquiryStats.total}
                  icon="ri-mail-line"
                  color="text-gray-800"
                  active={inquiryStatusFilter === 'ALL'}
                  onClick={() => setInquiryStatusFilter('ALL')}
                />
                <StatCard
                  label="대기중"
                  value={inquiryStats.pending}
                  icon="ri-time-line"
                  color="text-yellow-600"
                  active={inquiryStatusFilter === 'PENDING'}
                  onClick={() => setInquiryStatusFilter('PENDING')}
                />
                <StatCard
                  label="처리중"
                  value={inquiryStats.inProgress}
                  icon="ri-loader-4-line"
                  color="text-blue-600"
                  active={inquiryStatusFilter === 'IN_PROGRESS'}
                  onClick={() => setInquiryStatusFilter('IN_PROGRESS')}
                />
                <StatCard
                  label="완료"
                  value={inquiryStats.done}
                  icon="ri-checkbox-circle-line"
                  color="text-green-600"
                  active={inquiryStatusFilter === 'DONE'}
                  onClick={() => setInquiryStatusFilter('DONE')}
                />
              </div>

              {/* 필터 버튼 */}
              <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
                <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">문의 목록</h2>
                <span className="text-[11px] font-bold text-gray-400">(검색결과: {inquiries.length}건)</span>
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
                  data={inquiries as WebInquiry[]}
                  onView={setSelectedInquiry}
                  onUpdateStatus={handleUpdateInquiryStatus}
                  onDelete={handleDeleteInquiry}
                />
              )}
            </>
          )}

          {/* 방문 예약 탭 */}
          {activeTab === 'visit' && (
            <>
              {/* 통계 카드 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <StatCard
                  label="전체 예약"
                  value={visitStats.total}
                  icon="ri-calendar-line"
                  color="text-gray-800"
                  active={visitStatusFilter === 'ALL'}
                  onClick={() => setVisitStatusFilter('ALL')}
                />
                <StatCard
                  label="대기중"
                  value={visitStats.pending}
                  icon="ri-time-line"
                  color="text-yellow-600"
                  active={visitStatusFilter === 'PENDING'}
                  onClick={() => setVisitStatusFilter('PENDING')}
                />
                <StatCard
                  label="승인됨"
                  value={visitStats.approved}
                  icon="ri-check-line"
                  color="text-green-600"
                  active={visitStatusFilter === 'APPROVED'}
                  onClick={() => setVisitStatusFilter('APPROVED')}
                />
                <StatCard
                  label="반려됨"
                  value={visitStats.rejected}
                  icon="ri-close-line"
                  color="text-red-600"
                  active={visitStatusFilter === 'REJECTED'}
                  onClick={() => setVisitStatusFilter('REJECTED')}
                />
              </div>

              {/* 필터 버튼 */}
              <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
                <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">예약 목록</h2>
                <span className="text-[11px] font-bold text-gray-400">(검색결과: {visitReservations.length}건)</span>
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
                <VisitReservationTable
                  data={visitReservations as VisitReservation[]}
                  onView={setSelectedVisit}
                  onUpdateStatus={handleUpdateVisitStatus}
                  onDelete={handleDeleteVisit}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* 상세보기 모달 - 상담 문의 */}
      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdateStatus={handleUpdateInquiryStatus}
          onDelete={handleDeleteInquiry}
        />
      )}

      {/* 상세보기 모달 - 방문 예약 */}
      {selectedVisit && (
        <VisitReservationDetailModal
          reservation={selectedVisit}
          onClose={() => setSelectedVisit(null)}
          onUpdateStatus={handleUpdateVisitStatus}
          onDelete={handleDeleteVisit}
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
