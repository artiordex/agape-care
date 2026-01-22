
import { useState, useEffect } from 'react';

// 근무 코드 정의
const WORK_CODES = {
  S: { name: '주간', time: '07:00~19:00', hours: 12, color: 'bg-blue-100 text-blue-800' },
  A: { name: '단축주간', time: '09:00~18:00', hours: 9, color: 'bg-cyan-100 text-cyan-800' },
  D: { name: '오전근무', time: '07:00~16:00', hours: 9, color: 'bg-green-100 text-green-800' },
  E: { name: '오후근무', time: '11:00~20:00', hours: 9, color: 'bg-yellow-100 text-yellow-800' },
  N: { name: '야간근무', time: '20:00~08:00', hours: 12, color: 'bg-purple-100 text-purple-800' },
  연: { name: '연차', time: '-', hours: 8, color: 'bg-pink-100 text-pink-800' },
  휴: { name: '휴무/비번', time: '-', hours: 0, color: 'bg-gray-100 text-gray-800' },
  공: { name: '공휴일', time: '-', hours: 8, color: 'bg-red-100 text-red-800' },
  O: { name: '외출/조퇴/반차', time: '-', hours: 4, color: 'bg-orange-100 text-orange-800' },
  교육: { name: '교육/훈련', time: '-', hours: 8, color: 'bg-indigo-100 text-indigo-800' },
};

interface Staff {
  id: string;
  name: string;
  position: string;
  type: string;
  status: string;
}

interface ScheduleData {
  [staffId: string]: {
    [day: string]: string;
  };
}

interface StaffSummary {
  workDays: number;
  totalHours: number;
  nightCount: number;
  dayCount: number;
  afternoonCount: number;
  overtimeHours: number;
}

export default function WorkScheduleManagement() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({});
  const [showCodeLegend, setShowCodeLegend] = useState(true);
  const [showAutoGenerateModal, setShowAutoGenerateModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ staffId: string; day: number } | null>(null);
  const [showCodeSelector, setShowCodeSelector] = useState(false);
  const [autoNightRest, setAutoNightRest] = useState(true);

  useEffect(() => {
    // 현재 월로 초기화
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(yearMonth);

    // 직원 데이터 로드
    loadStaffData();
    loadScheduleData(yearMonth);
  }, []);

  const loadStaffData = () => {
    const saved = localStorage.getItem('admin_staff');
    if (saved) {
      try {
        const allStaff = JSON.parse(saved);
        setStaffList(Array.isArray(allStaff) ? allStaff.filter((s: Staff) => s.status === '재직') : []);
      } catch (e) {
        console.error('Failed to parse staff data from localStorage', e);
        setStaffList([]);
      }
    }
  };

  const loadScheduleData = (month: string) => {
    const saved = localStorage.getItem(`work_schedule_${month}`);
    if (saved) {
      try {
        setScheduleData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse schedule data from localStorage', e);
        setScheduleData({});
      }
    } else {
      setScheduleData({});
    }
  };

  const saveScheduleData = (month: string, data: ScheduleData) => {
    try {
      localStorage.setItem(`work_schedule_${month}`, JSON.stringify(data));
      setScheduleData(data);
    } catch (e) {
      console.error('Failed to save schedule data', e);
    }
  };

  const getDaysInMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    loadScheduleData(newMonth);
  };

  const handleCellClick = (staffId: string, day: number) => {
    setSelectedCell({ staffId, day });
    setShowCodeSelector(true);
  };

  const handleCodeSelect = (code: string) => {
    if (!selectedCell) return;

    const newSchedule = { ...scheduleData };
    if (!newSchedule[selectedCell.staffId]) {
      newSchedule[selectedCell.staffId] = {};
    }
    newSchedule[selectedCell.staffId][selectedCell.day] = code;

    // 야간 근무 후 자동 휴무 설정
    if (code === 'N' && autoNightRest) {
      const nextDay = selectedCell.day + 1;
      const daysInMonth = getDaysInMonth(selectedMonth);
      if (nextDay <= daysInMonth) {
        newSchedule[selectedCell.staffId][nextDay] = '휴';
      }
    }

    saveScheduleData(selectedMonth, newSchedule);
    setShowCodeSelector(false);
    setSelectedCell(null);
  };

  const calculateStaffSummary = (staffId: string): StaffSummary => {
    const schedule = scheduleData[staffId] || {};
    let workDays = 0;
    let totalHours = 0;
    let nightCount = 0;
    let dayCount = 0;
    let afternoonCount = 0;

    Object.values(schedule).forEach((code) => {
      const workCode = WORK_CODES[code as keyof typeof WORK_CODES];
      if (workCode) {
        if (workCode.hours > 0) workDays++;
        totalHours += workCode.hours;
        if (code === 'N') nightCount++;
        if (code === 'S' || code === 'A' || code === 'D') dayCount++;
        if (code === 'E') afternoonCount++;
      }
    });

    const standardHours = 209; // 월 209시간 초과 계산 (주 40시간 기준)
    const overtimeHours = totalHours > standardHours ? totalHours - standardHours : 0;

    return { workDays, totalHours, nightCount, dayCount, afternoonCount, overtimeHours };
  };

  const autoGenerateSchedule = () => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const newSchedule: ScheduleData = {};

    // 요양보호사만 자동 배정 (교대근무)
    const careWorkers = staffList.filter((s) => s.type === '요양보호사');

    careWorkers.forEach((staff, index) => {
      newSchedule[staff.id] = {};
      const pattern = ['S', 'S', '휴', 'N', '휴', '휴']; // 기본 패턴: 주간2일 → 휴무 → 야간 → 휴무2일
      let patternIndex = (index * 2) % pattern.length; // 직원별 시작 위치 다르게

      for (let day = 1; day <= daysInMonth; day++) {
        newSchedule[staff.id][day] = pattern[patternIndex];
        patternIndex = (patternIndex + 1) % pattern.length;
      }
    });

    // 간호조무사 - 주간 근무 위주
    const nurses = staffList.filter((s) => s.type === '간호조무사');
    nurses.forEach((staff) => {
      newSchedule[staff.id] = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = new Date(`${selectedMonth}-${String(day).padStart(2, '0')}`).getDay();
        newSchedule[staff.id][day] = dayOfWeek === 0 || dayOfWeek === 6 ? '휴' : 'A';
      }
    });

    // 기타 직원 - 일반 근무
    const others = staffList.filter((s) => s.type !== '요양보호사' && s.type !== '간호조무사');
    others.forEach((staff) => {
      newSchedule[staff.id] = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = new Date(`${selectedMonth}-${String(day).padStart(2, '0')}`).getDay();
        newSchedule[staff.id][day] = dayOfWeek === 0 || dayOfWeek === 6 ? '휴' : 'A';
      }
    });

    saveScheduleData(selectedMonth, newSchedule);
    setShowAutoGenerateModal(false);
  };

  const clearSchedule = () => {
    if (window.confirm('이번 달 근무표를 모두 삭제하시겠습니까?')) {
      saveScheduleData(selectedMonth, {});
    }
  };

  const exportToExcel = () => {
    // CSV 형식으로 다운로드
    const daysInMonth = getDaysInMonth(selectedMonth);
    let csv = '직원명,직위,직종';

    // 날짜 헤더
    for (let day = 1; day <= daysInMonth; day++) {
      csv += `,${day}일`;
    }
    csv += ',근무일수,총근무시간,야간횟수\n';

    // 직원별 데이터
    staffList.forEach((staff) => {
      const schedule = scheduleData[staff.id] || {};
      const summary = calculateStaffSummary(staff.id);

      csv += `${staff.name},${staff.position},${staff.type}`;
      for (let day = 1; day <= daysInMonth; day++) {
        csv += `,${schedule[day] || ''}`;
      }
      csv += `,${summary.workDays},${summary.totalHours},${summary.nightCount}\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `근무표_${selectedMonth}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    alert('PDF 다운로드 기능은 추가 라이브러리(jsPDF)가 필요합니다.\n현재는 인쇄 기능을 이용해주세요.');
    window.print();
  };

  const daysInMonth = selectedMonth ? getDaysInMonth(selectedMonth) : 31;

  return (
    <div className="p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">근무표 관리</h1>
        <p className="text-gray-600 text-sm">직원별 근무 스케줄을 관리하고 자동 생성할 수 있습니다</p>
      </div>

      {/* 컨트롤 영역 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">근무 월 선택</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="autoNightRest"
                checked={autoNightRest}
                onChange={(e) => setAutoNightRest(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="autoNightRest" className="text-sm text-gray-700 cursor-pointer">
                야간 근무 후 자동 휴무
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowCodeLegend(!showCodeLegend)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-information-line mr-2"></i>
              {showCodeLegend ? '범례 숨기기' : '근무코드 보기'}
            </button>
            <button
              onClick={() => setShowAutoGenerateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-magic-line mr-2"></i>
              자동 생성
            </button>
            <button
              onClick={clearSchedule}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-delete-bin-line mr-2"></i>
              초기화
            </button>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-file-excel-line mr-2"></i>
              엑셀 다운로드
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-file-pdf-line mr-2"></i>
              PDF 다운로드
            </button>
          </div>
        </div>

        {/* 근무 코드 범례 */}
        {showCodeLegend && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">근무 코드 범례</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(WORK_CODES).map(([code, info]) => (
                <div key={code} className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${info.color}`}>{code}</span>
                  <span className="text-xs text-gray-600">{info.name} ({info.time})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 근무표 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                <th className="px-3 py-3 text-left text-sm font-semibold border border-gray-300 sticky left-0 bg-teal-500 z-10">
                  직원명
                </th>
                <th className="px-3 py-3 text-left text-sm font-semibold border border-gray-300">
                  직위
                </th>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const date = new Date(`${selectedMonth}-${String(day).padStart(2, '0')}`);
                  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                  return (
                    <th
                      key={day}
                      className={`px-2 py-3 text-center text-xs font-semibold border border-gray-300 ${
                        isWeekend ? 'bg-red-400' : 'bg-teal-500'
                      }`}
                    >
                      <div>{day}</div>
                      <div className="text-[10px] font-normal">{dayOfWeek}</div>
                    </th>
                  );
                })}
                <th className="px-3 py-3 text-center text-sm font-semibold border border-gray-300 bg-blue-500">
                  근무일수
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold border border-gray-300 bg-blue-500">
                  총시간
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold border border-gray-300 bg-purple-500">
                  야간
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold border border-gray-300 bg-orange-500">
                  초과
                </th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => {
                const schedule = scheduleData[staff.id] || {};
                const summary = calculateStaffSummary(staff.id);

                return (
                  <tr key={staff.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-2 text-sm font-medium text-gray-800 border border-gray-300 sticky left-0 bg-inherit z-10">
                      <div>{staff.name}</div>
                      <div className="text-xs text-gray-500">{staff.type}</div>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600 border border-gray-300">{staff.position}</td>
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                      const code = schedule[day] || '';
                      const workCode = WORK_CODES[code as keyof typeof WORK_CODES];

                      return (
                        <td
                          key={day}
                          onClick={() => handleCellClick(staff.id, day)}
                          className="px-1 py-1 text-center border border-gray-300 cursor-pointer hover:bg-teal-50 transition-colors"
                        >
                          {workCode ? (
                            <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${workCode.color} w-full`}>
                              {code}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">-</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-sm text-center font-medium text-gray-800 border border-gray-300 bg-blue-50">
                      {summary.workDays}일
                    </td>
                    <td className="px-3 py-2 text-sm text-center font-medium text-gray-800 border border-gray-300 bg-blue-50">
                      {summary.totalHours}h
                    </td>
                    <td className="px-3 py-2 text-sm text-center font-medium text-purple-700 border border-gray-300 bg-purple-50">
                      {summary.nightCount}회
                    </td>
                    <td
                      className={`px-3 py-2 text-sm text-center font-medium border border-gray-300 ${
                        summary.overtimeHours > 0 ? 'bg-orange-50 text-orange-700' : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {summary.overtimeHours > 0 ? `+${summary.overtimeHours}h` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 근무 코드 선택 모달 */}
      {showCodeSelector && selectedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">근무 코드 선택</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(WORK_CODES).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={() => handleCodeSelect(code)}
                    className={`p-3 rounded-lg border-2 hover:shadow-md transition-all cursor-pointer ${info.color} border-gray-300 hover:border-teal-500`}
                  >
                    <div className="font-bold text-sm mb-1">{code}</div>
                    <div className="text-xs">{info.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{info.time}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    if (selectedCell) {
                      const newSchedule = { ...scheduleData };
                      if (newSchedule[selectedCell.staffId]) {
                        delete newSchedule[selectedCell.staffId][selectedCell.day];
                      }
                      saveScheduleData(selectedMonth, newSchedule);
                    }
                    setShowCodeSelector(false);
                    setSelectedCell(null);
                  }}
                  className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  삭제
                </button>
                <button
                  onClick={() => {
                    setShowCodeSelector(false);
                    setSelectedCell(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 자동 생성 확인 모달 */}
      {showAutoGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">근무표 자동 생성</h3>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">현재 달의 근무표를 자동으로 생성합니다.</p>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <p className="text-xs text-blue-800">
                    <i className="ri-information-line mr-1"></i>
                    <strong>요양보호사:</strong> 주간2일 → 휴무 → 야간 → 휴무2일 패턴
                  </p>
                  <p className="text-xs text-blue-800">
                    <i className="ri-information-line mr-1"></i>
                    <strong>간호조무사:</strong> 평일 단축주간, 주말 휴무
                  </p>
                  <p className="text-xs text-blue-800">
                    <i className="ri-information-line mr-1"></i>
                    <strong>기타 직원:</strong> 평일 단축주간, 주말 휴무
                  </p>
                </div>
                <p className="text-xs text-red-600 mt-4">⚠️ 기존 근무표가 있다면 덮어씌워집니다.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAutoGenerateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={autoGenerateSchedule}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  생성하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 통계 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">총 직원 수</p>
              <p className="text-2xl font-bold text-blue-700">{staffList.length}명</p>
            </div>
            <i className="ri-team-line text-4xl text-blue-500"></i>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">평균 근무일수</p>
              <p className="text-2xl font-bold text-purple-700">
                {staffList.length > 0
                  ? Math.round(
                      staffList.reduce((sum, staff) => sum + calculateStaffSummary(staff.id).workDays, 0) /
                        staffList.length
                    )
                  : 0}
                일
              </p>
            </div>
            <i className="ri-calendar-check-line text-4xl text-purple-500"></i>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">평균 근무시간</p>
              <p className="text-2xl font-bold text-orange-700">
                {staffList.length > 0
                  ? Math.round(
                      staffList.reduce((sum, staff) => sum + calculateStaffSummary(staff.id).totalHours, 0) /
                        staffList.length
                    )
                  : 0}
                h
              </p>
            </div>
            <i className="ri-time-line text-4xl text-orange-500"></i>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 font-medium">총 야간근무</p>
              <p className="text-2xl font-bold text-pink-700">
                {staffList.reduce((sum, staff) => sum + calculateStaffSummary(staff.id).nightCount, 0)}회
              </p>
            </div>
            <i className="ri-moon-line text-4xl text-pink-500"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
