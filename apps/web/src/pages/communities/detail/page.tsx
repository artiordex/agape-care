import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import FloatingSidebar from '../../../components/feature/FloatingSidebar';
import { communityDetailMock } from '../../../mocks/communityDetail';

export default function CommunityDetailPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '1';
  
  const article = communityDetailMock.find(item => item.id === id) || communityDetailMock[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <FloatingSidebar />
      
      <main className="flex-grow pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50/80 py-4 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-teal-600 transition-colors">홈</Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <Link to="/communities" className="hover:text-teal-600 transition-colors">알림마당</Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-700">{article.title}</span>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-3">
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
              article.category === '공지사항' 
                ? 'bg-teal-50 text-teal-700'
                : article.category === '활동소식'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-blue-50 text-blue-700'
            }`}>
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <i className="ri-calendar-line"></i>
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-user-line"></i>
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-eye-line"></i>
              <span>조회 {article.views}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <div className="prose prose-lg max-w-none">
            {/* Featured Image */}
            {article.image && (
              <div className="mb-10 rounded-xl overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="text-gray-700 leading-relaxed space-y-6">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              {article.prevPost && (
                <Link
                  to={`/communities/detail?id=${article.prevPost.id}`}
                  className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group flex-1"
                >
                  <i className="ri-arrow-left-line text-xl text-gray-400 group-hover:text-teal-600 transition-colors"></i>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 mb-1">이전 글</div>
                    <div className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors line-clamp-1">
                      {article.prevPost.title}
                    </div>
                  </div>
                </Link>
              )}
              
              {article.nextPost && (
                <Link
                  to={`/communities/detail?id=${article.nextPost.id}`}
                  className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group flex-1 justify-end text-right"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">다음 글</div>
                    <div className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors line-clamp-1">
                      {article.nextPost.title}
                    </div>
                  </div>
                  <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-teal-600 transition-colors"></i>
                </Link>
              )}
            </div>
          </div>

          {/* Back to List Button */}
          <div className="mt-10 text-center">
            <Link
              to="/communities"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-medium shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <i className="ri-list-check-2"></i>
              <span>목록으로 돌아가기</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}