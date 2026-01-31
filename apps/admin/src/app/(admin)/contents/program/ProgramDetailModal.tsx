'use client';

import React from 'react';
import { Program } from './program.type';

interface Props {
  readonly isOpen: boolean;
  readonly program: Program | null;
  readonly onClose: () => void;
  readonly onEdit: (program: Program) => void;
  readonly onDelete: (id: string) => void;
}

/**
 * [Component] 프로그램 상세보기 모달
 */
export default function ProgramDetailModal({ isOpen, program, onClose, onEdit, onDelete }: Props) {
  if (!isOpen || !program) return null;

  const handleDelete = () => {
    if (confirm('정말로 이 프로그램을 삭제하시겠습니까?')) {
      onDelete(program.id);
      onClose();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '예정':
        return <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">예정</span>;
      case '진행중':
        return <span className="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-800">진행중</span>;
      case '완료':
        return <span className="rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">완료</span>;
      case '취소':
        return <span className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-800">취소</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: program.color }}></div>
            <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* 본문 */}
        <div className="space-y-6 px-6 py-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-6">
            <InfoItem label="카테고리">
              <span
                className="inline-block rounded px-2 py-1 text-sm font-medium"
                style={{ backgroundColor: program.color + '20', color: program.color }}
              >
                {program.category}
              </span>
            </InfoItem>

            <InfoItem label="상태">{getStatusBadge(program.status)}</InfoItem>

            <InfoItem label="날짜">
              <span className="text-gray-900">{program.date}</span>
            </InfoItem>

            <InfoItem label="시간">
              <span className="text-gray-900">
                {program.time} ({program.duration}분)
              </span>
            </InfoItem>

            <InfoItem label="담당자">
              <span className="text-gray-900">{program.instructor}</span>
            </InfoItem>

            <InfoItem label="장소">
              <span className="text-gray-900">{program.location}</span>
            </InfoItem>

            <InfoItem label="참여인원">
              <span className="text-gray-900">
                {program.participants} / {program.maxParticipants}명
              </span>
            </InfoItem>
          </div>

          {/* 프로그램 설명 */}
          {program.description && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">프로그램 설명</label>
              <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                {program.description}
              </div>
            </div>
          )}

          {/* 등록 정보 */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>등록일시: {new Date(program.createdAt).toLocaleString('ko-KR')}</div>
              <div>수정일시: {new Date(program.updatedAt).toLocaleString('ko-KR')}</div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex justify-between border-t border-gray-200 px-6 py-4">
          <button
            onClick={handleDelete}
            className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            삭제
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              닫기
            </button>
            <button
              onClick={() => onEdit(program)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div className="text-sm">{children}</div>
    </div>
  );
}
