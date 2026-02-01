/**
 * Description : DirectorMessageSection.tsx - 📌 인사말
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function DirectorMessageSection() {
  return (
    <section className="overflow-hidden bg-white py-24 font-['Pretendard']">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto w-[90%] max-w-[1400px]"
      >
        {/* [수정] 뒤쪽 장식 종이: 더 선명하게 보이도록 회전값과 위치, 그림자 강화 */}
        <motion.div
          initial={{ rotate: 0, x: 0 }}
          whileInView={{ rotate: -2, x: -15, y: 10 }} // 왼쪽 아래로 더 삐져나오게 설정
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 rounded-sm border border-gray-300 bg-gray-200/80 shadow-md" // 선명도와 그림자 강화
        ></motion.div>

        {/* 메인 편지지 (이미지 79ca5e.png 색감 반영) */}
        <div className="relative z-10 overflow-hidden rounded-sm border border-orange-50 bg-gradient-to-br from-[#FFF5E9] via-[#FFEDEB] to-[#FFDFDC] p-10 shadow-[0_20px_60px_rgba(255,180,170,0.2)] sm:p-20">
          {/* 편지지 격자 무늬 */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(90deg, #E8A398 1px, transparent 1px), linear-gradient(#E8A398 1px, transparent 1px)`,
              backgroundSize: '3rem 3rem',
            }}
          ></div>

          {/* 수신인 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative mb-16"
          >
            <p className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">사랑하는 보호자님과 어르신께,</p>
            <div className="mt-4 h-1 w-16 bg-[#F8B4A8]/40"></div>
          </motion.div>

          {/* 본문 (줄간격 및 가독성 최적화) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative space-y-10 text-[1.15rem] leading-[2.6rem] text-gray-700 md:text-[1.25rem]"
          >
            <p className="indent-4 font-medium text-gray-800">
              저희 아가페 요양원을 찾아주신 보호자님과 어르신께 진심으로 감사드립니다.
            </p>

            <p>
              {`정원 29인 소규모 시설만의 장점을 살려, 어르신 한 분 한 분께 `}
              <span className="relative inline-block px-1">
                <span className="relative z-10 font-bold text-gray-900">세심한 관심과 개별 맞춤형 케어</span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  className="absolute bottom-1 left-0 h-4 bg-[#F8B4A8]/30"
                ></motion.span>
              </span>
              {`를 제공하는 것이 저희의 가장 큰 자랑입니다. 가족 같은 분위기 속에서 어르신께서 편안하고 행복한 일상을 보내실 수 있도록 최선을 다하고 있습니다.`}
            </p>

            <p>
              {`단순한 요양 서비스를 넘어, 어르신의 존엄성과 자율성을 존중하며 정서적으로 안정된 환경을 만들어가고 있습니다. 전문 인력과 안전한 시설을 기반으로 어르신을 내 부모님처럼 모시겠습니다.`}
            </p>

            <p>
              보호자님과의 지속적인 소통을 통해 신뢰를 쌓아가고 있으며, 언제든지 궁금하신 사항은 편하게 문의하실 수
              있도록 문을 활짝 열어두고 있습니다.
            </p>
          </motion.div>

          {/* 서명 영역 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="relative mt-28 flex flex-col items-end pt-12"
          >
            <div className="absolute right-0 top-0 h-px w-40 bg-[#F8B4A8]/40"></div>
            <div className="text-right">
              <p className="mb-4 text-sm font-medium text-gray-400">2026년 02월</p>
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <p className="mb-1 text-base text-gray-500">아가페 요양원</p>
                  <p className="text-3xl font-black tracking-tight text-gray-900">시설장 드림</p>
                </div>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 15 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5, type: 'spring', stiffness: 150 }}
                  className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-4 border-[#E8A398]/20 text-[14px] font-black text-[#E8A398]/40 shadow-inner"
                >
                  AGAPE
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 장식용 잎사귀 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1 }}
          className="pointer-events-none absolute -bottom-10 -left-16 select-none text-[14rem] text-[#F8B4A8]/20"
        >
          <i className="ri-leaf-fill"></i>
        </motion.div>
      </motion.div>
    </section>
  );
}
