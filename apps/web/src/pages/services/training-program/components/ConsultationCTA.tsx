import { useState } from 'react';

export default function ConsultationCTA() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name || !formData.phone) {
      alert('이름과 연락처는 필수 입력 항목입니다.');
      return;
    }

    if (formData.message.length > 500) {
      alert('문의 내용은 500자 이내로 작성해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('relationship', formData.relationship);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d5nevuvpl7huldvcit4g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          relationship: '',
          message: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-teal-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 안내 */}
          <div>
            <span className="inline-block px-5 py-2 bg-white rounded-full text-[#5C8D5A] font-semibold text-sm mb-6 shadow-sm">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              프로그램 상담을<br />
              <span className="text-[#5C8D5A]">신청해 주세요</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              지금 상담을 신청하시면 맞춤형 프로그램 안내를 도와드립니다.<br />
              전문 상담사가 친절하게 답변해 드리겠습니다.
            </p>

            {/* 연락 정보 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex-shrink-0">
                  <i className="ri-phone-line text-2xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">전화 상담</p>
                  <a href="tel:02-1234-5678" className="text-lg font-bold text-gray-900 hover:text-[#5C8D5A] cursor-pointer">
                    02-1234-5678
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex-shrink-0">
                  <i className="ri-time-line text-2xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">상담 시간</p>
                  <p className="text-lg font-bold text-gray-900">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex-shrink-0">
                  <i className="ri-mail-line text-2xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">이메일 문의</p>
                  <a href="mailto:contact@nursingcare.com" className="text-lg font-bold text-gray-900 hover:text-[#5C8D5A] cursor-pointer">
                    contact@nursingcare.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#5C8D5A]">
              <p className="text-sm text-gray-700 leading-relaxed">
                <i className="ri-information-line text-[#5C8D5A] mr-2"></i>
                <strong>상담 후 절차:</strong> 전문 상담사가 어르신의 상태를 평가하고 최적의 프로그램을 안내해 드립니다. 방문 상담도 가능합니다.
              </p>
            </div>
          </div>

          {/* 오른쪽: 상담폼 */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ri-edit-box-line text-[#5C8D5A]"></i>
              상담 신청서
            </h3>

            <form id="consultation-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-base"
                  placeholder="성함을 입력해주세요"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-base"
                  placeholder="010-0000-0000"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-base"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="relationship" className="block text-sm font-semibold text-gray-700 mb-2">
                  어르신과의 관계
                </label>
                <select
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-base cursor-pointer"
                >
                  <option value="">선택해주세요</option>
                  <option value="자녀">자녀</option>
                  <option value="손자녀">손자녀</option>
                  <option value="배우자">배우자</option>
                  <option value="친인척">친인척</option>
                  <option value="지인">지인</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  문의 내용 (최대 500자)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent text-base resize-none"
                  placeholder="궁금하신 사항을 자유롭게 작성해주세요"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {formData.message.length} / 500자
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-xl"></i>
                    <span>전송 중...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-fill text-xl"></i>
                    <span>상담 신청하기</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 flex-shrink-0"></i>
                  <div>
                    <p className="text-sm font-semibold text-green-800 mb-1">상담 신청이 완료되었습니다!</p>
                    <p className="text-xs text-green-700">빠른 시일 내에 연락드리겠습니다.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <i className="ri-error-warning-fill text-2xl text-red-600 flex-shrink-0"></i>
                  <div>
                    <p className="text-sm font-semibold text-red-800 mb-1">전송에 실패했습니다</p>
                    <p className="text-xs text-red-700">다시 시도하거나 전화로 문의해주세요.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}