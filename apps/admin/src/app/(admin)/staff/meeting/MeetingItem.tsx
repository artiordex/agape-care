'use client';

import React from 'react';
import clsx from 'clsx';
import { MeetingRecord } from './meeting.type';

/**
 * [Component] 개별 회의 기록 데이터 노드
 * 아가페 그린(#5C8D5A) 강조 및 직각형 액션 버튼 적용
 */
export default function MeetingItem({
  record,
  onEdit,
  onDelete,
}: {
  record: MeetingRecord;
  onEdit: any;
  onDelete: any;
}) {
  const isCommittee = record.category === 'committee';

  return (
    <div className="group relative border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#5C8D5A] hover:shadow-md">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        {/* 1. 회의 식별 정보 */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'border px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter',
                isCommittee
                  ? 'border-emerald-100 bg-emerald-50 text-[#5C8D5A]'
                  : 'border-blue-100 bg-blue-50 text-blue-700',
              )}
            >
              {isCommittee ? 'Committee Node' : 'Guardian Node'}
            </span>
            <span className="font-mono text-[11px] font-bold text-gray-800">
              {record.date} ({record.startTime}~{record.endTime})
            </span>
          </div>

          <h4 className="line-clamp-1 text-[17px] font-black text-gray-900 transition-colors group-hover:text-[#5C8D5A]">
            {record.title}
          </h4>

          <div className="flex flex-wrap gap-4 text-[11px] font-bold italic text-gray-400">
            <span className="flex items-center gap-1.5">
              <i className="ri-map-pin-2-line"></i> {record.location}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-user-3-line"></i> 작성: {record.writer}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-group-line"></i> {record.participants.length}명 참석
            </span>
          </div>
        </div>

        {/* 2. 핵심 요약 및 체크 현황 (이미지 로직 반영) */}
        <div className="w-full border border-gray-100 bg-[#f8fafc] p-4 lg:w-72">
          <div className="space-y-1.5">
            <p className="mb-1 text-[9px] font-black uppercase italic text-[#5C8D5A]">Administrative Status</p>
            {isCommittee && record.committeeOptions && (
              <div className="flex flex-col gap-1">
                <StatusCheck label="처우개선 의견수렴" checked={record.committeeOptions.staffOpinion} />
                <StatusCheck label="학대예방 교육시행" checked={record.committeeOptions.abusePrevention} />
              </div>
            )}
            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2">
              <span className="text-[10px] font-black uppercase text-gray-400">작성 상태</span>
              <span className="text-[11px] font-black text-[#5C8D5A]">{record.status}</span>
            </div>
          </div>
        </div>

        {/* 3. 관리 액션 버튼 */}
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100 lg:flex-col">
          <button
            onClick={() => onEdit(record)}
            className="border border-transparent p-2 text-gray-400 transition-all hover:border-emerald-100 hover:bg-emerald-50 hover:text-[#5C8D5A]"
          >
            <i className="ri-edit-line text-lg"></i>
          </button>
          <button
            onClick={() => onDelete(record.id)}
            className="border border-transparent p-2 text-gray-400 transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-600"
          >
            <i className="ri-delete-bin-line text-lg"></i>
          </button>
        </div>
      </div>

      {/* 하단 프로그레스 장식 */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#5C8D5A] transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
}

function StatusCheck({ label, checked }: any) {
  return (
    <div className="flex items-center gap-2">
      <i
        className={clsx(
          'text-[12px]',
          checked ? 'ri-checkbox-fill text-[#5C8D5A]' : 'ri-checkbox-blank-line text-gray-200',
        )}
      ></i>
      <span className={clsx('text-[10px] font-bold', checked ? 'text-gray-700' : 'text-gray-300')}>{label}</span>
    </div>
  );
}
