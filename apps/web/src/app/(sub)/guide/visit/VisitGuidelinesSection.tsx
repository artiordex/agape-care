/**
 * Description : VisitGuidelinesSection.tsx - 📌 면회 가이드라인 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function VisitGuidelinesSection() {
  const visitGuidelines = [
    {
      title: '면회 전 준비사항',
      items: [
        {
          text: '방문 전 시설에 연락하여 어르신 상태 확인',
          detail: '어르신의 건강 상태와 컨디션을 미리 확인해주세요',
        },
        {
          text: '감기 등 전염성 질환이 있는 경우 면회 자제',
          detail: '발열, 기침, 인후통 등의 증상이 있다면 면회를 연기해주세요',
        },
        {
          text: '방문자 명부 작성 (성명, 연락처)',
          detail: '출입 관리를 위한 필수 절차입니다',
        },
        {
          text: '손 소독 및 마스크 착용',
          detail: '입구에서 손 소독제를 사용하고 마스크를 착용해주세요',
        },
      ],
      icon: 'ri-checkbox-circle-line',
      iconBg: 'from-[#5C8D5A] to-[#7CAF7A]',
    },
    {
      title: '면회 시 주의사항',
      items: [
        {
          text: '큰 소리로 대화하지 않기',
          detail: '다른 어르신들의 휴식을 위해 조용히 대화해주세요',
        },
        {
          text: '다른 어르신들께 방해되지 않도록 주의',
          detail: '복도나 공용 공간에서는 이동 시 주의해주세요',
        },
        {
          text: '음식물 반입 시 사전 확인 필수',
          detail: '어르신의 식이 제한 사항을 반드시 확인해주세요',
        },
        {
          text: '어르신의 컨디션을 고려한 면회 시간 조절',
          detail: '피곤해하시면 면회 시간을 줄여주시기 바랍니다',
        },
      ],
      icon: 'ri-alert-line',
      iconBg: 'from-[#5C8D5A] to-[#6B9A69]',
    },
    {
      title: '외출 및 외박',
      items: [
        {
          text: '외출/외박 최소 1일 전 신청',
          detail: '담당 직원에게 사전에 알려주시기 바랍니다',
        },
        {
          text: '보호자 동의서 작성',
          detail: '외출/외박 동의서를 작성해주세요',
        },
        {
          text: '귀가 시간 및 연락처 남기기',
          detail: '긴급 상황 대비를 위해 필수입니다',
        },
        {
          text: '복용 중인 약 지참',
          detail: '어르신의 약과 복약 지도서를 꼭 챙겨주세요',
        },
      ],
      icon: 'ri-door-open-line',
      iconBg: 'from-[#5C8D5A] to-[#5A8558]',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-[#5C8D5A]/5 py-20">
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">면회 가이드라인</h2>
        </motion.div>

        {/* 가이드라인 카드 그리드 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {visitGuidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
            >
              {/* 상단 그라데이션 라인 */}
              <div className={`absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${guideline.iconBg}`} />

              {/* 아이콘 */}
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${guideline.iconBg} shadow-md transition-transform group-hover:scale-110`}
                >
                  <i className={`${guideline.icon} text-3xl text-white`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{guideline.title}</h3>
              </div>

              {/* 가이드라인 항목 리스트 */}
              <ul className="space-y-4">
                {guideline.items.map(item => (
                  <li key={item.text} className="group/item">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]/10">
                        <i className="ri-check-line text-sm font-bold text-[#5C8D5A]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold leading-relaxed text-gray-800 transition-colors group-hover/item:text-[#5C8D5A]">
                          {item.text}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 추가 안내 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* 특별 안내 사항 */}
          <div className="rounded-2xl border-2 border-[#5C8D5A]/20 bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5C8D5A]">
                <i className="ri-star-line text-xl text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">특별 안내 사항</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-[#5C8D5A]" />
                <span>어린 자녀 동반 시 보호자가 항상 함께 있어야 합니다</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-[#5C8D5A]" />
                <span>반려동물 동반은 불가합니다</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-[#5C8D5A]" />
                <span>음주 후 면회는 삼가주시기 바랍니다</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-[#5C8D5A]" />
                <span>시설 내 흡연은 금지되어 있습니다</span>
              </li>
            </ul>
          </div>

          {/* 음식물 반입 안내 */}
          <div className="rounded-2xl border-2 border-[#5C8D5A]/20 bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5C8D5A]">
                <i className="ri-restaurant-line text-xl text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">음식물 반입 안내</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <i className="ri-close-circle-fill mt-0.5 text-red-500" />
                <span>날 생선, 회 등 날것은 반입 금지</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-close-circle-fill mt-0.5 text-red-500" />
                <span>딱딱하거나 질긴 음식 (떡, 오징어 등)</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-[#5C8D5A]" />
                <span>부드러운 과일, 죽, 음료 등은 가능</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-information-fill mt-0.5 text-blue-500" />
                <span className="font-semibold">반드시 담당 직원에게 사전 확인 필수</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
