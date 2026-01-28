'use client';

export default function VisitContactSection() {
  return (
    <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl md:p-10">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-bold text-gray-900">면회 문의</h3>
            <p className="text-gray-600">면회와 관련하여 궁금하신 사항은 언제든 연락주세요</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <a
              href="tel:02-1234-5678"
              className="flex cursor-pointer items-center gap-4 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5C8D5A]">
                <i className="ri-phone-line text-2xl text-white" />
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-600">전화 문의</div>
                <div className="text-lg font-bold text-gray-900">02-1234-5678</div>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5C8D5A]">
                <i className="ri-time-line text-2xl text-white" />
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-600">운영 시간</div>
                <div className="text-lg font-bold text-gray-900">평일 09:00 - 18:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
