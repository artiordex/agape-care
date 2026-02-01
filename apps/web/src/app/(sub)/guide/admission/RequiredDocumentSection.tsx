/**
 * Description : RequiredDocumentSection.tsx - 📌 서류 목록 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function RequiredDocumentsSection() {
  // 이미지 데이터 기반으로 서류 목록 보완
  const requiredDocuments = [
    {
      name: '장기요양인정서 및 이용계획서',
      description: '국민건강보험공단 등급 판정 시 수령 서류',
      icon: 'ri-file-shield-2-line',
    },
    {
      name: '주민등록등본 및 가족관계증명서',
      description: '어르신 및 보호자 관계 확인용 (각 1부)',
      icon: 'ri-file-list-line',
    },
    {
      name: '건강진단서 (전염성 질환 확인)',
      description: '폐결핵, 매독, 골다공증 등 감염 여부 확인',
      icon: 'ri-health-book-line',
    },
    {
      name: '어르신 신분증 및 건강보험증',
      description: '본인 확인을 위한 사본 (각 1부)',
      icon: 'ri-id-card-line',
    },
    {
      name: '치매진단서',
      description: '치매 어르신인 경우에 해당 (해당 시)',
      icon: 'ri-psychotherapy-line',
    },
    {
      name: '약 처방전 및 소견서',
      description: '현재 복용 중인 약에 대한 최신 처방전',
      icon: 'ri-capsule-line',
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 UI */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">필요 서류 안내</h2>
        </motion.div>

        {/* 보완된 서류 목록 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requiredDocuments.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#5C8D5A]/10 transition-colors duration-300 group-hover:bg-[#5C8D5A]">
                  <i
                    className={`${doc.icon} text-2xl text-[#5C8D5A] transition-colors duration-300 group-hover:text-white`}
                  ></i>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-gray-900">{doc.name}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{doc.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 상세 안내 박스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
              <i className="ri-information-line text-2xl text-amber-600"></i>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">구비 서류 준비 시 유의사항</h4>
              <ul className="space-y-2 text-sm leading-relaxed text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#5C8D5A]">·</span>
                  <span>장기요양인정서 및 이용계획서는 등급 판정 시 공단에서 수령한 서류 일체를 준비해 주세요.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#5C8D5A]">·</span>
                  <span>
                    건강진단서의 경우 <strong>폐결핵, 매독, 감염 검사</strong> 결과가 반드시 포함되어야 합니다.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#5C8D5A]">·</span>
                  <span>
                    모든 공공기관 발행 서류(등본 등)는 <strong>최근 3개월 이내</strong> 발급분이어야 합니다.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
