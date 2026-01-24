'use client';

import React, { useState, useMemo } from 'react';

// --- 인터페이스 정의 ---
interface AlbumPost {
  id: string;
  title: string;
  programName: string;
  category: '행사' | '일상' | '인지프로그램' | '여가활동';
  thumbnail: string;
  imageCount: number;
  author: string;
  createdAt: string;
  status: '공개' | '비공개';
}

export default function ProgramAlbumPage() {
  // 1. 상태 관리
  const [posts, setPosts] = useState<AlbumPost[]>([
    {
      id: '1',
      title: '새해 맞이 떡만들기 활동',
      programName: '전통놀이 체험',
      category: '인지프로그램',
      thumbnail: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400&auto=format&fit=crop',
      imageCount: 8,
      author: '박사회복지사',
      createdAt: '2026-01-20',
      status: '공개',
    },
    {
      id: '2',
      title: '겨울철 건강 체조',
      programName: '신체활동 프로그램',
      category: '여가활동',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop',
      imageCount: 5,
      author: '이지나 간호사',
      createdAt: '2026-01-15',
      status: '공개',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체 카테고리');
  const [showModal, setShowModal] = useState(false);

  // 2. 검색 및 필터링 로직
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchSearch = post.title.includes(searchQuery) || post.programName.includes(searchQuery);
      const matchCategory = selectedCategory === '전체 카테고리' || post.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // 3. 핸들러
  const handleDelete = (id: string) => {
    if (confirm('정말 이 앨범 게시글을 삭제하시겠습니까?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* --- 상단 헤더 섹션 --- */}
      <header className="mx-auto mb-10 flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900">
            <span className="rounded-2xl bg-emerald-600 p-2 text-white shadow-lg shadow-emerald-200">
              <i className="ri-image-2-line text-xl"></i>
            </span>
            프로그램 참여앨범 관리
          </h1>
          <p className="ml-1 mt-2 font-medium text-gray-500">
            보호자분들에게 전해드리는 어르신들의 소중한 활동 모습을 관리합니다.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-95"
        >
          <i className="ri-add-circle-fill text-lg"></i>새 앨범 게시글 작성
        </button>
      </header>

      {/* --- 필터 및 검색 컨트롤 --- */}
      <section className="mx-auto mb-8 flex max-w-7xl flex-col items-center justify-between gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:flex-row">
        <div className="flex w-full flex-1 items-center gap-4 md:w-auto">
          <div className="relative max-w-md flex-1">
            <i className="ri-search-2-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="게시글 제목 또는 프로그램명으로 찾기"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-none bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="cursor-pointer appearance-none rounded-2xl border-none bg-gray-50 px-6 py-3 text-sm font-bold text-gray-600 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {['전체 카테고리', '행사', '일상', '인지프로그램', '여가활동'].map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm font-bold text-gray-400">
          총 <span className="text-emerald-600">{filteredPosts.length}</span>개의 앨범
        </div>
      </section>

      {/* --- 앨범 그리드 리스트 --- */}
      <main className="mx-auto max-w-7xl">
        {filteredPosts.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 grid grid-cols-1 gap-6 duration-500 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="group overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm transition-all hover:border-emerald-100 hover:shadow-xl"
              >
                {/* 썸네일 영역 */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur-md">
                    <i className="ri-camera-fill"></i> {post.imageCount}장
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex w-full gap-2">
                      <button className="flex-1 rounded-xl bg-white/20 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-emerald-600">
                        수정
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}
                        className="flex-1 rounded-xl bg-red-500/20 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-red-500"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>

                {/* 정보 영역 */}
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-bold tracking-tighter text-gray-300">{post.createdAt}</span>
                  </div>
                  <h3 className="mb-1 line-clamp-1 font-black text-gray-900 transition-colors group-hover:text-emerald-600">
                    {post.title}
                  </h3>
                  <p className="flex items-center gap-1 text-xs font-medium text-gray-400">
                    <i className="ri-map-pin-user-line text-[10px]"></i> {post.programName}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4 text-[10px] font-bold text-gray-400">
                    <span>작성자: {post.author}</span>
                    <span className={post.status === '공개' ? 'text-blue-500' : 'text-gray-400'}>
                      ● {post.status}상태
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 빈 데이터 상태 */
          <div className="rounded-[3rem] border border-gray-100 bg-white py-32 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
              <i className="ri-image-line text-5xl text-gray-200"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-400">등록된 앨범 데이터가 없습니다</h3>
            <p className="mt-2 text-sm font-medium text-gray-300">
              검색어나 카테고리를 변경하거나 새로운 활동을 올려주세요.
            </p>
          </div>
        )}
      </main>

      {/* --- 작성 모달 (상세 입력) --- */}
      {showModal && (
        <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900">새 프로그램 앨범 작성</h2>
                <p className="mt-1 text-sm font-medium text-gray-400">활동 내용과 사진을 보호자님들께 공유합니다.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-gray-400 transition-colors hover:bg-gray-100"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </header>

            <div className="space-y-8 overflow-y-auto p-8">
              {/* 기본 정보 입력 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-gray-400">
                    게시글 제목
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="예: 봄맞이 야외 산책"
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-gray-400">
                    프로그램 카테고리
                  </label>
                  <select className="w-full cursor-pointer appearance-none rounded-2xl border-none bg-gray-50 px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>행사</option>
                    <option>일상</option>
                    <option>인지프로그램</option>
                    <option>여가활동</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-gray-400">
                  상세 활동 설명
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-3xl border-none bg-gray-50 p-6 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="활동 내용에 대한 간단한 설명을 입력해 주세요."
                ></textarea>
              </div>

              {/* 이미지 업로드 영역 */}
              <div className="space-y-3">
                <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-gray-400">
                  활동 사진 업로드 (최대 20장)
                </label>
                <div className="group flex cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-gray-100 p-10 transition-all hover:border-emerald-200 hover:bg-emerald-50/50">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-600 transition-transform group-hover:scale-110">
                    <i className="ri-image-add-line"></i>
                  </div>
                  <p className="text-sm font-black text-gray-600">사진 파일을 드래그하거나 클릭하세요</p>
                  <p className="mt-2 text-[11px] text-gray-400">JPG, PNG, HEIC 파일 지원 / 한 장당 최대 10MB</p>
                  <input type="file" multiple className="hidden" accept="image/*" />
                </div>
              </div>
            </div>

            <footer className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-8">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-bold text-gray-500 transition-all hover:bg-gray-100"
              >
                취소
              </button>
              <button className="rounded-2xl bg-emerald-600 px-12 py-4 font-black text-white shadow-xl shadow-emerald-200 transition-all hover:bg-emerald-700">
                게시글 등록하기
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
