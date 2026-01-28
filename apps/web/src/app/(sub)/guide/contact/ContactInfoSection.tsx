'use client';

export default function ContactInfoSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="tel:02-1234-5678"
            className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5C8D5A]">
              <i className="ri-phone-line text-2xl text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">전화 상담</div>
              <div className="text-lg font-bold text-gray-900">02-1234-5678</div>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5C8D5A]">
              <i className="ri-time-line text-2xl text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">운영 시간</div>
              <div className="text-lg font-bold text-gray-900">평일 09:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
