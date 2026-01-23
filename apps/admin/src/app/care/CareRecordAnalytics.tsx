import { useEffect, useState } from 'react';
import { supabase } from '../../../../../src/supabaseClient';

type TabType = 'special_notes' | 'meal_toilet' | 'facility_meals' | 'beneficiary_meals' | 'meal_actions' | 'diaper_usage';

interface FilterOptions {
  dateFrom: string;
  dateTo: string;
  beneficiaryId: string;
  criteria: string;
}

export default function CareRecordAnalytics() {
  const [activeTab, setActiveTab] = useState<TabType>('special_notes');
  const [filters, setFilters] = useState<FilterOptions>({
    dateFrom: new Date().toISOString().split('T')[0],
    dateTo: new Date().toISOString().split('T')[0],
    beneficiaryId: 'all',
    criteria: 'name',
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // 임시 수급자 목록
  const beneficiaries = [
    { id: 1, name: '김영희', grade: '1등급', room: '본관 101호' },
    { id: 2, name: '박철수', grade: '2등급', room: '본관 102호' },
    { id: 3, name: '이순자', grade: '3등급', room: '본관 201호' },
    { id: 4, name: '최동식', grade: '4등급', room: '본관 202호' },
    { id: 5, name: '정미숙', grade: '5등급', room: '신관 101호' },
  ];

  useEffect(() => {
    loadData();
  }, [activeTab, filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'special_notes':
          await loadSpecialNotes();
          break;
        case 'meal_toilet':
          await loadMealToiletRecords();
          break;
        case 'facility_meals':
          await loadFacilityMeals();
          break;
        case 'beneficiary_meals':
          await loadBeneficiaryMeals();
          break;
        case 'meal_actions':
          await loadMealActions();
          break;
        case 'diaper_usage':
          await loadDiaperUsage();
          break;
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecialNotes = async () => {
    try {
      const { data: notes } = await supabase
        .from('care_nursing_notes')
        .select('*')
        .gte('record_date', filters.dateFrom)
        .lte('record_date', filters.dateTo);

      if (notes) {
        const enriched = notes.map(note => ({
          ...note,
          beneficiary_name: beneficiaries.find(b => b.id === note.beneficiary_id)?.name || '알 수 없음',
        }));
        setData(enriched);
      }
    } catch (error) {
      console.error('특이사항 로드 실패:', error);
    }
  };

  const loadMealToiletRecords = async () => {
    try {
      const { data: meals } = await supabase
        .from('care_meal_records')
        .select('*')
        .gte('record_date', filters.dateFrom)
        .lte('record_date', filters.dateTo);

      if (meals) {
        const enriched = meals.map(meal => ({
          ...meal,
          beneficiary_name: beneficiaries.find(b => b.id === meal.beneficiary_id)?.name || '알 수 없음',
        }));
        setData(enriched);
      }
    } catch (error) {
      console.error('식사/화장실 기록 로드 실패:', error);
    }
  };

  const loadFacilityMeals = async () => {
    try {
      const { data: meals } = await supabase
        .from('care_meal_records')
        .select('*')
        .gte('record_date', filters.dateFrom)
        .lte('record_date', filters.dateTo);

      if (meals) {
        // 집계 계산
        const summary = {
          breakfast: meals.filter(m => m.breakfast_type).length,
          lunch: meals.filter(m => m.lunch_type).length,
          dinner: meals.filter(m => m.dinner_type).length,
          morning_snack: meals.filter(m => m.morning_snack).length,
          afternoon_snack: meals.filter(m => m.afternoon_snack).length,
        };
        setData([summary]);
      }
    } catch (error) {
      console.error('기관 식사 횟수 로드 실패:', error);
    }
  };

  const loadBeneficiaryMeals = async () => {
    try {
      const { data: meals } = await supabase
        .from('care_meal_records')
        .select('*')
        .gte('record_date', filters.dateFrom)
        .lte('record_date', filters.dateTo);

      if (meals) {
        // 수급자별 식사 종류 집계
        const summary = beneficiaries.map(ben => {
          const benMeals = meals.filter(m => m.beneficiary_id === ben.id);
          return {
            beneficiary_name: ben.name,
            regular: benMeals.filter(m =>
              m.breakfast_type === 'regular' || m.lunch_type === 'regular' || m.dinner_type === 'regular'
            ).length,
            porridge: benMeals.filter(m =>
              m.breakfast_type === 'porridge' || m.lunch_type === 'porridge' || m.dinner_type === 'porridge'
            ).length,
            soft: benMeals.filter(m =>
              m.breakfast_type === 'soft' || m.lunch_type === 'soft' || m.dinner_type === 'soft'
            ).length,
            diabetic: benMeals.filter(m =>
              m.breakfast_type === 'diabetic' || m.lunch_type === 'diabetic' || m.dinner_type === 'diabetic'
            ).length,
            therapeutic: benMeals.filter(m =>
              m.breakfast_type === 'therapeutic' || m.lunch_type === 'therapeutic' || m.dinner_type === 'therapeutic'
            ).length,
          };
        });
        setData(summary);
      }
    } catch (error) {
      console.error('수급자 식사 종류 로드 실패:', error);
    }
  };

  const loadMealActions = async () => {
    try {
      const { data: meals } = await supabase
        .from('care_meal_records')
        .select('*')
        .gte('record_date', filters.dateFrom)
        .lte('record_date', filters.dateTo)
        .not('therapeutic_diet', 'is', null);

      if (meals) {
        const enriched = meals.map(meal => ({
          ...meal,
          beneficiary_name: beneficiaries.find(b => b.id === meal.beneficiary_id)?.name || '알 수 없음',
        }));
        setData(enriched);
      }
    } catch (error) {
      console.error('식사지 조치사항 로드 실패:', error);
    }
  };

  const loadDiaperUsage = async () => {
    // 임시 데이터 (실제로는 별도 테이블 필요)
    const mockData = beneficiaries.map(ben => ({
      beneficiary_name: ben.name,
      day_usage: Math.floor(Math.random() * 5) + 3,
      night_usage: Math.floor(Math.random() * 3) + 2,
      total: 0,
    }));
    mockData.forEach(d => d.total = d.day_usage + d.night_usage);
    setData(mockData);
  };

  const exportToExcel = () => {
    alert('엑셀 다운로드 기능은 준비 중입니다.');
  };

  const tabs = [
    { id: 'special_notes', label: '급여제공기록지 특이사항', icon: 'ri-file-list-3-line' },
    { id: 'meal_toilet', label: '식사/화장실 기록지', icon: 'ri-restaurant-line' },
    { id: 'facility_meals', label: '기관 식사/간식 횟수', icon: 'ri-pie-chart-line' },
    { id: 'beneficiary_meals', label: '수급자 식사 종류별 횟수', icon: 'ri-bar-chart-line' },
    { id: 'meal_actions', label: '식사지 조치사항', icon: 'ri-alert-line' },
    { id: 'diaper_usage', label: '기저귀 사용량', icon: 'ri-shopping-bag-line' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">급여제공 기록 조회/집계</h1>
            <p className="text-sm text-gray-600 mt-1">기간별 급여제공 기록을 조회하고 집계합니다</p>
          </div>
          <button
            type="button"
            onClick={exportToExcel}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-file-excel-line mr-2"></i>
            엑셀 다운로드
          </button>
        </div>
      </div>

      {/* 필터 바 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">작성일 (시작)</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">작성일 (종료)</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">수급자</label>
            <select
              value={filters.beneficiaryId}
              onChange={(e) => setFilters({ ...filters, beneficiaryId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">모든 수급자</option>
              {beneficiaries.map(ben => (
                <option key={ben.id} value={ben.id}>{ben.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">기준</label>
            <select
              value={filters.criteria}
              onChange={(e) => setFilters({ ...filters, criteria: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="name">수급자명</option>
              <option value="grade">등급</option>
              <option value="room">생활실</option>
            </select>
          </div>
          <button
            type="button"
            onClick={loadData}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-search-line mr-2"></i>
            조회
          </button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-3 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <i className="ri-loader-4-line animate-spin text-4xl text-emerald-600 mb-4"></i>
              <p className="text-gray-600">데이터를 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* 급여제공기록지 특이사항 */}
            {activeTab === 'special_notes' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">날짜</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">수급자명</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">신체활동도움 특이사항</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">인지관리 특이사항</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">건강/간호관리 특이사항</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">기능회복훈련 특이사항</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          조회된 데이터가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      data.map((record, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">{record.record_date}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{record.beneficiary_name}</td>
                          <td className="px-4 py-3 text-gray-700">{record.notes || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">-</td>
                          <td className="px-4 py-3 text-gray-700">{record.notes || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">-</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 식사/화장실 기록지 */}
            {activeTab === 'meal_toilet' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">날짜</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">수급자명</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">아침</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">점심</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">저녁</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">오전간식</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">오후간식</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">완료</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                          조회된 데이터가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      data.map((record, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">{record.record_date}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{record.beneficiary_name}</td>
                          <td className="px-4 py-3 text-center">
                            {record.breakfast_type ? (
                              <i className="ri-check-line text-green-600"></i>
                            ) : (
                              <i className="ri-close-line text-red-600"></i>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {record.lunch_type ? (
                              <i className="ri-check-line text-green-600"></i>
                            ) : (
                              <i className="ri-close-line text-red-600"></i>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {record.dinner_type ? (
                              <i className="ri-check-line text-green-600"></i>
                            ) : (
                              <i className="ri-close-line text-red-600"></i>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {record.morning_snack ? (
                              <i className="ri-check-line text-green-600"></i>
                            ) : (
                              <i className="ri-close-line text-gray-400"></i>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {record.afternoon_snack ? (
                              <i className="ri-check-line text-green-600"></i>
                            ) : (
                              <i className="ri-close-line text-gray-400"></i>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {record.completed ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                완료
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                미완료
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 기관 식사/간식 횟수 */}
            {activeTab === 'facility_meals' && (
              <div className="p-6">
                {data.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    조회된 데이터가 없습니다.
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-700">아침</span>
                        <i className="ri-sun-line text-2xl text-blue-600"></i>
                      </div>
                      <div className="text-3xl font-bold text-blue-900">{data[0].breakfast}</div>
                      <div className="text-xs text-blue-600 mt-1">회</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-700">점심</span>
                        <i className="ri-sun-fill text-2xl text-green-600"></i>
                      </div>
                      <div className="text-3xl font-bold text-green-900">{data[0].lunch}</div>
                      <div className="text-xs text-green-600 mt-1">회</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-orange-700">저녁</span>
                        <i className="ri-moon-line text-2xl text-orange-600"></i>
                      </div>
                      <div className="text-3xl font-bold text-orange-900">{data[0].dinner}</div>
                      <div className="text-xs text-orange-600 mt-1">회</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-700">오전간식</span>
                        <i className="ri-cake-line text-2xl text-purple-600"></i>
                      </div>
                      <div className="text-3xl font-bold text-purple-900">{data[0].morning_snack}</div>
                      <div className="text-xs text-purple-600 mt-1">회</div>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-pink-700">오후간식</span>
                        <i className="ri-cake-2-line text-2xl text-pink-600"></i>
                      </div>
                      <div className="text-3xl font-bold text-pink-900">{data[0].afternoon_snack}</div>
                      <div className="text-xs text-pink-600 mt-1">회</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 수급자 식사 종류별 횟수 */}
            {activeTab === 'beneficiary_meals' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">수급자명</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">일반식</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">죽</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">연식</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">당뇨식</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">치료식</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 bg-emerald-50">합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                          조회된 데이터가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      <>
                        {data.map((record, index) => (
                          <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{record.beneficiary_name}</td>
                            <td className="px-4 py-3 text-center text-gray-700">{record.regular}</td>
                            <td className="px-4 py-3 text-center text-gray-700">{record.porridge}</td>
                            <td className="px-4 py-3 text-center text-gray-700">{record.soft}</td>
                            <td className="px-4 py-3 text-center text-gray-700">{record.diabetic}</td>
                            <td className="px-4 py-3 text-center text-gray-700">{record.therapeutic}</td>
                            <td className="px-4 py-3 text-center font-bold text-emerald-700 bg-emerald-50">
                              {record.regular + record.porridge + record.soft + record.diabetic + record.therapeutic}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                          <td className="px-4 py-3 text-gray-900">합계</td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {data.reduce((sum, r) => sum + r.regular, 0)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {data.reduce((sum, r) => sum + r.porridge, 0)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {data.reduce((sum, r) => sum + r.soft, 0)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {data.reduce((sum, r) => sum + r.diabetic, 0)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {data.reduce((sum, r) => sum + r.therapeutic, 0)}
                          </td>
                          <td className="px-4 py-3 text-center text-emerald-700 bg-emerald-100">
                            {data.reduce((sum, r) => sum + r.regular + r.porridge + r.soft + r.diabetic + r.therapeutic, 0)}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 식사지 조치사항 */}
            {activeTab === 'meal_actions' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">날짜</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">수급자명</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">치료식이</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                          조회된 데이터가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      data.map((record, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">{record.record_date}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{record.beneficiary_name}</td>
                          <td className="px-4 py-3 text-gray-700">{record.therapeutic_diet}</td>
                          <td className="px-4 py-3 text-gray-700">{record.therapeutic_diet_note || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 기저귀 사용량 */}
            {activeTab === 'diaper_usage' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">수급자명</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">주간 사용량</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">야간 사용량</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 bg-emerald-50">합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                          조회된 데이터가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      <>
                        {data.map((record, index) => (
                          <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{record.beneficiary_name}</td>
                            <td className="px-4 py-3 text-center text-gray-700">{record.day_usage}개</td>
                            <td className="px-4 py-3 text-center text-gray-700">{record.night_usage}개</td>
                            <td className="px-4 py-3 text-center font-bold text-emerald-700 bg-emerald-50">
                              {record.total}개
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                          <td className="px-4 py-3 text-gray-900">합계</td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {data.reduce((sum, r) => sum + r.day_usage, 0)}개
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {data.reduce((sum, r) => sum + r.night_usage, 0)}개
                          </td>
                          <td className="px-4 py-3 text-center text-emerald-700 bg-emerald-100">
                            {data.reduce((sum, r) => sum + r.total, 0)}개
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
