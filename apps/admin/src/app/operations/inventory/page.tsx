'use client';

import { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  lastUpdated: string;
  notes: string;
}

export default function InventoryManagement() {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('inventory_items');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: '1',
            name: '성인용 기저귀 (대형)',
            category: '위생용품',
            quantity: 450,
            unit: '개',
            minStock: 200,
            lastUpdated: '2025-01-15',
            notes: '월 평균 사용량: 800개',
          },
          {
            id: '2',
            name: '물티슈',
            category: '위생용품',
            quantity: 85,
            unit: '팩',
            minStock: 50,
            lastUpdated: '2025-01-14',
            notes: '',
          },
          {
            id: '3',
            name: '세제 (대용량)',
            category: '청소용품',
            quantity: 12,
            unit: '통',
            minStock: 5,
            lastUpdated: '2025-01-10',
            notes: '',
          },
        ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('전체');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const categories = ['전체', '위생용품', '청소용품', '식자재', '의료용품', '사무용품', '기타'];

  const [formData, setFormData] = useState({
    name: '',
    category: '위생용품',
    quantity: '',
    unit: '개',
    minStock: '',
    notes: '',
  });

  const saveToStorage = (data: InventoryItem[]) => {
    localStorage.setItem('inventory_items', JSON.stringify(data));
    setItems(data);
  };

  const handleAdd = () => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      minStock: Number(formData.minStock),
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: formData.notes,
    };

    saveToStorage([...items, newItem]);
    resetForm();
  };

  const handleUpdate = () => {
    if (!editingItem) return;

    const updated = items.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            name: formData.name,
            category: formData.category,
            quantity: Number(formData.quantity),
            unit: formData.unit,
            minStock: Number(formData.minStock),
            lastUpdated: new Date().toISOString().split('T')[0],
            notes: formData.notes,
          }
        : item,
    );

    saveToStorage(updated);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      saveToStorage(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity.toString(),
      unit: item.unit,
      minStock: item.minStock.toString(),
      notes: item.notes,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '위생용품',
      quantity: '',
      unit: '개',
      minStock: '',
      notes: '',
    });
    setEditingItem(null);
    setShowModal(false);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '전체' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = items.filter(item => item.quantity <= item.minStock);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">재고/소모품 관리</h1>
          <p className="mt-1 text-sm text-gray-500">기저귀, 세제, 물티슈, 식자재 등 입출고 관리</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-white transition-all hover:shadow-lg"
        >
          <i className="ri-add-line"></i>
          품목 추가
        </button>
      </div>

      {/* 재고 부족 알림 */}
      {lowStockItems.length > 0 && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <i className="ri-alert-line mt-0.5 text-xl text-red-500"></i>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-red-900">재고 부족 알림</h3>
              <div className="space-y-1">
                {lowStockItems.map(item => (
                  <div key={item.id} className="text-sm text-red-700">
                    • {item.name}: 현재 {item.quantity}
                    {item.unit} (최소 재고: {item.minStock}
                    {item.unit})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 검색 및 필터 */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"></i>
          <input
            type="text"
            placeholder="품목명 검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 재고 목록 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">품목명</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">현재재고</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">최소재고</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">최종수정</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    {item.notes && <div className="mt-1 text-xs text-gray-500">{item.notes}</div>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {item.quantity} {item.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.minStock} {item.unit}
                  </td>
                  <td className="px-6 py-4">
                    {item.quantity <= item.minStock ? (
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                        재고부족
                      </span>
                    ) : item.quantity <= item.minStock * 1.5 ? (
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                        주의
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        정상
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
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

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">{editingItem ? '품목 수정' : '품목 추가'}</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">품목명 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="예: 성인용 기저귀 (대형)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">카테고리 *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {categories
                        .filter(c => c !== '전체')
                        .map(cat => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">단위 *</label>
                    <select
                      value={formData.unit}
                      onChange={e => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="개">개</option>
                      <option value="팩">팩</option>
                      <option value="통">통</option>
                      <option value="박스">박스</option>
                      <option value="kg">kg</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">현재 재고 *</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">최소 재고 *</label>
                    <input
                      type="number"
                      value={formData.minStock}
                      onChange={e => setFormData({ ...formData, minStock: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">비고</label>
                  <textarea
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="추가 정보를 입력하세요"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={editingItem ? handleUpdate : handleAdd}
                  disabled={!formData.name || !formData.quantity || !formData.minStock}
                  className="flex-1 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingItem ? '수정' : '추가'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
