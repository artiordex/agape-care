import React, { useState } from 'react';

interface Beneficiary {
  id: string;
  name: string;
  room: string;
  grade: string;
  riskLevel: string;
}

const NeedsAssessmentAdvanced: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assessment' | 'pressure-risk' | 'pressure-care' | 'risk-list'>('assessment');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  // 임시 수급자 데이터
  const beneficiaries: Beneficiary[] = [
    { id: '1', name: '김영희', room: '101호', grade: '1등급', riskLevel: '고위험' },
    { id: '2', name: '이철수', room: '102호', grade: '2등급', riskLevel: '중위험' },
    { id: '3', name: '박순자', room: '103호', grade: '3등급', riskLevel: '저위험' },
    { id: '4', name: '최민수', room: '201호', grade: '2등급', riskLevel: '고위험' },
    { id: '5', name: '정미경', room: '202호', grade: '1등급', riskLevel: '중위험' },
  ];

  // 욕구사정 상태
  const [assessmentData, setAssessmentData] = useState({
    physical: {
      mobility: '',
      adl: '',
      pain: '',
    },
    cognitive: {
      memory: '',
      communication: '',
      behavior: '',
    },
    emotional: {
      mood: '',
      anxiety: '',
      depression: '',
    },
    nutrition: {
      appetite: '',
      weight: '',
      swallowing: '',
    },
    elimination: {
      bowel: '',
      urinary: '',
      incontinence: '',
    },
    pressure: {
      bradenScore: 0,
      sensoryPerception: 0,
      moisture: 0,
      activity: 0,
      mobility: 0,
      nutrition: 0,
      friction: 0,
    },
    fall: {
      history: false,
      gait: '',
      balance: '',
    },
  });

  const tabs = [
    { id: 'assessment', label: '욕구사정 입력', icon: 'ri-file-edit-line' },
    { id: 'pressure-risk', label: '욕창 위험 평가', icon: 'ri-alert-line' },
    { id: 'pressure-care', label: '욕창예방/간호 기록', icon: 'ri-heart-pulse-line' },
    { id: 'risk-list', label: '위험군 목록', icon: 'ri-list-check' },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case '고위험':
        return 'bg-red-100 text-red-700';
      case '중위험':
        return 'bg-orange-100 text-orange-700';
      case '저위험':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const calculateBradenScore = () => {
    const { sensoryPerception, moisture, activity, mobility, nutrition, friction } = assessmentData.pressure;
    return sensoryPerception + moisture + activity + mobility + nutrition + friction;
  };

  const getBradenRiskLevel = (score: number) => {
    if (score <= 9) return { level: '매우 고위험', color: 'text-red-600' };
    if (score <= 12) return { level: '고위험', color: 'text-orange-600' };
    if (score <= 14) return { level: '중위험', color: 'text-yellow-600' };
    return { level: '저위험', color: 'text-green-600' };
  };

  const handleSave = () => {
    alert('저장되었습니다.');
  };

  return (
    <div className="h-full flex">
      {/* 좌측: 수급자 목록 */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">욕구사정 평가</h2>
          <input
            type="text"
            placeholder="수급자 검색"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {beneficiaries.map((beneficiary) => (
            <button
              key={beneficiary.id}
              onClick={() => setSelectedBeneficiary(beneficiary)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                selectedBeneficiary?.id === beneficiary.id
                  ? 'bg-emerald-50 border-2 border-emerald-500'
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{beneficiary.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(beneficiary.riskLevel)}`}>
                  {beneficiary.riskLevel}
                </span>
              </div>
              <div className="text-sm text-gray-600">{beneficiary.room} · {beneficiary.grade}</div>
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
                    {selectedBeneficiary.room} · {selectedBeneficiary.grade}
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                >
                  저장
                </button>
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
              {/* 욕구사정 입력 탭 */}
              {activeTab === 'assessment' && (
                <div className="space-y-6">
                  {/* 신체 기능 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">신체 기능</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이동능력</label>
                        <select
                          value={assessmentData.physical.mobility}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            physical: { ...assessmentData.physical, mobility: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="독립">독립</option>
                          <option value="부분도움">부분도움</option>
                          <option value="완전도움">완전도움</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">일상생활수행능력</label>
                        <select
                          value={assessmentData.physical.adl}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            physical: { ...assessmentData.physical, adl: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="독립">독립</option>
                          <option value="부분도움">부분도움</option>
                          <option value="완전도움">완전도움</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">통증</label>
                        <select
                          value={assessmentData.physical.pain}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            physical: { ...assessmentData.physical, pain: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="없음">없음</option>
                          <option value="경미">경미</option>
                          <option value="중등도">중등도</option>
                          <option value="심함">심함</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 인지 기능 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">인지 기능</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">기억력</label>
                        <select
                          value={assessmentData.cognitive.memory}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            cognitive: { ...assessmentData.cognitive, memory: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="정상">정상</option>
                          <option value="경미한 장애">경미한 장애</option>
                          <option value="중등도 장애">중등도 장애</option>
                          <option value="심한 장애">심한 장애</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">의사소통</label>
                        <select
                          value={assessmentData.cognitive.communication}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            cognitive: { ...assessmentData.cognitive, communication: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="원활">원활</option>
                          <option value="부분적 어려움">부분적 어려움</option>
                          <option value="심한 어려움">심한 어려움</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">행동문제</label>
                        <select
                          value={assessmentData.cognitive.behavior}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            cognitive: { ...assessmentData.cognitive, behavior: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="없음">없음</option>
                          <option value="가끔">가끔</option>
                          <option value="자주">자주</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 정서 상태 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">정서 상태</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">기분</label>
                        <select
                          value={assessmentData.emotional.mood}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            emotional: { ...assessmentData.emotional, mood: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="안정">안정</option>
                          <option value="불안정">불안정</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">불안</label>
                        <select
                          value={assessmentData.emotional.anxiety}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            emotional: { ...assessmentData.emotional, anxiety: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="없음">없음</option>
                          <option value="경미">경미</option>
                          <option value="심함">심함</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">우울</label>
                        <select
                          value={assessmentData.emotional.depression}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            emotional: { ...assessmentData.emotional, depression: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="없음">없음</option>
                          <option value="경미">경미</option>
                          <option value="심함">심함</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 영양 상태 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">영양 상태</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">식욕</label>
                        <select
                          value={assessmentData.nutrition.appetite}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            nutrition: { ...assessmentData.nutrition, appetite: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="양호">양호</option>
                          <option value="보통">보통</option>
                          <option value="불량">불량</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">체중변화</label>
                        <select
                          value={assessmentData.nutrition.weight}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            nutrition: { ...assessmentData.nutrition, weight: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="유지">유지</option>
                          <option value="증가">증가</option>
                          <option value="감소">감소</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">연하능력</label>
                        <select
                          value={assessmentData.nutrition.swallowing}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            nutrition: { ...assessmentData.nutrition, swallowing: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="정상">정상</option>
                          <option value="경미한 장애">경미한 장애</option>
                          <option value="심한 장애">심한 장애</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 배설 기능 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">배설 기능</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">배변조절</label>
                        <select
                          value={assessmentData.elimination.bowel}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            elimination: { ...assessmentData.elimination, bowel: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="정상">정상</option>
                          <option value="부분조절">부분조절</option>
                          <option value="조절불가">조절불가</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">배뇨조절</label>
                        <select
                          value={assessmentData.elimination.urinary}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            elimination: { ...assessmentData.elimination, urinary: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="정상">정상</option>
                          <option value="부분조절">부분조절</option>
                          <option value="조절불가">조절불가</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">실금</label>
                        <select
                          value={assessmentData.elimination.incontinence}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            elimination: { ...assessmentData.elimination, incontinence: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">선택</option>
                          <option value="없음">없음</option>
                          <option value="가끔">가끔</option>
                          <option value="자주">자주</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 욕창 위험 평가 탭 (Braden Scale) */}
              {activeTab === 'pressure-risk' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Braden Scale 욕창 위험 평가</h4>
                    
                    {/* 총점 표시 */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-700">총점</span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">{calculateBradenScore()}</span>
                          <span className="text-sm text-gray-600"> / 23점</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className={`text-lg font-semibold ${getBradenRiskLevel(calculateBradenScore()).color}`}>
                          {getBradenRiskLevel(calculateBradenScore()).level}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* 감각인지 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          1. 감각인지 (1-4점)
                        </label>
                        <select
                          value={assessmentData.pressure.sensoryPerception}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            pressure: { ...assessmentData.pressure, sensoryPerception: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="0">선택</option>
                          <option value="1">1점 - 완전 제한</option>
                          <option value="2">2점 - 매우 제한</option>
                          <option value="3">3점 - 약간 제한</option>
                          <option value="4">4점 - 제한 없음</option>
                        </select>
                      </div>

                      {/* 습기 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          2. 습기 (1-4점)
                        </label>
                        <select
                          value={assessmentData.pressure.moisture}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            pressure: { ...assessmentData.pressure, moisture: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="0">선택</option>
                          <option value="1">1점 - 지속적으로 습함</option>
                          <option value="2">2점 - 매우 습함</option>
                          <option value="3">3점 - 가끔 습함</option>
                          <option value="4">4점 - 거의 습하지 않음</option>
                        </select>
                      </div>

                      {/* 활동성 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          3. 활동성 (1-4점)
                        </label>
                        <select
                          value={assessmentData.pressure.activity}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            pressure: { ...assessmentData.pressure, activity: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="0">선택</option>
                          <option value="1">1점 - 침상안정</option>
                          <option value="2">2점 - 의자안정</option>
                          <option value="3">3점 - 가끔 보행</option>
                          <option value="4">4점 - 자주 보행</option>
                        </select>
                      </div>

                      {/* 움직임 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          4. 움직임 (1-4점)
                        </label>
                        <select
                          value={assessmentData.pressure.mobility}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            pressure: { ...assessmentData.pressure, mobility: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="0">선택</option>
                          <option value="1">1점 - 완전 부동</option>
                          <option value="2">2점 - 매우 제한</option>
                          <option value="3">3점 - 약간 제한</option>
                          <option value="4">4점 - 제한 없음</option>
                        </select>
                      </div>

                      {/* 영양 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          5. 영양 (1-4점)
                        </label>
                        <select
                          value={assessmentData.pressure.nutrition}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            pressure: { ...assessmentData.pressure, nutrition: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="0">선택</option>
                          <option value="1">1점 - 매우 불량</option>
                          <option value="2">2점 - 아마도 부적절</option>
                          <option value="3">3점 - 적절</option>
                          <option value="4">4점 - 우수</option>
                        </select>
                      </div>

                      {/* 마찰력과 전단력 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          6. 마찰력과 전단력 (1-3점)
                        </label>
                        <select
                          value={assessmentData.pressure.friction}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            pressure: { ...assessmentData.pressure, friction: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="0">선택</option>
                          <option value="1">1점 - 문제</option>
                          <option value="2">2점 - 잠재적 문제</option>
                          <option value="3">3점 - 문제 없음</option>
                        </select>
                      </div>
                    </div>

                    {/* 권장 중재 */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">권장 중재사항</h5>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 2시간마다 체위변경</li>
                        <li>• 피부 관찰 및 청결 유지</li>
                        <li>• 압력분산 매트리스 사용</li>
                        <li>• 영양 상태 개선</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 욕창예방/간호 기록 탭 */}
              {activeTab === 'pressure-care' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">욕창예방 및 간호 기록</h4>
                    
                    {/* 체위변경 기록 */}
                    <div className="mb-6">
                      <h5 className="font-medium text-gray-900 mb-3">체위변경 기록</h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">시간</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">체위</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">피부상태</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">담당자</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-2">08:00</td>
                              <td className="px-4 py-2">좌측와위</td>
                              <td className="px-4 py-2">정상</td>
                              <td className="px-4 py-2">김요양사</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2">10:00</td>
                              <td className="px-4 py-2">앙와위</td>
                              <td className="px-4 py-2">정상</td>
                              <td className="px-4 py-2">이요양사</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 피부관찰 기록 */}
                    <div className="mb-6">
                      <h5 className="font-medium text-gray-900 mb-3">피부관찰 기록</h5>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="피부 상태를 기록하세요"
                      />
                    </div>

                    {/* 드레싱 기록 */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">드레싱 기록</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">부위</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="예: 천골부"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">단계</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option value="">선택</option>
                            <option value="1단계">1단계</option>
                            <option value="2단계">2단계</option>
                            <option value="3단계">3단계</option>
                            <option value="4단계">4단계</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">처치내용</label>
                          <textarea
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="처치 내용을 입력하세요"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 위험군 목록 탭 */}
              {activeTab === 'risk-list' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">욕창 위험군 수급자 목록</h4>
                    
                    {/* 통계 카드 */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-sm text-red-600 mb-1">고위험</div>
                        <div className="text-2xl font-bold text-red-700">2명</div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm text-orange-600 mb-1">중위험</div>
                        <div className="text-2xl font-bold text-orange-700">2명</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-green-600 mb-1">저위험</div>
                        <div className="text-2xl font-bold text-green-700">1명</div>
                      </div>
                    </div>

                    {/* 수급자 목록 */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수급자</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">방호실</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">등급</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">위험도</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Braden 점수</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">최근평가일</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">조치필요</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {beneficiaries.map((beneficiary) => (
                            <tr key={beneficiary.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{beneficiary.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{beneficiary.room}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{beneficiary.grade}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(beneficiary.riskLevel)}`}>
                                  {beneficiary.riskLevel}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">12점</td>
                              <td className="px-6 py-4 text-sm text-gray-600">2024-01-15</td>
                              <td className="px-6 py-4">
                                {beneficiary.riskLevel === '고위험' && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                    즉시조치
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default NeedsAssessmentAdvanced;
