const SAMPLE_CONSULTATIONS = [
  {
    id: 1,
    date: '2024-01-25',
    category: '건강',
    title: '혈압 안정화 상담',
    content: '최근 혈압이 안정적으로 유지되고 있음. 식사량도 양호하며 프로그램 참여도가 높아짐.',
    staff: '김사회복지사',
  },
  {
    id: 2,
    date: '2024-01-20',
    category: '가족',
    title: '보호자 면담',
    content: '보호자와 입소자 건강상태 및 생활 적응 관련 상담 진행. 전반적으로 만족도 높음.',
    staff: '이사회복지사',
  },
  {
    id: 3,
    date: '2024-01-15',
    category: '생활',
    title: '룸메이트 관계 개선',
    content: '룸메이트와의 관계가 개선됨. 함께 프로그램 참여하며 친밀도 상승.',
    staff: '김사회복지사',
  },
];

export default function ConsultationTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">상담일지</h3>
        <button className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <i className="ri-add-line text-base"></i>
          상담 등록
        </button>
      </div>

      {/* 필터 */}
      <div className="flex gap-2">
        {['전체', '건강', '가족', '생활', '기타'].map(category => (
          <button
            key={category}
            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {category}
          </button>
        ))}
      </div>

      {/* 상담 목록 */}
      <div className="space-y-3">
        {SAMPLE_CONSULTATIONS.map(consultation => (
          <div
            key={consultation.id}
            className="rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {consultation.category}
                </span>
                <span className="text-xs text-gray-500">{consultation.date}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{consultation.staff}</span>
              </div>
              <button className="text-gray-400 transition-colors hover:text-gray-600">
                <i className="ri-more-2-fill text-lg"></i>
              </button>
            </div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900">{consultation.title}</h4>
            <p className="text-sm leading-relaxed text-gray-700">{consultation.content}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-1 pt-2">
        <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-sm text-gray-700 transition-colors hover:bg-gray-50">
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded border border-blue-600 bg-blue-600 text-sm font-medium text-white">
          1
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-sm text-gray-700 transition-colors hover:bg-gray-50">
          2
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-sm text-gray-700 transition-colors hover:bg-gray-50">
          3
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-sm text-gray-700 transition-colors hover:bg-gray-50">
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
}
