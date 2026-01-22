export default function FloorGuide() {
  const floors = [
    {
      floor: '1층',
      areas: ['접수 및 상담실', '물리치료실', '프로그램실', '식당', '주방'],
      icon: 'ri-building-line',
    },
    {
      floor: '2층',
      areas: ['1인실 (10실)', '2인실 (8실)', '간호사실', '목욕실'],
      icon: 'ri-building-2-line',
    },
    {
      floor: '3층',
      areas: ['4인실 (6실)', '면회실', '휴게실', '야외 테라스'],
      icon: 'ri-building-3-line',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            층별 구조
          </h2>
          <p className="text-base text-gray-600">
            어르신의 편의를 고려한 체계적인 공간 구성입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {floors.map((item, index) => (
            <div
              key={index}
              className="bg-[#F9F8F6] rounded-xl p-8 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#5C8D5A]/10 rounded-full flex items-center justify-center">
                  <i className={`${item.icon} text-2xl text-[#5C8D5A]`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{item.floor}</h3>
              </div>
              <ul className="space-y-3">
                {item.areas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="ri-check-line text-[#5C8D5A]"></i>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}