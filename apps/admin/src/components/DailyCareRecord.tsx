import React, { useState } from 'react';

interface Beneficiary {
  id: string;
  name: string;
  room: string;
  grade: string;
  status: string;
}

const DailyCareRecord: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [activeTab, setActiveTab] = useState<'nursing' | 'weight' | 'oral' | 'emergency' | 'elimination'>('nursing');
  const [statusFilter, setStatusFilter] = useState('입소중');
  const [searchQuery, setSearchQuery] = useState('');

  // 임시 수급자 데이터
  const beneficiaries: Beneficiary[] = [
    { id: '1', name: '김영희', room: '101호', grade: '1등급', status: '입소중' },
    { id: '2', name: '이철수', room: '102호', grade: '2등급', status: '입소중' },
    { id: '3', name: '박순자', room: '103호', grade: '3등급', status: '입소중' },
    { id: '4', name: '최민수', room: '201호', grade: '2등급', status: '입소중' },
    { id: '5', name: '정미경', room: '202호', grade: '1등급', status: '입소중' },
  ];

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.status === statusFilter && 
    (b.name.includes(searchQuery) || b.room.includes(searchQuery))
  );

  // 통합 간호관리 상태
  const [nursingData, setNursingData] = useState({
    vitals: {
      systolic: '',
      diastolic: '',
      pulse: '',
      temperature: '',
      respiration: '',
      glucose: '',
      oxygen: '',
      pain: '',
      weight: '',
    },
    issues: {
      fall: false,
      pressure: false,
      dehydration: false,
      delirium: false,
      incontinence: false,
      pain: false,
      dyspnea: false,
    },
    notes: '',
    intervention: '',
    progress: '',
  });

  // 체중 관리 상태
  const [weightData, setWeightData] = useState({
    weight: '',
    time: '',
    method: '체중계',
  });

  // 구강상태 점검 상태
  const [oralData, setOralData] = useState({
    cleanliness: '정상',
    gums: '정상',
    stomatitis: '없음',
    denture: '정상',
    halitosis: '없음',
    pain: '없음',
    bleeding: '없음',
    action: '',
  });

  // 응급상황 기록 상태
  const [emergencyData, setEmergencyData] = useState({
    datetime: '',
    discoverer: '',
    category: '낙상',
    initialResponse: '',
    followUp: '',
    contact119: false,
    contactFamily: false,
    hospitalTransfer: false,
  });

  // 배설/비위관/도뇨관 상태
  const [eliminationData, setEliminationData] = useState({
    bowelCount: '',
    bowelNature: '정상',
    urineCount: '',
    urineNature: '정상',
    ngTube: false,
    ngTubeChange: '',
    ngTubeCleaning: '',
    catheter: false,
    catheterIssue: '',
  });

  const tabs = [
    { id: 'nursing', label: '통합 간호관리', icon: 'ri-heart-pulse-line' },
    { id: 'weight', label: '체중 관리', icon: 'ri-scales-3-line' },
    { id: 'oral', label: '구강상태 점검', icon: 'ri-tooth-line' },
    { id: 'emergency', label: '응급상황 기록', icon: 'ri-alarm-warning-line' },
    { id: 'elimination', label: '배설/비위관/도뇨관', icon: 'ri-file-list-line' },
  ];

  const handleSave = () => {
    alert('저장되었습니다.');
  };

  const handleTempSave = () => {
    alert('임시저장되었습니다.');
  };

  const handleFinalize = () => {
    if (confirm('마감하시겠습니까? 마감 후에는 수정이 제한됩니다.')) {
      alert('마감되었습니다.');
    }
  };

  return (
    <div className="flex h-full">
      {/* 좌측: 수급자 목록 */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">일일 케어 기록</h2>
          
          {/* 날짜 선택 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">기준일</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* 현황 선택 */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">현황</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="입소중">입소중</option>
              <option value="퇴소">퇴소</option>
              <option value="전체">전체</option>
            </select>
          </div>

          {/* 검색 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">수급자 검색</label>
            <input
              type="text"
              placeholder="이름 또는 방호실"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* 수급자 리스트 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredBeneficiaries.map((beneficiary) => (
            <button
              key={beneficiary.id}
              onClick={() => setSelectedBeneficiary(beneficiary)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                selectedBeneficiary?.id === beneficiary.id
                  ? 'bg-emerald-50 border-2 border-emerald-500'
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">{beneficiary.name}</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                  {beneficiary.grade}
                </span>
              </div>
              <div className="text-sm text-gray-600">{beneficiary.room}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 우측: 상세 입력 */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedBeneficiary ? (
          <>
            {/* 수급자 정보 헤더 */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedBeneficiary.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedBeneficiary.room} · {selectedBeneficiary.grade} · {selectedDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleTempSave}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    임시저장
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleFinalize}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    마감
                  </button>
                </div>
              </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="bg-white border-b border-gray-200 px-4">
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

            {/* 탭 컨텐츠 */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* 통합 간호관리 탭 */}
              {activeTab === 'nursing' && (
                <div className="space-y-6">
                  {/* 바이탈 기록 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">바이탈 기록</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          혈압 (수축/이완)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="수축"
                            value={nursingData.vitals.systolic}
                            onChange={(e) => setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, systolic: e.target.value }
                            })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          <input
                            type="number"
                            placeholder="이완"
                            value={nursingData.vitals.diastolic}
                            onChange={(e) => setNursingData({
                              ...nursingData,
                              vitals: { ...nursingData.vitals, diastolic: e.target.value }
                            })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          맥박 (회/분)
                        </label>
                        <input
                          type="number"
                          value={nursingData.vitals.pulse}
                          onChange={(e) => setNursingData({
                            ...nursingData,
                            vitals: { ...nursingData.vitals, pulse: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          체온 (°C)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={nursingData.vitals.temperature}
                          onChange={(e) => setNursingData({
                            ...nursingData,
                            vitals: { ...nursingData.vitals, temperature: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          호흡 (회/분)
                        </label>
                        <input
                          type="number"
                          value={nursingData.vitals.respiration}
                          onChange={(e) => setNursingData({
                            ...nursingData,
                            vitals: { ...nursingData.vitals, respiration: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          혈당 (mg/dL)
                        </label>
                        <input
                          type="number"
                          value={nursingData.vitals.glucose}
                          onChange={(e) => setNursingData({
                            ...nursingData,
                            vitals: { ...nursingData.vitals, glucose: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          산소포화도 (%)
                        </label>
                        <input
                          type="number"
                          value={nursingData.vitals.oxygen}
                          onChange={(e) => setNursingData({
                            ...nursingData,
                            vitals: { ...nursingData.vitals, oxygen: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          통증척도 (0-10)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={nursingData.vitals.pain}
                          onChange={(e) => setNursingData({
                            ...nursingData,
                            vitals: { ...nursingData.vitals, pain: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          체중 (kg)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={nursingData.vitals.weight}
                          onChange={(e) => setNursingData({
                            ...nursingData,
                            vitals: { ...nursingData.vitals, weight: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 증상/문제 체크 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">증상/문제 체크</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries({
                        fall: '낙상위험',
                        pressure: '욕창위험',
                        dehydration: '탈수',
                        delirium: '섬망',
                        incontinence: '실금',
                        pain: '통증',
                        dyspnea: '호흡곤란',
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={nursingData.issues[key as keyof typeof nursingData.issues]}
                            onChange={(e) => setNursingData({
                              ...nursingData,
                              issues: { ...nursingData.issues, [key]: e.target.checked }
                            })}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 간호기록 서술 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">간호기록 서술</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          특이사항
                        </label>
                        <textarea
                          rows={3}
                          value={nursingData.notes}
                          onChange={(e) => setNursingData({ ...nursingData, notes: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="특이사항을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          중재내용
                        </label>
                        <textarea
                          rows={3}
                          value={nursingData.intervention}
                          onChange={(e) => setNursingData({ ...nursingData, intervention: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="중재내용을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          경과
                        </label>
                        <textarea
                          rows={3}
                          value={nursingData.progress}
                          onChange={(e) => setNursingData({ ...nursingData, progress: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="경과를 입력하세요"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 체중 관리 탭 */}
              {activeTab === 'weight' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">체중 입력</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          체중 (kg)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={weightData.weight}
                          onChange={(e) => setWeightData({ ...weightData, weight: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          측정시간
                        </label>
                        <input
                          type="time"
                          value={weightData.time}
                          onChange={(e) => setWeightData({ ...weightData, time: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          측정방법
                        </label>
                        <select
                          value={weightData.method}
                          onChange={(e) => setWeightData({ ...weightData, method: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="체중계">체중계</option>
                          <option value="휠체어 체중계">휠체어 체중계</option>
                          <option value="침대 체중계">침대 체중계</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 체중 추이 그래프 영역 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">체중 추이 (최근 30일)</h4>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">그래프 영역 (차트 라이브러리 연동 필요)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 구강상태 점검 탭 */}
              {activeTab === 'oral' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">구강상태 점검</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries({
                        cleanliness: '구강청결',
                        gums: '잇몸상태',
                        stomatitis: '구내염',
                        denture: '의치상태',
                        halitosis: '구취',
                        pain: '통증',
                        bleeding: '출혈',
                      }).map(([key, label]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                          </label>
                          <select
                            value={oralData[key as keyof typeof oralData]}
                            onChange={(e) => setOralData({ ...oralData, [key]: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="정상">정상</option>
                            <option value="주의">주의</option>
                            <option value="조치필요">조치필요</option>
                            <option value="없음">없음</option>
                          </select>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        조치내용
                      </label>
                      <textarea
                        rows={3}
                        value={oralData.action}
                        onChange={(e) => setOralData({ ...oralData, action: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="조치내용을 입력하세요"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 응급상황 기록 탭 */}
              {activeTab === 'emergency' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">응급상황 기록</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            발생일시
                          </label>
                          <input
                            type="datetime-local"
                            value={emergencyData.datetime}
                            onChange={(e) => setEmergencyData({ ...emergencyData, datetime: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            발견자
                          </label>
                          <input
                            type="text"
                            value={emergencyData.discoverer}
                            onChange={(e) => setEmergencyData({ ...emergencyData, discoverer: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="발견자 이름"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          상황분류
                        </label>
                        <select
                          value={emergencyData.category}
                          onChange={(e) => setEmergencyData({ ...emergencyData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="낙상">낙상</option>
                          <option value="호흡곤란">호흡곤란</option>
                          <option value="경련">경련</option>
                          <option value="출혈">출혈</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          초기대응
                        </label>
                        <textarea
                          rows={3}
                          value={emergencyData.initialResponse}
                          onChange={(e) => setEmergencyData({ ...emergencyData, initialResponse: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="초기대응 내용을 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          후속조치
                        </label>
                        <textarea
                          rows={3}
                          value={emergencyData.followUp}
                          onChange={(e) => setEmergencyData({ ...emergencyData, followUp: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="후속조치 내용을 입력하세요"
                        />
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emergencyData.contact119}
                            onChange={(e) => setEmergencyData({ ...emergencyData, contact119: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">119 연락</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emergencyData.contactFamily}
                            onChange={(e) => setEmergencyData({ ...emergencyData, contactFamily: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">보호자 연락</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emergencyData.hospitalTransfer}
                            onChange={(e) => setEmergencyData({ ...emergencyData, hospitalTransfer: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">병원 이송</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 배설/비위관/도뇨관 탭 */}
              {activeTab === 'elimination' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">배설 기록</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          배변 횟수
                        </label>
                        <input
                          type="number"
                          value={eliminationData.bowelCount}
                          onChange={(e) => setEliminationData({ ...eliminationData, bowelCount: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          배변 성상
                        </label>
                        <select
                          value={eliminationData.bowelNature}
                          onChange={(e) => setEliminationData({ ...eliminationData, bowelNature: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="정상">정상</option>
                          <option value="설사">설사</option>
                          <option value="변비">변비</option>
                          <option value="혈변">혈변</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          배뇨 횟수
                        </label>
                        <input
                          type="number"
                          value={eliminationData.urineCount}
                          onChange={(e) => setEliminationData({ ...eliminationData, urineCount: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          배뇨 성상
                        </label>
                        <select
                          value={eliminationData.urineNature}
                          onChange={(e) => setEliminationData({ ...eliminationData, urineNature: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="정상">정상</option>
                          <option value="혈뇨">혈뇨</option>
                          <option value="농뇨">농뇨</option>
                          <option value="혼탁">혼탁</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">비위관 관리</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={eliminationData.ngTube}
                          onChange={(e) => setEliminationData({ ...eliminationData, ngTube: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium text-gray-700">비위관 삽입</span>
                      </label>
                      {eliminationData.ngTube && (
                        <div className="grid grid-cols-2 gap-4 pl-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              교체일
                            </label>
                            <input
                              type="date"
                              value={eliminationData.ngTubeChange}
                              onChange={(e) => setEliminationData({ ...eliminationData, ngTubeChange: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              세척 여부
                            </label>
                            <input
                              type="text"
                              value={eliminationData.ngTubeCleaning}
                              onChange={(e) => setEliminationData({ ...eliminationData, ngTubeCleaning: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="세척 내용"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">도뇨관 관리</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={eliminationData.catheter}
                          onChange={(e) => setEliminationData({ ...eliminationData, catheter: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm font-medium text-gray-700">도뇨관 유치</span>
                      </label>
                      {eliminationData.catheter && (
                        <div className="pl-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            문제/특이사항
                          </label>
                          <textarea
                            rows={3}
                            value={eliminationData.catheterIssue}
                            onChange={(e) => setEliminationData({ ...eliminationData, catheterIssue: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="문제 또는 특이사항을 입력하세요"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <i className="ri-user-search-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">수급자를 선택하세요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyCareRecord;
