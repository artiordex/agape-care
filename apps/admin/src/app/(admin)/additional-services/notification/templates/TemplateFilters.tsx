/**
 * Description : TemplateFilters.tsx - 템플릿 필터링 바
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

interface Props {
  readonly categoryFilter: string;
  readonly onCategoryChange: (category: string) => void;
  readonly channelFilter: string;
  readonly onChannelChange: (channel: string) => void;
  readonly statusFilter: string;
  readonly onStatusChange: (status: string) => void;
  readonly searchKeyword: string;
  readonly onSearchChange: (keyword: string) => void;
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
  const selectClass =
    'border border-gray-300 px-3 py-1.5 text-[12px] font-bold outline-none bg-white min-w-[120px] focus:border-[#5C8D5A]';

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-sm border border-gray-200 bg-white p-3 shadow-sm transition-all">
      <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-sm border border-gray-300 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-[#5C8D5A] focus-within:bg-white">
        <i className="ri-search-line text-gray-400"></i>
        <input
          type="text"
          placeholder="템플릿 명칭 또는 작성자 검색..."
          className="flex-1 bg-transparent text-[12px] font-medium outline-none"
          value={searchKeyword}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <select className={selectClass} value={categoryFilter} onChange={e => onCategoryChange(e.target.value)}>
          <option value="">전체 카테고리</option>
          <option value="notice">일반 공지</option>
          <option value="urgent">긴급 알림</option>
          <option value="billing">청구 안내</option>
          <option value="schedule">일정 안내</option>
          <option value="health">건강 정보</option>
          <option value="event">행사 안내</option>
          <option value="other">기타</option>
        </select>

        <select className={selectClass} value={channelFilter} onChange={e => onChannelChange(e.target.value)}>
          <option value="">모든 채널</option>
          <option value="sms">SMS/LMS</option>
          <option value="band">Band</option>
          <option value="kakao">카카오톡</option>
        </select>

        <select className={selectClass} value={statusFilter} onChange={e => onStatusChange(e.target.value)}>
          <option value="">사용 여부</option>
          <option value="active">사용중</option>
          <option value="inactive">미사용</option>
        </select>
      </div>
    </div>
  );
}
