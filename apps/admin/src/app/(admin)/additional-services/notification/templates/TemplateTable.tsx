'use client';

interface Template {
  id: number;
  name: string;
  category: string;
  channel: string;
  content: string;
  status: string;
  usageCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  templates: Template[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onCopy: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TemplateTable({ templates, onView, onEdit, onCopy, onToggleStatus, onDelete }: Props) {
  const getCategoryBadge = (category: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      notice: { label: '일반 공지', className: 'bg-blue-50 text-blue-700' },
      urgent: { label: '긴급 알림', className: 'bg-red-50 text-red-700' },
      billing: { label: '청구 안내', className: 'bg-purple-50 text-purple-700' },
      schedule: { label: '일정 안내', className: 'bg-orange-50 text-orange-700' },
      health: { label: '건강 정보', className: 'bg-green-50 text-green-700' },
      event: { label: '행사 안내', className: 'bg-pink-50 text-pink-700' },
      other: { label: '기타', className: 'bg-gray-50 text-gray-700' },
    };
    return badgeMap[category] || { label: category, className: 'bg-gray-50 text-gray-700' };
  };

  const getStatusBadge = (status: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      active: { label: '사용중', className: 'bg-green-50 text-green-700' },
      inactive: { label: '미사용', className: 'bg-gray-50 text-gray-700' },
    };
    return badgeMap[status] || { label: status, className: 'bg-gray-50 text-gray-700' };
  };

  const getChannelIcon = (channel: string) => {
    const iconMap: { [key: string]: string } = {
      sms: 'ri-message-2-line',
      band: 'ri-group-line',
      kakao: 'ri-kakao-talk-line',
    };
    return iconMap[channel] || 'ri-notification-line';
  };

  const getChannelLabel = (channel: string) => {
    const labelMap: { [key: string]: string } = {
      sms: 'SMS',
      band: 'Band',
      kakao: '카카오',
    };
    return labelMap[channel] || channel;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">번호</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">템플릿명</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">카테고리</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">채널</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">내용 미리보기</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">사용횟수</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">상태</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">등록일</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {templates.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-12 text-center">
                <i className="ri-file-list-3-line mb-2 block text-4xl text-gray-300"></i>
                <p className="text-sm text-gray-500">등록된 템플릿이 없습니다</p>
              </td>
            </tr>
          ) : (
            templates.map((template, index) => {
              const categoryBadge = getCategoryBadge(template.category);
              const statusBadge = getStatusBadge(template.status);

              return (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{template.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${categoryBadge.className}`}>
                      {categoryBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <i className={`${getChannelIcon(template.channel)} text-base text-gray-600`}></i>
                      <span className="text-sm text-gray-900">{getChannelLabel(template.channel)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate text-sm text-gray-600">{template.content}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{template.usageCount}회</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusBadge.className}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{template.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onView(template.id)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        title="상세보기"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => onEdit(template.id)}
                        className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                        title="수정"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => onCopy(template.id)}
                        className="rounded border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
                        title="복사"
                      >
                        <i className="ri-file-copy-line"></i>
                      </button>
                      <button
                        onClick={() => onToggleStatus(template.id)}
                        className={`rounded border px-2 py-1 text-xs font-medium transition-colors ${
                          template.status === 'active'
                            ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
                            : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                        title={template.status === 'active' ? '비활성화' : '활성화'}
                      >
                        <i
                          className={template.status === 'active' ? 'ri-pause-circle-line' : 'ri-play-circle-line'}
                        ></i>
                      </button>
                      <button
                        onClick={() => onDelete(template.id)}
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

export type { Template };
