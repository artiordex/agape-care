'use client';

import { useState } from 'react';
import ConsultationQuarterlyTable from './ConsultationQuarterlyTable';
import ConsultationListTable from './ConsultationListTable';

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

interface QuarterlySummary {
  recipientId: string;
  recipientName: string;
  gender: string;
  age: number;
  roomNumber: string;
  grade: string;
  status: string;
  admissionDate: string;
  mainDiseases: string;
  type: TabType;
  year: number;
  q1Count: number;
  q2Count: number;
  q3Count: number;
  q4Count: number;
}

interface Consultation {
  id: string;
  recipientId: string;
  recipientName: string;
  type: TabType;
  year: number;
  quarter: number;
  occurredAt: string;
  targetType: 'recipient' | 'guardian';
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
  categoryCode: string;
  categoryName: string;
  methodCode: string;
  methodName: string;
  staffId: string;
  staffName: string;
  content: string;
  actionContent?: string;
  attachmentCount: number;
  isBenefitReflected: boolean;
  createdAt: string;
  createdBy: string;
}

interface ConsultationCategory {
  code: string;
  name: string;
  type: 'consultation' | 'interview' | 'both';
}

interface ConsultationMethod {
  code: string;
  name: string;
}

// 데이터
const consultationCategories: ConsultationCategory[] = [
  { code: 'HEALTH', name: '건강상태', type: 'both' },
  { code: 'MEAL', name: '식사', type: 'both' },
  { code: 'ACTIVITY', name: '활동', type: 'both' },
  { code: 'EMOTION', name: '정서', type: 'both' },
  { code: 'FAMILY', name: '가족관계', type: 'both' },
  { code: 'COMPLAINT', name: '불만/요청사항', type: 'both' },
  { code: 'ADMISSION', name: '입소적응', type: 'interview' },
  { code: 'ETC', name: '기타', type: 'both' },
];

const consultationMethods: ConsultationMethod[] = [
  { code: 'FACE', name: '대면상담' },
  { code: 'PHONE', name: '전화상담' },
  { code: 'VIDEO', name: '화상상담' },
  { code: 'VISIT', name: '방문상담' },
  { code: 'SNS', name: 'SNS상담' },
];

const quarterlySummary: QuarterlySummary[] = [
  {
    recipientId: 'R001',
    recipientName: '김영희',
    gender: '여',
    age: 78,
    roomNumber: '101',
    grade: '2등급',
    status: 'active',
    admissionDate: '2023-03-15',
    mainDiseases: '고혈압, 당뇨',
    type: 'consultation',
    year: 2025,
    q1Count: 2,
    q2Count: 1,
    q3Count: 0,
    q4Count: 0,
  },
  {
    recipientId: 'R002',
    recipientName: '박철수',
    gender: '남',
    age: 82,
    roomNumber: '102',
    grade: '3등급',
    status: 'active',
    admissionDate: '2023-05-20',
    mainDiseases: '치매, 고혈압',
    type: 'consultation',
    year: 2025,
    q1Count: 1,
    q2Count: 0,
    q3Count: 0,
    q4Count: 0,
  },
  {
    recipientId: 'R003',
    recipientName: '이순자',
    gender: '여',
    age: 75,
    roomNumber: '103',
    grade: '1등급',
    status: 'active',
    admissionDate: '2024-12-10',
    mainDiseases: '뇌졸중, 치매',
    type: 'interview',
    year: 2025,
    q1Count: 1,
    q2Count: 0,
    q3Count: 0,
    q4Count: 0,
  },
];

const consultations: Consultation[] = [
  {
    id: 'C001',
    recipientId: 'R001',
    recipientName: '김영희',
    type: 'consultation',
    year: 2025,
    quarter: 1,
    occurredAt: '2025-01-15T14:30:00',
    targetType: 'recipient',
    categoryCode: 'HEALTH',
    categoryName: '건강상태',
    methodCode: 'FACE',
    methodName: '대면상담',
    staffId: 'S001',
    staffName: '김사회복지사',
    content: '최근 혈압이 안정적으로 유지되고 있으며, 식사량도 양호합니다.',
    actionContent: '계속적인 혈압 모니터링 및 영양 관리 유지',
    attachmentCount: 0,
    isBenefitReflected: true,
    createdAt: '2025-01-15T15:00:00',
    createdBy: '김사회복지사',
  },
  {
    id: 'C002',
    recipientId: 'R001',
    recipientName: '김영희',
    type: 'consultation',
    year: 2025,
    quarter: 1,
    occurredAt: '2025-02-20T10:00:00',
    targetType: 'guardian',
    guardianName: '김보호자',
    guardianRelation: '자녀',
    guardianPhone: '010-1111-2222',
    categoryCode: 'FAMILY',
    categoryName: '가족관계',
    methodCode: 'PHONE',
    methodName: '전화상담',
    staffId: 'S001',
    staffName: '김사회복지사',
    content: '자녀분과 전화 상담 진행. 어머니의 최근 건강 상태 안내.',
    actionContent: '다음 주 토요일 오후 2시 방문 예정',
    attachmentCount: 0,
    isBenefitReflected: true,
    createdAt: '2025-02-20T10:30:00',
    createdBy: '김사회복지사',
  },
];

export default function ConsultationManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>('consultation');
  const [viewMode, setViewMode] = useState<ViewMode>('quarterly');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedRecipient, setSelectedRecipient] = useState<SelectedRecipient | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  // 필터
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRoom, setFilterRoom] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 폼
  const [formData, setFormData] = useState({
    occurredAt: new Date().toISOString().slice(0, 16),
    targetType: 'recipient' as 'recipient' | 'guardian',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    categoryCode: '',
    methodCode: '',
    staffId: '',
    content: '',
    actionContent: '',
  });

  // 필터링
  const filteredSummary = quarterlySummary.filter(item => {
    if (item.type !== activeTab) return false;
    if (item.year !== selectedYear) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterRoom !== 'all' && item.roomNumber !== filterRoom) return false;
    if (filterGrade !== 'all' && item.grade !== filterGrade) return false;
    if (searchKeyword && !item.recipientName.includes(searchKeyword)) return false;
    return true;
  });

  const filteredConsultations = consultations.filter(item => {
    if (item.type !== activeTab) return false;
    if (item.year !== selectedYear) return false;
    if (selectedRecipient && item.recipientId !== selectedRecipient.recipientId) return false;
    return true;
  });

  // 핸들러
  const handleViewAllConsultations = () => {
    setViewMode('list');
    setSelectedRecipient(null);
  };

  const handleSelectRecipient = (recipient: QuarterlySummary) => {
    setSelectedRecipient({
      recipientId: recipient.recipientId,
      recipientName: recipient.recipientName,
      gender: recipient.gender,
      age: recipient.age,
      roomNumber: recipient.roomNumber,
      grade: recipient.grade,
      status: recipient.status,
      admissionDate: recipient.admissionDate,
      mainDiseases: recipient.mainDiseases,
    });
    setViewMode('list');
  };

  const handleCreateNew = () => {
    if (!selectedRecipient) {
      alert('수급자를 먼저 선택해주세요.');
      return;
    }
    setViewMode('create');
  };

  const handleViewDetail = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setViewMode('detail');
  };

  const handleSave = () => {
    if (!formData.occurredAt || !formData.categoryCode || !formData.methodCode || !formData.content) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    alert('✅ 저장되었습니다.');
    setViewMode('quarterly');
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">상담일지/면담일지</h2>
            <p className="mt-1 text-sm text-gray-600">수급자별 상담 및 면담 기록을 분기 단위로 관리합니다</p>
          </div>
          {viewMode === 'quarterly' && (
            <button
              onClick={handleViewAllConsultations}
              className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <i className="ri-file-list-3-line"></i>
              전체 상담내역 (급여반영 {filteredConsultations.filter(c => c.isBenefitReflected).length}건)
            </button>
          )}
        </div>

        {/* 안내 */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <i className="ri-information-line mt-0.5 text-lg text-amber-600"></i>
            <div className="text-sm text-amber-800">
              <p className="mb-1 font-semibold">작성 안내</p>
              <p>• 일방향 공지는 상담으로 인정되지 않습니다. 반드시 양방향 소통 내용을 포함하세요.</p>
              <p>• 분기별 최소 1회 이상 상담/면담을 진행해야 합니다.</p>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('consultation');
              setViewMode('quarterly');
            }}
            className={`border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'consultation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
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
            className={`border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'interview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-user-voice-line mr-2"></i>
            신규 수급자 면담일지
          </button>
        </div>

        {/* 분기별 뷰 */}
        {viewMode === 'quarterly' && (
          <div className="space-y-4">
            {/* 필터 */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">현황</label>
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">전체</option>
                    <option value="active">입소</option>
                    <option value="discharged">퇴소</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">생활실</label>
                  <select
                    value={filterRoom}
                    onChange={e => setFilterRoom(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">전체</option>
                    <option value="101">101호</option>
                    <option value="102">102호</option>
                    <option value="103">103호</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">등급</label>
                  <select
                    value={filterGrade}
                    onChange={e => setFilterGrade(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">전체</option>
                    <option value="1등급">1등급</option>
                    <option value="2등급">2등급</option>
                    <option value="3등급">3등급</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">이름조회</label>
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    placeholder="수급자명 검색"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">연도</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedYear(selectedYear - 1)}
                      className="rounded border border-gray-300 p-2 transition-colors hover:bg-gray-50"
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <span className="flex-1 text-center text-sm font-semibold text-gray-900">{selectedYear}년</span>
                    <button
                      onClick={() => setSelectedYear(selectedYear + 1)}
                      className="rounded border border-gray-300 p-2 transition-colors hover:bg-gray-50"
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <ConsultationQuarterlyTable data={filteredSummary} onSelectRecipient={handleSelectRecipient} />
          </div>
        )}

        {/* 목록 뷰 */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {selectedRecipient && (
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 text-lg font-bold text-gray-700">
                      {selectedRecipient.recipientName[0]}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{selectedRecipient.recipientName}</h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                        <span>
                          {selectedRecipient.gender} / {selectedRecipient.age}세
                        </span>
                        <span>•</span>
                        <span>{selectedRecipient.roomNumber}</span>
                        <span>•</span>
                        <span>{selectedRecipient.grade}</span>
                        <span>•</span>
                        <span>입소일: {selectedRecipient.admissionDate}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewMode('quarterly')}
                    className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    목록으로
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <i className="ri-add-line"></i>
                {activeTab === 'consultation' ? '상담일지' : '면담일지'} 신규작성
              </button>
            </div>

            <ConsultationListTable data={filteredConsultations} onViewDetail={handleViewDetail} />
          </div>
        )}

        {/* 신규작성 뷰 */}
        {viewMode === 'create' && selectedRecipient && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 text-lg font-bold text-gray-700">
                    {selectedRecipient.recipientName[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{selectedRecipient.recipientName}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                      <span>
                        {selectedRecipient.gender} / {selectedRecipient.age}세
                      </span>
                      <span>•</span>
                      <span>{selectedRecipient.roomNumber}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setViewMode('list')}
                  className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  취소
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-base font-bold text-gray-900">
                {activeTab === 'consultation' ? '상담일지' : '면담일지'} 작성
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      상담일시 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.occurredAt}
                      onChange={e => setFormData({ ...formData, occurredAt: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      상담대상 <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.targetType}
                      onChange={e =>
                        setFormData({ ...formData, targetType: e.target.value as 'recipient' | 'guardian' })
                      }
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="recipient">수급자</option>
                      <option value="guardian">보호자</option>
                    </select>
                  </div>
                </div>

                {formData.targetType === 'guardian' && (
                  <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">
                        보호자명 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.guardianName}
                        onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">관계</label>
                      <select
                        value={formData.guardianRelation}
                        onChange={e => setFormData({ ...formData, guardianRelation: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">선택</option>
                        <option value="자녀">자녀</option>
                        <option value="배우자">배우자</option>
                        <option value="형제">형제</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">
                        전화번호 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                        placeholder="010-0000-0000"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      상담구분 <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.categoryCode}
                      onChange={e => setFormData({ ...formData, categoryCode: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">선택</option>
                      {consultationCategories
                        .filter(cat => cat.type === 'both' || cat.type === activeTab)
                        .map(cat => (
                          <option key={cat.code} value={cat.code}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      상담방법 <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.methodCode}
                      onChange={e => setFormData({ ...formData, methodCode: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">선택</option>
                      {consultationMethods.map(method => (
                        <option key={method.code} value={method.code}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    상담내용 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    placeholder="상담 내용을 상세히 입력해주세요"
                    className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">조치내용</label>
                  <textarea
                    value={formData.actionContent}
                    onChange={e => setFormData({ ...formData, actionContent: e.target.value })}
                    rows={4}
                    placeholder="상담 결과에 따른 조치 내용"
                    className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setViewMode('list')}
                    className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <i className="ri-save-line"></i>
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
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                {activeTab === 'consultation' ? '상담일지' : '면담일지'} 상세
              </h3>
              <button
                onClick={() => setViewMode('list')}
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                목록으로
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">수급자명</label>
                    <p className="text-sm text-gray-900">{selectedConsultation.recipientName}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">상담일시</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedConsultation.occurredAt).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">상담대상</label>
                    <p className="text-sm text-gray-900">
                      {selectedConsultation.targetType === 'recipient'
                        ? '수급자'
                        : `보호자 (${selectedConsultation.guardianName})`}
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">상담구분</label>
                    <p className="text-sm text-gray-900">{selectedConsultation.categoryName}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">상담방법</label>
                    <p className="text-sm text-gray-900">{selectedConsultation.methodName}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">상담직원</label>
                    <p className="text-sm text-gray-900">{selectedConsultation.staffName}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="mb-2 block text-xs font-medium text-gray-500">상담내용</label>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="whitespace-pre-wrap text-sm text-gray-900">{selectedConsultation.content}</p>
                  </div>
                </div>

                {selectedConsultation.actionContent && (
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-500">조치내용</label>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <p className="whitespace-pre-wrap text-sm text-gray-900">{selectedConsultation.actionContent}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
