'use client';

import { useState } from 'react';
import NotificationSendSteps from './NotificationSendSteps';
import NotificationPurposeStep, { purposes } from './NotificationPurposeStep';
import NotificationRecipientStep from './NotificationRecipientStep';
import NotificationMessageStep, { channels } from './NotificationMessageStep';
import NotificationOptionsStep from './NotificationOptionsStep';

export default function NotificationSendPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [recipientType, setRecipientType] = useState('');
  const [recipientCount] = useState(0);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('sms');
  const [smsMessage, setSmsMessage] = useState('');
  const [bandMessage, setBandMessage] = useState('');
  const [kakaoMessage, setKakaoMessage] = useState('');
  const [sendType, setSendType] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
      if (selectedChannels.length === 0) setActiveTab(channel);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSend = () => {
    alert('✅ 발송이 시작되었습니다.');
  };

  const getPurposeLabel = (value: string) => {
    return purposes.find(p => p.value === value)?.label || value;
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        {/* 헤더 */}
        <div>
          <h1 className="text-lg font-bold text-gray-900">알림 발송 작성</h1>
          <p className="mt-1 text-sm text-gray-600">SMS, Band, 카카오톡으로 알림을 발송하세요</p>
        </div>

        {/* 진행 단계 */}
        <NotificationSendSteps currentStep={currentStep} />

        {/* Step 1: 발송 목적 */}
        {currentStep === 1 && <NotificationPurposeStep selectedPurpose={purpose} onSelect={setPurpose} />}

        {/* Step 2: 수신자 선택 */}
        {currentStep === 2 && (
          <NotificationRecipientStep
            recipientType={recipientType}
            onSelectType={setRecipientType}
            recipientCount={recipientCount}
          />
        )}

        {/* Step 3: 메시지 작성 */}
        {currentStep === 3 && (
          <NotificationMessageStep
            selectedChannels={selectedChannels}
            onToggleChannel={toggleChannel}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            smsMessage={smsMessage}
            onSmsChange={setSmsMessage}
            bandMessage={bandMessage}
            onBandChange={setBandMessage}
            kakaoMessage={kakaoMessage}
            onKakaoChange={setKakaoMessage}
          />
        )}

        {/* Step 4: 발송 옵션 */}
        {currentStep === 4 && (
          <NotificationOptionsStep
            sendType={sendType}
            onSelectSendType={setSendType}
            scheduledDate={scheduledDate}
            onDateChange={setScheduledDate}
            scheduledTime={scheduledTime}
            onTimeChange={setScheduledTime}
            purpose={purpose}
            recipientCount={recipientCount}
            selectedChannels={selectedChannels}
            getPurposeLabel={getPurposeLabel}
          />
        )}

        {/* 하단 버튼 */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            이전
          </button>
          <div className="flex gap-2">
            <button className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              임시저장
            </button>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                다음
              </button>
            ) : (
              <button
                onClick={handleSend}
                className="flex items-center gap-1.5 rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <i className="ri-send-plane-line"></i>
                <span>발송하기</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
