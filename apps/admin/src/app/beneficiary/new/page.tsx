// app/beneficiary/BeneficiaryNew.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FormData {
  name: string;
  gender: string;
  birthDate: string;
  birthType: string;
  registrationNumber: string;
  phone: string;
  address: string;
  addressDetail: string;
  grade: string;
  recognitionNumber: string;
  recognitionPeriod: string;
  gradeValidUntil: string;
  status: string;
  room: string;
  admissionDate: string;
  copaymentRate: number;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress: string;
  receiveSMS: boolean;
  receiveEmail: boolean;
  receiveMail: boolean;
}

export default function BeneficiaryNew() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '남',
    birthDate: '',
    birthType: '양력',
    registrationNumber: '',
    phone: '',
    address: '',
    addressDetail: '',
    grade: '1등급',
    recognitionNumber: '',
    recognitionPeriod: '',
    gradeValidUntil: '',
    status: '입소대기',
    room: '',
    admissionDate: '',
    copaymentRate: 20,
    guardianName: '',
    guardianRelation: '자녀',
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '',
    receiveSMS: true,
    receiveEmail: true,
    receiveMail: false,
  });

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    // 필수 입력 검증
    if (!formData.name || !formData.birthDate || !formData.phone) {
      alert('필수 항목(이름, 생년월일, 연락처)을 모두 입력해주세요.');
      return false;
    }

    if (!formData.guardianName || !formData.guardianPhone) {
      alert('보호자 정보(이름, 연락처)를 입력해주세요.');
      return false;
    }

    // 전화번호 형식 검증 (선택사항)
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('연락처 형식이 올바르지 않습니다. (예: 010-0000-0000)');
      return false;
    }

    if (!phoneRegex.test(formData.guardianPhone)) {
      alert('보호자 연락처 형식이 올바르지 않습니다. (예: 010-0000-0000)');
      return false;
    }

    // 이메일 형식 검증 (입력된 경우만)
    if (formData.guardianEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.guardianEmail)) {
        alert('이메일 형식이 올바르지 않습니다.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 백엔드 API 연결
      // const response = await fetch('/api/beneficiaries', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('저장 실패');
      // }
      //
      // const result = await response.json();

      // 임시: 로컬 스토리지에 저장 (개발용)
      const savedBeneficiaries = JSON.parse(localStorage.getItem('beneficiaries') || '[]');
      const newBeneficiary = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      savedBeneficiaries.push(newBeneficiary);
      localStorage.setItem('beneficiaries', JSON.stringify(savedBeneficiaries));

      alert('✅ 수급자 정보가 저장되었습니다.');
      router.push('/beneficiary/list');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('❌ 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.push('/beneficiary/list');
    }
  };

  const handleAddressSearch = () => {
    // TODO: 주소 검색 API 연동 (Daum 우편번호 서비스 등)
    alert('주소 검색 기능은 추후 구현 예정입니다.');
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <i className="ri-user-add-line text-teal-600"></i>
              수급자 신규등록
            </h1>
            <p className="mt-1 text-sm text-gray-600">새로운 수급자의 기본 정보를 입력해주세요.</p>
          </div>
          <button onClick={handleCancel} className="cursor-pointer text-gray-600 transition-colors hover:text-gray-900">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* 수급자 기본정보 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <i className="ri-user-line text-teal-600"></i>
              수급자 기본정보
              <span className="text-sm font-normal text-red-600">* 필수항목</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  이름 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="수급자 이름"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  성별 <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="남"
                      checked={formData.gender === '남'}
                      onChange={e => handleInputChange('gender', e.target.value)}
                      className="h-4 w-4 cursor-pointer text-teal-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">남</span>
                  </label>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="여"
                      checked={formData.gender === '여'}
                      onChange={e => handleInputChange('gender', e.target.value)}
                      className="h-4 w-4 cursor-pointer text-teal-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">여</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  생년월일 <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={e => handleInputChange('birthDate', e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                  <select
                    value={formData.birthType}
                    onChange={e => handleInputChange('birthType', e.target.value)}
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="양력">양력</option>
                    <option value="음력">음력</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">주민등록번호</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={e => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="000000-0000000"
                  maxLength={14}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  연락처 <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">주소</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.address}
                      onChange={e => handleInputChange('address', e.target.value)}
                      placeholder="기본 주소"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="cursor-pointer whitespace-nowrap rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
                    >
                      주소 검색
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.addressDetail}
                    onChange={e => handleInputChange('addressDetail', e.target.value)}
                    placeholder="상세 주소"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 등급 및 인정정보 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <i className="ri-medal-line text-teal-600"></i>
              등급 및 인정정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">요양등급</label>
                <select
                  value={formData.grade}
                  onChange={e => handleInputChange('grade', e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                >
                  <option value="미등록">미등록</option>
                  <option value="1등급">1등급</option>
                  <option value="2등급">2등급</option>
                  <option value="3등급">3등급</option>
                  <option value="4등급">4등급</option>
                  <option value="5등급">5등급</option>
                  <option value="인지지원등급">인지지원등급</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">인정번호</label>
                <input
                  type="text"
                  value={formData.recognitionNumber}
                  onChange={e => handleInputChange('recognitionNumber', e.target.value)}
                  placeholder="인정번호"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">인정기간</label>
                <input
                  type="text"
                  value={formData.recognitionPeriod}
                  onChange={e => handleInputChange('recognitionPeriod', e.target.value)}
                  placeholder="2년"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">등급유효기간</label>
                <input
                  type="date"
                  value={formData.gradeValidUntil}
                  onChange={e => handleInputChange('gradeValidUntil', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* 입소정보 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <i className="ri-hospital-line text-teal-600"></i>
              입소정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">현황</label>
                <select
                  value={formData.status}
                  onChange={e => handleInputChange('status', e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                >
                  <option value="입소대기">입소대기</option>
                  <option value="입소">입소</option>
                  <option value="상담">상담</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">생활실</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={e => handleInputChange('room', e.target.value)}
                  placeholder="예: 101호"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">입소일</label>
                <input
                  type="date"
                  value={formData.admissionDate}
                  onChange={e => handleInputChange('admissionDate', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">본인부담율 (%)</label>
                <input
                  type="number"
                  value={formData.copaymentRate}
                  onChange={e => handleInputChange('copaymentRate', parseInt(e.target.value) || 0)}
                  min="0"
                  max="100"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* 보호자 정보 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <i className="ri-parent-line text-teal-600"></i>
              주보호자 정보
              <span className="text-sm font-normal text-red-600">* 필수항목</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  보호자 이름 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={e => handleInputChange('guardianName', e.target.value)}
                  placeholder="보호자 이름"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">관계</label>
                <select
                  value={formData.guardianRelation}
                  onChange={e => handleInputChange('guardianRelation', e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                >
                  <option value="자녀">자녀</option>
                  <option value="배우자">배우자</option>
                  <option value="형제자매">형제자매</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  연락처 <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={e => handleInputChange('guardianPhone', e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">이메일</label>
                <input
                  type="email"
                  value={formData.guardianEmail}
                  onChange={e => handleInputChange('guardianEmail', e.target.value)}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">청구지 주소</label>
                <input
                  type="text"
                  value={formData.guardianAddress}
                  onChange={e => handleInputChange('guardianAddress', e.target.value)}
                  placeholder="청구서를 받을 주소"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">청구서 수신 방법</label>
                <div className="flex gap-4">
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={formData.receiveSMS}
                      onChange={e => handleInputChange('receiveSMS', e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">문자</span>
                  </label>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={formData.receiveEmail}
                      onChange={e => handleInputChange('receiveEmail', e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">이메일</span>
                  </label>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={formData.receiveMail}
                      onChange={e => handleInputChange('receiveMail', e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">우편</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t border-gray-200 bg-white p-6">
        <div className="mx-auto flex max-w-4xl justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-gray-200 px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2.5 font-medium text-white transition-all hover:from-teal-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line mr-2 animate-spin"></i>
                저장 중...
              </>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>
                저장
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
