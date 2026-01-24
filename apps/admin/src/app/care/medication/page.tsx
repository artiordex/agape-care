'use client';

import { useState, useEffect } from 'react';

interface Medication {
  id: string;
  name: string;
  type: string;
  dosage: string;
  unit: string;
  stock: number;
  minStock: number;
  expiryDate: string;
  manufacturer: string;
  notes: string;
}

interface MedicationSchedule {
  id: string;
  residentId: string;
  residentName: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  timing: string[];
  startDate: string;
  endDate: string;
  prescribedBy: string;
  notes: string;
}

interface MedicationRecord {
  id: string;
  scheduleId: string;
  residentName: string;
  medicationName: string;
  date: string;
  timing: string;
  administered: boolean;
  administeredBy: string;
  administeredTime: string;
  notes: string;
}

export default function MedicationManagement() {
  const [activeTab, setActiveTab] = useState<'medications' | 'schedules' | 'records'>('schedules');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([]);
  const [records, setRecords] = useState<MedicationRecord[]>([]);
  const [residents, setResidents] = useState<any[]>([]);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<MedicationSchedule | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // 최초 로딩
  useEffect(() => {
    loadData();
    loadResidents();
  }, []);

  const loadResidents = () => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('admin_residents') : null;

    if (saved) {
      const allResidents = JSON.parse(saved);
      setResidents(allResidents.filter((r: any) => r.name));
    }
  };

  const loadData = () => {
    const savedMeds = typeof window !== 'undefined' ? localStorage.getItem('admin_medications') : null;

    const savedSchedules = typeof window !== 'undefined' ? localStorage.getItem('admin_medication_schedules') : null;

    const savedRecords = typeof window !== 'undefined' ? localStorage.getItem('admin_medication_records') : null;

    if (savedMeds) setMedications(JSON.parse(savedMeds));
    else {
      const initialMeds: Medication[] = [
        {
          id: '1',
          name: '아스피린',
          type: '진통제',
          dosage: '100',
          unit: 'mg',
          stock: 500,
          minStock: 100,
          expiryDate: '2025-12-31',
          manufacturer: '제약회사A',
          notes: '식후 복용',
        },
      ];
      setMedications(initialMeds);
      localStorage.setItem('admin_medications', JSON.stringify(initialMeds));
    }

    if (savedSchedules) setSchedules(JSON.parse(savedSchedules));
    else {
      const initialSchedules: MedicationSchedule[] = [
        {
          id: '1',
          residentId: '1',
          residentName: '김순자',
          medicationId: '1',
          medicationName: '아스피린',
          dosage: '100mg',
          timing: ['아침', '저녁'],
          startDate: '2025-01-01',
          endDate: '2025-12-31',
          prescribedBy: '김의사',
          notes: '식후 30분',
        },
      ];
      setSchedules(initialSchedules);
      localStorage.setItem('admin_medication_schedules', JSON.stringify(initialSchedules));
    }

    if (savedRecords) setRecords(JSON.parse(savedRecords));
    else {
      const initialRecords: MedicationRecord[] = [];
      setRecords(initialRecords);
      localStorage.setItem('admin_medication_records', JSON.stringify(initialRecords));
    }
  };

  const getTodayStats = () => {
    const today = selectedDate;
    const todayRecords = records.filter(r => r.date === today);

    const activeSchedules = schedules.filter(s => {
      const start = new Date(s.startDate);
      const end = new Date(s.endDate);
      const current = new Date(today);
      return current >= start && current <= end;
    });

    const totalDoses = activeSchedules.reduce((sum, sch) => sum + sch.timing.length, 0);
    const completedDoses = todayRecords.filter(r => r.administered).length;

    return {
      totalDoses,
      completedDoses,
      pendingDoses: totalDoses - completedDoses,
    };
  };

  const todayStats = getTodayStats();

  const getLowStockMedications = () => medications.filter(m => m.stock <= m.minStock);

  const getExpiringMedications = () => {
    const today = new Date();
    return medications.filter(m => {
      const expiry = new Date(m.expiryDate);
      const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 90 && diffDays > 0;
    });
  };

  const handleMedicationSave = (data: Partial<Medication>) => {
    if (editingMedication) {
      const updated = medications.map(m => (m.id === editingMedication.id ? { ...m, ...data } : m));
      setMedications(updated);
      localStorage.setItem('admin_medications', JSON.stringify(updated));
    } else {
      const newMed: Medication = {
        id: Date.now().toString(),
        name: data.name || '',
        type: data.type || '',
        dosage: data.dosage || '',
        unit: data.unit || 'mg',
        stock: data.stock || 0,
        minStock: data.minStock || 0,
        expiryDate: data.expiryDate || '',
        manufacturer: data.manufacturer || '',
        notes: data.notes || '',
      };
      const updated = [...medications, newMed];
      setMedications(updated);
      localStorage.setItem('admin_medications', JSON.stringify(updated));
    }

    setShowMedicationModal(false);
    setEditingMedication(null);
  };

  const handleScheduleSave = (data: Partial<MedicationSchedule>) => {
    if (editingSchedule) {
      const updated = schedules.map(s => (s.id === editingSchedule.id ? { ...s, ...data } : s));
      setSchedules(updated);
      localStorage.setItem('admin_medication_schedules', JSON.stringify(updated));
    } else {
      const newSchedule: MedicationSchedule = {
        id: Date.now().toString(),
        residentId: data.residentId || '',
        residentName: data.residentName || '',
        medicationId: data.medicationId || '',
        medicationName: data.medicationName || '',
        dosage: data.dosage || '',
        timing: data.timing || [],
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        prescribedBy: data.prescribedBy || '',
        notes: data.notes || '',
      };
      const updated = [...schedules, newSchedule];
      setSchedules(updated);
      localStorage.setItem('admin_medication_schedules', JSON.stringify(updated));
    }

    setShowScheduleModal(false);
    setEditingSchedule(null);
  };

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
      administeredBy: '관리자',
      administeredTime: new Date().toTimeString().slice(0, 5),
      notes: '정상 투약',
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

  // --------------------------------------------------------
  //  UI 렌더링
  // --------------------------------------------------------
  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">투약 관리</h1>
        <p className="text-sm text-gray-600">약품, 스케줄, 투약 기록을 관리합니다.</p>
      </div>

      {/* 오늘 요약 카드 */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard
          title="오늘 투약 예정"
          value={`${todayStats.totalDoses}회`}
          color="purple"
          icon="ri-medicine-bottle-line"
        />

        <StatCard title="완료" value={`${todayStats.completedDoses}회`} color="green" icon="ri-checkbox-circle-line" />

        <StatCard title="미완료" value={`${todayStats.pendingDoses}회`} color="orange" icon="ri-time-line" />

        <StatCard
          title="재고 부족"
          value={`${getLowStockMedications().length}개`}
          color="red"
          icon="ri-alarm-warning-line"
        />
      </div>

      {/* 탭 버튼 */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 flex gap-3 border-b">
          <TabButton
            active={activeTab === 'schedules'}
            label="투약 스케줄"
            icon="ri-calendar-check-line"
            onClick={() => setActiveTab('schedules')}
          />
          <TabButton
            active={activeTab === 'medications'}
            label="약품 목록"
            icon="ri-capsule-line"
            onClick={() => setActiveTab('medications')}
          />
          <TabButton
            active={activeTab === 'records'}
            label="투약 기록"
            icon="ri-file-list-3-line"
            onClick={() => setActiveTab('records')}
          />
        </div>

        {/* 스케줄 */}
        {activeTab === 'schedules' && (
          <ScheduleList
            schedules={schedules}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            isAdministered={isAdministered}
            handleAdminister={handleAdminister}
            openScheduleModal={sch => {
              setEditingSchedule(sch);
              setShowScheduleModal(true);
            }}
          />
        )}

        {/* 약품 목록 */}
        {activeTab === 'medications' && (
          <MedicationList
            medications={medications}
            lowStock={getLowStockMedications()}
            expiring={getExpiringMedications()}
            openModal={med => {
              setEditingMedication(med);
              setShowMedicationModal(true);
            }}
          />
        )}

        {/* 투약 기록 */}
        {activeTab === 'records' && (
          <RecordList records={records} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        )}
      </div>

      {/* 모달 */}
      {showMedicationModal && (
        <MedicationModal
          medication={editingMedication}
          onClose={() => {
            setShowMedicationModal(false);
            setEditingMedication(null);
          }}
          onSave={handleMedicationSave}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal
          schedule={editingSchedule}
          residents={residents}
          medications={medications}
          onClose={() => {
            setShowScheduleModal(false);
            setEditingSchedule(null);
          }}
          onSave={handleScheduleSave}
        />
      )}
    </div>
  );
}

/* ------------------------
   UI 컴포넌트들
-------------------------*/

function StatCard({ title, value, color, icon }: any) {
  const colors: any = {
    purple: 'from-purple-50 to-purple-100 text-purple-700',
    green: 'from-green-50 to-green-100 text-green-700',
    orange: 'from-orange-50 to-orange-100 text-orange-700',
    red: 'from-red-50 to-red-100 text-red-700',
  };

  const iconColors: any = {
    purple: 'text-purple-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    red: 'text-red-500',
  };

  return (
    <div className={`bg-gradient-to-br p-4 ${colors[color]} rounded-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <i className={`${icon} text-4xl ${iconColors[color]}`}></i>
      </div>
    </div>
  );
}

function TabButton({ active, label, icon, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 font-medium ${
        active ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <i className={`${icon} mr-2`}></i>
      {label}
    </button>
  );
}

/* ------------------------
   스케줄 영역
-------------------------*/

function ScheduleList({
  schedules,
  selectedDate,
  setSelectedDate,
  isAdministered,
  handleAdminister,
  openScheduleModal,
}: any) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="rounded-lg border px-4 py-2"
        />
        <button onClick={() => openScheduleModal(null)} className="rounded-lg bg-teal-500 px-6 py-2 text-white">
          <i className="ri-add-line mr-2"></i>스케줄 추가
        </button>
      </div>

      <div className="space-y-4">
        {schedules
          .filter((s: any) => {
            const start = new Date(s.startDate);
            const end = new Date(s.endDate);
            const cur = new Date(selectedDate);
            return cur >= start && cur <= end;
          })
          .map((schedule: any) => (
            <div key={schedule.id} className="rounded-lg border p-4">
              <div className="mb-3 flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">{schedule.residentName}</h3>
                  <p className="text-sm">
                    {schedule.medicationName} / {schedule.dosage}
                  </p>
                  <p className="text-xs text-gray-500">
                    {schedule.startDate} ~ {schedule.endDate}
                  </p>
                </div>
                <button className="text-blue-600" onClick={() => openScheduleModal(schedule)}>
                  <i className="ri-edit-line text-xl"></i>
                </button>
              </div>

              {/* 투약 시간 버튼 */}
              <div className="flex flex-wrap gap-2">
                {schedule.timing.map((time: string) => {
                  const already = isAdministered(schedule.id, time);
                  return (
                    <button
                      key={time}
                      disabled={already}
                      onClick={() => handleAdminister(schedule.id, time)}
                      className={`rounded px-4 py-2 ${
                        already ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {time} {already ? '✓' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

/* ------------------------
   약품 목록
-------------------------*/

function MedicationList({ medications, lowStock, expiring, openModal }: any) {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <div className="flex gap-3">
          {lowStock.length > 0 && (
            <div className="rounded bg-red-50 px-4 py-2 text-red-700">
              <i className="ri-error-warning-line mr-1"></i>
              재고 부족 {lowStock.length}개
            </div>
          )}
          {expiring.length > 0 && (
            <div className="rounded bg-orange-50 px-4 py-2 text-orange-700">
              <i className="ri-time-line mr-1"></i>
              유효기간 임박 {expiring.length}개
            </div>
          )}
        </div>

        <button className="rounded bg-teal-500 px-6 py-2 text-white" onClick={() => openModal(null)}>
          <i className="ri-add-line mr-2"></i>약품 추가
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-3">약품명</th>
            <th className="px-4 py-3">종류</th>
            <th className="px-4 py-3">용량</th>
            <th className="px-4 py-3">재고</th>
            <th className="px-4 py-3">유효기간</th>
            <th className="px-4 py-3">관리</th>
          </tr>
        </thead>

        <tbody>
          {medications.map((m: any) => (
            <tr key={m.id} className="border-b">
              <td className="px-4 py-3">{m.name}</td>
              <td className="px-4 py-3">{m.type}</td>
              <td className="px-4 py-3">
                {m.dosage}
                {m.unit}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded px-2 py-1 text-sm ${
                    m.stock <= m.minStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {m.stock}개
                </span>
              </td>
              <td className="px-4 py-3">{m.expiryDate}</td>
              <td className="px-4 py-3">
                <button className="text-blue-600" onClick={() => openModal(m)}>
                  <i className="ri-edit-line"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------
   투약 기록
-------------------------*/

function RecordList({ records, selectedDate, setSelectedDate }: any) {
  const filtered = records.filter((r: any) => r.date === selectedDate);

  return (
    <div>
      <div className="mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="rounded-lg border px-4 py-2"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((r: any) => (
          <div key={r.id} className="rounded-lg border p-4">
            <div className="flex gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  r.administered ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <i className={`${r.administered ? 'ri-checkbox-circle-line' : 'ri-close-circle-line'} text-2xl`}></i>
              </div>

              <div>
                <p className="font-bold">{r.residentName}</p>
                <p className="text-sm text-gray-600">
                  {r.medicationName} - {r.timing}
                </p>
                <p className="text-xs text-gray-500">
                  {r.administered ? `${r.administeredBy} (${r.administeredTime})` : '미투약'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <i className="ri-file-list-line mb-3 text-5xl"></i>
            <p>투약 기록이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------
   약품 모달 (MedicationModal)
-------------------------*/

function MedicationModal({ medication, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: medication?.name || '',
    type: medication?.type || '',
    dosage: medication?.dosage || '',
    unit: medication?.unit || 'mg',
    stock: medication?.stock || 0,
    minStock: medication?.minStock || 0,
    expiryDate: medication?.expiryDate || '',
    manufacturer: medication?.manufacturer || '',
    notes: medication?.notes || '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <ModalLayout title={medication ? '약품 정보 수정' : '새 약품 추가'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="약품명 *"
          required
          value={formData.name}
          onChange={(v: any) => setFormData({ ...formData, name: v })}
        />

        <InputField
          label="종류 *"
          required
          value={formData.type}
          onChange={(v: any) => setFormData({ ...formData, type: v })}
        />

        <div className="grid grid-cols-3 gap-3">
          <InputField
            label="용량 *"
            required
            value={formData.dosage}
            onChange={(v: any) => setFormData({ ...formData, dosage: v })}
          />

          <SelectField
            label="단위"
            value={formData.unit}
            options={['mg', 'g', 'ml', '정']}
            onChange={(v: any) => setFormData({ ...formData, unit: v })}
          />
        </div>

        <InputField
          label="재고 수량 *"
          type="number"
          value={formData.stock}
          onChange={(v: any) => setFormData({ ...formData, stock: parseInt(v) })}
        />

        <InputField
          label="최소 재고 *"
          type="number"
          value={formData.minStock}
          onChange={(v: any) => setFormData({ ...formData, minStock: parseInt(v) })}
        />

        <InputField
          label="유효기간 *"
          type="date"
          value={formData.expiryDate}
          onChange={(v: any) => setFormData({ ...formData, expiryDate: v })}
        />

        <InputField
          label="제조사"
          value={formData.manufacturer}
          onChange={(v: any) => setFormData({ ...formData, manufacturer: v })}
        />

        <TextareaField
          label="비고"
          value={formData.notes}
          onChange={(v: any) => setFormData({ ...formData, notes: v })}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onClose} className="rounded-lg border px-6 py-2">
            취소
          </button>

          <button type="submit" className="rounded-lg bg-teal-500 px-6 py-2 text-white">
            {medication ? '수정하기' : '추가하기'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

/* ------------------------
   스케줄 모달
-------------------------*/

function ScheduleModal({ schedule, residents, medications, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    residentId: schedule?.residentId || '',
    residentName: schedule?.residentName || '',
    medicationId: schedule?.medicationId || '',
    medicationName: schedule?.medicationName || '',
    dosage: schedule?.dosage || '',
    timing: schedule?.timing || [],
    startDate: schedule?.startDate || new Date().toISOString().split('T')[0],
    endDate: schedule?.endDate || '',
    prescribedBy: schedule?.prescribedBy || '',
    notes: schedule?.notes || '',
  });

  const timingOptions = ['아침', '점심', '저녁', '취침전'];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <ModalLayout title={schedule ? '스케줄 수정' : '새 스케줄 추가'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectField
          label="입소자 *"
          required
          value={formData.residentId}
          options={residents.map((r: any) => ({
            label: `${r.name} (${r.bedNumber}호)`,
            value: r.id,
          }))}
          onChange={(v: any) => {
            const resident = residents.find((r: any) => r.id === v);
            if (resident) {
              setFormData({
                ...formData,
                residentId: resident.id,
                residentName: resident.name,
              });
            }
          }}
        />

        <SelectField
          label="약품 선택 *"
          required
          value={formData.medicationId}
          options={medications.map((m: any) => ({
            label: `${m.name} (${m.dosage}${m.unit})`,
            value: m.id,
          }))}
          onChange={(v: any) => {
            const med = medications.find((m: any) => m.id === v);
            if (med) {
              setFormData({
                ...formData,
                medicationId: med.id,
                medicationName: med.name,
                dosage: `${med.dosage}${med.unit}`,
              });
            }
          }}
        />

        {/* 투약 시간 */}
        <div>
          <label className="mb-1 block text-sm">투약 시간 *</label>
          <div className="flex flex-wrap gap-2">
            {timingOptions.map(t => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    timing: formData.timing.includes(t)
                      ? formData.timing.filter((x: any) => x !== t)
                      : [...formData.timing, t],
                  })
                }
                className={`rounded px-4 py-2 ${
                  formData.timing.includes(t) ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <InputField
          type="date"
          label="시작일 *"
          required
          value={formData.startDate}
          onChange={(v: any) => setFormData({ ...formData, startDate: v })}
        />

        <InputField
          type="date"
          label="종료일 *"
          required
          value={formData.endDate}
          onChange={(v: any) => setFormData({ ...formData, endDate: v })}
        />

        <InputField
          label="처방의사"
          value={formData.prescribedBy}
          onChange={(v: any) => setFormData({ ...formData, prescribedBy: v })}
        />

        <TextareaField
          label="비고"
          value={formData.notes}
          onChange={(v: any) => setFormData({ ...formData, notes: v })}
          placeholder="예: 식후 30분"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border px-6 py-2">
            취소
          </button>

          <button type="submit" className="rounded-lg bg-teal-500 px-6 py-2 text-white">
            {schedule ? '수정하기' : '추가하기'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

/* ------------------------
   공통 컴포넌트들
-------------------------*/

function ModalLayout({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* header */}
        <div className="sticky top-0 flex justify-between border-b bg-white px-6 py-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose}>
            <i className="ri-close-line text-2xl text-gray-500"></i>
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', required = false }: any) {
  return (
    <div>
      <label className="mb-1 block text-sm">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border px-4 py-2"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder }: any) {
  return (
    <div>
      <label className="mb-1 block text-sm">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-lg border px-4 py-2"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required }: any) {
  return (
    <div>
      <label className="mb-1 block text-sm">{label}</label>
      <select
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border px-4 py-2"
      >
        <option value="">선택하세요</option>
        {options.map((o: any) => (
          <option key={o.value || o} value={o.value || o}>
            {o.label || o}
          </option>
        ))}
      </select>
    </div>
  );
}
