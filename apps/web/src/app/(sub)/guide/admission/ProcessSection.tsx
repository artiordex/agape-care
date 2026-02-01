/**
 * Description : ProcessSection.tsx - 📌 입소 절차 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function ProcessSection() {
  // 이미지의 '입소 전 절차' 및 '입소신청 절차' 반영
  const processSteps = [
    {
      step: '01',
      title: '입소 전 행정 절차',
      description: '거주지 국민건강보험공단에 장기요양인정 신청 후 인정조사 및 등급판정(시설등급)을 받습니다.',
      icon: 'ri-government-line',
    },
    {
      step: '02',
      title: '입소 상담 및 신청',
      description: '전화 상담 또는 직접 방문을 통해 상담을 진행하며, 인터넷으로도 입소신청서 접수가 가능합니다.',
      icon: 'ri-chat-check-line',
    },
    {
      step: '03',
      title: '서류 제출 및 계약',
      description: '장기요양인정서 등 구비 서류를 제출하고 입소 계약 체결 및 이용료 안내를 받습니다.',
      icon: 'ri-file-edit-line',
    },
    {
      step: '04',
      title: '시설 입소',
      description: '정해진 입소일에 맞춰 준비 물품을 지참하여 시설에 입소, 맞춤 케어 서비스를 시작합니다.',
      icon: 'ri-home-heart-line',
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <div className="group h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5C8D5A] to-[#476d45] shadow-lg transition-transform group-hover:scale-110">
                  <i className={`${step.icon} text-3xl text-white`}></i>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-sm font-bold uppercase tracking-widest text-[#5C8D5A] opacity-60">
                    STEP {step.step}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </div>

              {index < processSteps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                  <i className="ri-arrow-right-line text-2xl text-gray-200"></i>
                </div>
              )}
            </motion.div>
          ))}
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
