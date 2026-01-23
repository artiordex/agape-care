import { useState } from 'react';

import { motion } from 'framer-motion';

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 여기에 실제 폼 제출 로직 추가
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setAgreed(false);
    }, 1500);
  };

  return (
    <section id="consultation" className="py-16 bg-gradient-to-b from-[#F9F8F6] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-[#5C8D5A]/10 text-[#5C8D5A] text-sm font-semibold rounded-full mb-4">
            상담 신청
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            무료 상담을 신청해 주세요
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            전문 상담원이 친절하게 안내해 드립니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* 연락 정보 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-[#5C8D5A] to-[#7BA178] rounded-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-5">연락처 안내</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-phone-line text-2xl"/>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">전화 상담</h4>
                      <p className="text-white/90 text-lg font-bold">02-1234-5678</p>
                      <p className="text-white/80 text-sm mt-1">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-chat-smile-3-line text-2xl"/>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">카카오톡 상담</h4>
                      <p className="text-white/90">@요양원센터</p>
                      <a
                        href="#"
                        className="inline-block mt-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer"
                      >
                        카카오톡 상담하기
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-2xl"/>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">이메일</h4>
                      <p className="text-white/90">info@nursinghome.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9F8F6] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  <i className="ri-time-line text-[#5C8D5A] mr-2"/>
                  상담 가능 시간
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">평일</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">토요일</span>
                    <span>09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="font-semibold">일요일/공휴일</span>
                    <span>휴무</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
                  * 긴급 상황 시 24시간 연락 가능합니다
                </p>
              </div>
            </div>
          </motion.div>

          {/* 상담 신청 폼 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-sm"
                    placeholder="이름을 입력해 주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-sm"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-sm"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        setFormData({ ...formData, message: e.target.value });
                      }
                    }}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent resize-none text-sm"
                    placeholder="상담하실 내용을 자유롭게 작성해 주세요 (최대 500자)"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.message.length} / 500자
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy-agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#5C8D5A] border-gray-300 rounded focus:ring-[#5C8D5A] cursor-pointer"
                  />
                  <label htmlFor="privacy-agree" className="text-sm text-gray-700 cursor-pointer">
                    개인정보 수집 및 이용에 동의합니다{' '}
                    <a href="#" className="text-[#5C8D5A] underline">
                      (내용 보기)
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#5C8D5A] text-white text-lg font-semibold rounded-lg hover:bg-[#4A7548] transition-all shadow-lg whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"/>
                      제출 중...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-fill mr-2"/>
                      상담 신청하기
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    <i className="ri-checkbox-circle-fill mr-2"/>
                    상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
