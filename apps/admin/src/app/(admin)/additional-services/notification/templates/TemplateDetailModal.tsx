'use client';

import type { Template } from './TemplateTable';

interface Props {
  template: Template | null;
  onClose: () => void;
  onEdit: () => void;
}

export default function TemplateDetailModal({ template, onClose, onEdit }: Props) {
  if (!template) return null;

  const getCategoryLabel = (category: string) => {
    const labelMap: { [key: string]: string } = {
      notice: '일반 공지',
      urgent: '긴급 알림',
      billing: '청구 안내',
      schedule: '일정 안내',
      health: '건강 정보',
      event: '행사 안내',
      other: '기타',
    };
    return labelMap[category] || category;
  };

  const getChannelLabel = (channel: string) => {
    const labelMap: { [key: string]: string } = {
      sms: 'SMS/LMS',
      band: 'Band',
      kakao: '카카오톡',
    };
    return labelMap[channel] || channel;
  };

  const getStatusLabel = (status: string) => {
    return status === 'active' ? '사용중' : '미사용';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-900">템플릿 상세</h2>
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
                  <span className="text-gray-600">템플릿명</span>
                  <span className="font-medium text-gray-900">{template.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">카테고리</span>
                  <span className="font-medium text-gray-900">{getCategoryLabel(template.category)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">채널</span>
                  <span className="font-medium text-gray-900">{getChannelLabel(template.channel)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">상태</span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      template.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {getStatusLabel(template.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* 사용 통계 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">사용 통계</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">총 사용 횟수</span>
                  <span className="font-medium text-gray-900">{template.usageCount}회</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">작성자</span>
                  <span className="font-medium text-gray-900">{template.createdBy}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">등록일</span>
                  <span className="font-medium text-gray-900">{template.createdAt}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">최종 수정일</span>
                  <span className="font-medium text-gray-900">{template.updatedAt}</span>
                </div>
              </div>
            </div>

            {/* 템플릿 내용 */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-xs font-bold text-gray-900">템플릿 내용</h3>
              <div className="rounded border border-gray-200 bg-white p-4">
                <div className="whitespace-pre-wrap text-sm text-gray-700">{template.content}</div>
              </div>
            </div>

            {/* 변수 안내 */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <i className="ri-information-line mt-0.5 text-base text-blue-600"></i>
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-900">변수 사용 안내</p>
                  <p className="mt-1 text-xs text-blue-700">
                    #{'{'}변수명{'}'} 형태의 변수는 발송 시 실제 데이터로 자동 치환됩니다.
                    <br />
                    예: #{'{'}수급자명{'}'} → 홍길동, #{'{'}청구월{'}'} → 2026년 2월
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
