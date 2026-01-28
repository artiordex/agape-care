'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

export default function AdmissionProcessPage() {
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
      details: ['입소 계약서 작성', '필수 서류 제출 (아래 목록 참조)', '건강검진 결과 제출', '비용 납부 안내'],
    },
    {
      step: '5단계',
      title: '입소 준비 및 입소',
      icon: 'ri-home-heart-line',
      description: '입소일을 정하고 개인 물품을 준비하여 입소합니다',
      details: [
        '입소일 결정',
        '개인 물품 준비 (의류, 세면도구 등)',
        '입소 당일 보호자 동행',
        '적응 기간 안내 (약 1개월)',
      ],
    },
  ];

  const requiredDocuments = [
    { icon: 'ri-file-list-3-line', title: '장기요양인정서', description: '공단에서 발급받은 등급 인정서 사본' },
    { icon: 'ri-parent-line', title: '신분증 사본', description: '어르신과 보호자 신분증 사본' },
    { icon: 'ri-hospital-line', title: '건강검진 결과서', description: '입소 전 3개월 이내 건강검진 결과' },
    { icon: 'ri-file-user-line', title: '주민등록등본', description: '주민등록등본 1부' },
    { icon: 'ri-medicine-bottle-line', title: '복용 약 리스트', description: '현재 복용 중인 약 목록 및 처방전' },
    { icon: 'ri-shield-check-line', title: '보험증권 (선택)', description: '가입한 보험이 있는 경우 증권 사본' },
  ];

  const costInfo = [
    {
      grade: '1등급',
      monthlyCost: '약 60만원',
      selfPay: '본인부담금 20%',
      description: '최중증 상태, 공단 급여 80% 지원',
    },
    {
      grade: '2등급',
      monthlyCost: '약 55만원',
      selfPay: '본인부담금 20%',
      description: '중증 상태, 공단 급여 80% 지원',
    },
    {
      grade: '3등급',
      monthlyCost: '약 50만원',
      selfPay: '본인부담금 20%',
      description: '중등도 상태, 공단 급여 80% 지원',
    },
    {
      grade: '4등급',
      monthlyCost: '약 45만원',
      selfPay: '본인부담금 20%',
      description: '경증 상태, 공단 급여 80% 지원',
    },
    {
      grade: '5등급',
      monthlyCost: '약 40만원',
      selfPay: '본인부담금 20%',
      description: '경미한 상태, 공단 급여 80% 지원',
    },
  ];

  const personalItems = [
    { category: '의류', items: ['속옷 5~7벌', '일상복 5~7벌', '외출복 2~3벌', '양말 7켤레', '실내화'] },
    { category: '세면도구', items: ['칫솔, 치약', '비누, 샴푸', '수건 3~5장', '로션, 크림'] },
    { category: '침구류', items: ['베개 (선택)', '담요 (선택)', '※ 침대와 이불은 시설에서 제공'] },
    { category: '기타', items: ['안경, 보청기', '틀니 보관함', '개인 컵', '사진 (선택)'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-amber-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#7BA178]/10 to-white pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="transition-colors hover:text-[#5C8D5A]">
                홈
              </Link>
              <i className="ri-arrow-right-s-line" />
              <span className="font-semibold text-[#5C8D5A]">입소절차안내</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-gray-800 sm:text-5xl">입소절차안내</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              정원 29인 요양원 입소를 위한 전체 절차와 필요한 서류, 비용 안내를 상세히 안내해 드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 입소 절차 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              입소 절차
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">5단계 입소 절차</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">등급 신청부터 입소까지 전체 과정을 안내합니다</p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((item, index) => (
              <motion.div
                key={index}
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
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
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

      {/* 필요 서류 */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              필요 서류
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">입소 시 제출 서류</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">입소 시 필수 제출 서류 목록입니다</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requiredDocuments.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
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

      {/* 비용 안내 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              비용 안내
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">등급별 입소 비용</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">2025년 기준 월 비용 예시입니다</p>
          </motion.div>

          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {costInfo.map((cost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#F9F8F6] p-6 text-center hover:shadow-xl"
              >
                <div className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-lg font-bold text-[#5C8D5A]">
                  {cost.grade}
                </div>
                <div className="mb-2 text-3xl font-bold text-gray-800">{cost.monthlyCost}</div>
                <div className="mb-4 text-sm text-gray-600">{cost.selfPay}</div>
                <p className="text-sm leading-relaxed text-gray-500">{cost.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 준비물 */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
              준비물
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">입소 시 준비물</h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">필요한 개인 준비물 목록입니다</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {personalItems.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-8 hover:shadow-xl"
              >
                <h3 className="mb-6 border-b-2 border-[#7BA178] pb-4 text-xl font-bold text-gray-800">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <i className="ri-check-line mt-0.5 text-lg text-[#7BA178]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-[#7BA178] to-[#5C8D5A] p-12 text-center text-white"
          >
            <h2 className="mb-4 text-3xl font-bold">입소 상담 신청</h2>
            <p className="mb-8 text-base opacity-90">입소 절차와 비용에 대해 자세히 안내해 드립니다</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#5C8D5A] hover:bg-gray-50"
              >
                <i className="ri-phone-line text-xl"/>
                전화 상담하기
              </a>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white hover:bg-white/20"
              >
                <i className="ri-calendar-check-line text-xl"/>
                방문 예약하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
