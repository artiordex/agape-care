/**
 * Description : FAQSection.tsx - 📌 자주 묻는 질문 (상세 답변 및 너비 90% 적용)
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function FAQSection() {
  const faqData = [
    {
      question: '입소 대상자는 누구인가요?',
      answer:
        '노인장기요양보험법에 따라 1~5등급 시설급여 판정을 받으신 어르신이 주 대상입니다. 등급이 없으시더라도 65세 이상의 거동이 불편하신 분이나 노인성 질환(치매, 뇌졸중 등)을 앓고 계신 분은 상담을 통해 입소 가능 여부 및 등급 신청 절차를 친절히 안내해 드립니다. 인지지원등급 어르신은 별도의 상담을 통해 생활 가능 여부를 확인합니다.',
    },
    {
      question: '입소 비용은 어떻게 산정되나요?',
      answer:
        '입소 비용은 공단에서 지원하는 "급여 비용"과 본인이 부담하는 "비급여 비용(식사재료비, 간식비, 상급침실료 등)"으로 구성됩니다. 일반 대상자는 급여 비용의 20%, 감경 대상자는 소득 수준에 따라 8~12%, 기초생활수급권자는 본인부담금이 면제됩니다. 정확한 월 이용료는 어르신의 등급과 선택하시는 서비스 항목에 따라 차이가 있으므로 유선 상담 시 상세 견적을 안내해 드립니다.',
    },
    {
      question: '면회 및 방문 예약은 어떻게 하나요?',
      answer:
        '어르신들의 생활 안정과 건강 관리를 위해 면회는 오전 10시부터 오후 6시까지 운영하고 있습니다. 평일은 자유로운 방문이 가능하나, 주말 및 공휴일은 면회객 혼잡을 방지하고 쾌적한 환경을 유지하기 위해 최소 1일 전 사전 예약을 권장합니다. 감염병 예방 수칙에 따라 면회 장소나 인원이 일시적으로 제한될 수 있으니 방문 전 확인 부탁드립니다.',
    },
    {
      question: '개인 외출이나 외박도 가능한가요?',
      answer:
        '네, 어르신의 건강 상태가 양호하고 보호자의 동의가 있는 경우 언제든 외출 및 외박이 가능합니다. 다만, 투약 관리와 식사 준비 등 행정적인 절차를 위해 최소 2~3일 전에는 시설에 미리 말씀해 주셔야 합니다. 복귀 시에는 어르신의 컨디션 변화 여부를 간호팀에 공유해 주시면 지속적인 맞춤 케어에 큰 도움이 됩니다.',
    },
    {
      question: '개인 소지품 및 의류 관리는 어떻게 하나요?',
      answer:
        '각 생활실 내에 개인별 전용 사물함과 수납공간이 마련되어 있습니다. 분실 방지를 위해 모든 의류와 소지품에는 성함을 기재하거나 이름표를 부착해 주시길 권장합니다. 현금이나 고가의 귀중품은 사고 예방을 위해 가급적 지참을 지양해 주시고, 필요 시 사무실 내 별도의 안전 금고에 위탁 보관 서비스를 이용하실 수 있습니다.',
    },
    {
      question: '응급 상황 시 의료 서비스는 어떻게 제공되나요?',
      answer:
        '숙련된 간호인력이 상주하며 매일 어르신의 혈압, 혈당, 체온 등 기초 바이탈을 체크하고 복약 관리를 수행합니다. 또한 협력 의료기관의 촉탁 의사가 정기적으로 방문하여 검진 및 처방을 진행합니다. 응급 상황 발생 시에는 보호자께 즉시 연락드림과 동시에 인근 대형 병원 응급실로 신속하게 이송하는 24시간 긴급 대응 매뉴얼을 운영하고 있습니다.',
    },
  ];

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 UI */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">자주 묻는 질문</h2>
        </motion.div>

        {/* FAQ 리스트 */}
        <div className="mx-auto max-w-12xl space-y-4">
          {faqData.map(faq => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                <div className="flex items-start gap-4">
                  {/* 아이콘 */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]">
                    <span className="text-sm font-bold text-white">Q</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                    {faq.question}
                  </h3>
                </div>
                <i className="ri-arrow-down-s-line text-2xl text-gray-400 transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-6 pb-6 pl-[72px]">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
                  <p className="whitespace-pre-wrap leading-relaxed text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
