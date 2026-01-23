import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '입소상담',
    message: '',
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacy) {
      alert('개인정보 수집 및 이용에 동의해주세요');
      return;
    }

    if (formData.message.length > 500) {
      alert('문의 내용은 500자 이내로 작성해주세요');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://readdy.ai/api/form/d5ne6qh44v703eh91df0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          type: formData.type,
          message: formData.message,
        }).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          type: '입소상담',
          message: '',
          privacy: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              온라인 상담신청
            </h2>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              입소 상담 및 방문 예약을 원하시면 아래 양식을 작성해 주세요.
              <br />
              빠른 시간 내에 연락드리겠습니다.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    전화 상담
                  </h3>
                  <p className="text-sm text-gray-600">02-1234-5678</p>
                  <p className="text-sm text-gray-500">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    이메일 문의
                  </h3>
                  <p className="text-sm text-gray-600">contact@nursingcare.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-line text-xl text-[#5C8D5A]"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    찾아오시는 길
                  </h3>
                  <p className="text-sm text-gray-600">
                    서울특별시 강남구 테헤란로 123
                    <br />
                    요양센터빌딩 2층
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F9F8F6] rounded-xl p-8">
            <form onSubmit={handleSubmit} data-readdy-form id="contact-form">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    성함 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none"
                    placeholder="성함을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none"
                    placeholder="연락처를 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none"
                    placeholder="이메일을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    상담 유형 *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none cursor-pointer"
                  >
                    <option value="입소상담">입소상담</option>
                    <option value="방문예약">방문예약</option>
                    <option value="기타문의">기타문의</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C8D5A] focus:border-transparent outline-none resize-none"
                    placeholder="문의 내용을 입력해주세요 (최대 500자)"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.message.length} / 500자
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="privacy"
                    id="privacy"
                    checked={formData.privacy}
                    onChange={(e) =>
                      setFormData({ ...formData, privacy: e.target.checked })
                    }
                    required
                    className="mt-1 w-4 h-4 text-[#5C8D5A] border-gray-300 rounded focus:ring-[#5C8D5A] cursor-pointer"
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                  >
                    개인정보 수집 및 이용에 동의합니다. (수집 목적: 상담 및 문의 응대,
                    보관 기간: 3년)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#5C8D5A] text-white text-base font-semibold rounded-lg hover:bg-[#4A7548] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? '전송 중...' : '상담 신청하기'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 text-center">
                      상담 신청이 완료되었습니다. 빠른 시간 내에 연락드리겠습니다.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 text-center">
                      전송 중 오류가 발생했습니다. 다시 시도해주세요.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
