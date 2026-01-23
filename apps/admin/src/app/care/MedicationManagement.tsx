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

  useEffect(() => {
    loadData();
    loadResidents();
  }, []);

  const loadResidents = () => {
    const saved = localStorage.getItem('admin_residents');
    if (saved) {
      const allResidents = JSON.parse(saved);
      setResidents(allResidents.filter((r: any) => r.name));
    }
  };

  const loadData = () => {
    const savedMeds = localStorage.getItem('admin_medications');
    const savedSchedules = localStorage.getItem('admin_medication_schedules');
    const savedRecords = localStorage.getItem('admin_medication_records');

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
          notes: '식후 복용'
        }
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
          notes: '식후 30분'
        }
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

  const getTodaySchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => r.date === today);
    const activeSchedules = schedules.filter(s => {
      const start = new Date(s.startDate);
      const end = new Date(s.endDate);
      const current = new Date(today);
      return current >= start && current <= end;
    });

    const totalDoses = activeSchedules.reduce((sum, schedule) => sum + schedule.timing.length, 0);
    const completedDoses = todayRecords.filter(r => r.administered).length;
    const missedDoses = todayRecords.filter(r => !r.administered && r.notes.includes('누락')).length;

    return { totalDoses, completedDoses, missedDoses, pendingDoses: totalDoses - completedDoses };
  };

  const todayStats = getTodaySchedules();

  const getLowStockMedications = () => {
    return medications.filter(m => m.stock <= m.minStock);
  };

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
      const updated = medications.map(m => m.id === editingMedication.id ? { ...m, ...data } : m);
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
        notes: data.notes || ''
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
      const updated = schedules.map(s => s.id === editingSchedule.id ? { ...s, ...data } : s);
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
        notes: data.notes || ''
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
      timing: timing,
      administered: true,
      administeredBy: '관리자',
      administeredTime: new Date().toTimeString().slice(0, 5),
      notes: '정상 투약'
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem('admin_medication_records', JSON.stringify(updated));
  };

  const isAdministered = (scheduleId: string, timing: string) => {
    return records.some(r => 
      r.scheduleId === scheduleId && 
      r.date === selectedDate && 
      r.timing === timing && 
      r.administered
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">투약 관리</h1>
        <p className="text-gray-600 text-sm">약품 재고, 투약 스케줄, 투약 기록을 관리합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">오늘 투약 예정</p>
              <p className="text-2xl font-bold text-purple-700">{todayStats.totalDoses}회</p>
            </div>
            <i className="ri-medicine-bottle-line text-4xl text-purple-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">완료</p>
              <p className="text-2xl font-bold text-green-700">{todayStats.completedDoses}회</p>
            </div>
            <i className="ri-checkbox-circle-line text-4xl text-green-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">미완료</p>
              <p className="text-2xl font-bold text-orange-700">{todayStats.pendingDoses}회</p>
            </div>
            <i className="ri-time-line text-4xl text-orange-500"></i>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">재고 부족</p>
              <p className="text-2xl font-bold text-red-700">{getLowStockMedications().length}개</p>
            </div>
            <i className="ri-alarm-warning-line text-4xl text-red-500"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-6 py-3 font-medium transition-all cursor-pointer ${
              activeTab === 'schedules'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-calendar-check-line mr-2"></i>
            투약 스케줄
          </button>
          <button
            onClick={() => setActiveTab('medications')}
            className={`px-6 py-3 font-medium transition-all cursor-pointer ${
              activeTab === 'medications'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-capsule-line mr-2"></i>
            약품 목록
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-6 py-3 font-medium transition-all cursor-pointer ${
              activeTab === 'records'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-file-list-3-line mr-2"></i>
            투약 기록
          </button>
        </div>

        {activeTab === 'schedules' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  setEditingSchedule(null);
                  setShowScheduleModal(true);
                }}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>
                투약 스케줄 추가
              </button>
            </div>

            <div className="space-y-4">
              {schedules.filter(s => {
                const start = new Date(s.startDate);
                const end = new Date(s.endDate);
                const current = new Date(selectedDate);
                return current >= start && current <= end;
              }).map(schedule => (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{schedule.residentName}</h3>
                      <p className="text-sm text-gray-600">
                        {schedule.medicationName} - {schedule.dosage}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        처방: {schedule.prescribedBy} | {schedule.startDate} ~ {schedule.endDate}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingSchedule(schedule);
                        setShowScheduleModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {schedule.timing.map((time, index) => {
                      const administered = isAdministered(schedule.id, time);
                      return (
                        <button
                          key={index}
                          onClick={() => !administered && handleAdminister(schedule.id, time)}
                          disabled={administered}
                          className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                            administered
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          }`}
                        >
                          {time} {administered ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>

                  {schedule.notes && (
                    <p className="text-sm text-gray-600 mt-3">
                      <i className="ri-information-line mr-1"></i>
                      {schedule.notes}
                    </p>
                  )}
                </div>
              ))}

              {schedules.filter(s => {
                const start = new Date(s.startDate);
                const end = new Date(s.endDate);
                const current = new Date(selectedDate);
                return current >= start && current <= end;
              }).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <i className="ri-calendar-check-line text-5xl mb-3 block"></i>
                  <p>해당 날짜에 투약 스케줄이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                {getLowStockMedications().length > 0 && (
                  <div className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
                    <i className="ri-alarm-warning-line mr-2"></i>
                    재고 부족 약품 {getLowStockMedications().length}개
                  </div>
                )}
                {getExpiringMedications().length > 0 && (
                  <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium">
                    <i className="ri-time-line mr-2"></i>
                    유효기간 임박 {getExpiringMedications().length}개
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setEditingMedication(null);
                  setShowMedicationModal(true);
                }}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>
                약품 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">약품명</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">종류</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">용량</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">재고</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">유효기간</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">제조사</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, index) => {
                    const lowStock = med.stock <= med.minStock;
                    const expiring = (() => {
                      const today = new Date();
                      const expiry = new Date(med.expiryDate);
                      const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      return diffDays <= 90 && diffDays > 0;
                    })();

                    return (
                      <tr key={med.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{med.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{med.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{med.dosage}{med.unit}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            lowStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {med.stock}개 {lowStock && '(부족)'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{med.expiryDate}</div>
                          {expiring && (
                            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700 mt-1">
                              임박
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{med.manufacturer}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setEditingMedication(med);
                                setShowMedicationModal(true);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              <i className="ri-edit-line text-lg"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div>
            <div className="mb-6">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              {records.filter(r => r.date === selectedDate).map(record => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                        record.administered ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        <i className={`${record.administered ? 'ri-checkbox-circle-line' : 'ri-close-circle-line'} text-2xl`}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{record.residentName}</h4>
                        <p className="text-sm text-gray-600">{record.medicationName} - {record.timing}</p>
                        <p className="text-xs text-gray-500">
                          {record.administered ? `투약: ${record.administeredBy} (${record.administeredTime})` : '미투약'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {record.notes && (
                    <p className="text-sm text-gray-600 mt-2">{record.notes}</p>
                  )}
                </div>
              ))}

              {records.filter(r => r.date === selectedDate).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <i className="ri-file-list-line text-5xl mb-3 block"></i>
                  <p>해당 날짜에 투약 기록이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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

function MedicationModal({ medication, onClose, onSave }: {
  medication: Medication | null;
  onClose: () => void;
  onSave: (data: Partial<Medication>) => void;
}) {
  const [formData, setFormData] = useState({
    name: medication?.name || '',
    type: medication?.type || '',
    dosage: medication?.dosage || '',
    unit: medication?.unit || 'mg',
    stock: medication?.stock || 0,
    minStock: medication?.minStock || 0,
    expiryDate: medication?.expiryDate || '',
    manufacturer: medication?.manufacturer || '',
    notes: medication?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            {medication ? '약품 정보 수정' : '새 약품 추가'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">약품명 *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">종류 *</label>
              <input
                type="text"
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="예: 진통제, 항생제"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">용량 *</label>
                <input
                  type="text"
                  required
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-2">단위 *</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="정">정</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">재고 수량 *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">최소 재고 *</label>
              <input
                type="number"
                required
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">유효기간 *</label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제조사</label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {medication ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ScheduleModal({ schedule, residents, medications, onClose, onSave }: {
  schedule: MedicationSchedule | null;
  residents: any[];
  medications: Medication[];
  onClose: () => void;
  onSave: (data: Partial<MedicationSchedule>) => void;
}) {
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
    notes: schedule?.notes || ''
  });

  const timingOptions = ['아침', '점심', '저녁', '취침전'];

  const handleResidentChange = (residentId: string) => {
    const resident = residents.find(r => r.id === residentId);
    if (resident) {
      setFormData({
        ...formData,
        residentId: resident.id,
        residentName: resident.name
      });
    }
  };

  const handleMedicationChange = (medicationId: string) => {
    const medication = medications.find(m => m.id === medicationId);
    if (medication) {
      setFormData({
        ...formData,
        medicationId: medication.id,
        medicationName: medication.name,
        dosage: `${medication.dosage}${medication.unit}`
      });
    }
  };

  const handleTimingToggle = (time: string) => {
    setFormData({
      ...formData,
      timing: formData.timing.includes(time)
        ? formData.timing.filter(t => t !== time)
        : [...formData.timing, time]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            {schedule ? '투약 스케줄 수정' : '새 투약 스케줄 추가'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">입소자 선택 *</label>
              <select
                required
                value={formData.residentId}
                onChange={(e) => handleResidentChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="">입소자를 선택하세요</option>
                {residents.map(resident => (
                  <option key={resident.id} value={resident.id}>
                    {resident.name} (베드 {resident.bedNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">약품 선택 *</label>
              <select
                required
                value={formData.medicationId}
                onChange={(e) => handleMedicationChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="">약품을 선택하세요</option>
                {medications.map(med => (
                  <option key={med.id} value={med.id}>
                    {med.name} ({med.dosage}{med.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">용량</label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">투약 시간 *</label>
              <div className="flex flex-wrap gap-2">
                {timingOptions.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimingToggle(time)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                      formData.timing.includes(time)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">시작일 *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">종료일 *</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">처방의사</label>
              <input
                type="text"
                value={formData.prescribedBy}
                onChange={(e) => setFormData({ ...formData, prescribedBy: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">비고</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="예: 식후 30분"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {schedule ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
