export default function ServiceHero() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <img
          src="https://wooriwelfare.com/wp-content/uploads/2024/09/sub-medical-img3.png"
          alt="보육훈련 3단계 프로그램"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
      </div>

      {/* 메인 타이틀 */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-6 py-2 bg-white/90 text-[#5C8D5A] rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            Service Information
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            보육훈련 3단계 프로그램
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
            성장과 안정, 건강한 일상을 위한<br />단계별 맞춤 케어 프로그램입니다
          </p>
        </div>
      </div>

      {/* 장식 요소 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}