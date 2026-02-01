// app/visit/VisitFormModal.tsx
/**
 * Description : VisitFormModal.tsx - 📌 면회 예약 모달 컴포넌트
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface VisitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisitFormModal({ isOpen, onClose }: VisitFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: '',
    residentName: '',
    visitDate: '',
    visitTime: '',
    visitors: '1',
    purpose: '',
    hasSymptoms: 'no',
    needsAssistance: 'no',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제로는 API 호출
    setTimeout(() => {
      alert('면회 예약이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
      setIsSubmitting(false);
      onClose();

      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        relationship: '',
        residentName: '',
        visitDate: '',
        visitTime: '',
        visitors: '1',
        purpose: '',
        hasSymptoms: 'no',
        needsAssistance: 'no',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const timeSlots = [
    { value: '10:00', label: '오전 10:00' },
    { value: '10:30', label: '오전 10:30' },
    { value: '11:00', label: '오전 11:00' },
    { value: '11:30', label: '오전 11:30' },
    { value: '13:00', label: '오후 1:00' },
    { value: '13:30', label: '오후 1:30' },
    { value: '14:00', label: '오후 2:00' },
    { value: '14:30', label: '오후 2:30' },
    { value: '15:00', label: '오후 3:00' },
    { value: '15:30', label: '오후 3:30' },
    { value: '16:00', label: '오후 4:00' },
    { value: '16:30', label: '오후 4:30' },
    { value: '17:00', label: '오후 5:00' },
  ];

  const relationships = [
    { value: '', label: '선택해주세요' },
    { value: '본인', label: '본인' },
    { value: '배우자', label: '배우자' },
    { value: '자녀', label: '자녀' },
    { value: '손자녀', label: '손자녀' },
    { value: '형제자매', label: '형제자매' },
    { value: '친척', label: '친척' },
    { value: '지인', label: '지인' },
    { value: '기타', label: '기타' },
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
                    <i className="ri-calendar-check-line text-2xl" />
                    <h3 className="text-xl font-bold">면회 예약 신청</h3>
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 방문자 정보 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-user-line text-[#5C8D5A]" /> 방문자 정보
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="visitor-name" className="mb-2 block text-sm font-bold text-gray-900">
                          방문자 성함 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="visitor-name"
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
                        <label htmlFor="visitor-phone" className="mb-2 block text-sm font-bold text-gray-900">
                          연락처 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="visitor-phone"
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
                        <label htmlFor="visitor-relationship" className="mb-2 block text-sm font-bold text-gray-900">
                          어르신과의 관계 <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="visitor-relationship"
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        >
                          {relationships.map(rel => (
                            <option key={rel.value} value={rel.value}>
                              {rel.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 면회 대상 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-heart-line text-[#5C8D5A]" /> 면회 대상
                    </h3>

                    <div>
                      <label htmlFor="resident-name" className="mb-2 block text-sm font-bold text-gray-900">
                        어르신 성함 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="resident-name"
                        type="text"
                        name="residentName"
                        value={formData.residentName}
                        onChange={handleChange}
                        required
                        placeholder="어르신 성함을 입력해주세요"
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                      />
                    </div>
                  </div>

                  {/* 방문 일정 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-calendar-line text-[#5C8D5A]" /> 방문 일정
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="visit-date" className="mb-2 block text-sm font-bold text-gray-900">
                          방문 희망일 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="visit-date"
                          type="date"
                          name="visitDate"
                          value={formData.visitDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="visit-time" className="mb-2 block text-sm font-bold text-gray-900">
                          방문 희망시간 <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="visit-time"
                          name="visitTime"
                          value={formData.visitTime}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        >
                          <option value="">시간 선택</option>
                          {timeSlots.map(slot => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="visitors-count" className="mb-2 block text-sm font-bold text-gray-900">
                          방문 인원
                        </label>
                        <select
                          id="visitors-count"
                          name="visitors"
                          value={formData.visitors}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        >
                          <option value="1">1명</option>
                          <option value="2">2명</option>
                          <option value="3">3명</option>
                          <option value="4">4명 이상 (사전 문의 필요)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="visit-purpose" className="mb-2 block text-sm font-bold text-gray-900">
                          방문 목적
                        </label>
                        <select
                          id="visit-purpose"
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                        >
                          <option value="">선택</option>
                          <option value="일반면회">일반 면회</option>
                          <option value="외출">외출 동반</option>
                          <option value="외박">외박 동반</option>
                          <option value="생일축하">생일 축하</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 건강 상태 확인 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-heart-pulse-line text-[#5C8D5A]" /> 건강 상태 확인
                    </h3>

                    <div className="space-y-4">
                      <fieldset>
                        <legend className="mb-2 block text-sm font-bold text-gray-900">
                          발열, 기침 등 감염 증상이 있으신가요? <span className="text-red-500">*</span>
                        </legend>
                        <div className="flex gap-4">
                          <label className="flex cursor-pointer items-center gap-2">
                            <input
                              type="radio"
                              name="hasSymptoms"
                              value="no"
                              checked={formData.hasSymptoms === 'no'}
                              onChange={handleChange}
                              className="h-4 w-4 border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                            />
                            <span className="text-sm text-gray-700">아니오 (정상)</span>
                          </label>
                          <label className="flex cursor-pointer items-center gap-2">
                            <input
                              type="radio"
                              name="hasSymptoms"
                              value="yes"
                              checked={formData.hasSymptoms === 'yes'}
                              onChange={handleChange}
                              className="h-4 w-4 border-gray-300 text-red-500 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">예 (증상 있음)</span>
                          </label>
                        </div>
                        {formData.hasSymptoms === 'yes' && (
                          <div className="mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            <i className="ri-error-warning-line mr-1" /> 증상이 있으신 경우 면회를 자제해주시기
                            바랍니다.
                          </div>
                        )}
                      </fieldset>

                      <fieldset>
                        <legend className="mb-2 block text-sm font-bold text-gray-900">
                          이동 보조가 필요하신가요?
                        </legend>
                        <div className="flex gap-4">
                          <label className="flex cursor-pointer items-center gap-2">
                            <input
                              type="radio"
                              name="needsAssistance"
                              value="no"
                              checked={formData.needsAssistance === 'no'}
                              onChange={handleChange}
                              className="h-4 w-4 border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                            />
                            <span className="text-sm text-gray-700">아니오</span>
                          </label>
                          <label className="flex cursor-pointer items-center gap-2">
                            <input
                              type="radio"
                              name="needsAssistance"
                              value="yes"
                              checked={formData.needsAssistance === 'yes'}
                              onChange={handleChange}
                              className="h-4 w-4 border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                            />
                            <span className="text-sm text-gray-700">예 (휠체어 등)</span>
                          </label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  {/* 추가 요청사항 */}
                  <div className="rounded-lg border border-[#5C8D5A]/20 bg-gray-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <i className="ri-message-3-line text-[#5C8D5A]" /> 추가 요청사항
                    </h3>

                    <div>
                      <label htmlFor="visit-message" className="mb-2 block text-sm font-bold text-gray-900">
                        특이사항 및 요청사항
                      </label>
                      <textarea
                        id="visit-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="면회 시 필요한 사항이나 요청사항을 입력해주세요&#10;예) 음식물 반입 여부, 외출 희망 사항 등"
                        className="w-full resize-none rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-all focus:border-[#5C8D5A] focus:outline-none focus:ring-2 focus:ring-[#5C8D5A]/20"
                      />
                    </div>
                  </div>

                  {/* 개인정보 동의 */}
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#5C8D5A] focus:ring-[#5C8D5A]"
                      />
                      <span className="text-sm text-gray-600">
                        개인정보 수집 및 이용에 동의합니다.{' '}
                        <span className="mt-1 block text-xs text-gray-500">
                          수집된 개인정보는 면회 예약 확인 및 연락 목적으로만 사용되며, 예약 완료 후 30일 이내
                          파기됩니다.
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* 제출 버튼 */}
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
                      disabled={isSubmitting || formData.hasSymptoms === 'yes'}
                      className={`flex-1 rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all ${
                        isSubmitting || formData.hasSymptoms === 'yes'
                          ? 'cursor-not-allowed bg-gray-400'
                          : 'bg-[#5C8D5A] hover:bg-[#4A7548] hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line mr-2 animate-spin" /> 예약 처리 중...
                        </>
                      ) : (
                        <>
                          <i className="ri-calendar-check-line mr-2" /> 예약 신청하기
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
