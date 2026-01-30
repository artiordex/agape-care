const ADMISSION_HISTORY = [
  {
    id: 1,
    type: '입소',
    date: '2023-03-15',
    reason: '가족 돌봄 어려움, 전문 요양 필요',
    staff: '김사회복지사',
    note: '초기 적응 프로그램 진행 예정',
  },
];

export default function AdmissionHistoryTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">입·퇴소 이력</h3>
      </div>

      {/* 타임라인 */}
      <div className="space-y-4">
        {ADMISSION_HISTORY.map((history, idx) => (
          <div key={history.id} className="relative rounded-lg border border-gray-200 bg-white p-5">
            {/* 타임라인 라인 */}
            {idx < ADMISSION_HISTORY.length - 1 && (
              <div className="absolute left-9 top-14 h-full w-0.5 bg-gray-200"></div>
            )}

            <div className="flex gap-4">
              {/* 아이콘 */}
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  history.type === '입소' ? 'bg-blue-100' : 'bg-red-100'
                }`}
              >
                <i
                  className={`text-xl ${
                    history.type === '입소' ? 'ri-login-box-line text-blue-600' : 'ri-logout-box-line text-red-600'
                  }`}
                ></i>
              </div>

              {/* 내용 */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      history.type === '입소' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {history.type}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{history.date}</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">사유</p>
                    <p className="text-sm text-gray-700">{history.reason}</p>
                  </div>

                  {history.note && (
                    <div>
                      <p className="mb-1 text-xs text-gray-500">비고</p>
                      <p className="text-sm text-gray-700">{history.note}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 border-t border-gray-100 pt-2 text-xs text-gray-500">
                    <span>담당자: {history.staff}</span>
                    <span>•</span>
                    <span>등록일: {history.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">총 입소 횟수</p>
          <p className="text-xl font-bold text-gray-900">1회</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">총 재원 기간</p>
          <p className="text-xl font-bold text-gray-900">10개월</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs text-gray-600">현재 상태</p>
          <p className="text-xl font-bold text-blue-700">입소중</p>
        </div>
      </div>
    </div>
  );
}
