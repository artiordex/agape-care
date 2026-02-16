'use client';

import { useState, useEffect, useMemo } from 'react';
import InquiryDetailModal from './InquiryDetailModal';
import InquiryTable from './InquiryTable';
import VisitReservationTable from './VisitReservationTable';
import VisitReservationDetailModal from './VisitReservationDetailModal';
import { WebInquiry, InquiryStatus, VisitReservation, VisitStatus } from './inquiry.type';

type TabType = 'inquiry' | 'visit';

/**
 * [Page] 아가페 웹 상담/방문 문의 관리 시스템
 * LocalStorage 기반 데이터 관리
 */
export default function InquiryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('inquiry');

  // 상담 문의 상태
  const [inquiries, setInquiries] = useState<WebInquiry[]>([]);
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<InquiryStatus | 'ALL'>('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<WebInquiry | null>(null);

  // 방문 예약 상태
  const [visitReservations, setVisitReservations] = useState<VisitReservation[]>([]);
  const [visitStatusFilter, setVisitStatusFilter] = useState<VisitStatus | 'ALL'>('ALL');
  const [selectedVisit, setSelectedVisit] = useState<VisitReservation | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로드 - 상담 문의
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
          residentAge: '85세',
          careGrade: '3등급',
          preferredDate: '2024-03-15',
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

  // 초기 데이터 로드 - 방문 예약
  useEffect(() => {
    const saved = localStorage.getItem('agape_visit_reservations');
    if (saved) {
      setVisitReservations(JSON.parse(saved));
    } else {
      // 샘플 데이터
      const initial: VisitReservation[] = [
        {
          id: '101',
          visitorName: '최민지',
          visitorPhone: '010-1111-2222',
          visitorRelationship: '딸',
          residentName: '최순자',
          visitDate: '2024-03-20',
          visitTime: '14:00',
          visitorCount: 2,
          visitPurpose: '어머니 생신 축하',
          healthCheckSymptoms: false,
          healthCheckAssistance: false,
          notes: null,
          status: 'PENDING',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '102',
          visitorName: '정태우',
          visitorPhone: '010-3333-4444',
          visitorRelationship: '아들',
          residentName: '정한수',
          visitDate: '2024-03-18',
          visitTime: '10:30',
          visitorCount: 1,
          visitPurpose: '정기 방문',
          healthCheckSymptoms: false,
          healthCheckAssistance: true,
          notes: '휠체어 준비 필요',
          status: 'APPROVED',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setVisitReservations(initial);
      localStorage.setItem('agape_visit_reservations', JSON.stringify(initial));
    }
  }, []);

  // 상담 문의 저장
  const saveInquiriesToStorage = (data: WebInquiry[]) => {
    localStorage.setItem('agape_inquiries', JSON.stringify(data));
    setInquiries(data);
  };

  // 방문 예약 저장
  const saveVisitReservationsToStorage = (data: VisitReservation[]) => {
    localStorage.setItem('agape_visit_reservations', JSON.stringify(data));
    setVisitReservations(data);
  };

  // 필터링된 상담 문의
  const filteredInquiries = useMemo(() => {
    if (inquiryStatusFilter === 'ALL') return inquiries;
    return inquiries.filter(item => item.status === inquiryStatusFilter);
  }, [inquiries, inquiryStatusFilter]);

  // 필터링된 방문 예약
  const filteredVisitReservations = useMemo(() => {
    if (visitStatusFilter === 'ALL') return visitReservations;
    return visitReservations.filter(item => item.status === visitStatusFilter);
  }, [visitReservations, visitStatusFilter]);

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
    const updated = inquiries.map(item =>
      item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item,
    );
    saveInquiriesToStorage(updated);

    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status, updatedAt: new Date().toISOString() });
    }
  };

  // 방문 예약 상태 업데이트
  const handleUpdateVisitStatus = (id: string, status: VisitStatus) => {
    const updated = visitReservations.map(item =>
      item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item,
    );
    saveVisitReservationsToStorage(updated);

    if (selectedVisit?.id === id) {
      setSelectedVisit({ ...selectedVisit, status, updatedAt: new Date().toISOString() });
    }
  };

  // 상담 문의 삭제
  const handleDeleteInquiry = (id: string) => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) return;

    const updated = inquiries.filter(item => item.id !== id);
    saveInquiriesToStorage(updated);

    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  // 방문 예약 삭제
  const handleDeleteVisit = (id: string) => {
    if (!confirm('정말로 이 예약을 삭제하시겠습니까?')) return;

    const updated = visitReservations.filter(item => item.id !== id);
    saveVisitReservationsToStorage(updated);

    if (selectedVisit?.id === id) {
      setSelectedVisit(null);
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
                웹 문의 관리
              </h1>
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
            activeTab === 'inquiry'
              ? 'text-[#5C8D5A]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <i className="ri-chat-4-line mr-2"></i>
          상담 문의
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-600">
            {inquiryStats.total}
          </span>
          {activeTab === 'inquiry' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5C8D5A]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('visit')}
          className={`relative px-6 py-4 text-[13px] font-black uppercase tracking-wide transition-all ${
            activeTab === 'visit'
              ? 'text-[#5C8D5A]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <i className="ri-calendar-check-line mr-2"></i>
          방문 예약
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-600">
            {visitStats.total}
          </span>
          {activeTab === 'visit' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5C8D5A]"></div>
          )}
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
                <span className="text-[11px] font-bold text-gray-400">
                  (검색결과: {filteredInquiries.length}건)
                </span>
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
                  data={filteredInquiries}
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
                <span className="text-[11px] font-bold text-gray-400">
                  (검색결과: {filteredVisitReservations.length}건)
                </span>
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
                  data={filteredVisitReservations}
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
