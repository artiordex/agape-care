'use client';

import React, { useState, useMemo } from 'react';
import { GalleryItem, GalleryFilterType } from './gallery.type';

// 하위 컴포넌트 임포트
import GalleryHeader from './GalleryHeader';
import GalleryFilter from './GalleryFilter';
import GalleryTable from './GalleryTable';
import GalleryManagement from './GalleryManagement';
import GalleryFormModal from './GalleryFormModal';
import GalleryDetailModal from './GalleryDetailModal';

interface Props {
  readonly initialData: GalleryItem[];
}

export default function GalleryAdmin({ initialData }: Props) {
  const [items, setItems] = useState<GalleryItem[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<GalleryFilterType>({
    category: '전체',
    searchType: 'title',
    searchKeyword: '',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // 필터링 로직
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = filter.category === '전체' || item.category === filter.category;
      const keyword = filter.searchKeyword.toLowerCase();
      let matchesSearch = false;
      if (filter.searchType === 'title') matchesSearch = item.title.toLowerCase().includes(keyword);
      if (filter.searchType === 'description') matchesSearch = item.description.toLowerCase().includes(keyword);
      if (filter.searchType === 'author') matchesSearch = item.authorName.toLowerCase().includes(keyword);
      return matchesCategory && matchesSearch;
    });
  }, [items, filter]);

  // 선택 핸들러
  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    /** * [구조] h-screen과 overflow-hidden을 통해 브라우저 자체 스크롤을 막고
     * 헤더와 푸터를 화면 하단/상단에 고정합니다.
     */
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* 고정 상단바 (shrink-0으로 높이 유지) */}
      <GalleryHeader
        totalCount={items.length}
        onAddClick={() => {
          setSelectedItem(null);
          setIsFormOpen(true);
        }}
      />

      {/* 내부 스크롤 본문 (flex-1로 남은 공간 차지) */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-full space-y-8 text-left">
          {/* 통계 카드 섹션 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              label="전체 이미지"
              value={items.length}
              unit="FILES"
              icon="ri-image-2-line"
              color="text-gray-800"
            />
            <StatCard
              label="게시 중"
              value={items.filter(i => i.status === '게시').length}
              unit="ACTIVE"
              icon="ri-checkbox-circle-line"
              color="text-[#5C8D5A]"
            />
            <StatCard
              label="숨김 처리"
              value={items.filter(i => i.status === '숨김').length}
              unit="HIDDEN"
              icon="ri-eye-off-line"
              color="text-orange-500"
            />
            <StatCard label="신규 업로드" value={2} unit="TODAY" icon="ri-upload-cloud-2-line" color="text-blue-500" />
          </div>

          {/* 필터 및 리스트 섹션 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
              <h2 className="text-[14px] font-black uppercase italic tracking-tight text-gray-800">Asset Filtering</h2>
            </div>
            <GalleryFilter onFilterChange={setFilter} />
          </div>

          <div className="space-y-4 pb-12">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-[#5C8D5A]">
                <i className="ri-list-check text-lg"></i>
                <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">Gallery Asset View</h2>
                <span className="text-[11px] font-bold text-gray-400">| Total: {filteredItems.length} items</span>
              </div>
            </div>
            <GalleryTable
              items={filteredItems}
              onEdit={item => {
                setSelectedItem(item);
                setIsFormOpen(true);
              }}
              onDelete={id => setItems(items.filter(i => i.id !== id))}
              onDetail={item => {
                setSelectedItem(item);
                setIsDetailOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* 고정 하단 액션 바 */}
      <GalleryManagement
        selectedCount={selectedIds.size}
        onBulkDelete={() => {}}
        onCreate={() => {
          setSelectedItem(null);
          setIsFormOpen(true);
        }}
      />

      {/* 모달 레이어 */}
      <GalleryFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={() => {}}
        initialData={selectedItem}
      />
      <GalleryDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        item={selectedItem}
        onEdit={() => {}}
        onDelete={() => {}}
      />

      {/* 커스텀 스크롤바 스타일 */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5c8d5a;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f0f2f5;
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, unit, icon, color }: any) {
  return (
    <div className="border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#5C8D5A]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</span>
        <i className={`${icon} text-[18px] ${color}`}></i>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-mono text-2xl font-black tracking-tighter text-gray-800">{value}</span>
        <span className="text-[10px] font-bold text-gray-400">{unit}</span>
      </div>
    </div>
  );
}
