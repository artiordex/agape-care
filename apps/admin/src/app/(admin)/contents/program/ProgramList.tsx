'use client';

import { Program } from './program.type';

interface Props {
  readonly programs: Program[];
  readonly onProgramClick: (program: Program) => void;
  readonly onEdit: (program: Program) => void;
  readonly onDelete: (id: string) => void;
}

/**
 * [Component] 프로그램 리스트 뷰
 * 이미지 스타일 적용
 */
export default function ProgramList({ programs, onProgramClick, onEdit, onDelete }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case '예정':
        return <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">예정</span>;
      case '진행중':
        return <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">진행중</span>;
      case '완료':
        return <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">완료</span>;
      case '취소':
        return <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">취소</span>;
      default:
        return null;
    }
  };

  if (programs.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center bg-white">
        <div className="text-center">
          <i className="ri-calendar-line mb-2 block text-4xl text-gray-300"></i>
          <p className="text-sm font-medium text-gray-500">등록된 프로그램이 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr className="text-left text-xs font-medium text-gray-600">
            <th className="px-6 py-3">날짜</th>
            <th className="px-6 py-3">시간</th>
            <th className="px-6 py-3">카테고리</th>
            <th className="px-6 py-3">프로그램명</th>
            <th className="px-6 py-3">담당자</th>
            <th className="px-6 py-3 text-center">상태</th>
            <th className="px-6 py-3 text-right">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {programs.map(program => (
            <tr
              key={program.id}
              onClick={() => onProgramClick(program)}
              className="cursor-pointer transition-colors hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{program.date}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{program.time}</td>
              <td className="px-6 py-4">
                <span
                  className="inline-block rounded px-2 py-1 text-xs font-medium"
                  style={{ backgroundColor: program.color + '20', color: program.color }}
                >
                  {program.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{program.title}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{program.instructor}</td>
              <td className="px-6 py-4 text-center">{getStatusBadge(program.status)}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onEdit(program);
                    }}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onDelete(program.id);
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
