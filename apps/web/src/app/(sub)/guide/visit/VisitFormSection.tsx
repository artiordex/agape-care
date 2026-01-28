'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VisitFormSection() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('면회 예약이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
            {/* 이름 & 연락처 */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>
            </div>

            {/* 어르신 이름 */}
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            {/* 날짜 & 시간 */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                  <option value="">시간 선택</option>
                  {['10', '11', '12', '13', '14', '15', '16', '17'].map(t => (
                    <option key={t} value={`${t}:00`}>
                      {t <= '11' ? `오전 ${t}시` : `오후 ${t - 12}시`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 인원 & 목적 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">방문 인원</label>
                <select
                  name="visitors"
                  value={formData.visitors}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                  <option value="">선택</option>
                  <option value="일반면회">일반 면회</option>
                  <option value="외출">외출</option>
                  <option value="외박">외박</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </div>

            {/* 요청사항 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">추가 요청사항</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            {/* 안내박스 */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <i className="ri-information-line mt-0.5 text-xl text-[#5C8D5A]" />
                <p className="text-sm text-gray-600">
                  예약 신청 후 담당자가 확인하여 연락드립니다. 긴급한 경우 직접 전화로 문의해주세요.
                </p>
              </div>
            </div>

            {/* 버튼 */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#5C8D5A] px-8 py-4 font-bold text-white shadow-lg hover:bg-[#4A7548]"
            >
              <i className="ri-calendar-check-line mr-2" />
              면회 예약 신청하기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
