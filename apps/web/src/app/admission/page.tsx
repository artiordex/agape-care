import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AdmissionPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });

  const processSteps = [
    {
      step: '01',
      title: '상담 신청',
      description: '전화 또는 방문 상담을 통해 입소 가능 여부를 확인합니다',
      icon: 'ri-phone-line',
      color: 'from-teal-500 to-teal-600',
    },
    {
      step: '02',
      title: '서류 준비',
      description: '입소에 필요한 서류를 준비하고 제출합니다',
      icon: 'ri-file-list-3-line',
      color: 'from-amber-500 to-amber-600',
    },
    {
      step: '03',
      title: '계약 체결',
      description: '입소 계약서 작성 및 비용 안내를 받습니다',
      icon: 'ri-file-text-line',
      color: 'from-green-500 to-green-600',
    },
    {
      step: '04',
      title: '입소 완료',
      description: '입소일에 맞춰 시설에 입소하여 생활을 시작합니다',
      icon: 'ri-home-heart-line',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const requiredDocuments = [
    { name: '장기요양인정서', icon: 'ri-file-shield-2-line' },
    { name: '신분증 사본', icon: 'ri-id-card-line' },
    { name: '건강진단서', icon: 'ri-health-book-line' },
    { name: '주민등록등본', icon: 'ri-file-list-line' },
    { name: '의료보험증', icon: 'ri-hospital-line' },
    { name: '최근 복용약 처방전', icon: 'ri-capsule-line' },
  ];

  const preparationItems = [
    { category: '의류', items: ['속옷 5벌', '겉옷 5벌', '양말 5켤레', '실내화', '외출복'], icon: 'ri-shirt-line' },
    { category: '세면도구', items: ['칫솔/치약', '비누', '샴푸', '수건 3장', '면도기'], icon: 'ri-drop-line' },
    { category: '개인용품', items: ['안경', '보청기', '틀니', '지팡이', '휠체어(필요시)'], icon: 'ri-user-line' },
    { category: '기타', items: ['사진 2매', '개인 컵', '슬리퍼', '계절용품'], icon: 'ri-more-line' },
  ];

  const lifeRules = [
    { title: '기상 및 취침', time: '오전 7시 기상 / 오후 9시 취침', icon: 'ri-time-line' },
    { title: '식사 시간', time: '아침 8시 / 점심 12시 / 저녁 6시', icon: 'ri-restaurant-line' },
    { title: '면회 시간', time: '평일 오전 10시 ~ 오후 6시', icon: 'ri-parent-line' },
    { title: '외출 및 외박', time: '보호자 동의 후 가능', icon: 'ri-door-open-line' },
    { title: '프로그램 참여', time: '개인 상태에 맞춰 참여', icon: 'ri-calendar-check-line' },
    { title: '개인 위생', time: '주 2회 목욕 지원', icon: 'ri-water-flash-line' },
  ];

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
      answer: '개인 사물함이 제공되며, 귀중품은 시설에서 별도 보관 가능합니다. 의류는 이름표를 부착해주세요.',
    },
    {
      question: '의료 서비스는 어떻게 제공되나요?',
      answer:
        '협력 병원과 연계하여 정기 건강검진 및 응급 상황 시 즉시 대응합니다. 간호사가 상주하여 건강 관리를 지원합니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 pb-20 pt-32">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=peaceful%20elderly%20care%20facility%20entrance%20with%20warm%20welcoming%20atmosphere%20soft%20natural%20lighting%20modern%20clean%20interior%20design%20comfortable%20reception%20area%20with%20plants%20and%20natural%20elements%20professional%20healthcare%20environment&width=1920&height=600&seq=admission-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <i className="ri-file-list-3-line text-xl text-[#5C8D5A]"></i>
              <span className="text-sm font-semibold text-gray-700">입소안내</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">입소 절차 및 안내</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              어르신과 가족분들이 편안하게 입소하실 수 있도록
              <br />
              상세한 절차와 준비사항을 안내해드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 입소 절차 */}
      <section id="process" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">입소 절차</h2>
            <p className="text-lg text-gray-600">4단계로 간편하게 입소하실 수 있습니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-xl">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.color} mx-auto mb-6 flex items-center justify-center`}
                  >
                    <i className={`${step.icon} text-3xl text-white`}></i>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-sm font-bold text-gray-400">STEP {step.step}</div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 transform lg:block">
                    <i className="ri-arrow-right-line text-3xl text-gray-300"></i>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 필요 서류 */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">필요 서류</h2>
            <p className="text-lg text-gray-600">입소 시 준비해야 할 서류 목록입니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requiredDocuments.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
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

      {/* 입소 준비물 */}
      <section id="preparation" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">입소 준비물</h2>
            <p className="text-lg text-gray-600">편안한 생활을 위해 준비해주세요</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {preparationItems.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 p-8 shadow-md transition-all hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                  <i className={`${category.icon} text-3xl text-[#5C8D5A]`}></i>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-gray-700">
                      <i className="ri-checkbox-circle-fill text-[#5C8D5A]"></i>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                <i className="ri-lightbulb-line text-2xl text-blue-600"></i>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-bold text-gray-900">준비물 팁</h4>
                <p className="leading-relaxed text-gray-600">
                  모든 의류와 개인 물품에는 이름표를 부착해주세요. 귀중품은 최소한으로 가져오시고, 필요시 시설에서
                  안전하게 보관해드립니다. 계절에 따라 추가 의류가 필요할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 생활 규칙 */}
      <section id="rules" className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref4}
            initial={{ opacity: 0, y: 30 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">생활 규칙</h2>
            <p className="text-lg text-gray-600">규칙적인 생활로 건강한 일상을 만들어갑니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lifeRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-amber-50">
                    <i className={`${rule.icon} text-xl text-[#5C8D5A]`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{rule.title}</h3>
                    <p className="text-sm text-gray-600">{rule.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 shadow-md transition-all hover:shadow-lg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                  <div className="flex flex-1 items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5C8D5A]">
                      <span className="text-sm font-bold text-white">Q</span>
                    </div>
                    <h3 className="flex-1 text-lg font-bold text-gray-900">{faq.question}</h3>
                  </div>
                  <i className="ri-arrow-down-s-line flex-shrink-0 text-2xl text-gray-600 transition-transform group-open:rotate-180"></i>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">입소 상담을 원하시나요?</h2>
            <p className="mb-8 text-lg text-white/90">전문 상담사가 친절하게 안내해드립니다</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="cursor-pointer whitespace-nowrap rounded-xl bg-white px-8 py-4 font-bold text-[#5C8D5A] shadow-lg transition-all hover:bg-gray-100"
              >
                <i className="ri-phone-line mr-2"></i>
                전화 상담하기
              </a>
              <a
                href="/visit"
                className="cursor-pointer whitespace-nowrap rounded-xl border-2 border-white bg-transparent px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#5C8D5A]"
              >
                <i className="ri-calendar-check-line mr-2"></i>
                방문 예약하기
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
