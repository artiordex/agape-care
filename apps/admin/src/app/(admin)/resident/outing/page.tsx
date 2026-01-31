'use client';

import React, { useState } from 'react';
import OutingHeader from './OutingHeader';
import OutingResidentPanel from './OutingResidentPanel';
import OutingRecordsTable from './OutingRecordsTable';
import { AddOutingModal, ReturnOutingModal } from './OutingModals';

/**
 * [Main Page] 외출·외박 통합 관제 센터
 * 아가페 그린(#5C8D5A) 테마 및 실시간 안전 모니터링 시스템
 */
export default function OutingManagementPage() {
  // 1. 데이터 및 UI 상태 관리
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 필터 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterGrade, setFilterGrade] = useState('전체');
  const [filterRoom, setFilterRoom] = useState('전체');

  // 모달 제어 상태
  const [modals, setModals] = useState({ add: false, detail: false, return: false });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // 2. 폼 데이터 상태
  const [formData, setFormData] = useState({
    type: '외출',
    departureDate: new Date().toISOString().split('T')[0],
    departureTime: '',
    expectedReturnDate: '',
    expectedReturnTime: '',
    destination: '',
    purpose: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    notes: '',
  });

  const [returnFormData, setReturnFormData] = useState({
    returnDate: new Date().toISOString().split('T')[0],
    returnTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
  });

  // 3. 핸들러: 기록 등록 및 복귀 처리
  const handleAddRecord = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert('✅ 외출 기록이 시스템에 안전하게 등록되었습니다.');
      setModals({ ...modals, add: false });
      setIsProcessing(false);
    }, 800);
  };

  const handleReturnConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert('✅ 복귀 처리가 완료되어 어르신 상태가 정상으로 업데이트되었습니다.');
      setModals({ ...modals, return: false });
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* [상단] 통합 헤더: 실시간 상태 및 전역 액션 */}
      <OutingHeader
        selectedResidentName={selectedResident?.name || null}
        isProcessing={isProcessing}
        onNewRecord={() => setModals({ ...modals, add: true })}
      />

      {/* [중단] 메인 워크스페이스: 2-Pane 레이아웃 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 입소자 필터링 패널 */}
        <OutingResidentPanel
          residents={[]} // API 연동 영역
          selectedResident={selectedResident}
          onSelectResident={setSelectedResident}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          filterGrade={filterGrade}
          onFilterGradeChange={setFilterGrade}
          filterRoom={filterRoom}
          onFilterRoomChange={setFilterRoom}
        />

        {/* 우측: 이력 그리드 관제 영역 */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
          {selectedResident ? (
            <div className="animate-in fade-in flex flex-1 flex-col overflow-hidden p-6 duration-500">
              {/* 섹션 타이틀 */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 bg-[#5C8D5A]"></div>
                  <h3 className="text-[14px] font-black uppercase text-gray-900">외출·외박 히스토리</h3>
                </div>
                <div className="text-[10px] font-bold text-gray-400">총 {0}건의 기록이 검색되었습니다.</div>
              </div>

              {/* 이력 테이블 */}
              <div className="flex-1 overflow-hidden">
                <OutingRecordsTable
                  records={[]} // 선택된 어르신의 이력 데이터
                  onViewDetail={rec => {
                    setSelectedRecord(rec);
                    setModals({ ...modals, detail: true });
                  }}
                  onEdit={rec => alert('기록 수정 모드를 활성화합니다.')}
                  onReturn={rec => {
                    setSelectedRecord(rec);
                    setModals({ ...modals, return: true });
                  }}
                />
              </div>
            </div>
          ) : (
            /* 미선택 시 대기 화면 */
            <div className="flex flex-1 flex-col items-center justify-center bg-[#f8fafc]">
              <div className="relative mb-6">
                <i className="ri-shield-user-line text-9xl text-[#5C8D5A]/10"></i>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-2 border-dashed border-[#5C8D5A]/20"></div>
                </div>
              </div>
              <h3 className="text-[15px] font-black tracking-tight text-gray-900">관제 대상을 선택하세요</h3>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                좌측 명부에서 안전 관리가 필요한 어르신을 선택해 주세요.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* [하단] 시스템 상태 바 */}
      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5C8D5A]"></span>
            Safety Monitor Active
          </span>
          <span>● Server Sync: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-tighter text-[#5C8D5A]">
          Agape-Care Emergency Response Protocol v2.1
        </div>
      </footer>

      {/* [공통] 통합 모달 시스템 */}
      <AddOutingModal
        isOpen={modals.add}
        onClose={() => setModals({ ...modals, add: false })}
        resident={selectedResident}
        formData={formData}
        setFormData={setFormData}
        onAdd={handleAddRecord}
      />

      <ReturnOutingModal
        isOpen={modals.return}
        onClose={() => setModals({ ...modals, return: false })}
        record={selectedRecord}
        formData={returnFormData}
        setFormData={setReturnFormData}
        onConfirm={handleReturnConfirm}
      />
    </div>
  );
}
