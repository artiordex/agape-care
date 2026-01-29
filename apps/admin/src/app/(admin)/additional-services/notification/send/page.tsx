'use client';

import { useState } from 'react';

interface RecipientFilter {
  targetType: string[];
  rooms: string[];
  grades: string[];
  departments: string[];
}

const NotificationSend: React.FC = () => {
  // Step 상태
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: 발송 목적
  const [purpose, setPurpose] = useState('');

  // Step 2: 수신자 선택
  const [recipientType, setRecipientType] = useState('');
  const [filters, setFilters] = useState<RecipientFilter>({
    targetType: [],
    rooms: [],
    grades: [],
    departments: [],
  });
  const [recipientCount, setRecipientCount] = useState(0);

  // Step 3: 채널 선택
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('sms');

  // 메시지 내용
  const [smsMessage, setSmsMessage] = useState('');
  const [bandMessage, setBandMessage] = useState('');
  const [kakaoMessage, setKakaoMessage] = useState('');

  // Step 4: 발송 옵션
  const [sendType, setSendType] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  // 채널 토글
  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
      if (selectedChannels.length === 0) {
        setActiveTab(channel);
      }
    }
  };

  // 다음 단계
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 발송 처리
  const handleSend = () => {
    // TODO: API 호출
    alert('발송이 시작되었습니다.');
  };

  return (
    <div className="space-y-6 p-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">발송 작성/즉시발송</h1>
        <p className="mt-1 text-sm text-gray-500">SMS, Band, 카카오톡으로 알림을 발송하세요</p>
      </div>

      {/* 진행 단계 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          {[
            { step: 1, label: '발송 목적', icon: 'ri-flag-line' },
            { step: 2, label: '수신자 선택', icon: 'ri-user-line' },
            { step: 3, label: '메시지 작성', icon: 'ri-edit-line' },
            { step: 4, label: '발송 옵션', icon: 'ri-settings-line' },
          ].map((item, index) => (
            <div key={item.step} className="flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                    currentStep >= item.step ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep >= item.step ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
              {index < 3 && (
                <div
                  className={`mx-4 h-1 flex-1 transition-all ${
                    currentStep > item.step ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: 발송 목적 */}
      {currentStep === 1 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">발송 목적을 선택하세요</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { value: 'notice', label: '공지', icon: 'ri-notification-line', color: 'blue' },
              { value: 'urgent', label: '긴급', icon: 'ri-alarm-warning-line', color: 'red' },
              { value: 'billing', label: '청구', icon: 'ri-file-list-line', color: 'purple' },
              { value: 'payroll', label: '급여', icon: 'ri-money-dollar-circle-line', color: 'green' },
              { value: 'schedule', label: '일정', icon: 'ri-calendar-line', color: 'orange' },
              { value: 'other', label: '기타', icon: 'ri-more-line', color: 'gray' },
            ].map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => setPurpose(item.value)}
                className={`rounded-xl border-2 p-6 transition-all ${
                  purpose === item.value
                    ? `border-${item.color}-600 bg-${item.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className={`h-12 w-12 bg-${item.color}-100 mx-auto mb-3 flex items-center justify-center rounded-lg`}
                >
                  <i className={`${item.icon} text-2xl text-${item.color}-600`}></i>
                </div>
                <div className="text-center font-medium text-gray-900">{item.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: 수신자 선택 */}
      {currentStep === 2 && (
        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">수신자를 선택하세요</h2>

          {/* 대상자 유형 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">대상자 유형</label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { value: 'resident', label: '수급자', icon: 'ri-user-heart-line' },
                { value: 'guardian', label: '보호자', icon: 'ri-parent-line' },
                { value: 'staff', label: '직원', icon: 'ri-team-line' },
                { value: 'all', label: '전체', icon: 'ri-group-line' },
              ].map(item => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setRecipientType(item.value)}
                  className={`rounded-lg border-2 p-4 transition-all ${
                    recipientType === item.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`${item.icon} mb-2 text-2xl`}></i>
                  <div className="text-sm font-medium">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 필터 */}
          {recipientType && recipientType !== 'all' && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">생활실</label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                  <option value="">전체</option>
                  <option value="101">101호</option>
                  <option value="102">102호</option>
                  <option value="103">103호</option>
                </select>
              </div>

              {recipientType === 'resident' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">등급</label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                    <option value="">전체</option>
                    <option value="1">1등급</option>
                    <option value="2">2등급</option>
                    <option value="3">3등급</option>
                    <option value="4">4등급</option>
                    <option value="5">5등급</option>
                  </select>
                </div>
              )}

              {recipientType === 'staff' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">부서</label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                    <option value="">전체</option>
                    <option value="nursing">간호팀</option>
                    <option value="care">요양팀</option>
                    <option value="admin">행정팀</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* 수신자 수 */}
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">예상 수신자</span>
              <span className="text-2xl font-bold text-emerald-600">{recipientCount}명</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: 메시지 작성 */}
      {currentStep === 3 && (
        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">메시지를 작성하세요</h2>

          {/* 채널 선택 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">발송 채널</label>
            <div className="flex gap-3">
              {[
                { value: 'sms', label: 'SMS', icon: 'ri-message-2-line' },
                { value: 'band', label: 'Band', icon: 'ri-group-line' },
                { value: 'kakao', label: '카카오톡', icon: 'ri-kakao-talk-line' },
              ].map(channel => (
                <button
                  key={channel.value}
                  type="button"
                  onClick={() => toggleChannel(channel.value)}
                  className={`flex-1 rounded-lg border-2 p-4 transition-all ${
                    selectedChannels.includes(channel.value)
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`${channel.icon} mb-2 text-2xl`}></i>
                  <div className="text-sm font-medium">{channel.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 메시지 작성 탭 */}
          {selectedChannels.length > 0 && (
            <div>
              <div className="mb-4 flex border-b border-gray-200">
                {selectedChannels.map(channel => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setActiveTab(channel)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeTab === channel
                        ? 'border-b-2 border-emerald-600 text-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {channel === 'sms' && 'SMS'}
                    {channel === 'band' && 'Band'}
                    {channel === 'kakao' && '카카오톡'}
                  </button>
                ))}
              </div>

              {/* SMS 작성 */}
              {activeTab === 'sms' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">메시지 내용</label>
                    <textarea
                      value={smsMessage}
                      onChange={e => setSmsMessage(e.target.value)}
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                      placeholder="메시지를 입력하세요..."
                    ></textarea>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{smsMessage.length} / 2000 bytes</span>
                      <span className="text-xs text-gray-500">
                        {smsMessage.length <= 90 ? 'SMS' : smsMessage.length <= 2000 ? 'LMS' : 'MMS'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Band 작성 */}
              {activeTab === 'band' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">제목</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                      placeholder="제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">내용</label>
                    <textarea
                      value={bandMessage}
                      onChange={e => setBandMessage(e.target.value)}
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                      placeholder="내용을 입력하세요..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* 카카오톡 작성 */}
              {activeTab === 'kakao' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">템플릿 선택</label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                      <option value="">템플릿을 선택하세요</option>
                      <option value="1">청구 안내</option>
                      <option value="2">일정 변경 안내</option>
                      <option value="3">긴급 알림</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">메시지 내용</label>
                    <textarea
                      value={kakaoMessage}
                      onChange={e => setKakaoMessage(e.target.value)}
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                      placeholder="메시지를 입력하세요..."
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 4: 발송 옵션 */}
      {currentStep === 4 && (
        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">발송 옵션을 설정하세요</h2>

          {/* 발송 시점 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">발송 시점</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSendType('immediate')}
                className={`rounded-lg border-2 p-4 transition-all ${
                  sendType === 'immediate'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <i className="ri-send-plane-line mb-2 text-2xl"></i>
                <div className="text-sm font-medium">즉시 발송</div>
              </button>
              <button
                type="button"
                onClick={() => setSendType('scheduled')}
                className={`rounded-lg border-2 p-4 transition-all ${
                  sendType === 'scheduled'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <i className="ri-calendar-schedule-line mb-2 text-2xl"></i>
                <div className="text-sm font-medium">예약 발송</div>
              </button>
            </div>
          </div>

          {/* 예약 발송 설정 */}
          {sendType === 'scheduled' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">날짜</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={e => setScheduledDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">시간</label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={e => setScheduledTime(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* 발송 요약 */}
          <div className="space-y-3 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 font-bold text-gray-900">발송 요약</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">발송 목적</span>
              <span className="text-sm font-medium text-gray-900">{purpose}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">수신자</span>
              <span className="text-sm font-medium text-gray-900">{recipientCount}명</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">채널</span>
              <span className="text-sm font-medium text-gray-900">{selectedChannels.join(', ')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">발송 시점</span>
              <span className="text-sm font-medium text-gray-900">
                {sendType === 'immediate' ? '즉시 발송' : `${scheduledDate} ${scheduledTime}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 하단 버튼 */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          이전
        </button>
        <div className="flex gap-3">
          <button type="button" className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50">
            임시저장
          </button>
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
            >
              다음
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
            >
              <i className="ri-send-plane-line"></i>
              <span>발송하기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSend;
