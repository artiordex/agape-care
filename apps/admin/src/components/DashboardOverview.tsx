import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  change: string;
}

interface Schedule {
  id: number;
  title: string;
  time: string;
  location: string;
}

export default function DashboardOverview() {
  const [stats] = useState<StatCard[]>([
    {
      title: '현재 입소자',
      value: '48 / 60명',
      icon: 'ri-user-line',
      color: 'from-blue-500 to-blue-600',
      change: '+3명'
    },
    {
      title: '오늘의 일정',
      value: '12건',
      icon: 'ri-calendar-line',
      color: 'from-green-500 to-green-600',
      change: '진행 중'
    },
    {
      title: '긴급 알림',
      value: '2건',
      icon: 'ri-alert-line',
      color: 'from-red-500 to-red-600',
      change: '확인 필요'
    },
    {
      title: '직원 출근',
      value: '22 / 25명',
      icon: 'ri-team-line',
      color: 'from-purple-500 to-purple-600',
      change: '정상'
    }
  ]);

  const [recentActivities] = useState([
    { id: 1, type: '입소', name: '김영희 님', time: '30분 전', icon: 'ri-user-add-line', color: 'text-green-600' },
    { id: 2, type: '약물 투여', name: '이철수 님', time: '1시간 전', icon: 'ri-medicine-bottle-line', color: 'text-blue-600' },
    { id: 3, type: '방문 예약', name: '박민지 님', time: '2시간 전', icon: 'ri-calendar-check-line', color: 'text-purple-600' },
    { id: 4, type: '공지사항', name: '시설 점검 안내', time: '3시간 전', icon: 'ri-notification-line', color: 'text-orange-600' },
    { id: 5, type: '응급 상황', name: '강영수 님', time: '4시간 전', icon: 'ri-alarm-warning-line', color: 'text-red-600' }
  ]);

  const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>([
    { id: 1, title: '인지활동 프로그램', time: '오늘 14:00', location: '2층 활동실' },
    { id: 2, title: '정기 건강검진', time: '오늘 15:30', location: '의료실' },
    { id: 3, title: '가족 면회', time: '오늘 16:00', location: '1층 로비' },
    { id: 4, title: '저녁 식사', time: '오늘 18:00', location: '식당' }
  ]);

  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    notes: ''
  });

  const navigate = useNavigate();

  const handleViewAllNotices = () => {
    navigate('/admin/dashboard?tab=notice');
  };

  const handleAddSchedule = () => {
    setShowAddScheduleModal(true);
  };

  const handleSaveSchedule = () => {
    if (!newSchedule.title || !newSchedule.date || !newSchedule.startTime) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const timeText = newSchedule.date === new Date().toISOString().split('T')[0] 
      ? `오늘 ${newSchedule.startTime}` 
      : `${newSchedule.date} ${newSchedule.startTime}`;

    const schedule: Schedule = {
      id: upcomingSchedules.length + 1,
      title: newSchedule.title,
      time: timeText,
      location: newSchedule.location || '미정'
    };

    setUpcomingSchedules([...upcomingSchedules, schedule]);
    setShowAddScheduleModal(false);
    setNewSchedule({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: '',
      notes: ''
    });
  };

  const handleCancelSchedule = () => {
    setShowAddScheduleModal(false);
    setNewSchedule({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 페이지 헤더 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h2>
        <p className="text-gray-600">요양원 운영 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 활동 */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">최근 활동</h3>
            <button 
              onClick={handleViewAllNotices}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
            >
              전체보기 →
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0 ${activity.color}`}>
                  <i className={`${activity.icon} text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.name}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 오늘의 일정 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">오늘의 일정</h3>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {upcomingSchedules.map((schedule) => (
              <div key={schedule.id} className="border-l-4 border-teal-500 pl-4 py-2">
                <p className="text-sm font-semibold text-gray-900 mb-1">{schedule.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="ri-time-line"></i>
                  <span>{schedule.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <i className="ri-map-pin-line"></i>
                  <span>{schedule.location}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleAddSchedule}
            className="w-full mt-6 py-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow cursor-pointer whitespace-nowrap"
          >
            일정 추가하기
          </button>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: '입소자 등록', icon: 'ri-user-add-line', color: 'from-blue-500 to-blue-600' },
          { label: '일정 추가', icon: 'ri-calendar-event-line', color: 'from-green-500 to-green-600' },
          { label: '공지 작성', icon: 'ri-file-edit-line', color: 'from-purple-500 to-purple-600' },
          { label: '보고서 생성', icon: 'ri-file-chart-line', color: 'from-orange-500 to-orange-600' }
        ].map((action, index) => (
          <button
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
              <i className={`${action.icon} text-2xl text-white`}></i>
            </div>
            <p className="text-sm font-semibold text-gray-900 text-center">{action.label}</p>
          </button>
        ))}
      </div>

      {/* 일정 추가 모달 */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">새 일정 추가</h3>
              <button
                onClick={handleCancelSchedule}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-6 space-y-6">
              {/* 일정 제목 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  일정 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                  placeholder="일정 제목을 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              {/* 날짜 및 시간 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    날짜 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    시작 시간 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    종료 시간
                  </label>
                  <input
                    type="time"
                    value={newSchedule.endTime}
                    onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* 장소 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  장소
                </label>
                <input
                  type="text"
                  value={newSchedule.location}
                  onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
                  placeholder="장소를 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              {/* 참석자 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  참석자
                </label>
                <input
                  type="text"
                  value={newSchedule.attendees}
                  onChange={(e) => setNewSchedule({ ...newSchedule, attendees: e.target.value })}
                  placeholder="참석자를 입력하세요 (쉼표로 구분)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              {/* 메모 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  메모
                </label>
                <textarea
                  value={newSchedule.notes}
                  onChange={(e) => setNewSchedule({ ...newSchedule, notes: e.target.value })}
                  placeholder="추가 메모를 입력하세요"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
                />
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleCancelSchedule}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleSaveSchedule}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow cursor-pointer whitespace-nowrap"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}