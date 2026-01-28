'use client';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 p-12 text-center shadow-2xl">
          <i className="ri-hand-heart-line mb-6 text-6xl text-white" />

          <h2 className="mb-4 text-3xl font-bold text-white">최상의 케어 서비스를 약속드립니다</h2>

          <p className="mb-8 text-xl text-white/90">
            어르신의 건강과 행복을 위해
            <br />
            전문적이고 세심한 케어를 제공합니다
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-teal-700 hover:bg-gray-50"
          >
            <span>상담 신청하기</span> <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}
