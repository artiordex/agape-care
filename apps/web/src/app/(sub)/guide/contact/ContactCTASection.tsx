'use client';

import Link from 'next/link';

export default function ContactCTASection() {
  return (
    <section className="bg-gradient-to-br from-[#5C8D5A] to-[#4A7548] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">더 자세한 상담이 필요하신가요?</h2>

        <p className="mb-8 text-lg text-white/90">편하게 문의주시면 친절하게 안내해드립니다.</p>

        <Link
          href="tel:02-1234-5678"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#5C8D5A] shadow-lg hover:bg-gray-100"
        >
          <i className="ri-phone-line" />전화 상담하기
        </Link>
      </div>
    </section>
  );
}
