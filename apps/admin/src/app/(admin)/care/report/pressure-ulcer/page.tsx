'use client';

import React, { useState } from 'react';

// 인터페이스 정의
interface RiskTrend {
  id: string;
  name: string;
  room: string;
  prevRisk: '저위험' | '중위험' | '고위험';
  currRisk: '저위험' | '중위험' | '고위험';
  bradenScore: number;
  change: '호전' | '유지' | '악화';
  lastEvalDate: string;
}

export default function ReportPressureUlcerPage() {
  // 상태 관리
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('전체');

  // 핸들러
  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`${format.toUpperCase()} 리포트를 생성 중입니다.`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* --- 상단 헤더 및 필터 바 --- */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white p-6 shadow-sm">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <span className="rounded-lg bg-emerald-100 p-2">
                <i className="ri-rest-time-line text-emerald-600"></i>
              </span>
              욕창간호 제공 리포트
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
              >
                <i className="ri-file-pdf-line"></i> PDF 저장
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-shadow hover:bg-green-700"
              >
                <i className="ri-file-excel-line"></i> 엑셀 다운로드
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FilterBox label="조회 시작일" type="date" value={dateFrom} onChange={setDateFrom} />
            <FilterBox label="조회 종료일" type="date" value={dateTo} onChange={setDateTo} />
            <FilterBox
              label="수급자 선택"
              type="select"
              value={selectedBeneficiary}
              onChange={setSelectedBeneficiary}
              options={['전체', '김영희', '이철수', '박순자', '최민수']}
            />
          </div>
        </div>
      </header>

      {/* 메인 리포트 컨텐츠 */}
      <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
        {/* 핵심 요약 지표 (KPI Cards) */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard title="위험군 수급자" value="4명" icon="ri-user-search-line" color="blue" />
          <SummaryCard title="신규 욕창 발생" value="2건" icon="ri-error-warning-fill" color="red" />
          <SummaryCard title="증상 호전" value="1건" icon="ri-arrow-up-circle-line" color="emerald" />
          <SummaryCard title="악화/정체" value="0건" icon="ri-arrow-down-circle-line" color="gray" />
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 위험군 추이 및 욕창 경과 (왼쪽 2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Braden Scale 위험군 추이 테이블 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <h3 className="font-bold text-gray-800">Braden 점수 기반 위험군 추이</h3>
                <span className="text-xs font-medium text-gray-400">*18점 이하 주의 / 12점 이하 고위험</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <tr>
                      <th className="px-6 py-3 text-left">수급자/방호실</th>
                      <th className="px-6 py-3">이전</th>
                      <th className="px-6 py-3">현재</th>
                      <th className="px-6 py-3 text-center">점수</th>
                      <th className="px-6 py-3">상태 변화</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <TrendRow name="김영희" room="101호" prev="중위험" curr="저위험" score={16} status="호전" />
                    <TrendRow name="이철수" room="102호" prev="고위험" curr="고위험" score={10} status="유지" />
                    <TrendRow name="최민수" room="201호" prev="중위험" curr="고위험" score={11} status="악화" />
                  </tbody>
                </table>
              </div>
            </div>

            {/* 욕창 발생 및 처치 기록 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="font-bold text-gray-800">최근 욕창 처치 및 드레싱 기록</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-[11px] font-bold uppercase text-gray-400">
                    <tr>
                      <th className="px-6 py-3 text-left">일자</th>
                      <th className="px-6 py-3 text-left">수급자/부위</th>
                      <th className="px-6 py-3 text-left">처치 내용</th>
                      <th className="px-6 py-3">사용 재료</th>
                      <th className="px-6 py-3">담당자</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <DressingRow
                      date="01-15"
                      name="이철수"
                      part="천골부"
                      content="세척 및 드레싱 교체"
                      material="하이드로"
                      staff="박간호사"
                    />
                    <DressingRow
                      date="01-15"
                      name="최민수"
                      part="좌측 둔부"
                      content="괴사조직 제거 후 처치"
                      material="폼 드레싱"
                      staff="김간호사"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 우측 사이드바 (수행률 및 통계) */}
          <aside className="space-y-6">
            {/* 조치 항목 수행률 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 font-bold text-gray-800">
                <i className="ri-checkbox-circle-line text-emerald-500"></i>
                간호 조치 수행률
              </h3>
              <div className="space-y-5">
                <ProgressItem label="체위변경 (2시간 주기)" percent={95} color="bg-emerald-500" />
                <ProgressItem label="피부 관찰 (1일 2회)" percent={88} color="bg-blue-500" />
                <ProgressItem label="드레싱 교체" percent={100} color="bg-emerald-500" />
                <ProgressItem label="압력분산 매트리스 사용" percent={100} color="bg-emerald-500" />
                <ProgressItem label="영양 상태 모니터링" percent={92} color="bg-orange-500" />
              </div>
            </div>

            {/* 욕창 단계별 분포 가이드 */}
            <div className="rounded-2xl bg-gray-900 p-6 text-white">
              <h3 className="mb-4 font-bold opacity-90">욕창 단계별 현황</h3>
              <div className="space-y-3">
                <StageInfo label="1단계 (표면 발적)" count={0} />
                <StageInfo label="2단계 (수포/피부손상)" count={1} active />
                <StageInfo label="3단계 (심부조직)" count={1} active />
                <StageInfo label="4단계 (뼈/근육 노출)" count={0} />
              </div>
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-[10px] leading-relaxed text-gray-400">
                  *2단계 이상의 욕창은 매일 사진 촬영 및 전문의 협진 권장 항목입니다.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

const SummaryCard = ({ title, value, icon, color }: any) => {
  const colorMap: any = {
    blue: 'text-blue-600 bg-blue-50',
    red: 'text-red-600 bg-red-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    gray: 'text-gray-400 bg-gray-50',
  };
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <p className="mb-1 text-sm font-medium text-gray-500">{title}</p>
        <h4 className="text-2xl font-black text-gray-900">{value}</h4>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[color]}`}>
        <i className={`${icon} text-2xl`}></i>
      </div>
    </div>
  );
};

const FilterBox = ({ label, type, value, onChange, options }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="ml-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</label>
    {type === 'date' ? (
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500"
      />
    ) : (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
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

const TrendRow = ({ name, room, prev, curr, score, status }: any) => {
  const riskColor = (risk: string) => {
    if (risk === '고위험') return 'bg-red-100 text-red-700';
    if (risk === '중위험') return 'bg-orange-100 text-orange-700';
    return 'bg-emerald-100 text-emerald-700';
  };
  return (
    <tr className="transition-colors hover:bg-gray-50/50">
      <td className="px-6 py-4">
        <p className="font-bold text-gray-900">{name}</p>
        <p className="text-xs text-gray-400">{room}</p>
      </td>
      <td className="px-6 py-4">
        <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${riskColor(prev)}`}>{prev}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${riskColor(curr)}`}>{curr}</span>
      </td>
      <td className="px-6 py-4 text-center font-bold text-gray-700">{score}점</td>
      <td className="px-6 py-4">
        <div
          className={`flex items-center gap-1 text-xs font-bold ${
            status === '호전' ? 'text-emerald-600' : status === '악화' ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          <i
            className={
              status === '호전' ? 'ri-arrow-up-line' : status === '악화' ? 'ri-arrow-down-line' : 'ri-subtract-line'
            }
          ></i>
          {status}
        </div>
      </td>
    </tr>
  );
};

const DressingRow = ({ date, name, part, content, material, staff }: any) => (
  <tr className="text-xs transition-colors hover:bg-gray-50/50">
    <td className="px-6 py-4 font-medium text-gray-400">{date}</td>
    <td className="px-6 py-4">
      <p className="font-bold text-gray-800">{name}</p>
      <p className="font-medium text-emerald-600">{part}</p>
    </td>
    <td className="px-6 py-4 leading-relaxed text-gray-600">{content}</td>
    <td className="px-6 py-4 text-center">
      <span className="rounded bg-gray-100 px-2 py-1 text-gray-500">{material}</span>
    </td>
    <td className="px-6 py-4 font-medium text-gray-500">{staff}</td>
  </tr>
);

const ProgressItem = ({ label, percent, color }: any) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-xs font-bold">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900">{percent}%</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

const StageInfo = ({ label, count, active }: any) => (
  <div
    className={`flex items-center justify-between rounded-xl border p-3 ${active ? 'border-white/20 bg-white/10' : 'border-white/5 bg-transparent opacity-40'}`}
  >
    <span className="text-xs font-medium">{label}</span>
    <span className={`text-sm font-black ${active ? 'text-orange-400' : 'text-white'}`}>{count}건</span>
  </div>
);
