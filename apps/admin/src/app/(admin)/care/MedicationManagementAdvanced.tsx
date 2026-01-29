import React, { useState } from 'react';

interface Medication {
  id: string;
  drugName: string;
  ingredient: string;
  dosage: string;
  route: string;
  schedule: string;
  caution: string;
}

interface Prescription {
  id: string;
  beneficiaryName: string;
  room: string;
  medication: string;
  startDate: string;
  endDate: string;
  times: string[];
  frequency: string;
  status: string;
}

const MedicationManagementAdvanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'master' | 'prescription' | 'log' | 'report'>('master');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // 약품 마스터 데이터
  const medications: Medication[] = [
    {
      id: '1',
      drugName: '아스피린',
      ingredient: '아세틸살리실산',
      dosage: '100mg',
      route: '경구',
      schedule: '1일 1회',
      caution: '공복 복용 금지',
    },
    {
      id: '2',
      drugName: '메트포르민',
      ingredient: '메트포르민염산염',
      dosage: '500mg',
      route: '경구',
      schedule: '1일 2회',
      caution: '식후 복용',
    },
  ];

  // 처방 데이터
  const prescriptions: Prescription[] = [
    {
      id: '1',
      beneficiaryName: '김영희',
      room: '101호',
      medication: '아스피린 100mg',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      times: ['아침'],
      frequency: '1일 1회',
      status: '진행중',
    },
    {
      id: '2',
      beneficiaryName: '이철수',
      room: '102호',
      medication: '메트포르민 500mg',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      times: ['아침', '저녁'],
      frequency: '1일 2회',
      status: '진행중',
    },
  ];

  const tabs = [
    { id: 'master', label: '약품 마스터', icon: 'ri-medicine-bottle-line' },
    { id: 'prescription', label: '처방/스케줄', icon: 'ri-calendar-line' },
    { id: 'log', label: '투약 실행 로그', icon: 'ri-file-list-line' },
    { id: 'report', label: '투약제공 리포트', icon: 'ri-bar-chart-line' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">투약 관리</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            <i className="ri-add-line mr-2"></i>
            추가
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* 약품 마스터 탭 */}
        {activeTab === 'master' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">약품명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">성분</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">용량</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">투여경로</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">주기</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">주의사항</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {medications.map((med) => (
                  <tr key={med.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{med.drugName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{med.ingredient}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{med.dosage}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{med.route}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{med.schedule}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{med.caution}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium mr-3">
                        수정
                      </button>
                      <button className="text-red-600 hover:text-red-700 font-medium">
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 처방/스케줄 탭 */}
        {activeTab === 'prescription' && (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{prescription.beneficiaryName}</h3>
                    <p className="text-sm text-gray-600">{prescription.room}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {prescription.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">약품</label>
                    <p className="text-gray-900">{prescription.medication}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">복용 주기</label>
                    <p className="text-gray-900">{prescription.frequency}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                    <p className="text-gray-900">{prescription.startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
                    <p className="text-gray-900">{prescription.endDate}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">복용 시간대</label>
                  <div className="flex gap-2">
                    {prescription.times.map((time) => (
                      <span key={time} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                    수정
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    중단
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 투약 실행 로그 탭 */}
        {activeTab === 'log' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <button className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                  조회
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">약품</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시간대</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">복용여부</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">미복용사유</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이상반응</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">확인자</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">김영희</td>
                      <td className="px-6 py-4 text-sm text-gray-600">아스피린 100mg</td>
                      <td className="px-6 py-4 text-sm text-gray-600">아침</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                          복용완료
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">-</td>
                      <td className="px-6 py-4 text-sm text-gray-600">없음</td>
                      <td className="px-6 py-4 text-sm text-gray-600">박간호사</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">이철수</td>
                      <td className="px-6 py-4 text-sm text-gray-600">메트포르민 500mg</td>
                      <td className="px-6 py-4 text-sm text-gray-600">아침</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          미복용
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">거부</td>
                      <td className="px-6 py-4 text-sm text-gray-600">-</td>
                      <td className="px-6 py-4 text-sm text-gray-600">김요양사</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 투약제공 리포트 탭 */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">총 처방</span>
                  <i className="ri-medicine-bottle-line text-blue-500 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">24건</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">복용완료</span>
                  <i className="ri-check-line text-emerald-500 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-emerald-600">22건</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">미복용</span>
                  <i className="ri-close-line text-red-500 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-red-600">2건</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">이상반응</span>
                  <i className="ri-alert-line text-orange-500 text-xl"></i>
                </div>
                <p className="text-2xl font-bold text-orange-600">0건</p>
              </div>
            </div>

            {/* 수급자별 투약 현황 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">수급자별 투약 현황</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">처방수</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">복용완료</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">미복용</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">복용률</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">김영희</td>
                      <td className="px-6 py-4 text-sm text-gray-600">101호</td>
                      <td className="px-6 py-4 text-sm text-gray-600">3</td>
                      <td className="px-6 py-4 text-sm text-emerald-600">3</td>
                      <td className="px-6 py-4 text-sm text-red-600">0</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">100%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">이철수</td>
                      <td className="px-6 py-4 text-sm text-gray-600">102호</td>
                      <td className="px-6 py-4 text-sm text-gray-600">2</td>
                      <td className="px-6 py-4 text-sm text-emerald-600">1</td>
                      <td className="px-6 py-4 text-sm text-red-600">1</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 다운로드 버튼 */}
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                <i className="ri-file-pdf-line mr-2"></i>
                PDF 다운로드
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                <i className="ri-file-excel-line mr-2"></i>
                엑셀 다운로드
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationManagementAdvanced;
