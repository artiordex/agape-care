'use client';

import { motion } from 'framer-motion';

export default function AdmissionStepsSection() {
  const steps = [
    {
      step: '1단계',
      title: '장기요양등급 신청',
      icon: 'ri-file-text-line',
      description: '국민건강보험공단에 장기요양등급 인정 신청을 합니다',
      details: [
        '신청 자격: 만 65세 이상 또는 노인성 질환자',
        '신청 장소: 가까운 국민건강보험공단 지사',
        '신청 방법: 방문, 우편, 팩스, 인터넷',
        '준비 서류: 신청서, 의사소견서(해당 시)',
      ],
    },
    {
      step: '2단계',
      title: '방문 조사 및 등급 판정',
      icon: 'ri-clipboard-line',
      description: '공단 직원이 가정을 방문하여 조사하고 등급심사위원회에서 등급을 결정합니다',
      details: [
        '방문 조사: 신청 후 약 2주 이내',
        '조사 내용: 신체 기능, 인지 기능, 행동 변화',
        '등급 판정: 조사 후 약 2주 이내 결과 통보',
        '등급 구분: 1~5등급, 인지지원등급',
      ],
    },
    {
      step: '3단계',
      title: '요양원 상담 및 방문',
      icon: 'ri-customer-service-2-line',
      description: '등급 결정 후 요양원에 연락하여 상담을 진행하고 시설을 방문합니다',
      details: [
        '전화 상담: 02-1234-5678',
        '시설 방문: 사전 예약 필수',
        '상담 내용: 어르신 상태, 제공 서비스, 비용',
        '시설 둘러보기: 침실, 식당, 프로그램실 등',
      ],
    },
    {
      step: '4단계',
      title: '입소 계약 및 서류 제출',
      icon: 'ri-file-edit-line',
      description: '입소가 결정되면 계약서를 작성하고 필요한 서류를 제출합니다',
      details: ['입소 계약서 작성', '필수 서류 제출', '건강검진 결과 제출', '비용 납부 안내'],
    },
    {
      step: '5단계',
      title: '입소 준비 및 입소',
      icon: 'ri-home-heart-line',
      description: '입소일을 정하고 개인 물품을 준비하여 입소합니다',
      details: ['입소일 결정', '개인 물품 준비', '입소 당일 보호자 동행', '적응 기간 안내 (약 1개월)'],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            입소 절차
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">5단계 입소 절차</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">등급 신청부터 입소까지 전체 과정을 안내합니다</p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-100 bg-[#F9F8F6] p-8 hover:border-[#7BA178]/30 hover:shadow-xl"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7BA178] to-[#5C8D5A]">
                    <i className={`${item.icon} text-3xl text-white`} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-[#7BA178]/10 px-3 py-1 text-sm font-bold text-[#5C8D5A]">
                      {item.step}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                  </div>

                  <p className="mb-6 text-base text-gray-600">{item.description}</p>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {item.details.map(detail => (
                      <div key={detail} className="flex items-start gap-2 text-sm text-gray-700">
                        <i className="ri-check-line mt-0.5 text-lg text-[#7BA178]" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
