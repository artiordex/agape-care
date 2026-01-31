'use client';

/**
 * [Component] 케어 기록 조회 페이지 상단 요약 통계
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 상태 카드 적용
 */
export default function HistoryStats() {
  const stats = {
    total: 124,
    pending: 12,
    completed: 108,
    emergency: 4,
  };

  return (
    <div className="grid grid-cols-1 gap-3 font-sans antialiased md:grid-cols-4">
      <StatCard
        label="금일 전체 기록"
        value={stats.total}
        unit="건"
        icon="ri-file-list-3-line"
        color="text-gray-700"
        bgColor="bg-white"
      />
      <StatCard
        label="작성중 (진행)"
        value={stats.pending}
        unit="건"
        icon="ri-edit-line"
        color="text-orange-600"
        bgColor="bg-orange-50/50"
      />
      <StatCard
        label="작성완료 (마감)"
        value={stats.completed}
        unit="건"
        icon="ri-checkbox-circle-line"
        color="text-[#5C8D5A]"
        bgColor="bg-emerald-50/50"
      />
      <StatCard
        label="응급/특이사항"
        value={stats.emergency}
        unit="건"
        icon="ri-error-warning-line"
        color="text-red-600"
        bgColor="bg-red-50/50"
        isAlert
      />
    </div>
  );
}

function StatCard({ label, value, unit, icon, color, bgColor, isAlert }: any) {
  return (
    <div className={`flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm`}>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className={`font-mono text-2xl font-black ${color}`}>{value.toLocaleString()}</span>
          <span className="text-[11px] font-bold text-gray-300">{unit}</span>
        </div>
      </div>
      <div className={`rounded-xl p-3 ${bgColor} ${isAlert ? 'animate-pulse' : ''}`}>
        <i className={`${icon} ${color} text-xl`}></i>
      </div>
    </div>
  );
}
