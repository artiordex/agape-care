'use client';

import React from 'react';
import EducationItem from './EducationItem';

interface Props {
  readonly educations: any[];
  readonly onEdit: (education: any) => void;
  readonly onDelete: (id: string) => void;
}

/**
 * [Component] 교육 기록 피드 리스트 컨테이너
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 스택 레이아웃 적용
 */
export default function EducationList({ educations, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-5 font-sans antialiased">
      {educations.length === 0 ? (
        <div className="rounded-none border border-gray-300 bg-white p-20 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center opacity-30">
            <i className="ri-book-open-line mb-4 text-6xl text-gray-300"></i>
            <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">
              조회 조건에 부합하는 교육 기록이 존재하지 않습니다
            </p>
          </div>
        </div>
      ) : (
        educations.map(education => (
          <EducationItem key={education.id} education={education} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
