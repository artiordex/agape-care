'use client';

import React, { useState, useMemo } from 'react';

// 인터페이스 정의
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
  // 상태 관리
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [recordType, setRecordType] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedRecord, setSelectedRecord] = useState<CareRecord | null>(null);

  // 임시 데이터 (실제 프로젝트에서는 외부 파일이나 API로 분리 권장)
  const records: CareRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      beneficiaryName: '김영희',
      room: '101호',
      type: '간호기록',
      status: '마감',
      author: '박간호사',
      summary: '혈압 정상, 특이사항 없음',
    },
    {
      id: '2',
      date: '2024-01-15',
      beneficiaryName: '이철수',
      room: '102호',
      type: '투약기록',
      status: '작성중',
      author: '김요양사',
      summary: '아침 투약 완료',
    },
    {
      id: '3',
      date: '2024-01-14',
      beneficiaryName: '박순자',
      room: '103호',
      type: '구강점검',
      status: '마감',
      author: '이요양사',
      summary: '구강상태 양호',
    },
    {
      id: '4',
      date: '2024-01-14',
      beneficiaryName: '최민수',
      room: '201호',
      type: '응급상황',
      status: '검토필요',
      author: '박간호사',
      summary: '낙상 발생, 119 연락',
    },
    {
      id: '5',
      date: '2024-01-13',
      beneficiaryName: '정미경',
      room: '202호',
      type: '욕창간호',
      status: '마감',
      author: '김간호사',
      summary: '욕창 부위 드레싱 교체',
    },
  ];

  // 필터링 로직 (성능 최적화를 위해 useMemo 사용)
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchType = recordType === '전체' || record.type === recordType;
      const matchStatus = statusFilter === '전체' || record.status === statusFilter;
      const matchSearch = record.beneficiaryName.includes(searchQuery) || record.room.includes(searchQuery);
      // 날짜 필터링 로직 추가 가능
      const matchDate = record.date >= dateFrom && record.date <= dateTo;
      return matchType && matchStatus && matchSearch && matchDate;
    });
  }, [recordType, statusFilter, searchQuery, dateFrom, dateTo]);

  // 스타일 헬퍼 함수
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      마감: 'bg-emerald-100 text-emerald-700',
      작성중: 'bg-yellow-100 text-yellow-700',
      검토필요: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      간호기록: 'bg-blue-100 text-blue-700',
      투약기록: 'bg-purple-100 text-purple-700',
      구강점검: 'bg-teal-100 text-teal-700',
      응급상황: 'bg-red-100 text-red-700',
      욕창간호: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`${format.toUpperCase()} 다운로드 기능은 서버 API와 연동이 필요합니다.`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* 헤더 및 필터 영역 */}
      <section className="border-b border-gray-200 bg-white p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">케어 기록 조회</h1>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <FilterInput label="기간 (시작)" type="date" value={dateFrom} onChange={setDateFrom} />
          <FilterInput label="기간 (종료)" type="date" value={dateTo} onChange={setDateTo} />
          <FilterSelect
            label="기록 유형"
            value={recordType}
            onChange={setRecordType}
            options={['전체', '간호기록', '투약기록', '구강점검', '응급상황', '배설기록', '욕창간호', '진료기록']}
          />
          <FilterSelect
            label="상태"
            value={statusFilter}
            onChange={setStatusFilter}
            options={['전체', '작성중', '마감', '검토필요']}
          />
          <FilterInput
            label="수급자 검색"
            placeholder="이름 또는 방호실"
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* 액션 버튼 바 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 rounded-lg bg-gray-100 p-1">
            <ViewButton
              active={viewMode === 'card'}
              onClick={() => setViewMode('card')}
              icon="ri-layout-grid-line"
              label="카드형"
            />
            <ViewButton
              active={viewMode === 'table'}
              onClick={() => setViewMode('table')}
              icon="ri-list-check"
              label="테이블형"
            />
          </div>
          <div className="flex gap-2">
            <ExportButton color="bg-red-600" icon="ri-file-pdf-line" label="PDF" onClick={() => handleExport('pdf')} />
            <ExportButton
              color="bg-green-600"
              icon="ri-file-excel-line"
              label="엑셀"
              onClick={() => handleExport('excel')}
            />
            <ExportButton
              color="bg-blue-600"
              icon="ri-file-text-line"
              label="CSV"
              onClick={() => handleExport('csv')}
            />
          </div>
        </div>
      </section>

      {/* 컨텐츠 리스트 영역 */}
      <section className="flex-1 p-6">
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecords.map(record => (
              <div
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                      {record.beneficiaryName}
                    </h3>
                    <p className="text-sm text-gray-500">{record.room}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md px-2 py-0.5 text-xs ${getTypeColor(record.type)}`}>{record.type}</span>
                    <span className="text-xs text-gray-400">{record.date}</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-600">{record.summary}</p>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-xs text-gray-400">작성자: {record.author}</span>
                    <span className="text-sm font-semibold text-emerald-600">상세보기</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 font-medium text-gray-600">
                  <tr>
                    {['날짜', '수급자', '방호실', '유형', '상태', '작성자', '요약', '액션'].map(header => (
                      <th key={header} className="px-6 py-4">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRecords.map(record => (
                    <tr key={record.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4">{record.date}</td>
                      <td className="px-6 py-4 font-semibold">{record.beneficiaryName}</td>
                      <td className="px-6 py-4">{record.room}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-xs ${getTypeColor(record.type)}`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{record.author}</td>
                      <td className="max-w-[200px] truncate px-6 py-4">{record.summary}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="font-semibold text-emerald-600 hover:underline"
                        >
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredRecords.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-20 text-center">
            <p className="text-gray-400">조건에 맞는 기록이 없습니다.</p>
          </div>
        )}
      </section>

      {/* 모달 (상세보기) */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold">기록 상세 정보</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <i className="ri-close-line text-2xl text-gray-500"></i>
              </button>
            </div>
            <div className="space-y-6 overflow-y-auto p-8">
              <div className="grid grid-cols-2 gap-6">
                <DetailItem label="수급자" value={selectedRecord.beneficiaryName} />
                <DetailItem label="방호실" value={selectedRecord.room} />
                <DetailItem label="날짜" value={selectedRecord.date} />
                <DetailItem label="작성자" value={selectedRecord.author} />
              </div>
              <div className="flex gap-4">
                <DetailBadge label="유형" value={selectedRecord.type} colorClass={getTypeColor(selectedRecord.type)} />
                <DetailBadge
                  label="상태"
                  value={selectedRecord.status}
                  colorClass={getStatusColor(selectedRecord.status)}
                />
              </div>
              <DetailItem label="요약" value={selectedRecord.summary} fullWidth />
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">상세 내용</label>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 leading-relaxed text-gray-700">
                  상세 기록 데이터가 이곳에 표시됩니다. (현재 데이터 필드 확장 필요)
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-6">
              <button
                onClick={() => setSelectedRecord(null)}
                className="rounded-xl px-6 py-2.5 font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                닫기
              </button>
              <button className="rounded-xl bg-emerald-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700">
                기록 인쇄
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- 추출된 하위 컴포넌트 (가독성 향상) ---

const FilterInput = ({ label, type = 'text', value, onChange, placeholder }: any) => (
  <div>
    <label className="mb-1.5 ml-1 block text-xs font-bold text-gray-500">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
    />
  </div>
);

const FilterSelect = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="mb-1.5 ml-1 block text-xs font-bold text-gray-500">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500"
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const ViewButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center rounded-md px-4 py-2 text-sm font-semibold transition-all ${
      active ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    <i className={`${icon} mr-2`}></i>
    {label}
  </button>
);

const ExportButton = ({ color, icon, label, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 ${color} flex items-center rounded-xl text-sm font-bold text-white shadow-md transition-all hover:opacity-90`}
  >
    <i className={`${icon} mr-2`}></i>
    {label}
  </button>
);

const DetailItem = ({ label, value, fullWidth }: any) => (
  <div className={fullWidth ? 'col-span-2' : ''}>
    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">{label}</label>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);

const DetailBadge = ({ label, value, colorClass }: any) => (
  <div>
    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">{label}</label>
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${colorClass}`}>{value}</span>
  </div>
);
