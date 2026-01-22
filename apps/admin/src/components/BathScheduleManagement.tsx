import { useEffect, useState } from 'react';
import { supabase } from '../../../../../src/supabaseClient';

interface BathEvent {
  id?: number;
  beneficiary_id: number;
  event_date: string;
  planned: boolean;
  completed: boolean;
  completed_at?: string;
  memo?: string;
}

interface BathRule {
  id?: number;
  beneficiary_id: number;
  frequency_per_week: number;
  days_of_week: number[];
  active: boolean;
}

interface Beneficiary {
  id: number;
  name: string;
  room: string;
  grade: string;
  bath_rule?: BathRule;
}

export default function BathScheduleManagement() {
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [bathEvents, setBathEvents] = useState<BathEvent[]>([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<number | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<BathEvent | null>(null);

  // 표시 옵션
  const [showSchedule, setShowSchedule] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  // 임시 수급자 데이터
  const mockBeneficiaries: Beneficiary[] = [
    { id: 1, name: '김영희', room: '본관 101호', grade: '1등급' },
    { id: 2, name: '박철수', room: '본관 102호', grade: '2등급' },
    { id: 3, name: '이순자', room: '본관 201호', grade: '3등급' },
    { id: 4, name: '최동식', room: '본관 202호', grade: '4등급' },
    { id: 5, name: '정미숙', room: '신관 101호', grade: '5등급' },
  ];

  useEffect(() => {
    loadBeneficiaries();
    loadBathEvents();
  }, [currentDate, viewMode]);

  const loadBeneficiaries = async () => {
    // 실제로는 DB에서 로드
    setBeneficiaries(mockBeneficiaries);
  };

  const loadBathEvents = async () => {
    try {
      const startDate = getStartDate();
      const endDate = getEndDate();

      const { data } = await supabase
        .from('care_bath_events')
        .select('*')
        .gte('event_date', startDate)
        .lte('event_date', endDate);

      if (data) setBathEvents(data);
    } catch (error) {
      console.error('목욕 일정 로드 실패:', error);
    }
  };

  const getStartDate = () => {
    if (viewMode === 'monthly') {
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
    } else {
      const day = currentDate.getDay();
      const diff = currentDate.getDate() - day;
      return new Date(currentDate.setDate(diff)).toISOString().split('T')[0];
    }
  };

  const getEndDate = () => {
    if (viewMode === 'monthly') {
      return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];
    } else {
      const day = currentDate.getDay();
      const diff = currentDate.getDate() - day + 6;
      return new Date(currentDate.setDate(diff)).toISOString().split('T')[0];
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bathEvents.filter(event => event.event_date === dateStr);
  };

  const addBathEvent = async (beneficiaryId: number, date: Date) => {
    try {
      const dateStr = date.toISOString().split('T')[0];
      const newEvent: BathEvent = {
        beneficiary_id: beneficiaryId,
        event_date: dateStr,
        planned: true,
        completed: false,
      };

      const { error } = await supabase.from('care_bath_events').insert([newEvent]);

      if (error) throw error;

      alert('목욕 일정이 추가되었습니다.');
      loadBathEvents();
    } catch (error) {
      console.error('목욕 일정 추가 실패:', error);
      alert('목욕 일정 추가에 실패했습니다.');
    }
  };

  const toggleEventComplete = async (event: BathEvent) => {
    try {
      const updated = {
        ...event,
        completed: !event.completed,
        completed_at: !event.completed ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from('care_bath_events')
        .update(updated)
        .eq('id', event.id);

      if (error) throw error;

      loadBathEvents();
    } catch (error) {
      console.error('완료 상태 변경 실패:', error);
      alert('완료 상태 변경에 실패했습니다.');
    }
  };

  const deleteEvent = async (eventId: number) => {
    if (!confirm('목욕 일정을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('care_bath_events').delete().eq('id', eventId);

      if (error) throw error;

      alert('목욕 일정이 삭제되었습니다.');
      loadBathEvents();
    } catch (error) {
      console.error('목욕 일정 삭제 실패:', error);
      alert('목욕 일정 삭제에 실패했습니다.');
    }
  };

  const prevPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'monthly') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'monthly') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* 좌측: 수급자 목록 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">수급자 목록</h2>

          {/* 표시 옵션 */}
          <div className="space-y-2 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showSchedule}
                onChange={(e) => setShowSchedule(e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-gray-700">목욕 일정 표시</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-gray-700">완료 표시</span>
            </label>
          </div>

          <button
            type="button"
            onClick={() => setShowScheduleModal(true)}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-calendar-line mr-2"></i>
            일정 직접 등록
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {beneficiaries.map((ben) => (
            <button
              key={ben.id}
              type="button"
              onClick={() => setSelectedBeneficiary(ben.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedBeneficiary === ben.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{ben.name}</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {ben.grade}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <i className="ri-home-4-line text-xs"></i>
                  {ben.room}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 우측: 캘린더 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">목욕 일정 및 제공현황</h1>
              <p className="text-sm text-gray-600 mt-1">수급자별 목욕 일정을 관리합니다</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode('monthly')}
                  className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    viewMode === 'monthly'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  월간
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('weekly')}
                  className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    viewMode === 'weekly'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  주간
                </button>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <i className="ri-printer-line mr-2"></i>
                출력
              </button>
            </div>
          </div>

          {/* 날짜 네비게이션 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevPeriod}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="ri-arrow-left-s-line text-xl"></i>
              </button>
              <h2 className="text-xl font-bold text-gray-900 min-w-[200px] text-center">
                {viewMode === 'monthly'
                  ? `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`
                  : `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${Math.ceil(currentDate.getDate() / 7)}주차`}
              </h2>
              <button
                type="button"
                onClick={nextPeriod}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="ri-arrow-right-s-line text-xl"></i>
              </button>
            </div>
            <button
              type="button"
              onClick={goToToday}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              오늘
            </button>
          </div>
        </div>

        {/* 캘린더 */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {viewMode === 'monthly' ? (
              /* 월간 캘린더 */
              <div className="grid grid-cols-7">
                {/* 요일 헤더 */}
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                  <div
                    key={day}
                    className={`p-4 text-center font-semibold border-b border-gray-200 ${
                      index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                ))}

                {/* 날짜 셀 */}
                {getDaysInMonth().map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="min-h-[120px] border-b border-r border-gray-200 bg-gray-50"></div>;
                  }

                  const events = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-[120px] border-b border-r border-gray-200 p-2 ${
                        isToday ? 'bg-emerald-50' : 'bg-white'
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-emerald-600' : 'text-gray-700'}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {events.map((event) => {
                          const ben = beneficiaries.find(b => b.id === event.beneficiary_id);
                          if (!ben) return null;

                          return (
                            <button
                              key={event.id}
                              type="button"
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowEventModal(true);
                              }}
                              className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                                event.completed
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              }`}
                            >
                              <div className="flex items-center gap-1">
                                {event.completed && <i className="ri-check-line"></i>}
                                <span className="truncate">{ben.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* 주간 캘린더 */
              <div className="grid grid-cols-7">
                {/* 요일 헤더 */}
                {getWeekDays().map((day, index) => (
                  <div
                    key={day.toISOString()}
                    className={`p-4 text-center border-b border-gray-200 ${
                      index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <div className="font-semibold">
                      {['일', '월', '화', '수', '목', '금', '토'][index]}
                    </div>
                    <div className="text-2xl font-bold mt-1">{day.getDate()}</div>
                  </div>
                ))}

                {/* 이벤트 영역 */}
                {getWeekDays().map((day) => {
                  const events = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-[400px] border-r border-gray-200 p-3 ${
                        isToday ? 'bg-emerald-50' : 'bg-white'
                      }`}
                    >
                      <div className="space-y-2">
                        {events.map((event) => {
                          const ben = beneficiaries.find(b => b.id === event.beneficiary_id);
                          if (!ben) return null;

                          return (
                            <button
                              key={event.id}
                              type="button"
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowEventModal(true);
                              }}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                event.completed
                                  ? 'border-green-300 bg-green-50 hover:border-green-400'
                                  : 'border-blue-300 bg-blue-50 hover:border-blue-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-sm">{ben.name}</span>
                                {event.completed && (
                                  <i className="ri-check-circle-fill text-green-600"></i>
                                )}
                              </div>
                              <div className="text-xs text-gray-600">{ben.room}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 범례 */}
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span className="text-gray-700">예정</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-gray-700">완료</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-50 border border-emerald-300 rounded"></div>
              <span className="text-gray-700">오늘</span>
            </div>
          </div>
        </div>
      </div>

      {/* 이벤트 상세 모달 */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">목욕 일정 상세</h3>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수급자</label>
                <p className="text-gray-900">
                  {beneficiaries.find(b => b.id === selectedEvent.beneficiary_id)?.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">일정 날짜</label>
                <p className="text-gray-900">{selectedEvent.event_date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedEvent.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {selectedEvent.completed ? '완료' : '예정'}
                </span>
              </div>
              {selectedEvent.memo && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                  <p className="text-gray-900">{selectedEvent.memo}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={() => toggleEventComplete(selectedEvent)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedEvent.completed
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {selectedEvent.completed ? '완료 취소' : '완료 처리'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (selectedEvent.id) deleteEvent(selectedEvent.id);
                  setShowEventModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
