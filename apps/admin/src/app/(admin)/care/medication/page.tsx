'use client';

import { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';

// 리팩토링된 통합 컴포넌트 임포트
import MedicationHeader from './MedicationHeader';
import MedicationStatsCards from './MedicationStatsCards';
import MedicationScheduleTable, { type MedicationSchedule } from './MedicationScheduleTable';
import MedicationListTable, { type Medication } from './MedicationListTable';
import MedicationRecordTable, { type MedicationRecord } from './MedicationRecordTable';
import MedicationFormModal from './MedicationFormModal';
import ScheduleFormModal from './ScheduleFormModal';

export default function MedicationManagementPage() {
  // 1. 관제 상태 관리
  const [activeTab, setActiveTab] = useState<'schedules' | 'medications' | 'records'>('schedules');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // 2. 데이터 엔진 상태
  const [medications, setMedications] = useState<Medication[]>([]);
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([]);
  const [records, setRecords] = useState<MedicationRecord[]>([]);
  const [residents, setResidents] = useState<any[]>([]);

  // 3. 모달 및 편집 워크플로우 상태
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<MedicationSchedule | null>(null);

  // 4. 데이터 초기 로드 (Local Storage 기반)
  useEffect(() => {
    loadMasterData();
    // 목업 데이터가 없을 경우 초기화 로직은 기존 page.tsx의 로직을 따릅니다.
  }, []);

  const loadMasterData = () => {
    const savedMeds = localStorage.getItem('admin_medications');
    const savedSchedules = localStorage.getItem('admin_medication_schedules');
    const savedRecords = localStorage.getItem('admin_medication_records');
    const savedResidents = localStorage.getItem('admin_residents');

    if (savedMeds) setMedications(JSON.parse(savedMeds));
    if (savedSchedules) setSchedules(JSON.parse(savedSchedules));
    if (savedRecords) setRecords(JSON.parse(savedRecords));
    if (savedResidents) setResidents(JSON.parse(savedResidents));
  };

  // 5. 실시간 관제 통계 계산 (Memoized)
  const stats = useMemo(() => {
    const todayRecords = records.filter(r => r.date === selectedDate);
    const activeSchedules = schedules.filter(s => {
      const start = new Date(s.startDate);
      const end = new Date(s.endDate);
      const current = new Date(selectedDate);
      return current >= start && current <= end;
    });

    const totalDoses = activeSchedules.reduce((sum, sch) => sum + sch.timing.length, 0);
    const completedDoses = todayRecords.filter(r => r.administered).length;
    const lowStockCount = medications.filter(m => m.stock <= m.minStock).length;

    return { totalDoses, completedDoses, pendingDoses: totalDoses - completedDoses, lowStockCount };
  }, [selectedDate, records, schedules, medications]);

  const lowStockMeds = medications.filter(m => m.stock <= m.minStock);
  const expiringMeds = medications.filter(m => {
    const diff = (new Date(m.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 90 && diff > 0;
  });

  // 6. 시스템 핸들러: 투약 확정 및 데이터 저장
  const handleAdminister = (scheduleId: string, timing: string) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (!schedule) return;

    const newRecord: MedicationRecord = {
      id: Date.now().toString(),
      scheduleId: schedule.id,
      residentName: schedule.residentName,
      medicationName: schedule.medicationName,
      date: selectedDate,
      timing,
      administered: true,
      administeredBy: '관리자(Agape)',
      administeredTime: new Date().toTimeString().slice(0, 5),
      notes: '정상 투약 확인됨',
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem('admin_medication_records', JSON.stringify(updated));
  };

  const isAdministered = (scheduleId: string, timing: string) => {
    return records.some(
      r => r.scheduleId === scheduleId && r.date === selectedDate && r.timing === timing && r.administered,
    );
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* A. 통합 관제 헤더 (날짜 및 출력) */}
      <MedicationHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onPrintLog={() => alert('오늘의 투약 관리 기록지를 생성합니다.')}
        onPrintStock={() => alert('약품 재고 수불 리포트를 생성합니다.')}
      />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* B. 실시간 투약 및 재고 현황판 */}
          <MedicationStatsCards
            totalDoses={stats.totalDoses}
            completedDoses={stats.completedDoses}
            pendingDoses={stats.pendingDoses}
            lowStockCount={stats.lowStockCount}
          />

          {/* C. 탭 내비게이션 영역 */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="flex border-b border-gray-100 bg-[#f8fafc] px-6 pt-4">
              <div className="flex gap-1">
                <TabButton
                  active={activeTab === 'schedules'}
                  onClick={() => setActiveTab('schedules')}
                  icon="ri-calendar-todo-line"
                  label="투약 스케줄 관제"
                />
                <TabButton
                  active={activeTab === 'medications'}
                  onClick={() => setActiveTab('medications')}
                  icon="ri-capsule-line"
                  label="약품 재고 마스터"
                />
                <TabButton
                  active={activeTab === 'records'}
                  onClick={() => setActiveTab('records')}
                  icon="ri-history-line"
                  label="수행 이력 감사"
                />
              </div>
            </div>

            {/* D. 탭별 상세 컨텐츠 영역 */}
            <div className="p-8">
              {activeTab === 'schedules' && (
                <MedicationScheduleTable
                  schedules={schedules}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  isAdministered={isAdministered}
                  onAdminister={handleAdminister}
                  onEdit={s => {
                    setEditingSchedule(s);
                    setShowScheduleModal(true);
                  }}
                  onAdd={() => {
                    setEditingSchedule(null);
                    setShowScheduleModal(true);
                  }}
                />
              )}

              {activeTab === 'medications' && (
                <MedicationListTable
                  medications={medications}
                  lowStockMedications={lowStockMeds}
                  expiringMedications={expiringMeds}
                  onEdit={m => {
                    setEditingMedication(m);
                    setShowMedicationModal(true);
                  }}
                  onAdd={() => {
                    setEditingMedication(null);
                    setShowMedicationModal(true);
                  }}
                />
              )}

              {activeTab === 'records' && (
                <MedicationRecordTable records={records} selectedDate={selectedDate} onDateChange={setSelectedDate} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* E. 시스템 모달 그룹 */}
      <MedicationFormModal
        isOpen={showMedicationModal}
        onClose={() => {
          setShowMedicationModal(false);
          setEditingMedication(null);
        }}
        onSave={data => {
          /* 저장 로직 */ setShowMedicationModal(false);
        }}
        medication={editingMedication}
      />

      <ScheduleFormModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setEditingSchedule(null);
        }}
        onSave={data => {
          /* 저장 로직 */ setShowScheduleModal(false);
        }}
        schedule={editingSchedule}
        residents={residents}
        medications={medications}
      />
    </div>
  );
}

/** [Sub] 탭 버튼 컴포넌트 (Agape-Standard) */
function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 border-b-2 px-6 py-3 text-[12px] font-black uppercase tracking-widest transition-all',
        active
          ? 'border-[#5C8D5A] bg-white text-[#5C8D5A]'
          : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-600',
      )}
    >
      <i className={clsx(icon, 'text-lg')}></i>
      {label}
    </button>
  );
}
