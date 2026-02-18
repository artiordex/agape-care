/**
 * Description : CCTVDeviceManagement.tsx - ?? CCTVDeviceManagement UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

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
      notes: '출입 모니터링',
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
      notes: '',
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
      notes: '',
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
      notes: '',
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
      notes: '수리 중',
    },
  ]);

  // 필터링된 장치 목록
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.includes(searchTerm) || device.location.includes(searchTerm);
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
    <div className="animate-fadeIn overflow-hidden rounded-lg bg-white shadow-sm">
      {/* 장기 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <i className="ri-camera-line text-emerald-600"></i>
            CCTV 설치·운영 관리
          </h2>
          <p className="text-sm text-gray-500">장치 정보 및 운영 현황</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="ri-printer-line"></i>
            출력
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <i className="ri-file-excel-line"></i>
            엑셀
          </button>
        </div>
      </div>

      {/* 통계 요약 */}
      <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">TOTAL</p>
          <p className="text-2xl font-black text-gray-900">{devices.length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-500">ACTIVE</p>
          <p className="text-2xl font-black text-emerald-600">{devices.filter(d => d.status === 'active').length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-orange-500">INACTIVE</p>
          <p className="text-2xl font-black text-orange-600">{devices.filter(d => d.status === 'inactive').length}</p>
        </div>
        <div className="p-6 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-500">AVG DAYS</p>
          <p className="text-2xl font-black text-purple-600">
            {Math.round(devices.reduce((sum, d) => sum + d.retentionDays, 0) / devices.length)}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* 필터 바 */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="장치명, 설치장소 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-500"
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
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white shadow-sm transition-all hover:bg-emerald-700"
          >
            <i className="ri-add-line"></i>
            장치 등록
          </button>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">장치명</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">설치장소</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">보관기간</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">저장유형</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">담당자</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">설치일</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase text-gray-400">상태</th>
                <th className="px-4 py-3 text-center text-[11px] font-black uppercase text-gray-400">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDevices.map(device => (
                <tr key={device.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">{device.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{device.location}</td>
                  <td className="px-4 py-3 font-mono text-sm font-black text-blue-600">{device.retentionDays}일</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ${
                        device.storageType === 'NVR'
                          ? 'bg-blue-100 text-blue-700'
                          : device.storageType === 'DVR'
                            ? 'bg-green-100 text-green-700'
                            : device.storageType === '서버'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {device.storageType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{device.manager}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{device.installDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black ${
                        device.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {device.status === 'active' ? '정상' : '점검필요'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedDevice(device);
                          setIsEditMode(true);
                          setShowDeviceModal(true);
                        }}
                        className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('정말 삭제하시겠습니까?')) {
                            alert('삭제되었습니다.');
                          }
                        }}
                        className="rounded p-1.5 text-red-500 hover:bg-red-50"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 장치 등록/수정 모달 */}
      {showDeviceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowDeviceModal(false)}
        >
          <div
            className="animate-scaleIn max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-emerald-600 px-6 py-4">
              <h2 className="text-lg font-black text-white">{isEditMode ? 'CCTV 장치 수정' : 'CCTV 장치 등록'}</h2>
              <button
                onClick={() => setShowDeviceModal(false)}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">장치명 *</label>
                  <input
                    type="text"
                    defaultValue={selectedDevice?.name}
                    placeholder="예: 1층 현관"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">설치장소 *</label>
                  <input
                    type="text"
                    defaultValue={selectedDevice?.location}
                    placeholder="예: 1층 메인 출입구"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">촬영보관기간 (일) *</label>
                  <input
                    type="number"
                    defaultValue={selectedDevice?.retentionDays}
                    placeholder="30"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">저장유형 *</label>
                  <select
                    defaultValue={selectedDevice?.storageType}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="NVR">NVR</option>
                    <option value="DVR">DVR</option>
                    <option value="서버">서버</option>
                    <option value="클라우드">클라우드</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">담당자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedDevice?.manager}
                    placeholder="담당자 이름"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">설치일 *</label>
                  <input
                    type="date"
                    defaultValue={selectedDevice?.installDate}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">작동상태 *</label>
                  <select
                    defaultValue={selectedDevice?.status}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="active">정상</option>
                    <option value="inactive">점검필요</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="mb-1.5 block text-xs font-black uppercase text-gray-500">비고</label>
                  <textarea
                    defaultValue={selectedDevice?.notes}
                    rows={3}
                    placeholder="추가 정보를 입력하세요"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setShowDeviceModal(false)}
                  className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-black text-gray-500 transition-colors hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowDeviceModal(false);
                  }}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-emerald-700"
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
