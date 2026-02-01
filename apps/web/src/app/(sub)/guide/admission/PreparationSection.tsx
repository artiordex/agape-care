/**
 * Description : PreparationSection.tsx - 📌 입소 준비물 섹션
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function PreparationSection() {
  const preparationItems = [
    {
      category: '의류',
      items: ['속옷 5벌', '겉옷 5벌', '양말 5켤레', '실내화', '외출복'],
      icon: 'ri-shirt-line',
    },
    {
      category: '세면도구',
      items: ['칫솔/치약', '비누', '샴푸', '수건 3장', '면도기'],
      icon: 'ri-drop-line',
    },
    {
      category: '개인용품',
      items: ['안경', '보청기', '틀니', '지팡이', '휠체어(필요시)'],
      icon: 'ri-user-line',
    },
    {
      category: '기타',
      items: ['사진 2매', '개인 컵', '슬리퍼', '계절용품'],
      icon: 'ri-more-line',
    },
  ];

  return (
    <section id="preparation" className="bg-white py-20">
      {/* 컨텐츠 넓이를 화면의 90%로 설정 */}
      <div className="mx-auto w-[90%] px-4">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-8 w-2 flex-shrink-0 rounded-sm bg-[#5C8D5A]" />
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">입소 준비물</h2>
        </motion.div>

        {/* 준비물 카드 그리드 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {preparationItems.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              /* [수정] border-gray-200 회색 테두리와 아가페 그린 포인트 적용 */
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#5C8D5A]/10 transition-colors duration-300 group-hover:bg-[#5C8D5A]">
                <i
                  className={`${category.icon} text-3xl text-[#5C8D5A] transition-colors duration-300 group-hover:text-white`}
                />
              </div>

              <h3 className="mb-4 text-xl font-bold text-gray-900">{category.category}</h3>

              <ul className="space-y-2">
                {category.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-600">
                    <i className="ri-checkbox-circle-fill text-[#5C8D5A]" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tip Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-gray-200 bg-[#F9F8F6] p-8 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5C8D5A]/10">
              <i className="ri-lightbulb-line text-2xl text-[#5C8D5A]" />
            </div>

            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">준비물 팁</h4>
              <p className="leading-relaxed text-gray-600">
                모든 의류와 개인 물품에는{' '}
                <span className="font-semibold text-gray-900 underline decoration-amber-200 underline-offset-4">
                  이름표를 부착
                </span>
                해주세요. 귀중품은 최소한으로 가져오시고 필요시 시설에서 보관해드립니다.
                <br />
                계절에 따라 추가 의류가 필요할 수 있습니다.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
