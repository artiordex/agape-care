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
      {/* 주소 */}
      <div className="rounded-2xl bg-[#F9F8F6] p-6">
        <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
          <i className="ri-map-pin-line mr-2 text-[#5C8D5A]" />주소
        </h3>
        <p className="leading-relaxed text-gray-700">
          서울특별시 중구 세종대로 110
          <br />
          요양원센터 건물
        </p>
      </div>

      {/* 대중교통 */}
      <div className="rounded-2xl bg-[#F9F8F6] p-6">
        <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
          <i className="ri-subway-line mr-2 text-[#5C8D5A]" />교통
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-gray-800">지하철</span>
            <p className="mt-1">1호선, 2호선 시청역 4번 출구 도보 5분</p>
          </div>
          <div>
            <span className="font-semibold text-gray-800">버스</span>
            <p className="mt-1">
              간선: 100, 150, 160, 260
              <br />
              지선: 7016, 7025
            </p>
          </div>
        </div>
      </div>

      {/* 주차 */}
      <div className="rounded-2xl bg-[#F9F8F6] p-6">
        <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
          <i className="ri-car-line mr-2 text-[#5C8D5A]" />주차 안내
        </h3>
        <p className="text-sm text-gray-700">
          건물 지하 1층 주차장 이용 가능
          <br />
          방문자 2시간 무료 주차
        </p>
      </div>

      {/* 문의 */}
      <div className="rounded-2xl bg-gradient-to-br from-[#5C8D5A] to-[#7BA178] p-6 text-white">
        <h3 className="mb-3 flex items-center text-xl font-bold">
          <i className="ri-phone-line mr-2" />문의 전화
        </h3>
        <p className="mb-2 text-2xl font-bold">02-1234-5678</p>
        <p className="text-sm text-white/90">방문 전 미리 연락주시면 더욱 자세한 안내를 도와드립니다</p>
      </div>
    </motion.div>
  );
}
