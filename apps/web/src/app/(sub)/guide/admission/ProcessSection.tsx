/**
 * Description : ProcessSection.tsx - 📌 입소 절차 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function ProcessSection() {
  const steps = [
    {
      icon: 'ri-phone-line',
      title: '상담 신청',
      description: '전화 또는 온라인으로\n무료 상담을 신청해 주세요',
      color: '#5C8D5A',
    },
    {
      icon: 'ri-user-heart-line',
      title: '방문 상담',
      description: '센터를 직접 방문하여\n시설과 프로그램을 확인하세요',
      color: '#5C8D5A',
    },
    {
      icon: 'ri-file-list-2-line',
      title: '준비서류 안내',
      description: '입소에 필요한 서류를\n안내해 드립니다',
      color: '#5C8D5A',
    },
    {
      icon: 'ri-hospital-line',
      title: '장기요양등급 안내',
      description: '장기요양등급 신청 및\n인정 절차를 도와드립니다',
      color: '#5C8D5A',
    },
    {
      icon: 'ri-file-edit-line',
      title: '계약 및 입소',
      description: '계약 진행 후\n편안하게 입소하실 수 있습니다',
      color: '#5C8D5A',
    },
  ];

  return (
    <section id="process" className="bg-white py-20">
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 UI */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">입소 절차 안내</h2>
        </motion.div>

        {/* 입소 절차 그리드 */}
        <div className="relative">
          {/* 연결선 */}
          <div className="absolute left-0 right-0 top-24 hidden h-1 bg-gradient-to-r from-[#5C8D5A] via-[#5C8D5A] to-[#5C8D5A] opacity-20 lg:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center text-center"
              >
                <div
                  className="relative z-10 mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                  style={{ backgroundColor: step.color }}
                >
                  {/* 숫자 배지 - Green 테두리 추가 */}
                  <div
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all duration-300 group-hover:scale-110"
                    style={{
                      color: step.color,
                      borderColor: step.color,
                      borderStyle: 'solid',
                    }}
                  >
                    {index + 1}
                  </div>
                  <i className={`${step.icon} text-5xl text-white transition-all duration-300 group-hover:scale-110`} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-[#5C8D5A]">
                  {step.title}
                </h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 추가 신청 안내 팁 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-gray-200 bg-[#F9F8F6] p-8 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-customer-service-2-line text-2xl text-[#5C8D5A]" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">입소 신청 상세 안내</h4>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-600">
                <li>
                  <strong className="text-gray-900">· 전화 상담:</strong> 상시 가능합니다. (단, 전화만으로는 정식 신청
                  접수가 불가하오니 상담 후 절차를 밟아주세요.)
                </li>
                <li>
                  <strong className="text-gray-900">· 직접 방문:</strong> 시설을 직접 확인하시고 대면 상담을 통해
                  접수하실 수 있습니다.
                </li>
                <li>
                  <strong className="text-gray-900">· 인터넷 접수:</strong> 공식 홈페이지를 통해 입소신청서를 작성하여
                  편리하게 접수하실 수 있습니다.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
