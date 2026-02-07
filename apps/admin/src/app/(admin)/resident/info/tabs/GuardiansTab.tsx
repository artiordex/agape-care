'use client';

interface GuardiansTabProps {
  guardians?: any[];
  onAddGuardian?: () => void;
}

export default function GuardiansTab({ guardians, onAddGuardian }: GuardiansTabProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
      <i className="ri-user-follow-line mb-3 text-4xl text-gray-300"></i>
      <h3 className="text-lg font-medium text-gray-900">보호자 정보</h3>
      <p className="mt-1 text-sm text-gray-500">이 탭의 내용은 준비 중입니다.</p>
      {onAddGuardian && (
        <button
          onClick={onAddGuardian}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          보호자 추가
        </button>
      )}
    </div>
  );
}
