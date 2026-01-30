'use client';

interface Props {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  channelFilter: string;
  onChannelChange: (channel: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
}

export default function ScheduledNotificationFilters({
  statusFilter,
  onStatusChange,
  channelFilter,
  onChannelChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  searchKeyword,
  onSearchChange,
}: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* 상태 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">상태</label>
          <select
            value={statusFilter}
            onChange={e => onStatusChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="scheduled">예약됨</option>
            <option value="sending">발송중</option>
            <option value="completed">완료</option>
            <option value="failed">실패</option>
            <option value="cancelled">취소됨</option>
          </select>
        </div>

        {/* 채널 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">채널</label>
          <select
            value={channelFilter}
            onChange={e => onChannelChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="sms">SMS/LMS</option>
            <option value="band">Band</option>
            <option value="kakao">카카오톡</option>
          </select>
        </div>

        {/* 시작일 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={e => onStartDateChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* 종료일 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={e => onEndDateChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* 검색 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">검색</label>
          <input
            type="text"
            value={searchKeyword}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="캠페인명 검색"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
