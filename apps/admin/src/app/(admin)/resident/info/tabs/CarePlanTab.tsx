export default function CarePlanTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">표준이용계획서</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <i className="ri-edit-line text-base"></i>
            수정
          </button>
          <button className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <i className="ri-printer-line text-base"></i>
            출력
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {/* 계획기간 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-3">
            <h4 className="text-sm font-semibold text-gray-900">계획기간</h4>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-500">시작일:</span>
                <span className="ml-2 font-semibold text-gray-900">2024-01-01</span>
              </div>
              <div>
                <span className="text-gray-500">종료일:</span>
                <span className="ml-2 font-semibold text-gray-900">2024-12-31</span>
              </div>
              <div>
                <span className="text-gray-500">작성자:</span>
                <span className="ml-2 font-semibold text-gray-900">김사회복지사</span>
              </div>
            </div>
          </div>
        </div>

        {/* 욕구사정 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-3">
            <h4 className="text-sm font-semibold text-gray-900">욕구사정</h4>
          </div>
          <div className="p-5">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              일상생활 도움 필요, 건강관리 필요, 사회활동 참여 희망
            </p>
          </div>
        </div>

        {/* 서비스 목표 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-3">
            <h4 className="text-sm font-semibold text-gray-900">서비스 목표</h4>
          </div>
          <div className="p-5">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-sm text-blue-600"></i>
                <span className="text-sm text-gray-700">안전하고 편안한 생활 유지</span>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-sm text-blue-600"></i>
                <span className="text-sm text-gray-700">건강상태 개선</span>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill mt-0.5 text-sm text-blue-600"></i>
                <span className="text-sm text-gray-700">삶의 질 향상</span>
              </div>
            </div>
          </div>
        </div>

        {/* 제공서비스 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-3">
            <h4 className="text-sm font-semibold text-gray-900">제공서비스</h4>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {[
                { category: '신체활동 지원', items: ['식사 지원', '배설 지원', '목욕 지원', '이동 지원'] },
                { category: '인지활동 지원', items: ['인지훈련 프로그램', '회상치료', '원예활동'] },
                { category: '건강관리', items: ['투약관리', '혈압/혈당 측정', '물리치료'] },
                { category: '여가활동', items: ['음악치료', '미술활동', '산책'] },
              ].map((service, idx) => (
                <div key={idx} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-2 text-xs font-semibold text-gray-700">{service.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item, i) => (
                      <span key={i} className="rounded bg-white px-2 py-1 text-xs text-gray-600">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
