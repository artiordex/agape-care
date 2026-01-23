'use client';

import { useState } from 'react';
import Link from 'next/link';

import NoticeSidebar from '@/components/NoticeSidebar';
import { communitiesMock } from '@/mocks/communities';

export default function CommunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const categories = ['전체', '공지사항', '활동소식', '이벤트'];

  const filteredPosts = communitiesMock.filter(post => {
    const matchCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Hero Section */}
      <div className="mb-12 border-b border-gray-100 bg-gradient-to-br from-teal-50 via-white to-amber-50 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">공지사항</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            요양센터의 새로운 소식과 중요한 안내를 확인하실 수 있습니다
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mb-12 border-b border-gray-100 bg-gray-50/80 py-4">
        <div className="flex gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-600">
            홈
          </Link>
          <i className="ri-arrow-right-s-line" />
          <span>알림마당</span>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <NoticeSidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`rounded-full px-6 py-2.5 transition-all ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative mb-12 max-w-md">
            <input
              type="text"
              placeholder="제목 또는 내용으로 검색하세요"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-teal-500"
            />
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
          </div>

          {/* Posts */}
          {currentPosts.length > 0 ? (
            <div className="space-y-4">
              {currentPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/communities/detail?id=${post.id}`}
                  className="group block rounded-xl border border-gray-200 bg-white p-6 hover:border-teal-200 hover:shadow-lg"
                >
                  <div className="flex gap-6">
                    {post.image && (
                      <div className="hidden h-32 w-48 overflow-hidden rounded-lg md:block">
                        <img
                          src={post.image}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      {/* Category Badge */}
                      <span
                        className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          post.category === '공지사항'
                            ? 'bg-teal-50 text-teal-700'
                            : post.category === '활동소식'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {post.category}
                      </span>

                      {/* Title */}
                      <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-teal-600">{post.title}</h3>

                      <p className="mb-4 line-clamp-2 text-gray-600">{post.excerpt}</p>

                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-user-line" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-eye-line" />
                          조회 {post.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <i className="ri-search-line mb-4 text-6xl text-gray-300" />
              <p className="text-gray-600">검색 결과가 없습니다</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    currentPage === i + 1 ? 'bg-teal-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
