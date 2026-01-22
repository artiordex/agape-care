import { useState } from 'react';

interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  message: string;
  status: '접수' | '진행' | '완료' | '보류';
  createdAt: string;
  memo: string;
}

export default function ConsultationRequestManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [requests, setRequests] = useState<ConsultationRequest[]>([
    {
      id: '1',
      name: '김**',
      phone: '010-1234-****',
      email: 'kim***@email.com',
      preferredTime: '오전 10시-12시',
      message: '어머니 입소 상담을 받고 싶습니다.',
      status: '접수',
      createdAt: '2024-01-15 10:30',
      memo: ''
    },
    {
      id: '2',
      name: '이**',
      phone: '010-5678-****',
      email: 'lee***@email.com',
      preferredTime: '오후 2시-4시',
      message: '시설 견학 및 비용 상담 문의드립니다.',
      status: '진행',
      createdAt: '2024-01-14 14:20',
      memo: '1월 20일 방문 예정'
    },
    {
      id: '3',
      name: '박**',
      phone: '010-9012-****',
      email: 'park***@email.com',
      preferredTime: '오전 9시-11시',
      message: '프로그램 안내 부탁드립니다.',
      status: '완료',
      createdAt: '2024-01-10 09:15',
      memo: '상담 완료, 입소 대기 중'
    }
  ]);

  const statuses = ['전체', '접수', '진행', '완료', '보류'];

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.name.includes(searchQuery) || req.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === '전체' || req.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '접수': return 'bg-blue-100 text-blue-700';
      case '진행': return 'bg-yellow-100 text-yellow-700';
      case '완료': return 'bg-emerald-100 text-emerald-700';
      case '보류': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus as any } : req
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담신청 관리</h1>
          <p className="text-sm text-gray-500 mt-1">홈페이지를 통해 접수된 상담신청을 관리합니다</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2">
          <i className="ri-download-line"></i>
          엑셀 다운로드
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '전체', count: requests.length, color: 'bg-gray-100 text-gray-700', icon: 'ri-file-list-line' },
          { label: '접수', count: requests.filter(r => r.status === '접수').length, color: 'bg-blue-100 text-blue-700', icon: 'ri-inbox-line' },
          { label: '진행', count: requests.filter(r => r.status === '진행').length, color: 'bg-yellow-100 text-yellow-700', icon: 'ri-time-line' },
          { label: '완료', count: requests.filter(r => r.status === '완료').length, color: 'bg-emerald-100 text-emerald-700', icon: 'ri-checkbox-circle-line' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.count}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <i className={`${stat.icon} text-2xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="이름 또는 연락처로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedStatus === status
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 신청 목록 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신청일시</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신청자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">희망시간</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">문의내용</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRequests.map(req => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{req.createdAt}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{req.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{req.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{req.preferredTime}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{req.message}</td>
                <td className="px-6 py-4">
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${getStatusColor(req.status)}`}
                  >
                    {statuses.filter(s => s !== '전체').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedRequest(req);
                      setShowDetailModal(true);
                    }}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors cursor-pointer text-sm"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 상세보기 모달 */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">상담신청 상세</h2>
              <button onClick={() => setShowDetailModal(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-close-line text-xl text-white"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">신청자명</label>
                  <p className="text-gray-900">{selectedRequest.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">신청일시</label>
                  <p className="text-gray-900">{selectedRequest.createdAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <p className="text-gray-900">{selectedRequest.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <p className="text-gray-900">{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">희망 상담시간</label>
                  <p className="text-gray-900">{selectedRequest.preferredTime}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">문의내용</label>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedRequest.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내부 메모</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="내부 메모를 입력하세요"
                  defaultValue={selectedRequest.memo}
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button onClick={() => setShowDetailModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
                  닫기
                </button>
                <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap">
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
