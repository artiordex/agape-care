'use client';

import { api } from '@/lib/api';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import NoticeDetailModal from './NoticeDetailModal';
import NoticeFilter from './NoticeFilter';
import NoticeFormModal from './NoticeFormModal';
import NoticeHeader from './NoticeHeader';
import NoticeTable from './NoticeTable';
import { Notice } from './notice.type';

function categoryToEng(kor: string): string {
  const map: any = { 일반: 'GENERAL', 긴급: 'URGENT', 교육: 'EDUCATION', 행사: 'EVENT', 점검: 'MAINTENANCE' };
  return map[kor] || 'GENERAL';
}

function categoryToKor(eng: string | null): any {
  const map: any = { GENERAL: '일반', URGENT: '긴급', EDUCATION: '교육', EVENT: '행사', MAINTENANCE: '점검' };
  return map[eng || 'GENERAL'] || '일반';
}

/**
 * [Page] 아가페 공지사항 통합 관리 시스템
 * image_102a40.png의 검색 및 테이블 디자인 통합 반영
 * 완전한 CRUD 기능 포함
 */
export default function NoticeManagementPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Notice | null>(null);
  const [editingItem, setEditingItem] = useState<Notice | null>(null);

  // API Hooks
  const { data: noticesData, refetch } = api.content.getNotices.useQuery({
    queryKey: ['notices'],
    query: {
      category: filterCategory === 'all' ? undefined : categoryToEng(filterCategory),
      isActive: true,
    },
  });

  const createNotice = api.content.createNotice.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormModalOpen(false);
      alert('✅ 새로운 공지사항이 등록되었습니다.');
    },
  });

  const updateNotice = api.content.updateNotice.useMutation({
    onSuccess: () => {
      refetch();
      setIsFormModalOpen(false);
      alert('✅ 공지사항이 수정되었습니다.');
    },
  });

  const deleteNotice = api.content.deleteNotice.useMutation({
    onSuccess: () => {
      refetch();
      setIsDetailModalOpen(false);
      alert('✅ 공지사항이 삭제되었습니다.');
    },
  });

  // 데이터 매핑 (API -> UI)
  useEffect(() => {
    if (noticesData?.status === 200) {
      const mapped: Notice[] = noticesData.body.data.map((notice: any) => ({
        id: notice.id,
        category: categoryToKor(notice.category),
        title: notice.title,
        author: notice.creator?.name || '관리자',
        createdAt: format(new Date(notice.createdAt), 'yyyy.MM.dd'),
        views: notice.viewCount || 0,
        content: notice.content,
        isPinned: notice.isPinned,
        attachments: [],
      }));
      setNotices(mapped);
    }
  }, [noticesData]);

  // 2. 실시간 필터링 엔진
  const filteredData = useMemo(() => {
    return notices
      .filter(item => {
        const matchSearch =
          item.title.includes(searchTerm) || item.content.includes(searchTerm) || item.author.includes(searchTerm);
        const matchCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchSearch && matchCategory;
      })
      .sort((a, b) => {
        // 고정 공지사항 우선
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        // 날짜 최신순
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [notices, searchTerm, filterCategory]);

  // 3. 조회수 증가
  const incrementViews = (id: string) => {
    const item = notices.find(a => a.id === id);
    if (!item) return;

    updateNotice.mutate({
      params: { id },
      body: { viewCount: item.views + 1 },
    });
  };

  // 4. 신규 등록
  const handleAdd = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  // 5. 상세 조회
  const handleView = (item: Notice) => {
    incrementViews(item.id);
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  // 6. 수정
  const handleEdit = (item: Notice) => {
    setEditingItem(item);
    setIsDetailModalOpen(false);
    setIsFormModalOpen(true);
  };

  // 7. 삭제
  const handleDelete = (id: string) => {
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) return;
    deleteNotice.mutate({ params: { id }, body: {} });
  };

  // 8. 저장 (신규/수정)
  const handleSave = (data: Partial<Notice>) => {
    const apiBody = {
      title: data.title || '',
      content: data.content || '',
      category: categoryToEng(data.category || '일반'),
      isPinned: data.isPinned || false,
      isActive: true,
      publishedAt: new Date(),
    };

    if (editingItem) {
      updateNotice.mutate({
        params: { id: editingItem.id },
        body: apiBody,
      });
    } else {
      createNotice.mutate({
        body: apiBody,
      });
    }
    setEditingItem(null);
  };

  // 9. 고정 토글
  const handleTogglePin = (id: string) => {
    const item = notices.find(a => a.id === id);
    if (!item) return;

    updateNotice.mutate({
      params: { id },
      body: { isPinned: !item.isPinned },
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* A. 상단 액션 헤더 */}
      <NoticeHeader onAdd={handleAdd} totalCount={notices.length} />

      <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-full space-y-8">
          {/* B. 검색 필터 섹션 */}
          <NoticeFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />

          {/* C. 통계 요약 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard label="전체 공지" value={notices.length} icon="ri-notification-line" color="text-gray-800" />
            <StatCard
              label="고정 공지"
              value={notices.filter(a => a.isPinned).length}
              icon="ri-pushpin-2-fill"
              color="text-[#5C8D5A]"
            />
            <StatCard
              label="금일 등록"
              value={
                notices.filter(
                  a => a.createdAt === new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, ''),
                ).length
              }
              icon="ri-calendar-check-line"
              color="text-blue-600"
            />
            <StatCard
              label="총 조회수"
              value={notices.reduce((sum, a) => sum + a.views, 0)}
              icon="ri-eye-line"
              color="text-purple-600"
            />
          </div>

          {/* D. 공지사항 데이터 그리드 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
                <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">전체 공지사항 목록</h2>
                <span className="text-[11px] font-bold text-gray-400">(검색결과: {filteredData.length}건)</span>
              </div>
            </div>

            <NoticeTable
              notices={filteredData}
              onSelect={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePin={handleTogglePin}
            />
          </div>
        </div>
      </div>

      {/* E. 작성/수정 폼 모달 */}
      <NoticeFormModal
        isOpen={isFormModalOpen}
        notice={editingItem}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
      />

      {/* F. 상세보기 모달 */}
      <NoticeDetailModal
        isOpen={isDetailModalOpen}
        notice={selectedItem}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedItem(null);
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
function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#5C8D5A]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</span>
        <i className={`${icon} text-[14px] ${color}`}></i>
      </div>
      <div className="mt-2 font-mono text-2xl font-black tracking-tighter text-gray-800">{value.toLocaleString()}</div>
    </div>
  );
}
