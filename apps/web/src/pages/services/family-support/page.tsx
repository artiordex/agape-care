import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import ServiceSidebar from '../../../components/feature/ServiceSidebar';
import Footer from '../../../components/feature/Footer';

export default function FamilySupportPage() {
  const supportServices = [
    {
      icon: 'ri-file-text-line',
      title: '생활일지 정기 공유',
      description: '어르신의 일상 활동과 건강 상태를 상세히 기록하여 보호자님께 정기적으로 전달합니다',
      details: [
        '주간 생활일지 제공',
        '식사량 및 수면 패턴 기록',
        '활동 프로그램 참여 내역',
        '특이사항 즉시 알림'
      ],
      frequency: '매주 공유'
    },
    {
      icon: 'ri-video-chat-line',
      title: '영상 면회 시스템',
      description: '시간과 장소에 구애받지 않고 화상통화로 어르신을 만나실 수 있습니다',
      details: [
        '사전 예약제 운영',
        '태블릿·컴퓨터 지원',
        '요양보호사 면회 보조',
        '평일 09:00 ~ 18:00 가능'
      ],
      frequency: '예약 시 수시'
    },
    {
      icon: 'ri-chat-voice-line',
      title: '보호자 상담 프로그램',
      description: '정기적인 대면 상담을 통해 어르신의 상태와 향후 케어 방향을 논의합니다',
      details: [
        '월 1회 정기 상담',
        '사회복지사 전문 상담',
        '케어 플랜 조정 논의',
        '가족 의견 적극 반영'
      ],
      frequency: '월 1회'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: '건강 상태 정기 보고',
      description: '혈압, 혈당, 투약 내역 등 어르신의 건강 상태를 체계적으로 관리하고 보고합니다',
      details: [
        '월간 건강 리포트 발송',
        '만성질환 관리 현황',
        '투약 내역 및 변경사항',
        '협력병원 진료 기록'
      ],
      frequency: '매월 발송'
    },
    {
      icon: 'ri-notification-3-line',
      title: '긴급 상황 즉시 연락',
      description: '낙상, 질병 악화 등 응급 상황 발생 시 보호자님께 즉시 연락드립니다',
      details: [
        '24시간 비상 연락망 운영',
        '응급 상황 즉시 통보',
        '병원 이송 시 동행 안내',
        '처치 내용 상세 설명'
      ],
      frequency: '발생 시 즉시'
    },
    {
      icon: 'ri-calendar-event-line',
      title: '가족 행사 참여 지원',
      description: '명절, 생신, 가족 모임 등 특별한 날에 가족과 함께할 수 있도록 지원합니다',
      details: [
        '외출·외박 지원',
        '가족 방문 일정 조율',
        '생신잔치 기획 지원',
        '가족 식사 공간 제공'
      ],
      frequency: '요청 시'
    }
  ];

  const communicationChannels = [
    {
      icon: 'ri-phone-line',
      title: '전화 상담',
      time: '평일 09:00 ~ 18:00',
      description: '언제든지 전화로 문의하실 수 있습니다',
      contact: '02-1234-5678'
    },
    {
      icon: 'ri-mail-line',
      title: '이메일 문의',
      time: '24시간 접수',
      description: '이메일로 문의하시면 24시간 내 답변드립니다',
      contact: 'contact@nursingcare.com'
    },
    {
      icon: 'ri-message-3-line',
      title: '카카오톡 상담',
      time: '평일 09:00 ~ 18:00',
      description: '카카오톡 채널로 빠르게 문의하실 수 있습니다',
      contact: '@요양센터'
    },
    {
      icon: 'ri-user-location-line',
      title: '방문 상담',
      time: '사전 예약제',
      description: '직접 방문하셔서 상담하실 수 있습니다',
      contact: '예약 필수'
    }
  ];

  const visitGuidelines = [
    {
      title: '방문 시간',
      icon: 'ri-time-line',
      content: [
        '평일: 오전 10시 ~ 오후 6시',
        '주말·공휴일: 오전 10시 ~ 오후 5시',
        '※ 식사 시간(12:00~13:00, 18:00~19:00)은 피해주세요'
      ]
    },
    {
      title: '방문 시 준비사항',
      icon: 'ri-shield-check-line',
      content: [
        '방문 전 체온 측정 및 손 소독',
        '마스크 착용 필수',
        '감염병 증상 시 방문 자제',
        '※ 독감·폐렴 유행 시기 방문 제한 가능'
      ]
    },
    {
      title: '외출·외박 신청',
      icon: 'ri-home-heart-line',
      content: [
        '외출: 최소 1일 전 신청',
        '외박: 최소 3일 전 신청',
        '귀원 시간 반드시 준수',
        '※ 건강 상태에 따라 제한될 수 있습니다'
      ]
    }
  ];

  const familyPrograms = [
    {
      title: '보호자 교육',
      description: '치매·노인 돌봄에 대한 교육 프로그램을 분기별로 제공합니다',
      icon: 'ri-book-open-line',
      schedule: '분기 1회'
    },
    {
      title: '가족 간담회',
      description: '보호자님들과 요양원 운영진이 함께 모여 의견을 나누는 자리입니다',
      icon: 'ri-team-line',
      schedule: '반기 1회'
    },
    {
      title: '힐링 프로그램',
      description: '어르신을 돌보는 가족의 심리적 부담을 덜어드리는 상담·힐링 프로그램입니다',
      icon: 'ri-heart-add-line',
      schedule: '수시 운영'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-pink-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-400 text-white py-20 mt-20">
          {/* 히어로 섹션 */}
          <section className="relative bg-gradient-to-b from-[#E8B4B8]/10 to-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Link to="/" className="hover:text-[#5C8D5A] transition-colors">홈</Link>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="text-[#5C8D5A] font-semibold">가족소통·상담지원</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  가족소통·상담지원
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  정원 29인 소규모 요양원의 가장 큰 장점은 보호자님과의 긴밀한 소통입니다. 생활일지 정기 공유, 영상 면회, 건강 상태 보고, 보호자 상담 프로그램 등 다양한 채널을 통해 어르신의 일상과 건강을 투명하게 공유하고, 가족과 함께하는 돌봄을 실현합니다.
                </p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          {/* 소통·지원 서비스 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#E8B4B8]/10 text-[#C67C82] text-sm font-semibold rounded-full mb-4">
                  소통 서비스
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  가족과 함께하는 투명한 소통
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  어르신의 일상과 건강을 빠짐없이 공유하여 안심할 수 있도록 합니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {supportServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#F9F8F6] rounded-2xl p-8 border border-gray-100 hover:border-[#E8B4B8]/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-[#E8B4B8]/10 rounded-2xl flex items-center justify-center">
                        <i className={`${service.icon} text-3xl text-[#C67C82]`}></i>
                      </div>
                      <span className="px-3 py-1 bg-[#E8B4B8]/10 text-[#C67C82] text-xs font-semibold rounded-full">
                        {service.frequency}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#E8B4B8] rounded-full"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 소통 채널 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#E8B4B8]/10 text-[#C67C82] text-sm font-semibold rounded-full mb-4">
                  소통 채널
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  다양한 소통 방법
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  보호자님께 편리한 방법으로 언제든 문의하실 수 있습니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communicationChannels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#E8B4B8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${channel.icon} text-2xl text-[#C67C82]`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {channel.title}
                    </h3>
                    <p className="text-sm text-[#C67C82] font-semibold mb-3">
                      {channel.time}
                    </p>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {channel.description}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {channel.contact}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 방문 안내 */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#E8B4B8]/10 text-[#C67C82] text-sm font-semibold rounded-full mb-4">
                  방문 안내
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  방문 및 외출·외박 안내
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  어르신을 직접 방문하실 때 알아두시면 좋은 안내사항입니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visitGuidelines.map((guideline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#F9F8F6] rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#E8B4B8]/10 rounded-xl flex items-center justify-center mb-6">
                      <i className={`${guideline.icon} text-2xl text-[#C67C82]`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      {guideline.title}
                    </h3>
                    <ul className="space-y-3">
                      {guideline.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <i className="ri-arrow-right-s-line text-[#C67C82] flex-shrink-0 mt-0.5"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 가족 프로그램 */}
          <section className="py-20 bg-[#F9F8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-2 bg-[#E8B4B8]/10 text-[#C67C82] text-sm font-semibold rounded-full mb-4">
                  가족 프로그램
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  보호자를 위한 지원 프로그램
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto">
                  어르신뿐만 아니라 보호자님도 함께 돌봅니다
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {familyPrograms.map((program, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#E8B4B8]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <i className={`${program.icon} text-3xl text-[#C67C82]`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {program.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-[#E8B4B8]/10 text-[#C67C82] text-sm font-semibold rounded-full">
                      {program.schedule}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 상담 CTA */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#E8B4B8] to-[#D4A0A6] rounded-3xl p-12 text-center text-white"
              >
                <h2 className="text-3xl font-bold mb-4">
                  가족소통·상담 문의
                </h2>
                <p className="text-base mb-8 opacity-90">
                  어르신과 보호자님 모두 안심할 수 있는 소통 시스템을 안내해 드립니다
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:02-1234-5678"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#C67C82] px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-phone-line text-xl"></i>
                    전화 상담하기
                  </a>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all whitespace-nowrap border-2 border-white/30 cursor-pointer"
                  >
                    <i className="ri-mail-line text-xl"></i>
                    온라인 문의
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}