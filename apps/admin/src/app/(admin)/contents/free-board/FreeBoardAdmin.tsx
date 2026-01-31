'use client';

import React, { useState, useMemo } from 'react';
import { FreeBoardPost, FreeBoardFilter as FilterType, FreeBoardFormValues } from './free-board.type';

// 하위 컴포넌트 임포트
import FreeBoardHeader from './FreeBoardHeader';
import FreeBoardFilter from './FreeBoardFilter';
import FreeBoardTable from './FreeBoardTable';
import FreeBoardFormModal from './FreeBoardFormModal';
import FreeBoardDetailModal from './FreeBoardDetailModal';

interface Props {
  readonly initialData: FreeBoardPost[];
}

/**
 * [Component] 자유게시판 통합 관리 컨트롤러
 * 고정형 레이아웃(Fixed Header/Footer) 및 아가페 그린(#5C8D5A) 테마 적용
 */
export default function FreeBoardAdmin({ initialData }: Props) {
  // --- 상태 관리 ---
  const [posts, setPosts] = useState<FreeBoardPost[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>({
    category: '전체',
    searchType: 'title',
    searchKeyword: '',
  });

  // 모달 제어 상태
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FreeBoardPost | null>(null);

  // --- 필터링 로직 ---
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = filter.category === '전체' || post.category === filter.category;
      const keyword = filter.searchKeyword.toLowerCase();

      let matchesSearch = false;
      if (filter.searchType === 'title') matchesSearch = post.title.toLowerCase().includes(keyword);
      if (filter.searchType === 'author') matchesSearch = post.authorName.toLowerCase().includes(keyword);
      if (filter.searchType === 'content') matchesSearch = post.content.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [posts, filter]);

  // --- 핸들러 함수 ---
  const handleOpenAddModal = () => {
    setSelectedPost(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (post: FreeBoardPost) => {
    setSelectedPost(post);
    setIsDetailOpen(false);
    setIsFormOpen(true);
  };

  const handleOpenDetailModal = (post: FreeBoardPost) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      setPosts(posts.filter(p => p.id !== id));
      setIsDetailOpen(false);
    }
  };

  const handleSubmitForm = (values: FreeBoardFormValues) => {
    if (selectedPost) {
      setPosts(
        posts.map(p => (p.id === selectedPost.id ? { ...p, ...values, updatedAt: new Date().toISOString() } : p)),
      );
    } else {
      const newPost: FreeBoardPost = {
        id: Date.now().toString(),
        ...values,
        authorName: '관리자',
        authorId: 'admin_me',
        viewCount: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
    }
    setIsFormOpen(false);
  };

  return (
    /** * [구조] flex h-screen과 overflow-hidden을 통해
     * 헤더와 푸터를 고정하고 본문만 스크롤시킵니다.
     */
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5] font-sans antialiased">
      {/* 1. [FIXED] 상단 고정 헤더 */}
      <FreeBoardHeader totalCount={posts.length} onAddClick={handleOpenAddModal} />

      {/* 2. [SCROLLABLE] 메인 콘텐츠 영역 */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-full space-y-8 text-left">
          {/* 대시보드 스탯 카드 섹션 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              label="전체 게시글"
              value={posts.length}
              unit="POSTS"
              icon="ri-article-line"
              color="text-gray-800"
            />
            <StatCard
              label="공지사항"
              value={posts.filter(p => p.isNotice).length}
              unit="NOTICES"
              icon="ri-notification-3-line"
              color="text-[#5C8D5A]"
            />
            <StatCard
              label="숨김 처리"
              value={posts.filter(p => p.status === '숨김').length}
              unit="HIDDEN"
              icon="ri-eye-off-line"
              color="text-orange-500"
            />
            <StatCard label="오늘의 신규" value={3} unit="TODAY" icon="ri-chat-new-line" color="text-blue-500" />
          </div>

          {/* 필터 섹션 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-4">
              <h2 className="text-[14px] font-black uppercase italic tracking-tight text-gray-800">
                Content Filtering
              </h2>
            </div>
            <FreeBoardFilter onFilterChange={setFilter} />
          </div>

          {/* 데이터 테이블 섹션 */}
          <div className="space-y-4 pb-12">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2 text-[#5C8D5A]">
                <i className="ri-list-settings-line text-lg"></i>
                <h2 className="text-[14px] font-black uppercase tracking-tight text-gray-800">Post Registry</h2>
                <span className="text-[11px] font-bold text-gray-400">
                  | Total Searched: {filteredPosts.length} items
                </span>
              </div>
            </div>
            <FreeBoardTable
              posts={filteredPosts}
              onEdit={handleOpenEditModal}
              onDelete={handleDeletePost}
              onDetail={handleOpenDetailModal}
            />
          </div>
        </div>
      </div>

      {/* 3. [FIXED] 하단 시스템 액션 바 */}
      <div className="flex shrink-0 items-center justify-between border-t border-gray-200 bg-white px-8 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        <div className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
          Agape-Care Content Administration Protocol v4.2
        </div>
        <div className="flex gap-2">
          <button className="rounded-none bg-gray-800 px-6 py-2 text-[11px] font-black uppercase text-white transition-all hover:bg-gray-900">
            데이터 일괄 추출
          </button>
          <button
            onClick={handleOpenAddModal}
            className="rounded-none bg-[#5C8D5A] px-6 py-2 text-[11px] font-black uppercase text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548]"
          >
            신규 게시글 등록
          </button>
        </div>
      </div>

      {/* 모달 레이어 */}
      <FreeBoardFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={selectedPost}
      />

      <FreeBoardDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        post={selectedPost}
        onEdit={handleOpenEditModal}
        onDelete={handleDeletePost}
      />

      {/* 아가페 그린 전용 스크롤바 */}
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

/** [Internal] 통계 요약 카드 */
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
