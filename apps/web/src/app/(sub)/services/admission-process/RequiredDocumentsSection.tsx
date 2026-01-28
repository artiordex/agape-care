'use client';

import { motion } from 'framer-motion';

export default function RequiredDocumentsSection() {
  const requiredDocuments = [
    { icon: 'ri-file-list-3-line', title: '장기요양인정서', description: '공단에서 발급받은 등급 인정서 사본' },
    { icon: 'ri-parent-line', title: '신분증 사본', description: '어르신과 보호자 신분증 사본' },
    { icon: 'ri-hospital-line', title: '건강검진 결과서', description: '입소 전 3개월 이내 건강검진 결과' },
    { icon: 'ri-file-user-line', title: '주민등록등본', description: '주민등록등본 1부' },
    { icon: 'ri-medicine-bottle-line', title: '복용 약 리스트', description: '현재 복용 중인 약 목록 및 처방전' },
    { icon: 'ri-shield-check-line', title: '보험증권 (선택)', description: '가입한 보험이 있는 경우 증권 사본' },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            필요 서류
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">입소 시 제출 서류</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">입소 시 필수 제출 서류 목록입니다</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requiredDocuments.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7BA178]/10">
                <i className={`${doc.icon} text-2xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-800">{doc.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{doc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
