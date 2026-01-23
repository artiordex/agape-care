import React, { useState } from 'react';

interface CareRecord {
  id: string;
  date: string;
  beneficiaryName: string;
  room: string;
  type: string;
  status: string;
  author: string;
  summary: string;
}

const CareHistory: React.FC = () => {
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [recordType, setRecordType] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedRecord, setSelectedRecord] = useState<CareRecord | null>(null);

  // 임시 기록 데이터
  const records: CareRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      beneficiaryName: '김영희',
      room: '101호',
      type: '간호기록',
      status: '마감',
      author: '박간호사',
      summary: '혈압 정상, 특이사항 없음',
    },
    {
      id: '2',
      date: '2024-01-15',
      beneficiaryName: '이철수',
      room: '102호',
      type: '투약기록',
      status: '작성중',
      author: '김요양사',
      summary: '아침 투약 완료',
    },
    {
      id: '3',
      date: '2024-01-14',
      beneficiaryName: '박순자',
      room: '103호',
      type: '구강점검',
      status: '마감',
      author: '이요양사',
      summary: '구강상태 양호',
    },
    {
      id: '4',
      date: '2024-01-14',
      beneficiaryName: '최민수',
      room: '201호',
      type: '응급상황',
      status: '검토필요',
      author: '박간호사',
      summary: '낙상 발생, 119 연락',
    },
    {
      id: '5',
      date: '2024-01-13',
      beneficiaryName: '정미경',
      room: '202호',
      type: '욕창간호',
      status: '마감',
      author: '김간호사',
      summary: '욕창 부위 드레싱 교체',
    },
  ];

  const filteredRecords = records.filter(record => {
    const matchType = recordType === '전체' || record.type === recordType;
    const matchStatus = statusFilter === '전체' || record.status === statusFilter;
    const matchSearch = record.beneficiaryName.includes(searchQuery) || record.room.includes(searchQuery);
    return matchType && matchStatus && matchSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '마감':
        return 'bg-emerald-100 text-emerald-700';
      case '작성중':
        return 'bg-yellow-100 text-yellow-700';
      case '검토필요':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '간호기록':
        return 'bg-blue-100 text-blue-700';
      case '투약기록':
        return 'bg-purple-100 text-purple-700';
      case '구강점검':
        return 'bg-teal-100 text-teal-700';
      case '응급상황':
        return 'bg-red-100 text-red-700';
      case '욕창간호':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`${format.toUpperCase()} 다운로드 준비 중입니다.`);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">케어 기록 조회</h2>

        {/* 필터 바 */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 (시작)</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 (종료)</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기록 유형</label>
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="간호기록">간호기록</option>
              <option value="투약기록">투약기록</option>
              <option value="구강점검">구강점검</option>
              <option value="응급상황">응급상황</option>
              <option value="배설기록">배설기록</option>
              <option value="욕창간호">욕창간호</option>
              <option value="진료기록">진료기록</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="전체">전체</option>
              <option value="작성중">작성중</option>
              <option value="마감">마감</option>
              <option value="검토필요">검토필요</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">수급자 검색</label>
            <input
              type="text"
              placeholder="이름 또는 방호실"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('card')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'card'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="ri-layout-grid-line mr-2"></i>
              카드형
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="ri-list-check mr-2"></i>
              테이블형
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('pdf')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <i className="ri-file-pdf-line mr-2"></i>
              PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <i className="ri-file-excel-line mr-2"></i>
              엑셀
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <i className="ri-file-text-line mr-2"></i>
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* 카드형 뷰 */}
        {viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{record.beneficiaryName}</h3>
                    <p className="text-sm text-gray-600">{record.room}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(record.type)}`}>
                      {record.type}
                    </span>
                    <span className="text-xs text-gray-500">{record.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{record.summary}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">작성자: {record.author}</span>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      상세보기 →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 테이블형 뷰 */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    수급자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    방호실
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    요약
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.beneficiaryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(record.type)}`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {record.summary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 빈 데이터 */}
        {filteredRecords.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <i className="ri-file-search-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">조회된 기록이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 상세보기 모달 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">기록 상세</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">수급자</label>
                  <p className="text-gray-900">{selectedRecord.beneficiaryName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">방호실</label>
                  <p className="text-gray-900">{selectedRecord.room}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                  <p className="text-gray-900">{selectedRecord.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">유형</label>
                  <span className={`inline-block text-xs px-2 py-1 rounded-full ${getTypeColor(selectedRecord.type)}`}>
                    {selectedRecord.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                  <span className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusColor(selectedRecord.status)}`}>
                    {selectedRecord.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
                  <p className="text-gray-900">{selectedRecord.author}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요약</label>
                <p className="text-gray-900">{selectedRecord.summary}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상세 내용</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">상세 기록 내용이 여기에 표시됩니다.</p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                닫기
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                인쇄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareHistory;
