import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<'notice' | 'gallery'>('notice');

  const notices = [
    {
      id: 1,
      title: '2024년 설 명절 운영 안내',
      date: '2024.01.15',
      category: '공지사항',
    },
    {
      id: 2,
      title: '겨울철 독감 예방접종 실시 안내',
      date: '2024.01.10',
      category: '건강정보',
    },
    {
      id: 3,
      title: '1월 특별 프로그램 안내 - 음악치료',
      date: '2024.01.05',
      category: '프로그램',
    },
  ];

  const galleryImages = [
    {
      id: 1,
      image: 'https://readdy.ai/api/search-image?query=elderly%20people%20enjoying%20art%20therapy%20painting%20activity%20in%20bright%20modern%20nursing%20home%20warm%20natural%20lighting%20soft%20beige%20background%20peaceful%20atmosphere&width=600&height=400&seq=gallery-1&orientation=landscape',
      title: '미술치료 프로그램',
      date: '2024.01.20',
    },
    {
      id: 2,
      image: 'https://readdy.ai/api/search-image?query=seniors%20participating%20in%20music%20therapy%20singing%20together%20in%20comfortable%20nursing%20home%20warm%20lighting%20soft%20neutral%20colors%20joyful%20atmosphere&width=600&height=400&seq=gallery-2&orientation=landscape',
      title: '음악치료 시간',
      date: '2024.01.18',
    },
    {
      id: 3,
      image: 'https://readdy.ai/api/search-image?query=elderly%20gardening%20activity%20in%20nursing%20home%20peaceful%20garden%20scene%20soft%20natural%20light%20warm%20beige%20and%20green%20tones%20therapeutic%20environment&width=600&height=400&seq=gallery-3&orientation=landscape',
      title: '원예치료 활동',
      date: '2024.01.15',
    },
    {
      id: 4,
      image: 'https://readdy.ai/api/search-image?query=group%20exercise%20program%20for%20elderly%20in%20modern%20facility%20bright%20spacious%20room%20soft%20neutral%20colors%20healthy%20active%20lifestyle&width=600&height=400&seq=gallery-4&orientation=landscape',
      title: '건강체조 시간',
      date: '2024.01.12',
    },
  ];

  const weeklyMenu = [
    { day: '월요일', breakfast: '쌀밥, 된장찌개, 계란찜', lunch: '현미밥, 불고기, 나물', dinner: '쌀밥, 생선구이, 된장국' },
    { day: '화요일', breakfast: '쌀밥, 미역국, 김치', lunch: '현미밥, 닭볶음탕, 샐러드', dinner: '쌀밥, 두부조림, 무국' },
    { day: '수요일', breakfast: '쌀밥, 김치찌개, 멸치볶음', lunch: '현미밥, 제육볶음, 나물', dinner: '쌀밥, 생선조림, 된장국' },
    { day: '목요일', breakfast: '쌀밥, 콩나물국, 계란후라이', lunch: '현미밥, 갈비찜, 샐러드', dinner: '쌀밥, 두부전, 미역국' },
    { day: '금요일', breakfast: '쌀밥, 북어국, 김치', lunch: '현미밥, 생선구이, 나물', dinner: '쌀밥, 불고기, 된장국' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
            알림 & 활동소식
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            센터의 새로운 소식
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-16">
          {/* 왼쪽: 최신 소식 */}
          <div className="space-y-6">
            <div className="bg-[#F9F8F6] rounded-2xl p-8">
              <div className="flex gap-2 mb-6 bg-white rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('notice')}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'notice'
                      ? 'bg-[#5C8D5A] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-notification-line mr-2"></i>
                  공지사항
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-[#5C8D5A] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-gallery-line mr-2"></i>
                  갤러리
                </button>
              </div>

              {activeTab === 'notice' && (
                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      className="bg-white rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs px-3 py-1 bg-[#5C8D5A]/10 text-[#5C8D5A] rounded-full font-semibold">
                          {notice.category}
                        </span>
                        <span className="text-xs text-gray-500">{notice.date}</span>
                      </div>
                      <h4 className="text-base font-semibold text-gray-800 hover:text-[#5C8D5A] transition-colors">
                        {notice.title}
                      </h4>
                    </div>
                  ))}
                  <a
                    href="/communities"
                    className="block text-center py-3 text-[#5C8D5A] font-semibold hover:bg-white rounded-lg transition-all cursor-pointer"
                  >
                    더보기 <i className="ri-arrow-right-line ml-1"></i>
                  </a>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.map((item) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="ri-search-line text-white text-3xl"></i>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 주간 식단표 */}
          <div>
            <div className="bg-[#F9F8F6] rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  <i className="ri-restaurant-line text-[#5C8D5A] mr-2"></i>
                  주간 식단표
                </h3>
                <span className="text-sm text-gray-600">이번 주</span>
              </div>
              <div className="space-y-3">
                {weeklyMenu.map((menu, index) => (
                  <Link
                    key={index}
                    to="/communities?category=식단표"
                    className="bg-white rounded-xl p-4 block hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-[#5C8D5A] group-hover:text-[#4A7548] transition-colors">{menu.day}</span>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:text-[#5C8D5A] transition-colors"></i>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <span className="w-16 text-gray-500 font-semibold">아침:</span>
                        <span className="text-gray-700">{menu.breakfast}</span>
                      </div>
                      <div className="flex">
                        <span className="w-16 text-gray-500 font-semibold">점심:</span>
                        <span className="text-gray-700">{menu.lunch}</span>
                      </div>
                      <div className="flex">
                        <span className="w-16 text-gray-500 font-semibold">저녁:</span>
                        <span className="text-gray-700">{menu.dinner}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 프로그램 일정 */}
        <div
          className="bg-gradient-to-br from-[#5C8D5A] to-[#7BA178] rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6">
            <i className="ri-calendar-check-line mr-2"></i>
            이달의 특별 프로그램
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <i className="ri-music-2-line text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-2">음악치료</h4>
              <p className="text-sm text-white/90 mb-3">매주 화요일 오후 2시</p>
              <p className="text-sm text-white/80">노래와 악기 연주로 즐거운 시간을 보냅니다</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <i className="ri-palette-line text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-2">미술치료</h4>
              <p className="text-sm text-white/90 mb-3">매주 목요일 오후 3시</p>
              <p className="text-sm text-white/80">그림 그리기와 만들기 활동으로 창의력을 키웁니다</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <i className="ri-run-line text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-2">건강체조</h4>
              <p className="text-sm text-white/90 mb-3">매일 오전 10시</p>
              <p className="text-sm text-white/80">가벼운 스트레칭으로 하루를 시작합니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}