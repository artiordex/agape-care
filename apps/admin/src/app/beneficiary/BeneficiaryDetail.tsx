import { useEffect, useState } from 'react';
import { residentsData } from '../../../../../src/mocks/residents-management';

interface Guardian {
  name: string;
  relation: string;
  phone: string;
  email: string;
  address: string;
  receiveNotice: boolean;
  receiveSMS: boolean;
  receiveEmail: boolean;
  receiveMail: boolean;
}

interface AdmissionHistory {
  id: number;
  type: string;
  date: string;
  time: string;
  reason: string;
  settlement: string;
  createdAt: string;
  hasRecord: boolean;
}

interface Beneficiary {
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
  recognitionNumber: string;
  recognitionPeriod: string;
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
  admissionHistory: AdmissionHistory[];
}

export default function BeneficiaryDetail() {
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // URL에서 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
      const found = residentsData.find(r => r.id === parseInt(id));
      if (found) {
        setBeneficiary(found as Beneficiary);
      }
    }
  }, []);

  if (!beneficiary) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-user-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">수급자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

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
    { id: 'standard-plan', label: '표준약관', icon: 'ri-file-text-line' },
    { id: 'assessment', label: '기초평가', icon: 'ri-bar-chart-box-line' },
    { id: 'consultation', label: '상담일지', icon: 'ri-chat-3-line' },
    { id: 'extra-cost', label: '기타비용', icon: 'ri-money-dollar-circle-line' },
    { id: 'copayment', label: '본인부담금', icon: 'ri-bank-card-line' },
    { id: 'documents', label: '수급자관리기록', icon: 'ri-folder-line' },
  ];

  const renderTabContent = () => {
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
                  <p className="font-semibold text-gray-900">{beneficiary.name}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">성별</p>
                  <p className="font-semibold text-gray-900">{beneficiary.gender}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">생년월일</p>
                  <p className="font-semibold text-gray-900">{beneficiary.birthDate}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">주민등록번호</p>
                  <p className="font-semibold text-gray-900">{beneficiary.registrationNumber}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">연락처</p>
                  <p className="font-semibold text-gray-900">{beneficiary.phone}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">생활실</p>
                  <p className="font-semibold text-gray-900">{beneficiary.room}</p>
                </div>
                <div className="bg-white rounded-lg p-4 col-span-2">
                  <p className="text-sm text-gray-600 mb-1">주소</p>
                  <p className="font-semibold text-gray-900">{beneficiary.address}</p>
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
                  <p className="font-semibold text-gray-900">{beneficiary.cognition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">거동상태</p>
                  <p className="font-semibold text-gray-900">{beneficiary.mobility}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">식사상태</p>
                  <p className="font-semibold text-gray-900">{beneficiary.mealStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">배변상태</p>
                  <p className="font-semibold text-gray-900">{beneficiary.toiletStatus}</p>
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
                    {beneficiary.mainDiseases.map((disease, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {disease}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">복용약품</p>
                  <div className="flex flex-wrap gap-2">
                    {beneficiary.medications.map((med, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
                {beneficiary.allergies.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">알레르기</p>
                    <div className="flex flex-wrap gap-2">
                      {beneficiary.allergies.map((allergy, idx) => (
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
                {beneficiary.specialNotes}
              </p>
            </div>
          </div>
        );

      case 'standard-plan':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">표준약관 및 동의서</h3>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer">
                  <i className="ri-add-line"></i>
                  문서 추가
                </button>
              </div>
              <div className="space-y-3">
                {['장기요양급여 이용계약서', '개인정보 수집·이용 동의서', '표준약관 동의서'].map((doc, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-file-text-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doc}</p>
                        <p className="text-xs text-gray-500">동의일: 2023-01-10</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">동의완료</span>
                      <button className="p-2 text-gray-400 hover:text-teal-600 cursor-pointer">
                        <i className="ri-download-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
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
                  <tr className="bg-teal-50 font-semibold">
                    <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">총 비급여 비용</td>
                    <td className="px-4 py-3 text-sm text-teal-700 text-right">30,000원</td>
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
                <p className="text-xs text-blue-600 mt-1">({beneficiary.copaymentRate}% 부담)</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <p className="text-sm text-green-600 mb-1">식대 본인부담금</p>
                <p className="text-2xl font-bold text-green-700">180,000원</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">비급여 비용</p>
                <p className="text-2xl font-bold text-purple-700">30,000원</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border border-teal-200">
                <p className="text-sm text-teal-600 mb-1">월 총액</p>
                <p className="text-2xl font-bold text-teal-700">660,000원</p>
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

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 p-4">
        <button
          onClick={() => window.REACT_APP_NAVIGATE('/admin/dashboard?menu=beneficiary-list')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          <span className="font-medium">목록으로 돌아가기</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 shadow-lg">
            {beneficiary.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{beneficiary.name}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(beneficiary.status)}`}>
                    {beneficiary.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(beneficiary.grade)}`}>
                    {beneficiary.grade}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {beneficiary.room}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-edit-line mr-1"></i>
                  정보수정
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600 text-xs mb-1">성별/나이</p>
                <p className="font-semibold text-gray-900">{beneficiary.gender} / {new Date().getFullYear() - parseInt(beneficiary.birthDate.split('-')[0])}세</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">입소일</p>
                <p className="font-semibold text-gray-900">{beneficiary.admissionDate}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">본인부담율</p>
                <p className="font-semibold text-gray-900">{beneficiary.copaymentRate}%</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">연락처</p>
                <p className="font-semibold text-gray-900">{beneficiary.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Health Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-5 gap-3">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3">
              <p className="text-xs text-red-600 mb-1">혈압</p>
              <p className="text-sm font-bold text-red-700">{beneficiary.bloodPressure}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
              <p className="text-xs text-orange-600 mb-1">혈당</p>
              <p className="text-sm font-bold text-orange-700">{beneficiary.bloodSugar}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
              <p className="text-xs text-blue-600 mb-1">신장</p>
              <p className="text-sm font-bold text-blue-700">{beneficiary.height}cm</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
              <p className="text-xs text-green-600 mb-1">체중</p>
              <p className="text-sm font-bold text-green-700">{beneficiary.weight}kg</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
              <p className="text-xs text-purple-600 mb-1">등급만료</p>
              <p className="text-sm font-bold text-purple-700">{beneficiary.gradeValidUntil.substring(2)}</p>
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
      <div className="flex-1 overflow-y-auto p-6">
        {renderTabContent()}

        {/* 보호자 정보 섹션 */}
        <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-parent-line text-teal-600"></i>
              보호자 정보
            </h3>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer text-sm">
              <i className="ri-edit-line mr-1"></i>
              보호자 정보 수정
            </button>
          </div>
          <div className="space-y-4">
            {beneficiary.guardians.map((guardian, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{guardian.name}</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {guardian.relation}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line text-gray-400"></i>
                    <span className="text-gray-700">{guardian.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-mail-line text-gray-400"></i>
                    <span className="text-gray-700">{guardian.email}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <i className="ri-map-pin-line text-gray-400"></i>
                    <span className="text-gray-700">{guardian.address}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">청구서 수신 방법:</p>
                    <div className="flex gap-3">
                      {guardian.receiveSMS && <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">문자</span>}
                      {guardian.receiveEmail && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">이메일</span>}
                      {guardian.receiveMail && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">우편</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 입소/퇴소 이력 섹션 */}
        <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-history-line text-teal-600"></i>
              입소/퇴소 이력
            </h3>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer text-sm">
              <i className="ri-add-line mr-1"></i>
              이력 추가
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">연번</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">구분</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">일자</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">시간</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">사유</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">정산</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">작성일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {beneficiary.admissionHistory.map((history, idx) => (
                  <tr key={history.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        history.type === '최초입소' ? 'bg-blue-100 text-blue-700' :
                        history.type === '전원' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {history.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">{history.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">{history.time}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{history.reason}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">{history.settlement}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-center">{history.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
