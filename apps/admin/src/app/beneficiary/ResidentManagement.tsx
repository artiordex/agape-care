import { useState, useEffect } from 'react';
import { residentsData } from '../../../../mocks/residents';

interface Guardian {
  name: string;
  relation: string;
  phone: string;
  email: string;
  address: string;
  receiveNotice: boolean;
}

interface Resident {
  id: number;
  name: string;
  photo: string;
  gender: string;
  birthDate: string;
  registrationNumber: string;
  phone: string;
  address: string;
  admissionDate: string;
  dischargeDate: string | null;
  status: string;
  room: string;
  grade: string;
  gradeValidUntil: string;
  copaymentRate: number;
  mainDiseases: string[];
  mobility: string;
  cognition: string;
  mealStatus: string;
  toiletStatus: string;
  medications: string[];
  allergies: string[];
  specialNotes: string;
  bloodPressure: string;
  bloodSugar: string;
  height: number;
  weight: number;
  guardians: Guardian[];
}

export default function ResidentManagement() {
  const [residents, setResidents] = useState<Resident[]>(residentsData);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(residentsData[0]);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<Resident | null>(null);

  const filteredResidents = residents.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       r.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       r.grade.includes(searchTerm);
    const matchStatus = filterStatus === '전체' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소': return 'bg-blue-100 text-blue-700';
      case '퇴소': return 'bg-gray-100 text-gray-700';
      case '대기': return 'bg-amber-100 text-amber-700';
      case '상담': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1등급')) return 'bg-red-100 text-red-700';
    if (grade.includes('2등급')) return 'bg-orange-100 text-orange-700';
    if (grade.includes('3등급')) return 'bg-yellow-100 text-yellow-700';
    if (grade.includes('4등급')) return 'bg-green-100 text-green-700';
    if (grade.includes('5등급')) return 'bg-blue-100 text-blue-700';
    return 'bg-purple-100 text-purple-700';
  };

  const tabs = [
    { id: 'basic', label: '기초정보', icon: 'ri-file-list-3-line' },
    { id: 'care-plan', label: '표준이용계획서', icon: 'ri-file-text-line' },
    { id: 'assessment', label: '기초평가', icon: 'ri-bar-chart-box-line' },
    { id: 'consultation', label: '상담일지', icon: 'ri-chat-3-line' },
    { id: 'extra-cost', label: '기타비용/비급여', icon: 'ri-money-dollar-circle-line' },
    { id: 'copayment', label: '본인부담금', icon: 'ri-bank-card-line' },
    { id: 'guardians', label: '보호자정보', icon: 'ri-parent-line' },
    { id: 'admission-history', label: '입퇴소이력', icon: 'ri-history-line' },
    { id: 'documents', label: '서류관리', icon: 'ri-folder-line' },
    { id: 'medication', label: '투약정보', icon: 'ri-medicine-bottle-line' },
    { id: 'care-summary', label: '케어기록요약', icon: 'ri-heart-pulse-line' },
  ];

  const renderTabContent = () => {
    if (!selectedResident) return null;

    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-user-line text-teal-600"></i>
                상세 기본정보
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">이름</p>
                  <p className="font-semibold text-gray-900">{selectedResident.name}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">성별</p>
                  <p className="font-semibold text-gray-900">{selectedResident.gender}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">생년월일</p>
                  <p className="font-semibold text-gray-900">{selectedResident.birthDate}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">주민등록번호</p>
                  <p className="font-semibold text-gray-900">{selectedResident.registrationNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-hospital-line text-teal-600"></i>
                건강 및 기능 상태
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">인지기능</p>
                  <p className="font-semibold text-gray-900">{selectedResident.cognition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">거동상태</p>
                  <p className="font-semibold text-gray-900">{selectedResident.mobility}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">식사상태</p>
                  <p className="font-semibold text-gray-900">{selectedResident.mealStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">배변상태</p>
                  <p className="font-semibold text-gray-900">{selectedResident.toiletStatus}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-capsule-line text-teal-600"></i>
                주요 질환 및 복용약품
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">주요 질환</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedResident.mainDiseases.map((disease, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {disease}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">복용약품</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedResident.medications.map((med, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedResident.allergies.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">알레르기</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedResident.allergies.map((allergy, idx) => (
                        <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-alert-line text-teal-600"></i>
                특이사항
              </h3>
              <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                {selectedResident.specialNotes}
              </p>
            </div>
          </div>
        );

      case 'care-plan':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">표준이용계획서</h3>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer">
                  <i className="ri-file-download-line"></i>
                  PDF 출력
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">계획기간</p>
                  <p className="font-semibold">2024-01-01 ~ 2024-12-31</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">욕구사정</p>
                  <p className="text-gray-700">일상생활 도움 필요, 건강관리 필요, 사회활동 참여 희망</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">서비스 목표</p>
                  <p className="text-gray-700">안전하고 편안한 생활 유지, 건강상태 개선, 삶의 질 향상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">제공서비스</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>신체활동 지원 (식사, 배설, 목욕 등)</li>
                    <li>인지활동 지원</li>
                    <li>건강관리 및 투약관리</li>
                    <li>여가활동 프로그램</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assessment':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">기초 평가</h3>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-add-line mr-1"></i>
                  평가 등록
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">일상생활능력(ADL)</p>
                  <p className="text-2xl font-bold text-blue-700">65점</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">도구적일상생활(IADL)</p>
                  <p className="text-2xl font-bold text-green-700">45점</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <p className="text-sm text-purple-600 mb-1">인지기능</p>
                  <p className="text-2xl font-bold text-purple-700">55점</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <p className="text-sm text-orange-600 mb-1">기동력</p>
                  <p className="text-2xl font-bold text-orange-700">70점</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">평가자</p>
                <p className="font-semibold">김사회복지사</p>
                <p className="text-sm text-gray-600 mt-2">평가일</p>
                <p className="font-semibold">2024-01-15</p>
              </div>
            </div>
          </div>
        );

      case 'consultation':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">상담일지</h3>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-add-line mr-1"></i>
                상담 등록
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">건강</span>
                      <p className="text-sm text-gray-600 mt-2">2024-01-{10 + item} | 김사회복지사</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <i className="ri-more-2-fill text-xl"></i>
                    </button>
                  </div>
                  <p className="text-gray-700">최근 혈압이 안정적으로 유지되고 있음. 식사량도 양호하며 프로그램 참여도가 높아짐.</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'extra-cost':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">기타비용 / 비급여</h3>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-add-line mr-1"></i>
                항목 추가
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">항목</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">단가</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">횟수</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">합계</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">이미용</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">10,000원</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">1</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">10,000원</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">간식</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">5,000원</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">4</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">20,000원</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">기저귀</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">30,000원</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">1</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">30,000원</td>
                  </tr>
                  <tr className="bg-teal-50 font-semibold">
                    <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">총 비급여 비용</td>
                    <td className="px-4 py-3 text-sm text-teal-700 text-right">60,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'copayment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">본인부담금 관리</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">요양급여 본인부담금</p>
                <p className="text-2xl font-bold text-blue-700">450,000원</p>
                <p className="text-xs text-blue-600 mt-1">({selectedResident.copaymentRate}% 부담)</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <p className="text-sm text-green-600 mb-1">식대 본인부담금</p>
                <p className="text-2xl font-bold text-green-700">180,000원</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">비급여 비용</p>
                <p className="text-2xl font-bold text-purple-700">60,000원</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border border-teal-200">
                <p className="text-sm text-teal-600 mb-1">월 총액</p>
                <p className="text-2xl font-bold text-teal-700">690,000원</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-gray-900">납부 상태</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">완납</span>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-printer-line mr-2"></i>
                고지서 출력
              </button>
            </div>
          </div>
        );

      case 'guardians':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">보호자 정보</h3>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-add-line mr-1"></i>
                보호자 추가
              </button>
            </div>
            <div className="space-y-4">
              {selectedResident.guardians.map((guardian, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{guardian.name}</p>
                      <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {guardian.relation}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <i className="ri-edit-line text-xl"></i>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-phone-line text-gray-400"></i>
                      <span className="text-gray-700">{guardian.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-mail-line text-gray-400"></i>
                      <span className="text-gray-700">{guardian.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <span className="text-gray-700">{guardian.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-3">
                      <i className="ri-notification-line text-gray-400"></i>
                      <span className="text-gray-700">
                        청구서 수신: {guardian.receiveNotice ? '✅ 수신함' : '❌ 수신안함'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'admission-history':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">입·퇴소 이력</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-login-box-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">입소</p>
                    <p className="text-sm text-gray-600">입소일: {selectedResident.admissionDate}</p>
                    <p className="text-sm text-gray-600 mt-1">사유: 가족 돌봄 어려움, 전문 요양 필요</p>
                    <p className="text-xs text-gray-500 mt-2">기록자: 김사회복지사 | 2023-01-10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">서류 관리</h3>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-upload-line mr-1"></i>
                서류 업로드
              </button>
            </div>
            <div className="space-y-3">
              {['장기요양인정서', '이용계약서', '개인정보동의서', '신분증 사본', '건강진단서'].map((doc, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-file-text-line text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doc}</p>
                      <p className="text-xs text-gray-500">업로드일: 2023-01-10</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">등록완료</span>
                    <button className="p-2 text-gray-400 hover:text-teal-600 cursor-pointer">
                      <i className="ri-download-line"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'medication':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">투약 정보</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">약품명</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">용량</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">복용시간</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">혈압약</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">1정</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">아침 식후</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">복용완료</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">당뇨약</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">1정</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">아침/저녁 식후</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">복용완료</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">치매약</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">1정</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">저녁 식후</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">예정</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'care-summary':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">최근 7일 케어 기록 요약</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-blue-600 font-semibold">식사</p>
                  <i className="ri-restaurant-line text-2xl text-blue-600"></i>
                </div>
                <p className="text-lg font-bold text-blue-700">평균 85% 섭취</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-green-600 font-semibold">배변</p>
                  <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                </div>
                <p className="text-lg font-bold text-green-700">정상 (1일 1회)</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-purple-600 font-semibold">수면</p>
                  <i className="ri-zzz-line text-2xl text-purple-600"></i>
                </div>
                <p className="text-lg font-bold text-purple-700">평균 7시간</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-orange-600 font-semibold">활동</p>
                  <i className="ri-walk-line text-2xl text-orange-600"></i>
                </div>
                <p className="text-lg font-bold text-orange-700">산책 5회</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">바이탈 추이</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">혈압</span>
                  <span className="text-sm font-semibold text-gray-900">평균 128/78 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">혈당</span>
                  <span className="text-sm font-semibold text-gray-900">평균 108 mg/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">체온</span>
                  <span className="text-sm font-semibold text-gray-900">평균 36.5°C</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleEditClick = () => {
    if (selectedResident) {
      setEditFormData({ ...selectedResident });
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editFormData) {
      const updatedResidents = residents.map(r => 
        r.id === editFormData.id ? editFormData : r
      );
      setResidents(updatedResidents);
      setSelectedResident(editFormData);
      setShowEditModal(false);
    }
  };

  const handleEditInputChange = (field: keyof Resident, value: any) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleArrayInputChange = (field: 'mainDiseases' | 'medications' | 'allergies', value: string) => {
    if (editFormData) {
      const arr = value.split(',').map(item => item.trim()).filter(item => item);
      setEditFormData({ ...editFormData, [field]: arr });
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Panel - Resident List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-500">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <i className="ri-user-heart-line"></i>
            입소자 관리
          </h2>
          <div className="flex gap-2 text-sm text-white">
            <div className="bg-white/20 rounded-lg px-3 py-1">
              총 {residents.length}명
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-1">
              입소 {residents.filter(r => r.status === '입소').length}명
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="이름, 방호실, 등급 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['전체', '입소', '퇴소', '대기'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Resident List */}
        <div className="flex-1 overflow-y-auto">
          {filteredResidents.map((resident) => (
            <div
              key={resident.id}
              onClick={() => setSelectedResident(resident)}
              className={`p-4 border-b border-gray-100 hover:bg-teal-50 cursor-pointer transition-colors ${
                selectedResident?.id === resident.id ? 'bg-teal-50 border-l-4 border-l-teal-600' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {resident.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-gray-900">{resident.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(resident.status)}`}>
                      {resident.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <span className="flex items-center gap-1">
                      <i className="ri-home-4-line"></i>
                      {resident.room}
                    </span>
                    <span>|</span>
                    <span>{resident.gender}</span>
                    <span>|</span>
                    <span className={`px-2 py-0.5 rounded-full font-medium ${getGradeColor(resident.grade)}`}>
                      {resident.grade}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{resident.birthDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all font-semibold whitespace-nowrap cursor-pointer">
            <i className="ri-add-line mr-2"></i>
            입소자 등록
          </button>
        </div>
      </div>

      {/* Right Panel - Detail Information */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedResident ? (
          <>
            {/* Profile Card */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 shadow-lg">
                  {selectedResident.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedResident.name}</h2>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedResident.status)}`}>
                          {selectedResident.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(selectedResident.grade)}`}>
                          {selectedResident.grade}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {selectedResident.room}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleEditClick}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-edit-line mr-1"></i>
                        정보수정
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">
                        <i className="ri-file-download-line mr-1"></i>
                        계약서
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">성별/나이</p>
                      <p className="font-semibold text-gray-900">{selectedResident.gender} / {new Date().getFullYear() - parseInt(selectedResident.birthDate.split('-')[0])}세</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">입소일</p>
                      <p className="font-semibold text-gray-900">{selectedResident.admissionDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">본인부담율</p>
                      <p className="font-semibold text-gray-900">{selectedResident.copaymentRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">연락처</p>
                      <p className="font-semibold text-gray-900">{selectedResident.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Health Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-5 gap-3">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3">
                    <p className="text-xs text-red-600 mb-1">혈압</p>
                    <p className="text-sm font-bold text-red-700">{selectedResident.bloodPressure}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
                    <p className="text-xs text-orange-600 mb-1">혈당</p>
                    <p className="text-sm font-bold text-orange-700">{selectedResident.bloodSugar}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-600 mb-1">신장</p>
                    <p className="text-sm font-bold text-blue-700">{selectedResident.height}cm</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
                    <p className="text-xs text-green-600 mb-1">체중</p>
                    <p className="text-sm font-bold text-green-700">{selectedResident.weight}kg</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
                    <p className="text-xs text-purple-600 mb-1">등급만료</p>
                    <p className="text-sm font-bold text-purple-700">{selectedResident.gradeValidUntil.substring(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 overflow-x-auto">
              <div className="flex gap-1 px-6 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <i className={`${tab.icon} mr-1`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {renderTabContent()}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <i className="ri-user-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">좌측에서 입소자를 선택하세요</p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <i className="ri-edit-line"></i>
                  입소자 정보 수정
                </h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-user-line text-teal-600"></i>
                    기본 정보
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => handleEditInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">성별</label>
                      <select
                        value={editFormData.gender}
                        onChange={(e) => handleEditInputChange('gender', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="남">남</option>
                        <option value="여">여</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                      <input
                        type="date"
                        value={editFormData.birthDate}
                        onChange={(e) => handleEditInputChange('birthDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">주민등록번호</label>
                      <input
                        type="text"
                        value={editFormData.registrationNumber}
                        onChange={(e) => handleEditInputChange('registrationNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                      <input
                        type="tel"
                        value={editFormData.phone}
                        onChange={(e) => handleEditInputChange('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">방호실</label>
                      <input
                        type="text"
                        value={editFormData.room}
                        onChange={(e) => handleEditInputChange('room', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                      <input
                        type="text"
                        value={editFormData.address}
                        onChange={(e) => handleEditInputChange('address', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* 입소 정보 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-hospital-line text-teal-600"></i>
                    입소 정보
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">입소일</label>
                      <input
                        type="date"
                        value={editFormData.admissionDate}
                        onChange={(e) => handleEditInputChange('admissionDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">입소상태</label>
                      <select
                        value={editFormData.status}
                        onChange={(e) => handleEditInputChange('status', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="입소">입소</option>
                        <option value="퇴소">퇴소</option>
                        <option value="대기">대기</option>
                        <option value="상담">상담</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">요양등급</label>
                      <select
                        value={editFormData.grade}
                        onChange={(e) => handleEditInputChange('grade', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="1등급">1등급</option>
                        <option value="2등급">2등급</option>
                        <option value="3등급">3등급</option>
                        <option value="4등급">4등급</option>
                        <option value="5등급">5등급</option>
                        <option value="인지지원등급">인지지원등급</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">등급유효기간</label>
                      <input
                        type="date"
                        value={editFormData.gradeValidUntil}
                        onChange={(e) => handleEditInputChange('gradeValidUntil', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">본인부담율 (%)</label>
                      <input
                        type="number"
                        value={editFormData.copaymentRate}
                        onChange={(e) => handleEditInputChange('copaymentRate', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                {/* 건강 정보 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-heart-pulse-line text-teal-600"></i>
                    건강 정보
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">인지기능</label>
                      <select
                        value={editFormData.cognition}
                        onChange={(e) => handleEditInputChange('cognition', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="정상">정상</option>
                        <option value="경도 인지저하">경도 인지저하</option>
                        <option value="중등도 인지저하">중등도 인지저하</option>
                        <option value="중증 인지저하">중증 인지저하</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">거동상태</label>
                      <select
                        value={editFormData.mobility}
                        onChange={(e) => handleEditInputChange('mobility', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="보행 가능">보행 가능</option>
                        <option value="보행기">보행기</option>
                        <option value="휠체어">휠체어</option>
                        <option value="침상">침상</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">식사상태</label>
                      <select
                        value={editFormData.mealStatus}
                        onChange={(e) => handleEditInputChange('mealStatus', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="자립">자립</option>
                        <option value="부분 도움">부분 도움</option>
                        <option value="전적 도움">전적 도움</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">배변상태</label>
                      <select
                        value={editFormData.toiletStatus}
                        onChange={(e) => handleEditInputChange('toiletStatus', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="자립">자립</option>
                        <option value="부분 도움">부분 도움</option>
                        <option value="기저귀 사용">기저귀 사용</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">혈압</label>
                      <input
                        type="text"
                        value={editFormData.bloodPressure}
                        onChange={(e) => handleEditInputChange('bloodPressure', e.target.value)}
                        placeholder="120/80"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">혈당</label>
                      <input
                        type="text"
                        value={editFormData.bloodSugar}
                        onChange={(e) => handleEditInputChange('bloodSugar', e.target.value)}
                        placeholder="100 mg/dL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">신장 (cm)</label>
                      <input
                        type="number"
                        value={editFormData.height}
                        onChange={(e) => handleEditInputChange('height', parseFloat(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">체중 (kg)</label>
                      <input
                        type="number"
                        value={editFormData.weight}
                        onChange={(e) => handleEditInputChange('weight', parseFloat(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">주요 질환 (쉼표로 구분)</label>
                      <input
                        type="text"
                        value={editFormData.mainDiseases.join(', ')}
                        onChange={(e) => handleArrayInputChange('mainDiseases', e.target.value)}
                        placeholder="고혈압, 당뇨, 치매"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">복용 약품 (쉼표로 구분)</label>
                      <input
                        type="text"
                        value={editFormData.medications.join(', ')}
                        onChange={(e) => handleArrayInputChange('medications', e.target.value)}
                        placeholder="혈압약, 당뇨약"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">알레르기 (쉼표로 구분)</label>
                      <input
                        type="text"
                        value={editFormData.allergies.join(', ')}
                        onChange={(e) => handleArrayInputChange('allergies', e.target.value)}
                        placeholder="페니실린"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">특이사항</label>
                      <textarea
                        value={editFormData.specialNotes}
                        onChange={(e) => handleEditInputChange('specialNotes', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-save-line mr-2"></i>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
