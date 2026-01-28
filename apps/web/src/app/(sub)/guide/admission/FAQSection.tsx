'use client';

import { motion } from 'framer-motion';

export default function FAQSection() {
  const faqData = [
    {
      question: '입소 대상자는 누구인가요?',
      answer: '장기요양등급(1~5등급) 판정을 받으신 어르신이 입소 가능합니다. 인지지원등급도 상담 후 입소 가능합니다.',
    },
    {
      question: '입소 비용은 어떻게 되나요?',
      answer:
        '장기요양등급에 따라 본인부담금이 다르며, 기초생활수급자는 감면 혜택이 있습니다. 자세한 비용은 비용안내 페이지를 참고해주세요.',
    },
    {
      question: '면회는 언제 가능한가요?',
      answer: '평일 오전 10시부터 오후 6시까지 자유롭게 면회 가능합니다. 주말 및 공휴일은 사전 예약 후 방문해주세요.',
    },
    {
      question: '외출 및 외박이 가능한가요?',
      answer: '보호자 동의 하에 외출 및 외박이 가능합니다. 사전에 시설에 알려주시면 됩니다.',
    },
    {
      question: '개인 물품은 어떻게 관리하나요?',
      answer: '개인 사물함이 제공되며 귀중품은 시설에서 별도 보관 가능합니다. 의류는 이름표를 부착해주세요.',
    },
    {
      question: '의료 서비스는 어떻게 제공되나요?',
      answer:
        '협력 병원과 연계하여 정기 건강검진 및 응급 상황 시 즉시 대응합니다. 간호사가 상주하여 건강 관리를 지원합니다.',
    },
  ];

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">자주 묻는 질문</h2>
          <p className="text-lg text-gray-600">입소와 관련하여 자주 묻는 질문들입니다</p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map(faq => (
            <details
              key={faq.question}
              className="group rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 shadow-md transition-all hover:shadow-lg"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5C8D5A]">
                    <span className="text-sm font-bold text-white">Q</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                </div>

                <i className="ri-arrow-down-s-line text-2xl text-gray-600 transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-6 pb-6 pl-[72px]">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="leading-relaxed text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
