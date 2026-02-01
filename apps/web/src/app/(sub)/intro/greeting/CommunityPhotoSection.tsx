/**
 * Description : CommunityPhotoSection.tsx - 📌 회색 이중 프레임 및 간격 최적화 버전
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function CommunityPhotoSection() {
  return (
    /* pt-0으로 상단 여백, pb-20으로 하단에만 여백 */
    <section className="bg-[#F8F9FA] pb-20 pt-0">
      <div className="mx-auto w-[90%] max-w-[1600px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mx-auto"
        >
          {/* 외부 회색 테두리 프레임 */}
          <div className="group relative overflow-hidden rounded-sm border border-gray-200 bg-white p-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] md:p-8">
            {/* 내부 사진 영역 21/9 */}
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[1px] bg-gray-100 ring-1 ring-gray-200/50">
              <img
                src="/images/sample.svg"
                alt="아가페 요양센터 일동"
                className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />

              {/* 광택 효과 레이어 */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-50" />

              {/* 무빙 리플렉션 효과 */}
              <motion.div
                initial={{ x: '-100%', y: '-100%' }}
                whileHover={{ x: '100%', y: '100%' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"
              />
            </div>

            {/* 하단 텍스트 영역 (간격에 맞춰 pt 조절) */}
            <div className="pt-6 text-center">
              <p className="mt-2 text-[10px] font-medium tracking-[0.1em] text-gray-300 md:text-xs">
                2026 February Community Moment
              </p>
            </div>
          </div>

          {/* 바닥 그림자 디테일 */}
          <div className="absolute -bottom-6 left-10 right-10 -z-10 h-12 rounded-[100%] bg-black/5 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
