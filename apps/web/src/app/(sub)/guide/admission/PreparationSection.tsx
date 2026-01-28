'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function PreparationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">입소 준비물</h2>
          <p className="text-lg text-gray-600">편안한 생활을 위해 준비해주세요</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {preparationItems.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 p-8 shadow-md transition hover:shadow-lg"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                <i className={`${category.icon} text-3xl text-[#5C8D5A]`} />
              </div>

              <h3 className="mb-4 text-xl font-bold text-gray-900">{category.category}</h3>

              <ul className="space-y-2">
                {category.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <i className="ri-checkbox-circle-fill text-[#5C8D5A]" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tip Box */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <i className="ri-lightbulb-line text-2xl text-blue-600" />
            </div>

            <div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">준비물 팁</h4>
              <p className="leading-relaxed text-gray-600">
                모든 의류와 개인 물품에는 이름표를 부착해주세요. 귀중품은 최소한으로 가져오시고 필요시 시설에서
                보관해드립니다.
                <br />
                계절에 따라 추가 의류가 필요할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
