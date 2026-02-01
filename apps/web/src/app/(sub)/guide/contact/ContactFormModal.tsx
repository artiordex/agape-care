/**
 * Description : ContactFormModal.tsx - 📌 상담 신청 폼 모달 (모달 기능 구현)
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: '',
    residentAge: '',
    careLevel: '',
    preferredDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('상담 신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
      setIsSubmitting(false);
      onClose();

      setFormData({
        name: '',
        phone: '',
        email: '',
        inquiryType: '',
        residentAge: '',
        careLevel: '',
        preferredDate: '',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inquiryTypes = [
    { value: '', label: '선택해주세요' },
    { value: '입소문의', label: '입소 문의' },
    { value: '비용문의', label: '비용 문의' },
    { value: '시설견학', label: '시설 견학 예약' },
    { value: '프로그램문의', label: '프로그램 문의' },
    { value: '기타', label: '기타 문의' },
  ];

  const careLevels = [
    { value: '', label: '선택해주세요' },
    { value: '1등급', label: '1등급' },
    { value: '2등급', label: '2등급' },
    { value: '3등급', label: '3등급' },
    { value: '4등급', label: '4등급' },
    { value: '5등급', label: '5등급' },
    { value: '인지지원등급', label: '인지지원등급' },
    { value: '미신청', label: '등급 미신청' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 모달 컨텐츠 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="sticky top-0 z-10 border-b border-gray-200 bg-gradient-to-r from-[#5C8D5A] to-[#7CAF7A] px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <i className="ri-survey-line text-2xl" />
                    <h3 className="text-xl font-bold">상담 신청하기</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                  >
                    <i className="ri-close-line text-xl" />
                  </button>
                </div>
              </div>

              {/* 모달 바디 (스크롤 가능) */}
              <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
                {/* 설명 텍스트 */}
                <p className="mb-8 text-center text-lg text-gray-600">아래 양식을 작성해주시면 빠르게 상담해드립니다</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 상담자 정보 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-user-line text-[#5C8D5A]" /> 상담자 정보
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-900">
                          성함 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="홍길동"
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-bold text-gray-900">
                          연락처 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="010-0000-0000"
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-900">
                          이메일
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 문의 내용 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-question-line text-[#5C8D5A]" /> 문의 내용
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="inquiryType" className="mb-2 block text-sm font-bold text-gray-900">
                          문의 유형 <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        >
                          {inquiryTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="residentAge" className="mb-2 block text-sm font-bold text-gray-900">
                          어르신 연령
                        </label>
                        <input
                          id="residentAge"
                          type="text"
                          name="residentAge"
                          value={formData.residentAge}
                          onChange={handleChange}
                          placeholder="예) 85세"
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="careLevel" className="mb-2 block text-sm font-bold text-gray-900">
                          장기요양등급
                        </label>
                        <select
                          id="careLevel"
                          name="careLevel"
                          value={formData.careLevel}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        >
                          {careLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="preferredDate" className="mb-2 block text-sm font-bold text-gray-900">
                          방문 상담 희망일
                        </label>
                        <input
                          id="preferredDate"
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 상세 문의사항 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-message-3-line text-[#5C8D5A]" /> 상세 문의사항
                    </h3>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-bold text-gray-900">
                        문의 내용
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="궁금하신 사항이나 특별히 안내받고 싶은 내용을 자유롭게 작성해주세요"
                        className="w-full resize-none rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                      />
                    </div>
                  </div>

                  {/* 개인정보 동의 */}
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <label htmlFor="privacy-agreement" className="flex cursor-pointer items-start gap-3">
                      <input
                        id="privacy-agreement"
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                      />
                      <span className="text-sm text-gray-600">
                        개인정보 수집 및 이용에 동의합니다.{' '}
                        <span className="mt-1 block text-xs text-gray-500">
                          수집된 개인정보는 상담 및 연락 목적으로만 사용되며, 상담 완료 후 1년 이내 파기됩니다.
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-8 py-4 font-bold text-gray-700 transition-all hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all ${
                        isSubmitting
                          ? 'cursor-not-allowed bg-gray-400'
                          : 'bg-[#5C8D5A] hover:bg-[#4A7548] hover:shadow-xl active:scale-[0.98]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line mr-2 animate-spin" /> 상담 신청 중...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-line mr-2" /> 상담 신청하기
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* 하단 안내 */}
                <div className="mt-8 text-center text-sm text-gray-500">
                  <p>상담 관련 문의: 02-1234-5678 (평일 09:00-18:00)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
