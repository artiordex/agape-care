'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WeeklyMenuSection() {
  const weeklyMenu = [
    {
      day: '월요일',
      breakfast: '흰죽, 계란찜, 김치',
      lunch: '쌀밥, 된장찌개, 생선구이, 나물',
      dinner: '쌀밥, 미역국, 두부조림, 김치',
    },
    {
      day: '화요일',
      breakfast: '토스트, 우유, 과일',
      lunch: '쌀밥, 육개장, 불고기, 샐러드',
      dinner: '쌀밥, 콩나물국, 계란말이, 김치',
    },
    {
      day: '수요일',
      breakfast: '흰죽, 멸치볶음, 김치',
      lunch: '쌀밥, 김치찌개, 제육볶음, 나물',
      dinner: '쌀밥, 북어국, 두부조림, 김치',
    },
    {
      day: '목요일',
      breakfast: '시리얼, 우유, 바나나',
      lunch: '쌀밥, 갈비탕, 잡채, 김치',
      dinner: '쌀밥, 된장국, 생선조림, 나물',
    },
    {
      day: '금요일',
      breakfast: '흰죽, 계란찜, 김치',
      lunch: '쌀밥, 순두부찌개, 삼겹살, 상추',
      dinner: '쌀밥, 미역국, 함박스테이크, 샐러드',
    },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-[#D4A574]/10 px-4 py-2 text-sm font-semibold text-[#8B6F47]">
            식단표 예시
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">주간 식단표</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            영양 균형을 고려한 일주일 식단 예시입니다 (실제 식단은 매주 변경됩니다)
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#D4A574] to-[#C4976B]">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-white">요일</th>
                <th className="px-6 py-4 text-sm font-bold text-white">아침</th>
                <th className="px-6 py-4 text-sm font-bold text-white">점심</th>
                <th className="px-6 py-4 text-sm font-bold text-white">저녁</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {weeklyMenu.map((menu, i) => (
                <motion.tr
                  key={menu.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="hover:bg-[#F9F8F6]"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">{menu.day}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{menu.breakfast}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{menu.lunch}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{menu.dinner}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-gray-500">
            ※ 실제 식단은 계절, 식자재 수급 상황, 어르신 선호도에 따라 변경될 수 있습니다.
          </p>

          <Link
            href="/communities?category=식단표"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B6F47] hover:text-[#6B5437]"
          >
            이번 주 식단표 보기 <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
