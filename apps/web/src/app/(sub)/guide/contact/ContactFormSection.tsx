'use client';

import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    message: '',
  });

  const { mutate: createInquiry, isPending } = api.webInquiry.createWebInquiry.useMutation({
    onSuccess: () => {
      alert('상담 신청이 완료되었습니다. 담당자가 연락드리겠습니다.');
      setFormData({
        name: '',
        phone: '',
        type: '',
        message: '',
      });
    },
    onError: error => {
      console.error(error);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createInquiry({
      body: {
        name: formData.name,
        phone: formData.phone,
        type: formData.type,
        message: formData.message || undefined,
      },
    });
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">상담 신청하기</h2>
          <p className="text-lg text-gray-600">간단한 정보를 입력해주시면 상담사가 연락드립니다</p>
        </motion.div>

        <div className="rounded-2xl bg-white p-8 shadow-xl md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                성함 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="홍길동"
              />
            </div>

            {/* 연락처 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                required
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="010-1234-5678"
              />
            </div>

            {/* 상담 종류 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                상담 종류 <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                required
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="">상담 유형 선택</option>
                <option value="입소 상담">입소 상담</option>
                <option value="비용 상담">비용 상담</option>
                <option value="방문 상담">방문 상담</option>
                <option value="기타">기타</option>
              </select>
            </div>

            {/* 문의 내용 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">문의 내용</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3"
                placeholder="궁금하신 내용을 입력해주세요"
              />
            </div>

            {/* 안내 */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <i className="ri-information-line mt-0.5 text-xl text-[#5C8D5A]" />
                <p className="text-sm leading-relaxed text-gray-600">상담 신청 후 담당자가 순차적으로 연락드립니다.</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-[#5C8D5A] px-8 py-4 font-bold text-white shadow-lg hover:bg-[#4A7548] disabled:opacity-50"
            >
              <i className="ri-send-plane-line mr-2" />
              {isPending ? '처리중...' : '상담 신청하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
