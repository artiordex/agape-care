'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const router = useRouter();

  const [stats] = useState<StatCard[]>([
    {
      title: '현재 입소자',
      value: '48 / 60명',
      icon: 'ri-user-line',
      color: 'from-blue-500 to-blue-600',
      change: '+3명',
    },
    {
      title: '오늘의 일정',
      value: '12건',
      icon: 'ri-calendar-line',
      color: 'from-green-500 to-green-600',
      change: '진행 중',
    },
    {
      title: '긴급 알림',
      value: '2건',
      icon: 'ri-alert-line',
      color: 'from-red-500 to-red-600',
      change: '확인 필요',
    },
    {
      title: '직원 출근',
      value: '22 / 25명',
      icon: 'ri-team-line',
      color: 'from-purple-500 to-purple-600',
      change: '정상',
    },
  ]);

  const [recentActivities] = useState([
    { id: 1, type: '입소', name: '김영희 님', time: '30분 전', icon: 'ri-user-add-line', color: 'text-green-600' },
    {
      id: 2,
      type: '약물 투여',
      name: '이철수 님',
      time: '1시간 전',
      icon: 'ri-medicine-bottle-line',
      color: 'text-blue-600',
    },
    {
      id: 3,
      type: '방문 예약',
      name: '박민지 님',
      time: '2시간 전',
      icon: 'ri-calendar-check-line',
      color: 'text-purple-600',
    },
    {
      id: 4,
      type: '공지사항',
      name: '시설 점검 안내',
      time: '3시간 전',
      icon: 'ri-notification-line',
      color: 'text-orange-600',
    },
    {
      id: 5,
      type: '응급 상황',
      name: '강영수 님',
      time: '4시간 전',
      icon: 'ri-alarm-warning-line',
      color: 'text-red-600',
    },
  ]);

  const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>([
    { id: 1, title: '인지활동 프로그램', time: '오늘 14:00', location: '2층 활동실' },
    { id: 2, title: '정기 건강검진', time: '오늘 15:30', location: '의료실' },
    { id: 3, title: '가족 면회', time: '오늘 16:00', location: '1층 로비' },
    { id: 4, title: '저녁 식사', time: '오늘 18:00', location: '식당' },
  ]);

  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    notes: '',
  });

  const handleViewAllNotices = () => {
    router.push('/admin/content/notice');
  };

  const handleAddSchedule = () => {
    setShowAddScheduleModal(true);
  };

  const handleSaveSchedule = () => {
    if (!newSchedule.title || !newSchedule.date || !newSchedule.startTime) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const timeText =
      newSchedule.date === new Date().toISOString().split('T')[0]
        ? `오늘 ${newSchedule.startTime}`
        : `${newSchedule.date} ${newSchedule.startTime}`;

    const schedule: Schedule = {
      id: upcomingSchedules.length + 1,
      title: newSchedule.title,
      time: timeText,
      location: newSchedule.location || '미정',
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
      notes: '',
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
      notes: '',
    });
  };

  // 빠른 액션 핸들러
  const handleQuickAction = (action: string) => {
    switch (action) {
      case '입소자 등록':
        router.push('/admin/beneficiary/new');
        break;
      case '일정 추가':
        handleAddSchedule();
        break;
      case '공지 작성':
        router.push('/admin/content/notice');
        break;
      case '보고서 생성':
        // 보고서 생성 페이지로 이동 (해당 페이지가 있다면)
        break;
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">대시보드</h2>
        <p className="text-gray-600">요양원 운영 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={`h-12 w-12 bg-gradient-to-br ${stat.color} flex items-center justify-center rounded-lg`}>
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">{stat.change}</span>
            </div>
            <h3 className="mb-1 text-sm text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 최근 활동 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">최근 활동</h3>
            <button
              onClick={handleViewAllNotices}
              className="cursor-pointer text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              전체보기 →
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 ${activity.color}`}
                >
                  <i className={`${activity.icon} text-xl`}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{activity.type}</p>
                  <p className="truncate text-sm text-gray-600">{activity.name}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 오늘의 일정 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-gray-900">오늘의 일정</h3>

          <div className="max-h-80 space-y-4 overflow-y-auto">
            {upcomingSchedules.map(schedule => (
              <div key={schedule.id} className="border-l-4 border-teal-500 py-2 pl-4">
                <p className="mb-1 text-sm font-semibold text-gray-900">{schedule.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="ri-time-line"></i>
                  <span>{schedule.time}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                  <i className="ri-map-pin-line"></i>
                  <span>{schedule.location}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddSchedule}
            className="mt-6 w-full cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 py-2 font-medium text-white transition-shadow hover:shadow-lg"
          >
            일정 추가하기
          </button>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: '입소자 등록', icon: 'ri-user-add-line', color: 'from-blue-500 to-blue-600' },
          { label: '일정 추가', icon: 'ri-calendar-event-line', color: 'from-green-500 to-green-600' },
          { label: '공지 작성', icon: 'ri-file-edit-line', color: 'from-purple-500 to-purple-600' },
          { label: '보고서 생성', icon: 'ri-file-chart-line', color: 'from-orange-500 to-orange-600' },
        ].map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(action.label)}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div
              className={`h-12 w-12 bg-gradient-to-br ${action.color} mx-auto mb-3 flex items-center justify-center rounded-lg transition-transform group-hover:scale-110`}
            >
              <i className={`${action.icon} text-2xl text-white`}></i>
            </div>
            <p className="text-center text-sm font-semibold text-gray-900">{action.label}</p>
          </button>
        ))}
      </div>

      {/* 일정 추가 모달 */}
      {showAddScheduleModal && (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="animate-slideUp max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            {/* 모달 헤더 */}
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">새 일정 추가</h3>
              <button
                onClick={handleCancelSchedule}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="space-y-6 p-6">
              {/* 일정 제목 */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  일정 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSchedule.title}
                  onChange={e => setNewSchedule({ ...newSchedule, title: e.target.value })}
                  placeholder="일정 제목을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* 날짜 및 시간 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    날짜 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newSchedule.date}
                    onChange={e => setNewSchedule({ ...newSchedule, date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    시작 시간 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={newSchedule.startTime}
                    onChange={e => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">종료 시간</label>
                  <input
                    type="time"
                    value={newSchedule.endTime}
                    onChange={e => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* 장소 */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">장소</label>
                <input
                  type="text"
                  value={newSchedule.location}
                  onChange={e => setNewSchedule({ ...newSchedule, location: e.target.value })}
                  placeholder="장소를 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* 참석자 */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">참석자</label>
                <input
                  type="text"
                  value={newSchedule.attendees}
                  onChange={e => setNewSchedule({ ...newSchedule, attendees: e.target.value })}
                  placeholder="참석자를 입력하세요 (쉼표로 구분)"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* 메모 */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">메모</label>
                <textarea
                  value={newSchedule.notes}
                  onChange={e => setNewSchedule({ ...newSchedule, notes: e.target.value })}
                  placeholder="추가 메모를 입력하세요"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={handleCancelSchedule}
                className="cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSaveSchedule}
                className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 px-6 py-2 font-medium text-white transition-shadow hover:shadow-lg"
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
