'use client';

interface Props {
  typeFilter: string;
  onTypeChange: (type: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
}

export default function RecipientGroupFilters({
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  searchKeyword,
  onSearchChange,
}: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* 그룹 유형 */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">그룹 유형</label>
          <select
            value={typeFilter}
            onChange={e => onTypeChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="resident">수급자</option>
            <option value="guardian">보호자</option>
            <option value="staff">직원</option>
            <option value="mixed">혼합</option>
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
            placeholder="그룹명 검색"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
