/**
 * Description : GalleryAdmin.tsx - 📌 갤러리 관리 통합 시스템
 * Author : (User)
 * Date : 2026-02-16
 */

'use client';

import { api } from '@/lib/api';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { GalleryFilterType, GalleryItem } from './gallery.type';

// 하위 컴포넌트 임포트
import GalleryDetailModal from './GalleryDetailModal';
import GalleryFilter from './GalleryFilter';
import GalleryFormModal from './GalleryFormModal';
import GalleryHeader from './GalleryHeader';
import GalleryManagement from './GalleryManagement';
import GalleryTable from './GalleryTable';

export default function GalleryAdmin() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<GalleryFilterType>({
    category: '전체',
    searchType: 'title',
    searchKeyword: '',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // API 호출
  const { data: apiResponse, isLoading, refetch } = api.content.getGalleryItems.useQuery(['gallery-items']);

  // Mutations
  const createMutation = api.content.createGalleryItem.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormOpen(false);
      toast.success('갤러리가 등록되었습니다.');
    },
    onError: () => toast.error('등록 중 오류가 발생했습니다.'),
  });

  const updateMutation = api.content.updateGalleryItem.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormOpen(false);
      toast.success('수정되었습니다.');
    },
    onError: () => toast.error('수정 중 오류가 발생했습니다.'),
  });

  const deleteMutation = api.content.deleteGalleryItem.useMutation({
    onSuccess: () => {
      refetch();
      setIsDetailOpen(false);
      toast.success('삭제되었습니다.');
    },
    onError: () => toast.error('삭제 중 오류가 발생했습니다.'),
  });

  const uploadMutation = api.file.uploadFiles.useMutation();

  const handleGallerySubmit = async (data: any) => {
    try {
      const { images, ...rest } = data;

      // 1. Identify existing and new images
      const existingFileIds = images.filter((img: any) => img.file === null && img.id).map((img: any) => img.id);
      const newFiles = images.filter((img: any) => img.file !== null).map((img: any) => img.file);
      let uploadedFileIds: string[] = [];

      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file: File) => formData.append('files', file));

        const uploadRes = await uploadMutation.mutateAsync({
          body: formData,
        });

        if (uploadRes.status === 201) {
          uploadedFileIds = (uploadRes.body.data as any[]).map((f: any) => f.id);
        }
      }

      // 2. Merge all file IDs
      const fileIds = [...existingFileIds, ...uploadedFileIds];

      const body = {
        title: rest.title,
        description: rest.description,
        category: rest.category,
        isPublic: rest.isPublic,
        fileIds, // We assume the backend expects fileIds
      };

      if (selectedItem) {
        updateMutation.mutate({
          params: { id: selectedItem.id },
          body: body as any,
        });
      } else {
        createMutation.mutate({
          body: body as any,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('오류가 발생했습니다.');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteMutation.mutate({ params: { id }, body: {} });
    }
  };

  // API 데이터를 GalleryItem 타입으로 매핑
  const items = useMemo(() => {
    if (!apiResponse?.body?.data) return [];

    // ApiResponseSchema(z.array(GalleryItemSchema)) 이므로 body.data가 실제 배열
    const rawItems = apiResponse.body.data as any[];

    return rawItems.map((item): GalleryItem => {
      const firstFile = item.files?.[0]?.file;
      return {
        id: item.id,
        category: item.category || '기타',
        title: item.title || '(제목 없음)',
        description: item.description || '',
        imageUrl: firstFile?.url || '',
        thumbnailUrl: firstFile?.url || '',
        authorName: item.author?.name || '관리자',
        authorId: item.createdBy || '',
        viewCount: item.viewCount || 0,
        status: item.isPublic ? '게시' : '숨김',
        isPublic: !!item.isPublic,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        files: item.files,
      };
    });
  }, [apiResponse]);

  // 필터링 로직
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = filter.category === '전체' || item.category === filter.category;
      const keyword = filter.searchKeyword.toLowerCase();
      let matchesSearch = false;
      if (filter.searchType === 'title') matchesSearch = (item.title || '').toLowerCase().includes(keyword);
      if (filter.searchType === 'description') matchesSearch = (item.description || '').toLowerCase().includes(keyword);
      if (filter.searchType === 'author') matchesSearch = (item.authorName || '').toLowerCase().includes(keyword);
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f0f2f5]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5C8D5A] border-t-transparent"></div>
          <p className="text-sm font-bold text-gray-500">갤러리 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

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
              value={items.filter(i => i.isPublic).length}
              unit="ACTIVE"
              icon="ri-checkbox-circle-line"
              color="text-[#5C8D5A]"
            />
            <StatCard
              label="숨김 처리"
              value={items.filter(i => !i.isPublic).length}
              unit="HIDDEN"
              icon="ri-eye-off-line"
              color="text-orange-500"
            />
            <StatCard
              label="최근 업데이트"
              value={items.length > 0 ? 'ONLINE' : 'NONE'}
              unit="STATE"
              icon="ri-upload-cloud-2-line"
              color="text-blue-500"
            />
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
              onDelete={id => handleDelete(id)}
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
        onSubmit={handleGallerySubmit}
        initialData={selectedItem}
      />
      <GalleryDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        item={selectedItem}
        onEdit={item => {
          setSelectedItem(item);
          setIsDetailOpen(false);
          setIsFormOpen(true);
        }}
        onDelete={id => handleDelete(id)}
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
