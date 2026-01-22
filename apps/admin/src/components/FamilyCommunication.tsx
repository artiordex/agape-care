import { useState } from 'react';

interface Communication {
  id: string;
  type: '면회신청' | '외출신청' | '외박신청' | '문의사항' | '공지확인';
  residentName: string;
  familyName: string;
  familyPhone: string;
  date: string;
  time?: string;
  endDate?: string;
  purpose?: string;
  destination?: string;
  status: '대기중' | '승인' | '거부' | '완료';
  notes: string;
  createdAt: string;
}

export default function FamilyCommunication() {
  const [communications, setCommunications] = useState<Communication[]>(() => {
    const saved = localStorage.getItem('family_communications');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        type: '면회신청',
        residentName: '김영희',
        familyName: '김민수',
        familyPhone: '010-1234-5678',
        date: '2025-01-20',
        time: '14:00',
        purpose: '어머니 생신 축하',
        status: '승인',
        notes: '케이크 반입 승인',
        createdAt: '2025-01-15 10:30'
      },
      {
        id: '2',
        type: '외출신청',
        residentName: '박철수',
        familyName: '박지영',
        familyPhone: '010-2345-6789',
        date: '2025-01-22',
        time: '10:00',
        destination: '서울대학교병원',
        purpose: '정기 검진',
        status: '대기중',
        notes: '',
        createdAt: '2025-01-16 14:20'
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('전체');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [showModal, setShowModal] = useState(false);
  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);

  const saveToStorage = (data: Communication[]) => {
    localStorage.setItem('family_communications', JSON.stringify(data));
    setCommunications(data);
  };

  const handleStatusChange = (id: string, newStatus: Communication['status']) => {
    const updated = communications.map(comm =>
      comm.id === id ? { ...comm, status: newStatus } : comm
    );
    saveToStorage(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      saveToStorage(communications.filter(comm => comm.id !== id));
    }
  };

  const handleView = (comm: Communication) => {
    setSelectedComm(comm);
    setShowModal(true);
  };

  const filteredComms = communications.filter(comm => {
    const matchesSearch =
      comm.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.familyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '전체' || comm.type === filterType;
    const matchesStatus = filterStatus === '전체' || comm.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '대기중':
        return 'bg-yellow-100 text-yellow-700';
      case '승인':
        return 'bg-green-100 text-green-700';
      case '거부':
        return 'bg-red-100 text-red-700';
      case '완료':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '면회신청':
        return 'ri-parent-line';
      case '외출신청':
        return 'ri-walk-line';
      case '외박신청':
        return 'ri-hotel-bed-line';
      case '문의사항':
        return 'ri-question-line';
      case '공지확인':
        return 'ri-notification-line';
      default:
        return 'ri-message-2-line';
    }
  };

  const stats = {
    total: communications.length,
    pending: communications.filter(c => c.status === '대기중').length,
    approved: communications.filter(c => c.status === '승인').length,
    visit: communications.filter(c => c.type === '면회신청').length
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">가족 소통 관리</h1>
        <p className="text-sm text-gray-500 mt-1">면회, 외출, 외박 신청 및 가족 문의사항 관리</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 신청</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-message-2-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">대기중</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-2xl text-yellow-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">승인 완료</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">면회 신청</p>
              <p className="text-2xl font-bold text-teal-600 mt-1">{stats.visit}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-parent-line text-2xl text-teal-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="입소자명 또는 가족명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="전체">전체 유형</option>
          <option value="면회신청">면회신청</option>
          <option value="외출신청">외출신청</option>
          <option value="외박신청">외박신청</option>
          <option value="문의사항">문의사항</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="전체">전체 상태</option>
          <option value="대기중">대기중</option>
          <option value="승인">승인</option>
          <option value="거부">거부</option>
          <option value="완료">완료</option>
        </select>
      </div>

      {/* 신청 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">유형</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">입소자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신청자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">일시</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComms.map((comm, index) => (
                <tr key={comm.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <i className={`${getTypeIcon(comm.type)} text-lg text-teal-600`}></i>
                      <span className="text-sm font-medium text-gray-900">{comm.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{comm.residentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{comm.familyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{comm.familyPhone}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{comm.date}</div>
                    {comm.time && <div className="text-xs text-gray-500">{comm.time}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(comm.status)}`}>
                      {comm.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(comm)}
                        className="text-blue-600 hover:text-blue-800"
                        title="상세보기"
                      >
                        <i className="ri-eye-line text-lg"></i>
                      </button>
                      {comm.status === '대기중' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(comm.id, '승인')}
                            className="text-green-600 hover:text-green-800"
                            title="승인"
                          >
                            <i className="ri-checkbox-circle-line text-lg"></i>
                          </button>
                          <button
                            onClick={() => handleStatusChange(comm.id, '거부')}
                            className="text-red-600 hover:text-red-800"
                            title="거부"
                          >
                            <i className="ri-close-circle-line text-lg"></i>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(comm.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세보기 모달 */}
      {showModal && selectedComm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">신청 상세 정보</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">유형</label>
                    <div className="flex items-center gap-2">
                      <i className={`${getTypeIcon(selectedComm.type)} text-lg text-teal-600`}></i>
                      <span className="text-sm font-medium">{selectedComm.type}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">상태</label>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedComm.status)}`}>
                      {selectedComm.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">입소자</label>
                    <p className="text-sm text-gray-900">{selectedComm.residentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">신청자</label>
                    <p className="text-sm text-gray-900">{selectedComm.familyName}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">연락처</label>
                  <p className="text-sm text-gray-900">{selectedComm.familyPhone}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">날짜</label>
                    <p className="text-sm text-gray-900">{selectedComm.date}</p>
                  </div>
                  {selectedComm.time && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">시간</label>
                      <p className="text-sm text-gray-900">{selectedComm.time}</p>
                    </div>
                  )}
                </div>

                {selectedComm.endDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">종료일</label>
                    <p className="text-sm text-gray-900">{selectedComm.endDate}</p>
                  </div>
                )}

                {selectedComm.destination && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">목적지</label>
                    <p className="text-sm text-gray-900">{selectedComm.destination}</p>
                  </div>
                )}

                {selectedComm.purpose && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">목적</label>
                    <p className="text-sm text-gray-900">{selectedComm.purpose}</p>
                  </div>
                )}

                {selectedComm.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">비고</label>
                    <p className="text-sm text-gray-900">{selectedComm.notes}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">신청일시</label>
                  <p className="text-sm text-gray-900">{selectedComm.createdAt}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  닫기
                </button>
                {selectedComm.status === '대기중' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedComm.id, '승인');
                        setShowModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedComm.id, '거부');
                        setShowModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      거부
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
