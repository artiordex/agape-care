/**
 * Description : FacilityBannerSection.tsx - 📌 시설 안내 히어로 배너
 * Author : Shiwoo Min
 * Date : 2026-02-01
 */

'use client';

import { motion } from 'framer-motion';

export default function FacilityBannerSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#F9F8F6] to-white py-20">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl md:h-[500px]"
        >
          <img src="/images/sample.svg" alt="요양센터 외관" className="h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </div>
    </section>
  );
}
