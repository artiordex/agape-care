'use client';

import { motion } from 'framer-motion';

export default function PersonalItemsSection() {
  const personalItems = [
    { category: '의류', items: ['속옷 5~7벌', '일상복 5~7벌', '외출복 2~3벌', '양말 7켤레', '실내화'] },
    { category: '세면도구', items: ['칫솔, 치약', '비누, 샴푸', '수건 3~5장', '로션, 크림'] },
    { category: '침구류', items: ['베개 (선택)', '담요 (선택)', '※ 침대와 이불은 시설에서 제공'] },
    { category: '기타', items: ['안경, 보청기', '틀니 보관함', '개인 컵', '사진 (선택)'] },
  ];

  return (
    <section className="bg-[#F9F8F6] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#7BA178]/10 px-4 py-2 text-sm font-semibold text-[#5C8D5A]">
            준비물
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">입소 시 준비물</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">필요한 개인 준비물 목록입니다</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {personalItems.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 hover:shadow-xl"
            >
              <h3 className="mb-6 border-b-2 border-[#7BA178] pb-4 text-xl font-bold text-gray-800">
                {category.category}
              </h3>

              <ul className="space-y-3">
                {category.items.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <i className="ri-check-line mt-0.5 text-lg text-[#7BA178]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
