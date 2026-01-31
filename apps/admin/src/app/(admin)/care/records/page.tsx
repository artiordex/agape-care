'use client';

import { useMemo, useState } from 'react';
// 컴포넌트 임포트 (경로는 프로젝트 구조에 따라 조정하세요)
import HistoryActionBar from './HistoryActionBar';
import HistoryCardView from './HistoryCardView';
import HistoryDetailModal from './HistoryDetailModal';
import HistoryFilter from './HistoryFilter';
import HistoryStats from './HistoryStats';
import HistoryTableView from './HistoryTableView';

// 케어 기록 인터페이스 정의
interface CareRecord {
  id: string;
  date: string;
  beneficiaryName: string;
  room: string;
  type: string;
  status: string;
  author: string;
  summary: string;
}

export default function CareHistoryPage() {
  // --- [1] 상태 관리 (State) ---
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [selectedRecord, setSelectedRecord] = useState<CareRecord | null>(null);
  const [filters, setFilters] = useState({
    dateFrom: new Date().toISOString().split('T')[0], // 오늘 날짜 기본값
    dateTo: new Date().toISOString().split('T')[0],
    type: '전체',
    status: '전체',
    query: '',
  });

  // --- [2] 테스트용 가상 데이터 (Mock Data) ---
  // 실제 운영 환경에서는 useEffect 내에서 API(NestJS)를 호출하여 데이터를 가져옵니다.
  const records: CareRecord[] = [
    {
      id: '1',
      date: '2026-01-30',
      beneficiaryName: '김영희',
      room: '101호',
      type: '간호기록',
      status: '마감',
      author: '박간호사',
      summary: '혈압 120/80 정상 범위 내 유지 중. 호흡 안정적임.',
    },
    {
      id: '2',
      date: '2026-01-30',
      beneficiaryName: '이철수',
      room: '102호',
      type: '투약기록',
      status: '작성중',
      author: '김요양사',
      summary: '아침 투약(혈압약, 당뇨약) 완료. 식사량 양호함.',
    },
    {
      id: '3',
      date: '2026-01-29',
      beneficiaryName: '박순자',
      room: '201호',
      type: '욕창간호',
      status: '마감',
      author: '이간호사',
      summary: '천골 부위 드레싱 교체 실시. 발적 증상 완화 관찰됨.',
    },
    {
      id: '4',
      date: '2026-01-28',
      beneficiaryName: '최민수',
      room: '103호',
      type: '배설관리',
      status: '검토필요',
      author: '정요양사',
      summary: '야간 빈뇨 증상으로 수면 부족 호소. 수분 섭취 모니터링 필요.',
    },
    {
      id: '5',
      date: '2026-01-27',
      beneficiaryName: '강으뜸',
      room: '특실',
      type: '진료기록',
      status: '마감',
      author: '홍의사',
      summary: '외래 진료(내과) 결과 당뇨 수치 안정적. 현재 처방 유지 권고.',
    },
  ];

  // --- [3] 데이터 필터링 로직 (useMemo 성능 최적화) ---
  const filteredData = useMemo(() => {
    return records.filter(record => {
      const matchType = filters.type === '전체' || record.type === filters.type;
      const matchStatus = filters.status === '전체' || record.status === filters.status;
      const matchQuery = record.beneficiaryName.includes(filters.query) || record.room.includes(filters.query);
      const matchDate =
        (!filters.dateFrom || record.date >= filters.dateFrom) && (!filters.dateTo || record.date <= filters.dateTo);

      return matchType && matchStatus && matchQuery && matchDate;
    });
  }, [filters, records]);

  return (
    <main className="flex h-screen flex-col gap-3 overflow-hidden bg-[#f0f2f5] p-3">
      {/* 1. 요약 대시보드 (통계) */}
      <HistoryStats />

      {/* 2. 검색 및 필터 바 */}
      <HistoryFilter filters={filters} setFilters={setFilters} />

      {/* 3. 액션 바 및 리스트 컨테이너 */}
      <div className="flex flex-1 flex-col overflow-hidden border border-gray-300 bg-white p-1 shadow-sm">
        {/* 모드 전환 및 내보내기 툴바 */}
        <HistoryActionBar viewMode={viewMode} setViewMode={setViewMode} />

        {/* 리스트 본문 (데이터 양에 따라 개별 스크롤) */}
        <section className="mt-1 flex-1 overflow-y-auto border-t border-gray-100">
          {viewMode === 'table' ? (
            <HistoryTableView data={filteredData} onSelect={setSelectedRecord} />
          ) : (
            <HistoryCardView data={filteredData} onSelect={setSelectedRecord} />
          )}
        </section>
      </div>

      {/* 4. 상세 조회 모달 (팝업) */}
      {selectedRecord && <HistoryDetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
    </main>
  );
}
