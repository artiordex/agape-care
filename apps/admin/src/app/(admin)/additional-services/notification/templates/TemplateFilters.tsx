'use client';

interface Props {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  channelFilter: string;
  onChannelChange: (channel: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
}

export default function TemplateFilters({
  categoryFilter,
  onCategoryChange,
  channelFilter,
  onChannelChange,
  statusFilter,
  onStatusChange,
  searchKeyword,
  onSearchChange,
}: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* 카테고리 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">카테고리</label>
          <select
            value={categoryFilter}
            onChange={e => onCategoryChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="notice">일반 공지</option>
            <option value="urgent">긴급 알림</option>
            <option value="billing">청구 안내</option>
            <option value="schedule">일정 안내</option>
            <option value="health">건강 정보</option>
            <option value="event">행사 안내</option>
            <option value="other">기타</option>
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

        {/* 상태 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">상태</label>
          <select
            value={statusFilter}
            onChange={e => onStatusChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="active">사용중</option>
            <option value="inactive">미사용</option>
          </select>
        </div>

        {/* 검색 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">검색</label>
          <input
            type="text"
            value={searchKeyword}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="템플릿명 검색"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
