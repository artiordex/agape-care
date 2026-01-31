'use client';

import React from 'react';
import clsx from 'clsx';

interface ResidentInfo {
  name: string;
  grade: string;
  gender: string;
  age: number;
  admissionDate: string;
  room: string;
  mainDiagnosis: string;
}

interface NeedsStatus {
  physical: string;
  excretion: string;
  rehabilitation: string;
}

interface Props {
  readonly resident: ResidentInfo | null;
  readonly needsStatus: NeedsStatus;
}

/**
 * [Component] 수급자 통합 정보 및 욕구사정 요약 카드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세서 레이아웃 적용
 */
export default function DailyCareInfoCards({ resident, needsStatus }: Props) {
  // 데이터 부재 시 대기 화면
  if (!resident) {
    return (
      <div className="flex h-[180px] w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white shadow-sm">
        <div className="text-center">
          <i className="ri-user-search-line mb-2 block text-4xl text-gray-200"></i>
          <p className="text-[12px] font-black uppercase tracking-widest text-gray-400">
            수급자를 선택하면 상세 정보가 노출됩니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 font-sans antialiased md:flex-row">
      {/* 1. 수급자 마스터 프로필 카드 */}
      <div className="flex-[2.5] overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-1 rounded-full bg-[#5C8D5A]"></div>
            <h3 className="text-[12px] font-black uppercase tracking-tight text-gray-800">수급자 마스터 프로필</h3>
          </div>
          <span className="text-[9px] font-bold uppercase italic tracking-widest text-gray-400">Beneficiary Info</span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
            <InfoItem label="수급자명" value={resident.name} highlight />
            <InfoItem label="성별/연령" value={`${resident.gender} (만 ${resident.age}세)`} />
            <InfoItem label="등급/부담율" value={`${resident.grade} (20%)`} />
            <InfoItem label="배정 생활실" value={resident.room} icon="ri-door-open-line" />
            <InfoItem label="입소 일자" value={resident.admissionDate} />
            <div className="hidden lg:block">
              <InfoItem label="관제 상태" value="정상 급여" isBadge />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 border-t border-gray-100 pt-4">
            <span className="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-gray-500">
              주요질환
            </span>
            <p className="truncate text-[12px] font-bold leading-relaxed text-gray-700" title={resident.mainDiagnosis}>
              {resident.mainDiagnosis}
            </p>
          </div>
        </div>
      </div>

      {/* 2. 욕구사정 핵심 요약 카드 */}
      <div className="flex-1 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-1 rounded-full bg-orange-400"></div>
            <h3 className="text-[12px] font-black uppercase tracking-tight text-gray-800">욕구사정 요약</h3>
          </div>
          <i className="ri-shield-user-line text-gray-300"></i>
        </div>

        <div className="grid h-[calc(100%-45px)] grid-cols-3 gap-0 divide-x divide-gray-100">
          <StatusItem label="신체상태" value={needsStatus.physical} icon="ri-user-heart-line" color="text-[#5C8D5A]" />
          <StatusItem label="배설양상" value={needsStatus.excretion} icon="ri-hand-coin-line" color="text-blue-500" />
          <StatusItem label="질병관리" value={needsStatus.rehabilitation} icon="ri-pulse-line" color="text-red-500" />
        </div>
      </div>
    </div>
  );
}

/* ================= 내부 서브 컴포넌트 ================= */

/** 인적사항 항목 */
function InfoItem({ label, value, highlight, icon, isBadge }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-black uppercase italic tracking-tighter text-gray-400">{label}</label>
      {isBadge ? (
        <span className="w-fit rounded-sm border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-black text-[#5C8D5A] shadow-sm">
          {value}
        </span>
      ) : (
        <div className="flex items-center gap-1">
          {icon && <i className={clsx(icon, 'text-[#5C8D5A]')}></i>}
          <p
            className={clsx(
              'text-[13px] leading-none tracking-tight',
              highlight ? 'font-black text-gray-900' : 'font-bold text-gray-700',
            )}
          >
            {value}
          </p>
        </div>
      )}
    </div>
  );
}

/** 욕구사정 항목 */
function StatusItem({ label, value, icon, color }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-4 transition-colors hover:bg-gray-50">
      <div
        className={clsx(
          'mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 shadow-inner',
          color,
        )}
      >
        <i className={clsx(icon, 'text-xl')}></i>
      </div>
      <p className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-gray-400">{label}</p>
      <p className="text-[12px] font-black tracking-tight text-gray-900">{value}</p>
    </div>
  );
}
