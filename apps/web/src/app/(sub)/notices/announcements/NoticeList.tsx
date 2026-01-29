'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

interface NoticeItem {
  id: number;
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

  const goDetail = (id: number) => {
    router.push(`/notices/announcements/${id}`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 shadow-lg">
        {/* Header */}
        <div className="bg-[#5C8D5A] px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-bold text-white">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-2 text-center">구분</div>
            <div className="col-span-6">제목</div>
            <div className="col-span-2 text-center">작성일</div>
            <div className="col-span-1 text-center">조회</div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white">
          {notices.map((notice, index) => (
            <div
              key={notice.id}
              role="button"
              tabIndex={0}
              onClick={() => goDetail(notice.id)}
              onKeyDown={e => e.key === 'Enter' && goDetail(notice.id)}
              className="grid cursor-pointer grid-cols-12 gap-4 border-b border-gray-200 px-6 py-4 transition-all hover:bg-gradient-to-br hover:from-teal-50 hover:to-amber-50 focus:outline-none"
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
                <span className="text-sm font-semibold text-gray-900">{notice.title}</span>
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
      </div>
    </motion.div>
  );
}
