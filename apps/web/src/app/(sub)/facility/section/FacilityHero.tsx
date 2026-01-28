export default function FacilityHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#F9F8F6] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            시설안내
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            안전하고 쾌적한 환경에서
            <br />
            어르신이 편안하게 생활하실 수 있습니다
          </p>
        </div>

        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20bright%20elderly%20care%20facility%20building%20exterior%20beautiful%20korean%20nursing%20home%20architecture%20clean%20white%20building%20with%20gardens%20natural%20sunlight%20peaceful%20surroundings%20simple%20clean%20design&width=1200&height=600&seq=facility-exterior&orientation=landscape"
            alt="요양센터 외관"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}