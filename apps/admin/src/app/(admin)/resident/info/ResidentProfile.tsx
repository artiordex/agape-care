'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface Props {
  readonly resident: any;
  readonly getStatusColor: (status: string) => string;
  readonly getGradeColor: (grade: string) => string;
  readonly onDownloadContract: () => void;
}

/**
 * [Component] 입소자 핵심 프로필 및 바이탈 관제 카드
 * 아가페 그린(#5C8D5A) 테마 및 고딕체 기반 고밀도 ERP 레이아웃
 */
export default function ResidentProfile({ resident, getStatusColor, getGradeColor, onDownloadContract }: Props) {
  const router = useRouter();

  if (!resident) return null;

  const handleEdit = () => router.push(`/admin/resident/edit?id=${resident.id}`);
  const handleViewDetail = () => router.push(`/admin/resident/detail?id=${resident.id}`);

  // 나이 계산 로직 (예시)
  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(resident.birthDate?.split('-')[0] || '1950');
  const age = currentYear - birthYear;

  return (
    <div className="border-b border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 상단 프로필 및 액션 영역 */}
      <div className="px-6 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* 좌측: 기본 인적 사항 */}
          <div className="flex items-start gap-5">
            {/* 고해상도 프로필 이미지/이니셜 박스 */}
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-gray-100 bg-gray-50 text-3xl font-black text-gray-400 shadow-inner transition-colors group-hover:border-[#5C8D5A]/30">
                {resident.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#5C8D5A] text-white shadow-sm">
                <i className="ri-heart-pulse-fill text-[12px]"></i>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-black tracking-tighter text-gray-900">
                  {resident.name} <span className="ml-1 text-[14px] font-bold text-gray-400">어르신</span>
                </h2>
                <span
                  className={clsx(
                    'rounded-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-widest shadow-sm',
                    getStatusColor(resident.status),
                  )}
                >
                  {resident.status}
                </span>
                <span
                  className={clsx(
                    'rounded-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-widest shadow-sm',
                    getGradeColor(resident.grade),
                  )}
                >
                  {resident.grade}
                </span>
                <span className="rounded-sm border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  {resident.room}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[12px] font-bold text-gray-500">
                <span className="flex items-center gap-1">
                  <i className="ri-user-6-line text-[#5C8D5A]"></i> {resident.gender} / {age}세
                </span>
                <span className="h-2 w-[1px] bg-gray-300"></span>
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-check-line text-[#5C8D5A]"></i> 입소일: {resident.admissionDate}
                </span>
                <span className="h-2 w-[1px] bg-gray-300"></span>
                <span className="flex items-center gap-1">
                  <i className="ri-coins-line text-[#5C8D5A]"></i> 본인부담: {resident.copaymentRate}%
                </span>
                <span className="h-2 w-[1px] bg-gray-300"></span>
                <span className="flex items-center gap-1 font-mono">{resident.phone}</span>
              </div>
            </div>
          </div>

          {/* 우측: 핵심 관리 액션 (아가페 그린 테마) */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] font-black text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
            >
              <i className="ri-edit-box-line text-lg"></i> 기록 수정
            </button>
            <button
              onClick={onDownloadContract}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] font-black text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
            >
              <i className="ri-file-text-line text-lg"></i> 계약서 출력
            </button>
            <button
              onClick={handleViewDetail}
              className="flex items-center gap-1.5 rounded-md bg-[#5C8D5A] px-5 py-2 text-[12px] font-black text-white shadow-md transition-all hover:bg-[#4A7548] active:scale-95"
            >
              <i className="ri-search-eye-line text-lg"></i> 전체 기록 상세조회
            </button>
          </div>
        </div>
      </div>

      {/* 2. 하단: 건강 지표 및 실시간 바이탈 보드 */}
      <div className="border-t border-gray-100 bg-[#f8fafc] px-6 py-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3 w-1 bg-[#5C8D5A]"></div>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">실시간 건강 지표 모니터링</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <VitalCard label="최근 혈압" value={resident.bloodPressure} unit="mmHg" icon="ri-pulse-line" />
          <VitalCard label="공복 혈당" value={resident.bloodSugar} unit="mg/dL" icon="ri-drop-line" />
          <VitalCard label="현재 신장" value={resident.height} unit="cm" icon="ri-ruler-2-line" />
          <VitalCard label="측정 체중" value={resident.weight} unit="kg" icon="ri-scales-3-line" />
          <VitalCard
            label="등급 만료일"
            value={resident.gradeValidUntil}
            icon="ri-calendar-expiration-line"
            isHighlight
          />
        </div>
      </div>
    </div>
  );
}

/** 내부 서브 컴포넌트: 바이탈 대시보드 카드 */
function VitalCard({ label, value, unit, icon, isHighlight }: any) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-[#5C8D5A]">
      <div
        className={clsx(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-md border text-lg transition-colors',
          isHighlight ? 'border-[#5C8D5A] bg-[#5C8D5A] text-white' : 'border-gray-100 bg-gray-50 text-[#5C8D5A]',
        )}
      >
        <i className={icon}></i>
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-[9px] font-black uppercase leading-none text-gray-400">{label}</p>
        <p
          className={clsx(
            'truncate font-mono text-[14px] font-black leading-none',
            isHighlight ? 'text-[#5C8D5A]' : 'text-gray-900',
          )}
        >
          {value} <span className="text-[10px] font-bold italic text-gray-400">{unit}</span>
        </p>
      </div>
    </div>
  );
}
