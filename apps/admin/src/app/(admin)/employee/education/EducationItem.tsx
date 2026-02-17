'use client';

import React from 'react';
import clsx from 'clsx';

/**
 * [Component] 개별 교육 기록 상세 카드
 * 아가페 그린(#5C8D5A) 테마 및 직각형 UI 명세 적용
 */
export default function EducationItem({ education, onEdit, onDelete }: any) {
  // 교육 유형별 스타일 정의
  const typeStyles: any = {
    humanRights: { label: '노인인권', bg: 'bg-red-50 text-red-700 border-red-100' },
    staffRights: { label: '직원인권', bg: 'bg-orange-50 text-orange-700 border-orange-100' },
    disaster: { label: '재난대응', bg: 'bg-emerald-50 text-[#5C8D5A] border-emerald-100' },
    competency: { label: '역량강화', bg: 'bg-blue-50 text-blue-700 border-blue-100' },
    legal: { label: '법정교육', bg: 'bg-purple-50 text-purple-700 border-purple-100' },
  };

  const style = typeStyles[education.type] || typeStyles.legal;

  return (
    <div className="group overflow-hidden rounded-none border border-gray-300 bg-white shadow-sm transition-all hover:border-[#5C8D5A] hover:shadow-md">
      <div className="flex flex-col lg:flex-row">
        {/* 1. 시행 증빙 이미지 섹션 */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden border-r border-gray-100 lg:h-auto lg:w-72">
          {education.fileUrl ? (
            <img
              src={education.fileUrl}
              alt={education.title}
              className="h-full w-full object-cover grayscale-[0.3] transition-all group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 text-gray-300">
              <i className="ri-image-line text-4xl"></i>
              <span className="mt-2 text-[10px] font-black uppercase tracking-tighter">No Evidence Image</span>
            </div>
          )}
          {/* 참석률 오버레이 배지 */}
          <div className="absolute left-0 top-0 rounded-none bg-[#5C8D5A] px-3 py-1.5 text-[11px] font-black text-white shadow-lg">
            ATTENDANCE {education.attendanceRate}%
          </div>
        </div>

        {/* 2. 교육 상세 명세 영역 */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'rounded-none border px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter',
                    style.bg,
                  )}
                >
                  {style.label} Protocol
                </span>
                <span className="font-mono text-[10px] font-bold italic text-gray-300">#{education.id}</span>
              </div>
              <h3 className="text-[18px] font-black tracking-tight text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
                {education.title}
              </h3>
            </div>

            {/* 관리 버튼 (직각형) */}
            <div className="flex gap-1 opacity-0 transition-all group-hover:opacity-100">
              <button
                onClick={() => onEdit(education)}
                className="rounded-none bg-gray-100 p-2 text-gray-500 transition-all hover:bg-[#5C8D5A] hover:text-white"
              >
                <i className="ri-edit-2-line text-lg"></i>
              </button>
              <button
                onClick={() => onDelete(education.id)}
                className="rounded-none bg-gray-100 p-2 text-gray-500 transition-all hover:bg-red-600 hover:text-white"
              >
                <i className="ri-delete-bin-7-line text-lg"></i>
              </button>
            </div>
          </div>

          {/* 4분할 데이터 그리드 */}
          <div className="mb-5 grid grid-cols-2 gap-x-8 gap-y-3 rounded-none border border-gray-100 bg-[#f8fafc] p-4 md:grid-cols-4">
            <MetaItem
              icon="ri-calendar-event-line"
              label="교육 일시"
              value={`${education.date} ${education.time}`}
              isMono
            />
            <MetaItem icon="ri-user-follow-line" label="담당 강사" value={education.instructor} />
            <MetaItem icon="ri-map-pin-2-line" label="교육 장소" value={education.location} />
            <MetaItem icon="ri-team-line" label="참석 인원" value={`${education.participants.length}명 참여`} />
          </div>

          {/* 교육 내용 및 평가 요약 */}
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase italic tracking-widest text-[#5C8D5A]">
                Education Summary
              </p>
              <p className="line-clamp-2 text-[12px] font-medium leading-relaxed text-gray-600">{education.summary}</p>
            </div>
            {education.evaluation && (
              <div className="border-l-2 border-emerald-200 py-1 pl-4">
                <p className="text-[10px] font-black uppercase italic tracking-widest text-gray-400">
                  Performance Evaluation
                </p>
                <p className="text-[11px] font-bold text-gray-700">{education.evaluation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 장식용 프로그래스 바 */}
      <div className="h-1 w-full bg-gray-50">
        <div
          className="h-full bg-[#5C8D5A] opacity-30 transition-all group-hover:opacity-100"
          style={{ width: `${education.attendanceRate}%` }}
        ></div>
      </div>
    </div>
  );
}

/** 내부 서브 컴포넌트: 메타데이터 항목 */
function MetaItem({ icon, label, value, isMono }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter text-gray-400">
        <i className={icon}></i>
        {label}
      </div>
      <span className={clsx('truncate text-[11px] font-bold text-gray-800', isMono && 'font-mono')}>{value}</span>
    </div>
  );
}
