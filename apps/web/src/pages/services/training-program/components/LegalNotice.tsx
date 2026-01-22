export default function LegalNotice() {
  const notices = [
    {
      icon: 'ri-shield-check-line',
      title: '장기요양보험 지정기관',
      content: '저희 센터는 보건복지부 지정 장기요양보험 기관으로, 장기요양등급을 받으신 어르신께 보험 혜택을 제공합니다. 등급 신청 및 절차에 대해서도 친절하게 안내해 드립니다.'
    },
    {
      icon: 'ri-hand-sanitizer-line',
      title: '감염병 예방 수칙',
      content: '코로나19를 포함한 각종 감염병 예방을 위해 철저한 방역 수칙을 준수하고 있습니다. 정기적인 소독과 체온 체크, 마스크 착용 등 안전한 환경을 유지합니다.'
    },
    {
      icon: 'ri-file-shield-2-line',
      title: '개인정보 처리방침',
      content: '어르신과 가족의 개인정보는 관련 법령에 따라 철저히 보호되며, 상담 및 서비스 제공 목적으로만 사용됩니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.'
    },
    {
      icon: 'ri-cctv-line',
      title: 'CCTV 운영 안내',
      content: '어르신의 안전과 보호를 위해 공용 공간에 CCTV가 설치되어 있습니다. 영상은 30일간 보관되며, 법적 근거가 있을 경우에만 열람 가능합니다.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            법적 <span className="text-[#5C8D5A]">필수 안내</span>
          </h2>
          <p className="text-base text-gray-600">
            안전하고 투명한 서비스 운영을 위한 주요 안내사항입니다
          </p>
        </div>

        {/* 안내 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((notice, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-100 to-amber-100 rounded-lg flex-shrink-0">
                  <i className={`${notice.icon} text-2xl text-[#5C8D5A]`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{notice.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 링크 */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <a
            href="/privacy"
            className="text-sm text-gray-600 hover:text-[#5C8D5A] transition-colors underline cursor-pointer"
          >
            개인정보처리방침
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="/terms"
            className="text-sm text-gray-600 hover:text-[#5C8D5A] transition-colors underline cursor-pointer"
          >
            이용약관
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="/cctv"
            className="text-sm text-gray-600 hover:text-[#5C8D5A] transition-colors underline cursor-pointer"
          >
            영상정보처리기기 운영방침
          </a>
        </div>
      </div>
    </section>
  );
}