'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  readonly staff: any;
}

/**
 * [Component] 직원 핵심 신상 및 직무 프로필 관제 섹션
 * 아가페 그린(#5C8D5A) 테마 및 직각형 고밀도 레이아웃 적용
 */
export default function StaffBasicInfo({ staff }: Props) {
  if (!staff) {
    return (
      <div className="flex h-48 items-center justify-center rounded-none border border-dashed border-gray-300 bg-white text-[11px] font-black uppercase tracking-widest text-gray-400">
        <i className="ri-user-search-line mr-2 text-lg"></i>
        관제 대상 직원을 선택하십시오
      </div>
    );
  }

  return (
    <div className="rounded-none border border-gray-300 bg-white font-sans antialiased shadow-sm">
      {/* 1. 섹션 헤더: 아가페 그린 포인트 */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-[#5C8D5A] px-4 py-2 text-white">
        <div className="flex items-center gap-2">
          <i className="ri-profile-line text-lg opacity-80"></i>
          <h3 className="text-[11px] font-black uppercase tracking-widest">Employee Profile Master Data</h3>
        </div>
        <button className="rounded-none border border-white/20 bg-black/10 px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-white transition-all hover:bg-black/20">
          인사 기록 상세 조회
        </button>
      </div>

      <div className="flex flex-col gap-6 p-6 lg:flex-row">
        {/* 2. 좌측: 신원 확인 영역 (직각형 아바타 및 이름) */}
        <div className="flex shrink-0 flex-col items-center gap-4 lg:w-40">
          <div className="group relative h-40 w-40 overflow-hidden rounded-none border-2 border-gray-100 bg-gray-50 shadow-inner">
            {staff.photo ? (
              <img
                src={staff.photo}
                alt={staff.name}
                className="h-full w-full object-cover grayscale-[0.2] transition-all group-hover:grayscale-0"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-gray-300">
                <i className="ri-user-3-fill text-5xl"></i>
                <span className="mt-2 text-[9px] font-black uppercase italic tracking-tighter">No Profile Image</span>
              </div>
            )}
            {/* 상태 오버레이 배지 */}
            <div className="absolute bottom-0 left-0 w-full bg-[#5C8D5A]/90 py-1 text-center text-[9px] font-black uppercase text-white">
              {staff.status} ACTIVE
            </div>
          </div>

          <div className="w-full space-y-2">
            <button className="w-full rounded-none border border-emerald-200 bg-emerald-50 py-1.5 text-[10px] font-black text-[#5C8D5A] transition-all hover:bg-emerald-100">
              증명사진 승인완료
            </button>
            <div className="text-center">
              <span className="text-[16px] font-black text-gray-900">{staff.name}</span>
              <p className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">{staff.position}</p>
            </div>
          </div>
        </div>

        {/* 3. 우측: 행정 데이터 그리드 (Agape-Standard) */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
            <DataField label="직원 성명" value={staff.name} />
            <DataField label="재직 현황" value={staff.status} isBadge color="emerald" />
            <DataField label="성별 구분" value={staff.gender === '여' ? '여성 (Female)' : '남성 (Male)'} />
            <DataField label="인사 관리형태" value="전자문서 관리대상" />

            <DataField label="담당 직종" value={staff.position} highlight />
            <DataField label="법정 생년월일" value={staff.birth} isMono />
            <DataField label="최초 입사일" value={staff.hireDate} isMono isDate />
            <DataField label="최종 학력/교육" value={staff.education} isBadge color="emerald" />

            <div className="col-span-2">
              <DataField label="프로그램 관리 직무" value={`${staff.programType} / ${staff.program}`} />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                인사 시스템 계정
              </label>
              <button className="rounded-none border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-[#5C8D5A] transition-all hover:bg-emerald-100">
                포털 ID 및 보안 비밀번호 초기화
              </button>
            </div>

            <div className="col-span-2">
              <DataField label="휴대폰 번호 (Emergency)" value={staff.phone} isMono />
            </div>
            <div className="col-span-2">
              <DataField label="전자우편 (E-Mail)" value={staff.email} />
            </div>

            <div className="col-span-4">
              <DataField
                label="거주지 주소 (Registered Address)"
                value={staff.address || '미등록 (인사팀 확인 요망)'}
              />
            </div>

            <div className="col-span-4 space-y-1">
              <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                인사 관리 특이사항 (Administrative Notes)
              </label>
              <div className="min-h-[60px] rounded-none border border-gray-100 bg-gray-50/50 p-3 text-[11px] font-medium italic text-gray-600">
                {staff.note || '기록된 특이사항이 없습니다.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** [Sub] 데이터 필드 컴포넌트 */
function DataField({ label, value, isMono, highlight, isBadge, color, isDate }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">{label}</label>
      {isBadge ? (
        <span
          className={clsx(
            'inline-block w-fit rounded-none border px-2 py-0.5 text-[10px] font-black uppercase',
            color === 'emerald'
              ? 'border-emerald-100 bg-emerald-50 text-[#5C8D5A]'
              : 'border-gray-200 bg-gray-100 text-gray-600',
          )}
        >
          {value}
        </span>
      ) : isDate ? (
        <input
          type="date"
          value={value.replace(/\./g, '-')}
          readOnly
          className="rounded-none border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[11px] font-black text-gray-800 outline-none"
        />
      ) : (
        <span
          className={clsx(
            'text-[12px] font-bold',
            isMono ? 'font-mono tracking-tight text-gray-800' : 'text-gray-900',
            highlight && 'text-[#5C8D5A]',
          )}
        >
          {value}
        </span>
      )}
    </div>
  );
}
