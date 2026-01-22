
import { useState } from 'react';

export default function ScheduleTab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 캘린더 생성
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];

    // 이전 달 빈 칸
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // 현재 달 날짜
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = generateCalendar();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 월 이동
  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };

  // 오늘로 이동
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // 날짜 비교
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isToday = (date: Date) => isSameDay(date, new Date());

  // 샘플 데이터
  const scheduleData = {
    workSchedule: {
      shift: '출근',
      time: '14:01 (출근) ~ 14:01 (퇴근)',
      status: 'completed',
    },
    events: [],
    tasks: [],
    diary: null,
  };

  // 오류 방지를 위한 안전한 데이터 접근 헬퍼
  const safeMap = <T,>(arr: T[] | undefined, render: (item: T, idx: number) => JSX.Element) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return <>{arr.map(render)}</>;
  };

  return (
    <div className="space-y-4">
      {/* 캘린더 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* 캘린더 헤더 */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <button
            onClick={() => changeMonth(-1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-xl text-gray-700"></i>
          </button>

          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">
              {currentMonth.getFullYear()}년{' '}
              {String(currentMonth.getMonth() + 1).padStart(2, '0')}월
            </h3>
            <button
              onClick={goToToday}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-calendar-check-line mr-1"></i>
              오늘
            </button>
          </div>

          <button
            onClick={() => changeMonth(1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-xl text-gray-700"></i>
          </button>
        </div>

        {/* 캘린더 그리드 */}
        <div className="p-4">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-semibold py-2 ${
                  index === 0
                    ? 'text-red-500'
                    : index === 6
                    ? 'text-blue-500'
                    : 'text-gray-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) {
                return (
                  <div key={`empty-${index}`} className="aspect-square"></div>
                );
              }

              const isSelected = isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);
              const dayOfWeek = day.getDay();

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all cursor-pointer
                    ${isSelected
                      ? 'bg-emerald-500 text-white shadow-md scale-105'
                      : isTodayDate
                      ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500'
                      : dayOfWeek === 0
                      ? 'text-red-500 hover:bg-red-50'
                      : dayOfWeek === 6
                      ? 'text-blue-500 hover:bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 선택된 날짜 정보 */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-bold">
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
          {selectedDate.getDate()}일
        </h3>
        <p className="text-sm text-white/80 mt-1">
          {
            ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][
              selectedDate.getDay()
            ]
          }
        </p>
      </div>

      {/* 근무일정 및 출퇴근 시간 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <i className="ri-time-line text-emerald-600"></i>
            근무일정 및 출퇴근 시간
          </h3>
        </div>
        {scheduleData.workSchedule ? (
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-xl text-white"></i>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {scheduleData.workSchedule.shift}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {scheduleData.workSchedule.time}
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full font-medium">
                완료
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-calendar-close-line text-4xl mb-2"></i>
            <p>등록된 근무일정이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 일정 및 기념일 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <i className="ri-calendar-event-line text-emerald-600"></i>
            일정 및 기념일
          </h3>
        </div>
        {scheduleData.events.length > 0 ? (
          <div className="space-y-2">
            {scheduleData.events.map((event: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-gray-900">{event.title}</div>
                <div className="text-sm text-gray-600 mt-1">{event.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-calendar-line text-4xl mb-2"></i>
            <p>등록된 일정이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 업무 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <i className="ri-task-line text-emerald-600"></i>
            업무
          </h3>
        </div>
        {scheduleData.tasks.length > 0 ? (
          <div className="space-y-2">
            {scheduleData.tasks.map((task: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-gray-900">{task.title}</div>
                <div className="text-sm text-gray-600 mt-1">{task.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-file-list-line text-4xl mb-2"></i>
            <p>등록된 업무가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 근무일지 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <i className="ri-file-text-line text-emerald-600"></i>
            근무일지
          </h3>
        </div>
        {scheduleData.diary ? (
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="text-gray-900">{scheduleData.diary}</div>
          </div>
        ) : (
          <div className="text-center py-8">
            <i className="ri-file-add-line text-4xl text-gray-400 mb-2"></i>
            <p className="text-gray-500 mb-3">등록된 업무가 없습니다.</p>
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-edit-line mr-1"></i>
              작성하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
