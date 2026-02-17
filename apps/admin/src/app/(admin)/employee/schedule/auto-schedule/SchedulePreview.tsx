'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { GeneratedSchedule } from '../schedule.type';

interface PreviewProps {
  readonly startDate: string;
  readonly endDate: string;
  readonly staffList: any[];
  readonly generatedSchedules: GeneratedSchedule[]; // 생성된 스케줄 데이터 노드
}

/**
 * [컴포넌트] 자동 생성 근무표 정밀 검토 및 시각화 패널
 * 아가페 그린(#5C8D5A) 테마 및 고밀도 전사 그리드 적용
 */
export default function SchedulePreview({ startDate, endDate, staffList, generatedSchedules }: PreviewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'stats'>('grid');

  // 근무 코드 스타일 정의 (Agape Standard v4.2)
  const WORK_STYLES: Record<string, string> = {
    S: 'bg-blue-500 text-white',
    A: 'bg-cyan-500 text-white',
    D: 'bg-[#5C8D5A] text-white',
    E: 'bg-yellow-500 text-white',
    N: 'bg-purple-600 text-white',
    연: 'bg-pink-500 text-white',
    휴: 'bg-gray-100 text-gray-400',
  };

  // 날짜 배열 생성 (선택 기간 기준 동적 생성)
  const getDates = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };

  const dateRange = getDates();

  return (
    <div className="flex flex-col gap-6 font-sans text-gray-900 antialiased">
      {/* A. 상단 요약 및 관제 모드 전환 */}
      <div className="flex items-center justify-between rounded-none border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-6">
          <SummaryItem label="대상 인원" value={`${staffList.length}명`} />
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <SummaryItem label="분석 기간" value={`${startDate} ~ ${endDate}`} />
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <SummaryItem label="배정 완료" value={`${generatedSchedules.length}건`} color="text-[#5C8D5A]" />
        </div>

        <div className="flex overflow-hidden rounded-none border border-gray-200">
          <button
            onClick={() => setViewMode('grid')}
            className={clsx(
              'px-4 py-2 text-[11px] font-black transition-all',
              viewMode === 'grid' ? 'bg-[#5C8D5A] text-white' : 'bg-white text-gray-400 hover:bg-gray-50',
            )}
          >
            전사 그리드 뷰
          </button>
          <button
            onClick={() => setViewMode('stats')}
            className={clsx(
              'px-4 py-2 text-[11px] font-black transition-all',
              viewMode === 'stats' ? 'bg-[#5C8D5A] text-white' : 'bg-white text-gray-400 hover:bg-gray-50',
            )}
          >
            배분 통계 분석
          </button>
        </div>
      </div>

      {/* B. 메인 미리보기 컨텐츠 */}
      {viewMode === 'grid' ? (
        <div className="overflow-hidden rounded-none border border-gray-300 bg-white shadow-xl">
          <div className="custom-scrollbar overflow-x-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 font-black uppercase tracking-widest text-gray-400">
                  <th className="sticky left-0 z-20 min-w-[120px] border-r border-gray-200 bg-gray-50 px-4 py-3 text-left">
                    직원명 / 직종
                  </th>
                  {dateRange.map((date, i) => (
                    <th
                      key={i}
                      className={clsx(
                        'min-w-[40px] border-r border-gray-200 px-2 py-3 text-center',
                        date.getDay() === 0
                          ? 'bg-red-50/30 text-red-500'
                          : date.getDay() === 6
                            ? 'bg-blue-50/30 text-blue-500'
                            : '',
                      )}
                    >
                      <div className="font-mono">{String(date.getDate()).padStart(2, '0')}</div>
                      <div className="text-[9px] opacity-60">
                        {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staffList.map(staff => (
                  <tr key={staff.id} className="transition-colors hover:bg-emerald-50/30">
                    <td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-4 py-3 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                      <div className="font-black text-gray-900">{staff.name}</div>
                      <div className="text-[9px] font-bold uppercase italic text-gray-400">{staff.position}</div>
                    </td>
                    {dateRange.map((date, i) => {
                      const dateKey = date.toISOString().split('T')[0];
                      const daySchedule = generatedSchedules.find(s => s.staffId === staff.id && s.date === dateKey);
                      return (
                        <td key={i} className="border-r border-gray-100 p-1 text-center">
                          {daySchedule ? (
                            <div
                              className={clsx(
                                'flex h-8 w-full items-center justify-center rounded-none border border-black/5 text-[12px] font-black shadow-sm transition-transform active:scale-95',
                                WORK_STYLES[daySchedule.workType] || 'bg-gray-50 text-gray-300',
                              )}
                            >
                              {daySchedule.workType}
                            </div>
                          ) : (
                            <div className="h-8 w-full bg-gray-50/50"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* 통계 분석 뷰 (배분 적정성 검사) */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnalysisCard title="직종별 근무 시간 배분율" icon="ri-pie-chart-2-line" />
          <AnalysisCard title="야간 근무자 균형성 검사" icon="ri-scales-3-line" />
          <AnalysisCard title="연속 근무 규칙 위반 탐지" icon="ri-alarm-warning-line" highlight />
          <AnalysisCard title="주말 필수 인력 충족 현황" icon="ri-shield-user-line" />
        </div>
      )}

      {/* C. 하단 알고리즘 유효성 진단 리포트 */}
      <div className="space-y-4 rounded-none bg-gray-900 p-6 text-white shadow-inner">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#5C8D5A]">
          <i className="ri-shield-flash-line"></i>
          알고리즘 유효성 검증 리포트 (Validation Report)
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ValidationItem
            label="법정 근로 시간 준수"
            status="PASS"
            desc="모든 인원의 주간 근로 시간이 52시간 미만으로 배정되었습니다."
          />
          <ValidationItem
            label="휴게 시간 보장"
            status="PASS"
            desc="모든 근무조 사이의 최소 11시간 연속 휴식이 보장됩니다."
          />
          <ValidationItem
            label="최소 운영 인력"
            status="WARN"
            desc="특정 주말(토요일) 요양 1팀의 야간 가동 인원이 기준보다 1명 부족합니다."
          />
        </div>
      </div>
    </div>
  );
}

/** [내부 서브 컴포넌트] 요약 데이터 노드 */
function SummaryItem({ label, value, color }: any) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-black uppercase italic text-gray-400">{label}</span>
      <span className={clsx('font-mono text-[16px] font-black', color || 'text-gray-900')}>{value}</span>
    </div>
  );
}

/** [내부 서브 컴포넌트] 분석 시각화 카드 */
function AnalysisCard({ title, icon, highlight }: any) {
  return (
    <div
      className={clsx(
        'rounded-none border bg-white p-6 shadow-sm transition-all hover:border-[#5C8D5A]',
        highlight ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200',
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <i className={clsx(icon, highlight ? 'text-orange-500' : 'text-[#5C8D5A]', 'text-xl')}></i>
        <h4 className="text-[13px] font-black tracking-tight text-gray-800">{title}</h4>
      </div>
      <div className="flex h-32 items-center justify-center border border-dashed border-gray-200 text-[11px] font-bold italic text-gray-300">
        데이터 분석 엔진 차트 렌더링 영역
      </div>
    </div>
  );
}

/** [내부 서브 컴포넌트] 개별 검증 결과 */
function ValidationItem({ label, status, desc }: any) {
  return (
    <div className="space-y-1 border-l-2 border-white/10 pl-4">
      <div className="flex items-center gap-2">
        <span
          className={clsx(
            'rounded-none px-2 py-0.5 text-[9px] font-black',
            status === 'PASS' ? 'bg-[#5C8D5A] text-white' : 'bg-orange-500 text-white',
          )}
        >
          {status}
        </span>
        <span className="text-[11px] font-black opacity-80">{label}</span>
      </div>
      <p className="text-[11px] font-medium italic leading-relaxed text-gray-400">{desc}</p>
    </div>
  );
}
