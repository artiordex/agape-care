'use client';

import React, { useState } from 'react';
import ConsultationHeader from './ConsultationHeader';
import ConsultationQuarterlyTable from './ConsultationQuarterlyTable';
import ConsultationListTable from './ConsultationListTable';
import ConsultationForm from './ConsultationForm';

/**
 * [Main Page] 상담 및 면담 기록 통합 관제 센터
 * 아가페 그린(#5C8D5A) 테마 기반의 고밀도 품질 관리 화면
 */
export default function ConsultationManagementPage() {
  // 1. 상태 관리: 탭, 뷰모드, 선택된 데이터
  const [activeTab, setActiveTab] = useState<'consultation' | 'interview'>('consultation');
  const [viewMode, setViewMode] = useState<'quarterly' | 'list' | 'create' | 'detail'>('quarterly');
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);

  // 필터 및 검색 상태
  const [selectedYear, setSelectedYear] = useState(2026);
  const [searchTerm, setSearchTerm] = useState('');

  // 2. 전문 상담 기록 폼 상태
  const [formData, setFormData] = useState({
    occurredAt: new Date().toISOString().slice(0, 16),
    targetType: 'recipient',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    categoryCode: '',
    methodCode: '',
    content: '',
    actionContent: '',
  });

  // 3. 기초 행정 코드 데이터
  const categories = [
    { code: 'HEALTH', name: '건강상태' },
    { code: 'MEAL', name: '식사/영양' },
    { code: 'EMOTION', name: '정서/심리' },
    { code: 'FAMILY', name: '가족관계' },
    { code: 'ETC', name: '기타' },
  ];

  const methods = [
    { code: 'FACE', name: '대면상담' },
    { code: 'PHONE', name: '전화상담' },
    { code: 'SNS', name: 'SNS상담' },
  ];

  // 4. 핸들러: 뷰 전환 및 데이터 저장
  const handleSelectRecipient = (recipient: any) => {
    setSelectedRecipient(recipient);
    setViewMode('list');
  };

  const handleSave = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert('✅ 상담 기록이 시스템에 확정 저장되었으며, 급여 제공 기록에 반영되었습니다.');
      setViewMode('quarterly');
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* [상단] 통합 제어 헤더 */}
      <ConsultationHeader
        activeTab={activeTab}
        viewMode={viewMode}
        isProcessing={isProcessing}
        onAction={() => {
          if (viewMode === 'quarterly') setViewMode('list');
          else setViewMode('create');
        }}
        onBack={() => setViewMode('quarterly')}
      />

      {/* [중단] 메인 워크스페이스: 스크롤 영역 */}
      <main className="custom-scrollbar flex-1 overflow-y-auto p-6">
        <div className="animate-in fade-in mx-auto max-w-7xl space-y-6 duration-500">
          {/* A. 탭 네비게이션 (Agape-Green Style) */}
          {viewMode === 'quarterly' && (
            <div className="flex rounded-t-xl border-b border-gray-300 bg-white px-6 shadow-sm">
              <button
                onClick={() => setActiveTab('consultation')}
                className={`flex items-center gap-2 border-b-2 px-6 py-4 text-[13px] transition-all ${
                  activeTab === 'consultation'
                    ? 'border-[#5C8D5A] font-black text-[#5C8D5A]'
                    : 'border-transparent font-bold text-gray-400 hover:text-gray-900'
                }`}
              >
                <i className="ri-chat-voice-line text-lg"></i> 정기 상담 관리
              </button>
              <button
                onClick={() => setActiveTab('interview')}
                className={`flex items-center gap-2 border-b-2 px-6 py-4 text-[13px] transition-all ${
                  activeTab === 'interview'
                    ? 'border-[#5C8D5A] font-black text-[#5C8D5A]'
                    : 'border-transparent font-bold text-gray-400 hover:text-gray-900'
                }`}
              >
                <i className="ri-user-follow-line text-lg"></i> 초기 면담 기록
              </button>
            </div>
          )}

          {/* B. 뷰 모드별 콘텐츠 렌더링 */}
          <div className="space-y-6">
            {/* B-1. 분기별 이행 현황 뷰 */}
            {viewMode === 'quarterly' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded border border-emerald-100 bg-emerald-50 px-3 py-1">
                      <span className="text-[11px] font-black uppercase tracking-widest text-[#5C8D5A]">
                        Active Year
                      </span>
                      <span className="font-mono text-[14px] font-black text-[#5C8D5A]">{selectedYear}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="수급자 성함으로 실시간 필터링..."
                      className="w-64 rounded border border-gray-300 px-4 py-1.5 text-[12px] font-medium outline-none focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                    />
                  </div>
                  <div className="text-[11px] font-bold uppercase italic text-gray-400">Compliance Tracking Active</div>
                </div>
                <ConsultationQuarterlyTable
                  data={[]} // API 데이터 바인딩
                  onSelectRecipient={handleSelectRecipient}
                />
              </div>
            )}

            {/* B-2. 개별 상담 이력 리스트 뷰 */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                <ConsultationListTable
                  data={[]} // 선택된 수급자의 이력 데이터
                  onViewDetail={item => {
                    setSelectedConsultation(item);
                    setViewMode('detail');
                  }}
                />
              </div>
            )}

            {/* B-3. 상담 기록 서식 (작성/조회) */}
            {(viewMode === 'create' || viewMode === 'detail' || viewMode === 'edit') && (
              <ConsultationForm
                mode={viewMode as any}
                activeTab={activeTab}
                recipient={selectedRecipient}
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                methods={methods}
                onSave={handleSave}
                onCancel={() => setViewMode(selectedRecipient ? 'list' : 'quarterly')}
              />
            )}
          </div>
        </div>
      </main>

      {/* [하단] 시스템 상태 정보 바 */}
      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-5 text-[9px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-2 text-[#5C8D5A]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5C8D5A]"></span>
            Quality Assurance Monitor Active
          </span>
          <span className="h-3 w-[1px] bg-gray-200"></span>
          <span>Security: Care Compliance Encryption</span>
        </div>
        <div className="text-[9px] font-black uppercase italic tracking-tighter text-[#5C8D5A]">
          Agape-Care Record Management v3.2
        </div>
      </footer>
    </div>
  );
}
