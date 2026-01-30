'use client';

import type { RecipientGroup } from './RecipientGroupTable';

interface Props {
  group: RecipientGroup | null;
  onClose: () => void;
  onEdit: () => void;
  onManageMembers: () => void;
}

export default function RecipientGroupDetailModal({ group, onClose, onEdit, onManageMembers }: Props) {
  if (!group) return null;

  const getTypeLabel = (type: string) => {
    const labelMap: { [key: string]: string } = {
      resident: '수급자',
      guardian: '보호자',
      staff: '직원',
      mixed: '혼합',
    };
    return labelMap[type] || type;
  };

  const getStatusLabel = (status: string) => {
    return status === 'active' ? '사용중' : '미사용';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-900">그룹 상세</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 내용 */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-4">
            {/* 기본 정보 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">기본 정보</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">그룹명</span>
                  <span className="font-medium text-gray-900">{group.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">그룹 유형</span>
                  <span className="font-medium text-gray-900">{getTypeLabel(group.type)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">상태</span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      group.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {getStatusLabel(group.status)}
                  </span>
                </div>
                <div className="flex items-start justify-between text-sm">
                  <span className="text-gray-600">설명</span>
                  <span className="max-w-xs text-right font-medium text-gray-900">{group.description || '-'}</span>
                </div>
              </div>
            </div>

            {/* 구성원 정보 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">구성원 정보</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">총 대상자 수</span>
                  <span className="font-medium text-gray-900">{group.memberCount}명</span>
                </div>
              </div>
            </div>

            {/* 사용 통계 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">사용 통계</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">총 사용 횟수</span>
                  <span className="font-medium text-gray-900">{group.usageCount}회</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">최근 사용일</span>
                  <span className="font-medium text-gray-900">{group.lastUsedAt || '사용 내역 없음'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">작성자</span>
                  <span className="font-medium text-gray-900">{group.createdBy}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">등록일</span>
                  <span className="font-medium text-gray-900">{group.createdAt}</span>
                </div>
              </div>
            </div>

            {/* 안내 메시지 */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <i className="ri-information-line mt-0.5 text-base text-blue-600"></i>
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-900">그룹 활용 안내</p>
                  <p className="mt-1 text-xs text-blue-700">
                    이 그룹은 알림 발송 시 수신자로 선택할 수 있습니다. '구성원 관리'를 통해 대상자를 추가하거나 제외할
                    수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            닫기
          </button>
          <button
            onClick={onManageMembers}
            className="rounded border border-purple-600 bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            구성원 관리
          </button>
          <button
            onClick={onEdit}
            className="rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
