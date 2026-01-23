'use client';

import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

import AppShell from '@/components/AppShell';

export default function NoticePage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });

  const notices = [
    {
      id: 1,
      category: '중요',
      title: '2024년 설날 연휴 운영 안내',
      date: '2024.01.15',
      views: 245,
      isNew: true,
      isPinned: true,
    },
    {
      id: 2,
      category: '공지',
      title: '면회 시간 변경 안내',
      date: '2024.01.10',
      views: 189,
      isNew: true,
      isPinned: true,
    },
    {
      id: 3,
      category: '행사',
      title: '1월 생신 잔치 안내',
      date: '2024.01.08',
      views: 156,
      isNew: true,
      isPinned: false,
    },
    {
      id: 4,
      category: '공지',
      title: '독감 예방접종 실시 안내',
      date: '2024.01.05',
      views: 203,
      isNew: false,
      isPinned: false,
    },
    {
      id: 5,
      category: '행사',
      title: '신년 음악회 개최 안내',
      date: '2024.01.03',
      views: 178,
      isNew: false,
      isPinned: false,
    },
    {
      id: 6,
      category: '공지',
      title: '겨울철 난방 및 실내 온도 관리 안내',
      date: '2023.12.28',
      views: 142,
      isNew: false,
      isPinned: false,
    },
    {
      id: 7,
      category: '행사',
      title: '크리스마스 특별 행사 결과 보고',
      date: '2023.12.26',
      views: 198,
      isNew: false,
      isPinned: false,
    },
    {
      id: 8,
      category: '공지',
      title: '연말연시 면회 예약 안내',
      date: '2023.12.20',
      views: 167,
      isNew: false,
      isPinned: false,
    },
    {
      id: 9,
      category: '행사',
      title: '12월 생신 잔치 안내',
      date: '2023.12.15',
      views: 134,
      isNew: false,
      isPinned: false,
    },
    {
      id: 10,
      category: '공지',
      title: '겨울철 건강관리 안내',
      date: '2023.12.10',
      views: 156,
      isNew: false,
      isPinned: false,
    },
  ];

  const quickLinks = [
    {
      title: '입소 상담',
      description: '입소 절차 및 비용 상담',
      icon: 'ri-customer-service-2-line',
      link: '#contact',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '면회 예약',
      description: '면회 일정 예약하기',
      icon: 'ri-calendar-check-line',
      link: '/visit',
      color: 'from-green-500 to-green-600',
    },
    {
      title: '프로그램 일정',
      description: '월간 프로그램 확인',
      icon: 'ri-calendar-line',
      link: '/programs',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: '식단표',
      description: '주간 식단 확인',
      icon: 'ri-restaurant-line',
      link: '/meal-plan',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 pb-20 pt-10">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=modern%20notice%20board%20information%20desk%20in%20bright%20elderly%20care%20facility%20with%20organized%20announcements%20and%20comfortable%20reading%20area%20clean%20professional%20interior%20design%20with%20natural%20lighting&width=1920&height=600&seq=notice-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <i className="ri-megaphone-line text-xl text-[#5C8D5A]" />
              <span className="text-sm font-semibold text-gray-700">공지사항</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">공지사항</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              시설 운영 및 행사에 관한 중요한 소식을
              <br />
              빠르고 정확하게 전해드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 공지사항 목록 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* 메인 공지 */}
            <div className="lg:col-span-2">
              <motion.div
                ref={ref1}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 shadow-lg">
                  {/* 헤더 */}
                  <div className="bg-[#5C8D5A] px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 text-sm font-bold text-white">
                      <div className="col-span-1 text-center">번호</div>
                      <div className="col-span-2 text-center">구분</div>
                      <div className="col-span-6">제목</div>
                      <div className="col-span-2 text-center">작성일</div>
                      <div className="col-span-1 text-center">조회</div>
                    </div>
                  </div>

                  {/* 리스트 */}
                  <div className="bg-white">
                    {notices.map((notice, index) => (
                      <div
                        key={notice.id}
                        className="grid cursor-pointer grid-cols-12 gap-4 border-b border-gray-200 px-6 py-4 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50"
                      >
                        <div className="col-span-1 text-center">
                          {notice.isPinned ? (
                            <i className="ri-pushpin-fill text-[#5C8D5A]" />
                          ) : (
                            <span className="text-sm text-gray-600">{notices.length - index}</span>
                          )}
                        </div>
                        <div className="col-span-2 text-center">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                              notice.category === '중요'
                                ? 'bg-red-100 text-red-600'
                                : notice.category === '행사'
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {notice.category}
                          </span>
                        </div>
                        <div className="col-span-6 flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 transition-colors hover:text-[#5C8D5A]">
                            {notice.title}
                          </span>
                          {notice.isNew && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                              N
                            </span>
                          )}
                        </div>
                        <div className="col-span-2 text-center text-sm text-gray-600">{notice.date}</div>
                        <div className="col-span-1 text-center text-sm text-gray-600">{notice.views}</div>
                      </div>
                    ))}
                  </div>

                  {/* 페이지네이션 */}
                  <div className="border-t border-gray-200 bg-white px-6 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200">
                        <i className="ri-arrow-left-s-line text-gray-600" />
                      </button>

                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5C8D5A] font-bold text-white">
                        1
                      </button>

                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-semibold text-gray-600 hover:bg-gray-200">
                        2
                      </button>

                      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors hover:bg-gray-200">
                        <i className="ri-arrow-right-s-line text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 오른쪽 사이드바 */}
            <div className="space-y-6">
              {/* 검색 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 shadow-md"
              >
                <h3 className="mb-4 text-lg font-bold text-gray-900">공지사항 검색</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
                  />
                  <button className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-[#5C8D5A] text-white hover:bg-[#4A7548]">
                    <i className="ri-search-line" />
                  </button>
                </div>
              </motion.div>

              {/* 빠른 링크 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md"
              >
                <h3 className="mb-4 text-lg font-bold text-gray-900">빠른 메뉴</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className="flex cursor-pointer items-center gap-4 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-4 transition-all hover:shadow-md"
                    >
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.color}`}
                      >
                        <i className={`${link.icon} text-xl text-white`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">{link.title}</div>
                        <div className="text-xs text-gray-600">{link.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* 연락처 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="rounded-2xl bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] p-6 text-white shadow-md"
              >
                <h3 className="mb-4 text-lg font-bold">문의하기</h3>
                <div className="space-y-3">
                  <a
                    href="tel:02-1234-5678"
                    className="flex cursor-pointer items-center gap-3 rounded-lg bg-white/10 p-3 transition-all hover:bg-white/20"
                  >
                    <i className="ri-phone-line text-xl" />
                    <div>
                      <div className="text-xs opacity-80">전화 문의</div>
                      <div className="text-sm font-bold">02-1234-5678</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                    <i className="ri-time-line text-xl" />
                    <div>
                      <div className="text-xs opacity-80">운영 시간</div>
                      <div className="text-sm font-bold">평일 09:00 - 18:00</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">더 궁금하신 사항이 있으신가요?</h2>
            <p className="mb-8 text-lg text-gray-600">언제든지 편하게 문의해주세요</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="cursor-pointer rounded-xl bg-[#5C8D5A] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#4A7548]"
              >
                <i className="ri-customer-service-2-line mr-2" />
                상담 신청하기
              </a>

              <a
                href="/visit"
                className="cursor-pointer rounded-xl border-2 border-[#5C8D5A] bg-white px-8 py-4 font-bold text-[#5C8D5A] transition-all hover:bg-[#5C8D5A] hover:text-white"
              >
                <i className="ri-calendar-check-line mr-2" />
                면회 예약하기
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </AppShell>
  );
}
