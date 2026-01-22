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

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // 필수 입력 검증
    if (!formData.name || !formData.birthDate || !formData.phone) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!formData.guardianName || !formData.guardianPhone) {
      alert('보호자 정보를 입력해주세요.');
      return;
    }

    // 저장 처리
    alert('수급자 정보가 저장되었습니다.');
    window.REACT_APP_NAVIGATE('/admin/dashboard?menu=beneficiary-list');
  };

  const handleCancel = () => {
    if (confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      window.REACT_APP_NAVIGATE('/admin/dashboard?menu=beneficiary-list');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-user-add-line text-teal-600"></i>
              수급자 신규등록
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              새로운 수급자의 기본 정보를 입력해주세요.
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 수급자 기본정보 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-user-line text-teal-600"></i>
              수급자 기본정보
              <span className="text-sm text-red-600 font-normal">* 필수항목</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="수급자 이름"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  성별 <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="남"
                      checked={formData.gender === '남'}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-4 h-4 text-teal-600 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">남</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="여"
                      checked={formData.gender === '여'}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-4 h-4 text-teal-600 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">여</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  생년월일 <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <select
                    value={formData.birthType}
                    onChange={(e) => handleInputChange('birthType', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="양력">양력</option>
                    <option value="음력">음력</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주민등록번호
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="000000-0000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주소
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="기본 주소"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer">
                      주소 검색
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.addressDetail}
                    onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                    placeholder="상세 주소"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 등급 및 인정정보 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-medal-line text-teal-600"></i>
              등급 및 인정정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  요양등급
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  인정번호
                </label>
                <input
                  type="text"
                  value={formData.recognitionNumber}
                  onChange={(e) => handleInputChange('recognitionNumber', e.target.value)}
                  placeholder="인정번호"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  인정기간
                </label>
                <input
                  type="text"
                  value={formData.recognitionPeriod}
                  onChange={(e) => handleInputChange('recognitionPeriod', e.target.value)}
                  placeholder="2년"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  등급유효기간
                </label>
                <input
                  type="date"
                  value={formData.gradeValidUntil}
                  onChange={(e) => handleInputChange('gradeValidUntil', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 입소정보 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-hospital-line text-teal-600"></i>
              입소정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  현황
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="입소대기">입소대기</option>
                  <option value="입소">입소</option>
                  <option value="상담">상담</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  생활실
                </label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => handleInputChange('room', e.target.value)}
                  placeholder="예: 101호"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  입소일
                </label>
                <input
                  type="date"
                  value={formData.admissionDate}
                  onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  본인부담율 (%)
                </label>
                <input
                  type="number"
                  value={formData.copaymentRate}
                  onChange={(e) => handleInputChange('copaymentRate', parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 보호자 정보 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-parent-line text-teal-600"></i>
              주보호자 정보
              <span className="text-sm text-red-600 font-normal">* 필수항목</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  보호자 이름 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={(e) => handleInputChange('guardianName', e.target.value)}
                  placeholder="보호자 이름"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  관계
                </label>
                <select
                  value={formData.guardianRelation}
                  onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="자녀">자녀</option>
                  <option value="배우자">배우자</option>
                  <option value="형제자매">형제자매</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={formData.guardianEmail}
                  onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  청구지 주소
                </label>
                <input
                  type="text"
                  value={formData.guardianAddress}
                  onChange={(e) => handleInputChange('guardianAddress', e.target.value)}
                  placeholder="청구서를 받을 주소"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  청구서 수신 방법
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.receiveSMS}
                      onChange={(e) => handleInputChange('receiveSMS', e.target.checked)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">문자</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.receiveEmail}
                      onChange={(e) => handleInputChange('receiveEmail', e.target.checked)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">이메일</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.receiveMail}
                      onChange={(e) => handleInputChange('receiveMail', e.target.checked)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded cursor-pointer"
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
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all font-medium whitespace-nowrap cursor-pointer"
          >
            <i className="ri-save-line mr-2"></i>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
