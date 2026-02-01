/**
 * Description : ContactSection.tsx - 📌 연락 방법 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactFormModal from './ContactFormModal';

export default function ContactSection() {
  // 모달 열림/닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactMethods = [
    {
      icon: 'ri-phone-line',
      title: '전화 문의',
      description: '상담 예약 및 상세 상담',
      value: '02-1234-5678',
      link: 'tel:02-1234-5678',
      color: 'from-[#5C8D5A] to-[#7CAF7A]',
      available: '평일 09:00 - 18:00',
      isForm: false,
    },
    {
      icon: 'ri-kakao-talk-fill',
      title: '카카오톡 상담',
      description: '빠른 채팅 문의',
      value: '@아가페요양원',
      link: 'http://pf.kakao.com/_example',
      color: 'from-yellow-400 to-yellow-500',
      available: '24시간 메시지 가능',
      isForm: false,
    },
    {
      icon: 'ri-mail-line',
      title: '이메일 문의',
      description: '서류 및 상세 제안',
      value: 'agape@example.com',
      link: 'mailto:agape@example.com',
      color: 'from-blue-500 to-blue-600',
      available: '24시간 상시 접수',
      isForm: false,
    },
    {
      icon: 'ri-survey-line',
      title: '상담 폼 신청',
      description: '24시간 온라인 접수',
      value: '상담 폼 작성하기',
      link: '#',
      color: 'from-purple-500 to-purple-600',
      available: '담당자 확인 후 연락',
      isForm: true,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-[#5C8D5A]/5 py-24 font-['Pretendard']">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">상담 문의하기</h2>
        </motion.div>

        {/* 연락 방법 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => method.isForm && setIsModalOpen(true)}
              className="cursor-pointer"
            >
              {/* 회색 계열 테두리 추가 */}
              <div className="group relative block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:scale-[1.02] hover:shadow-xl">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 transition-opacity group-hover:opacity-5`}
                />

                {/* 아이콘 영역 */}
                <div className="relative mb-6 flex justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <i className={`${method.icon} text-3xl text-white`} />
                  </div>
                </div>

                {/* 내용 영역 */}
                <div className="relative text-center">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{method.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500">{method.description}</p>
                  <p className="mb-2 text-lg font-bold text-[#5C8D5A] transition-colors group-hover:text-gray-900">
                    {method.value}
                  </p>
                  <div className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium text-gray-400">
                    {method.available}
                  </div>
                </div>

                {/* 호버 화살표 */}
                {!method.isForm && (
                  <div className="absolute bottom-4 right-4 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                    <i className="ri-arrow-right-up-line text-xl text-[#5C8D5A]" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 별도로 만든 ContactFormModal 컴포넌트 연결 */}
      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
