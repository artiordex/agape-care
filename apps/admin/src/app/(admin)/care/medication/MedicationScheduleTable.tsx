'use client';

export interface MedicationSchedule {
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

interface Props {
  readonly schedules: MedicationSchedule[];
  readonly selectedDate: string;
  readonly onDateChange: (date: string) => void;
  readonly isAdministered: (scheduleId: string, timing: string) => boolean;
  readonly onAdminister: (scheduleId: string, timing: string) => void;
  readonly onEdit: (schedule: MedicationSchedule) => void;
  readonly onAdd: () => void;
}

/**
 * [Component] 수급자별 투약 스케줄 관리 및 실시간 수행 현황
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 카드 레이아웃 적용
 */
export default function MedicationScheduleTable({
  schedules,
  selectedDate,
  onDateChange,
  isAdministered,
  onAdminister,
  onEdit,
  onAdd,
}: Props) {
  // 선택된 날짜에 해당하는 스케줄 필터링
  const filteredSchedules = schedules.filter(s => {
    const start = new Date(s.startDate);
    const end = new Date(s.endDate);
    const current = new Date(selectedDate);
    return current >= start && current <= end;
  });

  return (
    <div className="font-sans antialiased">
      {/* 1. 상단 컨트롤 바 */}
      <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5">
            <i className="ri-calendar-check-line text-[#5C8D5A]"></i>
            <span className="text-[12px] font-bold text-gray-700">투약 일정 기준일</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={e => onDateChange(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-bold text-gray-800 outline-none transition-all focus:border-[#5C8D5A] focus:ring-1 focus:ring-[#5C8D5A]"
          />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg bg-[#5C8D5A] px-4 py-2 text-[11px] font-black text-white shadow-md shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-add-line text-sm"></i>
          <span>새 투약 스케줄 등록</span>
        </button>
      </div>

      {/* 2. 스케줄 목록 리스트 */}
      <div className="space-y-3">
        {filteredSchedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16">
            <i className="ri-calendar-event-line mb-3 text-4xl text-gray-300"></i>
            <p className="text-[12px] font-black uppercase tracking-widest text-gray-400">
              해당 일자에 예정된 투약 스케줄이 없습니다
            </p>
          </div>
        ) : (
          filteredSchedules.map(schedule => (
            <div
              key={schedule.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#5C8D5A] hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* [좌측] 수급자 및 처방 정보 */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#5C8D5A] px-1.5 py-0.5 text-[10px] font-black text-white">
                      {schedule.residentId}
                    </span>
                    <h3 className="text-[14px] font-black text-gray-900 group-hover:text-[#5C8D5A]">
                      {schedule.residentName}
                      <span className="ml-1 text-[11px] font-medium text-gray-400">님</span>
                    </h3>
                    {schedule.notes && (
                      <span className="flex items-center gap-1 rounded bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                        <i className="ri-error-warning-fill"></i> 주의
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[12px]">
                    <div className="flex items-center gap-1.5 font-bold text-gray-700">
                      <i className="ri-capsule-line text-[#5C8D5A]"></i>
                      {schedule.medicationName}
                    </div>
                    <span className="h-3 w-[1px] bg-gray-200"></span>
                    <span className="text-gray-500">{schedule.dosage}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-medium text-gray-400">
                    <span className="flex items-center gap-1">
                      <i className="ri-calendar-line"></i>
                      {schedule.startDate} ~ {schedule.endDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-1 w-0 bg-[#5C8D5A] transition-all group-hover:w-full"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
