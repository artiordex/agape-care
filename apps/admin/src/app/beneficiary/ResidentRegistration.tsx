
import { useState } from 'react';
// Import 경로 수정: residents-management → residents  
import { mockResidents } from '../../../../mocks/residents';

export default function ResidentRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthDate: '',
    idNumber: '',
    phone: '',
    address: '',
    room: '',
    grade: '',
    admissionDate: '',
    guardian: {
      name: '',
      relationship: '',
      phone: '',
      address: ''
    },
    medicalInfo: {
      diseases: [],
      medications: '',
      allergies: '',
      notes: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as object,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수급자 등록:', formData);
    // 실제 API 호출 로직
  };

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">수급자 신규등록</h2>
        <div className="flex space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            form="resident-form"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            등록
          </button>
        </div>
      </div>

      {/* 등록 폼 */}
      <form id="resident-form" onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                수급자명 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                성별 *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">선택하세요</option>
                <option value="남">남</option>
                <option value="여">여</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                생년월일 *
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주민등록번호 *
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                placeholder="000000-0000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연락처
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                등급 *
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">선택하세요</option>
                <option value="1등급">1등급</option>
                <option value="2등급">2등급</option>
                <option value="3등급">3등급</option>
                <option value="4등급">4등급</option>
                <option value="5등급">5등급</option>
                <option value="인지지원등급">인지지원등급</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                생활실 *
              </label>
              <select
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">선택하세요</option>
                <option value="101호">101호</option>
                <option value="102호">102호</option>
                <option value="103호">103호</option>
                <option value="201호">201호</option>
                <option value="202호">202호</option>
                <option value="203호">203호</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                입소일 *
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주소
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="주소를 입력하세요"
            />
          </div>
        </div>

        {/* 보호자 정보 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">보호자 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                보호자명 *
              </label>
              <input
                type="text"
                name="guardian.name"
                value={formData.guardian.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                관계 *
              </label>
              <select
                name="guardian.relationship"
                value={formData.guardian.relationship}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">선택하세요</option>
                <option value="자녀">자녀</option>
                <option value="배우자">배우자</option>
                <option value="형제">형제</option>
                <option value="자매">자매</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연락처 *
              </label>
              <input
                type="tel"
                name="guardian.phone"
                value={formData.guardian.phone}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                name="guardian.address"
                value={formData.guardian.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 의료 정보 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">의료 정보</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주요 질환
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['고혈압', '당뇨병', '치매', '뇌졸중', '관절염', '심장병', '파킨슨병', '기타'].map((disease) => (
                  <label key={disease} className="flex items-center">
                    <input
                      type="checkbox"
                      value={disease}
                      onChange={(e) => {
                        const diseases = formData.medicalInfo.diseases;
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            medicalInfo: {
                              ...prev.medicalInfo,
                              diseases: [...diseases, disease]
                            }
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            medicalInfo: {
                              ...prev.medicalInfo,
                              diseases: diseases.filter(d => d !== disease)
                            }
                          }));
                        }
                      }}
                      className="mr-2"
                    />
                    {disease}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                복용 중인 약물
              </label>
              <textarea
                name="medicalInfo.medications"
                value={formData.medicalInfo.medications}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="복용 중인 약물을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                알레르기
              </label>
              <textarea
                name="medicalInfo.allergies"
                value={formData.medicalInfo.allergies}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="알레르기 정보를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                특이사항
              </label>
              <textarea
                name="medicalInfo.notes"
                value={formData.medicalInfo.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="특이사항을 입력하세요"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
