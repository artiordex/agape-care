'use client';

import { useRouter } from 'next/navigation';

export default function ResidentList({
  residents,
  selectedResident,
  searchTerm,
  filterStatus,
  onSelectResident,
  onSearchChange,
  onFilterChange,
  getStatusColor,
  getGradeColor,
}: any) {
  const router = useRouter();

  return (
    <div className="flex w-80 flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">입소자 목록</h2>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">{residents.length}</span>
        </div>
      </div>

      {/* Search */}
      <div className="border-b border-gray-100 px-4 py-3">
        <div className="relative">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full rounded border border-gray-300 py-1.5 pl-9 pr-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex gap-1">
          {['전체', '입소', '퇴소', '대기'].map(status => (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className={`rounded px-2.5 py-1 text-xs font-medium ${
                filterStatus === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {residents.map((resident: any) => (
          <div
            key={resident.id}
            onClick={() => onSelectResident(resident)}
            className={`border-b border-gray-100 px-4 py-3 transition-colors ${
              selectedResident?.id === resident.id
                ? 'border-l-2 border-l-blue-600 bg-blue-50'
                : 'cursor-pointer hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100 text-sm font-semibold text-gray-700">
                {resident.name.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-gray-900">{resident.name}</p>
                  <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${getStatusColor(resident.status)}`}>
                    {resident.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{resident.room}</span>
                  <span>•</span>
                  <span>{resident.gender}</span>
                  <span>•</span>
                  <span className={`rounded px-1.5 py-0.5 font-medium ${getGradeColor(resident.grade)}`}>
                    {resident.grade}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={() => router.push('/resident/info/new')}
          className="flex w-full items-center justify-center gap-1.5 rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <i className="ri-add-line text-base" />신규 입소자 등록
        </button>
      </div>
    </div>
  );
}
