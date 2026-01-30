'use client';

interface Props {
  selectedPurpose: string;
  onSelect: (purpose: string) => void;
}

const purposes = [
  { value: 'notice', label: '일반 공지', icon: 'ri-notification-line' },
  { value: 'urgent', label: '긴급 알림', icon: 'ri-alarm-warning-line' },
  { value: 'billing', label: '청구 안내', icon: 'ri-file-list-line' },
  { value: 'schedule', label: '일정 변경', icon: 'ri-calendar-line' },
  { value: 'health', label: '건강 정보', icon: 'ri-heart-pulse-line' },
  { value: 'other', label: '기타', icon: 'ri-more-line' },
];

export default function NotificationPurposeStep({ selectedPurpose, onSelect }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-bold text-gray-900">발송 목적을 선택하세요</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {purposes.map(item => (
          <button
            key={item.value}
            onClick={() => onSelect(item.value)}
            className={`rounded-lg border-2 p-4 transition-all ${
              selectedPurpose === item.value
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded bg-blue-50">
              <i className={`${item.icon} text-lg text-blue-600`}></i>
            </div>
            <div className="text-center text-sm font-medium text-gray-900">{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export { purposes };
