/**
 * Description : LocationMap.tsx - 📌 위치 지도 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function LocationMap() {
  // 실제 사용 시: 네이버 지도에서 '공유' -> 'HTML 태그 복사'를 통해 받은 src 주소
  const naverMapSrc =
    'https://map.naver.com/v5/search/서울특별시%20중구%20세종대로%20110/address/14135017.348618764,3752002.503468087,15,0,0,0,dh';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="font-['Pretendard'] lg:col-span-2"
    >
      <div className="group relative h-[700px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        {/* 지도를 감싸는 내부 프레임 */}
        <div className="h-full w-full overflow-hidden rounded-xl bg-gray-50">
          <iframe
            src={naverMapSrc}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }} // 지도 색감을 살짝 정돈
            allowFullScreen
            loading="lazy"
            title="네이버 지도 - 아가페 요양원"
          />
        </div>

        {/* 지도 우측 하단 안내 뱃지 */}
        <div className="absolute bottom-6 right-6 z-10 hidden md:block">
          <a
            href="https://map.naver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-lg transition-transform hover:scale-105"
          >
            <span className="h-2 w-2 rounded-full bg-[#03C75A]" />네이버 지도에서 크게보기
          </a>
        </div>
      </div>
    </motion.div>
  );
}
