'use client';

import { motion } from 'framer-motion';

export default function LocationSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#5C8D5A]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            오시는 길
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">센터 위치 안내</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            편리한 교통과 쾌적한 환경을 자랑하는 저희 센터로 방문해 주세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 지도 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="h-[500px] overflow-hidden rounded-2xl bg-[#F9F8F6] shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.8385533315877!2d126.97796931531622!3d37.566535779797614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb849d1f57%3A0x7e4a8a0d88d1e6e!2sSeoul%20City%20Hall!5e0!3m2!1sen!2skr!4v1234567890123!5m2!1sen!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="센터 위치"
              />
            </div>
          </motion.div>

          {/* 교통 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-[#F9F8F6] p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                <i className="ri-map-pin-line mr-2 text-[#5C8D5A]" />
                주소
              </h3>
              <p className="leading-relaxed text-gray-700">
                서울특별시 중구 세종대로 110
                <br />
                요양원센터 건물
              </p>
            </div>

            <div className="rounded-2xl bg-[#F9F8F6] p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                <i className="ri-subway-line mr-2 text-[#5C8D5A]" />
                대중교통
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

            <div className="rounded-2xl bg-[#F9F8F6] p-6">
              <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                <i className="ri-car-line mr-2 text-[#5C8D5A]" />
                주차 안내
              </h3>
              <p className="text-sm text-gray-700">
                건물 지하 1층 주차장 이용 가능
                <br />
                방문자 2시간 무료 주차
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#5C8D5A] to-[#7BA178] p-6 text-white">
              <h3 className="mb-3 flex items-center text-xl font-bold">
                <i className="ri-phone-line mr-2" />
                문의 전화
              </h3>
              <p className="mb-2 text-2xl font-bold">02-1234-5678</p>
              <p className="text-sm text-white/90">방문 전 미리 연락주시면 더욱 자세한 안내를 도와드립니다</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
