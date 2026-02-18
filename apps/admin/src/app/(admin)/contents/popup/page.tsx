/**
 * Description : page.tsx - ?? contents/popup ??? UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import { api } from '@/lib/api';
import React, { useState, useMemo } from 'react';
import PopupHeader from './PopupHeader';
import PopupFilter from './PopupFilter';
import PopupTable from './PopupTable';
import PopupFormModal from './PopupFormModal';
import PopupDetailModal from './PopupDetailModal';
import { Popup } from './popup.type';

/**
 * [Page] 아가페 홈페이지 팝업 관리 시스템
 * API 기반 CRUD 구현
 */
export default function PopupManagementPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [selectedPopup, setSelectedPopup] = useState<Popup | null>(null);

  // API로부터 팝업 데이터 로드
  const {
    data: popupsData,
    isLoading,
    refetch,
  } = api.content.getPopups.useQuery(['popups', filterStatus, searchTerm], {
    query: {
      page: 1,
      limit: 100,
      status: filterStatus !== 'all' ? filterStatus : undefined,
      search: searchTerm || undefined,
    },
  });

  const popups = popupsData?.body?.data || [];

  // 생성 mutation
  const createMutation = api.content.createPopup.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormModalOpen(false);
      setEditingPopup(null);
      alert('✅ 새로운 팝업이 등록되었습니다.');
    },
    onError: error => {
      console.error('[ERROR] Failed to create popup:', error);
      alert('팝업 생성에 실패했습니다.');
    },
  });

  // 수정 mutation
  const updateMutation = api.content.updatePopup.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormModalOpen(false);
      setEditingPopup(null);
      alert('✅ 팝업이 수정되었습니다.');
    },
    onError: error => {
      console.error('[ERROR] Failed to update popup:', error);
      alert('팝업 수정에 실패했습니다.');
    },
  });

  // 삭제 mutation
  const deleteMutation = api.content.deletePopup.useMutation({
    onSuccess: () => {
      refetch();
      setIsDetailModalOpen(false);
      alert('✅ 팝업이 삭제되었습니다.');
    },
    onError: error => {
      console.error('[ERROR] Failed to delete popup:', error);
      alert('팝업 삭제에 실패했습니다.');
    },
  });

  // 샘플 데이터 (로컬 테스트용, 나중에 제거 가능)
  const sampleData: Popup[] = [
        {
          id: '1',
          title: '2026 설맞이 특별 면회 안내',
          status: '활성',
          startDate: '2026-01-20',
          endDate: '2026-01-31',
          priority: 1,
          imageUrl: 'https://images.unsplash.com/photo-1504194184404-4aa81a097b3d?q=80&w=400&auto=format&fit=crop',
          linkUrl: 'https://example.com/event',
          position: { x: 100, y: 100 },
          width: 500,
          height: 700,
          showOnce: true,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          title: '신규 요양보호사 채용 공고',
          status: '비활성',
          startDate: '2026-02-01',
          endDate: '2026-02-28',
          priority: 2,
          linkUrl: 'https://example.com/recruit',
          position: { x: 150, y: 150 },
          width: 500,
          height: 700,
          showOnce: true,
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          title: '봄맞이 건강검진 이벤트',
          status: '예약',
          startDate: '2026-03-01',
          endDate: '2026-03-31',
          priority: 3,
          imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop',
          position: { x: 200, y: 100 },
          width: 500,
          height: 700,
          showOnce: false,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
  // 필터링된 데이터
  const filteredData = useMemo(() => {
    let result = popups;

    // 상태 필터
    if (filterStatus !== 'all') {
      result = result.filter(p => p.status === filterStatus);
    }

    // 검색어 필터
    if (searchTerm) {
      result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 우선순위 순으로 정렬
    return result.sort((a, b) => a.priority - b.priority);
  }, [popups, filterStatus, searchTerm]);

  // 통계
  const stats = useMemo(() => {
    return {
      total: popups.length,
      active: popups.filter(p => p.status === '활성').length,
      inactive: popups.filter(p => p.status === '비활성').length,
      scheduled: popups.filter(p => p.status === '예약').length,
    };
  }, [popups]);

  // 신규 등록
  const handleAdd = () => {
    setEditingPopup(null);
    setIsFormModalOpen(true);
  };

  // 상세 조회
  const handleView = (popup: Popup) => {
    setSelectedPopup(popup);
    setIsDetailModalOpen(true);
  };

  // 수정
  const handleEdit = (popup: Popup) => {
    setEditingPopup(popup);
    setIsDetailModalOpen(false);
    setIsFormModalOpen(true);
  };

  // 삭제
  const handleDelete = (id: string) => {
    if (!confirm('정말로 이 팝업을 삭제하시겠습니까?')) return;

    deleteMutation.mutate({
      params: { id },
    });
  };

  // 저장 (신규/수정)
  const handleSave = (data: Partial<Popup>) => {
    if (editingPopup) {
      // 수정
      updateMutation.mutate({
        params: { id: editingPopup.id },
        body: {
          title: data.title!,
          content: null,
          imageUrl: data.imageUrl,
          linkUrl: data.linkUrl,
          displayType: 'POPUP',
          position: data.position,
          width: data.width,
          height: data.height,
          startDate: new Date(data.startDate!),
          endDate: new Date(data.endDate!),
          isActive: data.status !== '비활성',
          showOnce: data.showOnce,
          priority: data.priority,
        },
      });
    } else {
      // 신규
      createMutation.mutate({
        body: {
          title: data.title!,
          content: null,
          imageUrl: data.imageUrl,
          linkUrl: data.linkUrl,
          displayType: 'POPUP',
          position: data.position,
          width: data.width,
          height: data.height,
          startDate: new Date(data.startDate!),
          endDate: new Date(data.endDate!),
          isActive: data.status !== '비활성',
          showOnce: data.showOnce ?? false,
          priority: data.priority ?? 0,
        },
      });
    }
  };

  // 상태 토글
  const handleToggleStatus = (id: string) => {
    const popup = popups.find(p => p.id === id);
    if (!popup) return;

    const newIsActive = popup.status === '활성' ? false : true;

    updateMutation.mutate({
      params: { id },
      body: {
        isActive: newIsActive,
      },
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* A. 상단 헤더 */}
      <PopupHeader onAdd={handleAdd} totalCount={stats.total} />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-full space-y-8">
          {/* B. 검색 및 필터 */}
          <PopupFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* C. 통계 카드 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              label="전체 팝업"
              value={stats.total}
              icon="ri-window-line"
              color="text-gray-800"
              active={filterStatus === 'all'}
              onClick={() => setFilterStatus('all')}
            />
            <StatCard
              label="활성"
              value={stats.active}
              icon="ri-checkbox-circle-line"
              color="text-green-600"
              active={filterStatus === '활성'}
              onClick={() => setFilterStatus('활성')}
            />
            <StatCard
              label="비활성"
              value={stats.inactive}
              icon="ri-close-circle-line"
              color="text-gray-600"
              active={filterStatus === '비활성'}
              onClick={() => setFilterStatus('비활성')}
            />
            <StatCard
              label="예약"
              value={stats.scheduled}
              icon="ri-time-line"
              color="text-blue-600"
              active={filterStatus === '예약'}
              onClick={() => setFilterStatus('예약')}
            />
          </div>

          {/* D. 팝업 목록 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
                <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">팝업 목록</h2>
                <span className="text-[11px] font-bold text-gray-400">(검색결과: {filteredData.length}건)</span>
              </div>
            </div>

            {isLoading ? (
              <div className="flex h-64 items-center justify-center border border-gray-300 bg-white">
                <div className="text-center">
                  <i className="ri-loader-4-line mb-2 animate-spin text-4xl text-gray-300"></i>
                  <p className="text-[12px] font-bold text-gray-400">로딩중...</p>
                </div>
              </div>
            ) : (
              <PopupTable
                popups={filteredData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </div>

          {/* 하단 라이선스 */}
          <div className="flex justify-center py-10 text-[10px] font-black uppercase italic tracking-[0.2em] text-gray-300">
            Agape Popup Management Protocol v4.2
          </div>
        </div>
      </div>

      {/* E. 작성/수정 폼 모달 */}
      <PopupFormModal
        isOpen={isFormModalOpen}
        popup={editingPopup}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingPopup(null);
        }}
        onSave={handleSave}
      />

      {/* F. 상세보기 모달 */}
      <PopupDetailModal
        isOpen={isDetailModalOpen}
        popup={selectedPopup}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPopup(null);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5c8d5a;
        }
      `}</style>
    </div>
  );
}

// 통계 카드 컴포넌트
function StatCard({ label, value, icon, color, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer border p-4 text-left shadow-sm transition-all ${
        active ? 'border-[#5C8D5A] bg-emerald-50' : 'border-gray-200 bg-white hover:border-[#5C8D5A]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</span>
        <i className={`${icon} text-[14px] ${color}`}></i>
      </div>
      <div className="mt-2 font-mono text-2xl font-black tracking-tighter text-gray-800">{value}</div>
    </button>
  );
}
