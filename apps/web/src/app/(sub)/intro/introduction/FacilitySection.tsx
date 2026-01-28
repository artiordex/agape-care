'use client';

export default function FacilitySection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">시설 규모 및 환경</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            법적 기준 이상의 쾌적하고 안전한 공간을 제공합니다
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-5xl rounded-2xl bg-[#F9F8F6] p-10">
          <p className="mb-6 text-base leading-relaxed text-gray-700">
            정원 29명 규모의 요양원으로서 법적 기준을 충족하는 넓은 생활 공간과 안전 구조를 갖추고 있습니다. 모든 침실은
            1인당 6.6㎡ 이상의 면적을 확보하여 어르신께서 여유롭게 생활하실 수 있으며, 공용 거실과 프로그램실에서는
            다양한 활동이 진행됩니다.
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            욕실과 복도에는 안전바를 설치하고 모든 바닥은 미끄럼 방지 시공을 통해 안전사고 예방에 최선을 다하고
            있습니다. 또한 식당 및 조리실, 세면·목욕시설, 요양보호사실, 간호사실 등 법정 필수 시설을 완비하였으며,
            스프링클러와 화재감지기, 경보설비 등 화재·피난시설을 갖추어 만일의 상황에도 신속하게 대응할 수 있습니다.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-home-smile-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">침실 6.6㎡ 이상</p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-community-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">공용 거실·프로그램실</p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-restaurant-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">식당 및 조리실</p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-drop-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">세면·목욕시설</p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-shield-check-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">안전바 설치</p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-alarm-warning-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">화재감지 시스템</p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-vidicon-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">CCTV 운영</p>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <i className="ri-footprint-line mb-3 text-3xl text-[#5C8D5A]" />
            <p className="text-sm font-semibold text-gray-800">미끄럼 방지 바닥</p>
          </div>
        </div>
      </div>
    </section>
  );
}
