import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AttendanceStatus {
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  note: string;
  status: 'none' | 'checked-in' | 'checked-out';
}

interface WorkDiary {
  date: string;
  content: string;
  tasks: string[];
}

export default function MobileAttendancePage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>({
    date: new Date().toISOString().split('T')[0],
    checkIn: null,
    checkOut: null,
    note: '',
    status: 'none'
  });
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState<'check-in' | 'check-out' | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workDiary, setWorkDiary] = useState<WorkDiary | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // 모바일 전용 체크 (PC에서 접근 시 안내)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 현재 시간 업데이트 (1분마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // 오늘 출퇴근 상태 조회
  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      // TODO: API 연동
      // const response = await fetch('/api/attendance/today');
      // const data = await response.json();
      
      // Mock 데이터
      const mockData: AttendanceStatus = {
        date: new Date().toISOString().split('T')[0],
        checkIn: null,
        checkOut: null,
        note: '',
        status: 'none'
      };
      
      setAttendanceStatus(mockData);
    } catch (error) {
      console.error('출퇴근 상태 조회 실패:', error);
    }
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      // TODO: API 연동
      // const response = await fetch('/api/attendance/check-in', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ note: noteText })
      // });

      // Mock 처리
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const now = new Date();
      const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setAttendanceStatus(prev => ({
        ...prev,
        checkIn: timeString,
        note: noteText,
        status: 'checked-in'
      }));

      showToastMessage('출근 처리가 완료되었습니다.', 'success');
      setShowConfirmModal(null);
      setNoteText('');
      setShowNoteInput(false);
    } catch (error) {
      showToastMessage('출근 처리에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      // TODO: API 연동
      // const response = await fetch('/api/attendance/check-out', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ note: noteText })
      // });

      // Mock 처리
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const now = new Date();
      const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setAttendanceStatus(prev => ({
        ...prev,
        checkOut: timeString,
        note: prev.note + (noteText ? ` / ${noteText}` : ''),
        status: 'checked-out'
      }));

      showToastMessage('퇴근 처리가 완료되었습니다.', 'success');
      setShowConfirmModal(null);
      setNoteText('');
      setShowNoteInput(false);
    } catch (error) {
      showToastMessage('퇴근 처리에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  const changeDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
    
    // TODO: 해당 날짜의 근무일지 조회
    fetchWorkDiary(newDate);
  };

  const fetchWorkDiary = async (date: Date) => {
    try {
      // TODO: API 연동
      // const response = await fetch(`/api/work-diary?date=${date.toISOString().split('T')[0]}`);
      // const data = await response.json();
      
      // Mock 데이터
      setWorkDiary(null);
    } catch (error) {
      console.error('근무일지 조회 실패:', error);
    }
  };

  // PC에서 접근 시 안내 화면
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-smartphone-line text-4xl text-emerald-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            모바일 전용 기능입니다
          </h1>
          <p className="text-gray-600 mb-8">
            출퇴근 처리는 모바일 기기에서만 사용 가능합니다.<br />
            모바일 기기로 접속해 주세요.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              대시보드로 이동
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              이전 페이지로
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <i className="ri-arrow-left-line text-2xl"></i>
            </button>
            <h1 className="text-xl font-bold">출퇴근 처리</h1>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
              <i className="ri-notification-3-line text-2xl"></i>
            </button>
          </div>

          {/* 현재 날짜/시간 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm opacity-90">
              {formatDate(currentTime)} ({getDayOfWeek(currentTime)})
            </div>
          </div>
        </div>
      </div>

      {/* 출퇴근 버튼 영역 */}
      <div className="p-4 space-y-4">
        {/* 출근/퇴근 상태 카드 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">출근 시간</div>
              <div className="text-2xl font-bold text-emerald-600">
                {attendanceStatus.checkIn || '--:--'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">퇴근 시간</div>
              <div className="text-2xl font-bold text-teal-600">
                {attendanceStatus.checkOut || '--:--'}
              </div>
            </div>
          </div>

          {/* 출근/퇴근 버튼 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowConfirmModal('check-in')}
              disabled={attendanceStatus.status !== 'none' || isLoading}
              className={`py-4 rounded-xl font-bold text-lg transition-all ${
                attendanceStatus.status === 'none'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <i className="ri-login-box-line mr-2"></i>
              출근
            </button>
            <button
              onClick={() => setShowConfirmModal('check-out')}
              disabled={attendanceStatus.status !== 'checked-in' || isLoading}
              className={`py-4 rounded-xl font-bold text-lg transition-all ${
                attendanceStatus.status === 'checked-in'
                  ? 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <i className="ri-logout-box-line mr-2"></i>
              퇴근
            </button>
          </div>

          {/* 상태 메시지 */}
          {attendanceStatus.status === 'checked-in' && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-center">
              <i className="ri-checkbox-circle-line text-emerald-600 mr-2"></i>
              <span className="text-sm text-emerald-700 font-medium">
                출근 처리 완료
              </span>
            </div>
          )}
          {attendanceStatus.status === 'checked-out' && (
            <div className="mt-4 p-3 bg-teal-50 rounded-lg text-center">
              <i className="ri-checkbox-circle-line text-teal-600 mr-2"></i>
              <span className="text-sm text-teal-700 font-medium">
                퇴근 처리 완료
              </span>
            </div>
          )}
        </div>

        {/* 비고 입력 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <i className="ri-edit-line text-xl text-gray-600"></i>
              <span className="font-semibold text-gray-900">비고 입력</span>
            </div>
            <i className={`ri-arrow-down-s-line text-xl text-gray-400 transition-transform ${
              showNoteInput ? 'rotate-180' : ''
            }`}></i>
          </button>
          
          {showNoteInput && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="mt-4">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="외근, 대체근무, 야간근무, 지각 사유 등을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      // TODO: 비고 저장 API
                      showToastMessage('비고가 저장되었습니다.', 'success');
                      setShowNoteInput(false);
                    }}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => {
                      setNoteText('');
                      setShowNoteInput(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 근무일지 작성 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">근무일지</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeDate('prev')}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="ri-arrow-left-s-line text-xl"></i>
              </button>
              <div className="text-sm font-medium text-gray-700 min-w-[100px] text-center">
                {formatDate(selectedDate)}
              </div>
              <button
                onClick={() => changeDate('next')}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="ri-arrow-right-s-line text-xl"></i>
              </button>
            </div>
          </div>

          {workDiary ? (
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {workDiary.content}
                </p>
              </div>
              <button
                onClick={() => navigate(`/admin/work-diary?date=${selectedDate.toISOString().split('T')[0]}`)}
                className="w-full px-4 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                수정하기
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="ri-file-text-line text-4xl text-gray-300 mb-3"></i>
              <p className="text-sm text-gray-500 mb-4">
                등록된 근무일지가 없습니다
              </p>
              <button
                onClick={() => navigate(`/admin/work-diary?date=${selectedDate.toISOString().split('T')[0]}`)}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                작성하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                showConfirmModal === 'check-in' ? 'bg-emerald-100' : 'bg-teal-100'
              }`}>
                <i className={`text-3xl ${
                  showConfirmModal === 'check-in' 
                    ? 'ri-login-box-line text-emerald-600' 
                    : 'ri-logout-box-line text-teal-600'
                }`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {showConfirmModal === 'check-in' ? '출근 처리' : '퇴근 처리'}
              </h3>
              <p className="text-gray-600">
                {showConfirmModal === 'check-in' 
                  ? '출근 처리하시겠습니까?' 
                  : '퇴근 처리하시겠습니까?'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                현재 시간: {formatTime(currentTime)}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={showConfirmModal === 'check-in' ? handleCheckIn : handleCheckOut}
                disabled={isLoading}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 ${
                  showConfirmModal === 'check-in'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {isLoading ? (
                  <i className="ri-loader-4-line animate-spin"></i>
                ) : (
                  '확인'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 알림 */}
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
          <div className={`px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
            showToast.type === 'success' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            <i className={`text-2xl ${
              showToast.type === 'success' 
                ? 'ri-checkbox-circle-line' 
                : 'ri-error-warning-line'
            }`}></i>
            <span className="font-medium">{showToast.message}</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
