'use client';

import React, { useState } from 'react';
import BurdenRateHeader from './BurdenRateHeader';
import BurdenRateResidentCard from './BurdenRateResidentCard';
import BurdenRateHistoryTable from './BurdenRateHistoryTable';
import BurdenRateModal from './BurdenRateModals';

/**
 * [Main Page] 본인부담률 자격 및 이력 관리 센터
 * 아가페 그린(#5C8D5A) 테마 기반의 고밀도 재무 행정 관제 화면
 */
export default function BurdenRateManagementPage() {
  // 1. 데이터 상태 관리 (Mock Data)
  const [selectedResidentId, setSelectedResidentId] = useState('R001');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. 기초 데이터 정의
  const mockResidents = [
    { id: 'R001', name: '김영희', birth: '1945-03-15', age: 79, admissionDate: '2023-01-01' },
    { id: 'R002', name: '박민수', birth: '1944-08-21', age: 80, admissionDate: '2022-09-15' },
  ];

  const burdenRateHistory = [
    {
      id: 'H001',
      residentId: 'R001',
      startDate: '2024-01-01',
      endDate: null,
      rateName: '15% (보험료 하위 50%)',
      rate: 15,
      reason: '소득 재판정 결과 건강보험료 하위 50% 경감 대상 확인',
      createdBy: '김사회복지사',
      createdAt: '2024-01-01 10:30',
    },
    {
      id: 'H002',
      residentId: 'R001',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      rateName: '6% (의료급여 수급권자)',
      rate: 6,
      reason: '입소 시 의료급여 수급권자 확인',
      createdBy: '이관리자',
      createdAt: '2023-01-01 09:12',
    },
  ];

  // 3. UI 상태 바인딩
  const selectedResident = mockResidents.find(r => r.id === selectedResidentId);
  const currentRate = burdenRateHistory.find(h => h.residentId === selectedResidentId && h.endDate === null);
  const history = burdenRateHistory.filter(h => h.residentId === selectedResidentId);

  // 4. 폼 데이터 초기 상태
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: null,
    rateType: '',
    rate: 0,
    rateName: '',
    reason: '',
  });

  // 5. 액션 핸들러
  const handleSave = () => {
    if (!formData.startDate || !formData.rateType || !formData.reason) {
      alert('⚠️ 모든 필수 항목(시작일, 자격 구분, 사유)을 입력해 주세요.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      alert('✅ 본인부담 자격 변경 이력이 시스템에 확정 등록되었습니다.');
      setIsModalOpen(false);
      setIsProcessing(false);
    }, 800);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 이 이력을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')) {
      alert(`✅ 삭제 완료 - ID: ${id}`);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* [상단] 통합 헤더: 리팩토링된 BurdenRateHeader 적용 */}
      <BurdenRateHeader
        selectedResidentName={selectedResident?.name || null}
        isProcessing={isProcessing}
        onNewRecord={() => setIsModalOpen(true)}
      />

      {/* [중단] 메인 워크스페이스: 스크롤 영역 */}
      <main className="custom-scrollbar flex-1 overflow-y-auto p-6">
        <div className="animate-in fade-in mx-auto max-w-7xl space-y-6 duration-500">
          {/* A. 법적 고지 및 안내 섹션 */}
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <i className="ri-information-fill text-xl text-[#5C8D5A]"></i>
              <div className="text-[12px] font-bold leading-relaxed text-emerald-800">
                <p className="mb-1 font-black">본인부담률 산정 기준 (Long-term Care Insurance Protocol)</p>
                <p>
                  • 국민기초생활보장 수급자: <span className="font-black underline">0% (면제)</span> / 의료급여
                  수급권자: <span className="font-black underline">6%</span>
                </p>
                <p>
                  • 건강보험료 순위에 따른 경감 대상: <span className="font-black">9% (하위 25%) / 15% (하위 50%)</span>{' '}
                  / 일반 대상자: <span className="font-black">20%</span>
                </p>
                <p>
                  • 자격 변동 발생 시, 입소자 정보 보호 지침에 따라 즉시 갱신하고 증빙 서류를 서류 관리 탭에
                  업로드하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>

          {/* B. 입소자 선택 섹션 (ERP 스타일) */}
          <div className="flex items-center gap-4 rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-[#5C8D5A]">
              <i className="ri-user-search-line text-xl"></i>
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                대상 수급자 선택
              </label>
              <select
                value={selectedResidentId}
                onChange={e => setSelectedResidentId(e.target.value)}
                className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 text-[14px] font-black text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              >
                {mockResidents.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} 어르신 ({r.birth})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* C. 입소자 핵심 정보 카드 */}
          {selectedResident && (
            <BurdenRateResidentCard
              resident={selectedResident}
              currentRate={currentRate ? { rateName: currentRate.rateName, rate: currentRate.rate } : null}
            />
          )}

          {/* D. 변동 이력 그리드 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 bg-[#5C8D5A]"></div>
              <h3 className="text-[14px] font-black uppercase text-gray-900">자격 변동 기록 그리드</h3>
            </div>
            <BurdenRateHistoryTable
              history={history}
              onEdit={id => alert(`이력 ID: ${id} - 수정 모달을 호출합니다.`)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {/* [하단] 시스템 상태 정보 바 */}
      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5C8D5A]"></span>
            Billing Engine Active
          </span>
          <span className="h-3 w-[1px] bg-gray-200"></span>
          <span>Security: Level 5 Financial Admin</span>
        </div>
        <div className="text-[9px] font-black uppercase italic tracking-tighter text-[#5C8D5A]">
          Agape-Care Financial Intelligence System v4.0
        </div>
      </footer>

      {/* [공통] 본인부담 자격 등록 모달 */}
      <BurdenRateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resident={selectedResident}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </div>
  );
}
