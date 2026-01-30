'use client';

interface Props {
  currentStep: number;
}

export default function NotificationSendSteps({ currentStep }: Props) {
  const steps = [
    { step: 1, label: '발송 목적', icon: 'ri-flag-line' },
    { step: 2, label: '수신자 선택', icon: 'ri-user-line' },
    { step: 3, label: '메시지 작성', icon: 'ri-edit-line' },
    { step: 4, label: '발송 옵션', icon: 'ri-settings-line' },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        {steps.map((item, index) => (
          <div key={item.step} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  currentStep >= item.step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}
              >
                <i className={`${item.icon} text-lg`}></i>
              </div>
              <span
                className={`mt-2 text-xs font-medium ${currentStep >= item.step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-3 h-0.5 flex-1 transition-all ${
                  currentStep > item.step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
