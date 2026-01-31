'use client';

import { useEffect, useState } from 'react';
import type { Medication } from './MedicationListTable';
import type { MedicationSchedule } from './MedicationScheduleTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MedicationSchedule>) => void;
  schedule?: MedicationSchedule | null;
  residents: any[];
  medications: Medication[];
}

export default function ScheduleFormModal({ isOpen, onClose, onSave, schedule, residents, medications }: Props) {
  const [formData, setFormData] = useState({
    residentId: '',
    residentName: '',
    medicationId: '',
    medicationName: '',
    dosage: '',
    timing: [] as string[],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    prescribedBy: '',
    notes: '',
  });

  const timingOptions = ['아침', '점심', '저녁', '취침전'];

  useEffect(() => {
    if (schedule) {
      setFormData({
        residentId: schedule.residentId,
        residentName: schedule.residentName,
        medicationId: schedule.medicationId,
        medicationName: schedule.medicationName,
        dosage: schedule.dosage,
        timing: schedule.timing,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        prescribedBy: schedule.prescribedBy,
        notes: schedule.notes,
      });
    } else {
      setFormData({
        residentId: '',
        residentName: '',
        medicationId: '',
        medicationName: '',
        dosage: '',
        timing: [],
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        prescribedBy: '',
        notes: '',
      });
    }
  }, [schedule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.residentId) {
      alert('수급자를 선택하세요');
      return;
    }
    if (!formData.medicationId) {
      alert('약품을 선택하세요');
      return;
    }
    if (formData.timing.length === 0) {
      alert('투약 시간을 하나 이상 선택하세요');
      return;
    }
    if (!formData.startDate) {
      alert('시작일을 입력하세요');
      return;
    }
    if (!formData.endDate) {
      alert('종료일을 입력하세요');
      return;
    }

    onSave(formData);
  };

  const handleResidentChange = (residentId: string) => {
    const resident = residents.find(r => r.id === residentId);
    if (resident) {
      setFormData({
        ...formData,
        residentId: resident.id,
        residentName: resident.name,
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
        dosage: `${medication.dosage}${medication.unit}`,
      });
    }
  };

  const toggleTiming = (time: string) => {
    setFormData({
      ...formData,
      timing: formData.timing.includes(time) ? formData.timing.filter(t => t !== time) : [...formData.timing, time],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white font-sans antialiased shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between bg-[#5C8D5A] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <i className={schedule ? 'ri-edit-box-line' : 'ri-add-box-line text-xl'}></i>
            <h2 className="text-[13px] font-black uppercase tracking-widest">
              {schedule ? '투약 스케줄 수정' : '새 투약 스케줄 등록'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1 transition-all hover:bg-white/20 hover:text-white">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 내용 */}
        <form onSubmit={handleSubmit} className="custom-scrollbar max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-6">
            {/* 기본 정보 그룹 */}
            <div className="rounded-lg border border-gray-100 bg-[#f8fafc] p-4">
              <h3 className="mb-3 text-[11px] font-black uppercase text-gray-500">기본 처방 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* 수급자 선택 */}
                <div>
                  <label
                    htmlFor="resident-select"
                    className="mb-1.5 block text-[10px] font-bold uppercase text-gray-500"
                  >
                    수급자 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="resident-select"
                    value={formData.residentId}
                    onChange={e => handleResidentChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                  >
                    <option value="">수급자를 선택하세요</option>
                    {residents.map(resident => (
                      <option key={resident.id} value={resident.id}>
                        {resident.name} ({resident.bedNumber || resident.room}호)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 약품 선택 */}
                <div>
                  <label
                    htmlFor="medication-select"
                    className="mb-1.5 block text-[10px] font-bold uppercase text-gray-500"
                  >
                    약품 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="medication-select"
                    value={formData.medicationId}
                    onChange={e => handleMedicationChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                  >
                    <option value="">약품을 선택하세요</option>
                    {medications.map(medication => (
                      <option key={medication.id} value={medication.id}>
                        {medication.name} ({medication.dosage}
                        {medication.unit})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 투약 일정 그룹 */}
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <h3 className="mb-3 text-[11px] font-black uppercase text-gray-500">투약 일정 및 시간</h3>
              <div className="space-y-4">
                {/* 시작일 & 종료일 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-date" className="mb-1.5 block text-[10px] font-bold uppercase text-gray-500">
                      시작일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={formData.startDate}
                      onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="mb-1.5 block text-[10px] font-bold uppercase text-gray-500">
                      종료일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      value={formData.endDate}
                      onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                    />
                  </div>
                  {/* 처방의사 */}
                  <div className="col-span-2">
                    <label
                      htmlFor="prescribed-by"
                      className="mb-1.5 block text-[10px] font-bold uppercase text-gray-500"
                    >
                      처방의사
                    </label>
                    <input
                      id="prescribed-by"
                      type="text"
                      value={formData.prescribedBy}
                      onChange={e => setFormData({ ...formData, prescribedBy: e.target.value })}
                      placeholder="예: 김의사 (아가페 병원)"
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
                    />
                  </div>
                </div>

                {/* 투약 시간 */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase text-gray-500">
                    투약 시간 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timingOptions.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleTiming(time)}
                        className={`min-w-[70px] rounded-lg border px-4 py-2.5 text-[12px] font-black transition-all active:scale-95 ${
                          formData.timing.includes(time)
                            ? 'border-[#5C8D5A] bg-emerald-50 text-[#5C8D5A] shadow-sm'
                            : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 비고 */}
            <div className="rounded-lg border border-gray-100 bg-[#f8fafc] p-4">
              <label htmlFor="notes" className="mb-1.5 block text-[10px] font-bold uppercase text-gray-500">
                특이사항 및 메모
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="투약 시 주의사항이나 특이사항을 입력하세요 (예: 식후 30분, 공복 복용 불가)"
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
              ></textarea>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-[12px] font-black text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#5C8D5A] px-8 py-2.5 text-[12px] font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
            >
              {schedule ? '정보 수정' : '스케줄 추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
