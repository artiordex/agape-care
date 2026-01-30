'use client';

interface Props {
  selectedChannels: string[];
  onToggleChannel: (channel: string) => void;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  smsMessage: string;
  onSmsChange: (message: string) => void;
  bandMessage: string;
  onBandChange: (message: string) => void;
  kakaoMessage: string;
  onKakaoChange: (message: string) => void;
}

const channels = [
  { value: 'sms', label: 'SMS/LMS', icon: 'ri-message-2-line' },
  { value: 'band', label: 'Band', icon: 'ri-group-line' },
  { value: 'kakao', label: '카카오톡', icon: 'ri-kakao-talk-line' },
];

export { channels };

export default function NotificationMessageStep({
  selectedChannels,
  onToggleChannel,
  activeTab,
  onChangeTab,
  smsMessage,
  onSmsChange,
  bandMessage,
  onBandChange,
  kakaoMessage,
  onKakaoChange,
}: Props) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-bold text-gray-900">메시지를 작성하세요</h2>

      {/* 채널 선택 */}
      <div>
        <label className="mb-2 block text-xs font-medium text-gray-700">발송 채널</label>
        <div className="grid grid-cols-3 gap-3">
          {channels.map(channel => (
            <button
              key={channel.value}
              onClick={() => onToggleChannel(channel.value)}
              className={`rounded-lg border-2 p-4 transition-all ${
                selectedChannels.includes(channel.value)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <i className={`${channel.icon} mb-2 block text-xl text-blue-600`}></i>
              <div className="text-sm font-medium text-gray-900">{channel.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 메시지 작성 탭 */}
      {selectedChannels.length > 0 && (
        <div>
          <div className="mb-3 flex border-b border-gray-200">
            {selectedChannels.map(channel => (
              <button
                key={channel}
                onClick={() => onChangeTab(channel)}
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === channel
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {channels.find(c => c.value === channel)?.label}
              </button>
            ))}
          </div>

          {/* SMS */}
          {activeTab === 'sms' && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">메시지 내용</label>
              <textarea
                value={smsMessage}
                onChange={e => onSmsChange(e.target.value)}
                rows={6}
                className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="메시지를 입력하세요..."
              ></textarea>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>{smsMessage.length} / 2000 bytes</span>
                <span>{smsMessage.length <= 90 ? 'SMS' : smsMessage.length <= 2000 ? 'LMS' : 'MMS'}</span>
              </div>
            </div>
          )}

          {/* Band */}
          {activeTab === 'band' && (
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">제목</label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">내용</label>
                <textarea
                  value={bandMessage}
                  onChange={e => onBandChange(e.target.value)}
                  rows={6}
                  className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="내용을 입력하세요..."
                ></textarea>
              </div>
            </div>
          )}

          {/* 카카오톡 */}
          {activeTab === 'kakao' && (
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">템플릿 선택</label>
                <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">템플릿을 선택하세요</option>
                  <option value="1">청구 안내</option>
                  <option value="2">일정 변경 안내</option>
                  <option value="3">긴급 알림</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">메시지 내용</label>
                <textarea
                  value={kakaoMessage}
                  onChange={e => onKakaoChange(e.target.value)}
                  rows={6}
                  className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="메시지를 입력하세요..."
                ></textarea>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
