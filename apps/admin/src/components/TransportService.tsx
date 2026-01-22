import { useState } from 'react';

interface Transport {
  id: string;
  date: string;
  type: '송영' | '외래' | '외출' | '기타';
  residentName: string;
  departure: string;
  destination: string;
  pickupTime: string;
  dropoffTime: string;
  vehicle: string;
  driver: string;
  fuelCost: number;
  taxiCost: number;
  otherCost: number;
  notes: string;
  attachments?: string[];
}

const TransportService = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | '송영' | '외래' | '외출' | '기타'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(null);
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 샘플 데이터
  const [transports] = useState<Transport[]>([
    {
      id: 'T001',
      date: '2024-01-15',
      type: '외래',
      residentName: '김영희',
      departure: '실버타운',
      destination: '○○병원',
      pickupTime: '09:00',
      dropoffTime: '11:30',
      vehicle: '12가3456',
      driver: '김운전',
      fuelCost: 15000,
      taxiCost: 0,
      otherCost: 3000,
      notes: '정형외과 진료'
    },
    {
      id: 'T002',
      date: '2024-01-15',
      type: '송영',
      residentName: '이철수',
      departure: '실버타운',
      destination: '△△병원',
      pickupTime: '14:00',
      dropoffTime: '16:00',
      vehicle: '12가3456',
      driver: '김운전',
      fuelCost: 20000,
      taxiCost: 0,
      otherCost: 5000,
      notes: '물리치료'
    },
    {
      id: 'T003',
      date: '2024-01-16',
      type: '외출',
      residentName: '박순자',
      departure: '실버타운',
      destination: '자택',
      pickupTime: '10:00',
      dropoffTime: '17:00',
      vehicle: '택시',
      driver: '-',
      fuelCost: 0,
      taxiCost: 45000,
      otherCost: 0,
      notes: '가족 방문'
    }
  ]);

  // 필터링된 교통 목록
  const filteredTransports = transports.filter(transport => {
    const matchesSearch = transport.residentName.includes(searchTerm) || 
                         transport.destination.includes(searchTerm);
    const matchesType = typeFilter === 'all' || transport.type === typeFilter;
    const matchesDate = (!dateFrom || transport.date >= dateFrom) && 
                       (!dateTo || transport.date <= dateTo);
    return matchesSearch && matchesType && matchesDate;
  });

  // 월별 집계
  const getMonthlyStats = () => {
    const totalCount = filteredTransports.length;
    const totalCost = filteredTransports.reduce((sum, t) => 
      sum + t.fuelCost + t.taxiCost + t.otherCost, 0
    );
    const fuelCost = filteredTransports.reduce((sum, t) => sum + t.fuelCost, 0);
    const taxiCost = filteredTransports.reduce((sum, t) => sum + t.taxiCost, 0);
    
    return { totalCount, totalCost, fuelCost, taxiCost };
  };

  const stats = getMonthlyStats();

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('엑셀 다운로드 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <i className="ri-bus-line text-emerald-600"></i>
              교통관리
            </h1>
            <p className="text-sm text-gray-600 mt-1">송영, 외래, 외출 등 이동 서비스 기록을 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-printer-line"></i>
              출력
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-file-excel-line"></i>
              엑셀
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 이동 건수</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCount}건</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-bus-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 비용</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {(stats.totalCost / 10000).toFixed(0)}만원
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">유류비</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {(stats.fuelCost / 10000).toFixed(0)}만원
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-gas-station-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">택시비</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {(stats.taxiCost / 10000).toFixed(0)}만원
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-taxi-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 교통 목록 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="수급자명, 목적지 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="시작일"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="종료일"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">전체 유형</option>
              <option value="송영">송영</option>
              <option value="외래">외래</option>
              <option value="외출">외출</option>
              <option value="기타">기타</option>
            </select>
            <button
              onClick={() => {
                setSelectedTransport(null);
                setIsEditMode(false);
                setShowTransportModal(true);
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              기록 추가
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">날짜</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">유형</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">수급자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">출발지</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">목적지</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">시간</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">차량/운전자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">비용</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransports.map((transport) => {
                  const totalCost = transport.fuelCost + transport.taxiCost + transport.otherCost;
                  
                  return (
                    <tr key={transport.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{transport.date}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transport.type === '송영' ? 'bg-blue-100 text-blue-700' :
                          transport.type === '외래' ? 'bg-green-100 text-green-700' :
                          transport.type === '외출' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {transport.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{transport.residentName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{transport.departure}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{transport.destination}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {transport.pickupTime} ~ {transport.dropoffTime}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div>{transport.vehicle}</div>
                        <div className="text-xs text-gray-500">{transport.driver}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                        {totalCost.toLocaleString()}원
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedTransport(transport);
                            setIsEditMode(true);
                            setShowTransportModal(true);
                          }}
                          className="text-emerald-600 hover:text-emerald-700 mr-3"
                        >
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('정말 삭제하시겠습니까?')) {
                              alert('삭제되었습니다.');
                            }
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 교통 기록 추가/수정 모달 */}
      {showTransportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTransportModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                교통 기록 {isEditMode ? '수정' : '추가'}
              </h2>
              <button onClick={() => setShowTransportModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">날짜 *</label>
                  <input
                    type="date"
                    defaultValue={selectedTransport?.date}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">유형 *</label>
                  <select
                    defaultValue={selectedTransport?.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="송영">송영</option>
                    <option value="외래">외래</option>
                    <option value="외출">외출</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">수급자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedTransport?.residentName}
                    placeholder="수급자 이름"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">출발지 *</label>
                  <input
                    type="text"
                    defaultValue={selectedTransport?.departure}
                    placeholder="예: 실버타운"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">목적지 *</label>
                  <input
                    type="text"
                    defaultValue={selectedTransport?.destination}
                    placeholder="예: ○○병원"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">출발시간 *</label>
                  <input
                    type="time"
                    defaultValue={selectedTransport?.pickupTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">도착시간 *</label>
                  <input
                    type="time"
                    defaultValue={selectedTransport?.dropoffTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">차량 *</label>
                  <input
                    type="text"
                    defaultValue={selectedTransport?.vehicle}
                    placeholder="차량번호 또는 택시"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">운전자</label>
                  <input
                    type="text"
                    defaultValue={selectedTransport?.driver}
                    placeholder="운전자 이름"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">유류비 (원)</label>
                  <input
                    type="number"
                    defaultValue={selectedTransport?.fuelCost}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">택시비 (원)</label>
                  <input
                    type="number"
                    defaultValue={selectedTransport?.taxiCost}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">기타비용 (원)</label>
                  <input
                    type="number"
                    defaultValue={selectedTransport?.otherCost}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                  <textarea
                    defaultValue={selectedTransport?.notes}
                    rows={3}
                    placeholder="특이사항을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">첨부파일</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">영수증 등을 첨부할 수 있습니다</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowTransportModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowTransportModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <i className="ri-save-line mr-1"></i>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportService;
