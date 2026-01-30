'use client';

interface Resident {
  id: number;
  name: string;
  gender: string;
  grade: string;
  admissionDate: string;
  room: string;
  birthDate: string;
  mainDiseases: string[];
  status: string;
}

interface Props {
  residents: Resident[];
  selectedResident: Resident | null;
  onSelectResident: (resident: Resident) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  filterGrade: string;
  onFilterGradeChange: (value: string) => void;
  filterRoom: string;
  onFilterRoomChange: (value: string) => void;
}

export default function ResidentListPanel({
  residents,
  selectedResident,
  onSelectResident,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterGrade,
  onFilterGradeChange,
  filterRoom,
  onFilterRoomChange,
}: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '입소':
        return 'bg-blue-50 text-blue-700';
      case '퇴소':
        return 'bg-gray-100 text-gray-700';
      case '대기':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1등급')) return 'bg-red-50 text-red-700';
    if (grade.includes('2등급')) return 'bg-orange-50 text-orange-700';
    if (grade.includes('3등급')) return 'bg-yellow-50 text-yellow-700';
    if (grade.includes('4등급')) return 'bg-green-50 text-green-700';
    if (grade.includes('5등급')) return 'bg-blue-50 text-blue-700';
    return 'bg-purple-50 text-purple-700';
  };

  return (
    <div className="flex w-80 flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <h2 className="mb-2 text-sm font-bold text-gray-900">외출·외박 관리</h2>
        <div className="flex gap-2 text-xs">
          <div className="rounded bg-gray-100 px-2 py-1 text-gray-700">총 {residents.length}명</div>
          <div className="rounded bg-blue-50 px-2 py-1 text-blue-700">
            입소 {residents.filter(r => r.status === '입소').length}명
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 border-b border-gray-100 p-4">
        <div className="relative">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"></i>
          <input
            type="text"
            placeholder="이름 또는 방호실 검색..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">현황</label>
          <select
            value={filterStatus}
            onChange={e => onFilterStatusChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="전체">전체</option>
            <option value="입소">입소</option>
            <option value="퇴소">퇴소</option>
            <option value="대기">대기</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">등급</label>
          <select
            value={filterGrade}
            onChange={e => onFilterGradeChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="전체">전체</option>
            <option value="1등급">1등급</option>
            <option value="2등급">2등급</option>
            <option value="3등급">3등급</option>
            <option value="4등급">4등급</option>
            <option value="5등급">5등급</option>
            <option value="인지지원등급">인지지원등급</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">생활실</label>
          <select
            value={filterRoom}
            onChange={e => onFilterRoomChange(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="전체">전체</option>
            <option value="101">101호</option>
            <option value="102">102호</option>
            <option value="103">103호</option>
            <option value="201">201호</option>
            <option value="202">202호</option>
          </select>
        </div>
      </div>

      {/* Resident List */}
      <div className="flex-1 overflow-y-auto">
        {residents.map(resident => (
          <div
            key={resident.id}
            onClick={() => onSelectResident(resident)}
            className={`border-b border-gray-100 px-4 py-3 transition-colors ${
              selectedResident?.id === resident.id
                ? 'border-l-2 border-l-blue-600 bg-blue-50'
                : 'cursor-pointer hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-gray-100 text-sm font-bold text-gray-700">
                {resident.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">{resident.name}</p>
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(resident.status)}`}>
                    {resident.status}
                  </span>
                </div>
                <div className="mb-1 flex items-center gap-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <i className="ri-home-4-line"></i>
                    {resident.room}
                  </span>
                  <span>•</span>
                  <span>{resident.gender}</span>
                  <span>•</span>
                  <span className={`rounded px-1.5 py-0.5 font-medium ${getGradeColor(resident.grade)}`}>
                    {resident.grade}
                  </span>
                </div>
                <p className="truncate text-xs text-gray-500">{resident.birthDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
