'use client';

import React, { useState } from 'react';

// --- 데이터 타입 정의 ---
interface BeneficiaryStats {
  name: string;
  room: string;
  prescribed: number;
  completed: number;
  missed: number;
  rate: string;
  sideEffect: string;
}

export default function ReportMedicationPage() {
  // 1. 상태 관리
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('전체');
  const [medicationType, setMedicationType] = useState('전체');

  // 2. 핸들러
  const handleExport = (format: 'pdf' | 'excel') => {
    alert(`${format.toUpperCase()} 리포트를 생성 중입니다. 잠시만 기다려주세요.`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* --- 상단 헤더 및 필터 영역 --- */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <i className="ri-file-chart-line text-emerald-600"></i>
              투약제공 리포트
            </h2>
            <div className="flex gap-2">
              <ExportButton
                variant="red"
                icon="ri-file-pdf-line"
                label="PDF 다운로드"
                onClick={() => handleExport('pdf')}
              />
              <ExportButton
                variant="green"
                icon="ri-file-excel-line"
                label="엑셀 내보내기"
                onClick={() => handleExport('excel')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <FilterSelect label="기간 (시작)" type="date" value={dateFrom} onChange={setDateFrom} />
            <FilterSelect label="기간 (종료)" type="date" value={dateTo} onChange={setDateTo} />
            <FilterSelect
              label="수급자"
              value={selectedBeneficiary}
              onChange={setSelectedBeneficiary}
              options={['전체', '김영희', '이철수', '박순자', '최민수', '정미경']}
            />
            <FilterSelect
              label="약품 분류"
              value={medicationType}
              onChange={setMedicationType}
              options={['전체', '혈압약', '당뇨약', '진통제', '치매약', '기타']}
            />
          </div>
        </div>
      </header>

      {/* --- 메인 리포트 컨텐츠 --- */}
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-6">
        {/* 1. 핵심 지표 요약 (KPI Cards) */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="총 처방" value="156건" icon="ri-medicine-bottle-line" color="text-blue-500" />
          <StatsCard
            title="복용 완료"
            value="148건"
            icon="ri-check-double-line"
            color="text-emerald-500"
            subValue="94.9%"
          />
          <StatsCard title="미복용" value="8건" icon="ri-close-circle-line" color="text-red-500" />
          <StatsCard title="이상반응" value="2건" icon="ri-alert-line" color="text-orange-500" />
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 2. 수급자별 상세 현황 (왼쪽/중앙 2컬럼 차지) */}
          <section className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <h3 className="font-bold text-gray-800">수급자별 투약 현황</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-[11px] font-bold uppercase text-gray-500">
                    <tr>
                      <th className="px-6 py-3">수급자</th>
                      <th className="px-6 py-3">방호실</th>
                      <th className="px-6 py-3">처방/완료</th>
                      <th className="px-6 py-3">복용률</th>
                      <th className="px-6 py-3">이상반응</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <TableRow name="김영희" room="101호" total={30} done={30} sideEffect="없음" />
                    <TableRow name="이철수" room="102호" total={42} done={38} sideEffect="1건" isWarning />
                    <TableRow name="박순자" room="103호" total={28} done={27} sideEffect="없음" />
                    <TableRow name="최민수" room="201호" total={35} done={33} sideEffect="없음" />
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. 약품별 통계 */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="font-bold text-gray-800">주요 약품별 통계</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-[11px] font-bold text-gray-500">
                    <tr>
                      <th className="px-6 py-3 text-left">약품명</th>
                      <th className="px-6 py-3">분류</th>
                      <th className="px-6 py-3 text-center">복용률</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <MedicationRow name="아스피린 100mg" type="혈압약" rate={100} />
                    <MedicationRow name="메트포르민 500mg" type="당뇨약" rate={93.3} />
                    <MedicationRow name="아리셉트 5mg" type="치매약" rate={96.7} />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. 우측 사이드바 (분석 정보) */}
          <section className="space-y-6">
            {/* 미복용 사유 분석 */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-800">
                <i className="ri-pie-chart-line text-blue-500"></i>
                미복용 사유 분석
              </h3>
              <div className="space-y-3">
                <ReasonItem label="거부" count={4} total={8} color="bg-red-500" />
                <ReasonItem label="구토/오심" count={2} total={8} color="bg-orange-500" />
                <ReasonItem label="수면중" count={1} total={8} color="bg-blue-400" />
                <ReasonItem label="기타" count={1} total={8} color="bg-gray-400" />
              </div>
            </div>

            {/* 이상반응 기록 리스트 */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-800">최근 이상반응 기록</h3>
              <div className="space-y-4">
                <AlertItem date="2024-01-13" patient="정미경 (202호)" drug="아리셉트" desc="투약 30분 뒤 구토 발생" />
                <AlertItem
                  date="2024-01-12"
                  patient="이철수 (102호)"
                  drug="이부프로펜"
                  desc="피부 발진으로 약물 중단"
                />
              </div>
            </div>

            {/* 시간대별 현황 */}
            <div className="rounded-xl bg-emerald-900 p-5 text-white shadow-sm">
              <h3 className="mb-4 font-bold opacity-90">시간대별 평균 복용률</h3>
              <div className="grid grid-cols-2 gap-3">
                <TimeStat label="아침" rate="96%" />
                <TimeStat label="점심" rate="94%" />
                <TimeStat label="저녁" rate="93%" />
                <TimeStat label="취침전" rate="95%" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// --- 내부 컴포넌트들 (UI 추상화) ---

const StatsCard = ({ title, value, icon, color, subValue }: any) => (
  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div>
      <p className="mb-1 text-sm font-medium text-gray-500">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
        {subValue && <span className="text-xs font-bold text-emerald-600">({subValue})</span>}
      </div>
    </div>
    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 ${color}`}>
      <i className={`${icon} text-2xl`}></i>
    </div>
  </div>
);

const FilterSelect = ({ label, type = 'select', value, onChange, options }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="ml-1 text-xs font-bold text-gray-500">{label}</label>
    {type === 'date' ? (
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
      />
    ) : (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    )}
  </div>
);

const ExportButton = ({ variant, icon, label, onClick }: any) => {
  const colors = variant === 'red' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700';
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${colors} flex items-center gap-2 rounded-lg text-sm font-bold text-white shadow-sm transition-colors`}
    >
      <i className={icon}></i> {label}
    </button>
  );
};

const TableRow = ({ name, room, total, done, sideEffect, isWarning }: any) => (
  <tr className="transition-colors hover:bg-gray-50">
    <td className="px-6 py-4 font-bold text-gray-900">{name}</td>
    <td className="px-6 py-4 text-gray-500">{room}</td>
    <td className="px-6 py-4 text-gray-600">
      {total}건 / <span className="font-medium text-emerald-600">{done}건</span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="h-1.5 max-w-[60px] flex-1 rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(done / total) * 100}%` }}></div>
        </div>
        <span className="text-xs font-bold">{Math.round((done / total) * 100)}%</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <span
        className={`rounded-full px-2 py-1 text-[11px] font-bold ${isWarning ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}
      >
        {sideEffect}
      </span>
    </td>
  </tr>
);

const MedicationRow = ({ name, type, rate }: any) => (
  <tr>
    <td className="px-6 py-4 font-medium text-gray-800">{name}</td>
    <td className="px-6 py-4 text-xs text-gray-500">{type}</td>
    <td className="px-6 py-4 text-center font-bold text-emerald-600">{rate}%</td>
  </tr>
);

const ReasonItem = ({ label, count, total, color }: any) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-bold text-gray-600">
      <span>{label}</span>
      <span>{count}건</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
      <div className={`h-full ${color}`} style={{ width: `${(count / total) * 100}%` }}></div>
    </div>
  </div>
);

const AlertItem = ({ date, patient, drug, desc }: any) => (
  <div className="rounded-lg border border-orange-100 bg-orange-50 p-3">
    <div className="mb-1 flex items-center justify-between">
      <span className="text-[10px] font-bold uppercase tracking-tight text-orange-600">{date}</span>
      <i className="ri-error-warning-fill text-xs text-orange-500"></i>
    </div>
    <p className="mb-1 text-xs font-bold text-gray-800">
      {patient} - {drug}
    </p>
    <p className="text-[11px] leading-tight text-gray-600">{desc}</p>
  </div>
);

const TimeStat = ({ label, rate }: any) => (
  <div className="rounded-lg border border-white/10 bg-white/10 p-3">
    <p className="mb-1 text-[10px] font-bold uppercase opacity-70">{label}</p>
    <p className="text-lg font-bold">{rate}</p>
  </div>
);
