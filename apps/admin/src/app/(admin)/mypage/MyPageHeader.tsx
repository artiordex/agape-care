'use client';

import React from 'react';

interface UserInfo {
  name: string;
  role: string;
  employeeId: string;
  roleLevel: string;
  phone: string;
  email: string;
  avatar: string;
}

interface Props {
  readonly userInfo: UserInfo;
  readonly onBack: () => void;
  readonly onNotificationClick: () => void;
}

/**
 * [Component] 마이페이지 통합 헤더
 * 아가페 그린(#5C8D5A) 테마 및 직각형 프로필 UI 적용
 */
export default function MyPageHeader({ userInfo, onBack, onNotificationClick }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-gray-300 bg-white p-5 font-sans antialiased shadow-sm md:flex-row md:items-center">
      {/* 1. 왼쪽: 뒤로가기 및 유저 핵심 정보 */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-none border border-gray-200 bg-white text-gray-400 transition-all hover:bg-gray-50 hover:text-[#5C8D5A]"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
        </button>

        <div className="flex items-center gap-4 border-l border-gray-100 pl-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-none border-2 border-emerald-100 bg-gray-100 shadow-inner">
            <img src={userInfo.avatar} alt={userInfo.name} className="h-full w-full object-cover grayscale-[0.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black uppercase leading-none tracking-tighter text-gray-900">
                내 정보 관제 센터 ({userInfo.name})
              </h1>
              <span className="rounded-none border border-[#5C8D5A] bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#5C8D5A]">
                {userInfo.roleLevel}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-bold uppercase italic tracking-widest text-gray-400">
              {userInfo.role} <span className="mx-1 opacity-30">|</span> {userInfo.employeeId}
            </p>
          </div>
        </div>
      </div>

      {/* 2. 오른쪽: 시스템 상태 및 알림 퀵 링크 */}
      <div className="flex items-center gap-3">
        <div className="mr-2 hidden text-right md:block">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Login Session</p>
          <p className="font-mono text-[11px] font-black italic text-[#5C8D5A]">ACTIVE NODE</p>
        </div>

        <button
          onClick={onNotificationClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-none bg-[#5C8D5A] text-white shadow-lg shadow-emerald-100 transition-all hover:bg-[#4A7548] active:scale-95"
        >
          <i className="ri-notification-3-line text-xl"></i>
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-none bg-red-600 text-[9px] font-black text-white ring-2 ring-white">
            3
          </span>
        </button>
      </div>
    </div>
  );
}
