import { useState } from 'react';
import { residentsData } from '../../../../../src/mocks/residents-management';

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
}

export default function BeneficiaryList() {
  const [beneficiaries] = useState<Beneficiary[]>(residentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterRoom, setFilterRoom] = useState('전체');
  const [filterGrade, setFilterGrade] = useState('전체');
  const [showDischargedResidents, setShowDischargedResidents] = useState(false);

  // 필터링된 수급자 목록
  const filteredBeneficiaries = beneficiaries.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       b.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       b.grade.includes(searchTerm);
    const matchStatus = filterStatus === '전체' || b.status === filterStatus;
    const matchRoom = filterRoom === '전체' || b.room === filterRoom;
    const matchGrade = filterGrade === '전체' || b.grade === filterGrade;
    const matchDischarge = showDischargedResidents || b.status !== '퇴소';

    return matchSearch && matchStatus && matchRoom && matchGrade && matchDischarge;
  });

  // 고유한 방호실 목록
  const rooms = ['전체', ...Array.from(new Set(beneficiaries.map(b => b.room)))];

  // 고유한 등급 목록
  const grades = ['전체', '1등급', '2등급', '3등급', '4등급', '5등급', '인지지원등급'];

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

  const handleRowClick = (id: number) => {
    // 상세 페이지로 이동
    window.REACT_APP_NAVIGATE(`/admin/dashboard?menu=beneficiary-detail&id=${id}`);
  };

  const handleNewBeneficiary = () => {
    window.REACT_APP_NAVIGATE('/admin/dashboard?menu=beneficiary-new');
  };

  const handleExcelDownload = () => {
    alert('엑셀 다운로드 기능은 준비 중입니다.');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-user-heart-line text-teal-600"></i>
              수급자 목록
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              전체 {beneficiaries.length}명 | 입소 {beneficiaries.filter(b => b.status === '입소').length}명 |
              퇴소 {beneficiaries.filter(b => b.status === '퇴소').length}명 |
              대기 {beneficiaries.filter(b => b.status === '대기').length}명
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExcelDownload}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <i className="ri-file-excel-line"></i>
              엑셀 다운로드
            </button>
            <button
              onClick={handleNewBeneficiary}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all font-medium whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              수급자 신규등록
            </button>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="space-y-3">
          {/* 검색 */}
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="이름, 방호실, 등급으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>

          {/* 필터 */}
          <div className="flex flex-wrap gap-3">
            {/* 현황 필터 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">현황:</span>
              <div className="flex gap-2">
                {['전체', '입소', '퇴소', '대기', '상담'].map((status) => (
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

            {/* 생활실 필터 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">생활실:</span>
              <select
                value={filterRoom}
                onChange={(e) => setFilterRoom(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium cursor-pointer focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {rooms.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>

            {/* 등급 필터 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">등급:</span>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium cursor-pointer focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* 퇴소자 포함 체크박스 */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDischargedResidents}
                onChange={(e) => setShowDischargedResidents(e.target.checked)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">퇴소자 포함</span>
            </label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">연번</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">현황</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">수급자명</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">생활실</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">성별</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">나이</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">등급</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">인정만료</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">연락처</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBeneficiaries.map((beneficiary, index) => (
                <tr
                  key={beneficiary.id}
                  onClick={() => handleRowClick(beneficiary.id)}
                  className="hover:bg-teal-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(beneficiary.status)}`}>
                      {beneficiary.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {beneficiary.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{beneficiary.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">{beneficiary.room}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">{beneficiary.gender}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {new Date().getFullYear() - parseInt(beneficiary.birthDate.split('-')[0])}세
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(beneficiary.grade)}`}>
                      {beneficiary.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {beneficiary.gradeValidUntil}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{beneficiary.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBeneficiaries.length === 0 && (
            <div className="py-12 text-center">
              <i className="ri-user-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
