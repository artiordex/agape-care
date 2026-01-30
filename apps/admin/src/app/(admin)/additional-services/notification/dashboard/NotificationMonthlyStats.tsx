'use client';

interface MonthStats {
  total: number;
  success: number;
  failed: number;
  pending: number;
}

interface ChannelStats {
  sms: number;
  band: number;
  kakao: number;
}

interface Props {
  monthStats: MonthStats;
  channelStats: ChannelStats;
}

export default function NotificationMonthlyStats({ monthStats, channelStats }: Props) {
  const overallSuccessRate = ((monthStats.success / monthStats.total) * 100).toFixed(1);

  const getChannelPercentage = (count: number) => {
    return ((count / monthStats.total) * 100).toFixed(1);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* 이번 달 통계 */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-bold text-gray-900">이번 달 발송 현황</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">전체 발송</span>
            <span className="text-sm font-bold text-gray-900">{monthStats.total.toLocaleString()}건</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">성공</span>
            <span className="text-sm font-bold text-green-600">{monthStats.success.toLocaleString()}건</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">실패</span>
            <span className="text-sm font-bold text-red-600">{monthStats.failed.toLocaleString()}건</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">대기중</span>
            <span className="text-sm font-bold text-orange-600">{monthStats.pending.toLocaleString()}건</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-900">전체 성공률</span>
              <span className="text-xl font-bold text-blue-600">{overallSuccessRate}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${overallSuccessRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 채널별 현황 */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-bold text-gray-900">채널별 발송 현황</h2>
        <div className="space-y-3">
          {/* SMS */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50">
                  <i className="ri-message-2-line text-sm text-blue-600"></i>
                </div>
                <span className="text-sm font-medium text-gray-900">SMS/LMS/MMS</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{channelStats.sms.toLocaleString()}건</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${getChannelPercentage(channelStats.sms)}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500">전체의 {getChannelPercentage(channelStats.sms)}%</div>
          </div>

          {/* Band */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-50">
                  <i className="ri-group-line text-sm text-purple-600"></i>
                </div>
                <span className="text-sm font-medium text-gray-900">Band</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{channelStats.band.toLocaleString()}건</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-purple-600 transition-all duration-500"
                style={{ width: `${getChannelPercentage(channelStats.band)}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500">전체의 {getChannelPercentage(channelStats.band)}%</div>
          </div>

          {/* 카카오톡 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-yellow-50">
                  <i className="ri-kakao-talk-line text-sm text-yellow-600"></i>
                </div>
                <span className="text-sm font-medium text-gray-900">카카오톡</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{channelStats.kakao.toLocaleString()}건</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-yellow-600 transition-all duration-500"
                style={{ width: `${getChannelPercentage(channelStats.kakao)}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500">전체의 {getChannelPercentage(channelStats.kakao)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
