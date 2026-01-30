'use client';

interface TodayStats {
  total: number;
  success: number;
  failed: number;
  pending: number;
}

interface Props {
  stats: TodayStats;
  scheduled: number;
}

export default function NotificationStatsCards({ stats, scheduled }: Props) {
  const successRate = ((stats.success / stats.total) * 100).toFixed(1);
  const failedRate = ((stats.failed / stats.total) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {/* 오늘 발송 */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">오늘 발송</span>
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50">
            <i className="ri-send-plane-line text-base text-blue-600"></i>
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        <div className="mt-1 text-xs text-gray-500">전체 발송 건수</div>
      </div>

      {/* 성공 */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">성공</span>
          <div className="flex h-8 w-8 items-center justify-center rounded bg-green-50">
            <i className="ri-checkbox-circle-line text-base text-green-600"></i>
          </div>
        </div>
        <div className="text-2xl font-bold text-green-600">{stats.success}</div>
        <div className="mt-1 text-xs text-gray-500">성공률 {successRate}%</div>
      </div>

      {/* 실패 */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">실패</span>
          <div className="flex h-8 w-8 items-center justify-center rounded bg-red-50">
            <i className="ri-close-circle-line text-base text-red-600"></i>
          </div>
        </div>
        <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
        <div className="mt-1 text-xs text-gray-500">실패율 {failedRate}%</div>
      </div>

      {/* 예약 */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">예약</span>
          <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-50">
            <i className="ri-calendar-schedule-line text-base text-orange-600"></i>
          </div>
        </div>
        <div className="text-2xl font-bold text-orange-600">{scheduled}</div>
        <div className="mt-1 text-xs text-gray-500">예약 대기중</div>
      </div>
    </div>
  );
}
