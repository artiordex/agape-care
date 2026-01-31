'use client';

import React from 'react';
import clsx from 'clsx';

interface MedicationRecord {
  id: string;
  scheduleId: string;
  residentName: string;
  medicationName: string;
  date: string;
  timing: string;
  administered: boolean;
  administeredBy: string;
  administeredTime: string;
  notes: string;
}

interface Props {
  readonly records: MedicationRecord[];
  readonly selectedDate: string;
  readonly onDateChange: (date: string) => void;
}

/**
 * [Component] 일자별 투약 수행 결과 및 감사(Audit) 기록 테이블
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 ERP 타임라인 스타일 적용
 */
export default function MedicationRecordTable({ records, selectedDate, onDateChange }: Props) {
  // 선택된 날짜의 기록 필터링
  const filteredRecords = records.filter(r => r.date === selectedDate);

  // 수행 통계 계산
  const administered = filteredRecords.filter(r => r.administered).length;
  const missed = filteredRecords.filter(r => !r.administered).length;

  return (
    <div className="font-sans antialiased">
      {/* 1. 이력 조회 헤더 및 요약 배지 */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
            <label className="font-sans text-[10px] font-black uppercase italic tracking-widest text-gray-400">
              Audit Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => onDateChange(e.target.value)}
              className="bg-transparent font-mono text-[13px] font-black text-gray-800 outline-none"
            />
          </div>
        </div>

        {filteredRecords.length > 0 && (
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[11px] font-black text-[#5C8D5A] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5C8D5A]"></span>
              완료: {administered}회
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-1.5 text-[11px] font-black text-red-600 shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600"></span>
              미투약: {missed}회
            </div>
          </div>
        )}
      </div>

      {/* 2. 투약 이력 피드 */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
            <i className="ri-history-line mb-3 text-5xl text-gray-200"></i>
            <p className="text-[13px] font-black uppercase tracking-widest text-gray-400">
              해당 날짜의 투약 수행 기록이 존재하지 않습니다
            </p>
          </div>
        ) : (
          filteredRecords.map(record => (
            <div
              key={record.id}
              className={clsx(
                'group relative overflow-hidden rounded-2xl border p-4 transition-all hover:shadow-md',
                record.administered ? 'border-emerald-100 bg-white' : 'border-red-100 bg-red-50/30',
              )}
            >
              <div className="flex items-start gap-4">
                {/* 상태 인디케이터 아이콘 */}
                <div
                  className={clsx(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 shadow-sm transition-transform group-hover:scale-105',
                    record.administered
                      ? 'border-emerald-100 bg-emerald-50 text-[#5C8D5A]'
                      : 'border-red-100 bg-red-50 text-red-500',
                  )}
                >
                  <i
                    className={clsx(
                      'text-2xl font-black',
                      record.administered ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill',
                    )}
                  ></i>
                </div>

                {/* 기록 상세 내용 */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-black tracking-tight text-gray-900">{record.residentName}</h3>
                      <span
                        className={clsx(
                          'rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter',
                          record.administered ? 'bg-emerald-100 text-[#5C8D5A]' : 'bg-red-100 text-red-600',
                        )}
                      >
                        {record.administered ? '투약 완료 (Administered)' : '미수행 (Missed)'}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-black italic text-gray-300">{record.date}</span>
                  </div>

                  <p className="mt-1.5 text-[13px] font-bold text-gray-600">
                    <span className="text-[#5C8D5A]">{record.medicationName}</span>
                    <span className="mx-2 text-gray-300">/</span>
                    <span className="text-gray-400">{record.timing}</span>
                  </p>

                  {/* 실행자 정보 및 타임스탬프 */}
                  <div className="mt-3 flex items-center gap-4 border-t border-gray-50 pt-3">
                    {record.administered ? (
                      <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <i className="ri-user-follow-line text-[#5C8D5A]"></i>
                          실행자: <span className="text-gray-700">{record.administeredBy}</span>
                        </span>
                        <span className="h-2.5 w-[1px] bg-gray-200"></span>
                        <span className="flex items-center gap-1.5 font-mono">
                          <i className="ri-time-line text-[#5C8D5A]"></i>
                          시간: <span className="text-gray-700">{record.administeredTime}</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-tighter text-red-500">
                        <i className="ri-error-warning-line"></i>
                        시스템 미수행 경보: 즉시 확인 요망
                      </div>
                    )}
                  </div>

                  {/* 관리 메모 */}
                  {record.notes && (
                    <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-[11px] font-medium italic text-gray-500">
                      <i className="ri-message-3-line mr-1.5 text-[#5C8D5A]"></i>
                      {record.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* 데코레이션 배지 */}
              <div
                className={clsx(
                  'absolute -right-1 -top-1 h-3 w-3 rounded-full opacity-20',
                  record.administered ? 'bg-[#5C8D5A]' : 'bg-red-600',
                )}
              ></div>
            </div>
          ))
        )}
      </div>

      {/* 3. 하단 통합 요약 안내 */}
      {filteredRecords.length > 0 && (
        <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 text-center">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#5C8D5A]">
            <i className="ri-shield-check-line mr-2"></i>총 {filteredRecords.length}건의 투약 프로세스 검토 완료
            (수행율: {Math.round((administered / filteredRecords.length) * 100)}%)
          </p>
        </div>
      )}
    </div>
  );
}
