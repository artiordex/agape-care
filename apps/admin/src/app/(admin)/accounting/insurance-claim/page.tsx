'use client';

import { useEffect, useMemo, useState } from 'react';

// 공통 컴포넌트 및 상수 Import
import ClaimActionBar from './ClaimActionBar';
import ClaimFilter from './ClaimFilter';
import ClaimModal from './ClaimModal';
import ClaimStats from './ClaimStats';
import ClaimTableView from './ClaimTableView';
import { CLAIM_STATUS, type ClaimStatusType } from './constants';

// 데이터 인터페이스 정의
interface Claim {
  id: string;
  month: string;
  residentId: string;
  residentName: string;
  grade: string;
  serviceDays: number;
  serviceAmount: number;
  copayment: number;
  insuranceAmount: number;
  status: ClaimStatusType;
  submittedDate: string;
  approvedDate: string;
  notes: string;
}

export default function InsuranceClaimPage() {
  // --- [1] 상태 관리 (State) ---
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filters, setFilters] = useState({ status: 'all', query: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingClaim, setEditingClaim] = useState<Claim | null>(null);
  const [residents, setResidents] = useState<any[]>([]);

  // --- [2] 초기 데이터 로딩 ---
  useEffect(() => {
    const savedClaims = localStorage.getItem('admin_insurance_claims');
    const savedResidents = localStorage.getItem('admin_residents');

    if (savedClaims) setClaims(JSON.parse(savedClaims));
    if (savedResidents) setResidents(JSON.parse(savedResidents));
  }, []);

  // --- [3] 데이터 필터링 및 통계 계산 (useMemo) ---
  const filteredClaims = useMemo(() => {
    return claims.filter(c => {
      const matchMonth = c.month === selectedMonth;
      const matchStatus = filters.status === 'all' || c.status === filters.status;
      const matchQuery = c.residentName.includes(filters.query);
      return matchMonth && matchStatus && matchQuery;
    });
  }, [claims, selectedMonth, filters]);

  const stats = useMemo(() => {
    return {
      totalService: filteredClaims.reduce((sum, c) => sum + c.serviceAmount, 0),
      totalCopay: filteredClaims.reduce((sum, c) => sum + c.copayment, 0),
      totalInsurance: filteredClaims.reduce((sum, c) => sum + c.insuranceAmount, 0),
      count: filteredClaims.length,
      submitted: filteredClaims.filter(c => c.status === '청구완료' || c.status === '승인완료').length,
      approved: filteredClaims.filter(c => c.status === '승인완료').length,
    };
  }, [filteredClaims]);

  // --- [4] 주요 액션 핸들러 ---
  const handleSaveClaim = (claimData: Partial<Claim>) => {
    let updated;
    if (editingClaim) {
      updated = claims.map(c => (c.id === editingClaim.id ? { ...c, ...claimData } : c));
    } else {
      const newClaim: Claim = {
        id: Date.now().toString(),
        status: CLAIM_STATUS.DRAFT,
        submittedDate: '',
        approvedDate: '',
        ...(claimData as Claim),
      };
      updated = [...claims, newClaim];
    }
    setClaims(updated);
    localStorage.setItem('admin_insurance_claims', JSON.stringify(updated));
    setShowModal(false);
    setEditingClaim(null);
  };

  const handleStatusChange = (id: string, newStatus: ClaimStatusType) => {
    const updated = claims.map(c => {
      if (c.id === id) {
        const updates: any = { status: newStatus };
        if (newStatus === CLAIM_STATUS.SUBMITTED) updates.submittedDate = new Date().toISOString().split('T')[0];
        if (newStatus === CLAIM_STATUS.APPROVED) updates.approvedDate = new Date().toISOString().split('T')[0];
        return { ...c, ...updates };
      }
      return c;
    });
    setClaims(updated);
    localStorage.setItem('admin_insurance_claims', JSON.stringify(updated));
  };

  const generateAllClaims = () => {
    if (!confirm(`${selectedMonth}월 대상자들의 청구 데이터를 자동 생성하시겠습니까?`)) return;
    const existingIds = filteredClaims.map(c => c.residentId);
    const newEntries = residents
      .filter(r => !existingIds.includes(r.id))
      .map(r => ({
        id: Date.now().toString() + r.id,
        month: selectedMonth,
        residentId: r.id,
        residentName: r.name,
        grade: r.grade || '미정',
        serviceDays: 30,
        serviceAmount: 2000000,
        copayment: 400000,
        insuranceAmount: 1600000,
        status: CLAIM_STATUS.DRAFT,
        submittedDate: '',
        approvedDate: '',
        notes: '',
      }));
    setClaims([...claims, ...newEntries]);
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      {/* 1. 페이지 헤더 */}
      <header className="flex flex-col border-b border-gray-300 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#1a5a96] p-2 text-white shadow-md">
            <i className="ri-shield-user-line text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-black leading-none text-gray-900">장기요양보험 청구 관리</h1>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Insurance Claim & Billing System
            </p>
          </div>
        </div>
      </header>

      {/* 2. 본문 컨테이너 */}
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
        {/* 요약 현황판 */}
        <ClaimStats stats={stats} />

        {/* 메인 리스트 영역 */}
        <div className="flex flex-1 flex-col overflow-hidden border border-gray-300 bg-white shadow-sm">
          {/* 필터 바 */}
          <ClaimFilter
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            filters={filters}
            setFilters={setFilters}
          />

          {/* 일괄 액션 바 */}
          <ClaimActionBar
            onAdd={() => {
              setEditingClaim(null);
              setShowModal(true);
            }}
            onGenerateAll={generateAllClaims}
            onExport={() => alert('CSV 추출 기능 준비 중')}
            totalCount={filteredClaims.length}
          />

          {/* 데이터 테이블 (스크롤 영역) */}
          <section className="flex-1 overflow-y-auto">
            <ClaimTableView
              data={filteredClaims}
              onStatusChange={handleStatusChange}
              onEdit={(c: Claim) => {
                setEditingClaim(c);
                setShowModal(true);
              }}
              onDelete={(id: string) => setClaims(claims.filter(c => c.id !== id))}
            />
          </section>

          {/* 하단 헬퍼 바 */}
          <footer className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] font-bold uppercase text-gray-400">
            <span>System Status: Operational</span>
            <span className="text-[#1a5a96]">Last Updated: {new Date().toLocaleTimeString()}</span>
          </footer>
        </div>
      </div>

      {/* --- [3] 모달 레이어 --- */}
      {showModal && (
        <ClaimModal
          claim={editingClaim}
          residents={residents}
          selectedMonth={selectedMonth}
          onClose={() => {
            setShowModal(false);
            setEditingClaim(null);
          }}
          onSave={handleSaveClaim}
        />
      )}
    </main>
  );
}
