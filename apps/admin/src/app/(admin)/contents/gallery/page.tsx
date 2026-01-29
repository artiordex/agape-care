'use client';

import { useState, useEffect } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  views: number;
}

export default function GalleryManagement() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['일상', '행사', '프로그램', '시설', '기타'];

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const saved = localStorage.getItem('admin_gallery');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      const initial: GalleryItem[] = [];
      setItems(initial);
      localStorage.setItem('admin_gallery', JSON.stringify(initial));
    }
  };

  const saveItems = (updatedItems: GalleryItem[]) => {
    localStorage.setItem('admin_gallery', JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const handleAdd = () => {
    setEditingItem({
      id: Date.now(),
      title: '',
      description: '',
      imageUrl: '',
      category: '일상',
      date: new Date().toISOString().split('T')[0],
      views: 0,
    });
    setShowModal(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingItem) return;

    if (!editingItem.title.trim() || !editingItem.imageUrl.trim()) {
      alert('제목과 이미지 URL을 입력해주세요.');
      return;
    }

    const existing = items.find(i => i.id === editingItem.id);
    let updated;

    if (existing) {
      updated = items.map(i => (i.id === editingItem.id ? editingItem : i));
    } else {
      updated = [editingItem, ...items];
    }

    saveItems(updated);
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    if (!confirm('이 갤러리 항목을 삭제하시겠습니까?')) return;
    saveItems(items.filter(i => i.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">갤러리 관리</h1>
          <p className="mt-1 text-sm text-gray-600">총 {items.length}개의 사진</p>
        </div>
        <button
          onClick={handleAdd}
          className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-2 text-white shadow-md transition-all hover:from-teal-600 hover:to-teal-700"
        >
          <i className="ri-add-line mr-2"></i>
          사진 추가
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="제목으로 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">전체 카테고리</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`cursor-pointer rounded-lg px-4 py-2 transition-colors ${
              viewMode === 'grid' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-grid-line mr-2"></i>
            그리드
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`cursor-pointer rounded-lg px-4 py-2 transition-colors ${
              viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-list-check mr-2"></i>
            리스트
          </button>
        </div>
      </div>

      {/* Gallery Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <i className="ri-image-line text-4xl"></i>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-colors group-hover:bg-black/40 group-hover:opacity-100">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-teal-600 transition-colors hover:bg-teal-50"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-red-600 transition-colors hover:bg-red-50"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="mb-1 line-clamp-1 font-semibold text-gray-900">{item.title}</h3>
                <p className="line-clamp-2 text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery List View */}
      {viewMode === 'list' && (
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이미지
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    조회수
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <i className="ri-image-line"></i>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="line-clamp-1 text-sm text-gray-500">{item.description}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{item.date}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{item.views}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-3 cursor-pointer text-teal-600 hover:text-teal-900"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer text-red-600 hover:text-red-900"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                {items.find(i => i.id === editingItem.id) ? '갤러리 수정' : '새 사진 추가'}
              </h2>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">제목</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  placeholder="사진 제목"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">카테고리</label>
                <select
                  value={editingItem.category}
                  onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">이미지 URL</label>
                <input
                  type="text"
                  value={editingItem.imageUrl}
                  onChange={e => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  placeholder="https://example.com/image.jpg"
                />
                {editingItem.imageUrl && (
                  <div className="mt-2 aspect-video overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={editingItem.imageUrl}
                      alt="미리보기"
                      className="h-full w-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src = '';
                        (e.target as HTMLImageElement).className = 'hidden';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">설명</label>
                <textarea
                  value={editingItem.description}
                  onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  placeholder="사진 설명"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                }}
                className="cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-2 text-white transition-all hover:from-teal-600 hover:to-teal-700"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
