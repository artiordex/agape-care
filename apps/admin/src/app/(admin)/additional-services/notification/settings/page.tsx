'use client';

import NotificationSettingsForm from './NotificationSettingsForm';

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">채널 연동 설정</h1>
          <p className="mt-1 text-sm text-gray-500">SMS, 이메일, 푸시 알림 등 발송 채널을 설정합니다.</p>
        </div>
      </div>

      <NotificationSettingsForm />
    </div>
  );
}
