import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';

export default function ProgramsPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  const weeklyPrograms = [
    {
      day: '월요일',
      morning: '인지활동 프로그램',
      afternoon: '음악치료',
      icon: 'ri-music-2-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      day: '화요일',
      morning: '물리치료',
      afternoon: '미술활동',
      icon: 'ri-palette-line',
      color: 'from-green-500 to-green-600'
    },
    {
      day: '수요일',
      morning: '작업치료',
      afternoon: '원예활동',
      icon: 'ri-plant-line',
      color: 'from-teal-500 to-teal-600'
    },
    {
      day: '목요일',
      morning: '인지활동 프로그램',
      afternoon: '레크리에이션',
      icon: 'ri-game-line',
      color: 'from-amber-500 to-amber-600'
    },
    {
      day: '금요일',
      morning: '물리치료',
      afternoon: '영화감상',
      icon: 'ri-movie-line',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const programCategories = [
    {
      title: '인지활동 프로그램',
      description: '기억력과 인지능력 향상을 위한 다양한 활동',
      programs: ['회상요법', '퍼즐 맞추기', '숫자 게임', '단어 찾기', '색칠하기'],
      icon: 'ri-brain-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20people%20doing%20cognitive%20activities%20puzzle%20games%20memory%20exercises%20in%20bright%20comfortable%20care%20facility%20room%20with%20natural%20lighting%20happy%20engaged%20seniors%20working%20together%20on%20brain%20training%20activities&width=800&height=600&seq=cognitive-program-img&orientation=landscape'
    },
    {
      title: '물리치료',
      description: '신체 기능 유지 및 향상을 위한 재활 운동',
      programs: ['관절 운동', '근력 강화', '보행 훈련', '균형 운동', '스트레칭'],
      icon: 'ri-wheelchair-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20physical%20therapy%20rehabilitation%20exercises%20with%20professional%20therapist%20in%20modern%20care%20facility%20gym%20seniors%20doing%20gentle%20stretching%20and%20balance%20exercises%20supportive%20healthcare%20environment&width=800&height=600&seq=physical-therapy-img&orientation=landscape'
    },
    {
      title: '작업치료',
      description: '일상생활 능력 향상을 위한 실용적 활동',
      programs: ['손 기능 훈련', '일상생활 동작', '소근육 운동', '도구 사용 훈련', '자조 활동'],
      icon: 'ri-hand-heart-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20occupational%20therapy%20daily%20living%20skills%20training%20hand%20exercises%20with%20therapist%20in%20comfortable%20care%20facility%20room%20seniors%20practicing%20fine%20motor%20skills%20with%20various%20tools%20and%20activities&width=800&height=600&seq=occupational-therapy-img&orientation=landscape'
    },
    {
      title: '음악치료',
      description: '정서 안정과 즐거움을 위한 음악 활동',
      programs: ['노래 부르기', '악기 연주', '음악 감상', '리듬 활동', '음악 회상'],
      icon: 'ri-music-2-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20music%20therapy%20session%20seniors%20singing%20and%20playing%20instruments%20together%20in%20bright%20cheerful%20care%20facility%20room%20joyful%20atmosphere%20with%20musical%20instruments%20and%20happy%20engaged%20participants&width=800&height=600&seq=music-therapy-img&orientation=landscape'
    },
    {
      title: '미술활동',
      description: '창의력과 표현력을 키우는 예술 활동',
      programs: ['그림 그리기', '만들기', '색칠하기', '점토 공예', '콜라주'],
      icon: 'ri-palette-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20art%20therapy%20painting%20and%20crafts%20activities%20seniors%20creating%20artwork%20in%20bright%20studio%20space%20colorful%20art%20supplies%20creative%20expression%20in%20comfortable%20care%20facility%20setting&width=800&height=600&seq=art-activity-img&orientation=landscape'
    },
    {
      title: '원예활동',
      description: '자연과 함께하는 힐링 프로그램',
      programs: ['화분 가꾸기', '씨앗 심기', '물주기', '꽃꽂이', '텃밭 가꾸기'],
      icon: 'ri-plant-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20gardening%20activity%20seniors%20planting%20flowers%20and%20caring%20for%20plants%20in%20bright%20greenhouse%20or%20garden%20area%20therapeutic%20horticulture%20program%20in%20care%20facility%20with%20natural%20sunlight&width=800&height=600&seq=gardening-activity-img&orientation=landscape'
    },
    {
      title: '레크리에이션',
      description: '즐거운 여가 활동과 사회적 교류',
      programs: ['게임 활동', '체조', '댄스', '노래방', '생일 파티'],
      icon: 'ri-game-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20recreation%20activities%20seniors%20playing%20games%20and%20dancing%20together%20in%20spacious%20activity%20room%20joyful%20social%20gathering%20with%20laughter%20and%20fun%20in%20modern%20care%20facility&width=800&height=600&seq=recreation-activity-img&orientation=landscape'
    },
    {
      title: '영화감상',
      description: '추억의 영화와 함께하는 문화 활동',
      programs: ['옛날 영화', '다큐멘터리', '음악 영상', '드라마', '공연 영상'],
      icon: 'ri-movie-line',
      image: 'https://readdy.ai/api/search-image?query=elderly%20watching%20movies%20together%20in%20comfortable%20theater%20style%20room%20with%20large%20screen%20cozy%20seating%20arrangement%20in%20care%20facility%20seniors%20enjoying%20entertainment%20and%20cultural%20activities&width=800&height=600&seq=movie-watching-img&orientation=landscape'
    }
  ];

  const specialPrograms = [
    {
      title: '생신 잔치',
      description: '매월 생신을 맞으신 어르신들을 위한 특별한 축하 행사',
      frequency: '매월 1회',
      icon: 'ri-cake-3-line',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      title: '명절 행사',
      description: '설날, 추석 등 명절을 맞아 전통 문화 체험',
      frequency: '명절마다',
      icon: 'ri-gift-line',
      color: 'bg-red-50 text-red-600'
    },
    {
      title: '야외 나들이',
      description: '계절에 맞는 야외 활동 및 나들이 프로그램',
      frequency: '분기별 1회',
      icon: 'ri-bus-line',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: '가족 참여 행사',
      description: '가족과 함께하는 특별 프로그램',
      frequency: '분기별 1회',
      icon: 'ri-parent-line',
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=elderly%20care%20facility%20activity%20room%20with%20seniors%20participating%20in%20various%20programs%20bright%20spacious%20interior%20with%20natural%20lighting%20joyful%20atmosphere%20modern%20comfortable%20setting%20for%20therapeutic%20activities&width=1920&height=600&seq=programs-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <i className="ri-calendar-check-line text-[#5C8D5A] text-xl"></i>
              <span className="text-sm font-semibold text-gray-700">프로그램 안내</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              월간 프로그램 일정
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              어르신들의 건강하고 즐거운 생활을 위한<br />
              다양한 프로그램을 매일 진행합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 주간 프로그램 일정 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              주간 프로그램 일정
            </h2>
            <p className="text-lg text-gray-600">
              매주 규칙적으로 진행되는 프로그램입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {weeklyPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${program.color} px-6 py-6 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{program.day}</h3>
                    <i className={`${program.icon} text-2xl`}></i>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">오전 (10:00-11:30)</div>
                    <div className="text-sm font-semibold text-gray-900">{program.morning}</div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-xs text-gray-500 mb-1">오후 (14:00-15:30)</div>
                    <div className="text-sm font-semibold text-gray-900">{program.afternoon}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <i className="ri-information-line text-2xl text-blue-600"></i>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">프로그램 참여 안내</h4>
                <p className="text-gray-600 leading-relaxed">
                  모든 프로그램은 어르신의 건강 상태와 의사를 고려하여 참여하실 수 있습니다. 
                  개인별 맞춤 프로그램 계획을 수립하여 진행하며, 
                  참여가 어려우신 경우 개별 활동을 제공해드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 상세 */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              프로그램 상세 안내
            </h2>
            <p className="text-lg text-gray-600">
              각 프로그램의 세부 내용을 확인하세요
            </p>
          </motion.div>

          <div className="space-y-8">
            {programCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 flex items-center justify-center">
                        <i className={`${category.icon} text-3xl text-[#5C8D5A]`}></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm font-bold text-gray-900 mb-3">주요 활동</div>
                      <div className="flex flex-wrap gap-2">
                        {category.programs.map((program, programIndex) => (
                          <span
                            key={programIndex}
                            className="px-4 py-2 bg-gradient-to-br from-teal-50 to-amber-50 text-gray-700 rounded-lg text-sm font-medium"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 특별 프로그램 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              특별 프로그램
            </h2>
            <p className="text-lg text-gray-600">
              특별한 날을 더욱 의미있게 만드는 행사들입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl ${program.color} flex items-center justify-center mb-6 mx-auto`}>
                  <i className={`${program.icon} text-3xl`}></i>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full">
                    <i className="ri-calendar-line text-[#5C8D5A]"></i>
                    <span className="text-sm font-semibold text-gray-700">{program.frequency}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#5C8D5A] to-[#4A7548]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              프로그램이 궁금하신가요?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              더 자세한 프로그램 안내를 받아보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-[#5C8D5A] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg cursor-pointer whitespace-nowrap"
              >
                <i className="ri-phone-line mr-2"></i>
                프로그램 문의하기
              </a>
              <a
                href="/gallery"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#5C8D5A] transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-image-line mr-2"></i>
                활동 사진 보기
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}