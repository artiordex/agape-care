
import { useState, useEffect } from 'react';

// 근무 코드 정의
const WORK_CODES = {
  S: { name: '주간', time: '07:00~19:00', hours: 12, color: 'bg-blue-100 text-blue-800 border-blue-300' },
  A: { name: '단축주간', time: '09:00~18:00', hours: 9, color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
  D: { name: '오전근무', time: '07:00~16:00', hours: 9, color: 'bg-green-100 text-green-800 border-green-300' },
  E: { name: '오후근무', time: '11:00~20:00', hours: 9, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  N: { name: '야간근무', time: '20:00~08:00', hours: 12, color: 'bg-purple-100 text-purple-800 border-purple-300' },
  연: { name: '연차', time: '-', hours: 8, color: 'bg-pink-100 text-pink-800 border-pink-300' },
  휴: { name: '휴무/비번', time: '-', hours: 0, color: 'bg-gray-100 text-gray-800 border-gray-300' },
  공: { name: '공휴일', time: '-', hours: 8, color: 'bg-red-100 text-red-800 border-red-300' },
  O: { name: '반차', time: '-', hours: 4, color: 'bg-orange-100 text-orange-800 border-orange-300' },
  교육: { name: '교육/훈련', time: '-', hours: 8, color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  출장: { name: '출장', time: '-', hours: 8, color: 'bg-teal-100 text-teal-800 border-teal-300' },
  회의: { name: '회의', time: '-', hours: 8, color: 'bg-violet-100 text-violet-800 border-violet-300' },
};

interface Staff {
  id: string;
  name: string;
  position: string;
  type: string;
  status: string;
  hireDate: string;
  annualLeave: number;
  usedLeave: number;
}

interface WorkSchedule {
  staffId: string;
  date: string;
  workType: string;
  startTime: string;
  endTime: string;
  breakTime: number;
  overtime: number;
  memo: string;
  building: string;
  floor: string;
  createdBy: string;
  createdAt: string;
}

export default function WorkScheduleCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [schedules, setSchedules] = useState<WorkSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [building, setBuilding] = useState('본관');
  const [floor, setFloor] = useState('1층');

  // ---------- 초기화 ----------
  useEffect(() => {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(yearMonth);
    loadStaffData();
    loadSchedules(yearMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- 데이터 로드 ----------
  const loadStaffData = () => {
    const saved = localStorage.getItem('admin_staff');
    if (!saved) {
      setStaffList([]);
      return;
    }
    try {
      const allStaff = JSON.parse(saved);
      const activeStaff = Array.isArray(allStaff) ? allStaff.filter((s: Staff) => s.status === '재직') : [];
      setStaffList(activeStaff);
      if (activeStaff.length > 0) setSelectedStaff(activeStaff[0]);
    } catch (e) {
      console.error('Failed to parse staff data', e);
      setStaffList([]);
    }
  };

  const loadSchedules = (month: string) => {
    const saved = localStorage.getItem(`work_schedule_detail_${month}`);
    if (!saved) {
      setSchedules([]);
      return;
    }
    try {
      setSchedules(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to parse schedules', e);
      setSchedules([]);
    }
  };

  const saveSchedules = (newSchedules: WorkSchedule[]) => {
    if (!selectedMonth) return;
    localStorage.setItem(`work_schedule_detail_${selectedMonth}`, JSON.stringify(newSchedules));
    setSchedules(newSchedules);
  };

  // ---------- 유틸 ----------
  const getDaysInMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-').map(Number);
    // month is 1‑based, Date expects month index 0‑based, day 0 gives last day of previous month
    return new Date(year, month, 0).getDate();
  };

  const getScheduleForDate = (date: string) => {
    if (!selectedStaff) return null;
    return schedules.find(s => s.staffId === selectedStaff.id && s.date === date) ?? null;
  };

  const handleDateClick = (day: number) => {
    if (!selectedMonth) return;
    const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowDetailModal(true);
  };

  const handleMonthChange = (direction: number) => {
    if (!selectedMonth) return;
    const [year, month] = selectedMonth.split('-').map(Number);
    const newDate = new Date(year, month - 1 + direction, 1);
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(newMonth);
    loadSchedules(newMonth);
  };

  // ---------- 통계 ----------
  const calculateMonthlyStats = () => {
    if (!selectedStaff) return { workDays: 0, totalHours: 0, nightCount: 0, vacation: 0, overtime: 0 };
    const staffSchedules = schedules.filter(s => s.staffId === selectedStaff.id);
    let workDays = 0;
    let totalHours = 0;
    let nightCount = 0;
    let vacation = 0;
    let overtime = 0;

    staffSchedules.forEach(schedule => {
      const workCode = WORK_CODES[schedule.workType as keyof typeof WORK_CODES];
      if (!workCode) return;
      if (workCode.hours > 0) workDays++;
      totalHours += workCode.hours;
      if (schedule.workType === 'N') nightCount++;
      if (schedule.workType === '연' || schedule.workType === 'O') vacation++;
      overtime += schedule.overtime || 0;
    });

    return { workDays, totalHours, nightCount, vacation, overtime };
  };

  const daysInMonth = selectedMonth ? getDaysInMonth(selectedMonth) : 31;
  const stats = calculateMonthlyStats();

  // ---------- 렌더 ----------
  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">근무일정 입력 (월간 달력)</h1>
        <p className="text-gray-600 text-sm">직원별 월간 근무 스케줄을 관리합니다</p>
      </div>

      {/* 컨트롤 영역 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 좌측: 직원 정보 */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="ri-user-line text-teal-600"></i>
              직원 정보
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">직원 선택</label>
                <select
                  value={selectedStaff?.id || ''}
                  onChange={e => {
                    const staff = staffList.find(s => s.id === e.target.value);
                    setSelectedStaff(staff ?? null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  {staffList.map(staff => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.position})
                    </option>
                  ))}
                </select>
              </div>

              {selectedStaff && (
                <div className="space-y-2 pt-4 border-t border-teal-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">직종</span>
                    <span className="font-medium text-gray-800">{selectedStaff.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">입사일</span>
                    <span className="font-medium text-gray-800">{selectedStaff.hireDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">잔여연차</span>
                    <span className="font-medium text-teal-600">
                      {selectedStaff.annualLeave - selectedStaff.usedLeave}일 / {selectedStaff.annualLeave}일
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-teal-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">건물/층 선택</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={building}
                    onChange={e => setBuilding(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="본관">본관</option>
                    <option value="별관">별관</option>
                  </select>
                  <select
                    value={floor}
                    onChange={e => setFloor(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="1층">1층</option>
                    <option value="2층">2층</option>
                    <option value="3층">3층</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 중앙: 월 선택 및 통계 */}
          <div className="lg:col-span-2">
            {/* 월 선택 */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => handleMonthChange(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-s-line text-2xl text-gray-600"></i>
              </button>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedMonth.split('-')[0]}년 {parseInt(selectedMonth.split('-')[1])}월
                </h2>
                <p className="text-sm text-gray-500 mt-1">근무일정</p>
              </div>
              <button
                onClick={() => handleMonthChange(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-arrow-right-s-line text-2xl text-gray-600"></i>
              </button>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="text-xs text-blue-600 font-medium mb-1">근무일수</div>
                <div className="text-2xl font-bold text-blue-700">{stats.workDays}일</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="text-xs text-green-600 font-medium mb-1">총 근무시간</div>
                <div className="text-2xl font-bold text-green-700">{stats.totalHours}h</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="text-xs text-purple-600 font-medium mb-1">야간근무</div>
                <div className="text-2xl font-bold text-purple-700">{stats.nightCount}회</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
                <div className="text-xs text-pink-600 font-medium mb-1">휴가</div>
                <div className="text-2xl font-bold text-pink-700">{stats.vacation}일</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="text-xs text-orange-600 font-medium mb-1">초과근무</div>
                <div className="text-2xl font-bold text-orange-700">{stats.overtime}h</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 달력 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 gap-0">
          {/* 요일 헤더 */}
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <div
              key={day}
              className={`p-4 text-center font-bold border-b-2 border-r border-gray-200 ${
                index === 0
                  ? 'bg-red-500 text-white'
                  : index === 6
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}

          {/* 날짜 셀 */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();
            const schedule = getScheduleForDate(dateStr);
            const workCode = schedule ? WORK_CODES[schedule.workType as keyof typeof WORK_CODES] : null;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`min-h-[120px] p-3 border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  isWeekend ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-lg font-bold ${isWeekend ? 'text-red-500' : 'text-gray-800'}`}>
                    {day}
                  </span>
                  {schedule && <i className="ri-checkbox-circle-fill text-teal-500 text-sm"></i>}
                </div>

                {workCode && schedule && (
                  <div className="space-y-1">
                    <div className={`px-2 py-1 rounded border ${workCode.color} text-xs font-medium text-center`}>
                      {schedule.workType}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {schedule.startTime} ~ {schedule.endTime}
                    </div>
                    {schedule.memo && (
                      <div className="text-xs text-gray-500 truncate" title={schedule.memo}>
                        <i className="ri-chat-3-line mr-1"></i>
                        {schedule.memo}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 근무 코드 범례 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">근무 코드 범례</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(WORK_CODES).map(([code, info]) => (
            <div key={code} className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded border text-xs font-medium ${info.color}`}>{code}</span>
              <div>
                <div className="text-xs text-gray-700 font-medium">{info.name}</div>
                <div className="text-xs text-gray-500">{info.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 입력 모달 */}
      {showDetailModal && selectedDate && selectedStaff && (
        <WorkScheduleDetailModal
          date={selectedDate}
          staff={selectedStaff}
          schedule={getScheduleForDate(selectedDate)}
          building={building}
          floor={floor}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedDate(null);
          }}
          onSave={newSchedule => {
            const existingIndex = schedules.findIndex(
              s => s.staffId === newSchedule.staffId && s.date === newSchedule.date
            );

            const updatedSchedules =
              existingIndex >= 0
                ? (() => {
                    const copy = [...schedules];
                    copy[existingIndex] = newSchedule;
                    return copy;
                  })()
                : [...schedules, newSchedule];

            saveSchedules(updatedSchedules);
            setShowDetailModal(false);
            setSelectedDate(null);
          }}
          onDelete={(date, staffId) => {
            const updated = schedules.filter(s => !(s.staffId === staffId && s.date === date));
            saveSchedules(updated);
            setShowDetailModal(false);
            setSelectedDate(null);
          }}
        />
      )}
    </div>
  );
}

// 상세 입력 모달 컴포넌트
function WorkScheduleDetailModal({
  date,
  staff,
  schedule,
  building,
  floor,
  onClose,
  onSave,
  onDelete,
}: {
  date: string;
  staff: Staff;
  schedule: WorkSchedule | null;
  building: string;
  floor: string;
  onClose: () => void;
  onSave: (schedule: WorkSchedule) => void;
  onDelete: (date: string, staffId: string) => void;
}) {
  const [formData, setFormData] = useState({
    workType: schedule?.workType || 'A',
    startTime: schedule?.startTime || '09:00',
    endTime: schedule?.endTime || '18:00',
    breakTime: schedule?.breakTime || 60,
    overtime: schedule?.overtime || 0,
    memo: schedule?.memo || '',
  });

  const handleSubmit = () => {
    const newSchedule: WorkSchedule = {
      staffId: staff.id,
      date,
      workType: formData.workType,
      startTime: formData.startTime,
      endTime: formData.endTime,
      breakTime: formData.breakTime,
      overtime: formData.overtime,
      memo: formData.memo,
      building,
      floor,
      createdBy: 'admin',
      createdAt: new Date().toISOString(),
    };
    onSave(newSchedule);
  };

  const workCode = WORK_CODES[formData.workType as keyof typeof WORK_CODES];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">근무일정 상세 입력</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6">
          {/* 기본 정보 */}
          <div className="bg-teal-50 rounded-lg p-4 mb-6 border border-teal-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">직원명:</span>
                <span className="font-bold text-gray-800 ml-2">{staff.name}</span>
              </div>
              <div>
                <span className="text-gray-600">날짜:</span>
                <span className="font-bold text-gray-800 ml-2">{date}</span>
              </div>
              <div>
                <span className="text-gray-600">직위:</span>
                <span className="font-medium text-gray-700 ml-2">{staff.position}</span>
              </div>
              <div>
                <span className="text-gray-600">위치:</span>
                <span className="font-medium text-gray-700 ml-2">{building} {floor}</span>
              </div>
            </div>
          </div>

          {/* 근무 유형 선택 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">근무 유형</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(WORK_CODES).map(([code, info]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setFormData({ ...formData, workType: code })}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    formData.workType === code
                      ? `${info.color} border-current shadow-md`
                      : 'bg-white border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{code}</div>
                  <div className="text-xs">{info.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 시간 설정 (근무가 있는 경우) */}
          {workCode && workCode.hours > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">시작 시간</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">종료 시간</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">휴게 시간 (분)</label>
                <input
                  type="number"
                  value={formData.breakTime}
                  onChange={e => setFormData({ ...formData, breakTime: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">초과 근무 (시간)</label>
                <input
                  type="number"
                  value={formData.overtime}
                  onChange={e => setFormData({ ...formData, overtime: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* 메모 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
            <textarea
              rows={3}
              value={formData.memo}
              onChange={e => setFormData({ ...formData, memo: e.target.value })}
              placeholder="특이사항, 교육 내용, 회의 주제 등을 입력하세요..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            {schedule && (
              <button
                type="button"
                onClick={() => onDelete(date, staff.id)}
                className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-delete-bin-line mr-2"></i>
                삭제
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-save-line mr-2"></i>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
