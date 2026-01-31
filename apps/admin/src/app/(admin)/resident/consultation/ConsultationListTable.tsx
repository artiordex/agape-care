'use client';

import React from 'react';
import clsx from 'clsx';

interface Consultation {
  id: string;
  recipientId: string;
  recipientName: string;
  type: 'consultation' | 'interview';
  year: number;
  quarter: number;
  occurredAt: string;
  targetType: 'recipient' | 'guardian';
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
  categoryCode: string;
  categoryName: string;
  methodCode: string;
  methodName: string;
  staffId: string;
  staffName: string;
  content: string;
  actionContent?: string;
  attachmentCount: number;
  isBenefitReflected: boolean;
  createdAt: string;
  createdBy: string;
}

interface Props {
  readonly data: Consultation[];
  readonly onViewDetail: (consultation: Consultation) => void;
}

/**
 * [Component] 상세 상담 이력 로그 그리드
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 명세서 스타일 적용
 */
export default function ConsultationListTable({ data, onViewDetail }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white font-sans antialiased shadow-sm">
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {/* 고밀도 테이블 헤더: 행정 문서 스타일 */}
          <thead className="border-b border-gray-200 bg-[#f8fafc] text-[10px] font-black uppercase tracking-tighter text-gray-500">
            <tr>
              <th className="px-5 py-3 text-center">로그 No.</th>
              <th className="px-5 py-3">상담 및 면담 일시</th>
              <th className="px-5 py-3 text-center">분기</th>
              <th className="px-5 py-3">상담 대상</th>
              <th className="px-5 py-3">상담 구분</th>
              <th className="px-5 py-3 text-center">방법</th>
              <th className="px-5 py-3">기록 작성자</th>
              <th className="px-5 py-3 text-center">증빙</th>
              <th className="px-5 py-3 text-right">상세 관리</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-[12px]">
            {data.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-5 py-20 text-center">
                  <i className="ri-chat-history-line mb-2 block text-4xl text-gray-200"></i>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    누적된 상담 기록이 존재하지 않습니다
                  </p>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id} className="group transition-colors hover:bg-gray-50/50">
                  {/* 1. 번호 */}
                  <td className="px-5 py-4 text-center">
                    <span className="font-mono text-[11px] font-bold text-gray-400">
                      {String(index + 1).padStart(3, '0')}
                    </span>
                  </td>

                  {/* 2. 상담 일시 (ISO 포맷 변환) */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <i className="ri-calendar-line text-[#5C8D5A]"></i>
                      <span className="font-mono text-[11px] font-black text-gray-700">
                        {new Date(item.occurredAt).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </span>
                    </div>
                  </td>

                  {/* 3. 분기 */}
                  <td className="px-5 py-4 text-center">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-black text-gray-500">
                      {item.quarter}분기
                    </span>
                  </td>

                  {/* 4. 상담 대상 (아이콘 분기) */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <i
                        className={clsx(
                          'text-[14px]',
                          item.targetType === 'recipient'
                            ? 'ri-user-smile-line text-[#5C8D5A]'
                            : 'ri-parent-line text-orange-400',
                        )}
                      ></i>
                      <span className="font-bold leading-none text-gray-700">
                        {item.targetType === 'recipient'
                          ? '수급자 본인'
                          : `${item.guardianName} (${item.guardianRelation})`}
                      </span>
                    </div>
                  </td>

                  {/* 5. 상담 구분 (카테고리) */}
                  <td className="px-5 py-4">
                    <span className="text-[12px] font-black tracking-tight text-gray-800">{item.categoryName}</span>
                  </td>

                  {/* 6. 상담 방법 */}
                  <td className="px-5 py-4 text-center">
                    <span className="rounded-sm border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-[#5C8D5A]">
                      {item.methodName}
                    </span>
                  </td>

                  {/* 7. 상담 직원 */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-[9px] font-black text-gray-400">
                        {item.staffName.charAt(0)}
                      </div>
                      <span className="text-[11px] font-bold text-gray-700">{item.staffName}</span>
                    </div>
                  </td>

                  {/* 8. 첨부 서류 */}
                  <td className="px-5 py-4 text-center">
                    {item.attachmentCount > 0 ? (
                      <div className="inline-flex items-center gap-1 text-[#5C8D5A]">
                        <i className="ri-attachment-2 font-bold"></i>
                        <span className="font-mono text-[10px] font-black underline decoration-dotted underline-offset-2">
                          {item.attachmentCount}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-200">-</span>
                    )}
                  </td>

                  {/* 9. 관리 버튼 */}
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => onViewDetail(item)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[10px] font-black text-gray-600 shadow-sm transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A] active:scale-95"
                    >
                      상세 보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
