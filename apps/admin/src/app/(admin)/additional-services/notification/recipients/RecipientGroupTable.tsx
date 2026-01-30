'use client';

interface RecipientGroup {
  id: number;
  name: string;
  type: string;
  description: string;
  memberCount: number;
  status: string;
  usageCount: number;
  lastUsedAt: string;
  createdBy: string;
  createdAt: string;
}

interface Props {
  groups: RecipientGroup[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onManageMembers: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function RecipientGroupTable({
  groups,
  onView,
  onEdit,
  onManageMembers,
  onToggleStatus,
  onDelete,
}: Props) {
  const getTypeBadge = (type: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      resident: { label: '수급자', className: 'bg-blue-50 text-blue-700' },
      guardian: { label: '보호자', className: 'bg-green-50 text-green-700' },
      staff: { label: '직원', className: 'bg-purple-50 text-purple-700' },
      mixed: { label: '혼합', className: 'bg-orange-50 text-orange-700' },
    };
    return badgeMap[type] || { label: type, className: 'bg-gray-50 text-gray-700' };
  };

  const getStatusBadge = (status: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      active: { label: '사용중', className: 'bg-green-50 text-green-700' },
      inactive: { label: '미사용', className: 'bg-gray-50 text-gray-700' },
    };
    return badgeMap[status] || { label: status, className: 'bg-gray-50 text-gray-700' };
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">번호</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">그룹명</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">유형</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">설명</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">대상자 수</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">사용횟수</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">최근 사용</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {groups.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-12 text-center">
                <i className="ri-group-line mb-2 block text-4xl text-gray-300"></i>
                <p className="text-sm text-gray-500">등록된 그룹이 없습니다</p>
              </td>
            </tr>
          ) : (
            groups.map((group, index) => {
              const typeBadge = getTypeBadge(group.type);
              const statusBadge = getStatusBadge(group.status);

              return (
                <tr key={group.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{group.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${typeBadge.className}`}>
                      {typeBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate text-sm text-gray-600">{group.description}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{group.memberCount}명</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{group.usageCount}회</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{group.lastUsedAt || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusBadge.className}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onView(group.id)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => onManageMembers(group.id)}
                        className="rounded border border-purple-200 bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-100"
                        title="구성원 관리"
                      >
                        <i className="ri-user-settings-line"></i>
                      </button>
                      <button
                        onClick={() => onEdit(group.id)}
                        className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                        title="수정"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => onToggleStatus(group.id)}
                        className={`rounded border px-2 py-1 text-xs font-medium transition-colors ${
                          group.status === 'active'
                            ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
                            : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                        title={group.status === 'active' ? '비활성화' : '활성화'}
                      >
                        <i className={group.status === 'active' ? 'ri-pause-circle-line' : 'ri-play-circle-line'}></i>
                      </button>
                      <button
                        onClick={() => onDelete(group.id)}
                        className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export type { RecipientGroup };
