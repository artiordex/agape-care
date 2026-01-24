import { useState } from 'react';
import { residentsData } from '../../../../mocks/residents';

interface Resident {
  id: number;
  name: string;
  gender: string;
  grade: string;
  admissionDate: string;
  room: string;
  birthDate: string;
  mainDiseases: string[];
  status: string;
}

interface OutingRecord {
  id: number;
  residentId: number;
  residentName: string;
  type: '외출' | '외박' | '병원외래';
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  expectedReturnDate: string;
  expectedReturnTime: string;
  destination: string;
  purpose: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  hospital?: string;
  notes: string;
  status: '진행중' | '복귀완료' | '복귀미처리';
  createdAt: string;
  createdBy: string;
}

export default function OutingManagement() {
  /* -------------------------------------------------
   *  State
   * ------------------------------------------------- */
  const [residents] = useState<Resident[]>(residentsData as Resident[]);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    (residentsData[0] as Resident) ?? null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterGrade, setFilterGrade] = useState('전체');
  const [filterRoom, setFilterRoom] = useState('전체');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<OutingRecord | null>(null);
  const [filterRecordStatus, setFilterRecordStatus] = useState<
    '전체' | '진행중' | '복귀완료' | '복귀미처리'
  >('전체');

  // 외출/외박 기록 목 데이터
  const [outingRecords, setOutingRecords] = useState<OutingRecord[]>([
    {
      id: 1,
      residentId: 1,
      residentName: '김영희',
      type: '외출',
      departureDate: '2024-01-15',
      departureTime: '10:00',
      returnDate: '2024-01-15',
      returnTime: '16:30',
      expectedReturnDate: '2024-01-15',
      expectedReturnTime: '16:00',
      destination: '자택',
      purpose: '가족 방문',
      guardianName: '김철수',
      guardianRelation: '아들',
      guardianPhone: '010-1234-5678',
      notes: '휠체어 이용',
      status: '복귀완료',
      createdAt: '2024-01-15 09:30',
      createdBy: '박요양사',
    },
    {
      id: 2,
      residentId: 2,
      residentName: '이철수',
      type: '병원외래',
      departureDate: '2024-01-16',
      departureTime: '09:00',
      returnDate: '',
      returnTime: '',
      expectedReturnDate: '2024-01-16',
      expectedReturnTime: '14:00',
      destination: '병원',
      purpose: '정기 진료',
      guardianName: '이영희',
      guardianRelation: '배우자',
      guardianPhone: '010-2345-6789',
      hospital: '서울대학교병원',
      notes: '공복 상태 유지',
      status: '복귀미처리',
      createdAt: '2024-01-16 08:30',
      createdBy: '김간호사',
    },
    {
      id: 3,
      residentId: 3,
      residentName: '박순자',
      type: '외박',
      departureDate: '2024-01-14',
      departureTime: '15:00',
      returnDate: '2024-01-15',
      returnTime: '11:00',
      expectedReturnDate: '2024-01-15',
      expectedReturnTime: '10:00',
      destination: '친지',
      purpose: '가족 행사',
      guardianName: '박민수',
      guardianRelation: '자녀',
      guardianPhone: '010-3456-7890',
      notes: '약 지참',
      status: '복귀완료',
      createdAt: '2024-01-14 14:30',
      createdBy: '이요양사',
    },
  ]);

  // 신규 작성 폼 상태
  const [formData, setFormData] = useState({
    type: '외출' as const,
    departureDate: new Date().toISOString().split('T')[0],
    departureTime: '',
    expectedReturnDate: '',
    expectedReturnTime: '',
    destination: '',
    purpose: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    hospital: '',
    notes: '',
  });

  // 복귀 처리 폼 상태
  const [returnFormData, setReturnFormData] = useState({
    returnDate: new Date().toISOString().split('T')[0],
    returnTime: new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  });

  /* -------------------------------------------------
   *  Filtering
   * ------------------------------------------------- */
  const filteredResidents = residents.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === '전체' || r.status === filterStatus;
    const matchGrade = filterGrade === '전체' || r.grade === filterGrade;
    const matchRoom = filterRoom === '전체' || r.room.includes(filterRoom);
    return matchSearch && matchStatus && matchGrade && matchRoom;
  });

  const filteredRecords = selectedResident
    ? outingRecords.filter((record) => {
        const matchResident = record.residentId === selectedResident.id;
        const matchStatus =
          filterRecordStatus === '전체' || record.status === filterRecordStatus;
        return matchResident && matchStatus;
      })
    : [];

  /* -------------------------------------------------
   *  Helper functions (colors)
   * ------------------------------------------------- */
  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-blue-100 text-blue-700';
      case '퇴소':
        return 'bg-gray-100 text-gray-700';
      case '대기':
        return 'bg-amber-100 text-amber-700';
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

  const getRecordStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'bg-blue-100 text-blue-700';
      case '복귀완료':
        return 'bg-green-100 text-green-700';
      case '복귀미처리':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '외출':
        return 'bg-blue-100 text-blue-700';
      case '외박':
        return 'bg-purple-100 text-purple-700';
      case '병원외래':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  /* -------------------------------------------------
   *  Handlers
   * ------------------------------------------------- */
  const handleAddRecord = () => {
    if (!selectedResident) {
      alert('수급자를 먼저 선택해주세요.');
      return;
    }

    // ---- Validation -------------------------------------------------
    if (!formData.departureDate || !formData.departureTime) {
      alert('출발일자와 출발시간은 필수입니다.');
      return;
    }
    if (!formData.destination || !formData.purpose) {
      alert('행선지와 목적은 필수입니다.');
      return;
    }
    if (!formData.guardianName || !formData.guardianPhone) {
      alert('보호자명과 전화번호는 필수입니다.');
      return;
    }
    if (formData.type === '병원외래' && !formData.hospital) {
      alert('병원외래의 경우 병원명은 필수입니다.');
      return;
    }
    if (formData.type === '외박' && (!formData.expectedReturnDate || !formData.expectedReturnTime)) {
      alert('외박의 경우 복귀예정일자와 시간은 필수입니다.');
      return;
    }

    // Phone format check
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(formData.guardianPhone)) {
      alert('전화번호는 숫자와 하이픈(-)만 입력 가능합니다.');
      return;
    }

    // ---- Create record -----------------------------------------------
    const newRecord: OutingRecord = {
      id: outingRecords.length + 1,
      residentId: selectedResident.id,
      residentName: selectedResident.name,
      type: formData.type,
      departureDate: formData.departureDate,
      departureTime: formData.departureTime,
      returnDate: '',
      returnTime: '',
      expectedReturnDate: formData.expectedReturnDate,
      expectedReturnTime: formData.expectedReturnTime,
      destination: formData.destination,
      purpose: formData.purpose,
      guardianName: formData.guardianName,
      guardianRelation: formData.guardianRelation,
      guardianPhone: formData.guardianPhone,
      hospital: formData.hospital,
      notes: formData.notes,
      status: '진행중',
      createdAt: new Date().toLocaleString('ko-KR'),
      createdBy: '현재사용자',
    };

    setOutingRecords((prev) => [...prev, newRecord]);
    setShowAddModal(false);

    // Reset form
    setFormData({
      type: '외출',
      departureDate: new Date().toISOString().split('T')[0],
      departureTime: '',
      expectedReturnDate: '',
      expectedReturnTime: '',
      destination: '',
      purpose: '',
      guardianName: '',
      guardianRelation: '',
      guardianPhone: '',
      hospital: '',
      notes: '',
    });

    alert('외출/외박 기록이 등록되었습니다.');
  };

  const handleReturnProcess = () => {
    if (!selectedRecord) return;

    // ---- Validation -------------------------------------------------
    if (!returnFormData.returnDate || !returnFormData.returnTime) {
      alert('복귀일자와 복귀시간은 필수입니다.');
      return;
    }

    const departureDateTime = new Date(
      `${selectedRecord.departureDate}T${selectedRecord.departureTime}`
    );
    const returnDateTime = new Date(
      `${returnFormData.returnDate}T${returnFormData.returnTime}`
    );

    if (returnDateTime < departureDateTime) {
      alert('복귀일시는 출발일시보다 빠를 수 없습니다.');
      return;
    }

    const updatedRecords = outingRecords.map((record) =>
      record.id === selectedRecord.id
        ? {
            ...record,
            returnDate: returnFormData.returnDate,
            returnTime: returnFormData.returnTime,
            status: '복귀완료',
          }
        : record
    );

    setOutingRecords(updatedRecords);
    setShowReturnModal(false);
    setSelectedRecord(null);
    alert('복귀 처리가 완료되었습니다.');
  };

  const handleEditRecord = (record: OutingRecord) => {
    if (record.status === '복귀완료') {
      alert('복귀완료된 기록은 관리자 권한이 필요합니다.');
      return;
    }
    // TODO: 구현 예정
    alert('수정 기능은 추후 구현 예정입니다.');
  };

  const openReturnModal = (record: OutingRecord) => {
    setSelectedRecord(record);
    setReturnFormData({
      returnDate: new Date().toISOString().split('T')[0],
      returnTime: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    });
    setShowReturnModal(true);
  };

  const openDetailModal = (record: OutingRecord) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  /* -------------------------------------------------
   *  Render
   * ------------------------------------------------- */
  return (
    <div className="flex h-full bg-gray-50">
      {/* ------------------- Left Panel (Residents) ------------------- */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-500">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <i className="ri-walk-line"></i>
            외출·외박 관리
          </h2>
          <div className="flex gap-2 text-sm text-white">
            <div className="bg-white/20 rounded-lg px-3 py-1">총 {residents.length}명</div>
            <div className="bg-white/20 rounded-lg px-3 py-1">
              입소 {residents.filter((r) => r.status === '입소').length}명
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="이름 또는 방호실 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">현황선택</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="전체">전체</option>
              <option value="입소">입소</option>
              <option value="퇴소">퇴소</option>
              <option value="대기">대기</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">등급선택</label>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="전체">전체</option>
              <option value="1등급">1등급</option>
              <option value="2등급">2등급</option>
              <option value="3등급">3등급</option>
              <option value="4등급">4등급</option>
              <option value="5등급">5등급</option>
              <option value="인지지원등급">인지지원등급</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">생활실선택</label>
            <select
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="전체">전체</option>
              <option value="101">101호</option>
              <option value="102">102호</option>
              <option value="103">103호</option>
              <option value="201">201호</option>
              <option value="202">202호</option>
            </select>
          </div>
        </div>

        {/* Resident List */}
        <div className="flex-1 overflow-y-auto">
          {filteredResidents.map((resident) => (
            <div
              key={resident.id}
              onClick={() => setSelectedResident(resident)}
              className={`p-4 border-b border-gray-100 hover:bg-teal-50 cursor-pointer transition-colors ${
                selectedResident?.id === resident.id
                  ? 'bg-teal-50 border-l-4 border-l-teal-600'
                  : ''
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
      </div>

      {/* ------------------- Right Panel (Records) ------------------- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedResident ? (
          <>
            {/* Resident Info Card */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 shadow-lg">
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
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">성별</p>
                      <p className="font-semibold text-gray-900">{selectedResident.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">생년월일</p>
                      <p className="font-semibold text-gray-900">{selectedResident.birthDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">입소일</p>
                      <p className="font-semibold text-gray-900">{selectedResident.admissionDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">주요질환</p>
                      <p className="font-semibold text-gray-900 truncate">{selectedResident.mainDiseases.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-md"
                  >
                    <i className="ri-add-line mr-2"></i>
                    외출·외박 신규작성 (병원 외래 포함)
                  </button>
                  <div className="flex gap-2">
                    {(['전체', '진행중', '복귀완료', '복귀미처리'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterRecordStatus(status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                          filterRecordStatus === status
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-red-600">※ □ : 복귀 미처리</span>
                </div>
              </div>
            </div>

            {/* Records Table */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        연번
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        구분
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">
                        일자<br />
                        (출발)
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">
                        시간<br />
                        (출발)
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">
                        복귀일
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">
                        시간<br />
                        (복귀)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        행선지
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        목적
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        보호자
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        관계
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        전화번호
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        병원
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">
                        조회/관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={13} className="px-4 py-12 text-center text-gray-500">
                          <i className="ri-file-search-line text-4xl text-gray-300 mb-2 block"></i>
                          외출/외박 기록이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record, index) => (
                        <tr
                          key={record.id}
                          className={`hover:bg-gray-50 ${record.status === '복귀미처리' ? 'bg-red-50' : ''}`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-900 text-center">
                            {record.status === '복귀미처리' && (
                              <span className="text-red-600 font-bold mr-1">□</span>
                            )}
                            {index + 1}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                              {record.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap">
                            {record.departureDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap">
                            {record.departureTime}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap">
                            {record.returnDate || record.expectedReturnDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap">
                            {record.returnTime || record.expectedReturnTime}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.destination}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.purpose}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.guardianName}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.guardianRelation}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{record.guardianPhone}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.hospital || '-'}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => openDetailModal(record)}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs font-medium whitespace-nowrap"
                                title="상세보기"
                              >
                                상세
                              </button>
                              {record.status !== '복귀완료' && (
                                <>
                                  <button
                                    onClick={() => handleEditRecord(record)}
                                    className="px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors text-xs font-medium whitespace-nowrap"
                                    title="수정"
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() => openReturnModal(record)}
                                    className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-xs font-medium whitespace-nowrap"
                                    title="복귀처리"
                                  >
                                    복귀
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <i className="ri-user-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">좌측에서 수급자를 선택하세요</p>
            </div>
          </div>
        )}
      </div>

      {/* ------------------- Add Modal ------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <i className="ri-add-line"></i>
                  외출·외박 신규작성
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Selected Resident */}
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <p className="text-sm font-semibold text-teal-900 mb-2">선택된 수급자</p>
                  <p className="text-lg font-bold text-teal-700">
                    {selectedResident?.name} ({selectedResident?.room})
                  </p>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    구분 <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-3">
                    {(['외출', '외박', '병원외래'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, type })}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                          formData.type === type
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Departure */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      출발일자 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      출발시간 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Expected Return (외박/병원외래) */}
                {(formData.type === '외박' || formData.type === '병원외래') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        복귀예정일자 {formData.type === '외박' && <span className="text-red-600">*</span>}
                      </label>
                      <input
                        type="date"
                        value={formData.expectedReturnDate}
                        onChange={(e) => setFormData({ ...formData, expectedReturnDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        복귀예정시간 {formData.type === '외박' && <span className="text-red-600">*</span>}
                      </label>
                      <input
                        type="time"
                        value={formData.expectedReturnTime}
                        onChange={(e) => setFormData({ ...formData, expectedReturnTime: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Destination & Purpose */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      행선지 <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="">선택하세요</option>
                      <option value="자택">자택</option>
                      <option value="병원">병원</option>
                      <option value="친지">친지</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      목적 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      placeholder="예: 진료, 가족행사, 개인사정"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Hospital (only for 병원외래) */}
                {formData.type === '병원외래' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      병원명 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="병원명을 입력하세요"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Guardian Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-gray-900">보호자 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        보호자명 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.guardianName}
                        onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                        placeholder="보호자 이름"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        관계
                      </label>
                      <select
                        value={formData.guardianRelation}
                        onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="">선택하세요</option>
                        <option value="자녀">자녀</option>
                        <option value="배우자">배우자</option>
                        <option value="형제">형제</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        전화번호 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                        placeholder="010-1234-5678"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    비고/특이사항
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="예: 약 복용, 이동 보조, 주의사항 등"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleAddRecord}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-save-line mr-2"></i>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- Detail Modal ------------------- */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <i className="ri-file-list-line"></i>
                  외출/외박 상세정보
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">기본 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">수급자명</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.residentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">구분</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedRecord.type)}`}>
                        {selectedRecord.type}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">상태</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRecordStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 일정 정보 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">일정 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">출발일자</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.departureDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">출발시간</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.departureTime}</p>
                    </div>
                    {selectedRecord.expectedReturnDate && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">복귀예정일자</p>
                          <p className="font-semibold text-gray-900">{selectedRecord.expectedReturnDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">복귀예정시간</p>
                          <p className="font-semibold text-gray-900">{selectedRecord.expectedReturnTime}</p>
                        </div>
                      </>
                    )}
                    {selectedRecord.returnDate && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">실제복귀일자</p>
                          <p className="font-semibold text-green-700">{selectedRecord.returnDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">실제복귀시간</p>
                          <p className="font-semibold text-green-700">{selectedRecord.returnTime}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 외출 정보 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">외출 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">행선지</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">목적</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.purpose}</p>
                    </div>
                    {selectedRecord.hospital && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 mb-1">병원</p>
                        <p className="font-semibold text-gray-900">{selectedRecord.hospital}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 보호자 정보 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">보호자 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">보호자명</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">관계</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianRelation}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 mb-1">전화번호</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedRecord.notes && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-gray-900 mb-2">비고/특이사항</h4>
                    <p className="text-gray-700">{selectedRecord.notes}</p>
                  </div>
                )}

                {/* 작성 정보 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">작성 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">작성일시</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">작성자</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.createdBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- Return Modal ------------------- */}
      {showReturnModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <i className="ri-check-line"></i>
                  복귀 처리
                </h3>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Resident Info */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-2">수급자</p>
                  <p className="text-lg font-bold text-green-700">{selectedRecord.residentName}</p>
                  <p className="text-sm text-green-600 mt-1">
                    {selectedRecord.type} | 출발: {selectedRecord.departureDate}{' '}
                    {selectedRecord.departureTime}
                  </p>
                </div>

                {/* Return datetime */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      복귀일자 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={returnFormData.returnDate}
                      onChange={(e) => setReturnFormData({ ...returnFormData, returnDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      복귀시간 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="time"
                      value={returnFormData.returnTime}
                      onChange={(e) => setReturnFormData({ ...returnFormData, returnTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <i className="ri-information-line mr-1"></i>
                    복귀 처리 후에는 상태가 '복귀완료'로 변경되며, 복귀미처리 표시가 제거됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleReturnProcess}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-check-line mr-2"></i>
                  복귀 처리 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
