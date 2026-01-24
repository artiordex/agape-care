// app/beneficiary/BeneficiaryDetail.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  guardians?: Guardian[];
  admissionHistory?: AdmissionHistory[];
}

export default function BeneficiaryDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBeneficiary = async () => {
      const id = searchParams.get('id');

      if (!id) {
        alert('수급자 ID가 없습니다.');
        router.push('/beneficiary/list');
        return;
      }

      try {
        // TODO: 백엔드 API 연결
        // const response = await fetch(`/api/beneficiaries/${id}`);
        // if (!response.ok) {
        //   throw new Error('수급자 정보를 불러올 수 없습니다.');
        // }
        // const data = await response.json();
        // setBeneficiary(data);

        // 임시: localStorage에서 데이터 가져오기 (개발용)
        const savedBeneficiaries = JSON.parse(localStorage.getItem('beneficiaries') || '[]');
        const found = savedBeneficiaries.find((b: Beneficiary) => b.id === parseInt(id));

        if (found) {
          // 하드코딩된 추가 데이터 (백엔드 연결 전까지 임시)
          const beneficiaryWithDetails: Beneficiary = {
            ...found,
            photo: '',
            mainDiseases: found.mainDiseases || ['고혈압', '당뇨', '치매'],
            mobility: found.mobility || '부분도움',
            cognition: found.cognition || '경증치매',
            mealStatus: found.mealStatus || '자립',
            toiletStatus: found.toiletStatus || '부분도움',
            medications: found.medications || ['혈압약', '당뇨약', '콜레스테롤약'],
            allergies: found.allergies || [],
            specialNotes: found.specialNotes || '낙상주의, 저녁시간대 불안증상',
            bloodPressure: found.bloodPressure || '130/85',
            bloodSugar: found.bloodSugar || '110',
            height: found.height || 165,
            weight: found.weight || 62,
            guardians: found.guardians || [
              {
                name: '김보호자',
                relation: '자녀',
                phone: '010-1111-2222',
                email: 'guardian@email.com',
                address: '서울시 강남구 테헤란로 123',
                receiveNotice: true,
                receiveSMS: true,
                receiveEmail: true,
                receiveMail: false,
              },
            ],
            admissionHistory: found.admissionHistory || [
              {
                id: 1,
                type: '최초입소',
                date: found.admissionDate || '2023-01-15',
                time: '14:00',
                reason: '가족돌봄 어려움',
                settlement: '완료',
                createdAt: found.admissionDate || '2023-01-15',
                hasRecord: true,
              },
            ],
          };
          setBeneficiary(beneficiaryWithDetails);
        } else {
          alert('수급자 정보를 찾을 수 없습니다.');
          router.push('/beneficiary/list');
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
        alert('수급자 정보를 불러오는 중 오류가 발생했습니다.');
        router.push('/beneficiary/list');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeneficiary();
  }, [searchParams, router]);

  const handleBack = () => {
    router.push('/beneficiary/list');
  };

  const handleEdit = () => {
    // TODO: 수정 모달 또는 페이지로 이동
    setShowEditModal(true);
    alert('정보 수정 기능은 추후 구현 예정입니다.');
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-loader-4-line mb-4 animate-spin text-6xl text-teal-600"></i>
          <p className="text-gray-600">수급자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!beneficiary) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-user-line mb-4 text-6xl text-gray-300"></i>
          <p className="text-gray-500">수급자 정보를 찾을 수 없습니다.</p>
          <button
            onClick={handleBack}
            className="mt-4 cursor-pointer rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-blue-100 text-blue-700';
      case '퇴소':
        return 'bg-gray-100 text-gray-700';
      case '대기':
      case '입소대기':
        return 'bg-amber-100 text-amber-700';
      case '상담':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
            <div className="rounded-lg border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <i className="ri-user-line text-teal-600"></i>
                상세 기본정보
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-sm text-gray-600">이름</p>
                  <p className="font-semibold text-gray-900">{beneficiary.name}</p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-sm text-gray-600">성별</p>
                  <p className="font-semibold text-gray-900">{beneficiary.gender}</p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-sm text-gray-600">생년월일</p>
                  <p className="font-semibold text-gray-900">{beneficiary.birthDate}</p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-sm text-gray-600">주민등록번호</p>
                  <p className="font-semibold text-gray-900">{beneficiary.registrationNumber || '미등록'}</p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-sm text-gray-600">연락처</p>
                  <p className="font-semibold text-gray-900">{beneficiary.phone}</p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="mb-1 text-sm text-gray-600">생활실</p>
                  <p className="font-semibold text-gray-900">{beneficiary.room || '미배정'}</p>
                </div>
                <div className="col-span-2 rounded-lg bg-white p-4">
                  <p className="mb-1 text-sm text-gray-600">주소</p>
                  <p className="font-semibold text-gray-900">{beneficiary.address || '미등록'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <i className="ri-hospital-line text-teal-600"></i>
                건강 및 기능 상태
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-sm text-gray-600">인지기능</p>
                  <p className="font-semibold text-gray-900">{beneficiary.cognition}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">거동상태</p>
                  <p className="font-semibold text-gray-900">{beneficiary.mobility}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">식사상태</p>
                  <p className="font-semibold text-gray-900">{beneficiary.mealStatus}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">배변상태</p>
                  <p className="font-semibold text-gray-900">{beneficiary.toiletStatus}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <i className="ri-capsule-line text-teal-600"></i>
                주요 질환 및 복용약품
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-gray-600">주요 질환</p>
                  <div className="flex flex-wrap gap-2">
                    {beneficiary.mainDiseases && beneficiary.mainDiseases.length > 0 ? (
                      beneficiary.mainDiseases.map((disease, idx) => (
                        <span key={idx} className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                          {disease}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">등록된 질환 없음</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-gray-600">복용약품</p>
                  <div className="flex flex-wrap gap-2">
                    {beneficiary.medications && beneficiary.medications.length > 0 ? (
                      beneficiary.medications.map((med, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                        >
                          {med}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">복용 중인 약품 없음</span>
                    )}
                  </div>
                </div>
                {beneficiary.allergies && beneficiary.allergies.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm text-gray-600">알레르기</p>
                    <div className="flex flex-wrap gap-2">
                      {beneficiary.allergies.map((allergy, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700"
                        >
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <i className="ri-alert-line text-teal-600"></i>
                특이사항
              </h3>
              <p className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-gray-700">
                {beneficiary.specialNotes || '특이사항 없음'}
              </p>
            </div>
          </div>
        );

      case 'standard-plan':
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">표준약관 및 동의서</h3>
                <button className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700">
                  <i className="ri-add-line"></i>
                  문서 추가
                </button>
              </div>
              <div className="space-y-3">
                {['장기요양급여 이용계약서', '개인정보 수집·이용 동의서', '표준약관 동의서'].map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <i className="ri-file-text-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doc}</p>
                        <p className="text-xs text-gray-500">동의일: 2023-01-10</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        동의완료
                      </span>
                      <button className="cursor-pointer p-2 text-gray-400 hover:text-teal-600">
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
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">기초 평가</h3>
                <button className="cursor-pointer whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700">
                  <i className="ri-add-line mr-1"></i>
                  평가 등록
                </button>
              </div>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                  <p className="mb-1 text-sm text-blue-600">일상생활능력(ADL)</p>
                  <p className="text-2xl font-bold text-blue-700">65점</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
                  <p className="mb-1 text-sm text-green-600">도구적일상생활(IADL)</p>
                  <p className="text-2xl font-bold text-green-700">45점</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                  <p className="mb-1 text-sm text-purple-600">인지기능</p>
                  <p className="text-2xl font-bold text-purple-700">55점</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-4">
                  <p className="mb-1 text-sm text-orange-600">기동력</p>
                  <p className="text-2xl font-bold text-orange-700">70점</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'consultation':
        return (
          <div className="space-y-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">상담일지</h3>
              <button className="cursor-pointer whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700">
                <i className="ri-add-line mr-1"></i>
                상담 등록
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2].map(item => (
                <div
                  key={item}
                  className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">건강</span>
                      <p className="mt-2 text-sm text-gray-600">2024-01-{10 + item} | 김사회복지사</p>
                    </div>
                    <button className="cursor-pointer text-gray-400 hover:text-gray-600">
                      <i className="ri-more-2-fill text-xl"></i>
                    </button>
                  </div>
                  <p className="text-gray-700">
                    최근 혈압이 안정적으로 유지되고 있음. 식사량도 양호하며 프로그램 참여도가 높아짐.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'extra-cost':
        return (
          <div className="space-y-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">기타비용 / 비급여</h3>
              <button className="cursor-pointer whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700">
                <i className="ri-add-line mr-1"></i>
                항목 추가
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
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
                    <td className="px-4 py-3 text-right text-sm text-gray-900">10,000원</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">1</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">10,000원</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">간식</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-900">5,000원</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">4</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">20,000원</td>
                  </tr>
                  <tr className="bg-teal-50 font-semibold">
                    <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">
                      총 비급여 비용
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-teal-700">30,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'copayment':
        return (
          <div className="space-y-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">본인부담금 관리</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                <p className="mb-1 text-sm text-blue-600">요양급여 본인부담금</p>
                <p className="text-2xl font-bold text-blue-700">450,000원</p>
                <p className="mt-1 text-xs text-blue-600">({beneficiary.copaymentRate}% 부담)</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6">
                <p className="mb-1 text-sm text-green-600">식대 본인부담금</p>
                <p className="text-2xl font-bold text-green-700">180,000원</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6">
                <p className="mb-1 text-sm text-purple-600">비급여 비용</p>
                <p className="text-2xl font-bold text-purple-700">30,000원</p>
              </div>
              <div className="rounded-lg border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100 p-6">
                <p className="mb-1 text-sm text-teal-600">월 총액</p>
                <p className="text-2xl font-bold text-teal-700">660,000원</p>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">서류 관리</h3>
              <button className="cursor-pointer whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700">
                <i className="ri-upload-line mr-1"></i>
                서류 업로드
              </button>
            </div>
            <div className="space-y-3">
              {['장기요양인정서', '이용계약서', '개인정보동의서', '신분증 사본', '건강진단서'].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <i className="ri-file-text-line text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doc}</p>
                      <p className="text-xs text-gray-500">업로드일: 2023-01-10</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">등록완료</span>
                    <button className="cursor-pointer p-2 text-gray-400 hover:text-teal-600">
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
    <div className="flex h-full flex-col overflow-hidden bg-gray-50">
      {/* Header with Back Button */}
      <div className="border-b border-gray-200 bg-white p-4">
        <button
          onClick={handleBack}
          className="mb-4 flex cursor-pointer items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        >
          <i className="ri-arrow-left-line"></i>
          <span className="font-medium">목록으로 돌아가기</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="border-b border-gray-200 bg-white p-6">
        <div className="flex items-start gap-6">
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 text-4xl font-bold text-white shadow-lg">
            {beneficiary.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">{beneficiary.name}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(beneficiary.status)}`}>
                    {beneficiary.status}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${getGradeColor(beneficiary.grade)}`}>
                    {beneficiary.grade}
                  </span>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                    {beneficiary.room || '미배정'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                >
                  <i className="ri-edit-line mr-1"></i>
                  정보수정
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="mb-1 text-xs text-gray-600">성별/나이</p>
                <p className="font-semibold text-gray-900">
                  {beneficiary.gender} / {new Date().getFullYear() - parseInt(beneficiary.birthDate.split('-')[0])}세
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-600">입소일</p>
                <p className="font-semibold text-gray-900">{beneficiary.admissionDate}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-600">본인부담율</p>
                <p className="font-semibold text-gray-900">{beneficiary.copaymentRate}%</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-600">연락처</p>
                <p className="font-semibold text-gray-900">{beneficiary.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Health Info */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="grid grid-cols-5 gap-3">
            <div className="rounded-lg bg-gradient-to-br from-red-50 to-red-100 p-3">
              <p className="mb-1 text-xs text-red-600">혈압</p>
              <p className="text-sm font-bold text-red-700">{beneficiary.bloodPressure}</p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-3">
              <p className="mb-1 text-xs text-orange-600">혈당</p>
              <p className="text-sm font-bold text-orange-700">{beneficiary.bloodSugar}</p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-3">
              <p className="mb-1 text-xs text-blue-600">신장</p>
              <p className="text-sm font-bold text-blue-700">{beneficiary.height}cm</p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-3">
              <p className="mb-1 text-xs text-green-600">체중</p>
              <p className="text-sm font-bold text-green-700">{beneficiary.weight}kg</p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-3">
              <p className="mb-1 text-xs text-purple-600">등급만료</p>
              <p className="text-sm font-bold text-purple-700">{beneficiary.gradeValidUntil.substring(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto border-b border-gray-200 bg-white">
        <div className="flex min-w-max gap-1 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer whitespace-nowrap px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab.id ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-600 hover:text-gray-900'
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
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <i className="ri-parent-line text-teal-600"></i>
              보호자 정보
            </h3>
            <button className="cursor-pointer whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-700">
              <i className="ri-edit-line mr-1"></i>
              보호자 정보 수정
            </button>
          </div>
          <div className="space-y-4">
            {beneficiary.guardians && beneficiary.guardians.length > 0 ? (
              beneficiary.guardians.map((guardian, idx) => (
                <div key={idx} className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{guardian.name}</p>
                      <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
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
                    <div className="col-span-2 flex items-center gap-2">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <span className="text-gray-700">{guardian.address}</span>
                    </div>
                    <div className="col-span-2 border-t border-gray-200 pt-2">
                      <p className="mb-2 text-xs text-gray-600">청구서 수신 방법:</p>
                      <div className="flex gap-3">
                        {guardian.receiveSMS && (
                          <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">문자</span>
                        )}
                        {guardian.receiveEmail && (
                          <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">이메일</span>
                        )}
                        {guardian.receiveMail && (
                          <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700">우편</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">등록된 보호자 정보가 없습니다.</p>
            )}
          </div>
        </div>

        {/* 입소/퇴소 이력 섹션 */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <i className="ri-history-line text-teal-600"></i>
              입소/퇴소 이력
            </h3>
            <button className="cursor-pointer whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-700">
              <i className="ri-add-line mr-1"></i>
              이력 추가
            </button>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
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
                {beneficiary.admissionHistory && beneficiary.admissionHistory.length > 0 ? (
                  beneficiary.admissionHistory.map((history, idx) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            history.type === '최초입소'
                              ? 'bg-blue-100 text-blue-700'
                              : history.type === '전원'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {history.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">{history.date}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">{history.time}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{history.reason}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">{history.settlement}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">{history.createdAt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      등록된 입소/퇴소 이력이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
