/**
 * Description : TemplateTable.tsx - 템플릿 목록 테이블
 * Author : Shiwoo Min
 * Date : 2026-02-18
 */

'use client';

import clsx from 'clsx';

export interface Template {
  id: number;
  name: string;
  category: string;
  channel: string;
  content: string;
  status: string;
  usageCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  readonly templates: Template[];
  readonly onView: (id: number) => void;
  readonly onEdit: (id: number) => void;
  readonly onCopy: (id: number) => void;
  readonly onToggleStatus: (id: number) => void;
  readonly onDelete: (id: number) => void;
}

export default function TemplateTable({ templates, onView, onEdit, onCopy, onToggleStatus, onDelete }: Props) {
  const getCategoryBadge = (category: string) => {
    const badgeMap: { [key: string]: { label: string; className: string } } = {
      notice: { label: '일반 공지', className: 'bg-blue-50 text-blue-700 border-blue-100' },
      urgent: { label: '긴급 알림', className: 'bg-red-50 text-red-700 border-red-100' },
      billing: { label: '청구 안내', className: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
      schedule: { label: '일정 안내', className: 'bg-orange-50 text-orange-700 border-orange-100' },
      health: { label: '건강 정보', className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
      event: { label: '행사 안내', className: 'bg-pink-50 text-pink-700 border-pink-100' },
      other: { label: '기타', className: 'bg-gray-50 text-gray-700 border-gray-100' },
    };
    return badgeMap[category] || { label: category, className: 'bg-gray-50 text-gray-700 border-gray-100' };
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-sm border border-gray-300 bg-white shadow-inner">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-left text-[12px]">
          <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-100 font-black text-gray-600">
            <tr>
              <th className="w-12 px-4 py-3 text-center text-[11px] uppercase tracking-tighter">No.</th>
              <th className="px-4 py-3">채널</th>
              <th className="px-4 py-3">템플릿 명칭</th>
              <th className="px-4 py-3">메세지 내용 미리보기</th>
              <th className="px-4 py-3">카테고리</th>
              <th className="px-4 py-3 text-center">사용</th>
              <th className="px-4 py-3 text-center">상태</th>
              <th className="px-4 py-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {templates.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-20 text-center text-gray-400">
                  <i className="ri-inbox-line mb-2 block text-4xl opacity-20"></i>
                  등록된 템플릿이 없습니다.
                </td>
              </tr>
            ) : (
              templates.map((t, idx) => {
                const cat = getCategoryBadge(t.category);
                return (
                  <tr key={t.id} className="group transition-colors hover:bg-blue-50/30">
                    <td className="px-4 py-3.5 text-center font-mono text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3.5 font-bold">
                      <div className="flex items-center gap-1.5 capitalize">
                        <i
                          className={clsx(
                            'text-lg',
                            t.channel === 'sms'
                              ? 'ri-message-2-line text-blue-500'
                              : t.channel === 'band'
                                ? 'ri-group-line text-green-500'
                                : 'ri-chat-3-line text-yellow-500',
                          )}
                        ></i>
                        {t.channel}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-[13px] font-black text-gray-900">{t.name}</div>
                      <div className="mt-0.5 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                        Created By {t.createdBy}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="max-w-md truncate italic text-gray-500">{t.content}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={clsx(
                          'rounded-sm border px-2 py-0.5 text-[10px] font-black leading-none',
                          cat.className,
                        )}
                      >
                        {cat.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-gray-400">{t.usageCount}회</td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => onToggleStatus(t.id)}
                        className={clsx(
                          'rounded-full border px-3 py-1 text-[10px] font-black transition-all',
                          t.status === 'active'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                            : 'border-gray-200 bg-gray-50 text-gray-300',
                        )}
                      >
                        {t.status === 'active' ? '사용중' : '중단'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => onView(t.id)}
                          className="rounded p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                          title="상세보기"
                        >
                          <i className="ri-search-line"></i>
                        </button>
                        <button
                          onClick={() => onEdit(t.id)}
                          className="rounded p-1.5 text-gray-400 hover:bg-green-50 hover:text-[#5C8D5A]"
                          title="수정"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => onCopy(t.id)}
                          className="rounded p-1.5 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600"
                          title="복사"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                        <button
                          onClick={() => onDelete(t.id)}
                          className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                          title="삭제"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-[10px] font-bold text-gray-400">
        <span>AGA_TEMPLATE_ENGINE_V1</span>
        <span>TOTAL {templates.length} TEMPLATES REGISTERED</span>
      </div>
    </div>
  );
}
