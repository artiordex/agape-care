'use client';

interface Props {
  sendType: string;
  onSelectSendType: (type: string) => void;
  scheduledDate: string;
  onDateChange: (date: string) => void;
  scheduledTime: string;
  onTimeChange: (time: string) => void;
  purpose: string;
  recipientCount: number;
  selectedChannels: string[];
  getPurposeLabel: (purpose: string) => string;
}

export default function NotificationOptionsStep({
  sendType,
  onSelectSendType,
  scheduledDate,
  onDateChange,
  scheduledTime,
  onTimeChange,
  purpose,
  recipientCount,
  selectedChannels,
  getPurposeLabel,
}: Props) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-bold text-gray-900">발송 옵션을 설정하세요</h2>

      {/* 발송 시점 */}
      <div>
        <label className="mb-2 block text-xs font-medium text-gray-700">발송 시점</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSelectSendType('immediate')}
            className={`rounded-lg border-2 p-4 transition-all ${
              sendType === 'immediate' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <i className="ri-send-plane-line mb-2 block text-xl text-blue-600"></i>
            <div className="text-sm font-medium text-gray-900">즉시 발송</div>
          </button>
          <button
            onClick={() => onSelectSendType('scheduled')}
            className={`rounded-lg border-2 p-4 transition-all ${
              sendType === 'scheduled' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <i className="ri-calendar-schedule-line mb-2 block text-xl text-blue-600"></i>
            <div className="text-sm font-medium text-gray-900">예약 발송</div>
          </button>
        </div>
      </div>

      {/* 예약 발송 설정 */}
      {sendType === 'scheduled' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">날짜</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={e => onDateChange(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">시간</label>
            <input
              type="time"
              value={scheduledTime}
              onChange={e => onTimeChange(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* 발송 요약 */}
      <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-sm font-bold text-gray-900">발송 요약</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">발송 목적</span>
          <span className="font-medium text-gray-900">{getPurposeLabel(purpose)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">수신자</span>
          <span className="font-medium text-gray-900">{recipientCount}명</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">채널</span>
          <span className="font-medium text-gray-900">{selectedChannels.join(', ') || '미선택'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">발송 시점</span>
          <span className="font-medium text-gray-900">
            {sendType === 'immediate' ? '즉시 발송' : `${scheduledDate} ${scheduledTime}`}
          </span>
        </div>
      </div>
    </div>
  );
}
