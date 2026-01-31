'use client';

import React from 'react';

interface Props {
  data: any; // monthlyPayrollResults의 단일 객체
  onClose: () => void;
  onDownloadPdf: (data: any) => void;
}

/**
 * [Document Style] 정식 급여명세서 출력 모달
 * 고밀도 그리드 및 회계 서식 레이아웃 적용
 */
export default function PayslipModal({ data, onClose, onDownloadPdf }: Props) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 text-[11px] backdrop-blur-[1px]">
      <div className="animate-in fade-in zoom-in flex w-full max-w-2xl flex-col border border-gray-400 bg-white shadow-2xl duration-200">
        {/* 1. 모달 헤더 - 타이틀 바 */}
        <div className="flex items-center justify-between bg-[#1a5a96] px-4 py-2.5 text-white">
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <i className="ri-file-paper-2-line"></i>
            임금명세서 확인 및 출력
          </h3>
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-white/20">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 2. 명세서 본문 - 문서 양식 */}
        <div className="max-h-[85vh] overflow-y-auto bg-white p-8 print:p-0">
          <div className="space-y-6 border border-gray-800 p-6">
            {/* 명세서 타이틀 */}
            <div className="space-y-1 text-center">
              <h1 className="inline-block border-b-2 border-gray-800 px-10 pb-2 text-2xl font-black tracking-[0.5em] text-gray-900">
                임금명세서
              </h1>
              <p className="font-bold text-gray-500">{data.month} 귀속</p>
            </div>

            {/* 인적 사항 테이블 */}
            <table className="w-full border-collapse border border-gray-800">
              <tbody>
                <tr className="border-b border-gray-800">
                  <th className="w-24 border-r border-gray-800 bg-gray-100 p-2">성 명</th>
                  <td className="border-r border-gray-800 p-2 font-black">{data.employeeName}</td>
                  <th className="w-24 border-r border-gray-800 bg-gray-100 p-2">직 종</th>
                  <td className="p-2">{data.position}</td>
                </tr>
                <tr>
                  <th className="border-r border-gray-800 bg-gray-100 p-2">사 번</th>
                  <td className="border-r border-gray-800 p-2 font-mono">{data.employeeId}</td>
                  <th className="border-r border-gray-800 bg-gray-100 p-2">지급일</th>
                  <td className="p-2">2026-01-30</td>
                </tr>
              </tbody>
            </table>

            {/* 지급/공제 상세 내역 (2컬럼 그리드) */}
            <div className="grid grid-cols-2 gap-0 border border-gray-800">
              {/* 지급 내역 (왼쪽) */}
              <div className="flex flex-col border-r border-gray-800">
                <div className="border-b border-gray-800 bg-blue-50/50 p-1.5 text-center font-black text-blue-800">
                  지급 항목 (Earnings)
                </div>
                <div className="flex-1 divide-y divide-gray-200">
                  <DetailRow label="기본급" value={data.basePay} />
                  <DetailRow label="연장수당" value={data.overtimePay} />
                  <DetailRow label="야간수당" value={data.nightPay} />
                  <DetailRow label="휴일수당" value={data.holidayPay} />
                  <DetailRow label="주휴수당" value={data.weeklyAllowance} />
                  <DetailRow label="식대 (비과세)" value={data.mealAllowance} />
                  <DetailRow label="차량유지비 (비과세)" value={data.transportAllowance} />
                  <DetailRow label="직책수당" value={data.positionAllowance} />
                  <DetailRow label="위험수당" value={data.riskAllowance} />
                  <DetailRow label="근속수당" value={data.longevityAllowance} />
                </div>
                <div className="flex items-center justify-between border-t border-gray-800 bg-blue-50 p-2 font-black text-blue-900">
                  <span>지급액 합계</span>
                  <span className="font-mono">{data.totalPay.toLocaleString()}</span>
                </div>
              </div>

              {/* 공제 내역 (오른쪽) */}
              <div className="flex flex-col">
                <div className="border-b border-gray-800 bg-red-50/50 p-1.5 text-center font-black text-red-800">
                  공제 항목 (Deductions)
                </div>
                <div className="flex-1 divide-y divide-gray-200">
                  <DetailRow label="국민연금" value={data.pension} />
                  <DetailRow label="건강보험" value={data.health} />
                  <DetailRow label="장기요양보험" value={data.longTermCare} />
                  <DetailRow label="고용보험" value={data.employ} />
                  <DetailRow label="소득세" value={data.incomeTax} />
                  <DetailRow label="지방소득세" value={data.localTax} />
                  <div className="min-h-[140px] p-2 text-[10px] italic text-gray-300">기타 공제 내역 없음</div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-800 bg-red-50 p-2 font-black text-red-900">
                  <span>공제액 합계</span>
                  <span className="font-mono">{data.totalDeduction.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 최종 실지급액 (Net Pay Focus) */}
            <div className="flex items-center justify-between border-2 border-gray-800 bg-emerald-50/50 p-4">
              <div>
                <p className="text-[13px] font-black text-gray-900">실지급액 (NET PAY)</p>
                <p className="text-[10px] font-bold uppercase italic tracking-wider text-gray-500">
                  The amount actually paid into the account
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-3xl font-black text-emerald-700">{data.netPay.toLocaleString()}</span>
                <span className="ml-1 text-sm font-bold text-gray-400">원</span>
              </div>
            </div>

            {/* 푸터 및 직인 */}
            <div className="flex items-end justify-between pt-4">
              <div className="space-y-1 text-[10px] text-gray-500">
                <p>※ 귀하의 노고에 감사드립니다.</p>
                <p>※ 위 급여는 지정된 본인 명의 계좌로 입금되었습니다.</p>
                <p className="font-bold">2026년 01월 30일</p>
              </div>
              <div className="relative pr-12">
                <h2 className="text-lg font-black tracking-tighter text-gray-800">Agape-Care 요양센터</h2>
                <div className="absolute -right-2 -top-4 flex h-16 w-16 rotate-12 items-center justify-center rounded-full border-4 border-red-500/30 text-[12px] font-black text-red-500/40">
                  (인)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 모달 푸터 - 액션 버튼 */}
        <div className="flex justify-center gap-1.5 border-t border-gray-300 bg-gray-100 px-4 py-4">
          <button
            onClick={() => onDownloadPdf(data)}
            className="flex items-center gap-2 bg-[#1a5a96] px-10 py-2 text-[11px] font-bold text-white shadow-md transition-all hover:bg-[#144675] active:scale-95"
          >
            <i className="ri-printer-line"></i>
            명세서 PDF 출력
          </button>
          <button
            onClick={onClose}
            className="border border-gray-400 bg-white px-10 py-2 text-[11px] font-bold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );
}

/** 내부 컴포넌트: 명세서 상세 행 */
function DetailRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="group flex items-center justify-between bg-white p-2 hover:bg-gray-50">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="font-mono text-gray-900">{value > 0 ? value.toLocaleString() : '-'}</span>
    </div>
  );
}
