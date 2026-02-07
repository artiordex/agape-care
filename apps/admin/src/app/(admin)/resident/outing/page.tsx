/**
 * Description : OutingManagementPage.tsx - 📌 뷰 전환(관제/보고서) 기능이 추가된 통합 페이지
 * Author : Shiwoo Min
 * Date : 2026-02-06
 */

'use client';

import { useMemo, useState } from 'react';
import OutingHeader from './OutingHeader';
import { AddOutingModal, ReturnOutingModal } from './OutingModal';
import OutingRecordsTable from './OutingRecordsTable';
import OutingResidentPanel from './OutingResidentList';
import OutingAllReport from './OutingAllReport';

// JSON 데이터 import
import residentsData from '@/data/resident.json';

export default function OutingManagementPage() {
  // 1. 데이터 및 UI 상태 관리
  const [viewMode, setViewMode] = useState<'monitor' | 'report'>('monitor');
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 필터 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');

  // 📌 JSON 데이터를 기반으로 필터링된 리스트 계산
  const filteredResidents = useMemo(() => {
    return (residentsData.residents as any[])
      .map(r => ({
        id: r.id,
        name: r.personalInfo.name,
        room: r.admissionInfo.room,
        status: r.admissionInfo.status,
        gender: r.personalInfo.gender,
        grade: r.insuranceInfo.grade,
        birthDate: r.personalInfo.birthDate,
        admissionDate: r.admissionInfo.admissionDate,
      }))
      .filter((resident: any) => {
        const matchesSearch = resident.name.includes(searchTerm) || resident.room.includes(searchTerm);
        const matchesStatus = filterStatus === '전체' || resident.status === filterStatus;
        return matchesSearch && matchesStatus;
      });
  }, [searchTerm, filterStatus]);

  // 모달 제어 상태
  const [modals, setModals] = useState({ add: false, detail: false, return: false });
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // 폼 데이터 상태
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

  // 핸들러: 기록 등록 및 복귀 처리
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
      {/* [상단] 통합 헤더 */}
      <OutingHeader
        selectedResidentName={selectedResident?.name || null}
        isProcessing={isProcessing}
        onNewRecord={() => setModals({ ...modals, add: true })}
        onViewReport={() => setViewMode('report')}
      />

      {/* [중단] 메인 워크스페이스 - viewMode에 따라 조건부 렌더링 */}
      <div className="flex flex-1 overflow-hidden">
        {viewMode === 'monitor' ? (
          <>
            {/* 1. 실시간 관제 모드 (기존 UI) */}
            <OutingResidentPanel
              residents={filteredResidents}
              selectedResident={selectedResident}
              onSelectResident={setSelectedResident}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
            />

            <div className="flex flex-1 flex-col overflow-hidden bg-white">
              {selectedResident ? (
                <div className="animate-in fade-in flex flex-1 flex-col overflow-hidden p-6 duration-500">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-1 bg-[#5C8D5A]"></div>
                      <h3 className="text-[14px] font-black uppercase text-gray-900">
                        {selectedResident.name} 어르신 외출·외박 히스토리
                      </h3>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400">실시간 관제 데이터베이스 연동 중</div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <OutingRecordsTable
                      records={[]}
                      onViewDetail={rec => {
                        setSelectedRecord(rec);
                        setModals({ ...modals, detail: true });
                      }}
                      onReturn={rec => {
                        setSelectedRecord(rec);
                        setModals({ ...modals, return: true });
                      }}
                    />
                  </div>
                </div>
              ) : (
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
          </>
        ) : (
          /* 2. 전체 보고서 모드 (OutingAllReport) */
          <div className="flex flex-1 flex-col overflow-hidden bg-white">
            {/* border-b border-gray-200 클래스를 삭제했습니다 */}
            <div className="flex justify-end bg-gray-50 p-2">
              <button
                onClick={() => setViewMode('monitor')}
                className="flex items-center gap-1 rounded bg-[#7A8B9A] px-4 py-1.5 text-[12px] font-black text-white shadow-sm transition-all hover:bg-[#647481] active:scale-95"
              >
                <i className="ri-arrow-go-back-line"></i>실시간 관제 화면으로 돌아가기
              </button>
            </div>
            <OutingAllReport />
          </div>
        )}
      </div>

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
