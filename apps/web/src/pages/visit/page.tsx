import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FloatingSidebar from '../../components/feature/FloatingSidebar';

export default function VisitPage() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    residentName: '',
    visitDate: '',
    visitTime: '',
    visitors: '1',
    purpose: '',
    message: ''
  });

  const visitRules = [
    {
      title: '면회 시간',
      content: '평일 오전 10시 ~ 오후 6시',
      icon: 'ri-time-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: '주말 면회',
      content: '사전 예약 필수',
      icon: 'ri-calendar-check-line',
      color: 'from-green-500 to-green-600'
    },
    {
      title: '면회 인원',
      content: '1회 최대 3명까지',
      icon: 'ri-group-line',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: '면회 장소',
      content: '1층 면회실 또는 개인실',
      icon: 'ri-map-pin-line',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const visitGuidelines = [
    {
      title: '면회 전 준비사항',
      items: [
        '방문 전 시설에 연락하여 어르신 상태 확인',
        '감기 등 전염성 질환이 있는 경우 면회 자제',
        '방문자 명부 작성 (성명, 연락처)',
        '손 소독 및 마스크 착용'
      ],
      icon: 'ri-checkbox-circle-line'
    },
    {
      title: '면회 시 주의사항',
      items: [
        '큰 소리로 대화하지 않기',
        '다른 어르신들께 방해되지 않도록 주의',
        '음식물 반입 시 사전 확인 필수',
        '어르신의 컨디션을 고려한 면회 시간 조절'
      ],
      icon: 'ri-alert-line'
    },
    {
      title: '외출 및 외박',
      items: [
        '외출/외박 최소 1일 전 신청',
        '보호자 동의서 작성',
        '귀가 시간 및 연락처 남기기',
        '복용 중인 약 지참'
      ],
      icon: 'ri-door-open-line'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('면회 예약이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=warm%20family%20visiting%20elderly%20person%20in%20comfortable%20care%20facility%20reception%20area%20with%20natural%20lighting%20happy%20reunion%20moment%20modern%20welcoming%20interior%20design%20peaceful%20atmosphere%20with%20plants%20and%20comfortable%20seating&width=1920&height=600&seq=visit-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <i className="ri-parent-line text-[#5C8D5A] text-xl"></i>
              <span className="text-sm font-semibold text-gray-700">면회안내</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              면회 안내 및 예약
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              사랑하는 가족을 만나는 소중한 시간<br />
              편안한 면회를 위한 안내와 예약 서비스를 제공합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 면회 규정 */}
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
              면회 규정
            </h2>
            <p className="text-lg text-gray-600">
              원활한 면회를 위한 기본 규정입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${rule.color} flex items-center justify-center mb-6 mx-auto`}>
                  <i className={`${rule.icon} text-3xl text-white`}></i>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{rule.title}</h3>
                  <p className="text-sm text-gray-600">{rule.content}</p>
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
                <h4 className="text-lg font-bold text-gray-900 mb-2">면회 시간 안내</h4>
                <p className="text-gray-600 leading-relaxed">
                  어르신의 건강과 휴식을 위해 면회 시간을 준수해주시기 바랍니다. 
                  특별한 사정이 있으신 경우 사전에 연락주시면 조정 가능합니다. 
                  주말 및 공휴일 면회는 반드시 사전 예약이 필요합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 면회 가이드라인 */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              면회 가이드라인
            </h2>
            <p className="text-lg text-gray-600">
              편안하고 안전한 면회를 위한 안내사항입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visitGuidelines.map((guideline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 flex items-center justify-center mb-6">
                  <i className={`${guideline.icon} text-3xl text-[#5C8D5A]`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{guideline.title}</h3>
                <ul className="space-y-3">
                  {guideline.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-[#5C8D5A] mt-1 flex-shrink-0"></i>
                      <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 면회 예약 폼 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              면회 예약하기
            </h2>
            <p className="text-lg text-gray-600">
              사전 예약으로 더욱 편안한 면회를 준비하세요
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    방문자 성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  면회 대상 어르신 성함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="residentName"
                  value={formData.residentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all"
                  placeholder="어르신 성함을 입력해주세요"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    방문 희망일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    방문 희망시간 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all"
                  >
                    <option value="">시간 선택</option>
                    <option value="10:00">오전 10시</option>
                    <option value="11:00">오전 11시</option>
                    <option value="12:00">오후 12시</option>
                    <option value="13:00">오후 1시</option>
                    <option value="14:00">오후 2시</option>
                    <option value="15:00">오후 3시</option>
                    <option value="16:00">오후 4시</option>
                    <option value="17:00">오후 5시</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    방문 인원 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="visitors"
                    value={formData.visitors}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all"
                  >
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    방문 목적
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all"
                  >
                    <option value="">선택</option>
                    <option value="일반면회">일반 면회</option>
                    <option value="외출">외출</option>
                    <option value="외박">외박</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  추가 요청사항
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="추가로 전달하실 내용이 있으시면 작성해주세요"
                ></textarea>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line text-[#5C8D5A] text-xl mt-0.5"></i>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    예약 신청 후 담당자가 확인하여 연락드립니다. 
                    긴급한 경우 직접 전화로 문의해주세요.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#5C8D5A] text-white rounded-xl font-bold hover:bg-[#4A7548] transition-all shadow-lg whitespace-nowrap"
              >
                <i className="ri-calendar-check-line mr-2"></i>
                면회 예약 신청하기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 연락처 정보 */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                면회 문의
              </h3>
              <p className="text-gray-600">
                면회와 관련하여 궁금하신 사항은 언제든 연락주세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="tel:02-1234-5678"
                className="flex items-center gap-4 p-6 bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-[#5C8D5A] flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line text-2xl text-white"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">전화 문의</div>
                  <div className="text-lg font-bold text-gray-900">02-1234-5678</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-teal-50 to-amber-50 rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-[#5C8D5A] flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-2xl text-white"></i>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">운영 시간</div>
                  <div className="text-lg font-bold text-gray-900">평일 09:00 - 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}