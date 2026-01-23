import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import FloatingSidebar from '../../components/FloatingSidebar';
import Footer from '../../components/Footer';
import Navbar from '../../components/navbar/Navbar';

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
    message: '',
  });

  const visitRules = [
    {
      title: '면회 시간',
      content: '평일 오전 10시 ~ 오후 6시',
      icon: 'ri-time-line',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '주말 면회',
      content: '사전 예약 필수',
      icon: 'ri-calendar-check-line',
      color: 'from-green-500 to-green-600',
    },
    {
      title: '면회 인원',
      content: '1회 최대 3명까지',
      icon: 'ri-group-line',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: '면회 장소',
      content: '1층 면회실 또는 개인실',
      icon: 'ri-map-pin-line',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  const visitGuidelines = [
    {
      title: '면회 전 준비사항',
      items: [
        '방문 전 시설에 연락하여 어르신 상태 확인',
        '감기 등 전염성 질환이 있는 경우 면회 자제',
        '방문자 명부 작성 (성명, 연락처)',
        '손 소독 및 마스크 착용',
      ],
      icon: 'ri-checkbox-circle-line',
    },
    {
      title: '면회 시 주의사항',
      items: [
        '큰 소리로 대화하지 않기',
        '다른 어르신들께 방해되지 않도록 주의',
        '음식물 반입 시 사전 확인 필수',
        '어르신의 컨디션을 고려한 면회 시간 조절',
      ],
      icon: 'ri-alert-line',
    },
    {
      title: '외출 및 외박',
      items: ['외출/외박 최소 1일 전 신청', '보호자 동의서 작성', '귀가 시간 및 연락처 남기기', '복용 중인 약 지참'],
      icon: 'ri-door-open-line',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('면회 예약이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <Navbar />
      <FloatingSidebar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 pb-20 pt-32">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=warm%20family%20visiting%20elderly%20person%20in%20comfortable%20care%20facility%20reception%20area%20with%20natural%20lighting%20happy%20reunion%20moment%20modern%20welcoming%20interior%20design%20peaceful%20atmosphere%20with%20plants%20and%20comfortable%20seating&width=1920&height=600&seq=visit-hero-bg&orientation=landscape')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <i className="ri-parent-line text-xl text-[#5C8D5A]"></i>
              <span className="text-sm font-semibold text-gray-700">면회안내</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">면회 안내 및 예약</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              사랑하는 가족을 만나는 소중한 시간
              <br />
              편안한 면회를 위한 안내와 예약 서비스를 제공합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 면회 규정 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">면회 규정</h2>
            <p className="text-lg text-gray-600">원활한 면회를 위한 기본 규정입니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {visitRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${rule.color} mx-auto mb-6 flex items-center justify-center`}
                >
                  <i className={`${rule.icon} text-3xl text-white`}></i>
                </div>
                <div className="text-center">
                  <h3 className="mb-3 text-lg font-bold text-gray-900">{rule.title}</h3>
                  <p className="text-sm text-gray-600">{rule.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                <i className="ri-information-line text-2xl text-blue-600"></i>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-bold text-gray-900">면회 시간 안내</h4>
                <p className="leading-relaxed text-gray-600">
                  어르신의 건강과 휴식을 위해 면회 시간을 준수해주시기 바랍니다. 특별한 사정이 있으신 경우 사전에
                  연락주시면 조정 가능합니다. 주말 및 공휴일 면회는 반드시 사전 예약이 필요합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 면회 가이드라인 */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">면회 가이드라인</h2>
            <p className="text-lg text-gray-600">편안하고 안전한 면회를 위한 안내사항입니다</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {visitGuidelines.map((guideline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-amber-50">
                  <i className={`${guideline.icon} text-3xl text-[#5C8D5A]`}></i>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">{guideline.title}</h3>
                <ul className="space-y-3">
                  {guideline.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill mt-1 flex-shrink-0 text-[#5C8D5A]"></i>
                      <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 면회 예약 폼 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">면회 예약하기</h2>
            <p className="text-lg text-gray-600">사전 예약으로 더욱 편안한 면회를 준비하세요</p>
          </motion.div>

          <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 p-8 shadow-xl md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    방문자 성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">
                  면회 대상 어르신 성함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="residentName"
                  value={formData.residentName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
                  placeholder="어르신 성함을 입력해주세요"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    방문 희망일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    방문 희망시간 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
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

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    방문 인원 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="visitors"
                    value={formData.visitors}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
                  >
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">방문 목적</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
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
                <label className="mb-2 block text-sm font-bold text-gray-900">추가 요청사항</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#5C8D5A]"
                  placeholder="추가로 전달하실 내용이 있으시면 작성해주세요"
                ></textarea>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line mt-0.5 text-xl text-[#5C8D5A]"></i>
                  <p className="text-sm leading-relaxed text-gray-600">
                    예약 신청 후 담당자가 확인하여 연락드립니다. 긴급한 경우 직접 전화로 문의해주세요.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full whitespace-nowrap rounded-xl bg-[#5C8D5A] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#4A7548]"
              >
                <i className="ri-calendar-check-line mr-2"></i>
                면회 예약 신청하기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 연락처 정보 */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-xl md:p-10">
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">면회 문의</h3>
              <p className="text-gray-600">면회와 관련하여 궁금하신 사항은 언제든 연락주세요</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <a
                href="tel:02-1234-5678"
                className="flex cursor-pointer items-center gap-4 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 transition-all hover:shadow-lg"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#5C8D5A]">
                  <i className="ri-phone-line text-2xl text-white"></i>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">전화 문의</div>
                  <div className="text-lg font-bold text-gray-900">02-1234-5678</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#5C8D5A]">
                  <i className="ri-time-line text-2xl text-white"></i>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-600">운영 시간</div>
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
