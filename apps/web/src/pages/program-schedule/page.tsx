import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';
import NoticeSidebar from '../../components/feature/NoticeSidebar';

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

interface Program {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  category: string;
  color: string;
  staff: string;
  description: string;
}

const CATEGORIES = [
  { id: 'cognitive', name: '인지활동', color: '#8B5CF6', icon: 'ri-brain-line' },
  { id: 'leisure', name: '여가활동', color: '#EC4899', icon: 'ri-music-line' },
  { id: 'physical', name: '물리치료', color: '#10B981', icon: 'ri-heart-pulse-line' },
  { id: 'music', name: '음악치료', color: '#3B82F6', icon: 'ri-headphone-line' },
  { id: 'art', name: '미술활동', color: '#F59E0B', icon: 'ri-palette-line' },
  { id: 'event', name: '특별행사', color: '#EF4444', icon: 'ri-gift-line' },
];

export default function ProgramSchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, [currentMonth]);

  const loadPrograms = async () => {
    setIsLoading(true);
    try {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const startDate = new Date(year, month, 1).toISOString().split('T')[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('program_schedules')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;

      setPrograms(data || []);
    } catch (error) {
      console.error('프로그램 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['전체', ...CATEGORIES.map(c => c.name)];

  const filteredPrograms = selectedCategory === '전체' 
    ? programs
    : programs.filter(p => {
        const category = CATEGORIES.find(c => c.id === p.category);
        return category?.name === selectedCategory;
      });

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  };

  const openProgramDetail = (programId: string) => {
    setSelectedProgram(programId);
    document.body.style.overflow = 'hidden';
  };

  const closeProgramDetail = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'auto';
  };

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getProgramsForDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return filteredPrograms.filter(p => p.date === dateStr);
  };

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // Render week day headers
    const headers = weekDays.map((day, index) => (
      <div
        key={`header-${index}`}
        className={`text-center font-bold text-sm py-3 border-b-2 ${
          index === 0 ? 'text-red-600 border-red-200' : index === 6 ? 'text-blue-600 border-blue-200' : 'text-gray-700 border-gray-200'
        }`}
      >
        {day}
      </div>
    ));

    // Render empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-32 bg-gray-50 border border-gray-100"></div>
      );
    }

    // Render days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayOfWeek = date.getDay();
      const programs = getProgramsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          className={`min-h-32 border border-gray-200 p-2 ${
            dayOfWeek === 0 ? 'bg-red-50/30' : dayOfWeek === 6 ? 'bg-blue-50/30' : 'bg-white'
          } ${isToday ? 'ring-2 ring-purple-600' : ''}`}
        >
          <div className={`text-sm font-bold mb-2 ${
            dayOfWeek === 0 ? 'text-red-600' : dayOfWeek === 6 ? 'text-blue-600' : 'text-gray-700'
          } ${isToday ? 'bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
            {day}
          </div>
          <div className="space-y-1">
            {programs.slice(0, 3).map((program) => {
              const categoryInfo = getCategoryInfo(program.category);
              return (
                <div
                  key={program.id}
                  onClick={() => openProgramDetail(program.id)}
                  className="text-xs p-1.5 rounded cursor-pointer hover:shadow-sm transition-all"
                  style={{ 
                    backgroundColor: categoryInfo.color + '20',
                    borderLeft: `3px solid ${categoryInfo.color}`
                  }}
                >
                  <div className="font-medium line-clamp-1 text-gray-800">
                    {program.start_time} {program.title}
                  </div>
                </div>
              );
            })}
            {programs.length > 3 && (
              <div className="text-xs text-gray-500 text-center pt-1">
                +{programs.length - 3}개 더보기
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-7">
          {headers}
        </div>
        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <i className="ri-loader-4-line text-4xl text-purple-600 animate-spin"></i>
            <p className="mt-4 text-gray-600">프로그램을 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <FloatingSidebar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-teal-50 py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                프로그램 일정표
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                월간 활동 일정을 한눈에 확인하세요
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-gray-50/80 py-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-teal-600 transition-colors">홈</Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <Link to="/communities" className="hover:text-teal-600 transition-colors">알림마당</Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-700">프로그램 일정표</span>
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <NoticeSidebar />

            {/* Main Content */}
            <div className="flex-1">
              {/* Month Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={goToPreviousMonth}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      aria-label="이전 달"
                    >
                      <i className="ri-arrow-left-s-line text-xl"></i>
                    </button>
                    <button
                      onClick={goToToday}
                      className="px-4 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      오늘
                    </button>
                    <button
                      onClick={goToNextMonth}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      aria-label="다음 달"
                    >
                      <i className="ri-arrow-right-s-line text-xl"></i>
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                      viewMode === 'calendar'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-calendar-line mr-2"></i>
                    달력 보기
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                      viewMode === 'list'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-list-check mr-2"></i>
                    목록 보기
                  </button>
                </div>
              </div>

              {/* Category Legend */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-4">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? '전체' : category.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all whitespace-nowrap ${
                        selectedCategory === category.name || selectedCategory === '전체'
                          ? 'border-gray-300 bg-white'
                          : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                      style={{ 
                        borderColor: selectedCategory === category.name ? category.color : undefined 
                      }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <i className={`${category.icon} text-xs text-white`}></i>
                      </div>
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar View */}
              {viewMode === 'calendar' && renderCalendarView()}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-3">
                  {filteredPrograms.map((program) => {
                    const categoryInfo = getCategoryInfo(program.category);
                    return (
                      <div
                        key={program.id}
                        onClick={() => openProgramDetail(program.id)}
                        className="bg-white border-l-4 rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer"
                        style={{ borderLeftColor: categoryInfo.color }}
                      >
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: categoryInfo.color }}
                          >
                            <i className={`${categoryInfo.icon} text-2xl text-white`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">{program.title}</h3>
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: categoryInfo.color }}
                              >
                                {categoryInfo.name}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{program.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <i className="ri-calendar-line"></i>
                                <span>{new Date(program.date).toLocaleDateString('ko-KR')}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <i className="ri-time-line"></i>
                                <span>{program.start_time} - {program.end_time}</span>
                              </div>
                              {program.staff && (
                                <div className="flex items-center gap-1.5">
                                  <i className="ri-user-line"></i>
                                  <span>{program.staff}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {filteredPrograms.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <i className="ri-calendar-close-line text-4xl text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    프로그램이 없습니다
                  </h3>
                  <p className="text-gray-600">
                    {selectedCategory === '전체' ? '이번 달에 등록된 프로그램이 없습니다' : '다른 카테고리를 선택해보세요'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Program Detail Modal */}
      {selectedProgram && selectedProgramData && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeProgramDetail}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const categoryInfo = getCategoryInfo(selectedProgramData.category);
                    return (
                      <>
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: categoryInfo.color }}
                        >
                          <i className={`${categoryInfo.icon} text-2xl text-white`}></i>
                        </div>
                        <span 
                          className="px-4 py-1.5 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: categoryInfo.color }}
                        >
                          {categoryInfo.name}
                        </span>
                      </>
                    );
                  })()}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedProgramData.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="ri-calendar-line"></i>
                    <span>{new Date(selectedProgramData.date).toLocaleDateString('ko-KR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    <span>{selectedProgramData.start_time} - {selectedProgramData.end_time}</span>
                  </div>
                  {selectedProgramData.staff && (
                    <div className="flex items-center gap-2">
                      <i className="ri-user-line"></i>
                      <span>{selectedProgramData.staff}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={closeProgramDetail}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                aria-label="닫기"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">프로그램 설명</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedProgramData.description || '프로그램 설명이 없습니다.'}
              </p>

              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3">참여 안내</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-teal-600 mt-0.5"></i>
                    <span>모든 어르신께서 자유롭게 참여하실 수 있습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-teal-600 mt-0.5"></i>
                    <span>건강 상태에 따라 프로그램이 조정될 수 있습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-teal-600 mt-0.5"></i>
                    <span>전문 강사가 함께 진행합니다</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
