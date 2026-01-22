import { useState } from 'react';

interface CCTVDevice {
  id: string;
  name: string;
  location: string;
  retentionDays: number;
  storageType: 'NVR' | 'DVR' | '서버' | '클라우드';
  status: 'active' | 'inactive';
  manager: string;
  installDate: string;
  notes: string;
}

const CCTVDeviceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedDevice, setSelectedDevice] = useState<CCTVDevice | null>(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 샘플 데이터
  const [devices] = useState<CCTVDevice[]>([
    {
      id: 'CCTV001',
      name: '1층 현관',
      location: '1층 메인 출입구',
      retentionDays: 30,
      storageType: 'NVR',
      status: 'active',
      manager: '김보안',
      installDate: '2023-01-15',
      notes: '출입 모니터링'
    },
    {
      id: 'CCTV002',
      name: '1층 복도',
      location: '1층 중앙 복도',
      retentionDays: 30,
      storageType: 'NVR',
      status: 'active',
      manager: '김보안',
      installDate: '2023-01-15',
      notes: ''
    },
    {
      id: 'CCTV003',
      name: '2층 복도',
      location: '2층 중앙 복도',
      retentionDays: 30,
      storageType: 'NVR',
      status: 'active',
      manager: '김보안',
      installDate: '2023-01-15',
      notes: ''
    },
    {
      id: 'CCTV004',
      name: '식당',
      location: '1층 식당',
      retentionDays: 30,
      storageType: 'NVR',
      status: 'active',
      manager: '김보안',
      installDate: '2023-01-15',
      notes: ''
    },
    {
      id: 'CCTV005',
      name: '주차장',
      location: '지하 주차장',
      retentionDays: 30,
      storageType: 'DVR',
      status: 'inactive',
      manager: '이관리',
      installDate: '2023-01-15',
      notes: '수리 중'
    }
  ]);

  // 필터링된 장치 목록
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.includes(searchTerm) || 
                         device.location.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <i className="ri-camera-line text-emerald-600"></i>
              CCTV 설치·운영 관리
            </h1>
            <p className="text-sm text-gray-600 mt-1">CCTV 장치 정보 및 운영 현황을 관리합니다</p>
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
                <p className="text-sm text-gray-600">총 설치 대수</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{devices.length}대</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-camera-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">정상 작동</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {devices.filter(d => d.status === 'active').length}대
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">점검 필요</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {devices.filter(d => d.status === 'inactive').length}대
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-tools-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 보관일</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {Math.round(devices.reduce((sum, d) => sum + d.retentionDays, 0) / devices.length)}일
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 장치 목록 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {/* 필터 바 */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="장치명, 설치장소 검색..."
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
              <option value="active">정상</option>
              <option value="inactive">점검필요</option>
            </select>
            <button
              onClick={() => {
                setSelectedDevice(null);
                setIsEditMode(false);
                setShowDeviceModal(true);
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              장치 등록
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">장치명</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">설치장소</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">보관기간</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">저장유형</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">담당자</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">설치일</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{device.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{device.location}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{device.retentionDays}일</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        device.storageType === 'NVR' ? 'bg-blue-100 text-blue-700' :
                        device.storageType === 'DVR' ? 'bg-green-100 text-green-700' :
                        device.storageType === '서버' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {device.storageType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{device.manager}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{device.installDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        device.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {device.status === 'active' ? '정상' : '점검필요'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedDevice(device);
                          setIsEditMode(true);
                          setShowDeviceModal(true);
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
        </div>
      </div>

      {/* 장치 등록/수정 모달 */}
      {showDeviceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeviceModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {isEditMode ? 'CCTV 장치 수정' : 'CCTV 장치 등록'}
              </h2>
              <button onClick={() => setShowDeviceModal(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">장치명 *</label>
                  <input
                    type="text"
                    defaultValue={selectedDevice?.name}
                    placeholder="예: 1층 현관"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">설치장소 *</label>
                  <input
                    type="text"
                    defaultValue={selectedDevice?.location}
                    placeholder="예: 1층 메인 출입구"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">촬영보관기간 (일) *</label>
                  <input
                    type="number"
                    defaultValue={selectedDevice?.retentionDays}
                    placeholder="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">저장유형 *</label>
                  <select
                    defaultValue={selectedDevice?.storageType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="NVR">NVR</option>
                    <option value="DVR">DVR</option>
                    <option value="서버">서버</option>
                    <option value="클라우드">클라우드</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedDevice?.manager}
                    placeholder="담당자 이름"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">설치일 *</label>
                  <input
                    type="date"
                    defaultValue={selectedDevice?.installDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">작동상태 *</label>
                  <select
                    defaultValue={selectedDevice?.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="active">정상</option>
                    <option value="inactive">점검필요</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                  <textarea
                    defaultValue={selectedDevice?.notes}
                    rows={3}
                    placeholder="추가 정보를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeviceModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowDeviceModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
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

export default CCTVDeviceManagement;
