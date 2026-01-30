export default function CareSummaryTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">최근 7일 케어 기록 요약</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <i className="ri-file-chart-line text-base"></i>
            상세 리포트
          </button>
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '식사', value: '85%', subtext: '평균 섭취율', icon: 'ri-restaurant-line', color: 'blue' },
          { label: '배변', value: '1회/일', subtext: '정상', icon: 'ri-checkbox-circle-line', color: 'green' },
          { label: '수면', value: '7시간', subtext: '평균', icon: 'ri-zzz-line', color: 'purple' },
          { label: '활동', value: '5회', subtext: '산책/프로그램', icon: 'ri-walk-line', color: 'orange' },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-gray-600">{stat.label}</p>
              <i className={`${stat.icon} text-xl text-${stat.color}-600`}></i>
            </div>
            <p className="mb-0.5 text-lg font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* 바이탈 추이 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h4 className="text-sm font-semibold text-gray-900">바이탈 추이</h4>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {[
              { label: '혈압', value: '평균 128/78 mmHg', status: '정상', color: 'green' },
              { label: '혈당', value: '평균 108 mg/dL', status: '정상', color: 'green' },
              { label: '체온', value: '평균 36.5°C', status: '정상', color: 'green' },
              { label: '체중', value: '62kg (변동 없음)', status: '유지', color: 'blue' },
            ].map((vital, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3"
              >
                <div>
                  <p className="mb-1 text-xs text-gray-600">{vital.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{vital.value}</p>
                </div>
                <span
                  className={`rounded bg-${vital.color}-50 px-2 py-0.5 text-xs font-medium text-${vital.color}-700`}
                >
                  {vital.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 일일 케어 기록 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-3">
          <h4 className="text-sm font-semibold text-gray-900">일일 케어 기록</h4>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">날짜</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">식사</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">배변</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">수면</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">목욕</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-700">활동</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700">특이사항</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: '01-25', meal: '90%', toilet: '정상', sleep: '7h', bath: 'O', activity: '산책', note: '-' },
                {
                  date: '01-24',
                  meal: '85%',
                  toilet: '정상',
                  sleep: '6.5h',
                  bath: '-',
                  activity: '인지활동',
                  note: '-',
                },
                {
                  date: '01-23',
                  meal: '80%',
                  toilet: '정상',
                  sleep: '7.5h',
                  bath: 'O',
                  activity: '음악치료',
                  note: '-',
                },
                { date: '01-22', meal: '90%', toilet: '정상', sleep: '7h', bath: '-', activity: '산책', note: '-' },
                { date: '01-21', meal: '85%', toilet: '정상', sleep: '6h', bath: '-', activity: '미술활동', note: '-' },
                {
                  date: '01-20',
                  meal: '80%',
                  toilet: '정상',
                  sleep: '7h',
                  bath: 'O',
                  activity: '산책',
                  note: '식사량 다소 감소',
                },
                {
                  date: '01-19',
                  meal: '85%',
                  toilet: '정상',
                  sleep: '7.5h',
                  bath: '-',
                  activity: '인지활동',
                  note: '-',
                },
              ].map((record, idx) => (
                <tr key={idx} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.date}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">{record.meal}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">{record.toilet}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">{record.sleep}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">{record.bath}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">{record.activity}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{record.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
