'use client';

import { useState } from 'react';
import OutingRecordsTable from './OutingRecordsTable';
import OutingResidentListPanel from './OutingResidentListPanel';

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
];

export default function OutingManagementPage() {
  const [residents] = useState<Resident[]>(initialResidents);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(initialResidents[0] || null);
  const [outingRecords, setOutingRecords] = useState<OutingRecord[]>(initialOutingRecords);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [filterGrade, setFilterGrade] = useState('전체');
  const [filterRoom, setFilterRoom] = useState('전체');
  const [filterRecordStatus, setFilterRecordStatus] = useState<'전체' | '진행중' | '복귀완료' | '복귀미처리'>('전체');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<OutingRecord | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    type: '외출' as '외출' | '외박' | '병원외래',
    departureDate: new Date().toISOString().split('T')[0] || '',
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

  const [returnFormData, setReturnFormData] = useState({
    returnDate: new Date().toISOString().split('T')[0] || '',
    returnTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
  });

  // Filter residents
  const filteredResidents = residents.filter(r => {
    const matchSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === '전체' || r.status === filterStatus;
    const matchGrade = filterGrade === '전체' || r.grade === filterGrade;
    const matchRoom = filterRoom === '전체' || r.room.includes(filterRoom);
    return matchSearch && matchStatus && matchGrade && matchRoom;
  });

  // Filter records
  const filteredRecords = selectedResident
    ? outingRecords.filter(record => {
        const matchResident = record.residentId === selectedResident.id;
        const matchStatus = filterRecordStatus === '전체' || record.status === filterRecordStatus;
        return matchResident && matchStatus;
      })
    : [];

  // Handlers
  const handleAddRecord = () => {
    if (!selectedResident) {
      alert('수급자를 먼저 선택해주세요.');
      return;
    }

    if (!formData.departureDate || !formData.departureTime || !formData.destination || !formData.purpose) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

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
    alert('✅ 외출/외박 기록이 등록되었습니다.');
  };

  const handleReturnProcess = () => {
    if (!selectedRecord) return;

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
    alert('복귀 처리가 완료되었습니다.');
  };

  const openDetailModal = (record: OutingRecord) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const openReturnModal = (record: OutingRecord) => {
    setSelectedRecord(record);
    setReturnFormData({
      returnDate: new Date().toISOString().split('T')[0] || '',
      returnTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
    });
    setShowReturnModal(true);
  };

  const handleEditRecord = (record: OutingRecord) => {
    if (record.status === '복귀완료') {
      alert('복귀완료된 기록은 수정할 수 없습니다.');
      return;
    }
    alert('수정 기능은 추후 구현 예정입니다.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-blue-50 text-blue-700';
      case '퇴소':
        return 'bg-gray-100 text-gray-700';
      case '대기':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1등급')) return 'bg-red-50 text-red-700';
    if (grade.includes('2등급')) return 'bg-orange-50 text-orange-700';
    if (grade.includes('3등급')) return 'bg-yellow-50 text-yellow-700';
    if (grade.includes('4등급')) return 'bg-green-50 text-green-700';
    if (grade.includes('5등급')) return 'bg-blue-50 text-blue-700';
    return 'bg-purple-50 text-purple-700';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '외출':
        return 'bg-blue-50 text-blue-700';
      case '외박':
        return 'bg-purple-50 text-purple-700';
      case '병원외래':
        return 'bg-teal-50 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRecordStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'bg-blue-50 text-blue-700';
      case '복귀완료':
        return 'bg-green-50 text-green-700';
      case '복귀미처리':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Panel */}
      <OutingResidentListPanel
        residents={filteredResidents}
        selectedResident={selectedResident}
        onSelectResident={setSelectedResident}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterGrade={filterGrade}
        onFilterGradeChange={setFilterGrade}
        filterRoom={filterRoom}
        onFilterRoomChange={setFilterRoom}
      />

      {/* Right Panel */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedResident ? (
          <>
            {/* Resident Info */}
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-gray-100 text-2xl font-bold text-gray-700">
                  {selectedResident.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h2 className="mb-2 text-lg font-bold text-gray-900">{selectedResident.name}</h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(selectedResident.status)}`}
                        >
                          {selectedResident.status}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-medium ${getGradeColor(selectedResident.grade)}`}
                        >
                          {selectedResident.grade}
                        </span>
                        <span className="rounded bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
                          {selectedResident.room}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="mb-0.5 text-xs text-gray-600">성별</p>
                      <p className="font-semibold text-gray-900">{selectedResident.gender}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-gray-600">생년월일</p>
                      <p className="font-semibold text-gray-900">{selectedResident.birthDate}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-gray-600">입소일</p>
                      <p className="font-semibold text-gray-900">{selectedResident.admissionDate}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-gray-600">주요질환</p>
                      <p className="truncate font-semibold text-gray-900">{selectedResident.mainDiseases.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-b border-gray-200 bg-white px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <i className="ri-add-line"></i>신규작성
                  </button>
                  <div className="flex gap-1">
                    {(['전체', '진행중', '복귀완료', '복귀미처리'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setFilterRecordStatus(status)}
                        className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                          filterRecordStatus === status
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-semibold text-red-600">※ □ : 복귀 미처리</span>
                </div>
              </div>
            </div>

            {/* Records Table */}
            <div className="flex-1 overflow-y-auto p-6">
              <OutingRecordsTable
                records={filteredRecords}
                onViewDetail={openDetailModal}
                onEdit={handleEditRecord}
                onReturn={openReturnModal}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <i className="ri-user-line mb-4 text-6xl text-gray-300"></i>
              <p className="text-sm text-gray-500">좌측에서 수급자를 선택하세요</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal - 간소화 버전 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">외출·외박 신규작성</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <p className="text-sm font-semibold text-blue-900">
                    {selectedResident?.name} ({selectedResident?.room})
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">구분 *</label>
                  <div className="flex gap-2">
                    {(['외출', '외박', '병원외래'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, type })}
                        className={`flex-1 rounded border px-3 py-2 text-sm font-medium transition-colors ${
                          formData.type === type
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">출발일자 *</label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={e => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">출발시간 *</label>
                    <input
                      type="time"
                      value={formData.departureTime}
                      onChange={e => setFormData({ ...formData, departureTime: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {(formData.type === '외박' || formData.type === '병원외래') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">복귀예정일자</label>
                      <input
                        type="date"
                        value={formData.expectedReturnDate}
                        onChange={e => setFormData({ ...formData, expectedReturnDate: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">복귀예정시간</label>
                      <input
                        type="time"
                        value={formData.expectedReturnTime}
                        onChange={e => setFormData({ ...formData, expectedReturnTime: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">행선지 *</label>
                    <select
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">선택하세요</option>
                      <option value="자택">자택</option>
                      <option value="병원">병원</option>
                      <option value="친지">친지</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">목적 *</label>
                    <input
                      type="text"
                      value={formData.purpose}
                      onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                      placeholder="예: 진료, 가족행사"
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {formData.type === '병원외래' && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">병원명</label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={e => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="병원명을 입력하세요"
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">보호자 정보</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">보호자명</label>
                      <input
                        type="text"
                        value={formData.guardianName}
                        onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">관계</label>
                      <select
                        value={formData.guardianRelation}
                        onChange={e => setFormData({ ...formData, guardianRelation: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">선택하세요</option>
                        <option value="자녀">자녀</option>
                        <option value="배우자">배우자</option>
                        <option value="형제">형제</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">전화번호</label>
                      <input
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                        placeholder="010-1234-5678"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">비고/특이사항</label>
                  <textarea
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="예: 약 복용, 이동 보조, 주의사항 등"
                    rows={3}
                    className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleAddRecord}
                  className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <i className="ri-save-line"></i>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - 간소화 버전 */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">외출/외박 상세정보</h3>
                <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">기본 정보</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="mb-1 text-xs text-gray-600">수급자명</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.residentName}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">구분</p>
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${getTypeColor(selectedRecord.type)}`}
                      >
                        {selectedRecord.type}
                      </span>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">상태</p>
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${getRecordStatusColor(selectedRecord.status)}`}
                      >
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">일정 정보</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="mb-1 text-xs text-gray-600">출발일자</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.departureDate}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">출발시간</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.departureTime}</p>
                    </div>
                    {selectedRecord.returnDate && (
                      <>
                        <div>
                          <p className="mb-1 text-xs text-gray-600">복귀일자</p>
                          <p className="font-semibold text-green-700">{selectedRecord.returnDate}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-xs text-gray-600">복귀시간</p>
                          <p className="font-semibold text-green-700">{selectedRecord.returnTime}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">외출 정보</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="mb-1 text-xs text-gray-600">행선지</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.destination}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">목적</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.purpose}</p>
                    </div>
                    {selectedRecord.hospital && (
                      <div className="col-span-2">
                        <p className="mb-1 text-xs text-gray-600">병원</p>
                        <p className="font-semibold text-gray-900">{selectedRecord.hospital}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">보호자 정보</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="mb-1 text-xs text-gray-600">보호자명</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianName}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-600">관계</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianRelation}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="mb-1 text-xs text-gray-600">전화번호</p>
                      <p className="font-semibold text-gray-900">{selectedRecord.guardianPhone}</p>
                    </div>
                  </div>
                </div>

                {selectedRecord.notes && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-900">비고/특이사항</h4>
                    <p className="text-sm text-gray-700">{selectedRecord.notes}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">복귀 처리</h3>
                <button onClick={() => setShowReturnModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="mb-1 text-sm font-semibold text-green-900">수급자</p>
                  <p className="text-lg font-bold text-green-700">{selectedRecord.residentName}</p>
                  <p className="mt-1 text-xs text-green-600">
                    {selectedRecord.type} • 출발: {selectedRecord.departureDate} {selectedRecord.departureTime}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">복귀일자 *</label>
                    <input
                      type="date"
                      value={returnFormData.returnDate}
                      onChange={e => setReturnFormData({ ...returnFormData, returnDate: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">복귀시간 *</label>
                    <input
                      type="time"
                      value={returnFormData.returnTime}
                      onChange={e => setReturnFormData({ ...returnFormData, returnTime: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="text-xs text-blue-700">
                    <i className="ri-information-line mr-1"></i>복귀 처리 후에는 상태가 '복귀완료'로 변경됩니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleReturnProcess}
                  className="flex items-center gap-1.5 rounded border border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  <i className="ri-check-line"></i>복귀 처리 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
