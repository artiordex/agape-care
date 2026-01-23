import { useState } from 'react';

interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  purpose: '송영' | '업무' | '기타';
  ownership: '시설' | '리스' | '개인';
  driver: string;
  insuranceCompany: string;
  insuranceExpiry: string;
  inspectionDate: string;
  status: 'active' | 'inactive';
  notes: string;
}

interface RunLog {
  id: string;
  vehicleId: string;
  date: string;
  startTime: string;
  endTime: string;
  departure: string;
  destination: string;
  purpose: string;
  passengers: string;
  distance: number;
  fuelCost: number;
  tollCost: number;
  parkingCost: number;
  receipt?: string;
  notes: string;
}

const VehicleManagement = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'runlogs'>('vehicles');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showRunLogModal, setShowRunLogModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 샘플 데이터
  const [vehicles] = useState<Vehicle[]>([
    {
      id: 'V001',
      plateNumber: '12가3456',
      model: '현대 스타렉스',
      purpose: '송영',
      ownership: '시설',
      driver: '김운전',
      insuranceCompany: 'KB손해보험',
      insuranceExpiry: '2024-12-31',
      inspectionDate: '2024-06-30',
      status: 'active',
      notes: '9인승 송영차량'
    },
    {
      id: 'V002',
      plateNumber: '34나5678',
      model: '기아 카니발',
      purpose: '업무',
      ownership: '리스',
      driver: '이기사',
      insuranceCompany: '삼성화재',
      insuranceExpiry: '2024-08-15',
      inspectionDate: '2024-05-20',
      status: 'active',
      notes: '11인승 업무차량'
    },
    {
      id: 'V003',
      plateNumber: '56다7890',
      model: '현대 그랜저',
      purpose: '기타',
      ownership: '시설',
      driver: '박운전',
      insuranceCompany: '현대해상',
      insuranceExpiry: '2025-01-20',
      inspectionDate: '2024-07-10',
      status: 'inactive',
      notes: '정비 중'
    }
  ]);

  const [runLogs] = useState<RunLog[]>([
    {
      id: 'R001',
      vehicleId: 'V001',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '10:30',
      departure: '실버타운',
      destination: '○○병원',
      purpose: '외래진료 송영',
      passengers: '김영희, 이철수',
      distance: 25,
      fuelCost: 30000,
      tollCost: 5000,
      parkingCost: 3000,
      notes: '정상 운행'
    },
    {
      id: 'R002',
      vehicleId: 'V001',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '15:00',
      departure: '실버타운',
      destination: '마트',
      purpose: '물품 구매',
      passengers: '직원 2명',
      distance: 10,
      fuelCost: 15000,
      tollCost: 0,
      parkingCost: 2000,
      notes: ''
    }
  ]);

  // 필터링된 차량 목록
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plateNumber.includes(searchTerm) || 
                         vehicle.model.includes(searchTerm) ||
                         vehicle.driver.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 보험/검사 만료 임박 확인 (30일 이내)
  const isExpiringSoon = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  // 월별 집계
  const getMonthlyStats = () => {
    const stats = vehicles.map(vehicle => {
      const vehicleLogs = runLogs.filter(log => log.vehicleId === vehicle.id);
      const totalRuns = vehicleLogs.length;
      const totalCost = vehicleLogs.reduce((sum, log) => 
        sum + log.fuelCost + log.tollCost + log.parkingCost, 0
      );
      const totalDistance = vehicleLogs.reduce((sum, log) => sum + log.distance, 0);
      
      return {
        vehicle: vehicle.plateNumber,
        runs: totalRuns,
        distance: totalDistance,
        cost: totalCost
      };
    });
    
    return stats;
  };

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
              <i className="ri-car-line text-emerald-600"></i>
              차량관리
            </h1>
            <p className="text-sm text-gray-600 mt-1">차량 정보 및 운행일지를 관리합니다</p>
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

        {/* 경고 배지 */}
        <div className="flex gap-3">
          {vehicles.filter(v => isExpiringSoon(v.insuranceExpiry)).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <i className="ri-alarm-warning-line text-red-600"></i>
              <span className="text-sm text-red-700">
                보험 만료 임박: {vehicles.filter(v => isExpiringSoon(v.insuranceExpiry)).length}대
              </span>
            </div>
          )}
          {vehicles.filter(v => isExpiringSoon(v.inspectionDate)).length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <i className="ri-tools-line text-orange-600"></i>
              <span className="text-sm text-orange-700">
                검사 예정: {vehicles.filter(v => isExpiringSoon(v.inspectionDate)).length}대
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'vehicles'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-car-line mr-2"></i>
              차량 목록
            </button>
            <button
              onClick={() => setActiveTab('runlogs')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'runlogs'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-file-list-3-line mr-2"></i>
              운행일지
            </button>
          </div>
        </div>

        {/* 차량 목록 탭 */}
        {activeTab === 'vehicles' && (
          <div className="p-6">
            {/* 필터 바 */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="차량번호, 차종, 운전자 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">전체 상태</option>
                <option value="active">운행중</option>
                <option value="inactive">정비중</option>
              </select>
              <button
                onClick={() => {
                  setSelectedVehicle(null);
                  setIsEditMode(false);
                  setShowVehicleModal(true);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-add-line"></i>
                차량 등록
              </button>
            </div>

            {/* 차량 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">차량번호</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">차종</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">용도</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">소유형태</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">운전자</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">보험만료</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">검사예정</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{vehicle.plateNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{vehicle.model}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          vehicle.purpose === '송영' ? 'bg-blue-100 text-blue-700' :
                          vehicle.purpose === '업무' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {vehicle.purpose}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{vehicle.ownership}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{vehicle.driver}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={isExpiringSoon(vehicle.insuranceExpiry) ? 'text-red-600 font-medium' : 'text-gray-600'}>
                            {vehicle.insuranceExpiry}
                          </span>
                          {isExpiringSoon(vehicle.insuranceExpiry) && (
                            <i className="ri-alarm-warning-line text-red-600"></i>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={isExpiringSoon(vehicle.inspectionDate) ? 'text-orange-600 font-medium' : 'text-gray-600'}>
                            {vehicle.inspectionDate}
                          </span>
                          {isExpiringSoon(vehicle.inspectionDate) && (
                            <i className="ri-tools-line text-orange-600"></i>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          vehicle.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {vehicle.status === 'active' ? '운행중' : '정비중'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setIsEditMode(true);
                            setShowVehicleModal(true);
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* 월별 집계 */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">이번 달 운행 현황</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getMonthlyStats().map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{stat.vehicle}</span>
                      <i className="ri-car-line text-emerald-600"></i>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">운행 횟수</span>
                        <span className="font-semibold text-gray-900">{stat.runs}회</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">주행 거리</span>
                        <span className="font-semibold text-gray-900">{stat.distance}km</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">총 비용</span>
                        <span className="font-semibold text-emerald-600">{stat.cost.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 운행일지 탭 */}
        {activeTab === 'runlogs' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">전체 차량</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.plateNumber}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowRunLogModal(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-add-line"></i>
                운행일지 작성
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">날짜</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">차량</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">시간</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">출발지</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">도착지</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">목적</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">거리</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">비용</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {runLogs.map((log) => {
                    const vehicle = vehicles.find(v => v.id === log.vehicleId);
                    const totalCost = log.fuelCost + log.tollCost + log.parkingCost;
                    
                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{log.date}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{vehicle?.plateNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.startTime} ~ {log.endTime}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.departure}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.destination}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.purpose}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{log.distance}km</td>
                        <td className="px-4 py-3 text-sm font-medium text-emerald-600">{totalCost.toLocaleString()}원</td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-emerald-600 hover:text-emerald-700 mr-3">
                            <i className="ri-edit-line text-lg"></i>
                          </button>
                          <button className="text-red-600 hover:text-red-700">
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
        )}
      </div>

      {/* 차량 등록/수정 모달 */}
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowVehicleModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {isEditMode ? '차량 정보 수정' : '차량 등록'}
              </h2>
              <button onClick={() => setShowVehicleModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">차량번호 *</label>
                  <input type="text" defaultValue={selectedVehicle?.plateNumber} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">차종 *</label>
                  <input type="text" defaultValue={selectedVehicle?.model} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">용도 *</label>
                  <select defaultValue={selectedVehicle?.purpose} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option value="송영">송영</option>
                    <option value="업무">업무</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">소유형태 *</label>
                  <select defaultValue={selectedVehicle?.ownership} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option value="시설">시설</option>
                    <option value="리스">리스</option>
                    <option value="개인">개인</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당 운전자 *</label>
                  <input type="text" defaultValue={selectedVehicle?.driver} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">보험회사</label>
                  <input type="text" defaultValue={selectedVehicle?.insuranceCompany} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">보험만료일 *</label>
                  <input type="date" defaultValue={selectedVehicle?.insuranceExpiry} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">정기검사 예정일 *</label>
                  <input type="date" defaultValue={selectedVehicle?.inspectionDate} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">상태 *</label>
                  <select defaultValue={selectedVehicle?.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option value="active">운행중</option>
                    <option value="inactive">정비중</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                  <textarea defaultValue={selectedVehicle?.notes} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"></textarea>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowVehicleModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">취소</button>
                <button onClick={() => { alert('저장되었습니다.'); setShowVehicleModal(false); }} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">저장</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 운행일지 작성 모달 */}
      {showRunLogModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRunLogModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">운행일지 작성</h2>
              <button onClick={() => setShowRunLogModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">차량 선택 *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option value="">차량을 선택하세요</option>
                    {vehicles.filter(v => v.status === 'active').map(v => (
                      <option key={v.id} value={v.id}>{v.plateNumber} - {v.model}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">운행일자 *</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">출발시간 *</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">도착시간 *</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">출발지 *</label>
                  <input type="text" placeholder="예: 실버타운" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">도착지 *</label>
                  <input type="text" placeholder="예: ○○병원" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">운행 목적 *</label>
                  <input type="text" placeholder="예: 외래진료 송영" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">동승자</label>
                  <input type="text" placeholder="예: 김영희, 이철수" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">주행거리 (km) *</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">유류비 (원)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">통행료 (원)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">주차비 (원)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">영수증 첨부</label>
                  <input type="file" accept="image/*,.pdf" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                  <textarea rows={3} placeholder="특이사항을 입력하세요" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"></textarea>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowRunLogModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">취소</button>
                <button onClick={() => { alert('저장되었습니다.'); setShowRunLogModal(false); }} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">저장</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
