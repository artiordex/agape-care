'use client';

import { motion } from 'framer-motion';

export default function LocationMap() {
  return (
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
          title="센터 위치"
        />
      </div>
    </motion.div>
  );
}
