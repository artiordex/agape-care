import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

export default function StaffPage() {
  const managementTeam = [
    {
      name: '김영희',
      position: '시설장',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20female%20senior%20care%20facility%20director%20in%20her%2050s%20wearing%20business%20attire%2C%20warm%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20trustworthy%20and%20caring%20expression%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff001&orientation=portrait',
      credentials: ['사회복지사 1급', '요양시설 운영 15년'],
      description: '어르신들의 행복한 노후를 위해 헌신하겠습니다'
    },
    {
      name: '박민수',
      position: '사무국장',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20male%20administrator%20in%20his%2040s%20wearing%20business%20suit%2C%20confident%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20organized%20and%20efficient%20appearance%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff002&orientation=portrait',
      credentials: ['행정관리 전문가', '시설운영 10년'],
      description: '효율적인 시설 운영으로 최상의 서비스를 제공합니다'
    }
  ];

  const medicalTeam = [
    {
      name: '이수진',
      position: '간호팀장',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20female%20nurse%20team%20leader%20in%20her%2040s%20wearing%20white%20medical%20uniform%2C%20warm%20and%20caring%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20compassionate%20healthcare%20professional%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff003&orientation=portrait',
      credentials: ['간호사 면허', '노인간호 전문'],
      specialty: '건강관리 및 의료지원'
    },
    {
      name: '최동욱',
      position: '물리치료사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20male%20physical%20therapist%20in%20his%2030s%20wearing%20medical%20scrubs%2C%20friendly%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20energetic%20and%20caring%20healthcare%20professional%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff004&orientation=portrait',
      credentials: ['물리치료사 면허', '재활치료 전문'],
      specialty: '재활 및 운동치료'
    },
    {
      name: '정미영',
      position: '영양사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20female%20nutritionist%20in%20her%2030s%20wearing%20white%20chef%20coat%2C%20bright%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20healthy%20and%20vibrant%20appearance%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff005&orientation=portrait',
      credentials: ['영양사 면허', '임상영양 전문'],
      specialty: '맞춤형 영양관리'
    }
  ];

  const careTeam = [
    {
      name: '강은미',
      position: '요양보호사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20female%20caregiver%20in%20her%2040s%20wearing%20comfortable%20work%20uniform%2C%20warm%20and%20gentle%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20caring%20and%20patient%20demeanor%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff006&orientation=portrait',
      credentials: ['요양보호사 자격증', '경력 8년']
    },
    {
      name: '윤지혜',
      position: '요양보호사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20female%20caregiver%20in%20her%2030s%20wearing%20comfortable%20work%20uniform%2C%20friendly%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20attentive%20and%20compassionate%20appearance%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff007&orientation=portrait',
      credentials: ['요양보호사 자격증', '경력 5년']
    },
    {
      name: '김태현',
      position: '요양보호사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20male%20caregiver%20in%20his%2030s%20wearing%20comfortable%20work%20uniform%2C%20kind%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20reliable%20and%20caring%20demeanor%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff008&orientation=portrait',
      credentials: ['요양보호사 자격증', '경력 6년']
    },
    {
      name: '송미란',
      position: '요양보호사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20female%20caregiver%20in%20her%2050s%20wearing%20comfortable%20work%20uniform%2C%20motherly%20warm%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20experienced%20and%20nurturing%20appearance%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff009&orientation=portrait',
      credentials: ['요양보호사 자격증', '경력 10년']
    }
  ];

  const supportTeam = [
    {
      name: '한지원',
      position: '사회복지사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20female%20social%20worker%20in%20her%2030s%20wearing%20business%20casual%20attire%2C%20empathetic%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20approachable%20and%20understanding%20demeanor%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff010&orientation=portrait',
      credentials: ['사회복지사 2급', '상담 전문']
    },
    {
      name: '조현우',
      position: '프로그램 강사',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Korean%20male%20activity%20instructor%20in%20his%2030s%20wearing%20casual%20professional%20attire%2C%20energetic%20smile%2C%20professional%20headshot%20photo%20with%20soft%20lighting%20and%20clean%20white%20background%2C%20creative%20and%20enthusiastic%20appearance%2C%20high%20quality%20portrait%20photography&width=400&height=500&seq=staff011&orientation=portrait',
      credentials: ['레크리에이션 지도사', '음악치료사']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <i className="ri-team-line text-white text-xl"></i>
              <span className="text-white font-medium">Our Team</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              직원소개
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              전문성과 따뜻한 마음으로 어르신을 모시는 우리 직원들을 소개합니다
            </p>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">경영진</h2>
            <p className="text-lg text-gray-600">시설 운영을 책임지는 경영진입니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {managementTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-teal-600 font-semibold">{member.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {member.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-fill text-teal-600"></i>
                        <span className="text-sm text-gray-700">{cred}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{member.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Team */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">의료 및 전문팀</h2>
            <p className="text-lg text-gray-600">어르신의 건강을 책임지는 전문가들입니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {medicalTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-3">{member.position}</p>
                  <div className="space-y-2 mb-3">
                    {member.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-shield-check-line text-teal-600 text-sm"></i>
                        <span className="text-sm text-gray-700">{cred}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong>전문분야:</strong> {member.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">요양보호팀</h2>
            <p className="text-lg text-gray-600">24시간 어르신을 돌보는 요양보호사들입니다</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {careTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-semibold text-sm mb-3">{member.position}</p>
                  <div className="space-y-1">
                    {member.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-star-fill text-amber-500 text-xs"></i>
                        <span className="text-xs text-gray-700">{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">지원팀</h2>
            <p className="text-lg text-gray-600">다양한 프로그램과 상담을 담당합니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {supportTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-3">{member.position}</p>
                  <div className="space-y-2">
                    {member.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-award-line text-teal-600"></i>
                        <span className="text-sm text-gray-700">{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-12 text-center shadow-2xl">
            <i className="ri-heart-3-line text-6xl text-white mb-6"></i>
            <h2 className="text-3xl font-bold text-white mb-4">
              전문성과 사랑으로 모시겠습니다
            </h2>
            <p className="text-xl text-white/90 mb-8">
              우리 직원 모두는 어르신 한 분 한 분을<br />
              가족처럼 정성껏 모시고 있습니다
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 rounded-full font-bold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>상담 신청하기</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
