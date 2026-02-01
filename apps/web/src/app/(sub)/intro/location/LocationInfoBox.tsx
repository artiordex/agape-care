/**
 * Description : LocationInfoBox.tsx - 📌 위치 정보 박스 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function LocationInfoBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* 주소 정보 박스 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-md">
        <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
          <i className="ri-map-pin-line mr-2.5 text-[#5C8D5A]" />주소
        </h3>
        <p className="leading-relaxed text-gray-600">서울특별시 중구 세종대로 110
          <br />
          <span className="text-sm text-gray-400">요양원센터 건물</span>
        </p>
      </div>

      {/* 대중교통 정보 박스 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-md">
        <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
          <i className="ri-subway-line mr-2.5 text-[#5C8D5A]" />교통 및 대중교통
        </h3>
        <div className="space-y-4 text-sm">
          <div className="flex gap-3">
            <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-500">
              지하철
            </span>
            <p className="text-gray-600">1호선, 2호선 시청역 4번 출구 도보 5분</p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-500">
              버스
            </span>
            <p className="leading-relaxed text-gray-600">
              간선: 100, 150, 160, 260
              <br />
              지선: 7016, 7025
            </p>
          </div>
        </div>
      </div>

      {/* 주차 안내 박스 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-md">
        <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
          <i className="ri-car-line mr-2.5 text-[#5C8D5A]" />주차 안내
        </h3>
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <i className="ri-information-line mt-0.5 text-[#5C8D5A]" />
          <p>
            건물 지하 1층 주차장 이용 가능
            <br />
            방문자{' '}
            <span className="font-semibold text-gray-900 underline decoration-amber-200 underline-offset-4">
              2시간 무료 주차
            </span>{' '}
            지원
          </p>
        </div>
      </div>

      {/* 문의 전화 박스 */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5C8D5A] to-[#4a7248] p-8 text-white shadow-lg shadow-[#5C8D5A]/20">
        <div className="relative z-10">
          <h3 className="mb-4 flex items-center text-base font-medium text-white/80">
            <i className="ri-phone-line mr-2" />궁금하신 점이 있으신가요?
          </h3>
          <p className="mb-2 text-3xl font-black tracking-tight">02-1234-5678</p>
          <p className="text-[13px] text-white/70">평일/주말 09:00 - 18:00 상담 가능</p>
        </div>
        {/* 장식용 우측 하단 아이콘 */}
        <i className="ri-customer-service-2-fill absolute -bottom-4 -right-4 text-8xl text-white/10" />
      </div>
    </motion.div>
  );
}
