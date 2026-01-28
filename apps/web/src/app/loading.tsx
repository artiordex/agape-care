'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/* 아가페 요양원 스타일 로딩 컴포넌트 */
export default function Loading() {
  const messages = [
    '서비스 준비 중입니다...',
    '잠시만 기다려주세요...',
    '안전한 연결을 진행 중입니다...',
    '조금만 더 기다려 주세요 🌿',
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F5F3EE] via-[#F9F8F6] to-[#E8F0EA]">
      <div className="animate-fade-in flex flex-col items-center space-y-8">
        {/* 로고 배경 */}
        <div className="flex h-28 w-28 animate-[pulse_2s_infinite] items-center justify-center rounded-full bg-[#5C8D5A] shadow-xl">
          <Image src="/images/logo.png" alt="Agape Care Logo" width={140} height={140} className="object-contain" />
        </div>

        {/* 점(dot) 대신 부드러운 pulse 바 */}
        <div className="flex space-x-2">
          <div className="h-3 w-3 animate-[ping_1.2s_infinite] rounded-full bg-[#5C8D5A]" />
          <div className="h-3 w-3 animate-[ping_1.2s_infinite_200ms] rounded-full bg-[#5C8D5A]/80" />
          <div className="h-3 w-3 animate-[ping_1.2s_infinite_400ms] rounded-full bg-[#5C8D5A]/60" />
        </div>

        {/* 메시지 */}
        <p className="animate-pulse text-lg font-medium text-gray-700">{messages[currentMessageIndex]}</p>
      </div>
    </div>
  );
}
