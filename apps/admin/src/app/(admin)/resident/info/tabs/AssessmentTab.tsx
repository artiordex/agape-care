export default function AssessmentTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">기초평가</h3>
        <button className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <i className="ri-add-line text-base"></i>
          평가 등록
        </button>
      </div>

      {/* 평가 점수 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'ADL', score: 65, color: 'blue' },
          { label: 'IADL', score: 45, color: 'green' },
          { label: '인지기능', score: 55, color: 'purple' },
          { label: '기동력', score: 70, color: 'orange' },
        ].map((item, idx) => (
          <div key={idx} className={`rounded-lg border border-${item.color}-100 bg-white p-4`}>
            <p className={`mb-1 text-xs text-${item.color}-600`}>{item.label}</p>
            <p className={`text-2xl font-bold text-${item.color}-700`}>{item.score}점</p>
          </div>
        ))}
      </div>

      {/* 평가 상세 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h4 className="text-sm font-semibold text-gray-900">평가 상세</h4>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {/* ADL 항목 */}
            <div>
              <p className="mb-2 text-xs font-semibold text-gray-700">일상생활능력 (ADL)</p>
              <div className="space-y-2">
                {[
                  { item: '식사하기', score: 10 },
                  { item: '옷 입기', score: 8 },
                  { item: '세면하기', score: 7 },
                  { item: '목욕하기', score: 5 },
                  { item: '화장실 이용', score: 8 },
                  { item: '이동하기', score: 9 },
                ].map((adl, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded border border-gray-100 bg-gray-50 px-3 py-2"
                  >
                    <span className="text-sm text-gray-700">{adl.item}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full bg-blue-600" style={{ width: `${(adl.score / 10) * 100}%` }}></div>
                      </div>
                      <span className="w-8 text-right text-sm font-semibold text-gray-900">{adl.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 평가 정보 */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-gray-500">평가자:</span>
                  <span className="ml-2 font-semibold text-gray-900">김사회복지사</span>
                </div>
                <div>
                  <span className="text-gray-500">평가일:</span>
                  <span className="ml-2 font-semibold text-gray-900">2024-01-15</span>
                </div>
                <div>
                  <span className="text-gray-500">다음 평가 예정:</span>
                  <span className="ml-2 font-semibold text-gray-900">2024-07-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
