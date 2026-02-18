/**
 * Description : NotificationSection.tsx - ?? NotificationSection UI ????
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { api } from '@/lib/api';

type TabType = 'notice' | 'gallery' | 'board';

export default function GalleryNoticeSection() {
  const [activeTab, setActiveTab] = useState<TabType>('notice');

  // API에서 공지사항 데이터 가져오기
  const { data: noticesData } = api.webpage.getNotices.useQuery(['webpage-notices-home'], {
    query: {
      isActive: true,
    },
  });

  // 공지사항 데이터 변환
  const latestNotices = useMemo(() => {
    if (noticesData?.status !== 200) return [];

    return (noticesData.body.data as any[]).slice(0, 3).map(notice => ({
      id: notice.id,
      title: notice.title,
      category: notice.category === 'URGENT' ? '중요' : notice.category === 'EVENT' ? '행사' : '일반',
      date: new Date(notice.publishedAt || notice.createdAt).toLocaleDateString('ko-KR'),
      views: notice.viewCount,
      isNew: new Date(notice.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
      isPinned: notice.isPinned,
    }));
  }, [noticesData]);

  // 갤러리 데이터 가져오기
  const { data: galleryItemsData } = api.webpage.getGalleryItems.useQuery(['home-gallery'], {});

  // 갤러리 데이터 변환
  const latestGallery = useMemo(() => {
    if (galleryItemsData?.status !== 200) return [];
    return (galleryItemsData.body.data as any[]).slice(0, 5).map(item => ({
      id: item.id,
      title: item.title,
      images: item.files?.map((f: any) => f.file?.url).filter(Boolean) || [],
    }));
  }, [galleryItemsData]);

  // 게시판 데이터 가져오기
  const { data: postsData } = api.webpage.getPosts.useQuery(['home-board-posts'], {
    query: {
      page: 1,
      limit: 3,
    },
  });

  // 게시판 데이터 변환
  const latestBoard = useMemo(() => {
    if (postsData?.status !== 200) return [];
    return (postsData.body.data as any[]).map(post => ({
      id: post.id,
      title: post.title,
      created_at: post.createdAt,
      view_count: post.viewCount,
      image_urls: post.files?.map((f: any) => f.file?.url).filter(Boolean) || [],
    }));
  }, [postsData]);

  // 알림마당 퀵메뉴
  const quickMenus = [
    {
      icon: 'ri-restaurant-line',
      title: '주간 식단표',
      link: '/notices/meal-plan',
    },
    {
      icon: 'ri-calendar-event-line',
      title: '프로그램 일정',
      link: '/notices/program-schedule',
    },
    {
      icon: 'ri-map-pin-line',
      title: '오시는 길',
      link: '/intro/location',
    },
    {
      icon: 'ri-file-text-line',
      title: '정규 명세서',
      link: '/documents',
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto w-[90%]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* 왼쪽: 공지사항 / 갤러리 / 게시판 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-none border border-gray-200 p-8 lg:col-span-7"
          >
            {/* 탭 헤더 */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('notice')}
                  className={`relative pb-2 text-xl font-bold transition-colors ${
                    activeTab === 'notice' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  공지사항
                  {activeTab === 'notice' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#5C8D5A]"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`relative pb-2 text-xl font-bold transition-colors ${
                    activeTab === 'gallery' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  갤러리
                  {activeTab === 'gallery' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#5C8D5A]"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('board')}
                  className={`relative pb-2 text-xl font-bold transition-colors ${
                    activeTab === 'board' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  게시판
                  {activeTab === 'board' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#5C8D5A]"
                    />
                  )}
                </button>
              </div>
              <Link
                href={
                  activeTab === 'notice'
                    ? '/notices/notice'
                    : activeTab === 'gallery'
                      ? '/notices/gallery'
                      : '/notices/board'
                }
                className="flex items-center gap-1 text-sm font-semibold text-gray-600 transition-colors hover:text-[#5C8D5A]"
              >
                더보기
                <i className="ri-add-line text-lg" />
              </Link>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
              {/* 공지사항 탭 */}
              {activeTab === 'notice' && (
                <motion.div
                  key="notice"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {latestNotices.map((notice, index) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/notices/notice/${notice.id}`}
                        className="group flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 transition-all hover:border-[#5C8D5A] hover:bg-[#5C8D5A]/5"
                      >
                        <div className="flex flex-1 items-center gap-3">
                          {notice.isPinned && <i className="ri-pushpin-fill text-lg text-[#5C8D5A]" />}
                          <span
                            className={`inline-block rounded-full border px-2 py-0.5 text-xs font-semibold ${
                              notice.category === '중요'
                                ? 'border-red-200 bg-red-50 text-red-600'
                                : notice.category === '행사'
                                  ? 'border-blue-200 bg-blue-50 text-blue-600'
                                  : 'border-[#5C8D5A]/20 bg-[#5C8D5A]/10 text-[#5C8D5A]'
                            }`}
                          >
                            {notice.category}
                          </span>
                          <h4 className="flex-1 text-sm font-semibold text-gray-900 group-hover:text-[#5C8D5A]">
                            {notice.title}
                          </h4>
                          {notice.isNew && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                              N
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{notice.date}</span>
                          <div className="flex items-center gap-1">
                            <i className="ri-eye-line" />
                            <span>{notice.views}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* 갤러리 탭 */}
              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-5 gap-4"
                >
                  {latestGallery.length > 0 ? (
                    latestGallery.map((item, index) => {
                      // 이미지 URL 가져오기 (배열 구조 대응)
                      const imageUrl = item.images?.[0] || '/images/sample.svg';

                      return (
                        <motion.div
                          key={item.id || index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Link
                            href="/notices/gallery"
                            className="group block aspect-square overflow-hidden rounded-lg bg-gray-100"
                          >
                            <img
                              src={imageUrl}
                              alt={item.title || `갤러리 이미지 ${index + 1}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={e => {
                                e.currentTarget.src = '/images/sample.svg';
                              }}
                            />
                          </Link>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="col-span-5 py-10 text-center text-gray-500">
                      <i className="ri-image-line mb-2 text-4xl" />
                      <p>등록된 갤러리가 없습니다.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 게시판 탭 */}
              {activeTab === 'board' && (
                <motion.div
                  key="board"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {latestBoard.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/notices/board/${post.id}`}
                        className="group flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 transition-all hover:border-[#5C8D5A] hover:bg-[#5C8D5A]/5"
                      >
                        <div className="flex flex-1 items-center gap-3">
                          {post.image_urls && post.image_urls.length > 0 && (
                            <i className="ri-image-line text-lg text-[#5C8D5A]" />
                          )}
                          <i className="ri-file-text-line text-xl text-gray-400 transition-colors group-hover:text-[#5C8D5A]" />
                          <h4 className="flex-1 text-sm font-semibold text-gray-900 group-hover:text-[#5C8D5A]">
                            {post.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                          <div className="flex items-center gap-1">
                            <i className="ri-eye-line" />
                            <span>{post.view_count}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 오른쪽: 알림마당 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-none border border-gray-200 bg-gray-50/30 p-8 lg:col-span-5"
          >
            <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">알림마당</h2>
              <Link
                href="/notices"
                className="flex items-center gap-1 text-sm font-semibold text-gray-600 transition-colors hover:text-[#5C8D5A]"
              >
                더보기
                <i className="ri-add-line text-lg" />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#5C8D5A] p-6 shadow-lg">
              <p className="mb-6 text-sm text-white/90">기관명문안내는 상세한 정보를 확인해주세요~</p>

              <div className="grid grid-cols-4 gap-4">
                {quickMenus.map((menu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      href={menu.link}
                      className="group flex flex-col items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                        <i className={`${menu.icon} text-3xl text-white`} />
                      </div>
                      <span className="whitespace-nowrap text-xs font-semibold text-white">{menu.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단: 계약안내 + 문의전화 */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 계약안내 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl border-2 border-[#5C8D5A]/20 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#5C8D5A]">계약안내</h3>
              <i className="ri-arrow-right-line text-xl text-gray-400" />
            </div>

            <p className="text-sm leading-relaxed text-gray-600">기관 계약절차 및 준비물을 자세히 안내해 드립니다.</p>

            <Link
              href="/process"
              className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[#5C8D5A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4A7548]"
            >
              자세히보기
            </Link>
          </motion.div>

          {/* 문의전화 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-2xl border-2 border-[#5C8D5A]/20 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-4 text-lg font-bold text-[#5C8D5A]">문의전화</h3>

            <div className="mb-2 flex items-center gap-2">
              <i className="ri-phone-line text-2xl text-[#5C8D5A]" />
              <a
                href="tel:043-832-8275"
                className="text-2xl font-bold text-gray-900 transition-colors hover:text-[#5C8D5A]"
              >
                043-832-8275
              </a>
            </div>

            <p className="text-sm text-gray-600">무엇이든지 물어보세요.</p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
