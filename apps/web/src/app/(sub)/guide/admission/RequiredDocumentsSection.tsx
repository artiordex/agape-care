'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function RequiredDocumentsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const requiredDocuments = [
    { name: '장기요양인정서', icon: 'ri-file-shield-2-line' },
    { name: '신분증 사본', icon: 'ri-id-card-line' },
    { name: '건강진단서', icon: 'ri-health-book-line' },
    { name: '주민등록등본', icon: 'ri-file-list-line' },
    { name: '의료보험증', icon: 'ri-hospital-line' },
    { name: '최근 복용약 처방전', icon: 'ri-capsule-line' },
  ];

  return (
    <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">필요 서류</h2>
          <p className="text-lg text-gray-600">입소 시 준비해야 할 서류 목록입니다</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requiredDocuments.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-amber-50">
                  <i className={`${doc.icon} text-2xl text-[#5C8D5A]`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{doc.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
              <i className="ri-information-line text-2xl text-amber-600"></i>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">서류 준비 안내</h4>
              <p className="leading-relaxed text-gray-600">
                모든 서류는 발급일로부터 3개월 이내의 것으로 준비해주세요. 서류 준비가 어려우신 경우 시설에서 도움을
                드릴 수 있습니다. 자세한 사항은 상담 시 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
