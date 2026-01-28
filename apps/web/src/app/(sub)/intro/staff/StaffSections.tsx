'use client';

import staffData from '@/data/staff.json';

export default function StaffSections() {
  const { managementTeam, medicalTeam, careTeam, supportTeam } = staffData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* 경영진 */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">경영진</h2>
            <p className="text-lg text-gray-600">시설 운영을 책임지는 경영진입니다</p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {managementTeam.map(m => (
              <div key={m.name} className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <img src={m.image} alt={m.name} className="aspect-[4/5] w-full object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{m.name}</h3>
                  <p className="font-semibold text-teal-600">{m.position}</p>

                  <div className="my-4 space-y-2">
                    {m.credentials.map(c => (
                      <div key={c} className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-fill text-teal-600" />
                        <span className="text-sm text-gray-700">{c}</span>
                      </div>
                    ))}
                  </div>

                  {m.description && <p className="italic text-gray-600">"{m.description}"</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 의료팀 */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">의료 및 전문팀</h2>
            <p className="text-lg text-gray-600">어르신의 건강을 책임지는 전문가들입니다</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {medicalTeam.map(m => (
              <div key={m.name} className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <img src={m.image} alt={m.name} className="aspect-[4/5] w-full object-cover object-top" />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                  <p className="font-semibold text-teal-600">{m.position}</p>

                  <div className="my-3 space-y-2">
                    {m.credentials.map(c => (
                      <div key={c} className="flex items-center gap-2">
                        <i className="ri-shield-check-line text-teal-600" />
                        <span className="text-sm text-gray-700">{c}</span>
                      </div>
                    ))}
                  </div>

                  {m.specialty && (
                    <p className="text-sm text-gray-600">
                      <strong>전문분야:</strong> {m.specialty}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 요양보호팀 */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">요양보호팀</h2>
            <p className="text-lg text-gray-600">24시간 어르신을 돌보는 요양보호사들입니다</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {careTeam.map(m => (
              <div key={m.name} className="overflow-hidden rounded-xl bg-white shadow-lg">
                <img src={m.image} alt={m.name} className="aspect-[4/5] w-full object-cover object-top" />

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{m.name}</h3>
                  <p className="text-sm font-semibold text-teal-600">{m.position}</p>

                  <div className="mt-3 space-y-1">
                    {m.credentials.map(c => (
                      <div key={c} className="flex items-center gap-2">
                        <i className="ri-star-fill text-xs text-amber-500" />
                        <span className="text-xs text-gray-700">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 지원팀 */}
      <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">지원팀</h2>
            <p className="text-lg text-gray-600">프로그램·상담 등 전문 지원을 제공합니다</p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
            {supportTeam.map(m => (
              <div key={m.name} className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <img src={m.image} alt={m.name} className="aspect-[4/5] w-full object-cover object-top" />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                  <p className="font-semibold text-teal-600">{m.position}</p>

                  <div className="mt-3 space-y-2">
                    {m.credentials.map(c => (
                      <div key={c} className="flex items-center gap-2">
                        <i className="ri-award-line text-teal-600" />
                        <span className="text-sm text-gray-700">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
