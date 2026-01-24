'use client';

import React, { useState, useMemo, useEffect } from 'react';

/* 타입 정의 및 Mock 데이터 */
interface VitalRecord {
  id: number;
  time: string;
  bp: string;
  pulse: number;
  temp: number;
  glucose: number;
  staff: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string[];
  status: '복용중' | '중단';
}

const BENEFICIARIES = [
  { id: 1, name: '김영희', age: 82, gender: '여', grade: '1등급', room: '101호', risk: '중위험' },
  { id: 2, name: '이철수', age: 78, gender: '남', grade: '2등급', room: '102호', risk: '고위험' },
  { id: 3, name: '박순자', age: 85, gender: '여', grade: '3등급', room: '103호', risk: '저위험' },
];

export default function IntegratedNursingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'record' | 'report'>('record');

  // 수급자 정보
  const user = useMemo(() => BENEFICIARIES.find(b => b.id === selectedId)!, [selectedId]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 1. 좌측 수급자 선택 사이드바 */}
      <aside className="flex w-80 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-6">
          <h2 className="mb-4 text-xl font-black text-gray-900">Nursing ERP</h2>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <i className="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {BENEFICIARIES.map(ben => (
            <button
              key={ben.id}
              onClick={() => setSelectedId(ben.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                selectedId === ben.id
                  ? 'border-emerald-500 bg-emerald-50 shadow-md ring-1 ring-emerald-500/20'
                  : 'border-gray-100 bg-white hover:border-emerald-200'
              }`}
            >
              <div className="mb-1 flex items-start justify-between">
                <span className="font-bold text-gray-900">{ben.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    ben.risk === '고위험' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {ben.risk}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {ben.room} · {ben.gender}({ben.age}) · {ben.grade}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* 상단 통합 헤더 */}
        <header className="z-10 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-600">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{user.name} 수급자 기록지</h1>
              <p className="text-xs font-medium text-gray-400">관리번호: #AG-00{user.id}024</p>
            </div>
          </div>

          <div className="flex rounded-2xl bg-gray-100 p-1.5">
            <TabBtn
              active={activeTab === 'record'}
              onClick={() => setActiveTab('record')}
              icon="ri-edit-box-line"
              label="기록 및 처치"
            />
            <TabBtn
              active={activeTab === 'report'}
              onClick={() => setActiveTab('report')}
              icon="ri-pie-chart-2-line"
              label="데이터 분석"
            />
          </div>
        </header>

        {/* 탭별 컨텐츠 레이아웃 */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30 p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {activeTab === 'record' ? (
              <>
                {/* 3대 핵심 입력 섹션 */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* 바이탈 사인 입력 (기존 기능 보완) */}
                  <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-gray-50 p-6">
                      <h3 className="flex items-center gap-2 font-bold text-gray-800">
                        <i className="ri-pulse-line text-emerald-500"></i> 바이탈 사인 측정
                      </h3>
                      <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                        + 측정추가
                      </button>
                    </div>
                    <div className="p-0">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50/50 text-[11px] font-bold uppercase text-gray-400">
                          <tr>
                            <th className="px-6 py-3 text-left">시간</th>
                            <th className="px-6 py-3 text-left">혈압</th>
                            <th className="px-6 py-3 text-left">맥박</th>
                            <th className="px-6 py-3 text-left">체온</th>
                            <th className="px-6 py-3 text-left">혈당</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          <VitalRow time="09:15" bp="120/80" pulse={72} temp={36.5} glucose={110} />
                          <VitalRow time="14:30" bp="135/85" pulse={78} temp={36.8} glucose={145} isWarning />
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 투약 즉시 체크 */}
                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-800">
                      <i className="ri-medicine-bottle-line text-blue-500"></i> 투약 제공 현황
                    </h3>
                    <div className="space-y-3">
                      <MedCheck label="아침 (09:00)" drugs="아스피린 외 2종" time="08:55" done />
                      <MedCheck label="점심 (13:00)" drugs="당뇨약 외 1종" time="13:05" done />
                      <MedCheck label="저녁 (18:00)" drugs="혈압약" />
                    </div>
                  </div>
                </div>

                {/* 간호일지 상세 작성 */}
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">종합 간호일지 및 관찰 기록</h3>
                    <div className="flex gap-2">
                      {['낙상위험', '욕창케어', '집중관찰'].map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold text-gray-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <textarea
                    className="min-h-[200px] w-full rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    placeholder="수급자의 건강 상태 변화, 식사량, 배설 상태, 처치 내용 등을 자유롭게 기록하세요."
                  ></textarea>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-gray-400">마지막 저장: {selectedDate} 15:20 (간호사 박진희)</p>
                    <button className="rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white transition-all hover:shadow-lg hover:shadow-emerald-200">
                      기록 저장 및 마감
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* 리포트 분석 뷰 (기존 리포트 기능들을 통합) */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <ReportCard title="기간 복용률" value="98.2%" sub="정상" color="emerald" />
                  <ReportCard title="평균 혈압" value="128/82" sub="안정" color="blue" />
                  <ReportCard title="낙상/사고" value="0건" sub="안전" color="gray" />
                  <ReportCard title="집중 케어" value="욕창 2단계" sub="호전중" color="orange" />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Braden Scale & 욕창 추이 */}
                  <div className="rounded-3xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center justify-between font-bold text-gray-800">
                      욕창 위험도 (Braden Scale)
                      <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                        최근 평가일: 01-15
                      </span>
                    </h3>
                    <div className="flex h-48 items-end justify-around border-b border-gray-100 pb-4">
                      {[60, 45, 80, 55, 90].map((h, i) => (
                        <div
                          key={i}
                          className="w-8 cursor-pointer rounded-t-lg bg-blue-500 transition-all hover:bg-emerald-500"
                          style={{ height: `${h}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between text-[10px] font-bold text-gray-400">
                      <span>01-11</span>
                      <span>01-12</span>
                      <span>01-13</span>
                      <span>01-14</span>
                      <span>01-15</span>
                    </div>
                  </div>

                  {/* 바이탈 분석 프로그레스 */}
                  <div className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-2 font-bold text-gray-800">항목별 건강 지표 지수</h3>
                    <AnalyticBar label="바이탈 안정성" percent={92} color="bg-emerald-500" />
                    <AnalyticBar label="투약 이행력" percent={100} color="bg-blue-500" />
                    <AnalyticBar label="영양 섭취량" percent={75} color="bg-orange-500" />
                  </div>
                </div>

                {/* 리포트 다운로드 섹션 */}
                <div className="relative flex items-center justify-between overflow-hidden rounded-3xl bg-emerald-900 p-8 text-white">
                  <div className="z-10">
                    <h2 className="mb-2 text-xl font-bold">통합 간호 분석 보고서 출력</h2>
                    <p className="text-sm text-emerald-200 opacity-80">
                      선택한 기간 동안의 모든 간호 데이터를 하나의 PDF로 생성합니다.
                    </p>
                  </div>
                  <button className="z-10 rounded-xl bg-white px-6 py-3 font-black text-emerald-900 transition-transform hover:scale-105">
                    PDF 리포트 생성
                  </button>
                  <i className="ri-file-chart-fill absolute bottom-[-40px] right-[-20px] text-[180px] opacity-10"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* -----------------------------
    추출된 서브 컴포넌트
----------------------------- */

function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all ${
        active ? 'bg-white text-emerald-600 shadow-md' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <i className={icon}></i> {label}
    </button>
  );
}

function VitalRow({ time, bp, pulse, temp, glucose, isWarning }: any) {
  return (
    <tr className={`transition-colors hover:bg-gray-50/50 ${isWarning ? 'bg-red-50/30' : ''}`}>
      <td className="px-6 py-4 font-medium text-gray-500">{time}</td>
      <td className={`px-6 py-4 font-bold ${isWarning ? 'text-red-600' : 'text-gray-900'}`}>{bp}</td>
      <td className="px-6 py-4 text-gray-700">{pulse}회</td>
      <td className="px-6 py-4 font-medium text-gray-700">{temp}°C</td>
      <td className={`px-6 py-4 font-bold ${isWarning ? 'text-orange-600' : 'text-gray-900'}`}>{glucose}</td>
    </tr>
  );
}

function MedCheck({ label, drugs, time, done }: any) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-all ${done ? 'border-emerald-100 bg-emerald-50' : 'border-gray-100 bg-gray-50 opacity-60'}`}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500">{label}</span>
        {done && (
          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-600">
            {time} 완료
          </span>
        )}
      </div>
      <p className={`text-sm font-bold ${done ? 'text-emerald-900' : 'text-gray-400'}`}>{drugs}</p>
    </div>
  );
}

function ReportCard({ title, value, sub, color }: any) {
  const colors: any = {
    emerald: 'text-emerald-600 bg-emerald-50',
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50',
    gray: 'text-gray-400 bg-gray-50',
  };
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      <p className="mb-3 text-xs font-bold text-gray-400">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-xl font-black text-gray-900">{value}</h4>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${colors[color]}`}>{sub}</span>
      </div>
    </div>
  );
}

function AnalyticBar({ label, percent, color }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-900">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
