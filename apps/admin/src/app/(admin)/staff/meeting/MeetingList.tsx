'use client';

import React from 'react';
import MeetingItem from './MeetingItem';
import { MeetingRecord } from './meeting.type';

interface Props {
  readonly records: MeetingRecord[];
  readonly onEdit: (record: MeetingRecord) => void;
  readonly onDelete: (id: string) => void;
}

/**
 * [Component] 회의록 히스토리 피드 리스트
 * 아가페 표준 고밀도 스택 레이아웃 적용
 */
export default function MeetingList({ records, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-4 font-sans antialiased">
      <div className="flex items-center gap-2 border-l-4 border-[#5C8D5A] py-1 pl-3">
        <h3 className="text-[13px] font-black uppercase tracking-tight text-gray-800">
          회의록 아카이브 (Historical Stream)
        </h3>
      </div>

      {records.length === 0 ? (
        <div className="border border-dashed border-gray-300 bg-white p-20 text-center">
          <i className="ri-chat-history-line mb-2 text-4xl text-gray-100"></i>
          <p className="text-[12px] font-bold uppercase italic tracking-widest text-gray-300">
            No meeting records found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {records.map(record => (
            <MeetingItem key={record.id} record={record} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
