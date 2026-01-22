import { useState } from 'react';
import { careGradeLevels, commonDiseases, relationshipTypes, roomList } from '../../../../../src/mocks/residents-management';

export default function ResidentRegistration() {
  // 기본 정보
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDate, setBirthDate] = useState('');
  const [careGrade, setCareGrade] = useState('');
  const [isOutOfGrade, setIsOutOfGrade] = useState(false);
  const [recognitionStartDate, setRecognitionStartDate] = useState('');
  const [recognitionEndDate, setRecognitionEndDate] = useState('');
  const [recognitionPeriod, setRecognitionPeriod] = useState('2');
  const [admissionDate, setAdmissionDate] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [diseases, setDiseases] = useState<string[]>([]);
  const [customDisease, setCustomDisease] = useState('');
  const [healthCheckSubmitted, setHealthCheckSubmitted] = useState(false);
  const [mealCostSupport, setMealCostSupport] = useState(false);
  const [livingAllowanceSupport, setLivingAllowanceSupport] = useState(false);
  const [residentMemo, setResidentMemo] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  // 보호자 정보
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelation, setGuardianRelation] = useState('');
  const [guardianBirthDate, setGuardianBirthDate] = useState('');
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');
  const [billReceiveMethod, setBillReceiveMethod] = useState('sms');
  const [billAddress, setBillAddress] = useState('');
  const [guardianMemo, setGuardianMemo] = useState('');

  // 가족 정보
  const [family1Name, setFamily1Name] = useState('');
  const [family1Relation, setFamily1Relation] = useState('');
  const [family1Phone, setFamily1Phone] = useState('');
  const [family2Name, setFamily2Name] = useState('');
  const [family2Relation, setFamily2Relation] = useState('');
  const [family2Phone, setFamily2Phone] = useState('');

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // 인정기간 자동 계산
  const handleRecognitionStartDate = (date: string) => {
    setRecognitionStartDate(date);
    if (recognitionPeriod && date) {
      const start = new Date(date);
      start.setFullYear(start.getFullYear() + parseInt(recognitionPeriod));
      setRecognitionEndDate(start.toISOString().split('T')[0]);
    }
  };

  const handleRecognitionPeriod = (period: string) => {
    setRecognitionPeriod(period);
    if (recognitionStartDate && period) {
      const start = new Date(recognitionStartDate);
      start.setFullYear(start.getFullYear() + parseInt(period));
      setRecognitionEndDate(start.toISOString().split('T')[0]);
    }
  };

  // 질환 토글
  const toggleDisease = (disease: string) => {
    setDiseases(prev =>
      prev.includes(disease)
        ? prev.filter(d => d !== disease)
        : [...prev, disease]
    );
  };

  // 사진 업로드
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 중복 확인
  const checkDuplicate = () => {
    if (!name || !birthDate) {
      alert('수급자명과 생년월일을 입력해주세요.');
      return;
    }
    // 실제로는 API 호출
    alert('중복된 입소자가 없습니다.');
  };

  // 저장
  const handleSave = () => {
    if (!name || !birthDate || !admissionDate || !careGrade) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    setSaveStatus('saving');

    // 실제로는 API 호출
    setTimeout(() => {
      setSaveStatus('saved');
      alert('입소자 등록이 완료되었습니다.\n입소자 번호: R' + Date.now().toString().slice(-6));

      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 1000);
  };

  // 건물별 층 필터링
  const floors = selectedBuilding
    ? [...new Set(roomList.filter(r => r.building === selectedBuilding).map(r => r.floor))]
    : [];

  // 층별 호실 필터링
  const rooms = selectedBuilding && selectedFloor
    ? roomList.filter(r => r.building === selectedBuilding && r.floor === selectedFloor)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">입소자 신규 등록</h1>
            <p className="text-sm text-gray-500 mt-1">새로운 입소자의 기본 정보를 등록합니다</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={checkDuplicate}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-search-line mr-2"></i>중복 확인
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              {saveStatus === 'saving' && <i className="ri-loader-4-line animate-spin mr-2"></i>}
              {saveStatus === 'saved' && <i className="ri-check-line mr-2"></i>}
              {saveStatus === 'idle' && <i className="ri-save-line mr-2"></i>}
              {saveStatus === 'saving' ? '저장 중...' : saveStatus === 'saved' ? '저장 완료!' : '등록하기'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 좌측: 사진 및 기본 정보 */}
          <div className="space-y-6">
            {/* 사진 업로드 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">입소자 사진</h3>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                  {photo ? (
                    <img src={photo} alt="입소자" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <i className="ri-user-line text-6xl text-gray-300"></i>
                      <p className="text-sm text-gray-400 mt-2">사진을 업로드하세요</p>
                    </div>
                  )}
                </div>
                <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-upload-2-line mr-2"></i>사진 선택
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* 생활실 배정 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">생활실 배정</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">건물</label>
                  <select
                    value={selectedBuilding}
                    onChange={(e) => {
                      setSelectedBuilding(e.target.value);
                      setSelectedFloor('');
                      setSelectedRoom('');
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">선택하세요</option>
                    {[...new Set(roomList.map(r => r.building))].map(building => (
                      <option key={building} value={building}>{building}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">층</label>
                  <select
                    value={selectedFloor}
                    onChange={(e) => {
                      setSelectedFloor(e.target.value);
                      setSelectedRoom('');
                    }}
                    disabled={!selectedBuilding}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer disabled:bg-gray-100"
                  >
                    <option value="">선택하세요</option>
                    {floors.map(floor => (
                      <option key={floor} value={floor}>{floor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">호실</label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    disabled={!selectedFloor}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer disabled:bg-gray-100"
                  >
                    <option value="">선택하세요</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.room} disabled={room.status === 'occupied'}>
                        {room.room} {room.status === 'occupied' && '(사용중)'}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedBuilding && selectedFloor && selectedRoom && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                    <p className="text-sm font-medium text-emerald-800">
                      <i className="ri-check-line mr-2"></i>
                      {selectedBuilding} {selectedFloor} {selectedRoom}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 우측: 상세 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 수급자 기본 정보 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                <i className="ri-user-fill text-emerald-500 mr-2"></i>수급자 기본 정보
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수급자명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    성별 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setGender('male')}
                      className={`flex-1 px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        gender === 'male'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className="ri-men-line mr-2"></i>남성
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`flex-1 px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        gender === 'female'
                          ? 'bg-pink-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className="ri-women-line mr-2"></i>여성
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    생년월일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    입소일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    장기요양등급 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={careGrade}
                    onChange={(e) => setCareGrade(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">선택하세요</option>
                    {careGradeLevels.map(grade => (
                      <option key={grade.value} value={grade.value}>{grade.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center pt-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOutOfGrade}
                      onChange={(e) => setIsOutOfGrade(e.target.checked)}
                      className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">등급 외 여부</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">인정기간 시작일</label>
                  <input
                    type="date"
                    value={recognitionStartDate}
                    onChange={(e) => handleRecognitionStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">인정기간</label>
                  <select
                    value={recognitionPeriod}
                    onChange={(e) => handleRecognitionPeriod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="1">1년</option>
                    <option value="2">2년</option>
                    <option value="3">3년</option>
                    <option value="4">4년</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">인정기간 종료일</label>
                  <input
                    type="date"
                    value={recognitionEndDate}
                    onChange={(e) => setRecognitionEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="기본 주소"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-2"
                  />
                  <input
                    type="text"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="상세 주소"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">주요 질환</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {commonDiseases.map(disease => (
                      <button
                        key={disease}
                        onClick={() => toggleDisease(disease)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all whitespace-nowrap cursor-pointer ${
                          diseases.includes(disease)
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {diseases.includes(disease) && <i className="ri-check-line mr-1"></i>}
                        {disease}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customDisease}
                    onChange={(e) => setCustomDisease(e.target.value)}
                    placeholder="기타 질환을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={healthCheckSubmitted}
                      onChange={(e) => setHealthCheckSubmitted(e.target.checked)}
                      className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">입소 전 건강검진 제출 완료</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mealCostSupport}
                      onChange={(e) => setMealCostSupport(e.target.checked)}
                      className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">식사재료비 지원</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={livingAllowanceSupport}
                      onChange={(e) => setLivingAllowanceSupport(e.target.checked)}
                      className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">생계급여 지원</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                  <textarea
                    value={residentMemo}
                    onChange={(e) => setResidentMemo(e.target.value)}
                    rows={3}
                    placeholder="특이사항이나 주의사항을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    maxLength={500}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 보호자 정보 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                <i className="ri-parent-fill text-blue-500 mr-2"></i>보호자 정보
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">보호자명</label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="보호자 이름"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">관계</label>
                  <select
                    value={guardianRelation}
                    onChange={(e) => setGuardianRelation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">선택하세요</option>
                    {relationshipTypes.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                  <input
                    type="date"
                    value={guardianBirthDate}
                    onChange={(e) => setGuardianBirthDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                  <input
                    type="tel"
                    value={guardianPhoneNumber}
                    onChange={(e) => setGuardianPhoneNumber(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                  <input
                    type="email"
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">청구서 수신 방법</label>
                  <select
                    value={billReceiveMethod}
                    onChange={(e) => setBillReceiveMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="sms">문자</option>
                    <option value="email">이메일</option>
                    <option value="mail">우편</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                  <input
                    type="text"
                    value={guardianAddress}
                    onChange={(e) => setGuardianAddress(e.target.value)}
                    placeholder="보호자 주소"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">청구 주소 (우편 수신 시)</label>
                  <input
                    type="text"
                    value={billAddress}
                    onChange={(e) => setBillAddress(e.target.value)}
                    placeholder="청구서 우편 수신 주소"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                  <textarea
                    value={guardianMemo}
                    onChange={(e) => setGuardianMemo(e.target.value)}
                    rows={2}
                    placeholder="보호자 관련 메모"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    maxLength={500}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 가족 정보 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                <i className="ri-group-fill text-purple-500 mr-2"></i>가족 정보
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">가족1 이름</label>
                    <input
                      type="text"
                      value={family1Name}
                      onChange={(e) => setFamily1Name(e.target.value)}
                      placeholder="이름"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">관계</label>
                    <select
                      value={family1Relation}
                      onChange={(e) => setFamily1Relation(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="">선택</option>
                      {relationshipTypes.map(rel => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                    <input
                      type="tel"
                      value={family1Phone}
                      onChange={(e) => setFamily1Phone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">가족2 이름</label>
                    <input
                      type="text"
                      value={family2Name}
                      onChange={(e) => setFamily2Name(e.target.value)}
                      placeholder="이름"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">관계</label>
                    <select
                      value={family2Relation}
                      onChange={(e) => setFamily2Relation(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="">선택</option>
                      {relationshipTypes.map(rel => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                    <input
                      type="tel"
                      value={family2Phone}
                      onChange={(e) => setFamily2Phone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
