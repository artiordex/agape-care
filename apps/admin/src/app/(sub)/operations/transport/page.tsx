'use client';

import { useMemo, useState } from 'react';

/* -------------------------------------------------
 * Type Definitions
 * ------------------------------------------------- */

// 교통편 정보 (차량/비용 중심)
interface Transport {
  id: string;
  date: string;
  type: '송영' | '외래' | '외출' | '기타';
  residentName: string;
  departure: string;
  destination: string;
  pickupTime: string;
  dropoffTime: string;
  vehicle: string;
  driver: string;
  fuelCost: number;
  taxiCost: number;
  otherCost: number;
  notes: string;
}

// 수급자 정보
interface Resident {
  id: number;
  name: string;
  gender: string;
  grade: string;
  admissionDate: string;
  room: string;
  birthDate: string;
  mainDiseases: string[];
  status: string;
}

// 외출/외박 상세 기록
interface OutingRecord {
  id: number;
  residentId: number;
  residentName: string;
  type: '외출' | '외박' | '병원외래';
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  expectedReturnDate: string;
  expectedReturnTime: string;
  destination: string;
  purpose: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  hospital?: string;
  notes: string;
  status: '진행중' | '복귀완료' | '복귀미처리';
  createdAt: string;
  createdBy: string;
}

/* -------------------------------------------------
 * Initial Data (Hardcoded)
 * ------------------------------------------------- */

const initialResidents: Resident[] = [
  {
    id: 1,
    name: '김영희',
    gender: '여',
    grade: '2등급',
    admissionDate: '2023-03-15',
    room: '101호',
    birthDate: '1945-03-10',
    mainDiseases: ['고혈압'],
    status: '입소',
  },
  {
    id: 2,
    name: '이철수',
    gender: '남',
    grade: '3등급',
    admissionDate: '2023-05-20',
    room: '102호',
    birthDate: '1942-07-22',
    mainDiseases: ['치매'],
    status: '입소',
  },
  {
    id: 3,
    name: '박순자',
    gender: '여',
    grade: '1등급',
    admissionDate: '2024-01-10',
    room: '103호',
    birthDate: '1940-11-05',
    mainDiseases: ['뇌졸중'],
    status: '입소',
  },
];

const initialOutingRecords: OutingRecord[] = [
  {
    id: 1,
    residentId: 1,
    residentName: '김영희',
    type: '외출',
    departureDate: '2024-01-15',
    departureTime: '10:00',
    returnDate: '2024-01-15',
    returnTime: '16:30',
    expectedReturnDate: '2024-01-15',
    expectedReturnTime: '16:00',
    destination: '자택',
    purpose: '가족 방문',
    guardianName: '김철수',
    guardianRelation: '아들',
    guardianPhone: '010-1234-5678',
    status: '복귀완료',
    createdAt: '2024-01-15 09:30',
    createdBy: '박요양사',
  },
  {
    id: 2,
    residentId: 2,
    residentName: '이철수',
    type: '병원외래',
    departureDate: '2024-01-16',
    departureTime: '09:00',
    returnDate: '',
    returnTime: '',
    expectedReturnDate: '2024-01-16',
    expectedReturnTime: '14:00',
    destination: '병원',
    purpose: '정기 진료',
    guardianName: '이영희',
    guardianRelation: '배우자',
    guardianPhone: '010-2345-6789',
    hospital: '서울대학교병원',
    notes: '공복 유지',
    status: '복귀미처리',
    createdAt: '2024-01-16 08:30',
    createdBy: '김간호사',
  },
];

const initialTransports: Transport[] = [
  {
    id: 'T001',
    date: '2024-01-15',
    type: '외래',
    residentName: '김영희',
    departure: '센터',
    destination: '○○병원',
    pickupTime: '09:00',
    dropoffTime: '11:30',
    vehicle: '12가3456',
    driver: '김운전',
    fuelCost: 15000,
    taxiCost: 0,
    otherCost: 3000,
    notes: '정형외과',
  },
  {
    id: 'T002',
    date: '2024-01-16',
    type: '외출',
    residentName: '이철수',
    departure: '센터',
    destination: '서울대병원',
    pickupTime: '08:30',
    dropoffTime: '15:00',
    vehicle: '택시',
    driver: '-',
    fuelCost: 0,
    taxiCost: 25000,
    otherCost: 0,
    notes: '정기진료',
  },
];

/* -------------------------------------------------
 * Main Component
 * ------------------------------------------------- */

export default function IntegratedTransportService() {
  const [activeTab, setActiveTab] = useState<'outing' | 'transport'>('outing');

  // --- Common State ---
  const [residents] = useState<Resident[]>(initialResidents);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(residents[0]);

  // --- Outing Management State ---
  const [outingRecords, setOutingRecords] = useState<OutingRecord[]>(initialOutingRecords);
  const [showAddOutingModal, setShowAddOutingModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOuting, setSelectedOuting] = useState<OutingRecord | null>(null);

  // --- Transport Service State ---
  const [transports] = useState<Transport[]>(initialTransports);
  const [transportSearch, setTransportSearch] = useState('');
  const [transportTypeFilter, setTransportTypeFilter] = useState('all');

  /* -------------------------------------------------
   * Logic & Stats
   * ------------------------------------------------- */

  // 외출 통계
  const outingStats = useMemo(() => {
    return {
      ongoing: outingRecords.filter(r => r.status === '진행중' || r.status === '복귀미처리').length,
      unprocessed: outingRecords.filter(r => r.status === '복귀미처리').length,
    };
  }, [outingRecords]);

  // 교통 통계
  const transportStats = useMemo(() => {
    const totalCost = transports.reduce((sum, t) => sum + t.fuelCost + t.taxiCost + t.otherCost, 0);
    return { totalCount: transports.length, totalCost };
  }, [transports]);

  // Helper Colors
  const getRecordStatusColor = (status: string) => {
    if (status === '진행중') return 'bg-blue-100 text-blue-700';
    if (status === '복귀완료') return 'bg-green-100 text-green-700';
    return 'bg-red-100 text-red-700'; // 복귀미처리
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 1. 글로벌 헤더 */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-emerald-600 p-2 text-white">
            <i className="ri-bus-wifi-fill text-2xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">이동 및 외출 통합 관리</h1>
            <p className="text-xs text-gray-500">수급자 외출 관리와 센터 차량 이동 기록을 통합 관리합니다.</p>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex rounded-2xl bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('outing')}
            className={`rounded-xl px-6 py-2 text-sm font-bold transition-all ${
              activeTab === 'outing' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className="ri-walk-line mr-2"></i>외출·외박
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`rounded-xl px-6 py-2 text-sm font-bold transition-all ${
              activeTab === 'transport' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className="ri-bus-fill mr-2"></i>차량·교통편
          </button>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex flex-1 overflow-hidden">
        {activeTab === 'outing' ? (
          /* --- 외출·외박 관리 (마스터-디테일 레이아웃) --- */
          <div className="flex flex-1 overflow-hidden">
            {/* 왼쪽: 수급자 목록 */}
            <aside className="flex w-80 flex-col border-r border-gray-200 bg-white">
              <div className="border-b p-4">
                <input
                  type="text"
                  placeholder="이름 또는 방호실 검색..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto p-2">
                {residents.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedResident(r)}
                    className={`w-full rounded-2xl p-4 text-left transition-all ${
                      selectedResident?.id === r.id
                        ? 'border-emerald-100 bg-emerald-50 ring-1 ring-emerald-500/20'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <span className="font-bold text-gray-900">{r.name}</span>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                        {r.room}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {r.gender} · {r.birthDate} · {r.grade}
                    </p>
                  </button>
                ))}
              </div>
            </aside>

            {/* 오른쪽: 외출 기록 목록 */}
            <section className="flex-1 overflow-y-auto bg-gray-50/50 p-8">
              <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedResident?.name} 어르신 외출 이력</h2>
                    <p className="text-sm text-gray-400">최근 1년간의 외출 및 외박 데이터를 조회합니다.</p>
                  </div>
                  <button
                    onClick={() => setShowAddOutingModal(true)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700"
                  >
                    <i className="ri-add-line"></i> 신규 기록 작성
                  </button>
                </div>

                {/* 외출 요약 통계 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <i className="ri-run-line text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">현재 외출중</p>
                      <p className="text-xl font-black text-gray-900">{outingStats.ongoing}건</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                      <i className="ri-error-warning-line text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">복귀 미처리</p>
                      <p className="text-xl font-black text-red-600">{outingStats.unprocessed}건</p>
                    </div>
                  </div>
                </div>

                {/* 기록 테이블 */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-100 bg-gray-50 text-[11px] font-bold uppercase text-gray-400">
                      <tr>
                        <th className="px-6 py-4 text-left">구분</th>
                        <th className="px-6 py-4 text-left">출발일시</th>
                        <th className="px-6 py-4 text-left">복귀일시</th>
                        <th className="px-6 py-4 text-left">행선지</th>
                        <th className="px-6 py-4 text-center">상태</th>
                        <th className="px-6 py-4 text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {outingRecords
                        .filter(r => r.residentId === selectedResident?.id)
                        .map(record => (
                          <tr key={record.id} className="transition-colors hover:bg-gray-50/50">
                            <td className="px-6 py-4">
                              <span className="font-bold text-gray-700">{record.type}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {record.departureDate} <span className="text-[10px]">{record.departureTime}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {record.returnDate || record.expectedReturnDate}{' '}
                              <span className="text-[10px] opacity-60">예정</span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-800">{record.destination}</td>
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[10px] font-black ${getRecordStatusColor(record.status)}`}
                              >
                                {record.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex justify-center gap-2">
                                {record.status !== '복귀완료' && (
                                  <button
                                    onClick={() => {
                                      setSelectedOuting(record);
                                      setShowReturnModal(true);
                                    }}
                                    className="font-bold text-emerald-600 hover:underline"
                                  >
                                    복귀처리
                                  </button>
                                )}
                                <button className="text-gray-400 hover:text-blue-600">
                                  <i className="ri-more-2-fill"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* --- 차량·교통편 관리 (운영 중심 레이아웃) --- */
          <div className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto max-w-6xl space-y-6">
              {/* 교통 통계 카드 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <StatCard
                  title="총 이동 건수"
                  value={`${transportStats.totalCount}건`}
                  icon="ri-bus-line"
                  color="blue"
                />
                <StatCard
                  title="총 소요 비용"
                  value={`${(transportStats.totalCost / 10000).toFixed(0)}만원`}
                  icon="ri-money-dollar-circle-line"
                  color="emerald"
                />
                <StatCard title="평균 주유비" value="1.8만원" icon="ri-gas-station-line" color="orange" />
                <StatCard title="외부 택시 이용" value="2건" icon="ri-taxi-line" color="purple" />
              </div>

              {/* 필터 바 */}
              <div className="flex flex-col items-center gap-4 rounded-[2.5rem] border border-gray-200 bg-white p-6 shadow-sm md:flex-row">
                <div className="relative w-full flex-1">
                  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="수급자명, 목적지 검색..."
                    className="w-full rounded-2xl border-none bg-gray-50 py-3 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                    value={transportSearch}
                    onChange={e => setTransportSearch(e.target.value)}
                  />
                </div>
                <select
                  className="rounded-2xl border-none bg-gray-50 px-6 py-3 text-sm font-bold text-gray-600 outline-none"
                  value={transportTypeFilter}
                  onChange={e => setTransportTypeFilter(e.target.value)}
                >
                  <option value="all">전체 이동유형</option>
                  <option value="송영">송영</option>
                  <option value="외래">외래</option>
                  <option value="외출">외출</option>
                </select>
                <button className="rounded-2xl bg-gray-900 px-8 py-3 text-sm font-black text-white transition-all hover:bg-black">
                  기록 추가
                </button>
              </div>

              {/* 교통 상세 목록 */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-50 p-6">
                  <h3 className="font-bold text-gray-800">이동 서비스 상세 로그</h3>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-gray-50 p-2 text-gray-400 hover:text-emerald-600">
                      <i className="ri-printer-line"></i>
                    </button>
                    <button className="rounded-lg bg-gray-50 p-2 text-gray-400 hover:text-emerald-600">
                      <i className="ri-file-excel-2-line"></i>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/50 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      <tr>
                        <th className="px-6 py-4 text-left">일자/유형</th>
                        <th className="px-6 py-4 text-left">수급자</th>
                        <th className="px-6 py-4 text-left">출발/도착지</th>
                        <th className="px-6 py-4 text-left">차량/운전자</th>
                        <th className="px-6 py-4 text-right">비용 합계</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {transports.map(t => (
                        <tr key={t.id} className="transition-colors hover:bg-gray-50/50">
                          <td className="px-6 py-4">
                            <p className="font-bold text-gray-800">{t.date}</p>
                            <span className="text-[10px] font-black text-emerald-600">{t.type}</span>
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">{t.residentName}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{t.departure}</span>
                              <i className="ri-arrow-right-line opacity-30"></i>
                              <span className="font-medium text-gray-900">{t.destination}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-700">{t.vehicle}</p>
                            <p className="text-[10px] text-gray-400">{t.driver}</p>
                          </td>
                          <td className="px-6 py-4 text-right font-black text-emerald-600">
                            {(t.fuelCost + t.taxiCost + t.otherCost).toLocaleString()}원
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- 복귀 처리 모달 (통합용) --- */}
      {showReturnModal && selectedOuting && (
        <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
          <div className="w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
            <header className="border-b border-gray-50 bg-emerald-50/50 p-8">
              <h2 className="text-2xl font-black text-emerald-900">어르신 복귀 처리</h2>
              <p className="text-sm font-medium text-emerald-700/60">안전하게 복귀하셨는지 시간을 확인해 주세요.</p>
            </header>
            <div className="space-y-6 p-8">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-xs font-bold uppercase text-gray-400">대상자 / 출발정보</p>
                <p className="font-bold text-gray-800">{selectedOuting.residentName} 어르신</p>
                <p className="text-sm text-gray-500">
                  {selectedOuting.departureDate} {selectedOuting.departureTime} 출발
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="ml-1 text-xs font-black text-gray-400">복귀 일자</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="ml-1 text-xs font-black text-gray-400">복귀 시간</label>
                  <input
                    type="time"
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    defaultValue="16:00"
                  />
                </div>
              </div>
            </div>
            <footer className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-8">
              <button onClick={() => setShowReturnModal(false)} className="px-6 py-3 font-bold text-gray-400">
                취소
              </button>
              <button className="rounded-2xl bg-emerald-600 px-10 py-3 font-black text-white shadow-xl shadow-emerald-200">
                복귀 완료 저장
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------
 * Sub Components
 * ------------------------------------------------- */

function StatCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="flex items-center justify-between rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
      <div>
        <p className="mb-1 text-xs font-bold uppercase text-gray-400">{title}</p>
        <h4 className="text-2xl font-black text-gray-900">{value}</h4>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${colors[color]}`}>
        <i className={icon}></i>
      </div>
    </div>
  );
}
