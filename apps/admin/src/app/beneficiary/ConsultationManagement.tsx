import { useState } from 'react';
import { mockConsultationCategories, mockConsultationMethods, mockConsultations, mockQuarterlySummary } from '../../../../../src/mocks/consultations';

type TabType = 'consultation' | 'interview';
type ViewMode = 'quarterly' | 'list' | 'create' | 'detail';

interface SelectedRecipient {
  recipientId: string;
  recipientName: string;
  gender: string;
  age: number;
  roomNumber: string;
  grade: string;
  status: string;
  admissionDate: string;
  mainDiseases: string;
}

export default function ConsultationManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('consultation');
  const [viewMode, setViewMode] = useState<ViewMode>('quarterly');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedRecipient, setSelectedRecipient] = useState<SelectedRecipient | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);

  // 필터 상태
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRoom, setFilterRoom] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 신규 작성 폼 상태
  const [formData, setFormData] = useState({
    occurredAt: new Date().toISOString().slice(0, 16),
    targetType: 'recipient',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    categoryCode: '',
    methodCode: '',
    staffId: '',
    content: '',
    actionContent: ''
  });

  // 필터링된 분기별 요약 데이터
  const filteredSummary = mockQuarterlySummary.filter(item => {
    if (item.type !== activeTab) return false;
    if (item.year !== selectedYear) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterRoom !== 'all' && item.roomNumber !== filterRoom) return false;
    if (filterGrade !== 'all' && item.grade !== filterGrade) return false;
    if (searchKeyword && !item.recipientName.includes(searchKeyword)) return false;
    return true;
  });

  // 필터링된 상담 목록
  const filteredConsultations = mockConsultations.filter(item => {
    if (item.type !== activeTab) return false;
    if (item.year !== selectedYear) return false;
    if (selectedRecipient && item.recipientId !== selectedRecipient.recipientId) return false;
    return true;
  });

  // 분기별 상태 표시
  const getQuarterStatus = (count: number) => {
    if (count === 0) {
      return { text: '미작성', color: 'bg-gray-100 text-gray-600', icon: '○' };
    }
    return { text: `${count}건`, color: 'bg-teal-100 text-teal-700', icon: '●' };
  };

  // 전체 상담내역 조회
  const handleViewAllConsultations = () => {
    setViewMode('list');
    setSelectedRecipient(null);
  };

  // 수급자 선택
  const handleSelectRecipient = (recipient: any) => {
    setSelectedRecipient(recipient);
    setViewMode('list');
  };

  // 신규 작성
  const handleCreateNew = () => {
    if (!selectedRecipient) {
      alert('수급자를 먼저 선택해주세요.');
      return;
    }
    setViewMode('create');
    setFormData({
      occurredAt: new Date().toISOString().slice(0, 16),
      targetType: 'recipient',
      guardianName: '',
      guardianRelation: '',
      guardianPhone: '',
      categoryCode: '',
      methodCode: '',
      staffId: '',
      content: '',
      actionContent: ''
    });
  };

  // 상세보기
  const handleViewDetail = (consultation: any) => {
    setSelectedConsultation(consultation);
    setViewMode('detail');
  };

  // 저장
  const handleSave = () => {
    // 유효성 검사
    if (!formData.occurredAt) {
      alert('상담일시를 입력해주세요.');
      return;
    }
    if (!formData.categoryCode) {
      alert('상담구분을 선택해주세요.');
      return;
    }
    if (!formData.methodCode) {
      alert('상담방법을 선택해주세요.');
      return;
    }
    if (!formData.content) {
      alert('상담내용을 입력해주세요.');
      return;
    }
    if (formData.targetType === 'guardian' && !formData.guardianName) {
      alert('보호자명을 입력해주세요.');
      return;
    }
    if (formData.targetType === 'guardian' && !formData.guardianPhone) {
      alert('보호자 전화번호를 입력해주세요.');
      return;
    }

    alert('저장되었습니다.');
    setViewMode('quarterly');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">상담일지/면담일지</h2>
          <p className="text-sm text-gray-600 mt-1">수급자별 상담 및 면담 기록을 분기 단위로 관리합니다</p>
        </div>
        {viewMode === 'quarterly' && (
          <button
            onClick={handleViewAllConsultations}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md"
          >
            <i className="ri-file-list-3-line mr-2"></i>
            전체 상담내역 (급여반영 {filteredConsultations.filter(c => c.isBenefitReflected).length}건)
          </button>
        )}
      </div>

      {/* 안내 메시지 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start">
          <i className="ri-information-line text-amber-600 text-xl mr-3 mt-0.5"></i>
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">작성 안내</p>
            <p>• 일방향 공지(SNS, 문자 등)는 상담으로 인정되지 않습니다.</p>
            <p>• 반드시 양방향 소통 내용을 포함하여 작성해주세요.</p>
            <p>• 분기별 최소 1회 이상 상담/면담을 진행해야 합니다.</p>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab('consultation');
            setViewMode('quarterly');
          }}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === 'consultation'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="ri-chat-3-line mr-2"></i>
          상담일지
        </button>
        <button
          onClick={() => {
            setActiveTab('interview');
            setViewMode('quarterly');
          }}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === 'interview'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="ri-user-voice-line mr-2"></i>
          신규 수급자 면담일지
        </button>
      </div>

      {/* 분기별 목록 뷰 */}
      {viewMode === 'quarterly' && (
        <div className="space-y-4">
          {/* 필터 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">현황선택</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="all">전체</option>
                  <option value="active">입소</option>
                  <option value="discharged">퇴소</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">생활실선택</label>
                <select
                  value={filterRoom}
                  onChange={(e) => setFilterRoom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="all">전체</option>
                  <option value="101">101호</option>
                  <option value="102">102호</option>
                  <option value="103">103호</option>
                  <option value="104">104호</option>
                  <option value="105">105호</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">등급선택</label>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="all">전체</option>
                  <option value="1등급">1등급</option>
                  <option value="2등급">2등급</option>
                  <option value="3등급">3등급</option>
                  <option value="4등급">4등급</option>
                  <option value="5등급">5등급</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름조회</label>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="수급자명 검색"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연도선택</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedYear(selectedYear - 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <span className="flex-1 text-center font-semibold text-gray-900">{selectedYear}년</span>
                  <button
                    onClick={() => setSelectedYear(selectedYear + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 분기별 그리드 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-50 to-cyan-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">번호</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">수급자명</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">성별/나이</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">생활실</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">등급</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">1분기</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">2분기</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">3분기</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">4분기</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSummary.map((item, index) => {
                    const q1Status = getQuarterStatus(item.q1Count);
                    const q2Status = getQuarterStatus(item.q2Count);
                    const q3Status = getQuarterStatus(item.q3Count);
                    const q4Status = getQuarterStatus(item.q4Count);

                    return (
                      <tr key={item.recipientId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.recipientName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.gender} / {item.age}세</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.roomNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.grade}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${q1Status.color}`}>
                            {q1Status.icon} {q1Status.text}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${q2Status.color}`}>
                            {q2Status.icon} {q2Status.text}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${q3Status.color}`}>
                            {q3Status.icon} {q3Status.text}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${q4Status.color}`}>
                            {q4Status.icon} {q4Status.text}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleSelectRecipient(item)}
                            className="px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-xs whitespace-nowrap"
                          >
                            <i className="ri-file-list-line mr-1"></i>
                            조회/작성
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 목록 뷰 */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* 수급자 정보 카드 */}
          {selectedRecipient && (
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedRecipient.recipientName[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedRecipient.recipientName}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span><i className="ri-user-line mr-1"></i>{selectedRecipient.gender} / {selectedRecipient.age}세</span>
                      <span><i className="ri-home-4-line mr-1"></i>{selectedRecipient.roomNumber}</span>
                      <span><i className="ri-medal-line mr-1"></i>{selectedRecipient.grade}</span>
                      <span><i className="ri-calendar-line mr-1"></i>입소일: {selectedRecipient.admissionDate}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <i className="ri-heart-pulse-line mr-1"></i>주요질환: {selectedRecipient.mainDiseases}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setViewMode('quarterly')}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  목록으로
                </button>
              </div>
            </div>
          )}

          {/* 신규 작성 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md font-medium"
            >
              <i className="ri-add-line mr-2"></i>
              {activeTab === 'consultation' ? '상담일지' : '면담일지'} 신규작성
            </button>
          </div>

          {/* 상담 목록 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-50 to-cyan-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">번호</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">상담일시</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">분기</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">대상</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">구분</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">방법</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">상담직원</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">첨부</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredConsultations.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(item.occurredAt).toLocaleString('ko-KR')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.quarter}분기</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {item.targetType === 'recipient' ? '수급자' : `보호자(${item.guardianName})`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.categoryName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.methodName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.staffName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {item.attachmentCount > 0 && (
                          <span className="inline-flex items-center text-teal-600">
                            <i className="ri-attachment-2 mr-1"></i>
                            {item.attachmentCount}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-xs whitespace-nowrap"
                        >
                          <i className="ri-eye-line mr-1"></i>
                          상세
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 신규 작성 뷰 */}
      {viewMode === 'create' && selectedRecipient && (
        <div className="space-y-4">
          {/* 수급자 정보 카드 */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedRecipient.recipientName[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedRecipient.recipientName}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span><i className="ri-user-line mr-1"></i>{selectedRecipient.gender} / {selectedRecipient.age}세</span>
                    <span><i className="ri-home-4-line mr-1"></i>{selectedRecipient.roomNumber}</span>
                    <span><i className="ri-medal-line mr-1"></i>{selectedRecipient.grade}</span>
                    <span><i className="ri-calendar-line mr-1"></i>입소일: {selectedRecipient.admissionDate}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <i className="ri-heart-pulse-line mr-1"></i>주요질환: {selectedRecipient.mainDiseases}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewMode('list')}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                취소
              </button>
            </div>
          </div>

          {/* 작성 폼 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {activeTab === 'consultation' ? '상담일지' : '면담일지'} 작성
            </h3>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    상담일시 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.occurredAt}
                    onChange={(e) => setFormData({ ...formData, occurredAt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    상담대상 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.targetType}
                    onChange={(e) => setFormData({ ...formData, targetType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="recipient">수급자</option>
                    <option value="guardian">보호자</option>
                  </select>
                </div>
              </div>

              {/* 보호자 정보 (보호자 선택 시) */}
              {formData.targetType === 'guardian' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      보호자명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="보호자명 입력"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">관계</label>
                    <select
                      value={formData.guardianRelation}
                      onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    >
                      <option value="">선택</option>
                      <option value="자녀">자녀</option>
                      <option value="배우자">배우자</option>
                      <option value="형제">형제</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      전화번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              )}

              {/* 상담 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    상담구분 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoryCode}
                    onChange={(e) => setFormData({ ...formData, categoryCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="">선택</option>
                    {mockConsultationCategories
                      .filter(cat => cat.type === 'both' || cat.type === activeTab)
                      .map(cat => (
                        <option key={cat.code} value={cat.code}>{cat.name}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    상담방법 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.methodCode}
                    onChange={(e) => setFormData({ ...formData, methodCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="">선택</option>
                    {mockConsultationMethods.map(method => (
                      <option key={method.code} value={method.code}>{method.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 상담내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상담내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  placeholder="상담 내용을 상세히 입력해주세요. (양방향 소통 내용 포함)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              {/* 조치내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">조치내용</label>
                <textarea
                  value={formData.actionContent}
                  onChange={(e) => setFormData({ ...formData, actionContent: e.target.value })}
                  rows={4}
                  placeholder="상담 결과에 따른 조치 내용을 입력해주세요."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              {/* 첨부파일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">자료첨부</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                  <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
                  <p className="text-xs text-gray-500 mt-1">최대 10MB, 최대 10개 파일</p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setViewMode('list')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    if (confirm('이전 상담일지를 불러오시겠습니까?')) {
                      alert('최근 상담일지를 불러왔습니다.');
                    }
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  <i className="ri-file-copy-line mr-2"></i>
                  이전 기록 불러오기
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md text-sm font-medium"
                >
                  <i className="ri-save-line mr-2"></i>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 상세보기 뷰 */}
      {viewMode === 'detail' && selectedConsultation && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">
              {activeTab === 'consultation' ? '상담일지' : '면담일지'} 상세
            </h3>
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              목록으로
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">수급자명</label>
                  <p className="text-base text-gray-900">{selectedConsultation.recipientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">구분</label>
                  <p className="text-base text-gray-900">
                    {selectedConsultation.type === 'consultation' ? '상담일지' : '면담일지'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">상담일시</label>
                  <p className="text-base text-gray-900">
                    {new Date(selectedConsultation.occurredAt).toLocaleString('ko-KR')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">분기</label>
                  <p className="text-base text-gray-900">{selectedConsultation.quarter}분기</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">상담대상</label>
                  <p className="text-base text-gray-900">
                    {selectedConsultation.targetType === 'recipient'
                      ? '수급자'
                      : `보호자 (${selectedConsultation.guardianName})`}
                  </p>
                </div>
                {selectedConsultation.targetType === 'guardian' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">관계</label>
                      <p className="text-base text-gray-900">{selectedConsultation.guardianRelation}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">전화번호</label>
                      <p className="text-base text-gray-900">{selectedConsultation.guardianPhone}</p>
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">상담구분</label>
                  <p className="text-base text-gray-900">{selectedConsultation.categoryName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">상담방법</label>
                  <p className="text-base text-gray-900">{selectedConsultation.methodName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">상담직원</label>
                  <p className="text-base text-gray-900">{selectedConsultation.staffName}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-500 mb-2">상담내용</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedConsultation.content}</p>
                </div>
              </div>

              {selectedConsultation.actionContent && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">조치내용</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedConsultation.actionContent}</p>
                  </div>
                </div>
              )}

              {selectedConsultation.attachmentCount > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">첨부파일</label>
                  <div className="flex items-center space-x-2 text-sm text-teal-600">
                    <i className="ri-attachment-2"></i>
                    <span>{selectedConsultation.attachmentCount}개 파일</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">작성일시:</span> {new Date(selectedConsultation.createdAt).toLocaleString('ko-KR')}
                  </div>
                  <div>
                    <span className="font-medium">작성자:</span> {selectedConsultation.createdBy}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
