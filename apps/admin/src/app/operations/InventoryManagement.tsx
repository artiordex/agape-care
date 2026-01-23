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
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: '성인용 기저귀 (대형)',
        category: '위생용품',
        quantity: 450,
        unit: '개',
        minStock: 200,
        lastUpdated: '2025-01-15',
        notes: '월 평균 사용량: 800개'
      },
      {
        id: '2',
        name: '물티슈',
        category: '위생용품',
        quantity: 85,
        unit: '팩',
        minStock: 50,
        lastUpdated: '2025-01-14',
        notes: ''
      },
      {
        id: '3',
        name: '세제 (대용량)',
        category: '청소용품',
        quantity: 12,
        unit: '통',
        minStock: 5,
        lastUpdated: '2025-01-10',
        notes: ''
      }
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
    notes: ''
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
      notes: formData.notes
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
            notes: formData.notes
          }
        : item
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
      notes: item.notes
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
      notes: ''
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">재고/소모품 관리</h1>
          <p className="text-sm text-gray-500 mt-1">기저귀, 세제, 물티슈, 식자재 등 입출고 관리</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          품목 추가
        </button>
      </div>

      {/* 재고 부족 알림 */}
      {lowStockItems.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <i className="ri-alert-line text-red-500 text-xl mt-0.5"></i>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">재고 부족 알림</h3>
              <div className="space-y-1">
                {lowStockItems.map(item => (
                  <div key={item.id} className="text-sm text-red-700">
                    • {item.name}: 현재 {item.quantity}{item.unit} (최소 재고: {item.minStock}{item.unit})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 검색 및 필터 */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="품목명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 재고 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">품목명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">현재재고</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">최소재고</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">최종수정</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    {item.notes && <div className="text-xs text-gray-500 mt-1">{item.notes}</div>}
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
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                        재고부족
                      </span>
                    ) : item.quantity <= item.minStock * 1.5 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                        주의
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        정상
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
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

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingItem ? '품목 수정' : '품목 추가'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">품목명 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="예: 성인용 기저귀 (대형)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {categories.filter(c => c !== '전체').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">단위 *</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">현재 재고 *</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">최소 재고 *</label>
                    <input
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">비고</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="추가 정보를 입력하세요"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={editingItem ? handleUpdate : handleAdd}
                  disabled={!formData.name || !formData.quantity || !formData.minStock}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
