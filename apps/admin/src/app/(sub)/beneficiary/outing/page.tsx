// app/beneficiary/OutingManagement.tsx
'use client';

import { useState } from 'react';

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

// 하드코딩 데이터
const initialResidents: Resident[] = [
  {
    id: 1,
    name: '김영희',
    gender: '여',
    grade: '2등급',
    admissionDate: '2023-03-15',
    room: '101호',
    birthDate: '1945-03-10',
    mainDiseases: ['고혈압', '당뇨'],
    status: '입소',
  },
  {
    id: 2,
    name: '이철수',
    gender: '남',
    grade: '3등급',
    admissionDate: '2023-05-20',
    room: '102호',
    birthDate: '1942-07-22',
    mainDiseases: ['치매', '고혈압'],
    status: '입소',
  },
  {
    id: 3,
    name: '박순자',
    gender: '여',
    grade: '1등급',
    admissionDate: '2024-01-10',
    room: '103호',
    birthDate: '1940-11-05',
    mainDiseases: ['뇌졸중', '치매'],
    status: '입소',
  },
  {
    id: 4,
    name: '최민수',
    gender: '남',
    grade: '4등급',
    admissionDate: '2023-08-15',
    room: '201호',
    birthDate: '1948-05-18',
    mainDiseases: ['파킨슨병'],
    status: '입소',
  },
  {
    id: 5,
    name: '정은희',
    gender: '여',
    grade: '2등급',
    admissionDate: '2023-10-01',
    room: '202호',
    birthDate: '1944-09-30',
    mainDiseases: ['고혈압', '골다공증'],
    status: '입소',
  },
];

const initialOutingRecords: OutingRecord[] = [
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
];

export default function OutingManagement() {
  /* -------------------------------------------------
   *  State
   * ------------------------------------------------- */
  const [residents] = useState<Resident[]>(initialResidents);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(initialResidents[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterGrade, setFilterGrade] = useState('전체');
  const [filterRoom, setFilterRoom] = useState('전체');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<OutingRecord | null>(null);
  const [filterRecordStatus, setFilterRecordStatus] = useState<'전체' | '진행중' | '복귀완료' | '복귀미처리'>('전체');

  // 외출/외박 기록
  const [outingRecords, setOutingRecords] = useState<OutingRecord[]>(initialOutingRecords);

  // 신규 작성 폼 상태
  const [formData, setFormData] = useState({
    type: '외출' as '외출' | '외박' | '병원외래',
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
  const filteredResidents = residents.filter(r => {
    const matchSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === '전체' || r.status === filterStatus;
    const matchGrade = filterGrade === '전체' || r.grade === filterGrade;
    const matchRoom = filterRoom === '전체' || r.room.includes(filterRoom);
    return matchSearch && matchStatus && matchGrade && matchRoom;
  });

  const filteredRecords = selectedResident
    ? outingRecords.filter(record => {
        const matchResident = record.residentId === selectedResident.id;
        const matchStatus = filterRecordStatus === '전체' || record.status === filterRecordStatus;
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
  const handleAddRecord = async () => {
    if (!selectedResident) {
      alert('수급자를 먼저 선택해주세요.');
      return;
    }

    // Validation
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

    try {
      // TODO: 백엔드 API 연결
      // const response = await fetch('/api/outings', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     residentId: selectedResident.id,
      //   }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('등록 실패');
      // }

      // 임시: localStorage에 저장 (개발용)
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

      setOutingRecords(prev => [...prev, newRecord]);
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

      alert('✅ 외출/외박 기록이 등록되었습니다.');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('❌ 등록 중 오류가 발생했습니다.');
    }
  };

  const handleReturnProcess = async () => {
    if (!selectedRecord) return;

    // Validation
    if (!returnFormData.returnDate || !returnFormData.returnTime) {
      alert('복귀일자와 복귀시간은 필수입니다.');
      return;
    }

    const departureDateTime = new Date(`${selectedRecord.departureDate}T${selectedRecord.departureTime}`);
    const returnDateTime = new Date(`${returnFormData.returnDate}T${returnFormData.returnTime}`);

    if (returnDateTime < departureDateTime) {
      alert('복귀일시는 출발일시보다 빠를 수 없습니다.');
      return;
    }

    try {
      // TODO: 백엔드 API 연결
      // const response = await fetch(`/api/outings/${selectedRecord.id}/return`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(returnFormData),
      // });
      //
      // if (!response.ok) {
      //   throw new Error('복귀 처리 실패');
      // }

      const updatedRecords = outingRecords.map(record =>
        record.id === selectedRecord.id
          ? {
              ...record,
              returnDate: returnFormData.returnDate,
              returnTime: returnFormData.returnTime,
              status: '복귀완료' as const,
            }
          : record,
      );

      setOutingRecords(updatedRecords);
      setShowReturnModal(false);
      setSelectedRecord(null);
      alert('✅ 복귀 처리가 완료되었습니다.');
    } catch (error) {
      console.error('복귀 처리 실패:', error);
      alert('❌ 복귀 처리 중 오류가 발생했습니다.');
    }
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
      <div className="flex w-96 flex-col border-r border-gray-200 bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
            <i className="ri-walk-line"></i>
            외출·외박 관리
          </h2>
          <div className="flex gap-2 text-sm text-white">
            <div className="rounded-lg bg-white/20 px-3 py-1">총 {residents.length}명</div>
            <div className="rounded-lg bg-white/20 px-3 py-1">
              입소 {residents.filter(r => r.status === '입소').length}명
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3 border-b border-gray-200 p-4">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="이름 또는 방호실 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">현황선택</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
            >
              <option value="전체">전체</option>
              <option value="입소">입소</option>
              <option value="퇴소">퇴소</option>
              <option value="대기">대기</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">등급선택</label>
            <select
              value={filterGrade}
              onChange={e => setFilterGrade(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
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
            <label className="mb-1 block text-xs font-medium text-gray-700">생활실선택</label>
            <select
              value={filterRoom}
              onChange={e => setFilterRoom(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-teal-500"
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
          {filteredResidents.map(resident => (
            <div
              key={resident.id}
              onClick={() => setSelectedResident(resident)}
              className={`cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-teal-50 ${
                selectedResident?.id === resident.id ? 'border-l-4 border-l-teal-600 bg-teal-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-lg font-bold text-white">
                  {resident.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-bold text-gray-900">{resident.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(resident.status)}`}>
                      {resident.status}
                    </span>
                  </div>
                  <div className="mb-1 flex items-center gap-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <i className="ri-home-4-line"></i>
                      {resident.room}
                    </span>
                    <span>|</span>
                    <span>{resident.gender}</span>
                    <span>|</span>
                    <span className={`rounded-full px-2 py-0.5 font-medium ${getGradeColor(resident.grade)}`}>
                      {resident.grade}
                    </span>
                  </div>
                  <p className="truncate text-xs text-gray-500">{resident.birthDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------- Right Panel (Records) ------------------- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedResident ? (
          <>
            {/* Resident Info Card */}
            <div className="border-b border-gray-200 bg-white p-6">
              <div className="flex items-start gap-6">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 text-3xl font-bold text-white shadow-lg">
                  {selectedResident.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">{selectedResident.name}</h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedResident.status)}`}
                        >
                          {selectedResident.status}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${getGradeColor(selectedResident.grade)}`}
                        >
                          {selectedResident.grade}
                        </span>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                          {selectedResident.room}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="mb-1 text-xs text-gray-600">성별</p>
                      <p className="font-semibold text-gray-900">{selectedResident.gender}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">생년월일</p>
                      <p className="font-semibold text-gray-900">{selectedResident.birthDate}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">입소일</p>
                      <p className="font-semibold text-gray-900">{selectedResident.admissionDate}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">주요질환</p>
                      <p className="truncate font-semibold text-gray-900">{selectedResident.mainDiseases.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-b border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:from-teal-600 hover:to-cyan-600"
                  >
                    <i className="ri-add-line mr-2"></i>
                    외출·외박 신규작성 (병원 외래 포함)
                  </button>
                  <div className="flex gap-2">
                    {(['전체', '진행중', '복귀완료', '복귀미처리'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setFilterRecordStatus(status)}
                        className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
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
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        연번
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        구분
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold text-gray-700">
                        일자
                        <br />
                        (출발)
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold text-gray-700">
                        시간
                        <br />
                        (출발)
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold text-gray-700">
                        복귀일
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold text-gray-700">
                        시간
                        <br />
                        (복귀)
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        행선지
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        목적
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        보호자
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        관계
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        전화번호
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        병원
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold text-gray-700">
                        조회/관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={13} className="px-4 py-12 text-center text-gray-500">
                          <i className="ri-file-search-line mb-2 block text-4xl text-gray-300"></i>
                          외출/외박 기록이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record, index) => (
                        <tr
                          key={record.id}
                          className={`hover:bg-gray-50 ${record.status === '복귀미처리' ? 'bg-red-50' : ''}`}
                        >
                          <td className="px-4 py-3 text-center text-sm text-gray-900">
                            {record.status === '복귀미처리' && <span className="mr-1 font-bold text-red-600">□</span>}
                            {index + 1}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(record.type)}`}>
                              {record.type}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                            {record.departureDate}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                            {record.departureTime}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                            {record.returnDate || record.expectedReturnDate}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-900">
                            {record.returnTime || record.expectedReturnTime}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.destination}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.purpose}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.guardianName}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.guardianRelation}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{record.guardianPhone}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.hospital || '-'}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => openDetailModal(record)}
                                className="whitespace-nowrap rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200"
                                title="상세보기"
                              >
                                상세
                              </button>
                              {record.status !== '복귀완료' && (
                                <>
                                  <button
                                    onClick={() => handleEditRecord(record)}
                                    className="whitespace-nowrap rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-200"
                                    title="수정"
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() => openReturnModal(record)}
                                    className="whitespace-nowrap rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700 transition-colors hover:bg-green-200"
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
          <div className="flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <i className="ri-user-line mb-4 text-6xl text-gray-300"></i>
              <p className="text-gray-500">좌측에서 수급자를 선택하세요</p>
            </div>
          </div>
        )}
      </div>

      {/* ------------------- Add Modal ------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                  <i className="ri-add-line"></i>
                  외출·외박 신규작성
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer rounded-lg p-2 text-white transition-colors hover:bg-white/20"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Selected Resident */}
                <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-teal-900">선택된 수급자</p>
                  <p className="text-lg font-bold text-teal-700">
                    {selectedResident?.name} ({selectedResident?.room})
                  </p>
                </div>

                {/* Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    구분 <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-3">
                    {(['외출', '외박', '병원외래'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, type })}
                        className={`flex-1 cursor-pointer rounded-lg px-4 py-3 font-medium transition-all ${
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
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      출발일자 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={e => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      출발시간 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.departureTime}
                      onChange={e => setFormData({ ...formData, departureTime: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Expected Return (외박/병원외래) */}
                {(formData.type === '외박' || formData.type === '병원외래') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        복귀예정일자 {formData.type === '외박' && <span className="text-red-600">*</span>}
                      </label>
                      <input
                        type="date"
                        value={formData.expectedReturnDate}
                        onChange={e => setFormData({ ...formData, expectedReturnDate: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        복귀예정시간 {formData.type === '외박' && <span className="text-red-600">*</span>}
                      </label>
                      <input
                        type="time"
                        value={formData.expectedReturnTime}
                        onChange={e => setFormData({ ...formData, expectedReturnTime: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                )}

                {/* Destination & Purpose */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      행선지 <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">선택하세요</option>
                      <option value="자택">자택</option>
                      <option value="병원">병원</option>
                      <option value="친지">친지</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      목적 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.purpose}
                      onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                      placeholder="예: 진료, 가족행사, 개인사정"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Hospital (only for 병원외래) */}
                {formData.type === '병원외래' && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      병원명 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={e => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="병원명을 입력하세요"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                )}

                {/* Guardian Info */}
                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                  <h4 className="font-semibold text-gray-900">보호자 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        보호자명 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.guardianName}
                        onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                        placeholder="보호자 이름"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">관계</label>
                      <select
                        value={formData.guardianRelation}
                        onChange={e => setFormData({ ...formData, guardianRelation: e.target.value })}
                        className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">선택하세요</option>
                        <option value="자녀">자녀</option>
                        <option value="배우자">배우자</option>
                        <option value="형제">형제</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        전화번호 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                        placeholder="010-1234-5678"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">비고/특이사항</label>
                  <textarea
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="예: 약 복용, 이동 보조, 주의사항 등"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-gray-200 px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={handleAddRecord}
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2.5 font-medium text-white transition-all hover:from-teal-600 hover:to-cyan-600"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                  <i className="ri-file-list-line"></i>
                  외출/외박 상세정보
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="cursor-pointer rounded-lg p-2 text-white transition-colors hover:bg-white/20"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-4 font-semibold text-gray-900">기본 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-sm text-gray-600">수급자명</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.residentName}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-600">구분</p>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getTypeColor(selectedRecord.type)}`}
                      >
                        {selectedRecord.type}
                      </span>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-600">상태</p>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getRecordStatusColor(selectedRecord.status)}`}
                      >
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 일정 정보 */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-4 font-semibold text-gray-900">일정 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-sm text-gray-600">출발일자</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.departureDate}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-600">출발시간</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.departureTime}</p>
                    </div>
                    {selectedRecord.expectedReturnDate && (
                      <>
                        <div>
                          <p className="mb-1 text-sm text-gray-600">복귀예정일자</p>
                          <p className="font-semibold text-gray-900">{selectedRecord.expectedReturnDate}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-sm text-gray-600">복귀예정시간</p>
                          <p className="font-semibold text-gray-900">{selectedRecord.expectedReturnTime}</p>
                        </div>
                      </>
                    )}
                    {selectedRecord.returnDate && (
                      <>
                        <div>
                          <p className="mb-1 text-sm text-gray-600">실제복귀일자</p>
                          <p className="font-semibold text-green-700">{selectedRecord.returnDate}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-sm text-gray-600">실제복귀시간</p>
                          <p className="font-semibold text-green-700">{selectedRecord.returnTime}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 외출 정보 */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-4 font-semibold text-gray-900">외출 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-sm text-gray-600">행선지</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.destination}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-600">목적</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.purpose}</p>
                    </div>
                    {selectedRecord.hospital && (
                      <div className="col-span-2">
                        <p className="mb-1 text-sm text-gray-600">병원</p>
                        <p className="font-semibold text-gray-900">{selectedRecord.hospital}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 보호자 정보 */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-4 font-semibold text-gray-900">보호자 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-sm text-gray-600">보호자명</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianName}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-600">관계</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianRelation}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="mb-1 text-sm text-gray-600">전화번호</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedRecord.notes && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <h4 className="mb-2 font-semibold text-gray-900">비고/특이사항</h4>
                    <p className="text-gray-700">{selectedRecord.notes}</p>
                  </div>
                )}

                {/* 작성 정보 */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-4 font-semibold text-gray-900">작성 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-sm text-gray-600">작성일시</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.createdAt}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-600">작성자</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.createdBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-gray-200 px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                  <i className="ri-check-line"></i>
                  복귀 처리
                </h3>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="cursor-pointer rounded-lg p-2 text-white transition-colors hover:bg-white/20"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Resident Info */}
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-green-900">수급자</p>
                  <p className="text-lg font-bold text-green-700">{selectedRecord.residentName}</p>
                  <p className="mt-1 text-sm text-green-600">
                    {selectedRecord.type} | 출발: {selectedRecord.departureDate} {selectedRecord.departureTime}
                  </p>
                </div>

                {/* Return datetime */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      복귀일자 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={returnFormData.returnDate}
                      onChange={e => setReturnFormData({ ...returnFormData, returnDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      복귀시간 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="time"
                      value={returnFormData.returnTime}
                      onChange={e => setReturnFormData({ ...returnFormData, returnTime: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-700">
                    <i className="ri-information-line mr-1"></i>
                    복귀 처리 후에는 상태가 '복귀완료'로 변경되며, 복귀미처리 표시가 제거됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-gray-200 px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={handleReturnProcess}
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2.5 font-medium text-white transition-all hover:from-green-600 hover:to-emerald-600"
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
