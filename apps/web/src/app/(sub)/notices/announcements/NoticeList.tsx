/**
 * Description : NoticeList.tsx - 📌 공지사항 리스트
 * Author : Shiwoo Min
 * Date : 2026-02-02
 */

'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

interface NoticeItem {
  id: string | number;
  category: string;
  title: string;
  date: string;
  views: number;
  isNew: boolean;
  isPinned: boolean;
}

export default function NoticeList({ notices }: { readonly notices: NoticeItem[] }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const router = useRouter();

  const goDetail = (id: string | number) => {
    router.push(`/notices/announcements/${id}`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mt-8"
    >
      <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b-2 border-[#5C8D5A]/30 bg-[#5C8D5A]/5 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-bold text-gray-700">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-2 text-center">구분</div>
            <div className="col-span-6">제목</div>
            <div className="col-span-2 text-center">작성일</div>
            <div className="col-span-1 text-center">조회</div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white">
          {notices.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <i className="ri-file-list-line text-3xl text-gray-400" />
              </div>
              <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            notices.map((notice, index) => (
              <div
                key={notice.id}
                role="button"
                tabIndex={0}
                onClick={() => goDetail(notice.id)}
                onKeyDown={e => e.key === 'Enter' && goDetail(notice.id)}
                className="grid cursor-pointer grid-cols-12 gap-4 border-b border-gray-200 px-6 py-4 transition-all last:border-b-0 hover:bg-[#5C8D5A]/5 focus:outline-none"
              >
                {/* 번호 */}
                <div className="col-span-1 text-center">
                  {notice.isPinned ? (
                    <i className="ri-pushpin-fill text-lg text-[#5C8D5A]" />
                  ) : (
                    <span className="text-sm text-gray-600">{notices.length - index}</span>
                  )}
                </div>

                {/* 카테고리 */}
                <div className="col-span-2 text-center">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                      notice.category === '중요'
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : notice.category === '행사'
                          ? 'border-blue-200 bg-blue-50 text-blue-600'
                          : 'border-[#5C8D5A]/20 bg-[#5C8D5A]/10 text-[#5C8D5A]'
                    }`}
                  >
                    {notice.category}
                  </span>
                </div>

                {/* 제목 */}
                <div className="col-span-6 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 hover:text-[#5C8D5A]">{notice.title}</span>
                  {notice.isNew && (
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      N
                    </span>
                  )}
                </div>

                {/* 날짜 */}
                <div className="col-span-2 text-center text-sm text-gray-600">{notice.date}</div>

                {/* 조회수 */}
                <div className="col-span-1 text-center text-sm text-gray-600">{notice.views}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
