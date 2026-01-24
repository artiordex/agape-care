'use client';

import { useState } from 'react';

interface Asset {
  id: string;
  category: string;
  name: string;
  specification: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  purchasePrice: number;
  location: string;
  manager: string;
  status: 'in_use' | 'repair' | 'disposed';
  photo?: string;
  notes: string;
}

interface MaintenanceLog {
  id: string;
  assetId: string;
  date: string;
  type: '점검' | '수리' | '교체' | '폐기';
  description: string;
  cost: number;
  vendor: string;
  nextCheckDate?: string;
  staff: string;
}

const AssetManagement = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'maintenance'>('assets');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_use' | 'repair' | 'disposed'>('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const categories = ['침구', '휠체어', '의료기기', '가전', '사무', '소모품', '기타'];

  // 샘플 데이터
  const [assets] = useState<Asset[]>([
    {
      id: 'A001',
      category: '휠체어',
      name: '전동 휠체어',
      specification: 'LX-2000',
      quantity: 5,
      unit: '대',
      purchaseDate: '2023-03-15',
      purchasePrice: 1500000,
      location: '1층 복도',
      manager: '김요양',
      status: 'in_use',
      notes: '정기 점검 필요',
    },
    {
      id: 'A002',
      category: '의료기기',
      name: '혈압계',
      specification: 'BP-100',
      quantity: 3,
      unit: '대',
      purchaseDate: '2023-06-20',
      purchasePrice: 300000,
      location: '간호실',
      manager: '이간호',
      status: 'in_use',
      notes: '',
    },
    {
      id: 'A003',
      category: '침구',
      name: '욕창방지 매트리스',
      specification: 'PM-500',
      quantity: 10,
      unit: '개',
      purchaseDate: '2023-01-10',
      purchasePrice: 500000,
      location: '각 침실',
      manager: '박요양',
      status: 'in_use',
      notes: '6개월마다 점검',
    },
    {
      id: 'A004',
      category: '가전',
      name: '세탁기',
      specification: '드럼 20kg',
      quantity: 2,
      unit: '대',
      purchaseDate: '2022-11-05',
      purchasePrice: 2000000,
      location: '세탁실',
      manager: '최관리',
      status: 'repair',
      notes: '수리 중',
    },
  ]);

  const [maintenanceLogs] = useState<MaintenanceLog[]>([
    {
      id: 'M001',
      assetId: 'A001',
      date: '2024-01-10',
      type: '점검',
      description: '배터리 상태 점검 및 타이어 공기압 확인',
      cost: 50000,
      vendor: '○○의료기기',
      nextCheckDate: '2024-04-10',
      staff: '김요양',
    },
    {
      id: 'M002',
      assetId: 'A004',
      date: '2024-01-15',
      type: '수리',
      description: '배수펌프 교체',
      cost: 150000,
      vendor: '삼성전자서비스',
      staff: '최관리',
    },
  ]);

  // 필터링된 비품 목록
  const filteredAssets = assets.filter(asset => {
    const matchesSearch =
      asset.name.includes(searchTerm) ||
      asset.specification.includes(searchTerm) ||
      asset.location.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 카테고리별 통계
  const getCategoryStats = () => {
    return categories.map(category => {
      const categoryAssets = assets.filter(a => a.category === category);
      const totalQuantity = categoryAssets.reduce((sum, a) => sum + a.quantity, 0);
      const totalValue = categoryAssets.reduce((sum, a) => sum + a.purchasePrice * a.quantity, 0);

      return {
        category,
        count: categoryAssets.length,
        quantity: totalQuantity,
        value: totalValue,
      };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('엑셀 다운로드 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <i className="ri-archive-line text-emerald-600"></i>
              비품관리
            </h1>
            <p className="mt-1 text-sm text-gray-600">비품 정보 및 점검·수리 이력을 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-printer-line"></i>
              출력
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <i className="ri-file-excel-line"></i>
              엑셀
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 비품 종류</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{assets.length}개</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="ri-archive-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">사용 중</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  {assets.filter(a => a.status === 'in_use').length}개
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <i className="ri-checkbox-circle-line text-2xl text-emerald-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">수리 중</p>
                <p className="mt-1 text-2xl font-bold text-orange-600">
                  {assets.filter(a => a.status === 'repair').length}개
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <i className="ri-tools-line text-2xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 자산 가치</p>
                <p className="mt-1 text-2xl font-bold text-purple-600">
                  {(assets.reduce((sum, a) => sum + a.purchasePrice * a.quantity, 0) / 10000).toFixed(0)}만원
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <i className="ri-money-dollar-circle-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="mb-6 rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'assets'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-archive-line mr-2"></i>
              비품 목록
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'maintenance'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-tools-line mr-2"></i>
              점검·수리 이력
            </button>
          </div>
        </div>

        {/* 비품 목록 탭 */}
        {activeTab === 'assets' && (
          <div className="p-6">
            {/* 필터 바 */}
            <div className="mb-6 flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="비품명, 규격, 보관장소 검색..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">전체 카테고리</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">전체 상태</option>
                <option value="in_use">사용중</option>
                <option value="repair">수리중</option>
                <option value="disposed">폐기</option>
              </select>
              <button
                onClick={() => {
                  setSelectedAsset(null);
                  setIsEditMode(false);
                  setShowAssetModal(true);
                }}
                className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
              >
                <i className="ri-add-line"></i>
                비품 등록
              </button>
            </div>

            {/* 비품 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">카테고리</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">품명</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">규격</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">수량</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">구매일</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">구매가</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">보관장소</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">담당자</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">상태</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                          {asset.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{asset.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{asset.specification}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {asset.quantity}
                        {asset.unit}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{asset.purchaseDate}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {asset.purchasePrice.toLocaleString()}원
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{asset.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{asset.manager}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            asset.status === 'in_use'
                              ? 'bg-emerald-100 text-emerald-700'
                              : asset.status === 'repair'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {asset.status === 'in_use' ? '사용중' : asset.status === 'repair' ? '수리중' : '폐기'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedAsset(asset);
                            setIsEditMode(true);
                            setShowAssetModal(true);
                          }}
                          className="mr-3 text-emerald-600 hover:text-emerald-700"
                        >
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAsset(asset);
                            setShowMaintenanceModal(true);
                          }}
                          className="mr-3 text-blue-600 hover:text-blue-700"
                        >
                          <i className="ri-tools-line text-lg"></i>
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

            {/* 카테고리별 현황 */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">카테고리별 보유 현황</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {getCategoryStats().map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{stat.category}</span>
                      <i className="ri-archive-line text-emerald-600"></i>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">종류</span>
                        <span className="font-semibold text-gray-900">{stat.count}개</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">수량</span>
                        <span className="font-semibold text-gray-900">{stat.quantity}개</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">자산가치</span>
                        <span className="font-semibold text-emerald-600">{(stat.value / 10000).toFixed(0)}만원</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 점검·수리 이력 탭 */}
        {activeTab === 'maintenance' && (
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-3">
                <input
                  type="date"
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                />
                <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500">
                  <option value="">전체 비품</option>
                  {assets.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500">
                  <option value="">전체 유형</option>
                  <option value="점검">점검</option>
                  <option value="수리">수리</option>
                  <option value="교체">교체</option>
                  <option value="폐기">폐기</option>
                </select>
              </div>
              <button
                onClick={() => setShowMaintenanceModal(true)}
                className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
              >
                <i className="ri-add-line"></i>
                이력 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">날짜</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">비품</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">유형</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">내용</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">비용</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">업체</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">다음 점검</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">담당자</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-600">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {maintenanceLogs.map(log => {
                    const asset = assets.find(a => a.id === log.assetId);

                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{log.date}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{asset?.name}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              log.type === '점검'
                                ? 'bg-blue-100 text-blue-700'
                                : log.type === '수리'
                                  ? 'bg-orange-100 text-orange-700'
                                  : log.type === '교체'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {log.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.description}</td>
                        <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                          {log.cost.toLocaleString()}원
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.vendor}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.nextCheckDate || '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{log.staff}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="mr-3 text-emerald-600 hover:text-emerald-700">
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

      {/* 비품 등록/수정 모달 */}
      {showAssetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowAssetModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">{isEditMode ? '비품 정보 수정' : '비품 등록'}</h2>
              <button
                onClick={() => setShowAssetModal(false)}
                className="rounded-full p-1 text-white hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">카테고리 *</label>
                  <select
                    defaultValue={selectedAsset?.category}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">품명 *</label>
                  <input
                    type="text"
                    defaultValue={selectedAsset?.name}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">규격/모델</label>
                  <input
                    type="text"
                    defaultValue={selectedAsset?.specification}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">수량 *</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      defaultValue={selectedAsset?.quantity}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      defaultValue={selectedAsset?.unit}
                      placeholder="단위"
                      className="w-20 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">구매일 *</label>
                  <input
                    type="date"
                    defaultValue={selectedAsset?.purchaseDate}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">구매가 (원) *</label>
                  <input
                    type="number"
                    defaultValue={selectedAsset?.purchasePrice}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">보관장소 *</label>
                  <input
                    type="text"
                    defaultValue={selectedAsset?.location}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">담당자 *</label>
                  <input
                    type="text"
                    defaultValue={selectedAsset?.manager}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">상태 *</label>
                  <select
                    defaultValue={selectedAsset?.status}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="in_use">사용중</option>
                    <option value="repair">수리중</option>
                    <option value="disposed">폐기</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">비품 사진</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">비고</label>
                  <textarea
                    defaultValue={selectedAsset?.notes}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowAssetModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowAssetModal(false);
                  }}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 점검·수리 이력 추가 모달 */}
      {showMaintenanceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowMaintenanceModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">점검·수리 이력 추가</h2>
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="rounded-full p-1 text-white hover:bg-white/20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">비품 선택 *</label>
                  <select
                    defaultValue={selectedAsset?.id}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">비품을 선택하세요</option>
                    {assets.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.specification})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">날짜 *</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">유형 *</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500">
                    <option value="점검">점검</option>
                    <option value="수리">수리</option>
                    <option value="교체">교체</option>
                    <option value="폐기">폐기</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">비용 (원)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">업체명</label>
                  <input
                    type="text"
                    placeholder="예: ○○의료기기"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">다음 점검 예정일</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">내용 *</label>
                  <textarea
                    rows={4}
                    placeholder="점검·수리 내용을 상세히 입력하세요"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">담당자 *</label>
                  <input
                    type="text"
                    placeholder="담당자 이름"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">첨부파일</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowMaintenanceModal(false)}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('저장되었습니다.');
                    setShowMaintenanceModal(false);
                  }}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
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

export default AssetManagement;
