import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';
import NoticeSidebar from '../../components/feature/NoticeSidebar';
import { communitiesMock } from '../../mocks/communities';

export default function CommunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const categories = ['전체', '공지사항', '활동소식', '이벤트'];

  const filteredPosts = communitiesMock.filter(post => {
    const matchCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <FloatingSidebar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-teal-50 via-white to-amber-50 py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                공지사항
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                요양센터의 새로운 소식과 중요한 안내를 확인하실 수 있습니다
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-gray-50/80 py-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-teal-600 transition-colors">홈</Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-700">알림마당</span>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-700">공지사항</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <NoticeSidebar />

            {/* Main Content */}
            <div className="flex-1">
              {/* Filter & Search Section */}
              <div className="mb-12">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap ${
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
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="제목 또는 내용으로 검색하세요"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                </div>
              </div>

              {/* Posts List */}
              {currentPosts.length > 0 ? (
                <div className="space-y-4">
                  {currentPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/communities/detail?id=${post.id}`}
                      className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition-all group"
                    >
                      <div className="flex items-start gap-6">
                        {/* Image */}
                        {post.image && (
                          <div className="hidden md:block w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Category Badge */}
                          <div className="mb-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              post.category === '공지사항' 
                                ? 'bg-teal-50 text-teal-700'
                                : post.category === '활동소식'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}>
                              {post.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <i className="ri-calendar-line"></i>
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <i className="ri-user-line"></i>
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <i className="ri-eye-line"></i>
                              <span>조회 {post.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <i className="ri-search-line text-4xl text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-gray-600">
                    다른 검색어나 카테고리를 선택해보세요
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredPosts.length > 0 && totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${
                        currentPage === 1 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      <i className="ri-arrow-left-s-line text-gray-600"></i>
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors whitespace-nowrap ${
                            currentPage === pageNumber
                              ? 'bg-teal-600 text-white'
                              : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${
                        currentPage === totalPages 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      <i className="ri-arrow-right-s-line text-gray-600"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}